import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

function normalPDF(x, mu, sigma) {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
}

export const ProbabilityA = forwardRef((props, ref) => {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);

  const w = 280, h = 130;
  const xMin = -5, xMax = 5, steps = 100;
  const xs = Array.from({ length: steps }, (_, i) => xMin + (i / (steps - 1)) * (xMax - xMin));
  const ys = xs.map(x => normalPDF(x, mu, sigma));
  const maxY = Math.max(...ys);

  const toSvg = (x, y) => [
    ((x - xMin) / (xMax - xMin)) * (w - 40) + 20,
    h - 20 - (y / maxY) * (h - 35),
  ];

  const pts = xs.map((x, i) => toSvg(x, ys[i]).join(",")).join(" ");

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#16a34a" }}>FOML</div>
        <h2 className="concept-title">Probability & Distributions</h2>
        <p className="concept-def">
          The <strong>Normal Distribution</strong> N(μ, σ²) — bell curve. 68% within ±1σ, 95% within ±2σ.
        </p>

        <svg width={w} height={h}>
          <line x1="20" y1={h - 20} x2={w - 10} y2={h - 20} stroke="#333" strokeWidth="1" />
          <line x1="20" y1="5" x2="20" y2={h - 20} stroke="#333" strokeWidth="1" />
          <polyline points={pts} fill="none" stroke="#16a34a" strokeWidth="2.5" />
          <text x={w / 2} y={h - 4} textAnchor="middle" fontSize="9" fill="#666">x</text>
          <text x={toSvg(mu, 0)[0]} y={h - 6} textAnchor="middle" fontSize="9" fill="#86efac">μ={mu}</text>
        </svg>

        <div className="vec-row" style={{ gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888" }}>μ (mean): {mu}</label>
            <input type="range" min={-2} max={2} step={0.5} value={mu}
              onChange={e => setMu(+e.target.value)} style={{ width: "100%" }} />
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888" }}>σ (std): {sigma}</label>
            <input type="range" min={0.3} max={2.5} step={0.1} value={sigma}
              onChange={e => setSigma(+e.target.value)} style={{ width: "100%" }} />
          </div>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>68-95-99.7 Rule (Empirical Rule)</h3>
        <ul className="fact-list">
          <li><strong>μ ± 1σ</strong> covers <strong>68%</strong> of data — roughly 2 out of 3 values fall here.</li>
          <li><strong>μ ± 2σ</strong> covers <strong>95%</strong> of data — used for confidence intervals in statistics.</li>
          <li><strong>μ ± 3σ</strong> covers <strong>99.7%</strong> of data — almost everything; values beyond 3σ are called outliers.</li>
          <li><strong>Z-score:</strong> z = (x − μ) / σ — tells you how many standard deviations x is from the mean.</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>43</span>
    </div>
  );
});
ProbabilityA.displayName = "ProbabilityA";

export const ProbabilityB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Key Distributions</h3>
      <table className="cheat-table">
        <thead><tr><th>Distribution</th><th>Use when</th><th>PMF/PDF</th></tr></thead>
        <tbody>
          <tr>
            <td>Bernoulli</td>
            <td>Single binary trial</td>
            <td>P(X=1)=p</td>
          </tr>
          <tr>
            <td>Binomial B(n,p)</td>
            <td>k successes in n trials</td>
            <td>C(n,k)pᵏ(1-p)ⁿ⁻ᵏ</td>
          </tr>
          <tr>
            <td>Normal N(μ,σ²)</td>
            <td>Continuous, symmetric</td>
            <td>bell curve formula</td>
          </tr>
        </tbody>
      </table>

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Key Rules</h3>
      <ul className="fact-list">
        <li><strong>PMF</strong> — Probability Mass Function (discrete, exact P(X=x))</li>
        <li><strong>PDF</strong> — Probability Density Function (continuous, area = P)</li>
        <li><strong>CDF</strong> — Cumulative Distribution: P(X ≤ x)</li>
        <li>68-95-99.7 rule: ±1σ, ±2σ, ±3σ for Normal dist</li>
        <li>E[X] = Σ x·P(x) for discrete; Var(X) = E[X²] − (E[X])²</li>
      </ul>

      <div className="exam-cards">
        <ExamCard q="When to use Binomial vs Normal?" a="Binomial: discrete, fixed n trials. Normal: continuous, approx for large n (by CLT)." />
        <ExamCard q="What is the Central Limit Theorem?" a="Sum of independent random variables approaches Normal distribution as n → ∞, regardless of original distribution." />
        <ExamCard q="P(A|B) formula?" a="P(A|B) = P(A∩B) / P(B) — conditional probability. Bayes: P(A|B) = P(B|A)P(A) / P(B)." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>44</span>
  </div>
));
ProbabilityB.displayName = "ProbabilityB";
