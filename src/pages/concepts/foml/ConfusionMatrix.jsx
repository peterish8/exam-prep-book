import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

export const ConfusionMatrixA = forwardRef((props, ref) => {
  const [tp, setTp] = useState(50);
  const [fp, setFp] = useState(10);
  const [fn, setFn] = useState(5);
  const [tn, setTn] = useState(35);

  const precision = tp / (tp + fp) || 0;
  const recall = tp / (tp + fn) || 0;
  const accuracy = (tp + tn) / (tp + fp + fn + tn) || 0;
  const f1 = (2 * precision * recall) / (precision + recall) || 0;

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#16a34a" }}>FOML</div>
        <h2 className="concept-title">Confusion Matrix & Metrics</h2>

        <div className="cm-grid">
          <div />
          <div className="cm-header">Predicted +</div>
          <div className="cm-header">Predicted −</div>
          <div className="cm-row-label">Actual +</div>
          <div className="cm-cell cm-cell--tp" contentEditable suppressContentEditableWarning
            onInput={e => setTp(+e.target.textContent || 0)}>
            {tp}<div className="cm-abbr">TP</div>
          </div>
          <div className="cm-cell cm-cell--fn" contentEditable suppressContentEditableWarning
            onInput={e => setFn(+e.target.textContent || 0)}>
            {fn}<div className="cm-abbr">FN</div>
          </div>
          <div className="cm-row-label">Actual −</div>
          <div className="cm-cell cm-cell--fp" contentEditable suppressContentEditableWarning
            onInput={e => setFp(+e.target.textContent || 0)}>
            {fp}<div className="cm-abbr">FP</div>
          </div>
          <div className="cm-cell cm-cell--tn" contentEditable suppressContentEditableWarning
            onInput={e => setTn(+e.target.textContent || 0)}>
            {tn}<div className="cm-abbr">TN</div>
          </div>
        </div>
        <p className="hint-text">Click any cell to edit values</p>

        <div className="metrics-row">
          {[
            { label: "Accuracy", val: accuracy, color: "#16a34a" },
            { label: "Precision", val: precision, color: "#2563eb" },
            { label: "Recall", val: recall, color: "#f59e0b" },
            { label: "F1 Score", val: f1, color: "#7c3aed" },
          ].map(m => (
            <div key={m.label} className="metric-pill" style={{ "--mc": m.color }}>
              <div className="metric-val">{(m.val * 100).toFixed(1)}%</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Precision vs Recall Tradeoff</h3>
        <ul className="fact-list">
          <li><strong>Precision</strong> = of everything predicted positive, how many were actually positive? Penalises false alarms (FP).</li>
          <li><strong>Recall</strong> = of everything actually positive, how many did the model catch? Penalises missed cases (FN).</li>
          <li><strong>Raising threshold</strong> → higher precision, lower recall (fewer positives predicted, but more confident).</li>
          <li><strong>Lowering threshold</strong> → higher recall, lower precision (catches more positives, but more false alarms).</li>
          <li><strong>F1 score</strong> balances both — use it when you need a single metric for imbalanced classes.</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>49</span>
    </div>
  );
});
ConfusionMatrixA.displayName = "ConfusionMatrixA";

export const ConfusionMatrixB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Formula Sheet</h3>
      <table className="cheat-table">
        <thead><tr><th>Metric</th><th>Formula</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td>Accuracy</td><td>(TP+TN)/(TP+TN+FP+FN)</td><td>Overall correct</td></tr>
          <tr><td>Precision</td><td>TP/(TP+FP)</td><td>When predicted +, how often right?</td></tr>
          <tr><td>Recall/Sensitivity</td><td>TP/(TP+FN)</td><td>Of all actual +, how many caught?</td></tr>
          <tr><td>F1 Score</td><td>2·P·R/(P+R)</td><td>Harmonic mean of P & R</td></tr>
          <tr><td>Specificity</td><td>TN/(TN+FP)</td><td>Of actual −, correctly identified</td></tr>
        </tbody>
      </table>

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>TP/FP/FN/TN Definitions</h3>
      <ul className="fact-list">
        <li><strong>TP</strong> — True Positive: predicted +, actually +</li>
        <li><strong>TN</strong> — True Negative: predicted −, actually −</li>
        <li><strong>FP</strong> — False Positive (Type I): predicted +, actually − (false alarm)</li>
        <li><strong>FN</strong> — False Negative (Type II): predicted −, actually + (missed)</li>
      </ul>

      <div className="exam-cards">
        <ExamCard q="When to prioritise Recall over Precision?" a="Medical diagnosis (cancer detection) — missing a positive (FN) is worse than a false alarm (FP)." />
        <ExamCard q="When is accuracy misleading?" a="Imbalanced datasets — 99% negative: model predicting always negative gets 99% accuracy but 0% recall." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>50</span>
  </div>
));
ConfusionMatrixB.displayName = "ConfusionMatrixB";
