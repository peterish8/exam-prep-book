import { forwardRef } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

export const MongoFoundationsA = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page">
    <div className="page-inner">
      <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
      <h2 className="concept-title">MongoDB Foundations</h2>
      <p className="concept-def">
        <strong>MongoDB</strong> is a document database. Instead of storing rows inside rigid tables, it stores flexible JSON-like documents inside collections.
      </p>
      <ul className="fact-list">
        <li><strong>Document:</strong> one record with fields, arrays, and nested objects</li>
        <li><strong>Collection:</strong> a group of related documents</li>
        <li><strong>BSON:</strong> MongoDB's binary JSON storage format</li>
        <li><strong>Flexible schema:</strong> documents in one collection can evolve over time</li>
        <li><strong>Good fit:</strong> apps with changing structure or nested data</li>
      </ul>

      <div className="dbms-compare-grid">
        <div className="dbms-compare-card">
          <h4>SQL World</h4>
          <p>table - row - column</p>
        </div>
        <div className="dbms-compare-card dbms-compare-card--accent">
          <h4>Mongo World</h4>
          <p>collection - document - field</p>
        </div>
      </div>
    </div>
    <span className="page-number" style={{ left: "1rem" }}>66</span>
  </div>
));
MongoFoundationsA.displayName = "MongoFoundationsA";

export const MongoFoundationsB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Shell / Compass Intro</h3>
      <SyntaxBlock
        language="javascript"
        title="mongo-shell.js"
        code={`use collegeDB
db.students.insertOne({
  name: "Prats",
  dept: "CSE",
  skills: ["SQL", "MongoDB"]
})`}
      />

      <table className="cheat-table">
        <thead>
          <tr><th>Term</th><th>Meaning</th></tr>
        </thead>
        <tbody>
          <tr><td>JSON</td><td>text-based data format</td></tr>
          <tr><td>BSON</td><td>binary format with extra types like ObjectId and Date</td></tr>
          <tr><td>Compass</td><td>GUI tool for browsing collections and queries</td></tr>
        </tbody>
      </table>

      <div className="exam-cards">
        <ExamCard q="What is the difference between JSON and BSON?" a="JSON is a text format. BSON is MongoDB's binary representation and supports more built-in types." />
        <ExamCard q="Why is MongoDB called schema-flexible?" a="Because documents in the same collection do not always need the exact same field set." />
        <ExamCard q="What is the default primary key in MongoDB?" a="The _id field. MongoDB automatically creates it and indexes it uniquely." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>67</span>
  </div>
));
MongoFoundationsB.displayName = "MongoFoundationsB";
