import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import SubjectSelect from "./SubjectSelect.jsx";
import QuizPage from "./QuizPage.jsx";
import ResultsPage from "./ResultsPage.jsx";
import "../../styles/mcq.css";

export default function QuizRoot() {
  const [playerName, setPlayerName] = useState(
    () => localStorage.getItem("quizPlayerName") || ""
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("quizNamePrompted")) {
      setShowModal(true);
    }
  }, []);

  const handleName = (name) => {
    const n = name.trim() || "Anonymous";
    localStorage.setItem("quizPlayerName", n);
    localStorage.setItem("quizNamePrompted", "1");
    setPlayerName(n);
    setShowModal(false);
  };

  return (
    <div className="quiz-root">
      <div className="quiz-root__header">
        <Link to="/" className="quiz-back-btn">← Book</Link>
        <span className="quiz-root__title">Practice Quiz</span>
        <Link to="/leaderboard" className="quiz-lb-btn">🏆 Leaderboard</Link>
      </div>

      {showModal && <NameModal onSubmit={handleName} />}

      <div className="quiz-root__body">
        <Routes>
          <Route index element={<Navigate to="select" replace />} />
          <Route path="select" element={<SubjectSelect />} />
          <Route path=":subject" element={<QuizPage playerName={playerName} />} />
          <Route path="results" element={<ResultsPage playerName={playerName} />} />
        </Routes>
      </div>
    </div>
  );
}

function NameModal({ onSubmit }) {
  const [name, setName] = useState("");
  return (
    <div className="name-modal-overlay">
      <div className="name-modal">
        <h2 className="name-modal__title">What should we call you?</h2>
        <p className="name-modal__sub">
          Your score goes on the leaderboard. Skip to stay anonymous.
        </p>
        <input
          className="name-modal__input"
          placeholder="Your name..."
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onSubmit(name)}
          autoFocus
          maxLength={32}
        />
        <div className="name-modal__actions">
          <button
            className="name-modal__btn name-modal__btn--primary"
            onClick={() => onSubmit(name)}
          >
            {name.trim() ? `Let's go, ${name.trim()}!` : "Continue"}
          </button>
          <button
            className="name-modal__btn name-modal__btn--ghost"
            onClick={() => onSubmit("")}
          >
            Skip — stay anonymous
          </button>
        </div>
      </div>
    </div>
  );
}
