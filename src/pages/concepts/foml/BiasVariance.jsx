import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

export const BiasVarianceA = forwardRef((props, ref) => {
  const [complexity, setComplexity] = useState(5);
  const bias = Math.max(0.5, 10 - complexity * 1.8);
  const variance = Math.max(0.5, complexity * 1.5 - 2);
  const totalError = bias + variance + 1.5;

  const W = 270, H = 130;
  const xs = Array.from({ length: 60 }, (_, i) => i / 59 * 10);
  const biasPts = xs.map((x, i) => `${20 + (i / 59) * (W - 40)},${H - 20 - Math.max(0.5, 10 - x * 1.8) / 12 * (H - 40)}`).join(" ");
  const varPts = xs.map((x, i) => `${20 + (i / 59) * (W - 40)},${H - 20 - Math.max(0.5, x * 1.5 - 2) / 12 * (H - 40)}`).join(" ");
  const totalPts = xs.map((x, i) => {
    const b2 = Math.max(0.5, 10 - x * 1.8);
    const v2 = Math.max(0.5, x * 1.5 - 2);
    return `${20 + (i / 59) * (W - 40)},${H - 20 - (b2 + v2 + 1.5) / 12 * (H - 40)}`;
  }).join(" ");

  const cx = 20 + (complexity / 10) * (W - 40);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#16a34a" }}>FOML</div>
        <h2 className="concept-title">Bias-Variance Tradeoff</h2>
        <p className="concept-def">
          Imagine teaching a student with two bad extremes. One student is so stubborn they refuse to look at the data closely — they always predict the class average no matter what. That's <strong>high bias</strong>: the model makes oversimplified assumptions and underfits. The other student memorises every single example, including all the quirks and noise in the training set — but the moment you show them something new, they fail. That's <strong>high variance</strong>: the model is too sensitive to training data and overfits.
        </p>
        <p className="concept-formula">Total Error = Bias² + Variance + Irreducible Noise</p>

        <svg width={W} height={H}>
          <line x1="20" y1={H - 20} x2={W - 10} y2={H - 20} stroke="#333" />
          <line x1="20" y1="5" x2="20" y2={H - 20} stroke="#333" />
          <polyline points={biasPts} fill="none" stroke="#e63946" strokeWidth="2" />
          <polyline points={varPts} fill="none" stroke="#2563eb" strokeWidth="2" />
          <polyline points={totalPts} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />
          <line x1={cx} y1="5" x2={cx} y2={H - 20} stroke="#fff" strokeDasharray="3" strokeWidth="1" />
          <text x={W - 5} y={H - 22} textAnchor="end" fontSize="9" fill="#888">model complexity →</text>
          <text x="25" y="12" fontSize="8" fill="#e63946">Bias²</text>
          <text x="25" y="22" fontSize="8" fill="#2563eb">Variance</text>
          <text x="25" y="32" fontSize="8" fill="#f59e0b">Total</text>
        </svg>

        <input type="range" min={0} max={10} step={0.5} value={complexity}
          onChange={e => setComplexity(+e.target.value)} style={{ width: "100%" }} />

        <div className="metrics-row" style={{ gap: "0.5rem" }}>
          <div className="metric-pill" style={{ "--mc": "#e63946" }}>
            <div className="metric-val">{bias.toFixed(1)}</div><div className="metric-label">Bias</div>
          </div>
          <div className="metric-pill" style={{ "--mc": "#2563eb" }}>
            <div className="metric-val">{variance.toFixed(1)}</div><div className="metric-label">Variance</div>
          </div>
          <div className="metric-pill" style={{ "--mc": "#f59e0b" }}>
            <div className="metric-val">{totalError.toFixed(1)}</div><div className="metric-label">Total</div>
          </div>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Overfitting vs Underfitting</h3>
        <p className="concept-def">
          Drag the complexity slider above and watch the three curves. As model complexity increases, bias falls (the model can capture more patterns) but variance rises (it becomes sensitive to noise). Total error — the sum of both plus irreducible noise — forms a U-shape, with a sweet spot in the middle. <strong>Underfitting</strong> (left side) means both training and test error are high — the model is too simple to learn anything useful. <strong>Overfitting</strong> (right side) means training error is very low but test error is high — the model memorised the training set instead of generalising.
        </p>
        <p className="concept-def">
          To fix underfitting: add more features, use a more complex model architecture, or reduce regularisation strength. To fix overfitting: collect more training data, add L1 or L2 regularisation (which penalise large weights), use dropout in neural networks, or simplify the model. Cross-validation helps you detect which problem you have before deploying.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>52</span>
    </div>
  );
});
BiasVarianceA.displayName = "BiasVarianceA";

export const BiasVarianceB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Underfitting vs Overfitting</h3>
      <table className="cheat-table">
        <thead><tr><th></th><th>Underfitting</th><th>Good Fit</th><th>Overfitting</th></tr></thead>
        <tbody>
          <tr><td>Bias</td><td>High</td><td>Low</td><td>Low</td></tr>
          <tr><td>Variance</td><td>Low</td><td>Low</td><td>High</td></tr>
          <tr><td>Train error</td><td>High</td><td>Low</td><td>Very Low</td></tr>
          <tr><td>Test error</td><td>High</td><td>Low</td><td>High</td></tr>
          <tr><td>Fix with</td><td>More complexity</td><td>—</td><td>Regularisation</td></tr>
        </tbody>
      </table>

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Fixes</h3>
      <ul className="fact-list">
        <li><strong>Underfitting</strong>: more features, higher-degree polynomial, larger model</li>
        <li><strong>Overfitting</strong>: L1/L2 regularisation, dropout, more training data, cross-validation</li>
        <li><strong>L1 (Lasso)</strong>: drives coefficients to zero (feature selection)</li>
        <li><strong>L2 (Ridge)</strong>: shrinks coefficients, keeps all features</li>
      </ul>

      <div className="exam-cards">
        <ExamCard q="What is cross-validation?" a="Split data into k folds. Train on k-1 folds, test on 1. Repeat k times. Average test error is model performance." />
        <ExamCard q="Training accuracy 99%, test accuracy 60% — problem?" a="Overfitting. Model memorised training data, can't generalise. Add regularisation / more data." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>53</span>
  </div>
));
BiasVarianceB.displayName = "BiasVarianceB";
