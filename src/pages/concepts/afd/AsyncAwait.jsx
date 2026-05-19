import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import MemoryBox from "../../../components/MemoryBox";
import SyntaxBlock from "../../../components/SyntaxBlock";

const STEPS_ASYNC = [
  { label: "Call fetchUser(1)", note: "" },
  { label: "await fetch('/api/user/1')", note: "Function pauses, but JS can do other work" },
  { label: "HTTP response arrives", note: "" },
  { label: "Parse JSON -> user object", note: "" },
  { label: "Return user", note: "" },
];

export const AsyncAwaitA = forwardRef((props, ref) => {
  const [step, setStep] = useState(0);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">Async / Await & Throttling</h2>
        <p className="concept-def">
          <strong>async/await</strong> makes asynchronous code read like normal step-by-step code. The function pauses, but JavaScript itself does not freeze.
        </p>
        <ul className="fact-list">
          <li><strong>async:</strong> makes a function return a Promise</li>
          <li><strong>await:</strong> waits for a Promise result inside async code</li>
          <li><strong>Non-blocking:</strong> the event loop can still do other work</li>
          <li><strong>try/catch:</strong> clean way to handle async errors</li>
        </ul>

        <SyntaxBlock language="javascript" title="fetch-user.js" code={`async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/user/\${id}\`);
    if (!res.ok) throw new Error('Not found');
    const user = await res.json();
    return user;
  } catch (err) {
    console.error(err);
  }
}`} />

        <div className="async-timeline">
          {STEPS_ASYNC.map((s, i) => (
            <div key={i} className={`async-step ${i <= step ? "async-step--done" : ""} ${i === step ? "async-step--active" : ""}`}>
              <div className="async-step__dot" />
              <div className="async-step__label">{s.label}</div>
              {s.note && i === step && <div className="async-step__note">{s.note}</div>}
            </div>
          ))}
        </div>

        <div className="stepper-btns">
          <button disabled={step === 0} onClick={() => setStep((v) => v - 1)}>{"<-"}</button>
          <span className="step-label">{step + 1}/{STEPS_ASYNC.length}</span>
          <button disabled={step === STEPS_ASYNC.length - 1} onClick={() => setStep((v) => v + 1)}>{"->"}</button>
          <button onClick={() => setStep(0)} className="reset-btn">Reset</button>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>async/await vs Promise Chaining</h3>
        <p className="concept-def">
          Under the hood, <strong>async/await</strong> still uses Promises. The big win is readability when logic gets longer.
        </p>
        <p className="concept-def">
          Promise chains are fine for short flows. For bigger flows, async/await usually feels cleaner.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>34</span>
    </div>
  );
});
AsyncAwaitA.displayName = "AsyncAwaitA";

export const AsyncAwaitB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">API Throttling & Rate Limiting</h3>
      <p className="concept-def" style={{ fontSize: "0.8rem" }}>
        <strong>Throttle</strong> means "run at most once per time window." <strong>Debounce</strong> means "wait until typing or activity stops."
      </p>
      <SyntaxBlock language="javascript" title="timing-utils.js" code={`function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`} />

      <MemoryBox
        title="Async Recall"
        accent="#2563eb"
        mnemonic="A-WAIT = Async returns Promise, Wait inside function, App keeps running, Isolate errors, Then resume"
        items={[
          { label: "async", text: "always wraps return value in a Promise" },
          { label: "await", text: "pauses only this async function, not the whole JS thread" },
          { label: "throttle", text: "run at most once per time window" },
          { label: "debounce", text: "run after activity finally stops" },
        ]}
      />

      <div className="exam-cards" style={{ marginTop: "0.5rem" }}>
        <ExamCard q="Promise.all vs Promise.race?" a="all waits for every Promise. race settles as soon as the first one settles." />
        <ExamCard q="async/await vs .then chains?" a="Same engine underneath. async/await usually reads more clearly." />
        <ExamCard q="Throttle vs Debounce use cases?" a="Throttle for scroll or resize. Debounce for search input or validation after typing." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>35</span>
  </div>
));
AsyncAwaitB.displayName = "AsyncAwaitB";
