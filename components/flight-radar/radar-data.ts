// Original category-level symbols. Nose points up; no proprietary tracking art.
export const aircraftIcons = [
  { name: "Narrow-body twinjet", size: 26, path: "M0-16C1.3-15.5 1.8-13 1.8-10L1.8-3 13 4.5 13 6 2 2.7 1.3 11 6 14 6 15 .6 13.5 0 16-.6 13.5-6 15-6 14-1.3 11-2 2.7-13 6-13 4.5-1.8-3-1.8-10C-1.8-13-1.3-15.5 0-16Z M4-3Q5-4 6-3V3H4Z M-6-3Q-5-4-4-3V3H-6Z" },
  { name: "Wide-body twinjet", size: 30, path: "M0-16C2-15.5 2.7-12 2.7-9L2.7-3 15 4 15.5 2.5 16 3 15.8 6.5 3 3.1 1.8 10.5 7 13.5 7 15 1 13.6 0 16-1 13.6-7 15-7 13.5-1.8 10.5-3 3.1-15.8 6.5-16 3-15.5 2.5-15 4-2.7-3-2.7-9C-2.7-12-2-15.5 0-16Z M5-4Q6.5-5.5 8-4L7.7 3.5H5.3Z M-8-4Q-6.5-5.5-5-4L-5.3 3.5H-7.7Z" },
  { name: "Four-engine wide-body", size: 34, path: "M0-16C2-16 3-13 3-9L2.7-3 15 4.5 16 5 16 6.5 3 2.9 1.8 11 7 14 7 15.3 1 13.8 0 16-1 13.8-7 15.3-7 14-1.8 11-3 2.9-16 6.5-16 5-15 4.5-2.7-3-3-9C-3-13-2-16 0-16Z M4.8-4.5Q6-6 7.2-4.5V3H4.8Z M10-1.5Q11.2-3 12.4-1.5V6H10Z M-7.2-4.5Q-6-6-4.8-4.5V3H-7.2Z M-12.4-1.5Q-11.2-3-10-1.5V6H-12.4Z" },
  { name: "Regional turboprop", size: 28, path: "M0-15Q1.7-14 1.9-10L1.9-4 14-2 14 .6 2 1 1.3 10 6 12 6 14 1 12.7 0 15-1 12.7-6 14-6 12-1.3 10-2 1-14 .6-14-2-1.9-4-1.9-10Q-1.7-14 0-15Z M5-7Q6-8 7-7V4H5Z M-7-7Q-6-8-5-7V4H-7Z M2.5-8H9.5V-6.7H2.5Z M-9.5-8H-2.5V-6.7H-9.5Z" },
  { name: "General-aviation aircraft", size: 24, path: "M0-12Q1.4-11 1.4-7L1.4-3 12-3 12-.5 1.4 .5 .8 7 5 8.5 5 10 .7 9.3 0 12-.7 9.3-5 10-5 8.5-.8 7-1.4 .5-12-.5-12-3-1.4-3-1.4-7Q-1.4-11 0-12Z M-4-12.5H4V-11.2H-4Z" },
] as const;

