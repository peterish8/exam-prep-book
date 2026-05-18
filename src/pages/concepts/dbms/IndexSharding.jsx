import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

export const IndexShardingA = forwardRef((props, ref) => {
  const [indexed, setIndexed] = useState(false);
  const [step, setStep] = useState(0);
  const totalDocs = 8;
  const targetIdx = 5;

  const scanSteps = indexed
    ? [targetIdx] // B-tree jump directly
    : Array.from({ length: targetIdx + 1 }, (_, i) => i);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
        <h2 className="concept-title">Indexing & Sharding</h2>
        <p className="concept-def">
          An <strong>index</strong> is a B-tree structure on a field — avoids full collection scan. Query goes from O(n) → O(log n).
        </p>

        <div className="live-demo">
          <div className="live-demo__label">Find doc #6 — with vs without index</div>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <button className={`bigo-btn ${!indexed ? "bigo-btn--on" : ""}`} style={{ "--c": "#e63946" }}
              onClick={() => { setIndexed(false); setStep(0); }}>No Index (Collection Scan)</button>
            <button className={`bigo-btn ${indexed ? "bigo-btn--on" : ""}`} style={{ "--c": "#16a34a" }}
              onClick={() => { setIndexed(true); setStep(0); }}>With Index</button>
          </div>

          <div className="array-viz" style={{ flexWrap: "wrap" }}>
            {Array.from({ length: totalDocs }, (_, i) => (
              <div key={i} className={`array-cell
                ${step > 0 && scanSteps.slice(0, step).includes(i) ? "cell--window" : ""}
                ${i === targetIdx && step >= scanSteps.length ? "cell--found" : ""}
              `}
                style={{ fontSize: "0.8rem" }}>
                #{i + 1}
              </div>
            ))}
          </div>

          <p style={{ fontSize: "0.78rem", color: "#aaa", marginTop: "0.3rem" }}>
            {indexed
              ? `Index: B-tree lookup → go directly to doc #6. 1 step!`
              : `Scan: checked ${Math.min(step, scanSteps.length)} / ${scanSteps.length} docs`}
          </p>

          <div className="stepper-btns">
            <button className="run-btn" disabled={step >= scanSteps.length}
              onClick={() => setStep(s => s + 1)}>→ Scan</button>
            <button className="reset-btn" onClick={() => setStep(0)}>↺</button>
          </div>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>How a B-tree Index Works</h3>
        <ul className="fact-list">
          <li><strong>B-tree</strong> is a self-balancing tree where each node holds sorted keys and pointers to children or data.</li>
          <li><strong>Search:</strong> start at root, compare target key, go left (smaller) or right (larger) — reaches data in O(log n) steps.</li>
          <li><strong>Without index:</strong> MongoDB scans every document in the collection (COLLSCAN) — O(n).</li>
          <li><strong>With index:</strong> MongoDB traverses the B-tree to the matching key, then jumps directly to the document (IXSCAN) — O(log n).</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>58</span>
    </div>
  );
});
IndexShardingA.displayName = "IndexShardingA";

export const IndexShardingB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Index Types</h3>
      <table className="cheat-table">
        <thead><tr><th>Type</th><th>Usage</th></tr></thead>
        <tbody>
          {[
            ["Single Field", "db.users.createIndex({age:1})"],
            ["Compound", "db.users.createIndex({age:1,city:1})"],
            ["Unique", "createIndex({email:1},{unique:true})"],
            ["Text", "createIndex({title:'text'}) for text search"],
            ["TTL", "Auto-expire docs after n seconds"],
          ].map(([t, u]) => <tr key={t}><td><strong>{t}</strong></td><td style={{ fontSize: "0.72rem" }}>{u}</td></tr>)}
        </tbody>
      </table>

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Sharding</h3>
      <svg width="260" height="95" viewBox="0 0 260 95">
        {["Shard 1\n_id: 1-33", "Shard 2\n_id: 34-66", "Shard 3\n_id: 67-100"].map((s, i) => (
          <g key={i}>
            <rect x={10 + i * 85} y={50} width={75} height={40} rx="5" fill="#1e1333" stroke="#7c3aed" />
            {s.split("\n").map((line, j) => (
              <text key={j} x={47 + i * 85} y={67 + j * 14} textAnchor="middle" fontSize="9" fill="#c4b5fd">{line}</text>
            ))}
          </g>
        ))}
        <rect x={95} y={5} width={70} height={25} rx="5" fill="#2d1f4e" stroke="#7c3aed" />
        <text x={130} y={22} textAnchor="middle" fontSize="10" fill="#ddd8ff">mongos Router</text>
        {[0, 1, 2].map(i => <line key={i} x1={130} y1={30} x2={47 + i * 85} y2={50} stroke="#7c3aed" strokeOpacity="0.5" />)}
      </svg>

      <div className="exam-cards">
        <ExamCard q="Shard key choice?" a="Choose a field with high cardinality and even distribution. Bad shard key → hot spots (one shard overloaded)." />
        <ExamCard q="Index on _id?" a="MongoDB auto-creates a unique index on _id. You don't need to create it manually." />
        <ExamCard q="explain() in MongoDB?" a="db.col.find({...}).explain('executionStats') — shows if query used an index (IXSCAN) or full scan (COLLSCAN)." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>59</span>
  </div>
));
IndexShardingB.displayName = "IndexShardingB";
