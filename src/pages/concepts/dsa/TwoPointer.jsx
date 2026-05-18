import { forwardRef, useMemo, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import HighlightText from "../../../components/HighlightText";

const ARRAY = [1, 3, 5, 7, 9, 11, 13, 15];
const TARGET = 16;

const SW_ARRAY = [2, 1, 5, 1, 3, 2];
const K = 3;

export const TwoPointerA = forwardRef((props, ref) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(ARRAY.length - 1);
  const [found, setFound] = useState(null);

  const step = () => {
    if (found !== null || left >= right) return;
    const sum = ARRAY[left] + ARRAY[right];

    if (sum === TARGET) {
      setFound([left, right]);
      return;
    }

    if (sum < TARGET) setLeft((value) => value + 1);
    else setRight((value) => value - 1);
  };

  const reset = () => {
    setLeft(0);
    setRight(ARRAY.length - 1);
    setFound(null);
  };

  const sum = ARRAY[left] + ARRAY[right];

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#e63946" }}>
          DSA
        </div>
        <h2 className="concept-title">Two-Pointer & Sliding Window</h2>
        <p className="concept-def">
          <HighlightText>Two pointers</HighlightText> work like two hands closing
          in on the answer. On a sorted array, that lets us avoid the slow
          <HighlightText tone="rose">O(n^2)</HighlightText> brute-force check.
        </p>
        <ul className="fact-list">
          <li>
            <HighlightText>Left pointer:</HighlightText> starts at the smallest
            value
          </li>
          <li>
            <HighlightText>Right pointer:</HighlightText> starts at the largest
            value
          </li>
          <li>
            <HighlightText>Small sum:</HighlightText> move left rightward
          </li>
          <li>
            <HighlightText>Large sum:</HighlightText> move right leftward
          </li>
        </ul>
        <p className="concept-formula">
          Problem: find a pair with sum <HighlightText>{TARGET}</HighlightText>
        </p>

        <div className="array-viz">
          {ARRAY.map((value, index) => (
            <div
              key={index}
              className={`array-cell
              ${index === left ? "cell--left" : ""}
              ${index === right ? "cell--right" : ""}
              ${found && (index === found[0] || index === found[1]) ? "cell--found" : ""}`}
            >
              {value}
              {index === left && <span className="ptr-label">L</span>}
              {index === right && <span className="ptr-label">R</span>}
            </div>
          ))}
        </div>

        <div className="sum-display">
          {found ? (
            <span className="found-msg">
              Found: {ARRAY[found[0]]} + {ARRAY[found[1]]} = {TARGET}
            </span>
          ) : left >= right ? (
            <span className="not-found-msg">No valid pair found</span>
          ) : (
            <span>
              {ARRAY[left]} + {ARRAY[right]} = {sum}{" "}
              {sum < TARGET ? "-> move L" : "-> move R"}
            </span>
          )}
        </div>

        <div className="stepper-btns">
          <button
            onClick={step}
            disabled={found !== null || left >= right}
            className="run-btn"
          >
            Step
          </button>
          <button onClick={reset} className="reset-btn">
            Reset
          </button>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>
          Two Pointer vs Sliding Window
        </h3>
        <ul className="fact-list">
          <li>
            <HighlightText>Two Pointer:</HighlightText> best for pairs,
            palindromes, and sorted arrays
          </li>
          <li>
            <HighlightText>Sliding Window:</HighlightText> best for
            subarray/substring ranges
          </li>
          <li>
            <HighlightText>Shared win:</HighlightText> both usually cut the work
            to <HighlightText tone="mint">O(n)</HighlightText>
          </li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>
        15
      </span>
    </div>
  );
});
TwoPointerA.displayName = "TwoPointerA";

