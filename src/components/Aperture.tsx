// Decorative camera-aperture that turns slowly behind the hero. Pure SVG + CSS, no JavaScript.
export default function Aperture() {
  return (
    <svg className="aperture" viewBox="-100 -100 200 200" aria-hidden focusable="false">
      <defs>
        <linearGradient id="gold" x1="0" x2="1">
          <stop offset="0" stopColor="#8b6844" />
          <stop offset="1" stopColor="#ebc283" />
        </linearGradient>
      </defs>
      <circle r="97" fill="none" stroke="url(#gold)" strokeWidth="1.5" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <polygon key={deg} points="-14,-92 62,-60 22,-6" fill="url(#gold)" transform={`rotate(${deg})`} />
      ))}
    </svg>
  );
}
