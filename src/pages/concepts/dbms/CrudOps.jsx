import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

const SAMPLE_DOCS = [
  { _id: 1, name: "Alice", age: 25, city: "Chennai", score: 88 },
  { _id: 2, name: "Bob", age: 32, city: "Mumbai", score: 72 },
  { _id: 3, name: "Charlie", age: 19, city: "Chennai", score: 95 },
  { _id: 4, name: "Diana", age: 28, city: "Delhi", score: 61 },
  { _id: 5, name: "Eve", age: 35, city: "Mumbai", score: 79 },
];

const QUERIES = [
  { label: "find all", query: "db.users.find({})", fn: (docs) => docs },
  { label: "age > 25", query: "db.users.find({ age: {$gt: 25} })", fn: (docs) => docs.filter((d) => d.age > 25) },
  { label: "city = Chennai", query: 'db.users.find({ city: "Chennai" })', fn: (docs) => docs.filter((d) => d.city === "Chennai") },
  { label: "score $in [72,79]", query: "db.users.find({ score: {$in:[72,79]} })", fn: (docs) => docs.filter((d) => [72, 79].includes(d.score)) },
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
        <p className="concept-def">
          Think of <strong>CRUD</strong> as the four daily actions every database repeats. MongoDB keeps them simple, then adds <strong>query operators</strong> for smarter filtering.
        </p>
        <ul className="fact-list">
          <li><strong>Create:</strong> add new documents with <code>insertOne</code> or <code>insertMany</code></li>
          <li><strong>Read:</strong> fetch matching documents with <code>find</code> or <code>findOne</code></li>
          <li><strong>Update:</strong> modify existing data with <code>updateOne</code> or <code>updateMany</code></li>
          <li><strong>Delete:</strong> remove old documents with <code>deleteOne</code> or <code>deleteMany</code></li>
          <li><strong>Operators:</strong> use <code>$</code> keywords to build conditions cleanly</li>
        </ul>
        <p className="concept-def">
          Click through the live queries below and watch how the result set changes.
        </p>

        <div className="bigo-toggles" style={{ flexWrap: "wrap" }}>
          {QUERIES.map((q, i) => (
            <button
              key={q.label}
              className={`bigo-btn ${activeQ === i ? "bigo-btn--on" : ""}`}
              style={{ "--c": "#7c3aed" }}
              onClick={() => setActiveQ(i)}
            >
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
        <p className="concept-def">
          MongoDB operators always start with <code>$</code> and sit inside the query object. Each one gives you one small, focused filtering rule.
        </p>
        <ul className="fact-list">
          <li><strong>Range checks:</strong> <code>$gt</code>, <code>$gte</code>, <code>$lt</code>, <code>$lte</code> filter values higher or lower</li>
          <li><strong>Example:</strong> <code>{"{ age: { $gt: 18 } }"}</code> finds everyone older than 18</li>
          <li><strong>List match:</strong> <code>$in</code> checks whether a value appears in a list</li>
          <li><strong>Field check:</strong> <code>$exists</code> tests whether a field is present at all</li>
          <li><strong>Logic combine:</strong> <code>$and</code> needs all rules, while <code>$or</code> accepts any one rule</li>
        </ul>
        <p className="concept-def">
          That is why MongoDB queries feel flexible: you stack small conditions instead of writing one huge statement.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>56</span>
    </div>
  );
});
CrudOpsA.displayName = "CrudOpsA";

export const CrudOpsB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">CRUD Operations</h3>
      <SyntaxBlock language="javascript" title="crud-ops.mongodb.js" code={`// CREATE
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
db.users.deleteMany({ age: {$lt: 18} })`} />

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

      <div className="exam-cards">
        <ExamCard q="What does CRUD stand for?" a="Create, Read, Update, Delete." />
        <ExamCard q="What does $in do?" a="It checks whether a field value appears inside a given list." />
        <ExamCard q="Difference between $and and $or?" a="$and needs every condition to match, while $or accepts at least one match." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>57</span>
  </div>
));
CrudOpsB.displayName = "CrudOpsB";
