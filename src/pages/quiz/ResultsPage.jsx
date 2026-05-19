import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api.js";
import { SUBJECT_META, ALL_SUBJECTS } from "../../data/mcq.js";
import { saveScore } from "../../lib/scores.js";

const CONVEX_READY = !!import.meta.env.VITE_CONVEX_URL;

function ScoreRing({ correct, total, color }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const pct = total > 0 ? correct / total : 0;
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
          strokeDashoffset={animated ? circ * (1 - pct) : circ}
        />
      </svg>
      <div className="mcq-score-ring__center">
        <span className="mcq-score-ring__num">{correct}</span>
        <span className="mcq-score-ring__total">/ {total}</span>
      </div>
    </div>
  );
}

export default function ResultsPage({ playerName }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { answers = [], subject } = state || {};
  const addScoreMutation = useMutation(api.scores.addScore);
  const [saved, setSaved] = useState(false);

  const total = answers.length;
  const correct = answers.filter(a => a.wasCorrect).length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const label = pct >= 80 ? "Excellent!" : pct >= 60 ? "Good Work" : "Needs Review";
  const labelClass = `mcq-results__label--${pct >= 80 ? "excellent" : pct >= 60 ? "good" : "review"}`;
  const ringColor = pct >= 80 ? "#16a34a" : pct >= 60 ? "#d97706" : "#e63946";
  const subjectKey = subject === "all" ? "ALL" : subject?.toUpperCase();

  useEffect(() => {
    if (!total || saved) return;
    const entry = {
      name: playerName || "Anonymous",
      subject: subjectKey,
      correct,
      total,
      pct,
      createdAt: Date.now(),
    };
    saveScore(entry);
    if (CONVEX_READY) {
      addScoreMutation(entry).catch(() => {});
    }
    setSaved(true);
  }, []);

  if (!total) {
    return (
      <div className="mcq-results" style={{ justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: "rgba(232,228,240,0.4)", fontFamily: "var(--sans,sans-serif)" }}>
          No quiz data found.
        </p>
        <Link
          to="/quiz/select"
          className="mcq-results__btn mcq-results__btn--primary"
          style={{ marginTop: "1rem" }}
        >
          Start a Quiz
        </Link>
      </div>
    );
  }

  const wrongTopics = [...new Set(answers.filter(a => !a.wasCorrect).map(a => a.topic))];
  const subjBreakdown = ALL_SUBJECTS.map(s => {
    const sq = answers.filter(a => a.subject === s);
    if (!sq.length) return null;
    return { s, correct: sq.filter(a => a.wasCorrect).length, total: sq.length };
  }).filter(Boolean);

  return (
    <div className="mcq-results">
      <div className="mcq-results__top">
        <p className="mcq-results__eyebrow">
          {subject === "all" ? "All Subjects" : SUBJECT_META[subjectKey]?.full} · Results
        </p>
        <ScoreRing correct={correct} total={total} color={ringColor} />
        <p className={`mcq-results__label ${labelClass}`}>{label}</p>
        {saved && (
          <p className="mcq-results__saved">✓ Score saved to leaderboard</p>
        )}
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
          <p className="mcq-results__section-title">
            Areas to Review ({wrongTopics.length} topic{wrongTopics.length > 1 ? "s" : ""})
          </p>
          <div className="mcq-wrong-topics">
            {wrongTopics.map(t => (
              <span key={t} className="mcq-wrong-chip">{t}</span>
            ))}
          </div>
        </div>
      )}

      <div className="mcq-results__actions">
        <button
          className="mcq-results__btn mcq-results__btn--primary"
          onClick={() => navigate(`/quiz/${subject}`)}
        >
          Retake Same
        </button>
        <Link to="/quiz/select" className="mcq-results__btn mcq-results__btn--secondary">
          Change Subject
        </Link>
        <Link to="/leaderboard" className="mcq-results__btn mcq-results__btn--secondary">
          Leaderboard
        </Link>
        <Link to="/" className="mcq-results__btn mcq-results__btn--secondary">
          Back to Book
        </Link>
      </div>
    </div>
  );
}
