// NOAA/Meeus geometric solar position, using Julian centuries from J2000.
// https://gml.noaa.gov/grad/solcalc/calcdetails.html
// UTC-based, geocentric: no atmospheric refraction or local timezone approximation.
const rad = Math.PI / 180;
const wrap = (angle: number) => ((angle % 360) + 360) % 360;

export const MUMBAI = { lat: 19.076, lng: 72.8777 };

export function geographicDirection(lat: number, lng: number) {
  return { x: Math.cos(lat * rad) * Math.sin(lng * rad), y: Math.sin(lat * rad), z: Math.cos(lat * rad) * Math.cos(lng * rad) };
}

export function solarPosition(date: Date) {
  const t = (date.getTime() / 86400000 + 2440587.5 - 2451545) / 36525;
  const longitude = wrap(280.46646 + t * (36000.76983 + t * 0.0003032));
  const anomaly = 357.52911 + t * (35999.05029 - 0.0001537 * t);
  const eccentricity = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
  const center = Math.sin(anomaly * rad) * (1.914602 - t * (0.004817 + 0.000014 * t))
    + Math.sin(2 * anomaly * rad) * (0.019993 - 0.000101 * t)
    + Math.sin(3 * anomaly * rad) * 0.000289;
  const omega = 125.04 - 1934.136 * t;
  const apparentLongitude = longitude + center - 0.00569 - 0.00478 * Math.sin(omega * rad);
  const meanObliquity = 23 + (26 + (21.448 - t * (46.815 + t * (0.00059 - t * 0.001813))) / 60) / 60;
  const obliquity = meanObliquity + 0.00256 * Math.cos(omega * rad);
  const declination = Math.asin(Math.sin(obliquity * rad) * Math.sin(apparentLongitude * rad)) / rad;
  const y = Math.tan(obliquity * rad / 2) ** 2;
  const equationOfTime = 4 / rad * (y * Math.sin(2 * longitude * rad)
    - 2 * eccentricity * Math.sin(anomaly * rad)
    + 4 * eccentricity * y * Math.sin(anomaly * rad) * Math.cos(2 * longitude * rad)
    - 0.5 * y * y * Math.sin(4 * longitude * rad)
    - 1.25 * eccentricity * eccentricity * Math.sin(2 * anomaly * rad));
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes() + date.getUTCSeconds() / 60 + date.getUTCMilliseconds() / 60000;
  const subsolarLongitude = wrap((720 - minutes - equationOfTime) / 4 + 180) - 180;
  return { latitude: declination, longitude: subsolarLongitude, equationOfTime, direction: geographicDirection(declination, subsolarLongitude) };
}

export function formatMumbaiTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "medium" }).format(date);
}
