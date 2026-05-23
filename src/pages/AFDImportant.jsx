import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  ChevronRight,
  Flame,
  GraduationCap,
  Lightbulb,
  RefreshCcw,
  Save,
  Sparkles,
  Trophy,
} from "lucide-react";
import { api } from "../../convex/_generated/api.js";
import {
  AFD_QUIZ_MODULES,
  AFD_QUIZ_QUESTIONS,
  AFD_TOTAL_QUESTIONS,
} from "../data/afdModuleQuiz.js";
import "../styles/book.css";
import "../styles/mcq.css";

const BEST_SCORE_KEY = "afd-quiz-best-scores:v1";
const PLAYER_NAME_KEY = "afd-quiz-name";
const CONVEX_READY = Boolean(import.meta.env.VITE_CONVEX_URL);
const AFD_COLOR = "#3b82f6";
const LETTERS = ["A", "B", "C", "D"];

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function readName() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(PLAYER_NAME_KEY) || "";
}

function ProgressBar({ value }) {
  return (
    <div className="dsa-roadmap__progress-track">
      <motion.div
        className="dsa-roadmap__progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </div>
  );
}

function getGrade(pct) {
  if (pct >= 90) return "Exam Beast";
  if (pct >= 75) return "Strong Revision";
  if (pct >= 60) return "Almost There";
  return "Needs One More Round";
}

function summarizeTopics(answers) {
  const map = new Map();
  for (const answer of answers) {
    const current = map.get(answer.topic) || { topic: answer.topic, correct: 0, total: 0 };
    current.total += 1;
    if (answer.wasCorrect) current.correct += 1;
    map.set(answer.topic, current);
  }
  return [...map.values()].map((row) => ({
    ...row,
    pct: Math.round((row.correct / row.total) * 100),
  }));
}

