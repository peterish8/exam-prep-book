import { forwardRef } from "react";

const Cover = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="book-page cover-page">
      <div className="cover-aura cover-aura--red" />
      <div className="cover-grain" />
      <div className="cover-content">
        <div className="cover-badge">2026 · Semester 2</div>
        <h1 className="cover-title">
          Exam
          <br />
          Prep
        </h1>
        <p className="cover-subtitle">Interactive Study Book</p>
        <div className="cover-subjects">
          <span style={{ background: "#e63946" }}>DSA</span>
          <span style={{ background: "#2563eb" }}>AFD</span>
          <span style={{ background: "#16a34a" }}>FOML</span>
          <span style={{ background: "#7c3aed" }}>DBMS</span>
        </div>
        <p className="cover-hint">← → to flip · click index to jump</p>
        <p className="cover-credit">by: ~prats</p>
      </div>
    </div>
  );
});

Cover.displayName = "Cover";
export default Cover;
