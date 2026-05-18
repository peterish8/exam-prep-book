import { forwardRef } from "react";
import ExamCard from "../../../components/ExamCard";

export const NormalizationA = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page">
    <div className="page-inner">
      <div className="concept-tag" style={{ background: "#7c3aed" }}>DBMS</div>
      <h2 className="concept-title">Enhanced ER & Normalization</h2>
      <p className="concept-def">
        <strong>Normalization</strong> is database cleanup with rules. It removes repeated data and dependency mistakes so updates stay consistent.
      </p>
      <ul className="fact-list">
        <li><strong>1NF:</strong> every field should hold atomic single values</li>
        <li><strong>2NF:</strong> remove partial dependency on part of a composite key</li>
        <li><strong>3NF:</strong> remove transitive dependency between non-key attributes</li>
        <li><strong>BCNF:</strong> every determinant should be a candidate key</li>
        <li><strong>FD idea:</strong> one attribute set decides another attribute set</li>
      </ul>

      <div className="dbms-split-panel">
        <div className="dbms-panel">
          <div className="live-demo__label">Before</div>
          <div className="dbms-row-chip">Roll | Name | Dept | Dept_HOD</div>
          <div className="dbms-row-chip">101 | Asha | CSE | Rao</div>
          <div className="dbms-row-chip">102 | Ravi | CSE | Rao</div>
        </div>
        <div className="dbms-panel">
          <div className="live-demo__label">After 3NF</div>
          <div className="dbms-row-chip">Student(Roll, Name, Dept)</div>
          <div className="dbms-row-chip">Department(Dept, Dept_HOD)</div>
        </div>
      </div>
      <p className="concept-def">
        The same department head should not be repeated in every student row. That repeated dependency is exactly what normalization fixes.
      </p>
    </div>
    <span className="page-number" style={{ left: "1rem" }}>58</span>
  </div>
));
NormalizationA.displayName = "NormalizationA";

export const NormalizationB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Enhanced ER Notes</h3>
      <ul className="fact-list">
        <li><strong>Specialization:</strong> break one broad entity into specific subtypes</li>
        <li><strong>Generalization:</strong> merge similar entities into one common parent</li>
        <li><strong>Mapping rule:</strong> every strong entity usually becomes a table</li>
        <li><strong>Weak entity:</strong> needs help from another entity key to exist</li>
      </ul>

      <div className="exam-cards">
        <ExamCard q="What is a functional dependency?" a="If attribute X determines attribute Y, then for one value of X there can be only one matching value of Y." />
        <ExamCard q="Why is 2NF not enough in some cases?" a="2NF removes partial dependency, but transitive dependency can still remain. That is why 3NF is often needed." />
        <ExamCard q="How do you remember 1NF, 2NF, 3NF?" a="1NF fixes repeating values, 2NF fixes partial dependency, 3NF fixes dependency through another non-key field." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>59</span>
  </div>
));
NormalizationB.displayName = "NormalizationB";
