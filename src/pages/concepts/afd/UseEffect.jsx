import { forwardRef, useState, useEffect } from "react";
import ExamCard from "../../../components/ExamCard";

export const UseEffectA = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);

  useEffect(() => {
    setLog(l => [...l, `▶ Effect ran — count is ${count}`]);
    return () => setLog(l => [...l, `✕ Cleanup for count=${count}`]);
  }, [count]);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">useEffect & Virtual DOM</h2>
        <p className="concept-def">
          <code>useEffect</code> runs side effects after render. Dependency array controls when it runs.
        </p>

        <pre className="code-snippet" style={{ fontSize: "0.7rem" }}>{`useEffect(() => {
  // runs after render
  return () => { /* cleanup */ };
}, [dependency]); // [] = once, [x] = on x change`}</pre>

        <div className="live-demo" style={{ marginTop: "0.5rem" }}>
          <div className="live-demo__label">Live Effect Tracker</div>
          <button className="run-btn" onClick={() => setCount(c => c + 1)}>Increment Count ({count})</button>
          <div className="effect-log">
            {log.slice(-5).map((l, i) => (
              <div key={i} style={{ fontSize: "0.72rem", color: l.startsWith("✕") ? "#e63946" : "#60a5fa" }}>{l}</div>
            ))}
          </div>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>When does effect run?</h3>
        <table className="cheat-table">
          <thead><tr><th>Deps</th><th>Runs when</th></tr></thead>
          <tbody>
            <tr><td>No array</td><td>Every render</td></tr>
            <tr><td><code>[]</code></td><td>Once on mount</td></tr>
            <tr><td><code>[x,y]</code></td><td>When x or y changes</td></tr>
          </tbody>
        </table>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Dependency Array Rules</h3>
        <ul className="fact-list">
          <li><strong>No array:</strong> effect runs after every single render — usually a bug, rarely intentional.</li>
          <li><strong>Empty <code>[]</code>:</strong> runs once after first render (mount). Perfect for API calls, subscriptions.</li>
          <li><strong><code>[dep]</code>:</strong> runs after mount AND whenever <code>dep</code> changes. React uses <code>Object.is</code> to compare.</li>
          <li><strong>Cleanup function:</strong> the returned function runs before the next effect and on unmount — use it to cancel timers, unsubscribe, abort fetches.</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>25</span>
    </div>
  );
});
UseEffectA.displayName = "UseEffectA";

export const UseEffectB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Virtual DOM & Diffing</h3>
      <svg width="280" height="150" viewBox="0 0 280 150">
        {/* Old VDOM */}
        <text x="70" y="15" textAnchor="middle" fontSize="10" fill="#888">Old VDOM</text>
        <rect x="40" y="20" width="60" height="22" rx="4" fill="#1a1a2e" stroke="#555" />
        <text x="70" y="35" textAnchor="middle" fontSize="10" fill="#aaa">&lt;div&gt;</text>
        <rect x="20" y="55" width="45" height="20" rx="4" fill="#1a1a2e" stroke="#555" />
        <text x="42" y="69" textAnchor="middle" fontSize="9" fill="#aaa">h1: Hi</text>
        <rect x="75" y="55" width="45" height="20" rx="4" fill="#1a1a2e" stroke="#555" />
        <text x="97" y="69" textAnchor="middle" fontSize="9" fill="#aaa">p: old</text>
        <line x1="70" y1="42" x2="42" y2="55" stroke="#444" />
        <line x1="70" y1="42" x2="97" y2="55" stroke="#444" />

        {/* New VDOM */}
        <text x="210" y="15" textAnchor="middle" fontSize="10" fill="#888">New VDOM</text>
        <rect x="180" y="20" width="60" height="22" rx="4" fill="#1a1a2e" stroke="#555" />
        <text x="210" y="35" textAnchor="middle" fontSize="10" fill="#aaa">&lt;div&gt;</text>
        <rect x="160" y="55" width="45" height="20" rx="4" fill="#1a1a2e" stroke="#555" />
        <text x="182" y="69" textAnchor="middle" fontSize="9" fill="#aaa">h1: Hi</text>
        <rect x="215" y="55" width="45" height="20" rx="4" fill="#e63946" stroke="#ff6b6b" />
        <text x="237" y="69" textAnchor="middle" fontSize="9" fill="#fff">p: new ✎</text>
        <line x1="210" y1="42" x2="182" y2="55" stroke="#444" />
        <line x1="210" y1="42" x2="237" y2="55" stroke="#e63946" />

        <text x="140" y="90" textAnchor="middle" fontSize="10" fill="#f59e0b">↓ Diff: only p changed</text>
        <rect x="100" y="100" width="80" height="22" rx="4" fill="#16a34a" opacity="0.8" />
        <text x="140" y="115" textAnchor="middle" fontSize="10" fill="#fff">Patch real DOM</text>
      </svg>

      <div className="exam-cards">
        <ExamCard q="What is the Virtual DOM?" a="A lightweight JS copy of the real DOM. React diffs old vs new VDOM and only patches what changed." />
        <ExamCard q="useEffect for API call?" a="useEffect(() => { fetch(url).then(...) }, []) — empty array means once on mount." />
        <ExamCard q="Memory leak in useEffect?" a="Forgetting cleanup — unsubscribe/clearTimeout in the return function to avoid leaks." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>26</span>
  </div>
));
UseEffectB.displayName = "UseEffectB";
