import { forwardRef } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

export const DesignA = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page">
    <div className="page-inner">
      <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
      <h2 className="concept-title">Database Design</h2>
      <p className="concept-def">
        Good design starts before writing queries. You first decide <strong>entities</strong>, <strong>attributes</strong>, and how records relate to each other.
      </p>
      <ul className="fact-list">
        <li><strong>Primary key:</strong> uniquely identifies one row or entity</li>
        <li><strong>Foreign key:</strong> connects one table to another table</li>
        <li><strong>Candidate key:</strong> any minimal field set that can uniquely identify a row</li>
        <li><strong>Composite key:</strong> uniqueness comes from combining multiple columns</li>
        <li><strong>Relationship:</strong> one-to-one, one-to-many, or many-to-many</li>
      </ul>

      <div className="live-demo">
        <div className="live-demo__label">ER Mini Diagram</div>
        <div className="er-diagram">
          <div className="er-box">
            <div className="er-box__title">Student</div>
            <div className="er-box__line">student_id (PK)</div>
            <div className="er-box__line">name</div>
          </div>
          <div className="er-link">
            <span>enrolls in</span>
            <small>1 : many</small>
          </div>
          <div className="er-box er-box--accent">
            <div className="er-box__title">Course</div>
            <div className="er-box__line">course_id (PK)</div>
            <div className="er-box__line">title</div>
          </div>
        </div>
      </div>
    </div>
    <span className="page-number" style={{ left: "1rem" }}>56</span>
  </div>
));
DesignA.displayName = "DesignA";

export const DesignB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">ER to Relational Mapping</h3>
      <SyntaxBlock
        language="sql"
        title="design-mapping.sql"
        code={`CREATE TABLE students (
  student_id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);`}
      />

      <table className="cheat-table">
        <thead>
          <tr><th>ER Term</th><th>Relational Form</th></tr>
        </thead>
        <tbody>
          <tr><td>Entity</td><td>Table</td></tr>
          <tr><td>Attribute</td><td>Column</td></tr>
          <tr><td>Relationship</td><td>FK or bridge table</td></tr>
          <tr><td>Many-to-many</td><td>Separate junction table</td></tr>
        </tbody>
      </table>

      <div className="exam-cards">
        <ExamCard q="What is the difference between primary key and candidate key?" a="A candidate key can uniquely identify a row. One chosen candidate key becomes the primary key." />
        <ExamCard q="Why do we use foreign keys?" a="They preserve relationships and help maintain referential integrity between related tables." />
        <ExamCard q="How is many-to-many represented in relational design?" a="By creating an extra table that stores the keys of both participating tables." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>57</span>
  </div>
));
DesignB.displayName = "DesignB";
