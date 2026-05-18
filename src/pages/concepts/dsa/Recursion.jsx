import { forwardRef, useState } from "react";
import CodeRunner from "../../../components/CodeRunner";
import ExamCard from "../../../components/ExamCard";

const frames = [
  { id: 4, label: "factorial(1)", returns: "1", active: true },
  { id: 3, label: "factorial(2)", returns: "2×1=2", active: false },
  { id: 2, label: "factorial(3)", returns: "3×2=6", active: false },
  { id: 1, label: "factorial(4)", returns: "4×6=24", active: false },
  { id: 0, label: "main()", returns: "—", active: false },
];

function CallStack({ step }) {
  const visible = frames.slice(Math.max(0, frames.length - 1 - step));
  return (
    <div className="call-stack">
      <div className="call-stack__label">Call Stack</div>
      {[...visible].reverse().map((f, i) => (
        <div key={f.id} className={`stack-frame ${i === visible.length - 1 ? "stack-frame--top" : ""}`}>
          <span className="frame-name">{f.label}</span>
          {step >= frames.length - 1 && (
            <span className="frame-return">→ {f.returns}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export const RecursionA = forwardRef((props, ref) => {
  const [step, setStep] = useState(0);
  const maxStep = frames.length - 1;

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#e63946" }}>DSA</div>
        <h2 className="concept-title">Recursion & the Call Stack</h2>
        <p className="concept-def">
          A function calls <strong>itself</strong> until it hits a <em>base case</em>. Each call gets its own <em>stack frame</em> pushed onto the call stack.
        </p>
        <div className="recursion-formula">
          <code>f(n) = n × f(n−1)</code>&nbsp;&nbsp;<code>f(0) = 1</code>
        </div>

        <CallStack step={step} />

        <div className="stepper-btns">
          <button disabled={step === 0} onClick={() => setStep(s => s - 1)}>← Pop</button>
          <span className="step-label">Step {step + 1}/{maxStep + 1}</span>
          <button disabled={step === maxStep} onClick={() => setStep(s => s + 1)}>Push →</button>
        </div>
        <p className="hint-text">Simulate factorial(4) call stack step by step</p>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Every Recursive Function Needs</h3>
        <ul className="fact-list">
          <li><strong>1. Base case:</strong> the condition that stops recursion. Without it → Stack Overflow.</li>
          <li><strong>2. Recursive case:</strong> calls itself with a smaller/simpler version of the problem.</li>
          <li><strong>3. Progress toward base case:</strong> each call must get closer to the base — never loop forever.</li>
        </ul>
        <p className="concept-formula">Base case rule: f(0) or f(1) — whatever makes the answer trivially known.</p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>7</span>
    </div>
  );
});
RecursionA.displayName = "RecursionA";

export const RecursionB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <CodeRunner
        language="javascript"
        code={`function factorial(n) {
  if (n === 0) return 1; // base case
  return n * factorial(n - 1);
}
console.log(factorial(4));`}
        outputs={[
          { text: "factorial(4) → 4 * factorial(3)" },
          { text: "factorial(3) → 3 * factorial(2)" },
          { text: "factorial(2) → 2 * factorial(1)" },
          { text: "factorial(1) → 1 * factorial(0)" },
          { text: "factorial(0) → 1  [BASE CASE]" },
          { text: "Unwinding... 1→2→6→24" },
          { text: "24" },
        ]}
      />
      <div className="exam-cards" style={{ marginTop: "1rem" }}>
        <ExamCard
          q="What happens if there's no base case?"
          a="Stack Overflow — the call stack fills up and crashes."
        />
        <ExamCard
          q="Recursion vs Iteration — when to use recursion?"
          a="Tree/graph traversal, divide-and-conquer, natural sub-problems (Hanoi)."
        />
        <ExamCard
          q="What is tail recursion?"
          a="When the recursive call is the LAST operation — can be optimised to iteration by compiler."
        />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>8</span>
  </div>
));
RecursionB.displayName = "RecursionB";
