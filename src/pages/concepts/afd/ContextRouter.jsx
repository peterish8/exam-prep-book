import { forwardRef, useState, createContext, useContext } from "react";
import ExamCard from "../../../components/ExamCard";

const ThemeCtx = createContext("light");

function ThemedBox() {
  const theme = useContext(ThemeCtx);
  return (
    <div style={{
      background: theme === "dark" ? "#1e1e2e" : "#f0f9ff",
      color: theme === "dark" ? "#e2e8f0" : "#1e3a5f",
      border: `1px solid ${theme === "dark" ? "#334155" : "#93c5fd"}`,
      borderRadius: "6px", padding: "0.5rem", marginTop: "0.5rem", fontSize: "0.8rem"
    }}>
      Theme from Context: <strong>{theme}</strong> 🎨
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
          Context solves <strong>props drilling</strong>. A Provider wraps the tree; any descendant can consume via <code>useContext</code>.
        </p>

        <pre className="code-snippet" style={{ fontSize: "0.68rem" }}>{`// 1. Create context
const ThemeCtx = createContext("light");

// 2. Wrap with Provider
<ThemeCtx.Provider value={theme}>
  <App />
</ThemeCtx.Provider>

// 3. Consume anywhere
const theme = useContext(ThemeCtx);`}</pre>

        <div className="live-demo" style={{ marginTop: "0.5rem" }}>
          <div className="live-demo__label">Live Context Demo</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className={`bigo-btn ${theme === "light" ? "bigo-btn--on" : ""}`}
              style={{ "--c": "#2563eb" }} onClick={() => setTheme("light")}>Light</button>
            <button className={`bigo-btn ${theme === "dark" ? "bigo-btn--on" : ""}`}
              style={{ "--c": "#2563eb" }} onClick={() => setTheme("dark")}>Dark</button>
          </div>
          <ThemeCtx.Provider value={theme}>
            <ThemedBox />
          </ThemeCtx.Provider>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>Context vs Props — When to Use Which</h3>
        <ul className="fact-list">
          <li><strong>Use props</strong> when data only needs to travel 1–2 levels down. Simple, explicit, easy to trace.</li>
          <li><strong>Use Context</strong> when the same data is needed by many components at different nesting levels (theme, auth user, language, cart).</li>
          <li><strong>Context causes re-renders</strong> in every consumer when the value changes — avoid putting frequently-changing data (e.g. mouse position) in Context.</li>
          <li><strong>Rule of thumb:</strong> if you're passing props through components that don't use them, switch to Context.</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>29</span>
    </div>
  );
});
ContextRouterA.displayName = "ContextRouterA";

export const ContextRouterB = forwardRef((props, ref) => {
  const [route, setRoute] = useState("home");
  const routes = {
    home: "🏠 Home Page Content",
    about: "👤 About Page Content",
    contact: "📬 Contact Page Content",
  };

  return (
    <div ref={ref} className="book-page concept-page concept-page--right">
      <div className="page-inner">
        <h3 className="concept-subtitle">React Router v6</h3>
        <pre className="code-snippet" style={{ fontSize: "0.68rem" }}>{`// main.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/user/:id" element={<User />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

// Navigate: <Link to="/about">About</Link>
// useNavigate() hook for programmatic nav
// useParams() to get :id from URL`}</pre>

        <div className="live-demo" style={{ marginTop: "0.5rem" }}>
          <div className="live-demo__label">Simulated Router</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {Object.keys(routes).map(r => (
              <button key={r} className={`bigo-btn ${route === r ? "bigo-btn--on" : ""}`}
                style={{ "--c": "#2563eb" }} onClick={() => setRoute(r)}>{r}</button>
            ))}
          </div>
          <div className="jsx-output" style={{ marginTop: "0.5rem" }}>{routes[route]}</div>
        </div>

        <div className="exam-cards" style={{ marginTop: "0.5rem" }}>
          <ExamCard q="useContext vs Redux?" a="useContext: simple, built-in, good for theming/auth. Redux: powerful, for complex global state with reducers/actions." />
          <ExamCard q="<Link> vs <a href>?" a="Link prevents full page reload, handles SPA routing. <a> causes full reload." />
        </div>
      </div>
      <span className="page-number" style={{ right: "1rem" }}>30</span>
    </div>
  );
});
ContextRouterB.displayName = "ContextRouterB";
