import { useNavigate } from "react-router-dom";
import { SUBJECT_META, ALL_SUBJECTS } from "../../data/mcq.js";

const SUBJECT_ICONS = { DSA: "∑", AFD: "⟨/⟩", FOML: "∇", DBMS: "⊞" };
const SUBJECT_DESC  = {
  DSA:  "Algorithms, complexity & data structures",
  AFD:  "React ecosystem & modern web stack",
  FOML: "ML theory, models & math foundations",
  DBMS: "Databases, queries & data modelling",
};

export default function SubjectSelect() {
  const navigate = useNavigate();

  return (
    <div className="sel-screen">
      {/* ambient background orbs */}
      <div className="sel-orb sel-orb--dsa"  aria-hidden="true" />
      <div className="sel-orb sel-orb--afd"  aria-hidden="true" />
      <div className="sel-orb sel-orb--foml" aria-hidden="true" />
      <div className="sel-orb sel-orb--dbms" aria-hidden="true" />

      <div className="sel-inner">

        {/* ── Hero ── */}
        <header className="sel-hero">
          <div className="sel-hero__badge">
            <span className="sel-hero__pulse" />
            Practice Mode
          </div>
          <h1 className="sel-hero__title">
            Choose Your<br />
            <span className="sel-hero__accent">Subject</span>
          </h1>
          <p className="sel-hero__sub">
            15 questions · instant feedback · reference panel included
          </p>
        </header>

        {/* ── 2-col subject cards ── */}
        <div className="sel-grid">
          {ALL_SUBJECTS.map((s, i) => {
            const meta = SUBJECT_META[s];
            const key  = s.toLowerCase();
            return (
              <button
                key={s}
                className={`sel-card sel-card--${key}`}
                onClick={() => navigate(`/quiz/${key}`)}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="sel-card__glow" aria-hidden="true" />

                <div className="sel-card__top-row">
                  <span className="sel-card__icon">{SUBJECT_ICONS[s]}</span>
                  <span className="sel-card__badge">{s}</span>
                </div>

                <span className="sel-card__name">{meta.full}</span>
                <p    className="sel-card__desc">{SUBJECT_DESC[s]}</p>

                <div className="sel-card__tags">
                  {meta.topics.slice(0, 3).map(t => (
                    <span key={t} className="sel-card__tag">{t}</span>
                  ))}
                </div>

                <div className="sel-card__footer">
                  <span className="sel-card__qs">15 questions</span>
                  <span className="sel-card__arrow">Start →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── All-subjects wide card ── */}
        <button
          className="sel-all"
          onClick={() => navigate("/quiz/all")}
          style={{ animationDelay: `${ALL_SUBJECTS.length * 70}ms` }}
        >
          <div className="sel-all__left">
            <div className="sel-all__pills">
              {ALL_SUBJECTS.map(s => (
                <span
                  key={s}
                  className="sel-all__pill"
                  style={{
                    color: SUBJECT_META[s].color,
                    borderColor: `${SUBJECT_META[s].color}55`,
                    background: `${SUBJECT_META[s].color}15`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <span className="sel-all__name">All Subjects</span>
            <p className="sel-all__desc">Mixed challenge — all 4 subjects combined</p>
          </div>
          <div className="sel-all__right">
            <span className="sel-all__num">60</span>
            <span className="sel-all__numlab">questions</span>
            <span className="sel-all__go">→</span>
          </div>
        </button>

      </div>
    </div>
  );
}
