import { Link } from "react-router-dom";
import { SUBJECT_META } from "../data/mcq";
import "../styles/mcq.css";

export default function MCQPanel({ visible }) {
  const subjects = ["DSA", "AFD", "FOML", "DBMS"];

  return (
    <div className={`mcq-panel${visible ? " mcq-panel--visible" : ""}`}>
      <div className="mcq-panel__inner">
        <div className="mcq-panel__badge">Practice Mode</div>

        <h2 className="mcq-panel__heading">
          Test Your
          <br />
          Knowledge
        </h2>

        <p className="mcq-panel__tagline">
          15 curated questions per subject drawn from your actual study materials.
          Read the reference card while you answer.
        </p>

        <div className="mcq-panel__subjects">
          {subjects.map((s) => {
            const meta = SUBJECT_META[s];
            return (
              <div
                key={s}
                className="mcq-panel__subject-pill"
                style={{
                  background: `${meta.color}18`,
                  borderColor: `${meta.color}40`,
                  color: meta.color,
                }}
              >
                {meta.label} <span>15 Qs</span>
              </div>
            );
          })}
        </div>

        <div className="mcq-panel__actions">
          <Link to="/afd-important" className="mcq-panel__cta">
            AFD Important <span className="arrow">-&gt;</span>
          </Link>
          <Link to="/quiz" className="mcq-panel__cta">
            Start Quiz <span className="arrow">→</span>
          </Link>
          <Link
            to="/leaderboard"
            className="mcq-panel__icon-cta"
            aria-label="Open leaderboard"
            title="Leaderboard"
          >
            🏆
          </Link>
        </div>

        <p className="mcq-panel__note">
          Pick any subject · reference card always visible · results at the end
        </p>
      </div>
    </div>
  );
}
