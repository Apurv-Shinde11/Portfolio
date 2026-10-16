"use client";

import { useEffect, useId, useRef } from "react";
import { aircraftIcons, refinedIcons, demonstrationFlights, labeledRoutePresets, overlaps, placeLabel, type Rect } from "./radar-data";
import styles from "./radar.module.css";

const NS = "http://www.w3.org/2000/svg";

export default function FlightRadar({ paused, proposed = false, onDensity, onFailure }: { paused: boolean; proposed?: boolean; onDensity?: (density: {visible:number;target:number})=>void; onFailure?: ()=>void }) {
  const svg = useRef<SVGSVGElement>(null);
  const layer = useRef<SVGGElement>(null);
  const pauseRef = useRef(paused);
  const kick = useRef<(() => void) | null>(null);
  const id = useId().replaceAll(":", "");
  useEffect(() => { pauseRef.current = paused; kick.current?.(); }, [paused]);
  useEffect(() => {
    const root = svg.current, traffic = layer.current, section = root?.closest("section");
    if (!root || !traffic || !section) return;
    let teardown = () => {};
    try {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, last = 0, elapsed = 0, visible = false, disposed = false, previousPaint = 0;
    let zones: Rect[] = [], canvasWidth = 0, canvasHeight = 0;
    let reported = "", densityAt = -1000;
    const observers: { resize?: ResizeObserver; intersection?: IntersectionObserver } = {};
    let routes: { path: SVGPathElement; trail: SVGGElement; segments: SVGPathElement[]; waypoint: SVGPathElement; length: number; group: SVGGElement; label: SVGTextElement; blocked: boolean; preset: ReturnType<typeof labeledRoutePresets>[number] }[] = [];
    function element<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string,string>) {
      const node = document.createElementNS(NS,tag);
      for (const [key,value] of Object.entries(attrs)) node.setAttribute(key,value);
      return node;
    }
    function measure() {
      const bounds = section!.getBoundingClientRect();
      zones = Array.from(section!.querySelectorAll<HTMLElement>("[data-hero-copy], [data-hero-portrait], [data-hero-radar-control]")).map(node => {
        const b = node.getBoundingClientRect(), padding = node.hasAttribute("data-hero-portrait") ? 48 : node.hasAttribute("data-hero-radar-control") ? 4 : 24;
        let width = b.width;
        if (node.hasAttribute("data-hero-copy")) {
          const paragraph = node.querySelector("p");
          if (paragraph) {
            const context = document.createElement("canvas").getContext("2d");
            if (context) { const style = getComputedStyle(paragraph); context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`; width = Math.max(width,context.measureText("I am into Artificial Intelligence |").width+16); }
          }
        }
        return { x:b.left-bounds.left-padding,y:b.top-bounds.top-padding,width:width+padding*2,height:b.height+padding*2 };
      });
      if (bounds.width === canvasWidth && bounds.height === canvasHeight) {
        updateExclusions(); request(); return;
      }
      canvasWidth = bounds.width; canvasHeight = bounds.height;
      root!.setAttribute("viewBox",`0 0 ${canvasWidth} ${canvasHeight}`);
      traffic!.replaceChildren();
      // Match CSS viewport breakpoints, not the scrollbar-reduced element width.
      routes = labeledRoutePresets(bounds.width,bounds.height,window.innerWidth).map(preset => {
        const path = element("path",{d:preset.d,class:styles.planned});
        const trail = element("g",{class:styles.trail,opacity:"0"});
        const segments=Array.from({length:8},(_,i)=>element("path",{opacity:String(.1+i*.1)}));
        trail.append(...segments);
        const group = element("g",{opacity:"0"});
        const icon = aircraftIcons[preset.icon];
        group.appendChild(element("use",{href:`#${id}-aircraft-${preset.icon}`,x:String(-icon.size/2),y:String(-icon.size/2),width:String(icon.size),height:String(icon.size)}));
        if (preset.icon === 3) group.style.color = "var(--traffic-amber)";
        const label = element("text",{class:styles.flightLabel,opacity:"0"});
        const flight=demonstrationFlights[preset.icon];
        const primary=element("tspan",{x:"0",y:"10"});primary.textContent=preset.icon===0 ? flight.callsign : `${flight.callsign} · ${flight.detail.split(" · ")[0]}`;
        const detail=element("tspan",{x:"0",y:"24",class:styles.flightDetail});detail.textContent=demonstrationFlights[preset.icon].detail;
        label.append(primary);if(preset.icon===0) label.append(detail);
        traffic!.append(path,trail,group,label);
        const length = path.getTotalLength();
        const point = path.getPointAtLength(length*.62);
        const waypoint = element("path",{d:`M${point.x},${point.y-4}l4,4 -4,4 -4,-4Z`,class:styles.waypoint});
        traffic!.appendChild(waypoint);
        return { path,trail,segments,waypoint,length,group,label,preset,blocked:false };
      });
      updateExclusions();
      last = 0; request();
    }
    function updateExclusions() {
      for (const route of routes) {
        let blocked = false;
        // Fixed presets are never bent around content; intersecting routes are omitted.
        for(let i=0;i<=100;i++){const p=route.path.getPointAtLength(route.length*i/100);if(zones.some(z=>overlaps({x:p.x-18,y:p.y-18,width:36,height:36},z)) || (p.x>=20 && p.x<=canvasWidth-20 && !placeLabel(p.x,p.y,canvasWidth,canvasHeight,zones,route.preset.icon!==0))){blocked=true;break;}}
        route.blocked=blocked;
        for (const node of [route.path,route.trail,route.waypoint,route.group,route.label]) node.style.visibility=blocked ? "hidden" : "visible";
      }
    }
    function paint(now: number) {
      frame=0;
      if(disposed || !visible || document.hidden) return;
      const moving = !pauseRef.current && !preference.matches;
      if(last && moving) elapsed += Math.min((now-last)/1000,.1);
      last=now;
      if(now-previousPaint>=33 || !moving) {
        previousPaint=now;
        const occupied: Rect[]=[];
        const positions=routes.map(r=>{
          const distance=((preference.matches ? 0 : elapsed)*r.preset.speed+r.preset.phase*r.length)%r.length;
          return {r,distance,p:r.path.getPointAtLength(distance)};
        });
        let visibleCount=0;
        for(const r of routes) {
          const distance=((preference.matches ? 0 : elapsed)*r.preset.speed+r.preset.phase*r.length)%r.length;
          const p=r.path.getPointAtLength(distance), next=r.path.getPointAtLength(Math.min(r.length,distance+1)), prev=r.path.getPointAtLength(Math.max(0,distance-1));
          const angle=Math.atan2(next.y-prev.y,next.x-prev.x)*180/Math.PI+90;
          const otherAircraft=positions.filter(other=>other.r!==r && !other.r.blocked && other.p.x>=18 && other.p.x<=canvasWidth-18).map(other=>({x:other.p.x-20,y:other.p.y-20,width:40,height:40}));
          const box=placeLabel(p.x,p.y,canvasWidth,canvasHeight,[...zones,...occupied,...otherAircraft],r.preset.icon!==0);
          // A glyph and its label are always admitted as one unit. The lower
          // density preset separates their bands; no unlabeled glyph is shown.
          const edge=box && !r.blocked ? Math.max(0,Math.min(1,(p.x-18)/24,(canvasWidth-18-p.x)/24)) : 0;
          if(box && edge>0) {occupied.push({...box,x:box.x-3,y:box.y-3,width:box.width+6,height:box.height+6});visibleCount++;}
          r.group.setAttribute("transform",`translate(${p.x} ${p.y}) rotate(${angle})`);r.group.setAttribute("opacity",String(.9*edge));
          // A short solid history segment follows the same path. Never wrap it
          // across the loop boundary; the reset happens entirely offscreen.
          const start=Math.max(0,distance-74), finish=Math.max(0,distance-14);
          r.segments.forEach((segment,i)=>{
            const points=Array.from({length:3},(_,j)=>r.path.getPointAtLength(start+(finish-start)*(i+j/2)/8));
            segment.setAttribute("d",points.map((point,j)=>`${j ? "L" : "M"}${point.x} ${point.y}`).join(" "));
          });
          r.trail.setAttribute("opacity",String(.72*edge));
          if(box) r.label.setAttribute("transform",`translate(${box.x} ${box.y})`);
          r.label.setAttribute("opacity",String(.9*edge));
          const passage=preference.matches ? 0 : Math.max(0,1-Math.abs(distance-r.length*.62)/28);
          r.waypoint.style.opacity=String(.5+.4*passage*passage*(3-2*passage));
        }
        const densityKey=`${visibleCount}/${routes.length}`;
        if(densityKey!==reported && now-densityAt>=500){reported=densityKey;densityAt=now;onDensity?.({visible:visibleCount,target:routes.length});}
      }
      if(moving) request();
    }
    // React boundaries do not catch observer/RAF errors. Stop our resources
    // explicitly before requesting the Squares fallback from the owner.
    function safely(action: ()=>void){if(disposed)return;try{action();}catch{dispose();traffic!.replaceChildren();onFailure?.();}}
    function request(){if(!frame && !disposed && visible && !document.hidden)frame=requestAnimationFrame(now=>safely(()=>paint(now)));}
    function wake(){last=0;request();}
    function visibility(){last=0;if(document.hidden){cancelAnimationFrame(frame);frame=0;}else request();}
    kick.current=wake;
    function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);observers.resize?.disconnect();observers.intersection?.disconnect();document.removeEventListener("visibilitychange",visibility);preference.removeEventListener("change",wake);kick.current=null;}
    teardown=dispose;
    observers.resize=new ResizeObserver(()=>safely(measure));observers.resize.observe(section);
    section.querySelectorAll("[data-hero-copy], [data-hero-portrait], [data-hero-radar-control]").forEach(node=>observers.resize!.observe(node));
    observers.intersection=new IntersectionObserver(([entry])=>safely(()=>{visible=entry.isIntersecting;last=0;if(!visible){cancelAnimationFrame(frame);frame=0;}else request();}));observers.intersection.observe(section);
    document.addEventListener("visibilitychange",visibility);preference.addEventListener("change",wake);safely(measure);
    return dispose;
    } catch { teardown(); traffic.replaceChildren(); onFailure?.(); return teardown; }
  }, [id,onDensity,onFailure]);
  return <svg ref={svg} className={styles.radar} aria-hidden="true" focusable="false" viewBox="0 0 1440 810">
    <defs>
      <pattern id={`${id}-grid`} width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" fill="none" stroke="currentColor" strokeWidth=".5" opacity=".055" /></pattern>
      {(proposed ? refinedIcons : aircraftIcons).map((icon,i)=><symbol key={icon.name} id={`${id}-aircraft-${i}`} viewBox="-17 -17 34 34"><path d={icon.path} fill="currentColor" /></symbol>)}
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id}-grid)`} />
    <g ref={layer} />
  </svg>;
}
