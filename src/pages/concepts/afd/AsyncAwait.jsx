import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

const STEPS_ASYNC = [
  { label: "Call fetchUser(1)", state: "calling" },
  { label: "await fetch('/api/user/1')", state: "waiting", note: "JS suspends fetchUser, event loop free" },
  { label: "HTTP response arrives", state: "resuming" },
  { label: "Parse JSON → user object", state: "parsing" },
  { label: "Return user", state: "done" },
];

export const AsyncAwaitA = forwardRef((props, ref) => {
  const [step, setStep] = useState(0);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">Async / Await & Throttling</h2>
        <p className="concept-def">
          <code>async</code> functions always return a Promise. <code>await</code> pauses execution inside the function without blocking the main thread.
        </p>

        <pre className="code-snippet" style={{ fontSize: "0.68rem" }}>{`async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/user/\${id}\`);
    if (!res.ok) throw new Error('Not found');
    const user = await res.json();
    return user;
  } catch (err) {
    console.error(err);
  }
}`}</pre>

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
          <button disabled={step === 0} onClick={() => setStep(s => s - 1)}>←</button>
          <span className="step-label">{step + 1}/{STEPS_ASYNC.length}</span>
          <button disabled={step === STEPS_ASYNC.length - 1} onClick={() => setStep(s => s + 1)}>→</button>
          <button onClick={() => setStep(0)} className="reset-btn">↺</button>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>async/await vs Promise Chaining</h3>
        <ul className="fact-list">
          <li><strong>Same under the hood:</strong> <code>async/await</code> is syntactic sugar over Promises — both produce a Promise.</li>
          <li><strong>async/await reads linearly</strong> like synchronous code, making logic easier to follow and debug.</li>
          <li><strong>Promise chaining</strong> uses <code>.then().catch().finally()</code> — good for simple pipelines but nests deeply with complex logic.</li>
          <li><strong>Error handling:</strong> <code>async/await</code> uses <code>try/catch</code>; Promise chains use <code>.catch()</code>. Both catch rejections.</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>33</span>
    </div>
  );
});
AsyncAwaitA.displayName = "AsyncAwaitA";

export const AsyncAwaitB = forwardRef((props, ref) => {
  const [calls, setCalls] = useState([]);
  const [throttling, setThrottling] = useState(false);

  const addCall = () => {
    const now = Date.now();
    setCalls(c => [...c.slice(-6), { t: now, blocked: throttling }]);
  };

  return (
    <div ref={ref} className="book-page concept-page concept-page--right">
      <div className="page-inner">
        <h3 className="concept-subtitle">API Throttling & Rate Limiting</h3>
        <p className="concept-def" style={{ fontSize: "0.8rem" }}>
          <strong>Throttle</strong>: max once per time window. <strong>Debounce</strong>: only fires after user stops for X ms.
        </p>
        <pre className="code-snippet" style={{ fontSize: "0.67rem" }}>{`// Throttle: max 1 call per 1000ms
function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

// Debounce: fires after 500ms of silence
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`}</pre>

        <div className="exam-cards" style={{ marginTop: "0.5rem" }}>
          <ExamCard q="Promise.all vs Promise.race?" a="all: waits for ALL to resolve (fails fast). race: resolves/rejects when FIRST settles." />
          <ExamCard q="async/await vs .then chains?" a="Same under the hood. async/await is syntactic sugar — reads more like synchronous code." />
          <ExamCard q="Throttle vs Debounce use cases?" a="Throttle: scroll events, resize. Debounce: search input, form validation on keyup." />
        </div>
      </div>
      <span className="page-number" style={{ right: "1rem" }}>34</span>
    </div>
  );
});
AsyncAwaitB.displayName = "AsyncAwaitB";
