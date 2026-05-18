import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

const STEPS = [
  { phase: "call-stack", label: "console.log('start')", output: "start", desc: "Sync code runs first on Call Stack" },
  { phase: "call-stack", label: "setTimeout(cb, 0)", output: null, desc: "setTimeout → Web API timer starts (even 0ms goes to macro queue)" },
  { phase: "call-stack", label: "Promise.resolve().then(cb2)", output: null, desc: "Promise .then → goes to Microtask Queue" },
  { phase: "call-stack", label: "console.log('end')", output: "end", desc: "Sync code continues" },
  { phase: "microtask", label: "Promise cb2 runs", output: "promise", desc: "Microtasks drain FIRST before macro tasks" },
  { phase: "macro", label: "setTimeout cb runs", output: "timeout", desc: "Macro task (setTimeout) runs last" },
];

export const EventLoopA = forwardRef((props, ref) => {
  const [step, setStep] = useState(0);
  const s = STEPS[Math.min(step, STEPS.length - 1)];
  const outputs = STEPS.slice(0, step + 1).filter(x => x.output).map(x => x.output);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">JS Execution Context & Event Loop</h2>

        <div className="event-loop-viz">
          <div className="el-box">
            <div className="el-box__label">Call Stack</div>
            {s.phase === "call-stack" && <div className="el-item el-item--active">{s.label}</div>}
          </div>
          <div className="el-box">
            <div className="el-box__label">Microtask Queue</div>
            {step >= 2 && step < 4 && <div className="el-item">Promise cb</div>}
          </div>
          <div className="el-box">
            <div className="el-box__label">Macro Queue</div>
            {step >= 1 && step < 5 && <div className="el-item">setTimeout cb</div>}
          </div>
          <div className="el-box el-box--output">
            <div className="el-box__label">Console Output</div>
            {outputs.map((o, i) => <div key={i} className="el-output">{o}</div>)}
          </div>
        </div>

        <p className="hint-text" style={{ marginTop: "0.25rem" }}>{s.desc}</p>

        <div className="stepper-btns">
          <button disabled={step === 0} onClick={() => setStep(s => s - 1)}>←</button>
          <span className="step-label">{step + 1}/{STEPS.length}</span>
          <button disabled={step === STEPS.length - 1} onClick={() => setStep(s => s + 1)}>→</button>
          <button onClick={() => setStep(0)} className="reset-btn">↺</button>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Microtask vs Macrotask Priority Rule</h3>
        <ul className="fact-list">
          <li><strong>Microtasks</strong> (Promise.then, queueMicrotask, MutationObserver) run <em>before</em> the next macrotask — the entire microtask queue drains first.</li>
          <li><strong>Macrotasks</strong> (setTimeout, setInterval, I/O callbacks) run one at a time, one per event loop tick.</li>
          <li><strong>Order always:</strong> Sync code → all Microtasks → one Macrotask → all Microtasks again → next Macrotask…</li>
          <li><strong>Exam trap:</strong> <code>setTimeout(fn, 0)</code> still runs after all Promises, even with 0ms delay.</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>31</span>
    </div>
  );
});
EventLoopA.displayName = "EventLoopA";

export const EventLoopB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Order of Execution</h3>
      <pre className="code-snippet" style={{ fontSize: "0.7rem" }}>{`console.log('1 - start');

setTimeout(() => console.log('4 - timeout'), 0);

Promise.resolve()
  .then(() => console.log('3 - promise'));

console.log('2 - end');

// Output order: 1 → 2 → 3 → 4`}</pre>

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Rules</h3>
      <ul className="fact-list">
        <li>1️⃣ <strong>Synchronous code</strong> — runs on Call Stack first</li>
        <li>2️⃣ <strong>Microtasks</strong> (Promises, queueMicrotask) — drain completely</li>
        <li>3️⃣ <strong>Macrotasks</strong> (setTimeout, setInterval, I/O) — one per loop tick</li>
        <li>🔄 Event Loop checks: Stack empty? → drain Microtasks → run 1 Macrotask → repeat</li>
      </ul>

      <div className="exam-cards">
        <ExamCard q="Why does setTimeout(fn, 0) not run immediately?" a="It's placed in the macro queue. All sync code + microtasks run first, even if delay is 0." />
        <ExamCard q="What is the Global Execution Context?" a="Created first, contains global code + global object (window/global) + 'this'. Function calls create new Function ECs." />
        <ExamCard q="Micro vs Macro tasks?" a="Micro: Promise.then, MutationObserver. Macro: setTimeout, setInterval, setImmediate. Micro runs before macro." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>32</span>
  </div>
));
EventLoopB.displayName = "EventLoopB";
