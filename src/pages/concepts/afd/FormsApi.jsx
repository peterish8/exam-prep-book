import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

export const FormsApiA = forwardRef((props, ref) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Enter valid email";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (!Object.keys(e).length) setSubmitted(true);
  };

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">Forms & Validation</h2>
        <p className="concept-def">
          A <strong>controlled component</strong> binds an input&apos;s <code>value</code> to React state and updates it on every keystroke via <code>onChange</code>. React becomes the single source of truth.
        </p>

        {submitted ? (
          <div className="jsx-output" style={{ background: "#064e3b", borderColor: "#16a34a" }}>
            ✅ Submitted! Name: <strong>{form.name}</strong>, Email: <strong>{form.email}</strong>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="live-form">
            <div className="form-field">
              <label>Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={`stack-input ${errors.name ? "input--error" : ""}`} placeholder="Your name" />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
            <div className="form-field">
              <label>Email</label>
              <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={`stack-input ${errors.email ? "input--error" : ""}`} placeholder="you@example.com" />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
            <button type="submit" className="run-btn" style={{ marginTop: "0.5rem" }}>Submit</button>
          </form>
        )}
        {submitted && <button className="reset-btn" onClick={() => { setSubmitted(false); setForm({ name: "", email: "" }); }}>Reset</button>}

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Controlled vs Uncontrolled Inputs</h3>
        <ul className="fact-list">
          <li><strong>Controlled:</strong> value tied to state via <code>onChange</code> — React always knows the value</li>
          <li><strong>Uncontrolled:</strong> DOM owns the value; read it on submit via <code>useRef</code></li>
          <li><strong>Use controlled:</strong> real-time validation, derived state, conditional submit button</li>
          <li><strong>Use uncontrolled:</strong> file inputs, or integrating with non-React DOM libraries</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>28</span>
    </div>
  );
});
FormsApiA.displayName = "FormsApiA";

export const FormsApiB = forwardRef((props, ref) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);

  const mockFetch = () => {
    setStatus("loading"); setData(null);
    setTimeout(() => {
      setStatus("success");
      setData({ id: 1, name: "Nithy", role: "Developer" });
    }, 1200);
  };

  return (
      <div ref={ref} className="book-page concept-page concept-page--right">
      <div className="page-inner">
        <h3 className="concept-subtitle">API Fetch / Axios Demo</h3>
        <SyntaxBlock language="javascript" title="fetch-user.js" code={`useEffect(() => {
  setLoading(true);
  fetch('/api/user')
    .then(r => r.json())
    .then(data => setData(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
}, []);`} />

        <div className="live-demo" style={{ marginTop: "0.5rem" }}>
          <div className="live-demo__label">Simulated Fetch</div>
          <button className="run-btn" onClick={mockFetch} disabled={status === "loading"}>
            {status === "loading" ? "⏳ Fetching…" : "▶ Fetch User"}
          </button>
          {status === "success" && data && (
            <div className="jsx-output" style={{ marginTop: "0.4rem", fontFamily: "monospace", fontSize: "0.8rem" }}>
              {JSON.stringify(data, null, 2)}
            </div>
          )}
        </div>

        <div className="exam-cards" style={{ marginTop: "0.75rem" }}>
          <ExamCard q="fetch vs Axios?" a="fetch: built-in browser API. Axios: library — auto JSON parse, request cancellation, interceptors, better error handling." />
          <ExamCard q="How to handle errors in fetch?" a="fetch only rejects on network error. Must check response.ok or response.status manually. Axios throws on 4xx/5xx." />
          <ExamCard q="What does e.preventDefault() do in form?" a="Stops the default browser submit (page reload). Lets React handle the submission instead." />
        </div>
      </div>
      <span className="page-number" style={{ right: "1rem" }}>29</span>
    </div>
  );
});
FormsApiB.displayName = "FormsApiB";
