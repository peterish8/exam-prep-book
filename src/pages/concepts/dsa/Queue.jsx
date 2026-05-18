import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

export const QueueA = forwardRef((props, ref) => {
  const [queue, setQueue] = useState(["A", "B", "C"]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const enqueue = () => {
    if (!input.trim()) return;
    setQueue(q => [...q, input.trim()]);
    setInput("");
    setMsg(`Enqueued: ${input.trim()}`);
  };

  const dequeue = () => {
    if (!queue.length) { setMsg("Queue is empty!"); return; }
    setMsg(`Dequeued: ${queue[0]}`);
    setQueue(q => q.slice(1));
  };

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#e63946" }}>DSA</div>
        <h2 className="concept-title">Queue</h2>
        <p className="concept-def">
          A queue is like a coffee shop line — first in, first served. That&apos;s <strong>FIFO</strong>: First In, First Out.
        </p>
        <ul className="fact-list">
          <li><strong>Enqueue:</strong> add item to the rear — O(1)</li>
          <li><strong>Dequeue:</strong> remove item from the front — O(1)</li>
          <li><strong>Peek:</strong> read front item without removing — O(1)</li>
          <li><strong>Opposite of Stack:</strong> Stack is LIFO; Queue is FIFO</li>
        </ul>
        <p className="concept-formula">Operations: enqueue O(1) · dequeue O(1) · peek O(1)</p>

        <div className="queue-viz">
          <div className="queue-arrow-label">FRONT →</div>
          <div className="queue-row">
            {queue.length === 0 && <div className="stack-empty">empty</div>}
            {queue.map((item, i) => (
              <div key={i} className={`queue-item ${i === 0 ? "queue-item--front" : ""} ${i === queue.length - 1 ? "queue-item--rear" : ""}`}>
                {item}
              </div>
            ))}
          </div>
          <div className="queue-arrow-label">← REAR</div>
        </div>

        <div className="stack-controls" style={{ marginTop: "0.75rem" }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && enqueue()}
            placeholder="value" className="stack-input" />
          <button onClick={enqueue} className="run-btn">Enqueue</button>
          <button onClick={dequeue} className="run-btn">Dequeue</button>
          {msg && <div className="stack-msg">{msg}</div>}
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "1rem" }}>Types of Queue</h3>
        <ul className="fact-list">
          <li><strong>Simple Queue:</strong> straight line — rear in, front out</li>
          <li><strong>Circular Queue:</strong> rear wraps back to front — reuses empty slots, no waste</li>
          <li><strong>Deque:</strong> double-ended — add or remove from either end</li>
          <li><strong>Priority Queue:</strong> highest-priority item dequeues first, ignoring arrival order</li>
        </ul>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>BFS — Queue in Action</h3>
        <p className="concept-def">
          <strong>Breadth-First Search</strong> uses a queue to explore a graph level by level. Enqueue the start node, then repeatedly dequeue, visit, and enqueue unvisited neighbours.
        </p>
        <p className="concept-def">
          Because the queue preserves arrival order, BFS always visits the closest nodes first — guaranteeing the <strong>shortest path</strong> in an unweighted graph.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>14</span>
    </div>
  );
});
QueueA.displayName = "QueueA";

export const QueueB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Circular Queue Visual</h3>
      <svg width="200" height="200" viewBox="0 0 200 200" style={{ margin: "0 auto", display: "block" }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
          const cx = 100 + 65 * Math.cos(angle);
          const cy = 100 + 65 * Math.sin(angle);
          const filled = i < 4;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={20} fill={filled ? "#e63946" : "#1a1a1a"} stroke="#333" />
              <text x={cx} y={cy + 5} textAnchor="middle" fontSize="11" fill={filled ? "#fff" : "#555"}>
                {filled ? `[${i}]` : "·"}
              </text>
            </g>
          );
        })}
        <text x="100" y="105" textAnchor="middle" fontSize="10" fill="#666">Circular</text>
        <text x="100" y="118" textAnchor="middle" fontSize="10" fill="#666">Queue</text>
      </svg>

      <div className="exam-cards" style={{ marginTop: "0.5rem" }}>
        <ExamCard
          q="Difference: Queue vs Stack?"
          a="Queue removes oldest (front), Stack removes newest (top)."
        />
        <ExamCard
          q="Why use a Circular Queue over Simple Queue?"
          a="Avoids wasted front slots after dequeue — rear pointer wraps using (rear+1) % size."
        />
        <ExamCard
          q="Real-world use of Queue?"
          a="CPU scheduling, printer spooling, BFS traversal, event queues."
        />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>15</span>
  </div>
));
QueueB.displayName = "QueueB";
