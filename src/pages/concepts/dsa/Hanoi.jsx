import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

function solveHanoi(n, from, to, via, moves = []) {
  if (n === 0) return moves;
  solveHanoi(n - 1, from, via, to, moves);
  moves.push({ disk: n, from, to });
  solveHanoi(n - 1, via, to, from, moves);
  return moves;
}

const ROD_NAMES = ["A", "B", "C"];
const COLORS = ["#e63946", "#f59e0b", "#2563eb"];

function HanoiViz({ rods }) {
  const maxDisks = 4;
  return (
    <svg width="300" height="160" viewBox="0 0 300 160">
      {ROD_NAMES.map((name, ri) => {
        const cx = 50 + ri * 100;
        return (
          <g key={name}>
            <rect x={cx - 3} y={20} width={6} height={110} rx={3} fill="#555" />
            <text x={cx} y={145} textAnchor="middle" fontSize="12" fill="#888">{name}</text>
            {rods[name].map((disk, di) => {
              const w = 14 + disk * 18;
              const y = 125 - (di + 1) * 22;
              return (
                <rect key={di} x={cx - w / 2} y={y} width={w} height={18} rx={4}
                  fill={COLORS[(disk - 1) % COLORS.length]} />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

export const HanoiA = forwardRef((props, ref) => {
  const [disks, setDisks] = useState(3);
  const moves = solveHanoi(disks, "A", "C", "B");
  const [step, setStep] = useState(0);

  const getRods = (upToStep) => {
    const rods = { A: Array.from({ length: disks }, (_, i) => disks - i), B: [], C: [] };
    for (let i = 0; i < upToStep; i++) {
      const { disk, from, to } = moves[i];
      rods[to].push(rods[from].pop());
    }
    return rods;
  };

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#e63946" }}>DSA</div>
        <h2 className="concept-title">Tower of Hanoi</h2>
        <p className="concept-def">
          Move all disks A→C using peg B as helper. One iron rule: never place a <strong>larger disk on a smaller one</strong>.
        </p>
        <ul className="fact-list">
          <li><strong>Rule:</strong> only move one disk at a time, never larger onto smaller</li>
          <li><strong>Recurrence:</strong> T(n) = 2·T(n−1) + 1</li>
          <li><strong>Solves to:</strong> exactly 2ⁿ − 1 moves — not one move can be skipped</li>
          <li><strong>Complexity:</strong> O(2ⁿ) — exponential growth</li>
        </ul>
        <p className="concept-formula">Moves = 2ⁿ − 1&nbsp;&nbsp;|&nbsp;&nbsp;Time: O(2ⁿ)</p>

        <HanoiViz rods={getRods(step)} />

        <div className="stepper-btns">
          <button onClick={() => setStep(0)}>⏮</button>
          <button disabled={step === 0} onClick={() => setStep(s => s - 1)}>←</button>
          <span className="step-label">
            {step === 0 ? "Start" : `Move ${step}: disk ${moves[step - 1].disk} · ${moves[step - 1].from}→${moves[step - 1].to}`}
            &nbsp;({moves.length} total)
          </span>
          <button disabled={step === moves.length} onClick={() => setStep(s => s + 1)}>→</button>
          <button onClick={() => setStep(moves.length)}>⏭</button>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "#888" }}>Disks:</span>
          {[2, 3, 4].map(n => (
            <button key={n} className={`bigo-btn ${disks === n ? "bigo-btn--on" : ""}`}
              style={{ "--c": "#e63946" }} onClick={() => { setDisks(n); setStep(0); }}>
              {n}
            </button>
          ))}
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Why It&apos;s Exponential</h3>
        <p className="concept-def">
          To move the bottom disk A→C, you must first move all n−1 disks to peg B. Then move the big disk. Then move all n−1 disks again B→C.
        </p>
        <p className="concept-def">
          Each added disk doubles the work: T(n) = 2·T(n−1) + 1, which gives <strong>2ⁿ − 1</strong> moves total.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>10</span>
    </div>
  );
});
HanoiA.displayName = "HanoiA";

export const HanoiB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Recursive Algorithm</h3>
      <SyntaxBlock language="python" title="hanoi.py" code={`hanoi(n, from, to, via):
  if n == 1:
    move disk 1 from→to
    return
  hanoi(n-1, from, via, to)  // move n-1 to helper
  move disk n from→to         // move largest
  hanoi(n-1, via, to, from)  // move n-1 to dest`} />

      <h3 className="concept-subtitle" style={{ marginTop: "1rem" }}>Key Facts</h3>
      <ul className="fact-list">
        <li>3 disks → <strong>7 moves</strong>; 4 disks → <strong>15 moves</strong></li>
        <li>Each move is: <em>move top disk of from peg to to peg</em></li>
        <li>Always valid because algorithm ensures order</li>
      </ul>

      <div className="exam-cards">
        <ExamCard
          q="How many moves for n disks?"
          a="2ⁿ − 1. For n=10 that is 1023 moves."
        />
        <ExamCard
          q="Why is Tower of Hanoi O(2ⁿ)?"
          a="T(n) = 2T(n-1) + 1 which solves to T(n) = 2ⁿ − 1."
        />
        <ExamCard
          q="How many recursive calls for n=3?"
          a="14 recursive calls — the tree has depth n with branching factor 2."
        />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>11</span>
  </div>
));
HanoiB.displayName = "HanoiB";
