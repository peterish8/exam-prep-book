import { forwardRef } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

export const SqlAdvancedA = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page">
    <div className="page-inner">
      <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
      <h2 className="concept-title">SQL Core & Advanced</h2>
      <p className="concept-def">
        Once SELECT feels easy, SQL becomes about combining logic. That means <strong>operators</strong>, <strong>aggregations</strong>, and smarter query patterns like joins or subqueries.
      </p>
      <ul className="fact-list">
        <li><strong>Aggregates:</strong> COUNT, SUM, AVG, MIN, MAX</li>
        <li><strong>Operators:</strong> arithmetic, comparison, and logical operators</li>
        <li><strong>Functions:</strong> UPPER, TRIM, LENGTH, DATE_ADD and friends</li>
        <li><strong>CASE:</strong> puts if-else style logic inside SQL</li>
        <li><strong>Subquery:</strong> one query can feed another query</li>
      </ul>

      <SyntaxBlock
        language="sql"
        title="sql-advanced.sql"
        code={`SELECT dept,
       COUNT(*) AS total_students,
       AVG(cgpa) AS avg_cgpa,
       CASE
         WHEN AVG(cgpa) >= 8 THEN 'Strong'
         ELSE 'Needs Work'
       END AS dept_band
FROM students
GROUP BY dept;`}
      />
    </div>
    <span className="page-number" style={{ left: "1rem" }}>62</span>
  </div>
));
SqlAdvancedA.displayName = "SqlAdvancedA";

export const SqlAdvancedB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Join Cheat View</h3>
      <div className="join-grid">
        <div className="join-grid__card"><strong>INNER JOIN</strong><span>only matching rows</span></div>
        <div className="join-grid__card"><strong>LEFT JOIN</strong><span>all left rows + matches</span></div>
        <div className="join-grid__card"><strong>RIGHT JOIN</strong><span>all right rows + matches</span></div>
        <div className="join-grid__card"><strong>FULL JOIN</strong><span>all rows from both sides</span></div>
      </div>

      <SyntaxBlock
        language="sql"
        title="joins.sql"
        code={`SELECT s.name, c.title
FROM students s
INNER JOIN enrollments e
  ON s.student_id = e.student_id
INNER JOIN courses c
  ON e.course_id = c.course_id;`}
      />

      <div className="exam-cards">
        <ExamCard q="What is the difference between join and subquery?" a="A join combines tables directly into one result. A subquery first produces an intermediate result and then another query uses it." />
        <ExamCard q="When is CASE useful?" a="When you want category-style output such as pass/fail, grade bands, or status labels directly inside a query result." />
        <ExamCard q="Name one common aggregate exam trick." a="Remember that COUNT counts rows, SUM totals numbers, and AVG ignores NULL values in most SQL systems." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>63</span>
  </div>
));
SqlAdvancedB.displayName = "SqlAdvancedB";
