import { useState, useEffect, useRef } from "react";
import { MCQ_DATA, SUBJECT_META, ALL_SUBJECTS } from "../data/mcq";
import "../styles/mcq.css";

const LETTERS = ["A", "B", "C", "D"];

function buildQuestions(subject) {
  if (subject === "ALL") {
    return ALL_SUBJECTS.flatMap((s) => MCQ_DATA[s]);
  }
  return MCQ_DATA[subject] ?? [];
}

function ScoreRing({ correct, total, color }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const pct = total > 0 ? correct / total : 0;
  const offset = circ * (1 - pct);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mcq-score-ring">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle className="mcq-score-ring__track" cx="70" cy="70" r={r} />
        <circle
          className="mcq-score-ring__fill"
          cx="70" cy="70" r={r}
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={animated ? offset : circ}
        />
      </svg>
      <div className="mcq-score-ring__center">
        <span className="mcq-score-ring__num">{correct}</span>
        <span className="mcq-score-ring__total">/ {total}</span>
      </div>
    </div>
  );
}

function SubjectSelectScreen({ onSelect, onClose }) {
  return (
    <div className="mcq-select">
      <button className="mcq-close-btn" style={{ position: "absolute", top: "1rem", right: "1rem" }} onClick={onClose} aria-label="Close">×</button>
      <div className="mcq-select__top">
        <p className="mcq-select__eyebrow">Quiz Practice</p>
        <h2 className="mcq-select__title">Choose Your Subject</h2>
      </div>

      <div className="mcq-select__grid">
        {ALL_SUBJECTS.map((s) => {
          const meta = SUBJECT_META[s];
          return (
            <button
              key={s}
              className={`mcq-subject-card mcq-subject-card--${s.toLowerCase()}`}
              onClick={() => onSelect(s)}
            >
              <span className="mcq-subject-card__label">{meta.label}</span>
              <span className="mcq-subject-card__name">{meta.full}</span>
              <div className="mcq-subject-card__topics">
                {meta.topics.slice(0, 4).map((t) => (
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
          onClick={() => onSelect("ALL")}
        >
          <span className="mcq-subject-card__label">Mixed</span>
          <span className="mcq-subject-card__name">All Subjects</span>
          <div className="mcq-subject-card__topics">
            {ALL_SUBJECTS.map((s) => (
              <span key={s} className="mcq-subject-card__topic-tag" style={{ color: SUBJECT_META[s].color, borderColor: `${SUBJECT_META[s].color}40` }}>{s}</span>
            ))}
          </div>
          <span className="mcq-subject-card__count">60 questions · all subjects combined</span>
        </button>
      </div>
    </div>
  );
}

function QuizScreen({ questions, onFinish, onEndEarly, subject }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const panelRef = useRef(null);

  const q = questions[idx];
  const total = questions.length;
  const correctSoFar = answers.filter((a) => a.wasCorrect).length;
  const meta = subject === "ALL" ? SUBJECT_META[q.subject] : SUBJECT_META[subject];

  const handleSelect = (optionIdx) => {
    if (locked) return;
    setSelected(optionIdx);
    setLocked(true);
    setAnswers((prev) => [
      ...prev,
      { id: q.id, subject: q.subject, topic: q.topic, wasCorrect: optionIdx === q.correct },
    ]);
  };

  const handleNext = () => {
    if (idx + 1 >= total) {
      onFinish([...answers]);
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
    setLocked(false);
    if (panelRef.current) panelRef.current.scrollTop = 0;
  };

  const getOptionClass = (oIdx) => {
    let cls = "mcq-option";
    if (locked) {
      cls += " mcq-option--locked";
      if (oIdx === q.correct) cls += " mcq-option--correct";
      else if (oIdx === selected && oIdx !== q.correct) cls += " mcq-option--wrong";
      else if (oIdx !== selected) cls += " mcq-option--dimmed";
    }
    return cls;
  };

  const progressPct = ((idx + (locked ? 1 : 0)) / total) * 100;

  return (
    <>
      <div className="mcq-quiz-header">
        <div className="mcq-quiz-header__subject">
          <div className="mcq-quiz-header__dot" style={{ background: meta.color }} />
          <span className="mcq-quiz-header__name">{subject === "ALL" ? q.subject : meta.label}</span>
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
        <button className="mcq-end-btn" onClick={() => onEndEarly([...answers])}>
          End Quiz
        </button>
      </div>

      <div className="mcq-quiz-body">
        <div className="mcq-question-panel" ref={panelRef}>
          <div className="mcq-q-meta">
            <span className="mcq-q-num">Question {idx + 1}</span>
            <span
              className="mcq-topic-badge"
              style={{
                color: meta.color,
                background: `${meta.color}15`,
                borderColor: `${meta.color}35`,
              }}
            >
              {q.topic}
            </span>
          </div>

          <p className="mcq-question-text" dangerouslySetInnerHTML={{ __html: q.question.replace(/`([^`]+)`/g, '<code>$1</code>') }} />

          <div className="mcq-options">
            {q.options.map((opt, oIdx) => (
              <button
                key={oIdx}
                className={getOptionClass(oIdx)}
                onClick={() => handleSelect(oIdx)}
              >
                <span className="mcq-option__letter">{LETTERS[oIdx]}</span>
                <span className="mcq-option__text" dangerouslySetInnerHTML={{ __html: opt.replace(/`([^`]+)`/g, '<code>$1</code>') }} />
              </button>
            ))}
          </div>

          {locked && (
            <div className="mcq-explanation">
              {q.explanation}
            </div>
          )}

          <button
            className="mcq-next-btn"
            onClick={handleNext}
            disabled={!locked}
          >
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
                <li key={i} dangerouslySetInnerHTML={{ __html: pt.replace(/`([^`]+)`/g, '<code>$1</code>') }} />
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

function ResultsScreen({ answers, subject, onRetake, onNewSubject, onClose }) {
  const total = answers.length;
  const correct = answers.filter((a) => a.wasCorrect).length;
  const pct = total > 0 ? correct / total : 0;

  const label = pct >= 0.8 ? "Excellent!" : pct >= 0.6 ? "Good Work" : "Needs Review";
  const labelClass = pct >= 0.8 ? "mcq-results__label--excellent" : pct >= 0.6 ? "mcq-results__label--good" : "mcq-results__label--review";
  const ringColor = pct >= 0.8 ? "#16a34a" : pct >= 0.6 ? "#d97706" : "#e63946";

  const wrongTopics = [...new Set(answers.filter((a) => !a.wasCorrect).map((a) => a.topic))];

  const subjBreakdown = ALL_SUBJECTS.map((s) => {
    const sq = answers.filter((a) => a.subject === s);
    if (sq.length === 0) return null;
    const sc = sq.filter((a) => a.wasCorrect).length;
    return { s, correct: sc, total: sq.length };
  }).filter(Boolean);

  return (
    <div className="mcq-results">
      <div className="mcq-results__top">
        <p className="mcq-results__eyebrow">
          {subject === "ALL" ? "All Subjects" : SUBJECT_META[subject]?.full} · Results
        </p>
        <ScoreRing correct={correct} total={total} color={ringColor} />
        <p className={`mcq-results__label ${labelClass}`}>{label}</p>
      </div>

      {subjBreakdown.length > 1 && (
        <div className="mcq-results__section">
          <p className="mcq-results__section-title">Per Subject</p>
          <div className="mcq-subj-breakdown">
            {subjBreakdown.map(({ s, correct: sc, total: st }) => {
              const p = st > 0 ? (sc / st) * 100 : 0;
              const c = SUBJECT_META[s].color;
              return (
                <div key={s} className="mcq-subj-row">
                  <span className="mcq-subj-row__name" style={{ color: c }}>{s}</span>
                  <div className="mcq-subj-row__bar-wrap">
                    <div className="mcq-subj-row__bar" style={{ width: `${p}%`, background: c }} />
                  </div>
                  <span className="mcq-subj-row__fraction">{sc}/{st}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {wrongTopics.length > 0 && (
        <div className="mcq-results__section">
          <p className="mcq-results__section-title">Areas to Review ({wrongTopics.length} topic{wrongTopics.length > 1 ? "s" : ""})</p>
          <div className="mcq-wrong-topics">
            {wrongTopics.map((t) => (
              <span key={t} className="mcq-wrong-chip">{t}</span>
            ))}
          </div>
        </div>
      )}

      <div className="mcq-results__actions">
        <button className="mcq-results__btn mcq-results__btn--primary" onClick={onRetake}>
          Retake Same
        </button>
        <button className="mcq-results__btn mcq-results__btn--secondary" onClick={onNewSubject}>
          Try Another Subject
        </button>
        <button className="mcq-results__btn mcq-results__btn--secondary" onClick={onClose}>
          Back to Book
        </button>
      </div>
    </div>
  );
}

export default function MCQQuiz({ open, onClose }) {
  const [phase, setPhase] = useState("select");
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [finalAnswers, setFinalAnswers] = useState([]);

  const startQuiz = (s) => {
    setSubject(s);
    setQuestions(buildQuestions(s));
    setPhase("quiz");
  };

  const handleFinish = (answers) => {
    setFinalAnswers(answers);
    setPhase("results");
  };

  const handleRetake = () => {
    setQuestions(buildQuestions(subject));
    setFinalAnswers([]);
    setPhase("quiz");
  };

  const handleNewSubject = () => {
    setSubject(null);
    setQuestions([]);
    setFinalAnswers([]);
    setPhase("select");
  };

  const handleClose = () => {
    setPhase("select");
    setSubject(null);
    setQuestions([]);
    setFinalAnswers([]);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="mcq-overlay">
      {phase === "select" && (
        <SubjectSelectScreen onSelect={startQuiz} onClose={handleClose} />
      )}

      {phase === "quiz" && questions.length > 0 && (
        <QuizScreen
          questions={questions}
          subject={subject}
          onFinish={handleFinish}
          onEndEarly={handleFinish}
        />
      )}

      {phase === "results" && (
        <>
          <div className="mcq-quiz-header" style={{ justifyContent: "space-between" }}>
            <span className="mcq-quiz-header__name">Results</span>
            <button className="mcq-close-btn" onClick={handleClose}>×</button>
          </div>
          <ResultsScreen
            answers={finalAnswers}
            subject={subject}
            onRetake={handleRetake}
            onNewSubject={handleNewSubject}
            onClose={handleClose}
          />
        </>
      )}
    </div>
  );
}
