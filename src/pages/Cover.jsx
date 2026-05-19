import { forwardRef } from "react";
import { Link } from "react-router-dom";

const Cover = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="book-page cover-page">
      <Link to="/quiz" className="cover-mobile-quiz-btn">
        Quiz
      </Link>
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
        <a
          className="cover-credit"
          href="https://www.instagram.com/yourboy_prats/"
          target="_blank"
          rel="noreferrer"
        >
          by: ~prats
        </a>
      </div>
    </div>
  );
});

Cover.displayName = "Cover";
export default Cover;
