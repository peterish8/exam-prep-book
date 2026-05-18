import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

const JSX_DEMO = `// JSX  (looks like HTML but it's JS!)
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// React converts this to:
React.createElement("h1", null, "Hello, ", name);`;

export const ReactCoreA = forwardRef((props, ref) => {
  const [name, setName] = useState("World");
  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">React Core & JSX</h2>
        <p className="concept-def">
          React is a UI library. You build a <strong>component tree</strong>. React updates only what changed via the <em>Virtual DOM</em>.
        </p>

        <div className="live-demo">
          <div className="live-demo__label">Live JSX Demo</div>
          <input value={name} onChange={e => setName(e.target.value)}
            className="stack-input" placeholder="Your name" />
          <div className="jsx-output">
            <span style={{ color: "#f59e0b" }}>&lt;h1&gt;</span>
            Hello, <strong style={{ color: "#60a5fa" }}>{name || "..."}</strong>!
            <span style={{ color: "#f59e0b" }}>&lt;/h1&gt;</span>
          </div>
        </div>

        <pre className="code-snippet">{JSX_DEMO}</pre>

        <h3 className="concept-subtitle" style={{ marginTop: "0.5rem" }}>React Rules</h3>
        <ul className="fact-list">
          <li>Component name <strong>must start with Capital letter</strong></li>
          <li>JSX must return <strong>one root element</strong> (use &lt;&gt;…&lt;/&gt; fragments)</li>
          <li>Use <code>className</code> not <code>class</code>; <code>htmlFor</code> not <code>for</code></li>
          <li>JS expressions in JSX wrapped in <code>{'{ }'}</code></li>
        </ul>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Virtual DOM & Reconciliation</h3>
        <ul className="fact-list">
          <li><strong>Virtual DOM:</strong> a lightweight JS object copy of the real DOM kept in memory.</li>
          <li><strong>On state change:</strong> React creates a new Virtual DOM tree and <em>diffs</em> it against the old one.</li>
          <li><strong>Reconciliation:</strong> React calculates the minimum set of real DOM changes needed and applies only those.</li>
          <li><strong>Why faster:</strong> real DOM operations are slow; batching minimal changes avoids unnecessary repaints.</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>21</span>
    </div>
  );
});
ReactCoreA.displayName = "ReactCoreA";

export const ReactCoreB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Component Tree</h3>
      <svg width="280" height="170" viewBox="0 0 280 170">
        {/* App */}
        <rect x="105" y="10" width="70" height="28" rx="6" fill="#2563eb" />
        <text x="140" y="29" textAnchor="middle" fontSize="11" fill="#fff">App</text>
        {/* Navbar */}
        <rect x="30" y="60" width="80" height="28" rx="6" fill="#1d4ed8" />
        <text x="70" y="79" textAnchor="middle" fontSize="11" fill="#fff">Navbar</text>
        {/* Main */}
        <rect x="170" y="60" width="80" height="28" rx="6" fill="#1d4ed8" />
        <text x="210" y="79" textAnchor="middle" fontSize="11" fill="#fff">Main</text>
        {/* Card */}
        <rect x="150" y="115" width="60" height="25" rx="5" fill="#1e40af" />
        <text x="180" y="132" textAnchor="middle" fontSize="10" fill="#fff">Card</text>
        {/* Button */}
        <rect x="220" y="115" width="60" height="25" rx="5" fill="#1e40af" />
        <text x="250" y="132" textAnchor="middle" fontSize="10" fill="#fff">Button</text>
        {/* Lines */}
        <line x1="140" y1="38" x2="70" y2="60" stroke="#555" />
        <line x1="140" y1="38" x2="210" y2="60" stroke="#555" />
        <line x1="210" y1="88" x2="180" y2="115" stroke="#555" />
        <line x1="210" y1="88" x2="250" y2="115" stroke="#555" />
        <text x="140" y="165" textAnchor="middle" fontSize="10" fill="#666">Props flow DOWN ↓ · Events bubble UP ↑</text>
      </svg>

      <div className="exam-cards">
        <ExamCard q="Functional vs Class component?" a="Functional: simple function returning JSX, uses hooks. Class: extends React.Component, uses this.state & lifecycle methods." />
        <ExamCard q="What is a prop?" a="Data passed from parent to child — read-only. Child cannot modify props." />
        <ExamCard q="What is React Fragment?" a="<></> or <React.Fragment> — groups elements without adding DOM nodes." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>22</span>
  </div>
));
ReactCoreB.displayName = "ReactCoreB";
