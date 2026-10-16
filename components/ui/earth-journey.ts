import * as THREE from "three";
import framing from "@/data/mumbai-framing.json";
import { geographicDirection, MUMBAI } from "./earth-solar";

export type JourneyState = "IDLE_EARTH" | "APPROACHING_MUMBAI" | "HOLDING_MUMBAI" | "RESETTING";
export type DestinationBridge = { readiness: () => "loading" | "ready" | "failed"; update: (progress: number, active: boolean) => void };
export type JourneyOptions = { section: HTMLElement; overview?: boolean; onState: (state: JourneyState) => void; registerRestart: (restart: () => void) => void; onImagery?: (status: "loading" | "ready" | "failed") => void; destination?: DestinationBridge };
export const JOURNEY_DURATION = 5200;
export const [WEST, SOUTH, EAST, NORTH] = framing.bbox;
export const CITY_CENTER = { lat: (SOUTH+NORTH)/2, lng: (WEST+EAST)/2 };

export function visibilityDecision(top: number, bottom: number, viewport: number, active: boolean) {
  if (active) return bottom > -64 && top < viewport+64;
  const overlap = Math.max(0,Math.min(bottom,viewport)-Math.max(top,0));
  return overlap >= Math.min(bottom-top,viewport)*.3;
}

export class JourneyMachine {
  state: JourneyState = "IDLE_EARTH";
  progress = 0;
  constructor(private change: (state: JourneyState) => void) {}
  private set(state: JourneyState) { if(this.state!==state){this.state=state;this.change(state);} }
  enter(reduced: boolean) { this.progress=reduced?1:0; this.set(reduced?"HOLDING_MUMBAI":"APPROACHING_MUMBAI"); }
  exit() { this.set("RESETTING");this.progress=0;this.set("IDLE_EARTH"); }
  advance(delta: number) { if(this.state!=="APPROACHING_MUMBAI")return;this.progress=Math.min(1,this.progress+delta/JOURNEY_DURATION);if(this.progress===1)this.set("HOLDING_MUMBAI"); }
}

function direction(lat: number,lng: number) { const p=geographicDirection(lat,lng);return new THREE.Vector3(p.x,p.y,p.z); }
export function framingPoints() {
  return Array.from({length:65},(_,i)=>{
    const side=Math.min(3,Math.floor(i/16)),t=(i===64?16:i%16)/16;
    return side===0?direction(SOUTH,WEST+(EAST-WEST)*t):side===1?direction(SOUTH+(NORTH-SOUTH)*t,EAST):side===2?direction(NORTH,EAST-(EAST-WEST)*t):direction(NORTH-(NORTH-SOUTH)*t,WEST);
  });
}

export function fitCityDistance(aspect: number) {
  const camera=new THREE.PerspectiveCamera(42,aspect,.00001,20),center=direction(CITY_CENTER.lat,CITY_CENTER.lng);
  const points=framingPoints();let low=1.00001,high=3.2;
  for(let i=0;i<45;i++){
    const distance=(low+high)/2;camera.position.copy(center).multiplyScalar(distance);camera.lookAt(0,0,0);camera.updateMatrixWorld();
    const fits=points.every(p=>{const v=p.clone().project(camera);return Math.abs(v.x)<=.8&&Math.abs(v.y)<=.8;});
    if(fits)high=distance;else low=distance;
  }
  return high;
}

export function createMumbaiJourney(camera: THREE.PerspectiveCamera,marker: THREE.Mesh,scene: THREE.Scene,host: HTMLElement,request: ()=>void,preference: MediaQueryList,options: JourneyOptions) {
  const machine=new JourneyMachine(state=>{host.dataset.journeyState=state;options.onState(state);});
  const initial=direction(MUMBAI.lat,MUMBAI.lng),center=direction(CITY_CENTER.lat,CITY_CENTER.lng);
  const points=framingPoints().map(p=>p.multiplyScalar(1.00002));
  const geometry=new THREE.BufferGeometry().setFromPoints(points),material=new THREE.LineDashedMaterial({color:0x8ec5ff,dashSize:.00035,gapSize:.0002,transparent:true,opacity:.75});
  const envelope=new THREE.Line(geometry,material);envelope.computeLineDistances();scene.add(envelope);envelope.visible=false;
  camera.near=.00001;camera.updateProjectionMatrix();
  let active=false,last:number|null=null,disposed=false,visibilityFrame=0,cachedAspect=0,cachedDistance=0;
  function pose() {
    const p=machine.progress,eased=p*p*p*(p*(p*6-15)+10);
    if(cachedAspect!==camera.aspect){cachedAspect=camera.aspect;cachedDistance=fitCityDistance(camera.aspect);}
    const ready=!options.destination||options.destination.readiness()==="ready";
    const target=!ready?3.2:options.overview?1.55:cachedDistance;
    // Logarithmic altitude interpolation avoids a sudden rush at the surface.
    const altitude=Math.exp(Math.log(2.2)*(1-eased)+Math.log(target-1)*eased);
    camera.position.copy(initial).lerp(center,eased).normalize().multiplyScalar(1+altitude);camera.lookAt(0,0,0);
    marker.position.copy(initial).multiplyScalar(1.012*(1-eased)+1.00002*eased);
    marker.scale.setScalar(Math.max(.0035,Math.min(1,altitude/2.2)));
    envelope.visible=!options.destination&&active&&p>.78;
    marker.visible=!(options.destination&&ready&&!options.overview&&p>.75);
    options.destination?.update(p,active);
    host.dataset.cityDistance=target.toFixed(6);host.dataset.cityCenter=`${CITY_CENTER.lat},${CITY_CENTER.lng}`;
  }
  function evaluate() {
    visibilityFrame=0;if(disposed)return;
    const b=options.section.getBoundingClientRect(),next=visibilityDecision(b.top,b.bottom,innerHeight,active);
    if(next===active)return;active=next;last=null;
    if(active)machine.enter(preference.matches);else machine.exit();pose();request();
  }
  const schedule=()=>{if(!visibilityFrame&&!disposed)visibilityFrame=requestAnimationFrame(evaluate);};
  const observer=new IntersectionObserver(schedule,{rootMargin:"64px 0px",threshold:[0,.1,.3,.6,1]});observer.observe(options.section);
  const resize=new ResizeObserver(schedule);resize.observe(options.section);
  window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);
  const reduced=()=>{last=null;if(active&&preference.matches)machine.enter(true);pose();request();};preference.addEventListener("change",reduced);
  options.registerRestart(()=>{last=null;if(active)machine.enter(preference.matches);else machine.exit();pose();request();});
  host.dataset.journeyState=machine.state;options.onState(machine.state);pose();evaluate();
  return {
    update(time:number){
      const readiness=options.destination?.readiness()??"ready";
      if(readiness==="failed"&&machine.state!=="IDLE_EARTH")machine.exit();
      if(last!==null&&active&&!preference.matches&&readiness==="ready")machine.advance(Math.min(50,Math.max(0,time-last)));
      last=time;pose();
      return active&&machine.state==="APPROACHING_MUMBAI"&&!preference.matches&&readiness==="ready";
    },
    pause(){last=null;},
    dispose(){disposed=true;cancelAnimationFrame(visibilityFrame);observer.disconnect();resize.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);preference.removeEventListener("change",reduced);options.registerRestart(()=>{});scene.remove(envelope);geometry.dispose();material.dispose();},
  };
}
