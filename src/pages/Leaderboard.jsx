import { Component, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api.js";
import { SUBJECT_META, ALL_SUBJECTS } from "../data/mcq.js";
import { loadRawScores } from "../lib/scores.js";
import "../styles/mcq.css";

const CONVEX_READY = !!import.meta.env.VITE_CONVEX_URL;
const FILTERS = ["ALL", ...ALL_SUBJECTS];
const MEDALS = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  return (
    <LeaderboardErrorBoundary>
      <LeaderboardContent useLiveScores />
    </LeaderboardErrorBoundary>
  );
}

class LeaderboardErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return <LeaderboardContent useLiveScores={false} liveFailed />;
    }
    return this.props.children;
  }
}

function LeaderboardContent({ useLiveScores, liveFailed = false }) {
  const [filter, setFilter] = useState("ALL");
  const [selectedKey, setSelectedKey] = useState(null);
  const convexScores = useLiveScores && CONVEX_READY ? useQuery(api.scores.getScores, {}) : undefined;
  const sourceScores = useLiveScores && convexScores !== undefined ? convexScores : loadRawScores();
  const isLive = useLiveScores && convexScores !== undefined;

  const filteredScores = useMemo(() => {
    if (filter === "ALL") return sourceScores;
    return sourceScores.filter((score) => score.subject === filter);
  }, [filter, sourceScores]);

  const groupedScores = useMemo(() => buildGroupedScores(filteredScores), [filteredScores]);

  const selectedEntry = useMemo(
    () => groupedScores.find((entry) => entry.key === selectedKey) || null,
    [groupedScores, selectedKey]
  );

  return (
    <div className="lb-page">
      <div className="lb-header">
        <Link to="/quiz/select" className="quiz-back-btn">← Quiz</Link>
        <h1 className="lb-title">🏆 Leaderboard</h1>
        <Link to="/" className="quiz-back-btn">📖 Book</Link>
      </div>

      <div className="lb-filters">
        {FILTERS.map((f) => {
          const meta = SUBJECT_META[f];
          const active = filter === f;
          return (
            <button
              key={f}
              className={`lb-filter-btn${active ? " lb-filter-btn--active" : ""}`}
              style={
                active && f !== "ALL"
                  ? {
                      borderColor: meta?.color,
                      color: meta?.color,
                      background: `${meta?.color}15`,
                    }
                  : {}
              }
              onClick={() => {
                setFilter(f);
                setSelectedKey(null);
              }}
            >
              {f}
            </button>
          );
        })}
        <span className="lb-mode-badge">
          {isLive ? "● Live · Shared" : liveFailed ? "Local scores · sync pending" : "Local scores"}
        </span>
      </div>

      <div className="lb-table-wrap">
        {groupedScores.length === 0 ? (
          <div className="lb-empty">
            No scores yet. <Link to="/quiz/select">Take a quiz to get on the board!</Link>
          </div>
        ) : (
          <table className="lb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Best Subject</th>
                <th>Best Score</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {groupedScores.map((entry, i) => {
                const best = entry.best;
                const meta = SUBJECT_META[best.subject];
                const podiumClass =
                  i === 0 ? " lb-row--gold" : i === 1 ? " lb-row--silver" : i === 2 ? " lb-row--bronze" : "";

                return (
                  <tr
                    key={entry.key}
                    className={`lb-row lb-row--clickable${i < 3 ? " lb-row--top" + podiumClass : ""}`}
                    onClick={() => setSelectedKey(entry.key)}
                  >
                    <td className="lb-rank">
                      {i < 3 ? <span className="lb-medal">{MEDALS[i]}</span> : <span className="lb-rank-num">{i + 1}</span>}
                    </td>
                    <td className="lb-name">
                      {entry.name}
                      {i === 0 && <span className="lb-crown"> 👑</span>}
                      <span className="lb-attempts">{entry.history.length} attempt{entry.history.length > 1 ? "s" : ""}</span>
                    </td>
                    <td>
                      <span
                        className="lb-subject-tag"
                        style={{
                          color: meta?.color,
                          borderColor: `${meta?.color}40`,
                          background: `${meta?.color}12`,
                        }}
                      >
                        {best.subject}
                      </span>
                    </td>
                    <td className="lb-score">{best.correct}/{best.total}</td>
                    <td>
                      <span className={`lb-pct lb-pct--${best.pct >= 80 ? "green" : best.pct >= 60 ? "amber" : "red"}`}>
                        {best.pct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {selectedEntry && (
        <div className="lb-modal-backdrop" onClick={() => setSelectedKey(null)} role="presentation">
          <div className="lb-modal" onClick={(event) => event.stopPropagation()}>
            <div className="lb-modal__top">
              <div>
                <p className="lb-modal__eyebrow">Score History</p>
                <h2 className="lb-modal__title">{selectedEntry.name}</h2>
                <p className="lb-modal__sub">
                  Best score: {selectedEntry.best.correct}/{selectedEntry.best.total} in {selectedEntry.best.subject}
                </p>
              </div>
              <button className="lb-modal__close" onClick={() => setSelectedKey(null)} aria-label="Close">
                ×
              </button>
            </div>

            <div className="lb-modal__list">
              {selectedEntry.history.map((score, index) => {
                const meta = SUBJECT_META[score.subject];
                return (
                  <div key={score._id || score.id || `${selectedEntry.key}-${index}`} className="lb-history-item">
                    <div className="lb-history-item__left">
                      <span
                        className="lb-subject-tag"
                        style={{
                          color: meta?.color,
                          borderColor: `${meta?.color}40`,
                          background: `${meta?.color}12`,
                        }}
                      >
                        {score.subject}
                      </span>
                      <span className="lb-history-item__date">{formatDate(score.createdAt)}</span>
                    </div>
                    <div className="lb-history-item__right">
                      <span className="lb-score">{score.correct}/{score.total}</span>
                      <span className={`lb-pct lb-pct--${score.pct >= 80 ? "green" : score.pct >= 60 ? "amber" : "red"}`}>
                        {score.pct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function buildGroupedScores(scores) {
  const groups = new Map();

  for (const score of scores) {
    const key = normalizeName(score.name);
    const existing = groups.get(key);

    if (!existing) {
      groups.set(key, {
        key,
        name: score.name,
        best: score,
        history: [score],
      });
      continue;
    }

    existing.history.push(score);
    if (compareScores(score, existing.best) < 0) {
      existing.best = score;
      existing.name = score.name;
    }
  }

  return [...groups.values()]
    .map((entry) => ({
      ...entry,
      history: [...entry.history].sort((a, b) => b.createdAt - a.createdAt || compareScores(a, b)),
    }))
    .sort((a, b) => compareScores(a.best, b.best));
}

function compareScores(a, b) {
  return (
    b.pct - a.pct ||
    b.correct - a.correct ||
    b.total - a.total ||
    b.createdAt - a.createdAt
  );
}

function normalizeName(name) {
  return String(name || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function formatDate(timestamp) {
  if (!timestamp) return "Unknown time";

  try {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "Unknown time";
  }
}