export const TwoPointerB = forwardRef((props, ref) => {
  const [winStart, setWinStart] = useState(0);
  const maxStart = SW_ARRAY.length - K;

  const windows = useMemo(
    () =>
      Array.from({ length: maxStart + 1 }, (_, start) => {
        const values = SW_ARRAY.slice(start, start + K);
        const sum = values.reduce((total, current) => total + current, 0);
        return { start, end: start + K - 1, values, sum };
      }),
    [maxStart]
  );

  const activeWindow = windows[winStart];
  const bestWindow = windows.reduce((best, current) =>
    current.sum > best.sum ? current : best
  );

  const setClampedWindow = (nextValue) => {
    const safeValue = Math.max(0, Math.min(maxStart, nextValue));
    setWinStart(safeValue);
  };

  return (
    <div ref={ref} className="book-page concept-page concept-page--right">
      <div className="page-inner">
        <h3 className="concept-subtitle">Sliding Window</h3>
        <p className="concept-def">
          A <HighlightText>sliding window</HighlightText> reuses the old work.
          Instead of recalculating every range from scratch, we drop one value
          and add one new value.
        </p>
        <ul className="fact-list">
          <li>
            <HighlightText>Window size:</HighlightText> fixed at {K}
          </li>
          <li>
            <HighlightText>Expand right:</HighlightText> include the next element
          </li>
          <li>
            <HighlightText>Shrink left:</HighlightText> remove the outgoing element
          </li>
          <li>
            <HighlightText>Goal:</HighlightText> track the best sum in one pass
          </li>
        </ul>

        <div className="window-panel">
          <div className="window-panel__top">
            <div className="window-panel__intro">
              <div className="live-demo__label">Interactive Dry Run</div>
              <div className="window-panel__title">
                Max sum of subarray with size {K}
              </div>
            </div>
            <div className="window-status">
              <span className="window-status__label">Active window</span>
              <span className="window-status__value">
                [{activeWindow.start}..{activeWindow.end}]
              </span>
            </div>
          </div>

          <div className="array-viz window-array">
            {SW_ARRAY.map((value, index) => (
              <div
                key={index}
                className={`array-cell ${
                  index >= activeWindow.start && index <= activeWindow.end
                    ? "cell--window"
                    : ""
                } ${index === activeWindow.start ? "cell--window-start" : ""} ${
                  index === activeWindow.end ? "cell--window-end" : ""
                }`}
              >
                <span>{value}</span>
                <small className="window-array__index">{index}</small>
              </div>
            ))}
          </div>

          <div className="window-chip-row">
            {activeWindow.values.map((value, index) => (
              <span key={`${value}-${index}`} className="window-chip">
                {value}
              </span>
            ))}
          </div>

          <div className="window-stats">
            <div className="window-stat window-stat--primary">
              <span className="window-stat__label">Current sum</span>
              <strong className="window-stat__value">{activeWindow.sum}</strong>
            </div>
            <div className="window-stat">
              <span className="window-stat__label">Best sum</span>
              <strong className="window-stat__value window-stat__value--good">
                {bestWindow.sum}
              </strong>
            </div>
            <div className="window-stat">
              <span className="window-stat__label">Best range</span>
              <strong className="window-stat__value">
                [{bestWindow.start}..{bestWindow.end}]
              </strong>
            </div>
          </div>

          <div className="window-slider-wrap">
            <div className="window-slider-shell">
              <div className="window-slider__header">
                <span className="window-slider__title">Move the window</span>
                <span className="window-slider__meta">
                  Step {winStart + 1} of {windows.length}
                </span>
              </div>
              <input
                className="window-slider"
                type="range"
                min={0}
                max={maxStart}
                step={1}
                value={winStart}
                onChange={(event) => setClampedWindow(Number(event.target.value))}
                style={{
                  "--window-progress": `${(winStart / maxStart) * 100}%`,
                }}
              />
              <div className="window-slider__scale" aria-hidden="true">
                {windows.map((window) => (
                  <span
                    key={window.start}
                    className={`window-slider__tick ${
                      window.start === winStart ? "window-slider__tick--active" : ""
                    }`}
                  >
                    W{window.start + 1}
                  </span>
                ))}
              </div>
              <div className="window-slider__actions">
                <button
                  className="window-slider__stepbtn"
                  onClick={() => setClampedWindow(winStart - 1)}
                  disabled={winStart === 0}
                  aria-label="Previous window"
                >
                  Prev
                </button>
                <button
                  className="window-slider__stepbtn window-slider__stepbtn--primary"
                  onClick={() => setClampedWindow(winStart + 1)}
                  disabled={winStart === maxStart}
                  aria-label="Next window"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <p className="hint-text">
            Watch how the window moves one slot at a time while the sum updates
            instantly.
          </p>
        </div>

        <p className="concept-def">
          This is why <HighlightText>Sliding Window</HighlightText> feels fast.
          Each move only changes two elements, so the total work stays linear.
        </p>

        <div className="exam-cards" style={{ marginTop: "0.75rem" }}>
          <ExamCard
            q="When to use Two-Pointer?"
            a="Use it on sorted arrays, pair-sum questions, palindrome checks, and in-place reversing."
          />
          <ExamCard
            q="When to use Sliding Window?"
            a="Use it for subarray or substring problems with a fixed or adjustable range."
          />
          <ExamCard
            q="Why is Sliding Window efficient?"
            a="Because each step removes one left value and adds one right value, so the full scan stays O(n)."
          />
        </div>
      </div>
      <span className="page-number" style={{ right: "1rem" }}>
        16
      </span>
    </div>
  );
});
TwoPointerB.displayName = "TwoPointerB";
