import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MCQ_DATA, SUBJECT_META, ALL_SUBJECTS } from "../../data/mcq.js";

const LETTERS = ["A", "B", "C", "D"];

function buildQuestions(subject) {
  if (subject === "all") return ALL_SUBJECTS.flatMap(s => MCQ_DATA[s]);
  return MCQ_DATA[subject.toUpperCase()] ?? [];
}

export default function QuizPage({ playerName }) {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [questions] = useState(() => buildQuestions(subject));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const panelRef = useRef(null);

  if (!questions.length) {
    navigate("/quiz/select", { replace: true });
    return null;
  }

  const q = questions[idx];
  const total = questions.length;
  const subjectKey = subject === "all" ? q.subject : subject.toUpperCase();
  const meta = SUBJECT_META[subjectKey] || SUBJECT_META[q.subject];
  const correctSoFar = answers.filter(a => a.wasCorrect).length;
  const progressPct = ((idx + (locked ? 1 : 0)) / total) * 100;

  const handleSelect = (optIdx) => {
    if (locked) return;
    setSelected(optIdx);
    setLocked(true);
    setAnswers(prev => [
      ...prev,
      { id: q.id, subject: q.subject, topic: q.topic, wasCorrect: optIdx === q.correct },
    ]);
  };

  const handleNext = () => {
    if (idx + 1 >= total) {
      navigate("/quiz/results", { state: { answers, subject } });
      return;
    }
    setIdx(i => i + 1);
    setSelected(null);
    setLocked(false);
    panelRef.current?.scrollTo(0, 0);
  };

  const getOptionClass = (oIdx) => {
    if (!locked) return "mcq-option";
    if (oIdx === q.correct) return "mcq-option mcq-option--locked mcq-option--correct";
    if (oIdx === selected) return "mcq-option mcq-option--locked mcq-option--wrong";
    return "mcq-option mcq-option--locked mcq-option--dimmed";
  };

  return (
    <>
      <div className="mcq-quiz-header">
        <div className="mcq-quiz-header__subject">
          <div className="mcq-quiz-header__dot" style={{ background: meta.color }} />
          <span className="mcq-quiz-header__name">
            {subject === "all" ? q.subject : meta.label}
          </span>
        </div>
        <div className="mcq-quiz-header__progress-wrap">
          <div className="mcq-quiz-header__bar">
            <div
              className="mcq-quiz-header__bar-fill"
              style={{ width: `${progressPct}%`, background: meta.color }}
            />
          </div>
          <span className="mcq-quiz-header__progress-label">Q{idx + 1} / {total}</span>
        </div>
        <span className="mcq-quiz-header__score">
          Correct: <strong>{correctSoFar}</strong>
        </span>
        <button
          className="mcq-end-btn"
          onClick={() => navigate("/quiz/results", { state: { answers, subject } })}
        >
          End Quiz
        </button>
      </div>

      <div className="mcq-quiz-body">
        <div className="mcq-question-panel" ref={panelRef}>
          <div className="mcq-q-meta">
            <span className="mcq-q-num">Question {idx + 1}</span>
            <span
              className="mcq-topic-badge"
              style={{ color: meta.color, background: `${meta.color}15`, borderColor: `${meta.color}35` }}
            >
              {q.topic}
            </span>
          </div>

          <p
            className="mcq-question-text"
            dangerouslySetInnerHTML={{ __html: q.question.replace(/`([^`]+)`/g, "<code>$1</code>") }}
          />

          <div className="mcq-options">
            {q.options.map((opt, oIdx) => (
              <button
                key={oIdx}
                className={getOptionClass(oIdx)}
                onClick={() => handleSelect(oIdx)}
              >
                <span className="mcq-option__letter">{LETTERS[oIdx]}</span>
                <span
                  className="mcq-option__text"
                  dangerouslySetInnerHTML={{ __html: opt.replace(/`([^`]+)`/g, "<code>$1</code>") }}
                />
              </button>
            ))}
          </div>

          {locked && <div className="mcq-explanation">{q.explanation}</div>}

          <button className="mcq-next-btn" onClick={handleNext} disabled={!locked}>
            {idx + 1 >= total ? "See Results" : "Next"} <span className="arrow">→</span>
          </button>
        </div>

        <div className="mcq-reference-panel">
          <div className="mcq-ref-header">
            <span className="mcq-ref-eyebrow">Reference</span>
            <h3 className="mcq-ref-title">{q.reference.title}</h3>
          </div>
          <div className="mcq-ref-card" style={{ borderLeftColor: meta.color }}>
            <ul className="mcq-ref-points">
              {q.reference.points.map((pt, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: pt.replace(/`([^`]+)`/g, "<code>$1</code>") }}
                />
              ))}
            </ul>
            {q.reference.formula && (
              <pre className="mcq-ref-formula">{q.reference.formula}</pre>
            )}
          </div>
          <p className="mcq-ref-footnote">From your study notes · {meta.full}</p>
        </div>
      </div>
    </>
  );
}
