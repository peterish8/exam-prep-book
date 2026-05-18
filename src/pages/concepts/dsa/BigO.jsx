import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

const complexities = [
  { label: "O(1)", color: "#16a34a", fn: () => 1, desc: "Constant — array index, hash lookup" },
  { label: "O(log n)", color: "#2563eb", fn: (n) => Math.log2(n), desc: "Logarithmic — binary search" },
  { label: "O(n)", color: "#f59e0b", fn: (n) => n, desc: "Linear — single loop, linear search" },
  { label: "O(n log n)", color: "#e67e22", fn: (n) => n * Math.log2(n), desc: "Merge sort, Heap sort" },
  { label: "O(n²)", color: "#e63946", fn: (n) => n * n, desc: "Quadratic — nested loops, bubble sort" },
  { label: "O(2ⁿ)", color: "#7c3aed", fn: (n) => Math.pow(2, n), desc: "Exponential — Tower of Hanoi, subsets" },
];

function BigOChart({ active }) {
  const w = 300, h = 180, maxN = 16;
  const active_fns = complexities.filter((_, i) => active.has(i));

  const maxY = Math.max(...active_fns.flatMap(c =>
    Array.from({ length: maxN }, (_, i) => c.fn(i + 1))
  ).filter(v => isFinite(v) && v < 9999), 10);

  const pts = (fn) =>
    Array.from({ length: maxN }, (_, i) => {
      const x = (i / (maxN - 1)) * (w - 40) + 20;
      const y = h - 20 - ((fn(i + 1) / maxY) * (h - 40));
      return `${x},${Math.max(5, y)}`;
    }).join(" ");

  return (
    <svg width={w} height={h} className="bigo-chart">
      {/* axes */}
      <line x1="20" y1={h - 20} x2={w - 10} y2={h - 20} stroke="#333" strokeWidth="1" />
      <line x1="20" y1="5" x2="20" y2={h - 20} stroke="#333" strokeWidth="1" />
      <text x={w / 2} y={h - 4} textAnchor="middle" fontSize="10" fill="#666">n (input size)</text>
      <text x="12" y={h / 2} textAnchor="middle" fontSize="10" fill="#666" transform={`rotate(-90,12,${h / 2})`}>time</text>
      {active_fns.map((c, i) => (
        <polyline key={i} points={pts(c.fn)} fill="none" stroke={c.color} strokeWidth="2" />
      ))}
    </svg>
  );
}

// Page A: left — chart + toggles
export const BigOA = forwardRef((props, ref) => {
  const [active, setActive] = useState(new Set([0, 1, 2]));
  const toggle = (i) => setActive(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#e63946" }}>DSA</div>
        <h2 className="concept-title">Big-O Notation</h2>
        <p className="concept-def">
          Big-O describes the <strong>worst-case growth rate</strong> of an algorithm's time or space as input grows. We drop constants and lower-order terms.
        </p>
        <p className="concept-formula">T(n) = O(f(n)) when T(n) ≤ c · f(n) for all n ≥ n₀</p>

        <BigOChart active={active} />

        <div className="bigo-toggles">
          {complexities.map((c, i) => (
            <button
              key={i}
              className={`bigo-btn ${active.has(i) ? "bigo-btn--on" : ""}`}
              style={{ "--c": c.color }}
              onClick={() => toggle(i)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="hint-text">Toggle curves on/off ↑</p>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Rules for Analyzing Complexity</h3>
        <ul className="fact-list">
          <li><strong>Drop constants:</strong> O(3n) → O(n). Constants don't matter at scale.</li>
          <li><strong>Keep dominant term only:</strong> O(n² + n) → O(n²). Lower terms are irrelevant as n → ∞.</li>
          <li><strong>Sequential steps → add:</strong> two separate loops = O(n) + O(n) = O(n).</li>
          <li><strong>Nested loops → multiply:</strong> loop inside loop = O(n) × O(n) = O(n²).</li>
          <li><strong>Halving each step → log:</strong> if you cut the problem in half each time, it's O(log n).</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>5</span>
    </div>
  );
});
BigOA.displayName = "BigOA";

// Page B: right — cheatsheet + exam Q&A
export const BigOB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Complexity Cheatsheet</h3>
      <table className="cheat-table">
        <thead><tr><th>Notation</th><th>Name</th><th>Example</th></tr></thead>
        <tbody>
          {complexities.map((c, i) => (
            <tr key={i}>
              <td style={{ color: c.color, fontWeight: 700 }}>{c.label}</td>
              <td>{c.desc.split("—")[0]}</td>
              <td style={{ fontSize: "0.75rem" }}>{c.desc.split("—")[1]?.trim()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="exam-cards">
        <ExamCard
          q="What is the time complexity of binary search?"
          a="O(log n) — it halves the search space each step."
        />
        <ExamCard
          q="Bubble sort has what complexity? Why?"
          a="O(n²) — two nested loops comparing adjacent elements."
        />
        <ExamCard
          q="Why do we drop constants in Big-O?"
          a="Constants don't affect growth rate at large n. O(3n) = O(n)."
        />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>6</span>
  </div>
));
BigOB.displayName = "BigOB";
