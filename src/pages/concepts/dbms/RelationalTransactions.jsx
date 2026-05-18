import { forwardRef } from "react";
import ExamCard from "../../../components/ExamCard";

export const RelationalTransactionsA = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page">
    <div className="page-inner">
      <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
      <h2 className="concept-title">Relational Algebra & Transactions</h2>
      <p className="concept-def">
        <strong>Relational algebra</strong> is the mathematical base of SQL. <strong>Transactions</strong> make sure grouped operations behave safely when real users are updating data.
      </p>
      <ul className="fact-list">
        <li><strong>Union:</strong> combine compatible results</li>
        <li><strong>Intersection:</strong> keep only common rows</li>
        <li><strong>Difference:</strong> keep rows present in one set but not the other</li>
        <li><strong>Product:</strong> Cartesian product pairs every row with every row</li>
        <li><strong>ACID:</strong> atomicity, consistency, isolation, durability</li>
      </ul>

      <div className="live-demo">
        <div className="live-demo__label">Transaction States</div>
        <div className="txn-flow">
          <div className="txn-flow__node">Active</div>
          <div className="txn-flow__arrow">-&gt;</div>
          <div className="txn-flow__node">Partially Committed</div>
          <div className="txn-flow__arrow">-&gt;</div>
          <div className="txn-flow__node txn-flow__node--good">Committed</div>
        </div>
        <div className="txn-flow txn-flow--alt">
          <div className="txn-flow__node">Active</div>
          <div className="txn-flow__arrow">-&gt;</div>
          <div className="txn-flow__node txn-flow__node--bad">Failed</div>
          <div className="txn-flow__arrow">-&gt;</div>
          <div className="txn-flow__node">Rolled Back</div>
        </div>
      </div>
    </div>
    <span className="page-number" style={{ left: "1rem" }}>64</span>
  </div>
));
RelationalTransactionsA.displayName = "RelationalTransactionsA";

export const RelationalTransactionsB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Optimization Basics</h3>
      <ul className="fact-list">
        <li><strong>Execution plan:</strong> the strategy the DBMS chooses to run a query</li>
        <li><strong>Good plan:</strong> uses indexes and avoids unnecessary scans</li>
        <li><strong>Projection pushdown:</strong> return only needed columns</li>
        <li><strong>Filter early:</strong> fewer rows means cheaper joins and grouping later</li>
      </ul>

      <div className="concept-formula">
        sigma (selection), pi (projection), union, intersection, difference, and product are the core RA building blocks behind SQL thinking.
      </div>

      <div className="exam-cards">
        <ExamCard q="Why is atomicity important?" a="Because a transaction should happen fully or not at all. Half-completed updates create wrong data." />
        <ExamCard q="How do RA and SQL connect?" a="Relational algebra is the formal foundation. SQL is the practical query language built on those ideas." />
        <ExamCard q="What is a simple optimization rule to remember?" a="Filter early and use indexes on frequently searched columns. That cuts the amount of work quickly." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>65</span>
  </div>
));
RelationalTransactionsB.displayName = "RelationalTransactionsB";
