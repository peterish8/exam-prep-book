import { forwardRef } from "react";
import ExamCard from "../../../components/ExamCard";
import MemoryBox from "../../../components/MemoryBox";
import SyntaxBlock from "../../../components/SyntaxBlock";

export const SqlBasicsA = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page">
    <div className="page-inner">
      <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
      <h2 className="concept-title">SQL Basics</h2>
      <p className="concept-def">
        <strong>SQL</strong> is the language used to talk to relational databases. It reads almost like instructions: choose data, filter it, sort it, then update it when needed.
      </p>
      <ul className="fact-list">
        <li><strong>SELECT:</strong> fetch columns from a table</li>
        <li><strong>WHERE:</strong> filter rows using a condition</li>
        <li><strong>ORDER BY:</strong> sort output ascending or descending</li>
        <li><strong>LIMIT:</strong> return only a few rows</li>
        <li><strong>Types:</strong> common ones are INT, VARCHAR, DATE, FLOAT</li>
      </ul>

      <SyntaxBlock
        language="sql"
        title="select-basics.sql"
        code={`SELECT name, cgpa
FROM students
WHERE dept = 'CSE'
ORDER BY cgpa DESC
LIMIT 3;`}
      />
    </div>
    <span className="page-number" style={{ left: "1rem" }}>60</span>
  </div>
));
SqlBasicsA.displayName = "SqlBasicsA";

export const SqlBasicsB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">DDL, DML, DCL, TCL</h3>
      <table className="cheat-table">
        <thead>
          <tr><th>Group</th><th>Common Commands</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>DDL</strong></td><td>CREATE, ALTER, DROP</td></tr>
          <tr><td><strong>DML</strong></td><td>INSERT, UPDATE, DELETE</td></tr>
          <tr><td><strong>DCL</strong></td><td>GRANT, REVOKE</td></tr>
          <tr><td><strong>TCL</strong></td><td>COMMIT, ROLLBACK, SAVEPOINT</td></tr>
        </tbody>
      </table>

      <SyntaxBlock
        language="sql"
        title="ddl-dml.sql"
        code={`CREATE TABLE students (
  roll_no INT PRIMARY KEY,
  name VARCHAR(40),
  dept VARCHAR(20)
);

INSERT INTO students VALUES (101, 'Prats', 'CSE');`}
      />
      <MemoryBox
        title="SQL Recall"
        accent="#7c3aed"
        mnemonic="SWOL = SELECT, WHERE, ORDER BY, LIMIT"
        items={[
          { label: "DDL", text: "changes structure: CREATE, ALTER, DROP" },
          { label: "DML", text: "changes rows: INSERT, UPDATE, DELETE" },
          { label: "DCL", text: "controls permissions: GRANT, REVOKE" },
          { label: "TCL", text: "controls transactions: COMMIT, ROLLBACK" },
        ]}
      />

      <div className="exam-cards">
        <ExamCard q="What is the difference between WHERE and HAVING?" a="WHERE filters rows before grouping. HAVING filters grouped results after aggregation." />
        <ExamCard q="Why do TCL commands matter?" a="They control transaction completion, so a set of changes can be saved or undone safely." />
        <ExamCard q="Which SQL group changes schema?" a="DDL, because commands like CREATE and ALTER modify the database structure itself." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>61</span>
  </div>
));
SqlBasicsB.displayName = "SqlBasicsB";
