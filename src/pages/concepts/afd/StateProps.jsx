import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

export const StatePropsA = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  const [items] = useState(["Apple", "Banana", "Cherry", "Date"]);
  const [show, setShow] = useState(true);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">useState & Rendering</h2>

        <div className="live-demo" style={{ marginBottom: "0.75rem" }}>
          <div className="live-demo__label">useState Counter</div>
          <pre className="code-snippet" style={{ fontSize: "0.72rem" }}>{`const [count, setCount] = useState(0);`}</pre>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.5rem" }}>
            <button className="run-btn" onClick={() => setCount(c => c - 1)}>−</button>
            <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#60a5fa", minWidth: "2rem", textAlign: "center" }}>{count}</span>
            <button className="run-btn" onClick={() => setCount(c => c + 1)}>+</button>
            <button className="reset-btn" onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>

        <div className="live-demo" style={{ marginBottom: "0.75rem" }}>
          <div className="live-demo__label">Conditional Rendering</div>
          <button className="run-btn" onClick={() => setShow(s => !s)}>{show ? "Hide" : "Show"} Message</button>
          {show && <div className="jsx-output" style={{ marginTop: "0.4rem" }}>👋 Hello from conditional render!</div>}
        </div>

        <div className="live-demo">
          <div className="live-demo__label">List Rendering (.map)</div>
          <ul style={{ margin: 0, padding: "0 0 0 1rem" }}>
            {items.map((item, i) => (
              <li key={i} style={{ color: "#aaa", fontSize: "0.85rem" }}>
                <code style={{ color: "#f59e0b" }}>key={i}</code> → {item}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>State vs Props Mental Model</h3>
        <ul className="fact-list">
          <li><strong>State</strong> = a component's own memory. Private, mutable via <code>setState</code>, triggers re-render on change.</li>
          <li><strong>Props</strong> = data passed in from parent. Read-only — a component must never modify its own props.</li>
          <li><strong>Re-render trigger:</strong> React re-renders when state changes OR when parent passes new props. It compares values with <code>Object.is</code>.</li>
          <li><strong>Mental model:</strong> props are like function arguments; state is like a local variable that persists between renders.</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>23</span>
    </div>
  );
});
StatePropsA.displayName = "StatePropsA";

export const StatePropsB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Props Drilling Diagram</h3>
      <svg width="270" height="150" viewBox="0 0 270 150">
        {["App (data)", "Parent", "Child", "GrandChild"].map((label, i) => {
          const y = 10 + i * 35;
          const w = 160 - i * 20;
          const x = 135 - w / 2;
          return (
            <g key={i}>
              {i > 0 && <line x1="135" y1={y - 10} x2="135" y2={y} stroke="#f59e0b" strokeDasharray="3" />}
              <rect x={x} y={y} width={w} height={26} rx="5" fill="#1e3a5f" stroke="#2563eb" />
              <text x="135" y={y + 17} textAnchor="middle" fontSize="10" fill="#93c5fd">{label}</text>
            </g>
          );
        })}
        <text x="180" y="85" fontSize="9" fill="#f59e0b">props ↓</text>
        <text x="60" y="130" fontSize="9" fill="#e63946">Problem: middle components</text>
        <text x="60" y="142" fontSize="9" fill="#e63946">pass props they don't need</text>
      </svg>

      <p className="concept-def" style={{ fontSize: "0.8rem" }}>
        <strong>Solution:</strong> React Context API — pass data without drilling through every level.
      </p>

      <div className="exam-cards">
        <ExamCard q="State vs Props?" a="State: internal, mutable, managed by component. Props: external, read-only, from parent." />
        <ExamCard q="Why does React re-render on setState?" a="React compares new state to old. If different, it re-runs the component function and updates the DOM diff." />
        <ExamCard q="What is the key prop in lists?" a="Helps React identify which items changed. Without it, React re-renders entire list on any change." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>24</span>
  </div>
));
StatePropsB.displayName = "StatePropsB";
