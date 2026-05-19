import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import MemoryBox from "../../../components/MemoryBox";

const BST_DATA = {
  val: 50,
  left: { val: 30, left: { val: 20, left: null, right: null }, right: { val: 40, left: null, right: null } },
  right: { val: 70, left: { val: 60, left: null, right: null }, right: { val: 80, left: null, right: null } },
};

function TreeNode({ node, x, y, highlight }) {
  if (!node) return null;
  const spread = 60;
  const dy = 55;
  return (
    <g>
      {node.left && <line x1={x} y1={y} x2={x - spread} y2={y + dy} stroke="#444" />}
      {node.right && <line x1={x} y1={y} x2={x + spread} y2={y + dy} stroke="#444" />}
      <circle cx={x} cy={y} r={18}
        fill={highlight === node.val ? "#e63946" : "#1e1e2e"}
        stroke={highlight === node.val ? "#ff6b6b" : "#555"}
        strokeWidth="2"
      />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fill="#fff">{node.val}</text>
      <TreeNode node={node.left} x={x - spread} y={y + dy} highlight={highlight} />
      <TreeNode node={node.right} x={x + spread} y={y + dy} highlight={highlight} />
    </g>
  );
}

function bstSearch(node, val) {
  if (!node) return [];
  if (node.val === val) return [node.val];
  if (val < node.val) return [node.val, ...bstSearch(node.left, val)];
  return [node.val, ...bstSearch(node.right, val)];
}

export const TreeA = forwardRef((props, ref) => {
  const [searchVal, setSearchVal] = useState(40);
  const [step, setStep] = useState(0);
  const path = bstSearch(BST_DATA, searchVal);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#e63946" }}>DSA</div>
        <h2 className="concept-title">Trees & BST</h2>
        <p className="concept-def">
          A <strong>Binary Search Tree (BST)</strong> has one rule: left child &lt; node &lt; right child. Every comparison eliminates half the remaining tree.
        </p>
        <ul className="fact-list">
          <li><strong>Search:</strong> go left if target &lt; node, right if target &gt; node — O(log n) avg</li>
          <li><strong>Insert:</strong> search for the right spot, place there — O(log n) avg</li>
          <li><strong>Inorder traversal</strong> of a BST gives values in sorted ascending order</li>
          <li><strong>Worst case O(n):</strong> sorted insertions create a skewed tree (linked list)</li>
        </ul>

        <svg width="280" height="200" viewBox="0 0 280 200">
          <TreeNode node={BST_DATA} x={140} y={30} highlight={path[step]} />
        </svg>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "#888" }}>Search:</span>
          {[20, 40, 60, 80].map(v => (
            <button key={v} className={`bigo-btn ${searchVal === v ? "bigo-btn--on" : ""}`}
              style={{ "--c": "#e63946" }} onClick={() => { setSearchVal(v); setStep(0); }}>
              {v}
            </button>
          ))}
        </div>

        <div className="stepper-btns" style={{ marginTop: "0.5rem" }}>
          <button disabled={step === 0} onClick={() => setStep(s => s - 1)}>←</button>
          <span className="step-label">
            {path[step]} {path[step] > searchVal ? "→ go left" : path[step] < searchVal ? "→ go right" : "✅ found!"}
          </span>
          <button disabled={step >= path.length - 1} onClick={() => setStep(s => s + 1)}>→</button>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>BST Property & Search Logic</h3>
        <p className="concept-def">
          The ordering rule cascades at <em>every</em> level — not just the root. Each comparison eliminates an entire subtree, giving O(log n) average performance.
        </p>
        <p className="concept-def">
          Bonus: <strong>inorder traversal</strong> (left → root → right) of any BST always yields values in perfectly sorted ascending order.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>18</span>
    </div>
  );
});
TreeA.displayName = "TreeA";

export const TreeB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Key Terminology</h3>
      <ul className="fact-list">
        <li><strong>Root</strong> — topmost node (no parent)</li>
        <li><strong>Leaf</strong> — node with no children</li>
        <li><strong>Height</strong> — longest path root→leaf</li>
        <li><strong>Depth</strong> — distance from root to node</li>
        <li><strong>Full BT</strong> — every node has 0 or 2 children</li>
        <li><strong>Complete BT</strong> — all levels filled except last (left-filled)</li>
        <li><strong>Balanced BT</strong> — |left height − right height| ≤ 1</li>
      </ul>

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>BST Operations</h3>
      <table className="cheat-table">
        <thead><tr><th>Op</th><th>Avg</th><th>Worst (skewed)</th></tr></thead>
        <tbody>
          <tr><td>Search</td><td>O(log n)</td><td>O(n)</td></tr>
          <tr><td>Insert</td><td>O(log n)</td><td>O(n)</td></tr>
          <tr><td>Delete</td><td>O(log n)</td><td>O(n)</td></tr>
        </tbody>
      </table>
      <MemoryBox
        title="BST Recall"
        accent="#e63946"
        mnemonic="LNR = Left smaller, Node middle, Right bigger"
        items={[
          { label: "Search", text: "compare once, discard one whole subtree" },
          { label: "Inorder", text: "left -> root -> right gives sorted order" },
          { label: "Skewed", text: "sorted insertions turn BST into O(n)" },
        ]}
      />

      <div className="exam-cards" style={{ marginTop: "0.75rem" }}>
        <ExamCard q="BST vs Binary Tree?" a="BST has ordering property (left < root < right). Binary Tree does not." />
        <ExamCard q="When does BST degrade to O(n)?" a="When inserted in sorted order — tree becomes a linked list (skewed)." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>19</span>
  </div>
));
TreeB.displayName = "TreeB";
