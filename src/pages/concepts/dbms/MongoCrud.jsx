import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

const SAMPLE_DOCS = [
  { _id: 1, name: "Asha", age: 25, city: "Chennai", tags: ["dbms", "sql"], score: 88 },
  { _id: 2, name: "Kiran", age: 32, city: "Mumbai", tags: ["mongo"], score: 72 },
  { _id: 3, name: "Leela", age: 19, city: "Chennai", tags: ["dbms", "mongo"], score: 95 },
  { _id: 4, name: "Rohan", age: 28, city: "Delhi", tags: ["queries"], score: 61 },
  { _id: 5, name: "Sara", age: 35, city: "Mumbai", tags: ["mongo", "crud"], score: 79 },
];

const QUERIES = [
  { label: "find all", query: "db.students.find({})", fn: (docs) => docs },
  { label: "age > 25", query: "db.students.find({ age: { $gt: 25 } })", fn: (docs) => docs.filter((d) => d.age > 25) },
  { label: "city = Chennai", query: 'db.students.find({ city: "Chennai" })', fn: (docs) => docs.filter((d) => d.city === "Chennai") },
  { label: "score in [72,79]", query: "db.students.find({ score: { $in: [72, 79] } })", fn: (docs) => docs.filter((d) => [72, 79].includes(d.score)) },
  { label: "tags has mongo", query: 'db.students.find({ tags: { $elemMatch: { $eq: "mongo" } } })', fn: (docs) => docs.filter((d) => d.tags.includes("mongo")) },
  { label: "limit 3", query: "db.students.find().limit(3)", fn: (docs) => docs.slice(0, 3) },
];

export const MongoCrudA = forwardRef((props, ref) => {
  const [activeQ, setActiveQ] = useState(0);
  const result = QUERIES[activeQ].fn(SAMPLE_DOCS);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
        <h2 className="concept-title">MongoDB CRUD & Querying</h2>
        <p className="concept-def">
          Mongo CRUD feels readable once you split it into actions. First pick the command, then add small <strong>operators</strong> to narrow the result.
        </p>
        <ul className="fact-list">
          <li><strong>Create:</strong> insertOne and insertMany add documents</li>
          <li><strong>Read:</strong> find and findOne fetch matching documents</li>
          <li><strong>Update:</strong> updateOne with $set, $inc, or $push changes fields</li>
          <li><strong>Delete:</strong> deleteOne and deleteMany remove documents</li>
          <li><strong>Array query:</strong> $elemMatch helps search inside arrays</li>
        </ul>

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

        <div className="code-runner">
          <div className="code-runner__header">
            <span className="code-runner__lang">MongoDB Shell</span>
          </div>
          <pre className="code-runner__code"><code>{QUERIES[activeQ].query}</code></pre>
          <div className="code-runner__output">
            <span className="output-label">Results ({result.length})</span>
            {result.map((d) => (
              <div key={d._id} className="output-line">
                {`{ name: "${d.name}", city: "${d.city}", score: ${d.score} }`}
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>68</span>
    </div>
  );
});
MongoCrudA.displayName = "MongoCrudA";

export const MongoCrudB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <SyntaxBlock
        language="javascript"
        title="mongo-crud.js"
        code={`db.students.insertOne({ name: "Maya", age: 21 })

db.students.updateOne(
  { name: "Maya" },
  { $set: { city: "Chennai" }, $inc: { score: 5 } }
)

db.students.find({ city: "Chennai" }).sort({ score: -1 }).limit(2)
db.students.deleteOne({ name: "Maya" })`}
      />

      <div className="exam-cards">
        <ExamCard q="What is the difference between $set and $push?" a="$set replaces or creates a field value. $push adds a new element into an array field." />
        <ExamCard q="How do sort and limit help in exams?" a="They are often asked together for pagination or top-N style outputs. Sort arranges first, then limit trims the result." />
        <ExamCard q="Why is $elemMatch important?" a="It helps query array contents more precisely, especially when nested array objects or multiple conditions are involved." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>69</span>
  </div>
));
MongoCrudB.displayName = "MongoCrudB";
