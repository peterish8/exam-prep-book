import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

const SAMPLE_DOCS = [
  { _id: 1, name: "Alice", age: 25, city: "Chennai", score: 88 },
  { _id: 2, name: "Bob", age: 32, city: "Mumbai", score: 72 },
  { _id: 3, name: "Charlie", age: 19, city: "Chennai", score: 95 },
  { _id: 4, name: "Diana", age: 28, city: "Delhi", score: 61 },
  { _id: 5, name: "Eve", age: 35, city: "Mumbai", score: 79 },
];

const QUERIES = [
  { label: "find all", query: "db.users.find({})", fn: (docs) => docs },
  { label: "age > 25", query: "db.users.find({ age: {$gt: 25} })", fn: (docs) => docs.filter(d => d.age > 25) },
  { label: "city = Chennai", query: 'db.users.find({ city: "Chennai" })', fn: (docs) => docs.filter(d => d.city === "Chennai") },
  { label: "score $in [72,79]", query: "db.users.find({ score: {$in:[72,79]} })", fn: (docs) => docs.filter(d => [72, 79].includes(d.score)) },
  { label: "sort by score ↑", query: "db.users.find().sort({score:1})", fn: (docs) => [...docs].sort((a, b) => a.score - b.score) },
  { label: "limit 3", query: "db.users.find().limit(3)", fn: (docs) => docs.slice(0, 3) },
];

export const CrudOpsA = forwardRef((props, ref) => {
  const [activeQ, setActiveQ] = useState(0);
  const result = QUERIES[activeQ].fn(SAMPLE_DOCS);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
        <h2 className="concept-title">CRUD & Query Operators</h2>

        <div className="bigo-toggles" style={{ flexWrap: "wrap" }}>
          {QUERIES.map((q, i) => (
            <button key={i} className={`bigo-btn ${activeQ === i ? "bigo-btn--on" : ""}`}
              style={{ "--c": "#7c3aed" }} onClick={() => setActiveQ(i)}>
              {q.label}
            </button>
          ))}
        </div>

        <div className="code-runner" style={{ marginTop: "0.5rem" }}>
          <div className="code-runner__header">
            <span className="code-runner__lang">MongoDB Shell</span>
          </div>
          <pre className="code-runner__code"><code>{QUERIES[activeQ].query}</code></pre>
          <div className="code-runner__output">
            <span className="output-label">Results ({result.length}):</span>
            {result.map((d) => (
              <div key={d._id} className="output-line" style={{ fontSize: "0.72rem" }}>
                {`{ name: "${d.name}", age: ${d.age}, city: "${d.city}", score: ${d.score} }`}
              </div>
            ))}
          </div>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Query Operator Cheat Sheet</h3>
        <ul className="fact-list">
          <li><strong>$gt / $gte / $lt / $lte:</strong> greater/less than (or equal). e.g. <code>{"{ age: { $gt: 18 } }"}</code></li>
          <li><strong>$in / $nin:</strong> field value is (or is not) in a given array. e.g. <code>{"{ score: { $in: [72, 88] } }"}</code></li>
          <li><strong>$exists:</strong> checks if a field is present. <code>{"{ phone: { $exists: true } }"}</code></li>
          <li><strong>$and / $or:</strong> combine conditions. <code>{"{ $or: [ { age: { $lt: 20 } }, { city: 'Chennai' } ] }"}</code></li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>55</span>
    </div>
  );
});
CrudOpsA.displayName = "CrudOpsA";

export const CrudOpsB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">CRUD Operations</h3>
      <pre className="code-snippet" style={{ fontSize: "0.65rem" }}>{`// CREATE
db.users.insertOne({ name: "Alex", age: 22 })
db.users.insertMany([{...}, {...}])

// READ
db.users.find({ age: {$gt:18} })
db.users.findOne({ _id: ObjectId("...") })

// UPDATE
db.users.updateOne(
  { name: "Alex" },
  { $set: { age: 23 } }
)
db.users.updateMany({}, { $inc: { score: 5 } })

// DELETE
db.users.deleteOne({ name: "Alex" })
db.users.deleteMany({ age: {$lt: 18} })`}</pre>

      <h3 className="concept-subtitle" style={{ marginTop: "0.5rem" }}>Query Operators</h3>
      <table className="cheat-table" style={{ fontSize: "0.72rem" }}>
        <thead><tr><th>Operator</th><th>Meaning</th></tr></thead>
        <tbody>
          {[["$eq", "equal"], ["$ne", "not equal"], ["$gt/$gte", "greater than (or equal)"], ["$lt/$lte", "less than (or equal)"],
            ["$in", "in array"], ["$nin", "not in array"], ["$and/$or/$not", "logical operators"],
            ["$exists", "field exists"], ["$type", "field type check"]].map(([op, meaning]) => (
              <tr key={op}><td><code>{op}</code></td><td>{meaning}</td></tr>
            ))}
        </tbody>
      </table>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>56</span>
  </div>
));
CrudOpsB.displayName = "CrudOpsB";
