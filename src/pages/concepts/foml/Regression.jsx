import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

function linReg(pts) {
  const n = pts.length;
  if (n < 2) return { m: 0, b: 0, mse: 0 };
  const sumX = pts.reduce((s, p) => s + p.x, 0);
  const sumY = pts.reduce((s, p) => s + p.y, 0);
  const sumXY = pts.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = pts.reduce((s, p) => s + p.x * p.x, 0);
  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - m * sumX) / n;
  const mse = pts.reduce((s, p) => s + (p.y - (m * p.x + b)) ** 2, 0) / n;
  return { m, b, mse };
}

const initPts = [
  { x: 1, y: 2 }, { x: 2, y: 3.5 }, { x: 3, y: 4 },
  { x: 4, y: 5.5 }, { x: 5, y: 6 }, { x: 6, y: 7.2 },
];

export const RegressionA = forwardRef((props, ref) => {
  const [pts, setPts] = useState(initPts);
  const W = 280, H = 170;
  const { m, b, mse } = linReg(pts);

  const toSvg = (x, y) => [20 + (x / 8) * (W - 40), H - 20 - (y / 10) * (H - 40)];

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = ((px - 20) / (W - 40)) * 8;
    const y = ((H - 20 - py) / (H - 40)) * 10;
    if (x >= 0 && x <= 8 && y >= 0 && y <= 10) {
      setPts(p => [...p, { x: +x.toFixed(1), y: +y.toFixed(1) }]);
    }
  };

  const lineX1 = 0, lineY1 = m * lineX1 + b;
  const lineX2 = 8, lineY2 = m * lineX2 + b;

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#16a34a" }}>FOML</div>
        <h2 className="concept-title">Linear Regression</h2>
        <p className="concept-def">
          Imagine you've measured study hours and exam scores for a class of students and plotted each as a dot. You want to draw the single straight line that best summarises the trend — close to as many dots as possible. Linear regression does exactly this: it finds the line <strong>y = mx + b</strong> that minimises the <em>average squared distance</em> between each dot and the line (Mean Squared Error). Click the chart to add your own points and watch the line and MSE update instantly.
        </p>

        <svg width={W} height={H} style={{ cursor: "crosshair" }} onClick={handleClick}>
          <line x1="20" y1={H - 20} x2={W - 10} y2={H - 20} stroke="#333" />
          <line x1="20" y1="5" x2="20" y2={H - 20} stroke="#333" />
          {pts.map((p, i) => {
            const [sx, sy] = toSvg(p.x, p.y);
            return <circle key={i} cx={sx} cy={sy} r={5} fill="#f59e0b" />;
          })}
          {pts.length > 1 && (
            <line
              x1={toSvg(lineX1, lineY1)[0]} y1={toSvg(lineX1, lineY1)[1]}
              x2={toSvg(lineX2, lineY2)[0]} y2={toSvg(lineX2, lineY2)[1]}
              stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4"
            />
          )}
          <text x={W - 5} y={H - 22} textAnchor="end" fontSize="9" fill="#888">x</text>
        </svg>

        <p style={{ fontSize: "0.8rem", color: "#86efac" }}>
          y = {m.toFixed(3)}x + {b.toFixed(3)}&nbsp;|&nbsp;MSE = {mse.toFixed(4)}
        </p>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <p className="hint-text">Click chart to add points</p>
          <button className="reset-btn" onClick={() => setPts(initPts)}>↺ Reset</button>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Linear vs Logistic Regression</h3>
        <p className="concept-def">
          Despite sharing a name, these two algorithms solve fundamentally different problems. <strong>Linear regression</strong> predicts a continuous number — house price, temperature, exam score — and its output can be any real value. It minimises MSE: the average of the squared gaps between predictions and reality. <strong>Logistic regression</strong> predicts a <em>probability</em> between 0 and 1 — "what's the chance this email is spam?" It does this by squashing a linear combination of features through the sigmoid function σ(z) = 1/(1+e⁻ᶻ), which squeezes any real number into the 0–1 range. A threshold (usually 0.5) then converts that probability into a class label. Confusingly, despite its name, logistic regression is a <strong>classification</strong> algorithm.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>48</span>
    </div>
  );
});
RegressionA.displayName = "RegressionA";

export const RegressionB = forwardRef((props, ref) => {
  const [threshold, setThreshold] = useState(0.5);
  const sigmoid = (z) => 1 / (1 + Math.exp(-z));
  const W = 270, H = 110;
  const zMin = -6, zMax = 6;
  const pts = Array.from({ length: 80 }, (_, i) => {
    const z = zMin + (i / 79) * (zMax - zMin);
    const x = 20 + (i / 79) * (W - 40);
    const y = H - 20 - sigmoid(z) * (H - 40);
    return `${x},${y}`;
  }).join(" ");
  const threshX = 20 + ((threshold - 0) / 1) * (W - 40);
  const threshZ = -Math.log(1 / threshold - 1);
  const threshLineX = 20 + ((threshZ - zMin) / (zMax - zMin)) * (W - 40);

  return (
    <div ref={ref} className="book-page concept-page concept-page--right">
      <div className="page-inner">
        <h3 className="concept-subtitle">Logistic Regression — Sigmoid</h3>
        <p className="concept-def" style={{ fontSize: "0.78rem" }}>
          σ(z) = 1 / (1 + e⁻ᶻ) — outputs probability 0–1 for classification.
        </p>
        <svg width={W} height={H}>
          <line x1="20" y1={H - 20} x2={W - 10} y2={H - 20} stroke="#333" />
          <line x1="20" y1="5" x2="20" y2={H - 20} stroke="#333" />
          <polyline points={pts} fill="none" stroke="#16a34a" strokeWidth="2.5" />
          <line x1={threshLineX} y1="5" x2={threshLineX} y2={H - 20} stroke="#e63946" strokeDasharray="3" />
          <text x={threshLineX + 3} y="15" fontSize="9" fill="#e63946">threshold={threshold}</text>
          <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="9" fill="#666">z = w·x + b</text>
          <text x="12" y="12" fontSize="9" fill="#888" transform={`rotate(-90,12,${H / 2})`}>P(y=1)</text>
        </svg>
        <input type="range" min={0.1} max={0.9} step={0.05} value={threshold}
          onChange={e => setThreshold(+e.target.value)} style={{ width: "100%" }} />
        <p style={{ fontSize: "0.75rem", color: "#888" }}>
          P ≥ {threshold} → class 1 · P &lt; {threshold} → class 0
        </p>

        <div className="exam-cards">
          <ExamCard q="Linear vs Logistic Regression?" a="Linear: predict continuous value (regression). Logistic: predict probability of class (classification)." />
          <ExamCard q="MSE formula?" a="MSE = (1/n) Σ(yᵢ − ŷᵢ)². Lower is better. R² measures fit quality (1 = perfect)." />
          <ExamCard q="Multiple linear regression?" a="y = b₀ + b₁x₁ + b₂x₂ + … + bₙxₙ. More features, same principle — minimise MSE." />
        </div>
      </div>
      <span className="page-number" style={{ right: "1rem" }}>49</span>
    </div>
  );
});
RegressionB.displayName = "RegressionB";
