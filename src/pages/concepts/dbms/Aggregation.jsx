import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

const DOCS = [
  { name: "Alice", city: "Chennai", score: 88 },
  { name: "Bob", city: "Mumbai", score: 72 },
  { name: "Charlie", city: "Chennai", score: 95 },
  { name: "Diana", city: "Delhi", score: 61 },
  { name: "Eve", city: "Mumbai", score: 79 },
  { name: "Frank", city: "Chennai", score: 55 },
];

const STAGES = [
  {
    label: "$match score≥70",
    code: `{ $match: { score: { $gte: 70 } } }`,
    fn: (docs) => docs.filter(d => d.score >= 70),
  },
  {
    label: "$group by city",
    code: `{ $group: {
  _id: "$city",
  avgScore: { $avg: "$score" },
  count: { $sum: 1 }
}}`,
    fn: (docs) => {
      const map = {};
      docs.forEach(d => {
        if (!map[d.city]) map[d.city] = { scores: [], count: 0 };
        map[d.city].scores.push(d.score);
        map[d.city].count++;
      });
      return Object.entries(map).map(([city, v]) => ({
        _id: city,
        avgScore: +(v.scores.reduce((a, b) => a + b, 0) / v.scores.length).toFixed(1),
        count: v.count,
      }));
    },
  },
  {
    label: "$sort avgScore ↓",
    code: `{ $sort: { avgScore: -1 } }`,
    fn: (docs) => [...docs].sort((a, b) => (b.avgScore || b.score) - (a.avgScore || a.score)),
  },
];

export const AggregationA = forwardRef((props, ref) => {
  const [activeStages, setActiveStages] = useState([]);

  const result = STAGES.filter((_, i) => activeStages.includes(i))
    .reduce((docs, stage) => stage.fn(docs), DOCS);

  const toggle = (i) => {
    setActiveStages(prev => {
      const maxAllowed = i + 1;
      if (prev.includes(i)) return prev.filter(s => s < i);
      return Array.from({ length: maxAllowed }, (_, j) => j);
    });
  };

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
        <h2 className="concept-title">Aggregation Pipeline</h2>
        <p className="concept-def">
          Documents flow through <strong>stages</strong> — each transforms the data. Like a Unix pipe.
        </p>

        <div className="pipeline">
          {STAGES.map((s, i) => (
            <button key={i}
              className={`pipeline-stage ${activeStages.includes(i) ? "pipeline-stage--on" : ""}`}
              onClick={() => toggle(i)}>
              {s.label}
            </button>
          ))}
        </div>

        <div className="code-runner" style={{ margin: "0.5rem 0" }}>
          <pre className="code-runner__code"><code>{
            `db.users.aggregate([\n${STAGES.filter((_, i) => activeStages.includes(i)).map(s => "  " + s.code).join(",\n")}\n])`
          }</code></pre>
          <div className="code-runner__output">
            <span className="output-label">Results ({result.length}):</span>
            {result.map((d, i) => (
              <div key={i} className="output-line" style={{ fontSize: "0.7rem" }}>
                {JSON.stringify(d)}
              </div>
            ))}
          </div>
        </div>
        <p className="hint-text">Click stages in order to build pipeline</p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>59</span>
    </div>
  );
});
AggregationA.displayName = "AggregationA";

export const AggregationB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Aggregation Stage Reference</h3>
      <table className="cheat-table">
        <thead><tr><th>Stage</th><th>Purpose</th></tr></thead>
        <tbody>
          {[
            ["$match", "Filter documents (like WHERE in SQL)"],
            ["$group", "Group by field + aggregate ($sum, $avg, $max, $min, $count)"],
            ["$sort", "Sort results (-1=desc, 1=asc)"],
            ["$project", "Include/exclude/rename fields"],
            ["$limit", "Restrict number of output docs"],
            ["$skip", "Skip first n docs (pagination)"],
            ["$unwind", "Deconstruct array field to separate docs"],
            ["$lookup", "LEFT JOIN from another collection"],
            ["$addFields", "Add new computed fields"],
          ].map(([s, p]) => <tr key={s}><td><code style={{ color: "#c4b5fd" }}>{s}</code></td><td style={{ fontSize: "0.72rem" }}>{p}</td></tr>)}
        </tbody>
      </table>

      <div className="exam-cards" style={{ marginTop: "0.5rem" }}>
        <ExamCard q="$group accumulator operators?" a="$sum, $avg, $min, $max, $first, $last, $push (array), $addToSet (unique array)." />
        <ExamCard q="$match vs $project order?" a="Always $match early (filters docs, reduces pipeline size). $project at end to shape output." />
        <ExamCard q="How to count total documents?" a="db.col.countDocuments({}) or aggregate with $count stage or $group {_id:null, total:{$sum:1}}." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>60</span>
  </div>
));
AggregationB.displayName = "AggregationB";
