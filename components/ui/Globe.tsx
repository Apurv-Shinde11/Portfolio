"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function MumbaiGlobe() {

    const globeRef = useRef<any>(null);

    const mumbai = {
        lat: 19.0760,
        lng: 72.8777
    };

    useEffect(() => {

        if (!globeRef.current) return;

        // set initial camera position
        globeRef.current.pointOfView({
            lat: 20,
            lng: 80,
            altitude: 2
        });

        // rotate globe slowly
        const interval = setInterval(() => {

            if (globeRef.current) {
                const pov = globeRef.current.pointOfView();

                globeRef.current.pointOfView({
                    lat: pov.lat,
                    lng: pov.lng + 0.2,
                    altitude: pov.altitude
                });
            }

        }, 50);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className="w-full h-[220px]">

            <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundColor="rgba(0,0,0,0)"
                width={300}
                height={220}
                pointsData={[mumbai]}
                pointLat="lat"
                pointLng="lng"
                pointColor={() => "#60a5fa"}
                pointAltitude={0.05}
                pointRadius={0.5}
                enablePointerInteraction={false}
            />

        </div>
    );
}