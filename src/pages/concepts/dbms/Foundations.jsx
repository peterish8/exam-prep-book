import { forwardRef } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

export const FoundationsA = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page">
    <div className="page-inner">
      <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
      <h2 className="concept-title">DBMS Foundations</h2>
      <p className="concept-def">
        A <strong>database</strong> is more than stored facts. A <strong>DBMS</strong> is the control room that stores, updates, protects, and fetches that data properly.
      </p>
      <ul className="fact-list">
        <li><strong>Data:</strong> raw facts like marks, names, dates, or prices</li>
        <li><strong>Database:</strong> an organized collection of related data</li>
        <li><strong>DBMS role:</strong> it handles storage, search, security, backup, and sharing</li>
        <li><strong>Main gain:</strong> many users can work on the same data with fewer errors</li>
        <li><strong>Exam angle:</strong> DBMS is asked as problem solving, not just definition writing</li>
      </ul>
      <p className="concept-def">
        File systems work for tiny isolated records. The moment many users, updates, and relations appear, a DBMS becomes the safer choice.
      </p>

      <div className="live-demo">
        <div className="live-demo__label">File System vs DBMS</div>
        <div className="dbms-compare-grid">
          <div className="dbms-compare-card">
            <h4>File System</h4>
            <ul className="dbms-mini-list">
              <li>Data duplication is common</li>
              <li>Security is basic</li>
              <li>Search logic lives in app code</li>
              <li>Concurrent updates are risky</li>
            </ul>
          </div>
          <div className="dbms-compare-card dbms-compare-card--accent">
            <h4>DBMS</h4>
            <ul className="dbms-mini-list">
              <li>Less redundancy through design</li>
              <li>Access control is built in</li>
              <li>Queries are standardized</li>
              <li>Transactions protect shared writes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <span className="page-number" style={{ left: "1rem" }}>54</span>
  </div>
));
FoundationsA.displayName = "FoundationsA";

export const FoundationsB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Architecture Snapshot</h3>
      <div className="dbms-tier-stack">
        <div className="dbms-tier-card">
          <strong>1-Tier:</strong> user and database stay on the same machine
        </div>
        <div className="dbms-tier-card">
          <strong>2-Tier:</strong> client app talks directly to the database server
        </div>
        <div className="dbms-tier-card">
          <strong>3-Tier:</strong> UI - application server - database server
        </div>
      </div>

      <SyntaxBlock
        language="sql"
        title="why-dbms.sql"
        code={`-- one shared source of truth
SELECT student_name, cgpa
FROM students
WHERE cgpa >= 8.5
ORDER BY cgpa DESC;

-- the DBMS handles this search efficiently`}
      />

      <div className="exam-cards">
        <ExamCard q="What is the difference between data and database?" a="Data is a raw fact. A database is an organized collection of related data stored for easy retrieval and management." />
        <ExamCard q="Why is DBMS better than a file system?" a="It reduces redundancy, improves security, supports concurrency, and gives standard query access through SQL or similar interfaces." />
        <ExamCard q="Which architecture is most common in modern apps?" a="The 3-tier model, because UI, business logic, and database stay separated and scale more cleanly." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>55</span>
  </div>
));
FoundationsB.displayName = "FoundationsB";
