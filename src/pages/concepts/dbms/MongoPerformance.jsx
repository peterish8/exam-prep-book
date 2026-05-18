import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

const PIPELINE_STAGES = [
  "{ $match: { score: { $gte: 70 } } }",
  "{ $group: { _id: \"$city\", avgScore: { $avg: \"$score\" }, total: { $sum: 1 } } }",
  "{ $sort: { avgScore: -1 } }",
];

export const MongoPerformanceA = forwardRef((props, ref) => {
  const [indexed, setIndexed] = useState(false);
  const [step, setStep] = useState(0);
  const totalDocs = 8;
  const targetIdx = 5;
  const scanSteps = indexed ? [targetIdx] : Array.from({ length: targetIdx + 1 }, (_, i) => i);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
        <h2 className="concept-title">MongoDB Performance + Design</h2>
        <p className="concept-def">
          Fast MongoDB design comes from three ideas working together: <strong>indexes</strong>, <strong>aggregation</strong>, and the right <strong>schema shape</strong>.
        </p>
        <ul className="fact-list">
          <li><strong>Index types:</strong> single, compound, and multikey are exam favorites</li>
          <li><strong>explain():</strong> tells you whether Mongo used IXSCAN or COLLSCAN</li>
          <li><strong>Aggregation:</strong> build result stages with $match, $group, $project, $lookup</li>
          <li><strong>Schema choice:</strong> embed for read speed, reference for reuse and control</li>
          <li><strong>Scale story:</strong> sharding spreads data, caching reduces repeated reads</li>
        </ul>

        <div className="live-demo">
          <div className="live-demo__label">Index vs Collection Scan</div>
          <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
            <button className={`bigo-btn ${!indexed ? "bigo-btn--on" : ""}`} style={{ "--c": "#ef4444" }} onClick={() => { setIndexed(false); setStep(0); }}>No Index</button>
            <button className={`bigo-btn ${indexed ? "bigo-btn--on" : ""}`} style={{ "--c": "#22c55e" }} onClick={() => { setIndexed(true); setStep(0); }}>With Index</button>
          </div>
          <div className="array-viz">
            {Array.from({ length: totalDocs }, (_, i) => (
              <div
                key={i}
                className={`array-cell ${step > 0 && scanSteps.slice(0, step).includes(i) ? "cell--window" : ""} ${i === targetIdx && step >= scanSteps.length ? "cell--found" : ""}`}
              >
                #{i + 1}
              </div>
            ))}
          </div>
          <p className="hint-text">
            {indexed ? "Indexed path jumps close to the target quickly." : "Without an index, Mongo checks row after row."}
          </p>
          <div className="stepper-btns">
            <button className="run-btn" disabled={step >= scanSteps.length} onClick={() => setStep((s) => s + 1)}>Step</button>
            <button className="reset-btn" onClick={() => setStep(0)}>Reset</button>
          </div>
        </div>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>70</span>
    </div>
  );
});
MongoPerformanceA.displayName = "MongoPerformanceA";

export const MongoPerformanceB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <SyntaxBlock
        language="javascript"
        title="aggregation-and-explain.js"
        code={`db.students.find({ city: "Chennai" }).explain("executionStats")

db.students.aggregate([
  ${PIPELINE_STAGES.join(",\n  ")}
])

// embed if child data always travels with parent
// reference if child data is shared across many docs`}
      />

      <div className="dbms-compare-grid">
        <div className="dbms-compare-card">
          <h4>Embed</h4>
          <p>fewer reads, simpler fetches</p>
        </div>
        <div className="dbms-compare-card dbms-compare-card--accent">
          <h4>Reference</h4>
          <p>less duplication, better reuse</p>
        </div>
      </div>

      <div className="exam-cards">
        <ExamCard q="What does explain() show?" a="It reveals how Mongo executes a query, including whether it used an index scan or full collection scan." />
        <ExamCard q="When should you embed instead of reference?" a="When the child data is usually read together with the parent and does not grow without bound." />
        <ExamCard q="Why does sharding matter?" a="It distributes data across servers so large workloads and datasets can scale horizontally." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>71</span>
  </div>
));
MongoPerformanceB.displayName = "MongoPerformanceB";
