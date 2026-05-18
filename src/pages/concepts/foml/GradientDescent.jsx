import { forwardRef, useState, useEffect, useRef } from "react";
import ExamCard from "../../../components/ExamCard";

// Loss = (w - 3)^2 + 1
const loss = (w) => (w - 3) ** 2 + 1;
const gradLoss = (w) => 2 * (w - 3);

export const GradientDescentA = forwardRef((props, ref) => {
  const [lr, setLr] = useState(0.2);
  const [w, setW] = useState(-2);
  const [history, setHistory] = useState([]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const step = (curW) => {
    const grad = gradLoss(curW);
    return curW - lr * grad;
  };

  const start = () => {
    setW(-2); setHistory([]); setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    let curW = -2;
    const hist = [];
    intervalRef.current = setInterval(() => {
      curW = step(curW);
      hist.push({ w: curW, l: loss(curW) });
      setHistory([...hist]);
      setW(curW);
      if (Math.abs(gradLoss(curW)) < 0.01 || hist.length >= 30) {
        setRunning(false);
        clearInterval(intervalRef.current);
      }
    }, 150);
    return () => clearInterval(intervalRef.current);
  }, [running, lr]);

  const W = 280, H = 130;
  const wMin = -3, wMax = 7;
  const lMin = 1, lMax = 30;
  const toX = (wv) => ((wv - wMin) / (wMax - wMin)) * (W - 40) + 20;
  const toY = (lv) => H - 20 - ((Math.min(lv, lMax) - lMin) / (lMax - lMin)) * (H - 35);

  const curvePts = Array.from({ length: 80 }, (_, i) => {
    const wv = wMin + (i / 79) * (wMax - wMin);
    return `${toX(wv)},${toY(loss(wv))}`;
  }).join(" ");

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#16a34a" }}>FOML</div>
        <h2 className="concept-title">Gradient Descent</h2>
        <p className="concept-def">
          Imagine you're blindfolded on a hilly landscape and you want to reach the lowest point. You can't see the whole terrain — but you can feel which direction slopes downward beneath your feet. So you take a step in the downhill direction, feel again, take another step. That's gradient descent. The <strong>gradient</strong> tells you the direction of steepest increase in loss, so you move in the <em>opposite</em> direction — subtracting a fraction of the gradient from your current position at each step.
        </p>
        <p className="concept-formula">w = w − α · ∂L/∂w&nbsp;&nbsp;|&nbsp;&nbsp;α = learning rate</p>

        <svg width={W} height={H}>
          <line x1="20" y1={H - 20} x2={W - 10} y2={H - 20} stroke="#333" />
          <line x1="20" y1="5" x2="20" y2={H - 20} stroke="#333" />
          <polyline points={curvePts} fill="none" stroke="#16a34a" strokeWidth="2" />
          {history.map((h, i) => (
            <circle key={i} cx={toX(h.w)} cy={toY(h.l)} r={3}
              fill={i === history.length - 1 ? "#f59e0b" : "#86efac"} opacity={0.7} />
          ))}
          {history.length > 0 && (
            <circle cx={toX(w)} cy={toY(loss(w))} r={6} fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
          )}
          <text x={toX(3)} y={H - 5} textAnchor="middle" fontSize="9" fill="#86efac">minimum (w=3)</text>
        </svg>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.4rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "0.75rem", color: "#888" }}>α={lr.toFixed(2)}</label>
            <input type="range" min={0.05} max={0.9} step={0.05} value={lr}
              onChange={e => { setLr(+e.target.value); setRunning(false); setHistory([]); setW(-2); }}
              style={{ width: "100%" }} />
          </div>
          <button className="run-btn" onClick={start} disabled={running}>▶ Run</button>
        </div>
        {history.length > 0 && (
          <p style={{ fontSize: "0.75rem", color: "#f59e0b" }}>
            w={w.toFixed(3)} · loss={loss(w).toFixed(4)} · {history.length} steps
          </p>
        )}

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Learning Rate: Too High vs Too Low</h3>
        <p className="concept-def">
          The learning rate α controls how big each step is. Too small, and you take tiny shuffles — it could take thousands of iterations to reach the minimum, and you might get permanently stuck on a flat plateau. Too large, and you overshoot: you leap past the minimum, land on the other side of the curve, then leap back past it again — the loss bounces around and may never settle or even diverge upward. The sweet spot converges smoothly and efficiently. Try the demo above with α=0.9 (watch it oscillate or diverge) versus α=0.05 (watch it inch along slowly) to feel both failure modes. In real neural network training, the <strong>Adam optimizer</strong> sidesteps this problem by automatically adapting a different learning rate for each parameter.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>46</span>
    </div>
  );
});
GradientDescentA.displayName = "GradientDescentA";

export const GradientDescentB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Types of Gradient Descent</h3>
      <table className="cheat-table">
        <thead><tr><th>Type</th><th>Batch size</th><th>Characteristic</th></tr></thead>
        <tbody>
          <tr><td>Batch GD</td><td>All data</td><td>Stable but slow for large datasets</td></tr>
          <tr><td>Stochastic GD</td><td>1 sample</td><td>Fast, noisy, can escape local minima</td></tr>
          <tr><td>Mini-batch GD</td><td>32–256</td><td>Best of both — used in practice</td></tr>
        </tbody>
      </table>

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Learning Rate Effects</h3>
      <ul className="fact-list">
        <li><strong>Too small α</strong> — converges very slowly, may get stuck</li>
        <li><strong>Too large α</strong> — overshoots, diverges (loss increases!)</li>
        <li><strong>Good α</strong> — converges smoothly to minimum</li>
        <li>Use <strong>learning rate schedules</strong> or <strong>Adam optimizer</strong> in practice</li>
      </ul>

      <div className="exam-cards">
        <ExamCard q="What is a local vs global minimum?" a="Local: lowest in neighbourhood. Global: lowest overall. GD may get stuck in local minima." />
        <ExamCard q="What is the gradient?" a="The vector of partial derivatives — points in direction of steepest INCREASE in loss." />
        <ExamCard q="Backpropagation?" a="Algorithm to compute gradients for all weights in a neural network using chain rule." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>47</span>
  </div>
));
GradientDescentB.displayName = "GradientDescentB";
