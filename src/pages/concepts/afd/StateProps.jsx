import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

export const StatePropsA = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  const [items] = useState(["Apple", "Banana", "Cherry", "Date"]);
  const [show, setShow] = useState(true);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>
          AFD
        </div>
        <h2 className="concept-title">useState & Rendering</h2>

        <div className="live-demo" style={{ marginBottom: "0.75rem" }}>
          <div className="live-demo__label">useState Counter</div>
          <SyntaxBlock
            language="javascript"
            title="counter-hook.js"
            code={`const [count, setCount] = useState(0);`}
          />
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
          >
            <button className="run-btn" onClick={() => setCount((c) => c - 1)}>
              -
            </button>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#60a5fa",
                minWidth: "2rem",
                textAlign: "center",
              }}
            >
              {count}
            </span>
            <button className="run-btn" onClick={() => setCount((c) => c + 1)}>
              +
            </button>
            <button className="reset-btn" onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
        </div>

        <div className="live-demo" style={{ marginBottom: "0.75rem" }}>
          <div className="live-demo__label">Conditional Rendering</div>
          <button className="run-btn" onClick={() => setShow((s) => !s)}>
            {show ? "Hide" : "Show"} Message
          </button>
          {show && (
            <div className="jsx-output" style={{ marginTop: "0.4rem" }}>
              Hello from conditional render!
            </div>
          )}
        </div>

        <div className="live-demo">
          <div className="live-demo__label">List Rendering (.map)</div>
          <ul style={{ margin: 0, padding: "0 0 0 1rem" }}>
            {items.map((item, i) => (
              <li key={i} style={{ color: "#aaa", fontSize: "0.85rem" }}>
                <code style={{ color: "#f59e0b" }}>key={i}</code> - {item}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>
          State vs Props Mental Model
        </h3>
        <p className="concept-def">
          Think of a component like a vending machine. <strong>Props</strong> are
          the coins you put in from outside: they affect behavior, but the
          component cannot change them directly. <strong>State</strong> is the
          component&apos;s private memory, and changing it causes React to render
          the UI again.
        </p>
        <p className="concept-def">
          A simple memory trick: props are like function arguments, while state
          is like local data that survives between renders. If you mutate state
          without calling the setter, React does not see the change.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>
        24
      </span>
    </div>
  );
});
StatePropsA.displayName = "StatePropsA";

export const StatePropsB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Props Drilling Diagram</h3>

      <div className="drill-diagram">
        {["App (data)", "Parent", "Child", "GrandChild"].map((label, i) => (
          <div key={label} className="drill-diagram__step">
            {i > 0 && (
              <div className="drill-diagram__connector" aria-hidden="true">
                <span className="drill-diagram__line" />
                <span className="drill-diagram__arrow">props down</span>
              </div>
            )}
            <div
              className={`drill-diagram__node ${
                i === 0 ? "drill-diagram__node--source" : ""
              }`}
            >
              {label}
            </div>
          </div>
        ))}

        <div className="drill-diagram__warning">
          <strong>Problem:</strong> middle components pass props they do not use.
        </div>
      </div>

      <p className="concept-def" style={{ fontSize: "0.8rem" }}>
        <strong>Solution:</strong> React Context API passes shared data without
        drilling through every level.
      </p>

      <div className="exam-cards">
        <ExamCard
          q="State vs Props?"
          a="State is internal and can change. Props come from the parent and are read-only."
        />
        <ExamCard
          q="Why does React re-render on setState?"
          a="React sees new state, reruns the component, and updates only the changed UI."
        />
        <ExamCard
          q="What is the key prop in lists?"
          a="It helps React track which item changed, moved, or was removed."
        />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>
      25
    </span>
  </div>
));
StatePropsB.displayName = "StatePropsB";
