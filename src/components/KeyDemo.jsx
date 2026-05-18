import { useState, useEffect, useRef } from "react";

export default function KeyDemo({ keys, description }) {
  const [pressed, setPressed] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const down = (e) => {
      const k = keys.find(k => k.key === e.key || k.key === e.code);
      if (k) { setPressed(k); e.preventDefault(); }
    };
    el.addEventListener("keydown", down);
    return () => el.removeEventListener("keydown", down);
  }, [keys]);

  return (
    <div className="key-demo" ref={ref} tabIndex={0} title="Click here and press a key">
      <p className="key-demo__hint">Click here, then press a key:</p>
      <div className="key-demo__keys">
        {keys.map((k) => (
          <span key={k.key} className={`kbd ${pressed?.key === k.key ? "kbd--active" : ""}`}>
            {k.label || k.key}
          </span>
        ))}
      </div>
      {pressed && (
        <div className="key-demo__result">
          <strong>{pressed.label || pressed.key}</strong> → {pressed.result}
        </div>
      )}
      {description && <p className="key-demo__desc">{description}</p>}
    </div>
  );
}
