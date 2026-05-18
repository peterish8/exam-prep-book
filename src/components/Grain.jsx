export default function Grain({ color1 = "#e63946", color2 = "#fff0f0", opacity = 0.92 }) {
  return (
    <div className="grain-overlay" style={{ "--c1": color1, "--c2": color2, "--op": opacity }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
        </defs>
      </svg>
      <div className="grain-bg" />
      <div className="grain-noise" />
    </div>
  );
}
