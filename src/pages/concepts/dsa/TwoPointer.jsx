import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

const ARRAY = [1, 3, 5, 7, 9, 11, 13, 15];
const TARGET = 16;

export const TwoPointerA = forwardRef((props, ref) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(ARRAY.length - 1);
  const [found, setFound] = useState(null);

  const step = () => {
    if (found !== null || left >= right) return;
    const sum = ARRAY[left] + ARRAY[right];
    if (sum === TARGET) { setFound([left, right]); return; }
    if (sum < TARGET) setLeft(l => l + 1);
    else setRight(r => r - 1);
  };

  const reset = () => { setLeft(0); setRight(ARRAY.length - 1); setFound(null); };

  const sum = ARRAY[left] + ARRAY[right];

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#e63946" }}>DSA</div>
        <h2 className="concept-title">Two-Pointer & Sliding Window</h2>
        <p className="concept-def">
          Two pointers move toward each other (or in same direction) to find pairs/subarrays in <strong>O(n)</strong> instead of O(n²).
        </p>
        <p className="concept-formula">Problem: Find pair summing to {TARGET} in sorted array</p>

        <div className="array-viz">
          {ARRAY.map((v, i) => (
            <div key={i} className={`array-cell
              ${i === left ? "cell--left" : ""}
              ${i === right ? "cell--right" : ""}
              ${found && (i === found[0] || i === found[1]) ? "cell--found" : ""}
            `}>
              {v}
              {i === left && <span className="ptr-label">L</span>}
              {i === right && <span className="ptr-label">R</span>}
            </div>
          ))}
        </div>

        <div className="sum-display">
          {found ? (
            <span className="found-msg">✅ Found! {ARRAY[found[0]]} + {ARRAY[found[1]]} = {TARGET}</span>
          ) : left >= right ? (
            <span className="not-found-msg">❌ Not found</span>
          ) : (
            <span>{ARRAY[left]} + {ARRAY[right]} = {sum} {sum < TARGET ? "< target → move L →" : "> target → ← move R"}</span>
          )}
        </div>

        <div className="stepper-btns">
          <button onClick={step} disabled={found !== null || left >= right} className="run-btn">Step →</button>
          <button onClick={reset} className="reset-btn">↺ Reset</button>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Two Pointer vs Sliding Window</h3>
        <ul className="fact-list">
          <li><strong>Two Pointer:</strong> pointers move toward each other. Use when array is <em>sorted</em> and you need pairs (sum, difference, palindrome check).</li>
          <li><strong>Sliding Window:</strong> a fixed or variable-size window slides forward. Use for subarrays/substrings (max sum, longest without repeat).</li>
          <li><strong>Key difference:</strong> two pointer narrows from both ends; sliding window expands/shrinks from one end.</li>
          <li>Both run in <strong>O(n)</strong> — far better than the O(n²) brute-force nested loop.</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>15</span>
    </div>
  );
});
TwoPointerA.displayName = "TwoPointerA";

const SW_ARRAY = [2, 1, 5, 1, 3, 2];
const K = 3;

export const TwoPointerB = forwardRef((props, ref) => {
  const [winStart, setWinStart] = useState(0);
  const maxStart = SW_ARRAY.length - K;
  const winSum = SW_ARRAY.slice(winStart, winStart + K).reduce((a, b) => a + b, 0);
  const maxSum = Math.max(...Array.from({ length: maxStart + 1 }, (_, i) =>
    SW_ARRAY.slice(i, i + K).reduce((a, b) => a + b, 0)
  ));

  return (
    <div ref={ref} className="book-page concept-page concept-page--right">
      <div className="page-inner">
        <h3 className="concept-subtitle">Sliding Window — max sum of size {K}</h3>
        <div className="array-viz" style={{ marginBottom: "0.5rem" }}>
          {SW_ARRAY.map((v, i) => (
            <div key={i} className={`array-cell ${i >= winStart && i < winStart + K ? "cell--window" : ""}`}>
              {v}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.85rem", color: "#aaa" }}>
          Window [{winStart}..{winStart + K - 1}] → sum = <strong style={{ color: "#f59e0b" }}>{winSum}</strong>
          &nbsp;| max = <strong style={{ color: "#16a34a" }}>{maxSum}</strong>
        </p>
        <input type="range" min={0} max={maxStart} value={winStart}
          onChange={e => setWinStart(+e.target.value)} style={{ width: "100%", margin: "0.5rem 0" }} />
        <p className="hint-text">Drag slider to move window</p>

        <div className="exam-cards" style={{ marginTop: "0.75rem" }}>
          <ExamCard
            q="When to use Two-Pointer?"
            a="Sorted array, finding pairs, reversing, palindrome check. Reduces O(n²) → O(n)."
          />
          <ExamCard
            q="When to use Sliding Window?"
            a="Subarray/substring problems with a fixed or variable window size. Max sum, longest substring without repeat."
          />
          <ExamCard
            q="Complexity of sliding window?"
            a="O(n) time, O(1) extra space — just track window sum, slide by adding right element and removing left."
          />
        </div>
      </div>
      <span className="page-number" style={{ right: "1rem" }}>16</span>
    </div>
  );
});
TwoPointerB.displayName = "TwoPointerB";
