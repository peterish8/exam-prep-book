import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

function isValid(s) {
  const map = { ')': '(', '}': '{', ']': '[' };
  const stack = [];
  for (const c of s) {
    if ("({[".includes(c)) stack.push(c);
    else if (")}]".includes(c)) {
      if (stack.pop() !== map[c]) return false;
    }
  }
  return stack.length === 0;
}

export const StackQA = forwardRef((props, ref) => {
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const push = (val) => {
    if (!val.trim()) return;
    setStack(s => [...s, val.trim()]);
    setInput("");
    setMsg("");
  };

  const pop = () => {
    if (!stack.length) { setMsg("Stack underflow!"); return; }
    const top = stack[stack.length - 1];
    setStack(s => s.slice(0, -1));
    setMsg(`Popped: ${top}`);
  };

  const peek = () => {
    if (!stack.length) { setMsg("Stack is empty"); return; }
    setMsg(`Peek: ${stack[stack.length - 1]}`);
  };

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#e63946" }}>DSA</div>
        <h2 className="concept-title">Stack</h2>
        <p className="concept-def">
          <strong>LIFO</strong> — Last In First Out. Push adds to top; Pop removes from top.
        </p>
        <p className="concept-formula">Operations: push O(1) · pop O(1) · peek O(1) · search O(n)</p>

        <div className="stack-viz">
          <div className="stack-tower">
            {stack.length === 0 && <div className="stack-empty">empty</div>}
            {[...stack].reverse().map((item, i) => (
              <div key={i} className={`stack-item ${i === 0 ? "stack-item--top" : ""}`}>
                {i === 0 && <span className="stack-top-label">← TOP</span>}
                {item}
              </div>
            ))}
          </div>
          <div className="stack-controls">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && push(input)}
              placeholder="value" className="stack-input" />
            <button onClick={() => push(input)} className="run-btn">Push</button>
            <button onClick={pop} className="run-btn">Pop</button>
            <button onClick={peek} className="reset-btn">Peek</button>
            {msg && <div className="stack-msg">{msg}</div>}
          </div>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Real Use Cases</h3>
        <ul className="fact-list">
          <li><strong>Bracket matching:</strong> push open brackets; on closing bracket, pop and check if pair matches.</li>
          <li><strong>Undo/Redo:</strong> each action pushed; Ctrl-Z pops the last action.</li>
          <li><strong>Function call stack:</strong> each function call is a frame — return pops it.</li>
          <li><strong>Expression evaluation:</strong> convert infix to postfix using a stack (Shunting-yard algorithm).</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>11</span>
    </div>
  );
});
StackQA.displayName = "StackQA";

export const StackQB = forwardRef((props, ref) => {
  const [expr, setExpr] = useState("({[]})");
  const valid = isValid(expr);

  const trace = [];
  const map2 = { ')': '(', '}': '{', ']': '[' };
  const st = [];
  for (const c of expr) {
    if ("({[".includes(c)) { st.push(c); trace.push({ char: c, stack: [...st], ok: true }); }
    else if (")}]".includes(c)) {
      const ok = st[st.length - 1] === map2[c];
      if (ok) st.pop(); else st.push("✗");
      trace.push({ char: c, stack: [...st], ok });
    }
  }

  return (
    <div ref={ref} className="book-page concept-page concept-page--right">
      <div className="page-inner">
        <h3 className="concept-subtitle">Valid Parentheses Checker</h3>
        <p className="concept-def" style={{ fontSize: "0.8rem" }}>
          Push open brackets; on close bracket, pop and check match.
        </p>
        <input
          value={expr}
          onChange={e => setExpr(e.target.value)}
          className="stack-input"
          style={{ width: "100%", marginBottom: "0.5rem" }}
          placeholder="Try: ({[]}) or ({)"
        />
        <div className={`validity-badge ${valid ? "valid" : "invalid"}`}>
          {valid ? "✅ VALID" : "❌ INVALID"}
        </div>
        <div className="trace-list">
          {trace.map((t, i) => (
            <div key={i} className={`trace-row ${t.ok ? "" : "trace-row--bad"}`}>
              <span className="trace-char">{t.char}</span>
              <span className="trace-stack">[{t.stack.join(",")}]</span>
            </div>
          ))}
        </div>
        <div className="exam-cards">
          <ExamCard q="Stack vs Queue?" a="Stack = LIFO (push/pop top). Queue = FIFO (enqueue back, dequeue front)." />
          <ExamCard q="Use cases of stack?" a="Function call stack, undo operations, valid parentheses, expression evaluation." />
        </div>
      </div>
      <span className="page-number" style={{ right: "1rem" }}>12</span>
    </div>
  );
});
StackQB.displayName = "StackQB";