function ModuleCard({ module, best, onStart, index }) {
  const pct = best?.pct || 0;

  return (
    <motion.button
      className={`dsa-roadmap__module-card ${module.accent}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035 }}
      onClick={onStart}
    >
      <div className="dsa-roadmap__module-top">
        <span className="dsa-roadmap__module-emoji">{module.emoji}</span>
        <span className="dsa-roadmap__module-tag">Module {module.id}</span>
      </div>
      <h3>{module.title}</h3>
      <p>{module.description}</p>
      <ProgressBar value={pct} />
      <div className="dsa-roadmap__module-bottom">
        <span>{best ? `Best ${best.correct}/30 (${best.pct}%)` : "30 questions"}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
          Start Quiz <ChevronRight size={16} />
        </span>
      </div>
    </motion.button>
  );
}

function OverviewView({ bestScores, onStart, onLeaderboard }) {
  const attempted = Object.keys(bestScores).length;
  const bestOverall = Object.values(bestScores).reduce(
    (best, score) => Math.max(best, score?.pct || 0),
    0
  );

  return (
    <>
      <section className="dsa-roadmap__hero">
        <div className="dsa-roadmap__hero-copy">
          <Link to="/" className="dsa-roadmap__back">
            <ArrowLeft size={16} /> Back to book
          </Link>
          <div className="dsa-roadmap__eyebrow">
            <Sparkles size={16} /> AFD Teacher-Style MCQ Lab
          </div>
          <h1>AFD Quiz Lab.</h1>
          <p>
            Ten modules, thirty questions each. Every question follows your teacher's direct
            exam style with believable traps, instant explanations, and reference notes.
          </p>
        </div>

        <div className="dsa-roadmap__hero-progress">
          <div className="dsa-roadmap__hero-progress-top">
            <span>Progress</span>
            <span>{attempted}/10 modules attempted</span>
          </div>
          <ProgressBar value={attempted * 10} />
          <div className="dsa-roadmap__hero-progress-value">{bestOverall}%</div>
          <p>Best overall module score saved on this device.</p>
          <button className="dsa-roadmap__done-btn" onClick={onLeaderboard} style={{ marginTop: "0.85rem", width: "100%" }}>
            <Trophy size={17} /> Open AFD Leaderboard
          </button>
        </div>
      </section>

      <section className="dsa-roadmap__toolbar">
        <div>
          <div className="dsa-roadmap__toolbar-kicker">
            <GraduationCap size={15} /> Choose a module
          </div>
          <h2>{AFD_TOTAL_QUESTIONS} total questions, split module-wise</h2>
        </div>
      </section>

      <section className="dsa-roadmap__module-grid">
        {AFD_QUIZ_MODULES.map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            best={bestScores[module.id]}
            index={index}
            onStart={() => onStart(module.id)}
          />
        ))}
      </section>
    </>
  );
}

function QuizView({
  module,
  questions,
  quizIdx,
  selected,
  locked,
  answers,
  showRef,
  onSelect,
  onNext,
  onBack,
  onToggleRef,
}) {
  const question = questions[quizIdx];
  const progressPct = ((quizIdx + (locked ? 1 : 0)) / questions.length) * 100;
  const correctSoFar = answers.filter((answer) => answer.wasCorrect).length;
  const attempted = answers.length;
  const remaining = questions.length - attempted;
  const accuracy = attempted ? Math.round((correctSoFar / attempted) * 100) : 0;
  const isTheoryQuestion = question.type === "theory";
  const theorySelections =
    isTheoryQuestion && selected && typeof selected === "object" ? selected : {};
  const theoryComplete =
    isTheoryQuestion &&
    question.blanks.every((_, blankIdx) =>
      Object.prototype.hasOwnProperty.call(theorySelections, blankIdx)
    );
  const canProceed = isTheoryQuestion ? theoryComplete : locked;

  const getOptionClass = (optionIndex) => {
    if (!locked) return "mcq-option";
    if (optionIndex === question.ans) return "mcq-option mcq-option--locked mcq-option--correct";
    if (optionIndex === selected) return "mcq-option mcq-option--locked mcq-option--wrong";
    return "mcq-option mcq-option--locked mcq-option--dimmed";
  };

  const getTheoryOptionClass = (blankIndex, optionIndex, blank) => {
    const chosen = theorySelections[blankIndex];
    if (chosen === undefined) return "mcq-option";
    if (optionIndex === blank.ans) return "mcq-option mcq-option--locked mcq-option--correct";
    if (chosen === optionIndex) return "mcq-option mcq-option--locked mcq-option--wrong";
    return "mcq-option mcq-option--locked mcq-option--dimmed";
  };

  return (
    <>
      <div className="mcq-quiz-header">
        <div className="mcq-quiz-header__left">
          <button className="mcq-quiz-header__back" onClick={onBack} aria-label="Back to AFD modules">
            ←
          </button>
          <div className="mcq-quiz-header__subject">
            <div className="mcq-quiz-header__dot" style={{ background: AFD_COLOR }} />
            <span className="mcq-quiz-header__name">AFD-M{module.id}</span>
          </div>
          <div className="mcq-quiz-header__progress-wrap">
            <div className="mcq-quiz-header__bar">
              <div
                className="mcq-quiz-header__bar-fill"
                style={{ width: `${progressPct}%`, background: AFD_COLOR }}
              />
            </div>
            <span className="mcq-quiz-header__progress-label">Q{quizIdx + 1} / {questions.length}</span>
          </div>
        </div>
        <div className="mcq-quiz-header__right">
          <span className="mcq-quiz-header__score">
            <span className="mcq-quiz-header__score-label">Correct:</span>
            <strong>{correctSoFar}</strong>
          </span>
          <button
            className="mcq-quiz-header__info"
            onClick={onToggleRef}
            aria-expanded={showRef}
            aria-controls="afd-module-reference-panel"
            aria-label="Reference notes"
          >
            i
          </button>
          <button className="mcq-end-btn" onClick={onBack}>
            End
          </button>
        </div>
      </div>

      <div className={`mcq-quiz-body ${showRef ? "mcq-quiz-body--mobile-ref-open" : ""}`}>
        <div className="mcq-question-panel">
          <div className="mcq-quiz-panel-head">
            <div className="mcq-quiz-panel-head__intro">
              <span className="mcq-quiz-panel-head__eyebrow">Active Question</span>
              <h2 className="mcq-quiz-panel-head__title">Advanced Frontend Development</h2>
              <p style={{ color: "rgba(232,228,240,0.52)", fontSize: "0.76rem", lineHeight: 1.55 }}>
                {module.title}
              </p>
            </div>
            <div className="mcq-quick-stats">
              <div className="mcq-quick-stat">
                <span className="mcq-quick-stat__label">Attempted</span>
                <strong className="mcq-quick-stat__value">{attempted}</strong>
              </div>
              <div className="mcq-quick-stat">
                <span className="mcq-quick-stat__label">Remaining</span>
                <strong className="mcq-quick-stat__value">{remaining}</strong>
              </div>
              <div className="mcq-quick-stat">
                <span className="mcq-quick-stat__label">Accuracy</span>
                <strong className="mcq-quick-stat__value">{accuracy}%</strong>
              </div>
            </div>
          </div>

          <motion.div
            className="mcq-question-card"
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mcq-q-meta">
              <span className="mcq-q-num">Question {quizIdx + 1}</span>
              <span
                className="mcq-topic-badge"
                style={{ color: AFD_COLOR, background: `${AFD_COLOR}15`, borderColor: `${AFD_COLOR}35` }}
              >
                {question.topic}
              </span>
              <span
                className="mcq-topic-badge"
                style={{
                  color: "#c4b5fd",
                  background: "rgba(124,58,237,0.16)",
                  borderColor: "rgba(124,58,237,0.32)",
                }}
              >
                {isTheoryQuestion ? "Theory FIB" : "MCQ"}
              </span>
            </div>
            <p className="mcq-question-text">{question.q}</p>
          </motion.div>

          {isTheoryQuestion ? (
            <div style={{ display: "grid", gap: "1rem" }}>
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.035)",
                  padding: "1rem",
                }}
              >
                <span
                  style={{
                    display: "block",
                    color: "rgba(232,228,240,0.52)",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  Answer Pointers - fill each blank
                </span>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {question.blanks.map((blank, blankIndex) => (
                    <section
                      key={`${question.id}-blank-${blankIndex}`}
                      style={{
                        borderTop: blankIndex ? "1px solid rgba(255,255,255,0.08)" : "none",
                        paddingTop: blankIndex ? "1rem" : 0,
                      }}
                    >
                      <p
                        style={{
                          color: "#f7f3ff",
                          fontFamily: "Georgia, serif",
                          fontSize: "1.22rem",
                          fontWeight: 700,
                          lineHeight: 1.55,
                          marginBottom: "0.7rem",
                        }}
                      >
                        {blankIndex + 1}. {blank.text.split("___")[0]}
                        <span style={{ color: AFD_COLOR, textDecoration: "underline" }}>___</span>
                        {blank.text.split("___")[1]}
                      </p>
                      <div className="mcq-options" style={{ gap: "0.55rem" }}>
                        {blank.opts.map((option, optionIndex) => (
                          <button
                            key={`${blank.text}-${option}`}
                            className={getTheoryOptionClass(blankIndex, optionIndex, blank)}
                            onClick={() => onSelect(blankIndex, optionIndex)}
                            disabled={theorySelections[blankIndex] !== undefined}
                            style={{ minHeight: "54px" }}
                          >
                            <span className="mcq-option__letter">{LETTERS[optionIndex]}</span>
                            <span className="mcq-option__text">{option}</span>
                          </button>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mcq-options">
              {question.opts.map((option, index) => (
                <button
                  key={option}
                  className={getOptionClass(index)}
                  onClick={() => onSelect(index)}
                  disabled={locked}
                >
                  <span className="mcq-option__letter">{LETTERS[index]}</span>
                  <span className="mcq-option__text">{option}</span>
                </button>
              ))}
            </div>
          )}

          {canProceed ? (
            <div className="mcq-explanation">
              <strong>
                {answers[answers.length - 1]?.wasCorrect ? "Correct. " : "Not quite. "}
              </strong>
              {question.exp}
            </div>
          ) : null}

          <button className="mcq-next-btn" disabled={!canProceed} onClick={onNext}>
            {quizIdx === questions.length - 1 ? "See Results" : "Next"} <span className="arrow">→</span>
          </button>
        </div>

        <div
          id="afd-module-reference-panel"
          className={`mcq-reference-panel ${showRef ? "mcq-reference-panel--open" : ""}`}
        >
          <div className="mcq-reference-panel__mobile-top">
            <div>
              <span className="mcq-ref-eyebrow">Reference Notes</span>
              <h3 className="mcq-ref-title">{question.ref.title}</h3>
            </div>
            <button className="mcq-ref-close-btn" onClick={onToggleRef} aria-label="Close notes">
              ×
            </button>
          </div>
          <div className="mcq-ref-header">
            <span className="mcq-ref-eyebrow">Reference Notes</span>
            <h3 className="mcq-ref-title">{question.ref.title}</h3>
          </div>
          <p className="mcq-ref-subtitle">
            Read these quick revision points first, then answer. They are built from the AFD module notes.
          </p>
          <div className="mcq-ref-card" style={{ borderLeftColor: AFD_COLOR }}>
            <ul className="mcq-ref-points">
              {question.ref.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <p className="mcq-ref-footnote">From your AFD study notes · Module {module.id}</p>
        </div>
        <div
          className={`mcq-mobile-ref-backdrop ${showRef ? "mcq-mobile-ref-backdrop--open" : ""}`}
          onClick={onToggleRef}
          aria-hidden="true"
        />
      </div>

      <div className="mcq-mobile-actionbar">
        <button
          className="mcq-mobile-actionbar__secondary"
          onClick={onToggleRef}
          aria-expanded={showRef}
          aria-controls="afd-module-reference-panel"
        >
          {showRef ? "Close" : "Notes"}
        </button>
        <button className="mcq-mobile-actionbar__primary" onClick={onNext} disabled={!canProceed}>
          {quizIdx === questions.length - 1 ? "See Results" : "Next Question"}
        </button>
      </div>
    </>
  );
}

function ResultsView({ module, answers, playerName, submitted, onNameChange, onSave, onRetry, onBack }) {
  const correct = answers.filter((answer) => answer.wasCorrect).length;
  const pct = Math.round((correct / answers.length) * 100);
  const topics = summarizeTopics(answers);
  const weak = topics.filter((topic) => topic.pct < 70);

  return (
    <section className="dsa-roadmap__section-stack">
      <div className={`dsa-roadmap__study-banner ${module.accent}`}>
        <div className="dsa-roadmap__toolbar-kicker">Module {module.id} Results</div>
        <h2>{correct}/30 · {pct}% · {getGrade(pct)}</h2>
      </div>

      <div className="dsa-roadmap__code-notes">
        <div className="dsa-roadmap__side-card is-complexity">
          <strong><Award size={15} /> Score</strong>
          <p>You scored {correct} out of 30 in {module.title}.</p>
        </div>
        <div className="dsa-roadmap__side-card is-logic">
          <strong><Flame size={15} /> Weak Topics</strong>
          <p>{weak.length ? weak.map((topic) => topic.topic).join(", ") : "No weak topics below 70%. Nice revision round."}</p>
        </div>
      </div>

      <article className="dsa-roadmap__code-card">
        <div className="dsa-roadmap__code-head">
          <div>
            <div className="dsa-roadmap__question-badges">
              <span>Topic Analysis</span>
              <span>Lagging areas</span>
            </div>
            <h3>Where you are strong and where to revise next</h3>
          </div>
        </div>
        <div style={{ padding: "1rem", display: "grid", gap: "0.65rem" }}>
          {topics.map((topic) => (
            <div
              key={topic.topic}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "0.8rem",
                padding: "0.8rem 0.95rem",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: topic.pct >= 70 ? "rgba(34,197,94,0.1)" : "rgba(248,113,113,0.1)",
                color: "#edf2ff",
              }}
            >
              <strong>{topic.topic}</strong>
              <span>{topic.correct}/{topic.total} · {topic.pct}%</span>
            </div>
          ))}
        </div>
      </article>

      <article className="dsa-roadmap__code-card">
        <div className="dsa-roadmap__code-head">
          <div>
            <div className="dsa-roadmap__question-badges">
              <span>Leaderboard</span>
              <span>AFD-M{module.id}</span>
            </div>
            <h3>Save this module score</h3>
            <p>Leaderboard subject will be saved as AFD-M{module.id}.</p>
          </div>
        </div>
        <div style={{ padding: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <input
            value={playerName}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Your name"
            className="dsa-roadmap__search"
            style={{ flex: "1 1 220px" }}
          />
          <button
            className="dsa-roadmap__done-btn is-done"
            onClick={onSave}
            disabled={submitted || !playerName.trim()}
            style={{ opacity: submitted || !playerName.trim() ? 0.55 : 1 }}
          >
            <Save size={17} /> {submitted ? "Saved" : "Save Score"}
          </button>
        </div>
      </article>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button className="dsa-roadmap__done-btn" onClick={onRetry}>
          <RefreshCcw size={17} /> Try Again
        </button>
        <button className="dsa-roadmap__done-btn" onClick={onBack}>
          <ArrowLeft size={17} /> Back to Modules
        </button>
      </div>
    </section>
  );
}

function LeaderboardView({ lbModule, scores, onModule, onBack }) {
  const module = AFD_QUIZ_MODULES.find((item) => item.id === lbModule);

  return (
    <section className="dsa-roadmap__section-stack">
      <div className={`dsa-roadmap__study-banner ${module.accent}`}>
        <div className="dsa-roadmap__toolbar-kicker">AFD-M{lbModule}</div>
        <h2><Trophy size={25} /> {module.title} Leaderboard</h2>
        <p style={{ color: "rgba(232,228,240,0.72)", marginTop: "0.35rem" }}>
          Best score per name for this exact module.
        </p>
      </div>

      <div className="dsa-roadmap__toolbar">
        <button className="dsa-roadmap__back-modules" onClick={onBack}>
          <ArrowLeft size={16} /> Back to modules
        </button>
        <select
          value={lbModule}
          onChange={(event) => onModule(Number(event.target.value))}
          className="dsa-roadmap__search"
          style={{ width: "min(100%, 340px)" }}
        >
          {AFD_QUIZ_MODULES.map((item) => (
            <option key={item.id} value={item.id}>AFD-M{item.id}: {item.title}</option>
          ))}
        </select>
      </div>

      <article className="dsa-roadmap__code-card">
        <div style={{ padding: "1rem", display: "grid", gap: "0.65rem" }}>
          {!CONVEX_READY ? (
            <div className="dsa-roadmap__side-card is-study">
              <strong><Lightbulb size={15} /> Convex URL missing</strong>
              <p>Set VITE_CONVEX_URL in .env.local for shared leaderboard data.</p>
            </div>
          ) : null}
          {scores === undefined ? (
            <p style={{ color: "#cbd5e1" }}>Loading leaderboard...</p>
          ) : scores.length === 0 ? (
            <p style={{ color: "#cbd5e1" }}>No scores yet for AFD-M{lbModule}.</p>
          ) : (
            scores.map((score, index) => (
              <div
                key={score._id || `${score.name}-${index}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr auto",
                  gap: "0.8rem",
                  alignItems: "center",
                  padding: "0.85rem 1rem",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: index < 3 ? "rgba(245,158,11,0.13)" : "rgba(255,255,255,0.035)",
                  color: "#edf2ff",
                }}
              >
                <strong>#{index + 1}</strong>
                <span>{score.name}</span>
                <strong>{score.correct}/{score.total} · {score.pct}%</strong>
              </div>
            ))
          )}
        </div>
      </article>
    </section>
  );
}

