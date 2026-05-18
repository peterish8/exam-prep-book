import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

const TREE = {
  val: 1,
  left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
  right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null } },
};

function inorder(node, res = []) { if (!node) return res; inorder(node.left, res); res.push(node.val); inorder(node.right, res); return res; }
function preorder(node, res = []) { if (!node) return res; res.push(node.val); preorder(node.left, res); preorder(node.right, res); return res; }
function postorder(node, res = []) { if (!node) return res; postorder(node.left, res); postorder(node.right, res); res.push(node.val); return res; }
function levelorder(node) {
  if (!node) return [];
  const q = [node], res = [];
  while (q.length) { const n = q.shift(); res.push(n.val); if (n.left) q.push(n.left); if (n.right) q.push(n.right); }
  return res;
}

const orders = {
  Inorder: inorder(TREE),
  Preorder: preorder(TREE),
  Postorder: postorder(TREE),
  "Level-order": levelorder(TREE),
};

function TNode({ node, x, y, highlighted }) {
  if (!node) return null;
  const spread = 50, dy = 50;
  return (
    <g>
      {node.left && <line x1={x} y1={y} x2={x - spread} y2={y + dy} stroke="#444" />}
      {node.right && <line x1={x} y1={y} x2={x + spread} y2={y + dy} stroke="#444" />}
      <circle cx={x} cy={y} r={16}
        fill={highlighted.includes(node.val) ? "#2563eb" : "#1e1e2e"}
        stroke={highlighted.includes(node.val) ? "#60a5fa" : "#555"}
        strokeWidth="2" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="11" fill="#fff">{node.val}</text>
      <TNode node={node.left} x={x - spread} y={y + dy} highlighted={highlighted} />
      <TNode node={node.right} x={x + spread} y={y + dy} highlighted={highlighted} />
    </g>
  );
}

export const TraversalA = forwardRef((props, ref) => {
  const [mode, setMode] = useState("Inorder");
  const [step, setStep] = useState(0);
  const seq = orders[mode];

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#e63946" }}>DSA</div>
        <h2 className="concept-title">Binary Tree Traversals</h2>
        <p className="concept-def">
          Unlike an array, a tree has no single obvious reading order. Each <strong>traversal strategy</strong> visits every node exactly once, but in a different sequence — and the order reveals different things.
        </p>

        <div className="bigo-toggles" style={{ marginBottom: "0.5rem" }}>
          {Object.keys(orders).map(m => (
            <button key={m} className={`bigo-btn ${mode === m ? "bigo-btn--on" : ""}`}
              style={{ "--c": "#2563eb" }} onClick={() => { setMode(m); setStep(0); }}>
              {m}
            </button>
          ))}
        </div>

        <svg width="270" height="170" viewBox="0 0 270 170">
          <TNode node={TREE} x={135} y={25} highlighted={seq.slice(0, step + 1)} />
        </svg>

        <div className="traversal-seq">
          {seq.map((v, i) => (
            <span key={i} className={`trav-cell ${i <= step ? "trav-cell--visited" : ""} ${i === step ? "trav-cell--current" : ""}`}>
              {v}
            </span>
          ))}
        </div>

        <div className="stepper-btns">
          <button disabled={step === 0} onClick={() => setStep(s => s - 1)}>←</button>
          <span className="step-label">{step + 1}/{seq.length}</span>
          <button disabled={step === seq.length - 1} onClick={() => setStep(s => s + 1)}>→</button>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Which Traversal for What</h3>
        <ul className="fact-list">
          <li><strong>Inorder</strong> (L→Root→R): gives sorted output for BST — use to print/validate contents</li>
          <li><strong>Preorder</strong> (Root→L→R): root first — use to serialize or copy a tree structure</li>
          <li><strong>Postorder</strong> (L→R→Root): children before parent — use to delete a tree or evaluate expressions</li>
          <li><strong>Level-order</strong>: row by row via Queue (BFS) — use to find shortest path or print levels</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>20</span>
    </div>
  );
});
TraversalA.displayName = "TraversalA";

export const TraversalB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Traversal Order Rules</h3>
      <table className="cheat-table">
        <thead><tr><th>Type</th><th>Order</th><th>Output (tree above)</th></tr></thead>
        <tbody>
          <tr><td>Inorder</td><td>Left → Root → Right</td><td>4,2,5,1,6,3,7</td></tr>
          <tr><td>Preorder</td><td>Root → Left → Right</td><td>1,2,4,5,3,6,7</td></tr>
          <tr><td>Postorder</td><td>Left → Right → Root</td><td>4,5,2,6,7,3,1</td></tr>
          <tr><td>Level-order</td><td>BFS row by row</td><td>1,2,3,4,5,6,7</td></tr>
        </tbody>
      </table>

      <p className="concept-def" style={{ marginTop: "0.75rem", fontSize: "0.8rem" }}>
        <strong>Inorder of BST</strong> always gives sorted ascending output.
      </p>

      <div className="exam-cards">
        <ExamCard q="How to reconstruct a tree?" a="Need preorder + inorder OR postorder + inorder. Two traversals of same type aren't enough." />
        <ExamCard q="Level-order uses which data structure?" a="Queue — BFS. DFS traversals (in/pre/post) use Stack (implicitly via recursion)." />
        <ExamCard q="Height of a complete binary tree with n nodes?" a="⌊log₂(n)⌋ — e.g., 7 nodes → height 2." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>21</span>
  </div>
));
TraversalB.displayName = "TraversalB";
