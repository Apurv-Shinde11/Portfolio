"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const MUMBAI = { lat: 19.076, lng: 72.8777 };

const ARC_DESTINATIONS = [
  { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  { lat: 1.3521,  lng: 103.8198, label: "Singapore" },
  { lat: 51.5074, lng: -0.1278,  label: "London" },
  { lat: 40.7128, lng: -74.006,  label: "New York" },
];

const arcsData = ARC_DESTINATIONS.map((dest) => ({
  startLat: MUMBAI.lat,
  startLng: MUMBAI.lng,
  endLat: dest.lat,
  endLng: dest.lng,
  label: dest.label,
}));

const ringsData = [{ lat: MUMBAI.lat, lng: MUMBAI.lng }];

export default function MumbaiGlobe() {
  const globeRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  // fly to Mumbai once the globe instance is available (dynamic import resolves async)
  useEffect(() => {
    const poll = setInterval(() => {
      if (!globeRef.current) return;
      globeRef.current.pointOfView({ lat: 19, lng: 72, altitude: 1.8 }, 1200);
      setReady(true);
      clearInterval(poll);
    }, 100);
    return () => clearInterval(poll);
  }, []);

  // slow eastward rotation after initial fly-in
  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      if (!globeRef.current) return;
      const pov = globeRef.current.pointOfView();
      globeRef.current.pointOfView({
        lat: pov.lat,
        lng: pov.lng + 0.15,
        altitude: pov.altitude,
      });
    }, 50);
    return () => clearInterval(interval);
  }, [ready]);

  return (
    <div className="w-full flex justify-center items-center" style={{ height: 260 }}>
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        width={280}
        height={260}
        enablePointerInteraction={true}

        // Mumbai dot
        pointsData={[MUMBAI]}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "#60a5fa"}
        pointAltitude={0.06}
        pointRadius={0.6}

        // Pulse rings around Mumbai
        ringsData={ringsData}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => (t: number) => `rgba(96,165,250,${1 - t})`}
        ringMaxRadius={4}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1200}

        // Arcs from Mumbai to world cities
        arcsData={arcsData}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={() => ["rgba(96,165,250,0.8)", "rgba(96,165,250,0.1)"]}
        arcAltitudeAutoScale={0.35}
        arcStroke={0.4}
        arcDashLength={0.4}
        arcDashGap={0.6}
        arcDashAnimateTime={2000}
      />
    </div>
  );
}
