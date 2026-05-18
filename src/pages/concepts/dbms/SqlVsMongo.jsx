import { forwardRef } from "react";
import ExamCard from "../../../components/ExamCard";

export const SqlVsMongoA = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page">
    <div className="page-inner">
      <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
      <h2 className="concept-title">SQL vs MongoDB</h2>

      <table className="cheat-table">
        <thead>
          <tr>
            <th>SQL (RDBMS)</th>
            <th>MongoDB (Document)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Tables</td><td>Collections</td></tr>
          <tr><td>Rows</td><td>Documents (BSON/JSON)</td></tr>
          <tr><td>Columns</td><td>Fields</td></tr>
          <tr><td>Primary Key</td><td>_id (ObjectId)</td></tr>
          <tr><td>JOIN</td><td>$lookup / embedded docs</td></tr>
          <tr><td>Fixed schema</td><td>Flexible schema</td></tr>
          <tr><td>ACID by default</td><td>Eventually consistent (tunable)</td></tr>
        </tbody>
      </table>

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>When to Choose SQL vs MongoDB</h3>
      <ul className="fact-list">
        <li><strong>Choose SQL</strong> when data is relational (many joins), schema is stable, and ACID transactions are critical (banking, orders).</li>
        <li><strong>Choose MongoDB</strong> when schema evolves frequently, data is hierarchical/nested (user profiles with arrays), or you need horizontal scaling.</li>
        <li><strong>SQL strength:</strong> complex queries with joins across many tables. MongoDB embeds related data to avoid joins entirely.</li>
        <li><strong>MongoDB strength:</strong> flexible documents — add a new field to one document without altering the whole collection.</li>
      </ul>

      <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>MongoDB Architecture</h3>
      <svg width="270" height="100" viewBox="0 0 270 100">
        {[
          { label: "MongoDB Server", x: 85, y: 5, w: 100, fill: "#2d1f4e" },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={25} rx="5" fill={b.fill} stroke="#7c3aed" />
            <text x={b.x + b.w / 2} y={b.y + 17} textAnchor="middle" fontSize="10" fill="#c4b5fd">{b.label}</text>
          </g>
        ))}
        {["users DB", "products DB", "orders DB"].map((db, i) => (
          <g key={i}>
            <rect x={10 + i * 90} y={42} width={75} height={22} rx="4" fill="#1e1333" stroke="#7c3aed" strokeOpacity="0.5" />
            <text x={47 + i * 90} y={57} textAnchor="middle" fontSize="9" fill="#a78bfa">{db}</text>
            <line x1={135} y1={30} x2={47 + i * 90} y2={42} stroke="#7c3aed" strokeOpacity="0.5" />
          </g>
        ))}
        {["users", "admins"].map((col, i) => (
          <g key={i}>
            <rect x={10 + i * 55} y={76} width={45} height={18} rx="3" fill="#120d22" stroke="#6d28d9" strokeOpacity="0.4" />
            <text x={32 + i * 55} y={89} textAnchor="middle" fontSize="8" fill="#8b5cf6">{col}</text>
            <line x1={47} y1={64} x2={32 + i * 55} y2={76} stroke="#6d28d9" strokeOpacity="0.4" />
          </g>
        ))}
      </svg>
    </div>
    <span className="page-number" style={{ left: "1rem" }}>53</span>
  </div>
));
SqlVsMongoA.displayName = "SqlVsMongoA";

export const SqlVsMongoB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Document vs Row</h3>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.3rem" }}>SQL Row</div>
          <table className="cheat-table">
            <thead><tr><th>id</th><th>name</th><th>age</th></tr></thead>
            <tbody><tr><td>1</td><td>Nithy</td><td>21</td></tr></tbody>
          </table>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.3rem" }}>MongoDB Document</div>
          <pre className="code-snippet" style={{ fontSize: "0.65rem" }}>{`{
  _id: ObjectId("..."),
  name: "Nithy",
  age: 21,
  hobbies: ["code", "music"],
  address: {
    city: "Chennai"
  }
}`}</pre>
        </div>
      </div>

      <div className="exam-cards" style={{ marginTop: "0.5rem" }}>
        <ExamCard q="What is BSON?" a="Binary JSON — MongoDB's internal storage format. Supports more types than JSON (Date, ObjectId, Binary)." />
        <ExamCard q="Embedded doc vs Reference?" a="Embedded: store related data in same doc (fast reads). Reference: store _id of another doc (normalised, like JOIN)." />
        <ExamCard q="When to choose MongoDB over SQL?" a="Flexible/evolving schema, hierarchical data, horizontal scaling (sharding), unstructured/semi-structured data." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>54</span>
  </div>
));
SqlVsMongoB.displayName = "SqlVsMongoB";
