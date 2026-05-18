import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

export const AuthBcryptA = forwardRef((props, ref) => {
  const [password, setPassword] = useState("mySecret");
  const [hashed, setHashed] = useState("");
  const [checkInput, setCheckInput] = useState("");
  const [matchResult, setMatchResult] = useState(null);

  // Simulate bcrypt (fake hash for demo)
  const fakeHash = (str) => `$2b$10$${btoa(str).slice(0, 22)}${btoa(str + "salt").slice(0, 31)}`;
  const fakeCompare = (plain, hash) => hash === fakeHash(plain);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">Auth & Bcrypt</h2>
        <p className="concept-def">
          Bcrypt <strong>hashes</strong> passwords with a salt. You never store plain passwords — only the hash.
        </p>
        <pre className="code-snippet" style={{ fontSize: "0.68rem" }}>{`const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 10); // 10 = salt rounds
const ok = await bcrypt.compare(password, hash); // true/false`}</pre>

        <div className="live-demo" style={{ marginTop: "0.5rem" }}>
          <div className="live-demo__label">Simulated Bcrypt</div>
          <input value={password} onChange={e => { setPassword(e.target.value); setHashed(""); setMatchResult(null); }}
            className="stack-input" placeholder="password" />
          <button className="run-btn" onClick={() => setHashed(fakeHash(password))}>Hash →</button>
          {hashed && (
            <div className="jsx-output" style={{ wordBreak: "break-all", fontSize: "0.72rem", marginTop: "0.4rem" }}>
              {hashed}
            </div>
          )}
          {hashed && (
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
              <input value={checkInput} onChange={e => setCheckInput(e.target.value)}
                className="stack-input" placeholder="check password" />
              <button className="run-btn" onClick={() => setMatchResult(fakeCompare(checkInput, hashed))}>Compare</button>
            </div>
          )}
          {matchResult !== null && (
            <div className={`validity-badge ${matchResult ? "valid" : "invalid"}`} style={{ marginTop: "0.4rem" }}>
              {matchResult ? "✅ Match!" : "❌ No match"}
            </div>
          )}
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Why Never Store Plain Passwords</h3>
        <ul className="fact-list">
          <li><strong>Database breach:</strong> if an attacker dumps your DB and passwords are plain text, every account is instantly compromised.</li>
          <li><strong>Hashing is one-way:</strong> bcrypt turns "mySecret" into a long hash — you can never reverse it back to the original.</li>
          <li><strong>Salt</strong> is a random value added before hashing — ensures two identical passwords produce different hashes, defeating rainbow table attacks.</li>
          <li><strong>Salt rounds (cost factor):</strong> each extra round doubles hashing time. Round 10 ≈ 100ms. Higher = slower brute force for attackers.</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>37</span>
    </div>
  );
});
AuthBcryptA.displayName = "AuthBcryptA";

export const AuthBcryptB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">JWT Authentication Flow</h3>
      <svg width="270" height="160" viewBox="0 0 270 160">
        {[
          { x: 10, label: "Client" },
          { x: 110, label: "Server" },
          { x: 200, label: "DB" },
        ].map((box, i) => (
          <g key={i}>
            <rect x={box.x} y="5" width="60" height="25" rx="5" fill="#1e1e2e" stroke="#555" />
            <text x={box.x + 30} y="22" textAnchor="middle" fontSize="10" fill="#aaa">{box.label}</text>
          </g>
        ))}
        {[
          { x1: 70, y1: 40, x2: 110, y2: 40, label: "POST /login", color: "#f59e0b" },
          { x1: 110, y1: 40, x2: 200, y2: 40, label: "find user", color: "#555" },
          { x1: 200, y1: 60, x2: 110, y2: 60, label: "user data", color: "#555" },
          { x1: 110, y1: 80, x2: 70, y2: 80, label: "JWT token", color: "#16a34a" },
          { x1: 70, y1: 105, x2: 110, y2: 105, label: "GET /profile + Bearer token", color: "#2563eb" },
          { x1: 110, y1: 125, x2: 70, y2: 125, label: "200 + data", color: "#16a34a" },
        ].map((arrow, i) => (
          <g key={i}>
            <line x1={arrow.x1} y1={arrow.y1} x2={arrow.x2} y2={arrow.y2} stroke={arrow.color} strokeWidth="1.5" markerEnd="url(#arr)" />
            <text x={(arrow.x1 + arrow.x2) / 2} y={arrow.y1 - 3} textAnchor="middle" fontSize="8" fill={arrow.color}>{arrow.label}</text>
          </g>
        ))}
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#666" />
          </marker>
        </defs>
      </svg>

      <div className="exam-cards" style={{ marginTop: "0.25rem" }}>
        <ExamCard q="JWT structure?" a="Header.Payload.Signature — Base64 encoded. Verify with secret key. Never store sensitive data in payload." />
        <ExamCard q="Where to store JWT on client?" a="HttpOnly cookie (safest — immune to XSS). Not localStorage (XSS vulnerable)." />
        <ExamCard q="bcrypt salt rounds?" a="Higher rounds = slower hash = harder to brute force. 10-12 is standard. Each extra round doubles time." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>38</span>
  </div>
));
AuthBcryptB.displayName = "AuthBcryptB";
