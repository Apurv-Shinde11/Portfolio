import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { geographicDirection, MUMBAI, solarPosition } from "./earth-solar";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export async function createEarth(host: HTMLDivElement, onFailure: () => void, signal: AbortSignal) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-label", "Earth with approximate current solar illumination. Mumbai is marked. Use arrow keys or mouse drag to explore; swipe vertically to scroll.");
  canvas.tabIndex = 0;
  canvas.style.touchAction = "pan-y pinch-zoom";
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 280 / 260, 0.1, 20);
  const india = geographicDirection(MUMBAI.lat, MUMBAI.lng);
  const initialDirection = new THREE.Vector3(india.x, india.y, india.z);
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  camera.position.copy(initialDirection).multiplyScalar(preference.matches ? 3.2 : 4.1);
  camera.lookAt(0, 0, 0);
  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = !preference.matches;
  controls.dampingFactor = 0.12;
  controls.rotateSpeed = 0.45;
  controls.autoRotate = false; // Near-static idle; never override a visitor's chosen view.
  // OrbitControls defaults to touch-action:none. Allow natural vertical page scrolling.
  canvas.style.touchAction = "pan-y pinch-zoom";
  let textures: THREE.Texture[] = [];
  try {
    const loader = new THREE.TextureLoader();
    const results = await Promise.allSettled([loader.loadAsync("/earth/day.webp"), loader.loadAsync("/earth/night.webp")]);
    textures = results.flatMap(result => result.status === "fulfilled" ? [result.value] : []);
    if (signal.aborted || textures.length !== 2) throw new Error("Earth texture loading failed or cancelled.");
    textures.forEach(texture => { texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy()); });
  } catch (error) {
    textures.forEach(texture => texture.dispose()); controls.dispose(); renderer.dispose();
    throw error;
  }
  const uniforms = { dayMap: { value: textures[0] }, nightMap: { value: textures[1] }, sun: { value: new THREE.Vector3() } };
  const surface = new THREE.ShaderMaterial({
    uniforms, vertexShader,
    fragmentShader: `
      uniform sampler2D dayMap;
      uniform sampler2D nightMap;
      uniform vec3 sun;
      varying vec2 vUv;
      varying vec3 vWorldNormal;
      void main() {
        float solarCosine = dot(normalize(vWorldNormal), sun);
        float daylight = smoothstep(-0.015, 0.015, solarCosine);
        vec3 day = texture2D(dayMap, vUv).rgb;
        vec3 lights = texture2D(nightMap, vUv).rgb;
        vec3 color = day * mix(0.012, 0.12 + 0.88 * max(solarCosine, 0.0), daylight);
        color += lights * (1.0 - daylight) * 0.65;
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
  // Three SphereGeometry has longitude 0 at +X. Rotate the GEOMETRY (including normals)
  // -90 degrees so longitude 0 is +Z, matching three-globe getCoords. UVs are unchanged:
  // NASA maps run west-to-east from -180 to +180, north at the top, with no flips/offsets.
  const geometry = new THREE.SphereGeometry(1, 96, 48).rotateY(-Math.PI / 2);
  scene.add(new THREE.Mesh(geometry, surface));
  const rim = new THREE.ShaderMaterial({
    vertexShader, transparent: true, depthWrite: false, side: THREE.BackSide,
    uniforms: { sun: uniforms.sun },
    fragmentShader: `
      uniform vec3 sun;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
      void main() {
        vec3 normal = normalize(vWorldNormal);
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float edge = pow(1.0 - abs(dot(normal, viewDirection)), 3.0);
        float alpha = edge * (0.07 + 0.16 * max(dot(normal, sun), 0.0));
        gl_FragColor = vec4(0.26, 0.55, 0.85, alpha);
        #include <colorspace_fragment>
      }
    `,
  });
  const rimGeometry = new THREE.SphereGeometry(1.025, 64, 32);
  scene.add(new THREE.Mesh(rimGeometry, rim));
  const markerGeometry = new THREE.SphereGeometry(0.015, 12, 8);
  const markerMaterial = new THREE.MeshBasicMaterial({ color: "#8ec5ff" });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.copy(initialDirection).multiplyScalar(1.012);
  scene.add(marker);
  host.appendChild(canvas);
  let frame = 0;
  let visible = false;
  let disposed = false;
  let arrivalStart: number | null = null;
  let arrivalDone = preference.matches;
  let dragging = false;
  let solarUpdated = 0;
  const updateSun = () => {
    const date = new Date();
    const solar = solarPosition(date);
    uniforms.sun.value.set(solar.direction.x, solar.direction.y, solar.direction.z);
    solarUpdated = Date.now();
    host.dataset.subsolar = `${solar.latitude.toFixed(3)},${solar.longitude.toFixed(3)}`;
  };
  const render = (time: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    if (Date.now() - solarUpdated >= 60000) updateSun();
    if (!arrivalDone) {
      arrivalStart ??= time;
      const progress = Math.min(1, (time - arrivalStart) / 1200);
      const eased = 1 - (1 - progress) ** 3;
      camera.position.copy(initialDirection).multiplyScalar(4.1 - 0.9 * eased);
      arrivalDone = progress === 1;
    }
    const moving = controls.update();
    renderer.render(scene, camera);
    host.dataset.camera = camera.position.toArray().map(value => value.toFixed(3)).join(",");
    if (!arrivalDone || dragging || moving) requestRender();
  };
  const requestRender = () => { if (!frame && !disposed && visible && !document.hidden) frame = requestAnimationFrame(render); };
  const start = () => { arrivalDone = true; dragging = true; requestRender(); };
  const end = () => { dragging = false; requestRender(); };
  const resized = () => {
    const width = Math.min(280, host.clientWidth);
    renderer.setSize(width, 260);
    camera.aspect = width / 260; camera.updateProjectionMatrix(); requestRender();
  };
  const resizedObserver = new ResizeObserver(resized);
  resizedObserver.observe(host);
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    host.dataset.rendering = visible && !document.hidden ? "active" : "paused";
    if (visible) { updateSun(); requestRender(); }
    else { cancelAnimationFrame(frame); frame = 0; }
  }, { threshold: 0 });
  visibility.observe(host);
  const hidden = () => {
    host.dataset.rendering = visible && !document.hidden ? "active" : "paused";
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else { updateSun(); requestRender(); }
  };
  const reduced = () => {
    controls.enableDamping = !preference.matches;
    if (preference.matches && !arrivalDone) { arrivalDone = true; camera.position.copy(initialDirection).multiplyScalar(3.2); }
    requestRender();
  };
  const keyboard = (event: KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault(); arrivalDone = true;
    const spherical = new THREE.Spherical().setFromVector3(camera.position);
    spherical.theta += event.key === "ArrowLeft" ? -0.12 : event.key === "ArrowRight" ? 0.12 : 0;
    spherical.phi += event.key === "ArrowUp" ? -0.1 : event.key === "ArrowDown" ? 0.1 : 0;
    spherical.makeSafe(); camera.position.setFromSpherical(spherical); controls.update(); requestRender();
  };
  const contextLost = (event: Event) => { event.preventDefault(); dispose(); onFailure(); };
  const minute = window.setInterval(() => { if (visible && !document.hidden) { updateSun(); requestRender(); } }, 60000);
  controls.addEventListener("start", start); controls.addEventListener("end", end); controls.addEventListener("change", requestRender);
  document.addEventListener("visibilitychange", hidden); preference.addEventListener("change", reduced);
  canvas.addEventListener("keydown", keyboard); canvas.addEventListener("webglcontextlost", contextLost);
  resized(); updateSun();
  function dispose() {
    if (disposed) return;
    disposed = true; cancelAnimationFrame(frame); clearInterval(minute);
    visibility.disconnect(); resizedObserver.disconnect();
    document.removeEventListener("visibilitychange", hidden); preference.removeEventListener("change", reduced);
    canvas.removeEventListener("keydown", keyboard); canvas.removeEventListener("webglcontextlost", contextLost);
    controls.removeEventListener("start", start); controls.removeEventListener("end", end); controls.removeEventListener("change", requestRender);
    controls.dispose(); geometry.dispose(); rimGeometry.dispose(); markerGeometry.dispose();
    surface.dispose(); rim.dispose(); markerMaterial.dispose(); textures.forEach(texture => texture.dispose());
    renderer.dispose(); canvas.remove();
  }
  return dispose;
}
