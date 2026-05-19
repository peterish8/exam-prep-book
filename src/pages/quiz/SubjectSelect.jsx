import { useNavigate } from "react-router-dom";
import { SUBJECT_META, ALL_SUBJECTS } from "../../data/mcq.js";

export default function SubjectSelect() {
  const navigate = useNavigate();

  return (
    <div className="mcq-select">
      <div className="mcq-select__top">
        <p className="mcq-select__eyebrow">Quiz Practice</p>
        <h2 className="mcq-select__title">Choose Your Subject</h2>
      </div>

      <div className="mcq-select__grid">
        {ALL_SUBJECTS.map(s => {
          const meta = SUBJECT_META[s];
          return (
            <button
              key={s}
              className={`mcq-subject-card mcq-subject-card--${s.toLowerCase()}`}
              onClick={() => navigate(`/quiz/${s.toLowerCase()}`)}
            >
              <span className="mcq-subject-card__label">{meta.label}</span>
              <span className="mcq-subject-card__name">{meta.full}</span>
              <div className="mcq-subject-card__topics">
                {meta.topics.slice(0, 4).map(t => (
                  <span key={t} className="mcq-subject-card__topic-tag">{t}</span>
                ))}
              </div>
              <span className="mcq-subject-card__count">15 questions</span>
            </button>
          );
        })}

        <button
          className="mcq-subject-card mcq-subject-card--all"
          style={{ gridColumn: "1 / -1" }}
          onClick={() => navigate("/quiz/all")}
        >
          <span className="mcq-subject-card__label">Mixed</span>
          <span className="mcq-subject-card__name">All Subjects</span>
          <div className="mcq-subject-card__topics">
            {ALL_SUBJECTS.map(s => (
              <span
                key={s}
                className="mcq-subject-card__topic-tag"
                style={{ color: SUBJECT_META[s].color, borderColor: `${SUBJECT_META[s].color}40` }}
              >
                {s}
              </span>
            ))}
          </div>
          <span className="mcq-subject-card__count">60 questions · all subjects combined</span>
        </button>
      </div>
    </div>
  );
}
