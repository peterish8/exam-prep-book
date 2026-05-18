import { forwardRef } from "react";
import { toc } from "../data/toc";

const subjectColors = {
  DSA: "#e63946",
  AFD: "#2563eb",
  FOML: "#16a34a",
  DBMS: "#7c3aed",
};

const Toc = forwardRef(({ onJump }, ref) => {
  const subjects = ["DSA", "AFD", "FOML", "DBMS"];
  const plannerEntries = toc.filter(t => t.subject === null && t.page > 0 && t.page < 4);
  const entryMap = (subj) => toc.filter(t => t.subject === subj);

  return (
    <div ref={ref} className="book-page toc-page">
      <div className="page-inner">
        <h2 className="toc-title">Contents</h2>

        <div className="toc-section">
          <div className="toc-section-label" style={{ color: "#888" }}>Planner</div>
          {plannerEntries.map((t) => (
            <button key={t.page} className="toc-row" onClick={() => onJump(t.page)}>
              <span className="toc-row__title">{t.title}</span>
              <span className="toc-row__dots" />
              <span className="toc-row__page">{t.page + 1}</span>
            </button>
          ))}
        </div>

        {subjects.map((subj) => (
          <div key={subj} className="toc-section">
            <div className="toc-section-label" style={{ color: subjectColors[subj] }}>
              {subj}
            </div>
            {entryMap(subj).map((t) => (
              <button key={t.page} className="toc-row" onClick={() => onJump(t.page)}>
                <span className="toc-row__title">{t.title.replace(`${subj} — `, "")}</span>
                <span className="toc-row__dots" />
                <span className="toc-row__page">{t.page + 1}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
      <span className="page-number" style={{ right: "1rem" }}>2</span>
    </div>
  );
});

Toc.displayName = "Toc";
export default Toc;
