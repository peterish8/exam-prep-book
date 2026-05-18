import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

export const NumpyVectorsA = forwardRef((props, ref) => {
  const [a, setA] = useState([1, 2, 3]);
  const [b, setB] = useState([4, 5, 6]);
  const [op, setOp] = useState("add");

  const ops = {
    add: { label: "a + b", fn: (x, y) => x + y, color: "#16a34a" },
    mul: { label: "a * b", fn: (x, y) => x * y, color: "#f59e0b" },
    dot: { label: "dot(a, b)", fn: null, color: "#2563eb", title: "Dot Product" },
  };

  const result = op === "dot"
    ? [a.reduce((sum, x, i) => sum + x * b[i], 0)]
    : a.map((x, i) => ops[op].fn(x, b[i]));

  const updateA = (i, v) => { const arr = [...a]; arr[i] = +v || 0; setA(arr); };
  const updateB = (i, v) => { const arr = [...b]; arr[i] = +v || 0; setB(arr); };

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#16a34a" }}>FOML</div>
        <h2 className="concept-title">NumPy & Vectors</h2>
        <p className="concept-def">
          Imagine you have two lists of a million numbers and you want to add them element-by-element. In plain Python, you'd write a loop — and Python's loop overhead runs that million times. NumPy sidesteps this entirely: its arrays are stored as contiguous blocks of memory, and operations are dispatched to optimised C and Fortran routines that run on the whole array at once. This is called <strong>vectorization</strong> — you describe what to compute, not how to iterate. The speedup is often 100x or more. Try the calculator below: edit the vectors and switch between add, multiply, and dot product.
        </p>

        <div className="live-demo">
          <div className="live-demo__label">Vector Calculator</div>
          <div className="vec-row">
            <span className="vec-label">a =</span>
            {a.map((v, i) => (
              <input key={i} type="number" value={v} onChange={e => updateA(i, e.target.value)}
                className="vec-input" />
            ))}
          </div>
          <div className="vec-row" style={{ marginTop: "0.4rem" }}>
            <span className="vec-label">b =</span>
            {b.map((v, i) => (
              <input key={i} type="number" value={v} onChange={e => updateB(i, e.target.value)}
                className="vec-input" />
            ))}
          </div>
          <div className="bigo-toggles vec-toggles" style={{ margin: "0.5rem 0" }}>
            {Object.entries(ops).map(([k, v]) => (
              <button key={k} className={`bigo-btn ${op === k ? "bigo-btn--on" : ""}`}
                style={{ "--c": v.color }} onClick={() => setOp(k)}>
                {v.label}
              </button>
            ))}
          </div>
          <div className={`vec-result${op === "dot" ? " vec-result--dot" : ""}`}>
            <div className="vec-result__meta">
              <span className="vec-result__title" style={{ color: ops[op].color }}>
                {op === "dot" ? ops[op].title : ops[op].label}
              </span>
              <span className="vec-result__expr">
                {ops[op].label} =
              </span>
            </div>
            <span className="vec-result__value">
              {op === "dot" ? result[0] : `[${result.join(", ")}]`}
            </span>
          </div>
        </div>

        <SyntaxBlock language="python" title="vector-ops.py" code={`import numpy as np
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a + b)       # [5 7 9]
print(a * b)       # [4 10 18]
print(np.dot(a,b)) # 32`} />

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Broadcasting Rules</h3>
        <p className="concept-def">
          Broadcasting is NumPy's way of making mismatched shapes work together without copying data. Imagine adding a single number to every element of a million-row array — instead of creating a million-element copy of that number, NumPy <em>pretends</em> it's already the right shape and computes on the fly. The rules are: if two arrays have different numbers of dimensions, NumPy prepends 1s to the smaller shape — so a shape (3,) becomes (1, 3). Then any dimension that is size 1 gets "stretched" to match the other array. So shape (3, 1) plus shape (1, 4) both broadcast up to (3, 4), giving a full 3×4 result grid — with zero extra memory for the expansion.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>40</span>
    </div>
  );
});
NumpyVectorsA.displayName = "NumpyVectorsA";

export const NumpyVectorsB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
      <div className="page-inner">
        <h3 className="concept-subtitle">NumPy Cheatsheet</h3>
      <SyntaxBlock language="python" title="numpy-cheatsheet.py" code={`np.array([1,2,3])          # from list
np.zeros((3,3))            # 3x3 zeros
np.ones((2,4))             # 2x4 ones
np.arange(0, 10, 2)        # [0,2,4,6,8]
np.linspace(0, 1, 5)       # 5 evenly spaced

arr.shape    # (rows, cols)
arr.reshape(2,3)            # change shape
arr[0, 1]    # indexing
arr[:, 1]    # all rows, col 1
arr[arr > 2] # boolean mask

np.mean(arr), np.std(arr)  # stats
np.sum(arr, axis=0)         # col sums`} />

      <h3 className="concept-subtitle" style={{ marginTop: "0.5rem" }}>Matrix Multiplication</h3>
      <svg width="260" height="80" viewBox="0 0 260 80">
        {/* A matrix */}
        <rect x="10" y="10" width="60" height="60" rx="4" fill="#1a2a1a" stroke="#16a34a" />
        <text x="40" y="45" textAnchor="middle" fontSize="12" fill="#86efac">A (m×k)</text>
        <text x="90" y="45" fontSize="20" fill="#666">×</text>
        <rect x="110" y="10" width="60" height="60" rx="4" fill="#1a2a1a" stroke="#16a34a" />
        <text x="140" y="45" textAnchor="middle" fontSize="12" fill="#86efac">B (k×n)</text>
        <text x="180" y="45" fontSize="20" fill="#666">=</text>
        <rect x="200" y="10" width="55" height="60" rx="4" fill="#16a34a" opacity="0.4" stroke="#16a34a" />
        <text x="228" y="45" textAnchor="middle" fontSize="12" fill="#fff">C (m×n)</text>
      </svg>

      <div className="exam-cards">
        <ExamCard q="Vectorization benefit?" a="100x+ faster than Python loops — uses optimised C/Fortran under the hood (BLAS)." />
        <ExamCard q="np.dot vs @ operator?" a="Same result. @ is the matrix multiplication operator (Python 3.5+). np.dot also works on 1D arrays as inner product." />
        <ExamCard q="Broadcasting in NumPy?" a="Automatically expands smaller arrays to match shapes. e.g., (3,1) + (1,4) → (3,4)." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>41</span>
  </div>
));
NumpyVectorsB.displayName = "NumpyVectorsB";