export default function AFDImportant() {
  const [view, setView] = useState("overview");
  const [activeModule, setActiveModule] = useState(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showRef, setShowRef] = useState(false);
  const [playerName, setPlayerName] = useState(() => readName());
  const [submitted, setSubmitted] = useState(false);
  const [lbModule, setLbModule] = useState(1);
  const [bestScores, setBestScores] = useState(() => readJson(BEST_SCORE_KEY, {}));

  const addScore = useMutation(api.scores.addScore);
  const leaderboardScores = useQuery(api.scores.getLeaderboard, { subject: `AFD-M${lbModule}` });
  const module = AFD_QUIZ_MODULES.find((item) => item.id === activeModule);
  const questions = activeModule ? AFD_QUIZ_QUESTIONS[activeModule] : [];

  const resultSummary = useMemo(() => {
    const correct = answers.filter((answer) => answer.wasCorrect).length;
    const pct = answers.length ? Math.round((correct / answers.length) * 100) : 0;
    return { correct, total: answers.length, pct };
  }, [answers]);

  useEffect(() => {
    try {
      window.localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(bestScores));
    } catch {
      // Ignore local storage write failures.
    }
  }, [bestScores]);

  useEffect(() => {
    try {
      window.localStorage.setItem(PLAYER_NAME_KEY, playerName);
    } catch {
      // Ignore local storage write failures.
    }
  }, [playerName]);

  function startModule(moduleId) {
    setActiveModule(moduleId);
    setQuizIdx(0);
    setSelected(null);
    setLocked(false);
    setAnswers([]);
    setShowRef(false);
    setSubmitted(false);
    setView("quiz");
  }

  function chooseOption(index, optionIndex = null) {
    if (!questions[quizIdx]) return;
    const question = questions[quizIdx];
    if (locked && question.type !== "theory") return;

    if (question.type === "theory") {
      const blankIndex = index;
      const currentSelection = selected && typeof selected === "object" ? selected : {};
      if (Object.prototype.hasOwnProperty.call(currentSelection, blankIndex)) return;
      const nextSelection = {
        ...currentSelection,
        [blankIndex]: optionIndex,
      };
      setSelected(nextSelection);

      const allAnswered = question.blanks.every((_, blankIdx) =>
        Object.prototype.hasOwnProperty.call(nextSelection, blankIdx)
      );
      if (!allAnswered) return;

      const wasCorrect = question.blanks.every(
        (blank, blankIdx) => nextSelection[blankIdx] === blank.ans
      );
      setLocked(true);
      setAnswers((current) => [...current, { qId: question.id, topic: question.topic, wasCorrect }]);
      return;
    }

    const wasCorrect = index === question.ans;
    setSelected(index);
    setLocked(true);
    setAnswers((current) => [...current, { qId: question.id, topic: question.topic, wasCorrect }]);
  }

  function nextQuestion() {
    if (quizIdx === questions.length - 1) {
      const nextBest = { correct: resultSummary.correct, total: 30, pct: resultSummary.pct };
      setBestScores((current) => {
        const existing = current[activeModule];
        if (existing && existing.pct > nextBest.pct) return current;
        if (existing && existing.pct === nextBest.pct && existing.correct >= nextBest.correct) return current;
        return { ...current, [activeModule]: nextBest };
      });
      setView("results");
      return;
    }
    setQuizIdx((current) => current + 1);
    setSelected(null);
    setLocked(false);
    setShowRef(false);
  }

  async function saveScore() {
    if (!module || !playerName.trim() || submitted) return;
    await addScore({
      name: playerName.trim(),
      subject: `AFD-M${module.id}`,
      correct: resultSummary.correct,
      total: 30,
      pct: resultSummary.pct,
      createdAt: Date.now(),
    });
    setSubmitted(true);
  }

  function backToOverview() {
    setView("overview");
    setActiveModule(null);
    setQuizIdx(0);
    setSelected(null);
    setLocked(false);
    setAnswers([]);
    setShowRef(false);
  }

  if (view === "quiz" && module) {
    return (
      <div className="mcq-overlay">
        <QuizView
          module={module}
          questions={questions}
          quizIdx={quizIdx}
          selected={selected}
          locked={locked}
          answers={answers}
          showRef={showRef}
          onSelect={chooseOption}
          onNext={nextQuestion}
          onBack={backToOverview}
          onToggleRef={() => setShowRef((current) => !current)}
        />
      </div>
    );
  }

  return (
    <div className="dsa-code-lab">
      <div className="dsa-code-lab__backdrop dsa-code-lab__backdrop--blue" />
      <div className="dsa-code-lab__backdrop dsa-code-lab__backdrop--pink" />

      <main className="dsa-roadmap">
        {view === "overview" ? (
          <OverviewView
            bestScores={bestScores}
            onStart={startModule}
            onLeaderboard={() => setView("leaderboard")}
          />
        ) : null}

        {view === "results" && module ? (
          <ResultsView
            module={module}
            answers={answers}
            playerName={playerName}
            submitted={submitted}
            onNameChange={setPlayerName}
            onSave={saveScore}
            onRetry={() => startModule(module.id)}
            onBack={backToOverview}
          />
        ) : null}

        {view === "leaderboard" ? (
          <LeaderboardView
            lbModule={lbModule}
            scores={leaderboardScores}
            onModule={setLbModule}
            onBack={backToOverview}
          />
        ) : null}
      </main>
    </div>
  );
}
