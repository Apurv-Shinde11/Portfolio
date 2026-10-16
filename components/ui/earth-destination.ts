import * as THREE from "three";
import destination from "@/data/mumbai-imagery/destination.json";
import { geographicDirection } from "./earth-solar";
import styles from "./earth-destination.module.css";

export type ImageryStatus = "loading" | "ready" | "failed";

function position(lat: number, lng: number, radius: number) {
  const point = geographicDirection(lat, lng);
  return new THREE.Vector3(point.x, point.y, point.z).multiplyScalar(radius);
}

export function patchGeometry() {
  const { segments, verticesLatLng } = destination;
  const positions: number[] = [], uv: number[] = [], indices: number[] = [];
  verticesLatLng.forEach(([lat, lng], index) => {
    positions.push(...position(lat, lng, 1.000002).toArray());
    const row = Math.floor(index / (segments + 1)), column = index % (segments + 1);
    uv.push(column / segments, 1 - row / segments);
  });
  for (let row = 0; row < segments; row++) {
    for (let col = 0; col < segments; col++) {
      const a = row * (segments + 1) + col, b = a + segments + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function loadTexture(url: string, signal: AbortSignal): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    let settled = false;
    const cleanup = () => { clearTimeout(timer); signal.removeEventListener("abort", aborted); };
    const fail = () => { if (!settled) { settled = true; cleanup(); reject(new Error("Mumbai imagery unavailable")); } };
    const aborted = () => fail();
    const timer = setTimeout(fail, 15000);
    signal.addEventListener("abort", aborted, { once: true });
    if (signal.aborted) { fail(); return; }
    new THREE.TextureLoader().load(url, texture => {
      if (settled || signal.aborted) { texture.dispose(); return; }
      settled = true; cleanup(); resolve(texture);
    }, undefined, fail);
  });
}

export async function createDestination(
  host: HTMLDivElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera,
  sun: THREE.IUniform<THREE.Vector3>, signal: AbortSignal,
) {
  // Select once per renderer instance. Resizing never swaps a texture mid-journey.
  const mobile = matchMedia("(max-width: 767px)").matches;
  const asset = mobile ? destination.mobile : destination.desktop;
  const texture = await loadTexture(asset.path, signal);
  if (signal.aborted) { texture.dispose(); throw new Error("Cancelled Mumbai imagery"); }
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const uniforms = { map: { value: texture }, sun, opacity: { value: 0 }, daylight: { value: 0 }, closeup: { value: 0 } };
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, uniforms,
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform vec3 sun;
      uniform float opacity;
      uniform float daylight;
      uniform float closeup;
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        float cosine = dot(normalize(vNormal), sun);
        float lit = smoothstep(-0.015, 0.015, cosine);
        float earthLighting = mix(0.012, 0.12 + 0.88 * max(cosine, 0.0), lit);
        float edge = min(min(vUv.x, 1.0-vUv.x), min(vUv.y, 1.0-vUv.y));
        vec3 color = texture2D(map, vUv).rgb * mix(earthLighting, 1.0, daylight);
        // Geographic UV feather, not a screen-space image crossfade. A soft
        // circular reveal avoids a floating rectangular tile during approach.
        float innerRadius = mix(0.17, 0.70, closeup);
        float outerRadius = mix(0.48, 0.80, closeup);
        float regionalBlend = 1.0 - smoothstep(innerRadius, outerRadius, length(vUv - 0.5));
        gl_FragColor = vec4(color, opacity * regionalBlend * smoothstep(0.0, 0.035, edge));
        #include <colorspace_fragment>
      }
    `,
  });
  const geometry = patchGeometry();
  const patch = new THREE.Mesh(geometry, material);
  patch.renderOrder = 2;
  scene.add(patch);
  const outline = new THREE.Group();
  const outlineMaterial = new THREE.LineBasicMaterial({ color: "#f8dfa6", transparent: true, opacity: 0, depthWrite: false });
  const lineGeometries: THREE.BufferGeometry[] = [];
  // Includes both disconnected exterior parts AND interior rings. No joining lines.
  destination.boundaryRingsLatLng.forEach(ring => {
    const line = new THREE.BufferGeometry().setFromPoints(ring.map(([lat, lng]) => position(lat, lng, 1.000004)));
    lineGeometries.push(line);
    const mesh = new THREE.Line(line, outlineMaterial);
    mesh.renderOrder = 3;
    outline.add(mesh);
  });
  scene.add(outline);
  const overlay = document.createElement("div");
  overlay.className = styles.overlay;
  overlay.dataset.destinationLabels = "true";
  overlay.setAttribute("aria-hidden", "true");
  // Retain locality coordinates in the source data for registration checks only.
  const labels = destination.labels.filter(label => label.name === "Mumbai").map(label => {
    const span = document.createElement("span");
    span.className = `${styles.label} ${styles.city}`;
    span.textContent = "MUMBAI";
    overlay.appendChild(span);
    return { ...label, span, point: position(label.lat, label.lng, 1.000004) };
  });
  host.appendChild(overlay);
  const smooth = (low: number, high: number, x: number) => THREE.MathUtils.smoothstep(x, low, high);
  const projected = new THREE.Vector3();
  host.dataset.destinationTexture = `${asset.width}x${asset.height}`;
  host.dataset.destinationTriangles = String(destination.segments ** 2 * 2);
  return {
    update(progress: number, active: boolean) {
      const altitude = camera.position.length() - 1;
      const alpha = active ? 1 - smooth(.08, .55, altitude) : 0;
      uniforms.opacity.value = alpha;
      uniforms.daylight.value = 1 - smooth(.02, .16, altitude);
      uniforms.closeup.value = 1 - smooth(.011, .022, altitude);
      patch.visible = alpha > .001;
      const overlayAlpha = active ? 1 - smooth(.012, .035, altitude) : 0;
      outline.visible = overlayAlpha > .001;
      outlineMaterial.opacity = overlayAlpha * .72;
      const labelAlpha = active ? 1 - smooth(.0108, .013, altitude) : 0;
      overlay.style.opacity = String(labelAlpha);
      host.dataset.patchOpacity = alpha.toFixed(3);
      host.dataset.journeyProgress = progress.toFixed(4);
      if (!labelAlpha) return;
      camera.updateMatrixWorld();
      // No DOM measurements in the frame loop: positions share the same camera
      // and reserved 260px canvas. Preserve the existing MUMBAI label offset.
      const width = camera.aspect * 260;
      labels.forEach(label => {
        projected.copy(label.point).project(camera);
        const x = (projected.x + 1) * width / 2, y = (1 - projected.y) * 260 / 2;
        label.span.style.left = `${x}px`;
        label.span.style.top = `${y}px`;
        label.span.style.transform = "translate(4px, -100%)";
      });
    },
    dispose() {
      scene.remove(patch, outline);
      overlay.remove();
      geometry.dispose(); material.dispose(); texture.dispose();
      lineGeometries.forEach(g => g.dispose()); outlineMaterial.dispose();
    },
  };
}