// Review candidates only: the existing set remains the default until approved.
export const proposedIcons = [
  { ...aircraftIcons[0], path: "M0-16C1.1-15.5 1.7-13 1.7-10L1.7-3.5 12.5 3 13 5 2 2 1.1 11 5.5 13.4 5.5 14.8 .5 13.4 0 16-.5 13.4-5.5 14.8-5.5 13.4-1.1 11-2 2-13 5-12.5 3-1.7-3.5-1.7-10C-1.7-13-1.1-15.5 0-16Z M4-4Q5-5 6-4V2H4Z M-6-4Q-5-5-4-4V2H-6Z" },
  { ...aircraftIcons[1], path: "M0-16C1.8-16 2.5-13 2.5-9L2.5-3.7 15 3 16 5.5 3 2.6 1.4 10.8 6.5 13.5 6.5 15 .8 13.3 0 16-.8 13.3-6.5 15-6.5 13.5-1.4 10.8-3 2.6-16 5.5-15 3-2.5-3.7-2.5-9C-2.5-13-1.8-16 0-16Z M5-5Q6.5-6.5 8-5L7.6 2.6H5.4Z M-8-5Q-6.5-6.5-5-5L-5.4 2.6H-7.6Z" },
  { ...aircraftIcons[2], path: "M0-16C2.4-16 3.2-12.5 3.2-9L2.6-3.5 15 4 16 6 3 2.5 1.5 11 7 14 7 15.2 .7 13.7 0 16-.7 13.7-7 15.2-7 14-1.5 11-3 2.5-16 6-15 4-2.6-3.5-3.2-9C-3.2-12.5-2.4-16 0-16Z M4.5-5Q5.6-6.2 6.7-5V2H4.5Z M10-2Q11.1-3.2 12.2-2V5H10Z M-6.7-5Q-5.6-6.2-4.5-5V2H-6.7Z M-12.2-2Q-11.1-3.2-10-2V5H-12.2Z" },
  { ...aircraftIcons[3], path: "M0-15Q1.5-14.5 1.8-11L1.8-4.5 14-2.5 14 .3 2 1 1 10.8 5.5 12 5.5 14 .6 12.8 0 15-.6 12.8-5.5 14-5.5 12-1 10.8-2 1-14 .3-14-2.5-1.8-4.5-1.8-11Q-1.5-14.5 0-15Z M5-7.5Q6-8.5 7-7.5V3H5Z M-7-7.5Q-6-8.5-5-7.5V3H-7Z M2.5-8H9.5V-6.8H2.5Z M-9.5-8H-2.5V-6.8H-9.5Z" },
  { ...aircraftIcons[4], path: "M0-12Q1.3-11.5 1.5-8L1.5-3 12-3 12-1 .9 .2 .7 7 4.5 8.3 4.5 10 .5 9 0 12-.5 9-4.5 10-4.5 8.3-.7 7-.9 .2-12-1-12-3-1.5-3-1.5-8Q-1.3-11.5 0-12Z M-4-12.5H4V-11.3H-4Z" },
] as const;

export const demonstrationFlights = [
  { callsign: "DEMO101", detail: "A320 · FL330" },
  { callsign: "DEMO202", detail: "A359 · FL370" },
  { callsign: "DEMO303", detail: "B748 · FL350" },
  { callsign: "DEMO404", detail: "AT76 · FL190" },
  { callsign: "DEMO505", detail: "C172 · FL060" },
];

