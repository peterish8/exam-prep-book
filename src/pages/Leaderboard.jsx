import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api.js";
import { SUBJECT_META, ALL_SUBJECTS } from "../data/mcq.js";
import { loadScores } from "../lib/scores.js";
import "../styles/mcq.css";

const CONVEX_READY = !!import.meta.env.VITE_CONVEX_URL;
const FILTERS = ["ALL", ...ALL_SUBJECTS];

export default function Leaderboard() {
  const [filter, setFilter] = useState("ALL");

  const convexScores = useQuery(
    api.scores.getLeaderboard,
    CONVEX_READY ? { subject: filter !== "ALL" ? filter : undefined } : "skip"
  );

  const localScores = loadScores(filter !== "ALL" ? filter : null);
  const scores = CONVEX_READY && convexScores !== undefined ? convexScores : localScores;
  const isLive = CONVEX_READY && convexScores !== undefined;

  return (
    <div className="lb-page">
      <div className="lb-header">
        <Link to="/quiz/select" className="quiz-back-btn">← Quiz</Link>
        <h1 className="lb-title">🏆 Leaderboard</h1>
        <Link to="/" className="quiz-back-btn">📖 Book</Link>
      </div>

      <div className="lb-filters">
        {FILTERS.map(f => {
          const meta = SUBJECT_META[f];
          const active = filter === f;
          return (
            <button
              key={f}
              className={`lb-filter-btn${active ? " lb-filter-btn--active" : ""}`}
              style={active && f !== "ALL" ? {
                borderColor: meta?.color,
                color: meta?.color,
                background: `${meta?.color}15`,
              } : {}}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          );
        })}
        <span className="lb-mode-badge">
          {isLive ? "● Live · Shared" : "Local scores"}
        </span>
      </div>

      <div className="lb-table-wrap">
        {scores.length === 0 ? (
          <div className="lb-empty">
            No scores yet.{" "}
            <Link to="/quiz/select">Take a quiz to get on the board!</Link>
          </div>
        ) : (
          <table className="lb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Score</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s, i) => {
                const meta = SUBJECT_META[s.subject];
                const podiumClass = i === 0 ? " lb-row--gold" : i === 1 ? " lb-row--silver" : i === 2 ? " lb-row--bronze" : "";
                const medals = ["🥇", "🥈", "🥉"];
                return (
                  <tr key={s._id || s.id} className={`lb-row${i < 3 ? " lb-row--top" + podiumClass : ""}`}>
                    <td className="lb-rank">{i < 3 ? <span className="lb-medal">{medals[i]}</span> : <span className="lb-rank-num">{i + 1}</span>}</td>
                    <td className="lb-name">{s.name}{i === 0 && <span className="lb-crown"> 👑</span>}</td>
                    <td>
                      <span
                        className="lb-subject-tag"
                        style={{
                          color: meta?.color,
                          borderColor: `${meta?.color}40`,
                          background: `${meta?.color}12`,
                        }}
                      >
                        {s.subject}
                      </span>
                    </td>
                    <td className="lb-score">{s.correct}/{s.total}</td>
                    <td>
                      <span className={`lb-pct lb-pct--${s.pct >= 80 ? "green" : s.pct >= 60 ? "amber" : "red"}`}>
                        {s.pct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
