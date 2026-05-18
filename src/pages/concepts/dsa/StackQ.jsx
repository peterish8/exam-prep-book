import { forwardRef, useMemo, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

const MATCH = { ")": "(", "}": "{", "]": "[" };
const OPENS = "({[";
const CLOSES = ")}]";
const PRESETS = ["({[]})", "([{}])", "({)}", "((())", "{[()()]}", "[(])"];

const VALID_PARENTHESES_CODE = `function isValid(s) {
  const stack = [];

  for (const ch of s) {
    if (ch === "(" || ch === "{" || ch === "[") {
      stack.push(ch);
      continue;
    }

    const top = stack[stack.length - 1];

    if (
      (ch === ")" && top === "(") ||
      (ch === "}" && top === "{") ||
      (ch === "]" && top === "[")
    ) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
}`;

function buildTrace(expr) {
  const steps = [];
  const stack = [];

  for (let index = 0; index < expr.length; index += 1) {
    const char = expr[index];

    if (OPENS.includes(char)) {
      stack.push(char);
      steps.push({
        index,
        char,
        action: "push",
        stackBefore: stack.slice(0, -1),
        stackAfter: [...stack],
        ok: true,
        note: `Open bracket "${char}" goes onto the stack.`,
        reason: `It must wait for a matching closer later.`,
      });
      continue;
    }

    if (CLOSES.includes(char)) {
      const expected = MATCH[char];
      const top = stack[stack.length - 1];
      const matched = top === expected;

      if (matched) {
        const before = [...stack];
        stack.pop();
        steps.push({
          index,
          char,
          action: "pop",
          stackBefore: before,
          stackAfter: [...stack],
          ok: true,
          note: `Close bracket "${char}" matches top "${top}".`,
          reason: `So we pop "${top}" and continue.`,
        });
      } else {
        steps.push({
          index,
          char,
          action: "mismatch",
          stackBefore: [...stack],
          stackAfter: [...stack],
          ok: false,
          note: `Close bracket "${char}" does not match the top.`,
          reason: `It needed "${expected}" but the stack top is "${top ?? "empty"}".`,
        });
        return { steps, valid: false };
      }
      continue;
    }

    steps.push({
      index,
      char,
      action: "skip",
      stackBefore: [...stack],
      stackAfter: [...stack],
      ok: true,
      note: `Character "${char}" is ignored.`,
      reason: `Only brackets affect this algorithm.`,
    });
  }

  if (stack.length > 0) {
    steps.push({
      index: expr.length,
      char: "END",
      action: "leftover",
      stackBefore: [...stack],
      stackAfter: [...stack],
      ok: false,
      note: "The string ended but the stack is not empty.",
      reason: `These open brackets never got closed: ${stack.join(" ")}`,
    });
    return { steps, valid: false };
  }

  steps.push({
    index: expr.length,
    char: "END",
    action: "done",
    stackBefore: [],
    stackAfter: [],
    ok: true,
    note: "The string ended and the stack is empty.",
    reason: "That means every opening bracket found its correct closing bracket.",
  });

  return { steps, valid: true };
}

export const StackQA = forwardRef((props, ref) => {
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const push = (val) => {
    if (!val.trim()) return;
    const clean = val.trim();
    setStack((s) => [...s, clean]);
    setInput("");
    setMsg(`Pushed "${clean}" onto the top of the stack.`);
  };

  const pop = () => {
    if (!stack.length) {
      setMsg("Stack is empty, so there is nothing to pop.");
      return;
    }
    const top = stack[stack.length - 1];
    setStack((s) => s.slice(0, -1));
    setMsg(`Popped "${top}" from the top.`);
  };

  const peek = () => {
    if (!stack.length) {
      setMsg("Stack is empty right now.");
      return;
    }
    setMsg(`Top element is "${stack[stack.length - 1]}".`);
  };

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#e63946" }}>DSA</div>
        <h2 className="concept-title">Stack & Valid Parentheses</h2>

        <p className="concept-def">
          A <strong>stack</strong> works like a pile of plates. You always add and remove from the top, so the last item entered is the first one to leave.
        </p>
        <ul className="fact-list">
          <li><strong>LIFO:</strong> Last In, First Out</li>
          <li><strong>Push:</strong> put a new item on top</li>
          <li><strong>Pop:</strong> remove the current top item</li>
          <li><strong>Peek:</strong> read the top without removing it</li>
        </ul>
        <p className="concept-def">
          That reverse-order behavior is exactly why stacks solve <strong>Valid Parentheses</strong>. The most recent open bracket must close first.
        </p>

        <p className="concept-formula">push O(1) · pop O(1) · peek O(1) · search O(n)</p>

        <h3 className="concept-subtitle">Core Stack Operations</h3>
        <div className="stack-viz">
          <div className="stack-tower">
            {stack.length === 0 && <div className="stack-empty">empty</div>}
            {[...stack].reverse().map((item, i) => (
              <div key={i} className={`stack-item ${i === 0 ? "stack-item--top" : ""}`}>
                {i === 0 && <span className="stack-top-label">TOP</span>}
                {item}
              </div>
            ))}
          </div>
          <div className="stack-controls">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && push(input)}
              placeholder="type value"
              className="stack-input"
            />
            <button onClick={() => push(input)} className="run-btn">Push</button>
            <button onClick={pop} className="run-btn">Pop</button>
            <button onClick={peek} className="reset-btn">Peek</button>
          </div>
        </div>
        {msg && <div className="stack-msg" style={{ marginTop: "0.3rem" }}>{msg}</div>}

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Valid Parentheses Algorithm</h3>
        <p className="concept-def">
          Scan from left to right. Push every opening bracket, and whenever a closing bracket appears, compare it with the current top of the stack.
        </p>
        <ul className="fact-list">
          <li><strong>Open bracket:</strong> push it because it still needs a partner</li>
          <li><strong>Closing bracket:</strong> it must match the latest unmatched open bracket</li>
          <li><strong>Mismatch:</strong> return false immediately</li>
          <li><strong>Final rule:</strong> stack must be empty at the end</li>
        </ul>

        <SyntaxBlock
          code={VALID_PARENTHESES_CODE}
          language="javascript"
          showLineNumbers={true}
          title="valid-parentheses.js"
        />
      </div>
      <span className="page-number" style={{ left: "1rem" }}>12</span>
    </div>
  );
});
StackQA.displayName = "StackQA";

