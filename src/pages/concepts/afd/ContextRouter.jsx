import { forwardRef, useState, createContext, useContext } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

const ThemeCtx = createContext("light");

function ThemedBox() {
  const theme = useContext(ThemeCtx);
  return (
    <div
      style={{
        background: theme === "dark" ? "#1e1e2e" : "#f0f9ff",
        color: theme === "dark" ? "#e2e8f0" : "#1e3a5f",
        border: `1px solid ${theme === "dark" ? "#334155" : "#93c5fd"}`,
        borderRadius: "6px",
        padding: "0.5rem",
        marginTop: "0.5rem",
        fontSize: "0.8rem",
      }}
    >
      Theme from Context: <strong>{theme}</strong>
    </div>
  );
}

export const ContextRouterA = forwardRef((props, ref) => {
  const [theme, setTheme] = useState("light");

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">Context API</h2>
        <p className="concept-def">
          <strong>Context API</strong> is React&apos;s shortcut for shared data. It helps when passing the same value through many layers becomes annoying.
        </p>
        <ul className="fact-list">
          <li><strong>Props drilling:</strong> forwarding data through components that do not need it</li>
          <li><strong>Provider:</strong> places the shared value at the top of a subtree</li>
          <li><strong>useContext:</strong> reads that value in any descendant</li>
          <li><strong>Best for:</strong> theme, auth user, language, cart</li>
        </ul>
        <p className="concept-def">
          The pattern is simple: create context, wrap with a provider, then read it where needed.
        </p>

        <SyntaxBlock language="jsx" title="context-demo.jsx" code={`// 1. Create context
const ThemeCtx = createContext("light");

// 2. Wrap with Provider
<ThemeCtx.Provider value={theme}>
  <App />
</ThemeCtx.Provider>

// 3. Consume anywhere
const theme = useContext(ThemeCtx);`} />

        <div className="live-demo" style={{ marginTop: "0.5rem" }}>
          <div className="live-demo__label">Live Context Demo</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className={`bigo-btn ${theme === "light" ? "bigo-btn--on" : ""}`}
              style={{ "--c": "#2563eb" }}
              onClick={() => setTheme("light")}
            >
              Light
            </button>
            <button
              className={`bigo-btn ${theme === "dark" ? "bigo-btn--on" : ""}`}
              style={{ "--c": "#2563eb" }}
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
          </div>
          <ThemeCtx.Provider value={theme}>
            <ThemedBox />
          </ThemeCtx.Provider>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Context vs Props</h3>
        <p className="concept-def">
          <strong>Props</strong> are still best when data only moves one or two levels. They stay explicit and easy to trace.
        </p>
        <p className="concept-def">
          Use <strong>Context</strong> when one value is needed in many distant places. Be careful: every consumer re-renders when that value changes.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>30</span>
    </div>
  );
});
ContextRouterA.displayName = "ContextRouterA";

export const ContextRouterB = forwardRef((props, ref) => {
  const [route, setRoute] = useState("home");
  const routes = {
    home: "Home Page Content",
    about: "About Page Content",
    contact: "Contact Page Content",
  };

  return (
    <div ref={ref} className="book-page concept-page concept-page--right">
      <div className="page-inner">
        <h3 className="concept-subtitle">React Router v6</h3>
        <SyntaxBlock language="jsx" title="main.jsx" code={`// main.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/user/:id" element={<User />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

// Navigate: <Link to="/about">About</Link>
// useNavigate() for programmatic nav
// useParams() to get :id from URL`} />

        <div className="live-demo" style={{ marginTop: "0.5rem" }}>
          <div className="live-demo__label">Simulated Router</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {Object.keys(routes).map((r) => (
              <button
                key={r}
                className={`bigo-btn ${route === r ? "bigo-btn--on" : ""}`}
                style={{ "--c": "#2563eb" }}
                onClick={() => setRoute(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="jsx-output" style={{ marginTop: "0.5rem" }}>{routes[route]}</div>
        </div>

        <div className="exam-cards" style={{ marginTop: "0.5rem" }}>
          <ExamCard q="useContext vs Redux?" a="useContext is simple and built in. Redux is stronger for complex global state flows." />
          <ExamCard q="<Link> vs <a href>?" a="Link keeps SPA navigation inside React. a href causes a full page reload." />
        </div>
      </div>
      <span className="page-number" style={{ right: "1rem" }}>31</span>
    </div>
  );
});
ContextRouterB.displayName = "ContextRouterB";