// A third, original review family. Previous candidates are deliberately retained.
// Slender fuselages, tapered swept surfaces, separated nacelles and rounded tips.
export const refinedIcons = [
  { ...aircraftIcons[0], path: "M0-16C.8-16 1.6-13.5 1.6-11L1.6-3.5 12.5 2.9Q13.2 3.4 13 4.9L2 1.6 1 11.2 5.4 13.2Q5.8 13.6 5.5 14.5L.5 13.2 0 16-.5 13.2-5.5 14.5Q-5.8 13.6-5.4 13.2L-1 11.2-2 1.6-13 4.9Q-13.2 3.4-12.5 2.9L-1.6-3.5-1.6-11C-1.6-13.5-.8-16 0-16Z M4.4-3.8Q5.4-5.3 6.4-3.8L6.2 2.1H4.6Z M-6.4-3.8Q-5.4-5.3-4.4-3.8L-4.6 2.1H-6.2Z" },
  { ...aircraftIcons[1], path: "M0-16C1.5-16 2.3-13.5 2.3-10L2.3-4 14.8 2.8Q15.7 3.5 16 5.3L2.8 1.8 1.3 10.7 6.6 13.5 6.7 14.8 .7 13.1 0 16-.7 13.1-6.7 14.8-6.6 13.5-1.3 10.7-2.8 1.8-16 5.3Q-15.7 3.5-14.8 2.8L-2.3-4-2.3-10C-2.3-13.5-1.5-16 0-16Z M5-5.2Q6.4-6.6 7.8-5.2L7.6 2H5.2Z M-7.8-5.2Q-6.4-6.6-5-5.2L-5.2 2H-7.6Z" },
  { ...aircraftIcons[2], path: "M0-16C1.9-16 2.8-13.5 2.8-10L2.4-4 14.8 3.1Q15.5 3.8 16 5.8L2.8 1.9 1.3 11 6.7 13.6 6.8 15 .7 13.4 0 16-.7 13.4-6.8 15-6.7 13.6-1.3 11-2.8 1.9-16 5.8Q-15.5 3.8-14.8 3.1L-2.4-4-2.8-10C-2.8-13.5-1.9-16 0-16Z M4.5-5.2Q5.6-6.5 6.7-5.2L6.5 1.9H4.7Z M10-2Q11.1-3.3 12.2-2L12 4.8H10.2Z M-6.7-5.2Q-5.6-6.5-4.5-5.2L-4.7 1.9H-6.5Z M-12.2-2Q-11.1-3.3-10-2L-10.2 4.8H-12Z" },
  { ...aircraftIcons[3], path: "M0-15Q1.5-15 1.7-11L1.7-4.5 13.5-2.7Q14-2.4 14-.3L1.8 .5 .9 10.8 5.3 12.3 5.5 13.8 .5 12.6 0 15-.5 12.6-5.5 13.8-5.3 12.3-.9 10.8-1.8 .5-14-.3Q-14-2.4-13.5-2.7L-1.7-4.5-1.7-11Q-1.5-15 0-15Z M5-7Q6-8.5 7-7L6.7 2.5H5.3Z M-7-7Q-6-8.5-5-7L-5.3 2.5H-6.7Z M2.5-8H9.5V-6.9H2.5Z M-9.5-8H-2.5V-6.9H-9.5Z" },
  { ...aircraftIcons[4], path: "M0-12Q1.2-12 1.4-8L1.4-3 11.7-2.6Q12.2-2.2 12-.8L1.1 .1 .6 7.2 4.5 8.5 4.5 9.8 .5 8.9 0 12-.5 8.9-4.5 9.8-4.5 8.5-.6 7.2-1.1 .1-12-.8Q-12.2-2.2-11.7-2.6L-1.4-3-1.4-8Q-1.2-12 0-12Z M-4-12.5H4V-11.4H-4Z" },
] as const;

export type Rect = { x: number; y: number; width: number; height: number };
export const overlaps = (a: Rect, b: Rect) => a.x < b.x+b.width && a.x+a.width > b.x && a.y < b.y+b.height && a.y+a.height > b.y;
export function placeLabel(x: number, y: number, width: number, height: number, obstacles: Rect[], compact = false, preferLeft = false): Rect | undefined {
  const heightPx=compact ? 14 : 30;
  const sides=preferLeft ? [x-124,x+28] : [x+28,x-124];
  return [0,-16,16].flatMap(offset=>sides.map(left=>({x:left,y:y-heightPx/2+offset,width:96,height:heightPx}))).find(box=>box.x>=12 && box.x+box.width<=width-12 && box.y>=12 && box.y+box.height<=height-12 && !obstacles.some(zone=>overlaps(box,zone)));
}

export function labeledRoutePresets(width: number, height: number, viewportWidth = width) {
  return routePresets(width,height,viewportWidth);
}

export function routePresets(width: number, height: number, viewportWidth = width) {
  const count = viewportWidth >= 1440 ? 5 : viewportWidth >= 1024 ? 4 : viewportWidth >= 768 ? 3 : 1;
  return Array.from({ length: count }, (_, i) => {
    const bottom = i >= Math.ceil(count / 2);
    const y = bottom ? height - 48 - (i % 2) * 18 : 38 + (i % 3) * 17;
    const reverse = i % 2 === 1;
    const start = reverse ? width + 120 : -120;
    const end = reverse ? -120 : width + 120;
    return { d: `M${start},${y} C${start+(end-start)*.3},${y-12} ${start+(end-start)*.7},${y+12} ${end},${y}`, speed: 22 + i * 2, phase: [.18,.52,.78,.32,.65][i], icon: i, label: width >= 1024 && i === 0 };
  });
}