export const StackQB = forwardRef((props, ref) => {
  const [expr, setExpr] = useState("({[]})");
  const [stepIdx, setStepIdx] = useState(-1);
  const [started, setStarted] = useState(false);

  const { steps, valid } = useMemo(() => buildTrace(expr), [expr]);
  const totalSteps = steps.length;
  const cur = stepIdx >= 0 ? steps[stepIdx] : null;
  const visitedCount = cur && cur.char !== "END" ? cur.index + 1 : stepIdx >= 0 ? expr.length : 0;

  const start = () => {
    if (!steps.length) return;
    setStepIdx(0);
    setStarted(true);
  };
  const reset = () => {
    setStepIdx(-1);
    setStarted(false);
  };
  const next = () => {
    if (stepIdx < totalSteps - 1) setStepIdx((i) => i + 1);
  };
  const prev = () => {
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  };

  const currentStack = cur ? cur.stackAfter : [];
  const actionLabel = cur ? cur.action.toUpperCase() : "READY";

  return (
    <div ref={ref} className="book-page concept-page concept-page--right">
      <div className="page-inner">
        <h3 className="concept-subtitle">Interactive Dry Run - Valid Parentheses</h3>
        <p className="concept-def">
          This dry run shows the exact thought process of the algorithm. Move one step at a time and watch the <strong>current character</strong>, the <strong>action</strong>, and the <strong>stack</strong> change together.
        </p>
        <ul className="fact-list">
          <li><strong>Push:</strong> when we meet <code>(</code>, <code>{"{"}</code>, or <code>[</code></li>
          <li><strong>Pop:</strong> when a correct closing bracket arrives</li>
          <li><strong>Mismatch:</strong> wrong closer or empty stack</li>
          <li><strong>Valid:</strong> every character is processed and stack ends empty</li>
        </ul>

        <div className="stack-preset-row">
          {PRESETS.map((sample) => (
            <button
              key={sample}
              className={`bigo-btn ${expr === sample ? "bigo-btn--on" : ""}`}
              style={{ "--c": "#e63946" }}
              onClick={() => {
                setExpr(sample);
                reset();
              }}
            >
              {sample}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.55rem", alignItems: "center" }}>
          <input
            value={expr}
            onChange={(e) => {
              setExpr(e.target.value);
              reset();
            }}
            className="stack-input stack-input--wide"
            placeholder="e.g. ({[]}) or ({)}"
          />
          {!started ? (
            <button className="run-btn" onClick={start}>Start</button>
          ) : (
            <button className="reset-btn" onClick={reset}>Reset</button>
          )}
        </div>

        <div className="stack-char-strip">
          {expr.split("").map((ch, i) => {
            const isActive = started && cur && cur.char !== "END" && cur.index === i;
            const isPast = started && i < visitedCount;
            return (
              <div
                key={`${ch}-${i}`}
                className={`stack-char-cell ${isActive ? "stack-char-cell--active" : ""} ${isPast ? "stack-char-cell--past" : ""}`}
              >
                <span className="stack-char-cell__index">{i}</span>
                <span>{ch}</span>
              </div>
            );
          })}
        </div>

        <div className="stack-dryrun-grid">
          <div className="stack-dryrun-card">
            <div className="stack-dryrun-card__label">Current Step</div>
            <div className="stack-dryrun-status">
              <span className="stack-action-badge">{actionLabel}</span>
              {cur && cur.char !== "END" && <span className="stack-current-char">char: {cur.char}</span>}
              {cur && cur.char === "END" && <span className="stack-current-char">end of string</span>}
            </div>
            <div className="stack-dryrun-note">
              {cur ? cur.note : "Press Start to begin the algorithm."}
            </div>
            <div className="stack-dryrun-reason">
              {cur ? cur.reason : "We will process one character at a time from left to right."}
            </div>
          </div>

          <div className="stack-dryrun-card">
            <div className="stack-dryrun-card__label">Stack State</div>
            <div className="stack-mini-tower">
              {currentStack.length === 0 && <div className="stack-empty">empty</div>}
              {[...currentStack].reverse().map((item, i) => (
                <div key={`${item}-${i}`} className={`stack-mini-item ${i === 0 ? "stack-mini-item--top" : ""}`}>
                  {i === 0 ? `TOP -> ${item}` : item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {started && (
          <div className="stepper-btns" style={{ marginBottom: "0.45rem" }}>
            <button onClick={prev} disabled={stepIdx <= 0}>Prev</button>
            <span className="step-label">{stepIdx + 1}/{totalSteps}</span>
            <button onClick={next} disabled={stepIdx >= totalSteps - 1}>Next</button>
            {stepIdx === totalSteps - 1 && (
              <div className={`validity-badge ${valid ? "valid" : "invalid"}`}>
                {valid ? "VALID" : "INVALID"}
              </div>
            )}
          </div>
        )}

        {started && (
          <div className="stack-trace-table-wrap">
            <table className="stack-trace-table">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Char</th>
                  <th>Action</th>
                  <th>Stack After</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((s, i) => (
                  <tr key={`${s.char}-${i}`} className={i === stepIdx ? "stack-trace-table__row--active" : ""}>
                    <td>{i + 1}</td>
                    <td>{s.char}</td>
                    <td>{s.action}</td>
                    <td>{s.stackAfter.length ? s.stackAfter.join(" ") : "empty"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="exam-cards">
          <ExamCard
            q="Why use a stack for bracket matching?"
            a="Because brackets close in reverse order of opening. The latest unmatched open bracket must be checked first, and that is exactly what a stack does."
          />
          <ExamCard
            q="When is the string valid?"
            a="Only when every closing bracket matches correctly and the stack is empty after the last character."
          />
        </div>
      </div>
      <span className="page-number" style={{ right: "1rem" }}>13</span>
    </div>
  );
});
StackQB.displayName = "StackQB";
