import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

const STEPS = [
  { phase: "call-stack", label: "console.log('start')", output: "start", desc: "Sync code runs first on the call stack" },
  { phase: "call-stack", label: "setTimeout(cb, 0)", output: null, desc: "setTimeout moves work to the macro queue" },
  { phase: "call-stack", label: "Promise.resolve().then(cb2)", output: null, desc: "Promise callbacks go to the microtask queue" },
  { phase: "call-stack", label: "console.log('end')", output: "end", desc: "Current sync code still finishes first" },
  { phase: "microtask", label: "Promise cb2 runs", output: "promise", desc: "Microtasks run before macrotasks" },
  { phase: "macro", label: "setTimeout cb runs", output: "timeout", desc: "Timer callback runs after microtasks" },
];

export const EventLoopA = forwardRef((props, ref) => {
  const [step, setStep] = useState(0);
  const s = STEPS[Math.min(step, STEPS.length - 1)];
  const outputs = STEPS.slice(0, step + 1).filter((x) => x.output).map((x) => x.output);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">JS Execution Context & Event Loop</h2>
        <p className="concept-def">
          JavaScript has one main worker, so it needs a traffic manager. That manager is the
          <strong> Event Loop</strong>.
        </p>
        <ul className="fact-list">
          <li><strong>Call Stack:</strong> runs current synchronous code</li>
          <li><strong>Web APIs:</strong> handle timers, fetch, and browser work outside the stack</li>
          <li><strong>Microtask Queue:</strong> Promise callbacks get higher priority</li>
          <li><strong>Macro Queue:</strong> timers and similar tasks wait here</li>
        </ul>
        <p className="concept-def">
          When the stack becomes empty, the event loop decides what runs next.
        </p>

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
          <button disabled={step === 0} onClick={() => setStep((v) => v - 1)}>{"<-"}</button>
          <span className="step-label">{step + 1}/{STEPS.length}</span>
          <button disabled={step === STEPS.length - 1} onClick={() => setStep((v) => v + 1)}>{"->"}</button>
          <button onClick={() => setStep(0)} className="reset-btn">Reset</button>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Microtask vs Macrotask Priority Rule</h3>
        <p className="concept-def">
          <strong>Microtasks</strong> win the race. Promise callbacks run before the loop touches the next macrotask.
        </p>
        <p className="concept-def">
          That&apos;s why <code>setTimeout(fn, 0)</code> still waits. Current sync code and all pending Promise callbacks go first.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>32</span>
    </div>
  );
});
EventLoopA.displayName = "EventLoopA";

export const EventLoopB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Order of Execution</h3>
      <SyntaxBlock language="javascript" title="event-loop-demo.js" code={`console.log('1 - start');

setTimeout(() => console.log('4 - timeout'), 0);

Promise.resolve()
  .then(() => console.log('3 - promise'));

console.log('2 - end');

// Output order: 1 -> 2 -> 3 -> 4`} />

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Rules</h3>
      <ul className="fact-list">
        <li><strong>Synchronous code:</strong> runs on the call stack first</li>
        <li><strong>Microtasks:</strong> Promise callbacks drain completely</li>
        <li><strong>Macrotasks:</strong> setTimeout and similar tasks run after that</li>
        <li><strong>Loop order:</strong> empty stack, then drain microtasks, then run one macrotask</li>
      </ul>

      <div className="exam-cards">
        <ExamCard q="Why does setTimeout(fn, 0) not run immediately?" a="It waits in the macro queue until sync code and microtasks finish." />
        <ExamCard q="What is the Global Execution Context?" a="The first execution context created for global code, global object access, and top-level this." />
        <ExamCard q="Micro vs Macro tasks?" a="Promise.then is microtask. setTimeout is macrotask. Microtasks run first." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>33</span>
  </div>
));
EventLoopB.displayName = "EventLoopB";
