import { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cover = forwardRef((props, ref) => {
  const [showShortcutTip, setShowShortcutTip] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowShortcutTip(false);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div ref={ref} className="book-page cover-page">
      <div className="cover-aura cover-aura--red" />
      <div className="cover-grain" />
      <div className="cover-content">
        <div className={`cover-shortcut-tip${showShortcutTip ? " is-visible" : ""}`}>
          <span className="cover-shortcut-tip__dot" aria-hidden="true" />
          <span>Tap AFD Exam for module-wise tests. Tap Code Lab for code explanations.</span>
        </div>
        <div className="cover-badge">2026 · Semester 2</div>
        <h1 className="cover-title">
          Exam
          <br />
          Prep
        </h1>
        <p className="cover-subtitle">Interactive Study Book</p>
        <div className="cover-subjects">
          <Link
            to="/quiz/dsa"
            className="cover-subject-pill-link"
            style={{ background: "#e63946" }}
          >
            DSA
          </Link>
          <Link to="/dsa-code?module=coding" className="cover-dsa-code-btn">
            Code Lab
          </Link>
          <Link
            to="/afd-important"
            className="cover-subject-pill-link"
            style={{ background: "#2563eb" }}
          >
            AFD Exam
          </Link>
          <Link
            to="/quiz/foml"
            className="cover-subject-pill-link"
            style={{ background: "#16a34a" }}
          >
            FOML
          </Link>
          <Link
            to="/quiz/dbms"
            className="cover-subject-pill-link"
            style={{ background: "#7c3aed" }}
          >
            DBMS
          </Link>
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
