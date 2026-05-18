import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

function normalPDF(x, mu, sigma) {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
}

export const ProbabilityA = forwardRef((props, ref) => {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);

  const w = 280;
  const h = 130;
  const xMin = -5;
  const xMax = 5;
  const steps = 100;
  const xs = Array.from({ length: steps }, (_, i) => xMin + (i / (steps - 1)) * (xMax - xMin));
  const ys = xs.map((x) => normalPDF(x, mu, sigma));
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
          Many real-world values gather around an average and fade toward the extremes. That bell shape is the <strong>normal distribution</strong>.
        </p>
        <ul className="fact-list">
          <li><strong>Mean mu:</strong> center of the curve</li>
          <li><strong>Standard deviation sigma:</strong> controls spread</li>
          <li><strong>Symmetric:</strong> left and right sides mirror each other</li>
          <li><strong>Examples:</strong> heights, marks, measurement error</li>
        </ul>

        <svg width={w} height={h}>
          <line x1="20" y1={h - 20} x2={w - 10} y2={h - 20} stroke="#333" strokeWidth="1" />
          <line x1="20" y1="5" x2="20" y2={h - 20} stroke="#333" strokeWidth="1" />
          <polyline points={pts} fill="none" stroke="#16a34a" strokeWidth="2.5" />
          <text x={w / 2} y={h - 4} textAnchor="middle" fontSize="9" fill="#666">x</text>
          <text x={toSvg(mu, 0)[0]} y={h - 6} textAnchor="middle" fontSize="9" fill="#86efac">mu={mu}</text>
        </svg>

        <div className="vec-row" style={{ gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888" }}>mu (mean): {mu}</label>
            <input type="range" min={-2} max={2} step={0.5} value={mu} onChange={(e) => setMu(+e.target.value)} style={{ width: "100%" }} />
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888" }}>sigma (std): {sigma}</label>
            <input type="range" min={0.3} max={2.5} step={0.1} value={sigma} onChange={(e) => setSigma(+e.target.value)} style={{ width: "100%" }} />
          </div>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>68-95-99.7 Rule</h3>
        <p className="concept-def">
          The <strong>68-95-99.7 rule</strong> is the fastest shortcut for reading a normal curve. About 68% sits within 1 sigma, 95% within 2, and 99.7% within 3.
        </p>
        <p className="concept-def">
          A <strong>Z-score</strong> tells how many standard deviations a value is from the mean.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>44</span>
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
          <tr><td>Bernoulli</td><td>Single binary trial</td><td>P(X=1)=p</td></tr>
          <tr><td>Binomial B(n,p)</td><td>k successes in n trials</td><td>C(n,k)p^k(1-p)^(n-k)</td></tr>
          <tr><td>Normal N(mu,sigma^2)</td><td>Continuous, symmetric</td><td>bell curve formula</td></tr>
        </tbody>
      </table>

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Key Rules</h3>
      <ul className="fact-list">
        <li><strong>PMF:</strong> used for discrete random variables</li>
        <li><strong>PDF:</strong> used for continuous random variables</li>
        <li><strong>CDF:</strong> gives P(X &lt;= x)</li>
        <li><strong>Empirical rule:</strong> 68%, 95%, 99.7%</li>
        <li><strong>Expectation / variance:</strong> center and spread of a distribution</li>
      </ul>

      <div className="exam-cards">
        <ExamCard q="When to use Binomial vs Normal?" a="Binomial is discrete with fixed trials. Normal is continuous and often used as an approximation." />
        <ExamCard q="What is the Central Limit Theorem?" a="Sums or averages of many independent variables tend toward a normal shape." />
        <ExamCard q="P(A|B) formula?" a="Conditional probability is P(A and B) divided by P(B)." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>45</span>
  </div>
));
ProbabilityB.displayName = "ProbabilityB";
