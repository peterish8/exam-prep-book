import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  Code2,
  FileCode2,
  Flame,
  Layers,
  Lightbulb,
  ListChecks,
  Search,
  Sparkles,
  TerminalSquare,
  X
} from "lucide-react";
import { DSA_CODE_QUESTIONS, explainPythonLine } from "../data/dsaCodeLab";
import "../styles/book.css";

const STORAGE_KEY = "exam-prep:dsa-code-progress:v1";

const STUDY_MODULES = [
  {
    id: 1,
    title: "Refreshers",
    emoji: "⚡",
    accent: "is-blue",
    topics: ["Arrays", "Strings", "Linked Lists", "Two Pointer", "Prefix Sum", "Time & Space Complexity"],
  },
  {
    id: 2,
    title: "Recursion",
    emoji: "🌀",
    accent: "is-purple",
    topics: ["Recursion Fundamentals", "Call Stack", "Base Case", "Recursion Trees", "Advanced Recursion"],
  },
  {
    id: 3,
    title: "Stacks",
    emoji: "📚",
    accent: "is-orange",
    topics: ["Stack ADT", "Push Pop Peek", "Expression Evaluation", "Balanced Parentheses", "Monotonic Stack"],
  },
  {
    id: 4,
    title: "Queues",
    emoji: "🚶",
    accent: "is-green",
    topics: ["Queue ADT", "Circular Queue", "Deque", "Sliding Window", "Queue using Stack"],
  },
  {
    id: 5,
    title: "Trees & Variants",
    emoji: "🌳",
    accent: "is-teal",
    topics: ["Binary Tree", "Tree Traversals", "Level Order", "Tree Views", "Depth Problems"],
  },
  {
    id: 6,
    title: "Binary Search Trees",
    emoji: "🔎",
    accent: "is-gold",
    topics: ["BST Property", "Search", "Insert", "Delete", "Kth Largest"],
  },
];

const CODING_MODULE = {
  id: "coding",
  title: "Coding Questions",
  emoji: "💻",
  accent: "is-pink",
  topics: DSA_CODE_QUESTIONS.map((question) => question.title),
};

function readStoredProgress() {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function highlightPython(line) {
  const keywords = ["def", "class", "return", "if", "else", "elif", "for", "while", "from", "import", "in", "and", "or", "not", "True", "False", "None"];
  const safe = line.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  return safe
    .split(" ")
    .map((part) =>
      keywords.includes(part.replace(":", ""))
        ? `<span class="text-purple-300 font-semibold">${part}</span>`
        : part
    )
    .join(" ");
}

function ProgressBar({ value }) {
  return (
    <div className="dsa-roadmap__progress-track">
      <motion.div
        className="dsa-roadmap__progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

function ModuleCard({ module, done, total, onOpen, index, grand = false }) {
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={onOpen}
      className={`dsa-roadmap__module-card ${module.accent}${grand ? " is-grand" : ""}`}
    >
      <div className="dsa-roadmap__module-top">
        <span className="dsa-roadmap__module-emoji">{module.emoji}</span>
        <span className="dsa-roadmap__module-tag">
          {grand ? "Grand Module" : `Module ${module.id}`}
        </span>
      </div>

      <h3>{module.title}</h3>
      <p>
        {grand
          ? "All Python coding questions in one VS Code-style interactive code lab."
          : `${total} concepts • ${done} completed`}
      </p>

      <ProgressBar value={percent} />

      <div className="dsa-roadmap__module-bottom">
        <span>{percent}% done</span>
        <span className="inline-flex items-center gap-1">
          Open <ChevronRight size={16} />
        </span>
      </div>
    </motion.button>
  );
}

function StudyTopicCard({ topic, done, onToggle, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="dsa-roadmap__topic-card"
    >
      <div className="dsa-roadmap__topic-head">
        <div>
          <div className="dsa-roadmap__topic-kicker">{topic.module}</div>
          <h3>{topic.title}</h3>
        </div>
        <button
          className={`dsa-roadmap__topic-toggle-btn${done ? " is-done" : ""}`}
          onClick={onToggle}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem" }}
          aria-label={done ? "Mark topic incomplete" : "Mark topic complete"}
        >
          {done ? (
            <CheckCircle2 className="text-emerald-300" size={28} />
          ) : (
            <Circle className="text-slate-500" size={28} />
          )}
        </button>
      </div>

      <div className="dsa-roadmap__topic-panels">
        <div className="dsa-roadmap__mini-panel">
          <div className="flex items-center gap-2 font-bold" style={{ color: "#93c5fd", marginBottom: "0.5rem" }}>
            <BookOpen size={16} /> Simple idea
          </div>
          <p>Learn the definition, draw one mini visual, remember the mnemonic, then solve two questions.</p>
        </div>
        <div className="dsa-roadmap__mini-panel">
          <div className="flex items-center gap-2 font-bold" style={{ color: "#fde68a", marginBottom: "0.5rem" }}>
            <Lightbulb size={16} /> Memory hook
          </div>
          <p>Ask: what is stored, how it moves, and which operation becomes faster?</p>
        </div>
      </div>
    </motion.article>
  );
}

function CodeQuestionCard({ question, done, onToggle }) {
  const [activeLine, setActiveLine] = useState(null);
  const lines = question.code.split("\n");
  const activeText = activeLine === null ? null : lines[activeLine];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="dsa-roadmap__code-card"
    >
      <div className="dsa-roadmap__code-head">
        <div>
          <div className="dsa-roadmap__question-badges">
            <span>Question {question.id}</span>
            <span>{question.status}</span>
          </div>
          <h3>{question.title}</h3>
          <p>{question.concept}</p>
        </div>

        <button
          className={`dsa-roadmap__done-btn${done ? " is-done" : ""}`}
          onClick={onToggle}
        >
          {done ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={18} className="text-emerald-300" /> Done
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Circle size={18} className="text-slate-500" /> Mark done
            </span>
          )}
        </button>
      </div>

      <div className="dsa-roadmap__code-grid">
        <div className="dsa-roadmap__editor">
          <div className="dsa-roadmap__editor-top">
            <span className="dsa-roadmap__window-dot is-red" />
            <span className="dsa-roadmap__window-dot is-yellow" />
            <span className="dsa-roadmap__window-dot is-green" />
            <span className="dsa-roadmap__filename">
              {question.title.replaceAll(" ", "_").toLowerCase()}.py
            </span>
          </div>

          <div className="dsa-roadmap__editor-body">
            {lines.map((line, index) => (
              <button
                key={`${question.id}-${index}`}
                className={`dsa-code-line${activeLine === index ? " is-active" : ""}`}
                onClick={() => setActiveLine(activeLine === index ? null : index)}
              >
                <span className="dsa-roadmap__editor-line-no">{index + 1}</span>
                <span style={{ display: "flex", justifyContent: "center", paddingTop: "4px" }}>
                  <span
                    style={{
                      display: "block",
                      width: "11px",
                      height: "11px",
                      borderRadius: "50%",
                      border: "1px solid",
                      borderColor: activeLine === index ? "#93c5fd" : "#374151",
                      background: activeLine === index ? "#93c5fd" : "transparent",
                      transition: "all 0.2s"
                    }}
                  />
                </span>
                <code
                  style={{ color: "#e2e8f0", minHeight: "26px", fontFamily: "ui-monospace, monospace", fontSize: "18px", display: "block", padding: "0.5rem 0.6rem 0.5rem 0", lineHeight: "1.65" }}
                  dangerouslySetInnerHTML={{ __html: highlightPython(line) || "&nbsp;" }}
                />
              </button>
            ))}
          </div>

          <AnimatePresence>
            {activeText !== null && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="dsa-roadmap__line-explainer"
              >
                <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 900, fontSize: "15px", color: "#dbeafe" }}>
                      <Code2 size={15} /> Line {activeLine + 1} explanation
                    </span>
                    <button
                      onClick={() => setActiveLine(null)}
                      style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "0.2rem", display: "flex" }}
                      aria-label="Close explanation"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <div
                    style={{
                      background: "rgba(0,0,0,0.32)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "10px",
                      padding: "0.6rem 0.85rem",
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "18px",
                      color: "#e2e8f0",
                      marginBottom: "0.85rem"
                    }}
                  >
                    {activeText || "blank line"}
                  </div>
                  <p style={{ fontSize: "15px", lineHeight: "1.65", color: "#cbd5e1" }}>
                    {explainPythonLine(activeText)}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <section className="dsa-roadmap__code-notes">
          <div className="dsa-roadmap__side-card is-logic">
            <strong><TerminalSquare size={14} /> Working Logic</strong>
            <p>{question.logic}</p>
          </div>
          <div className="dsa-roadmap__side-card is-complexity">
            <strong><Flame size={14} /> Complexity</strong>
            <p>{question.complexity}</p>
          </div>
          <div className="dsa-roadmap__side-card is-mnemonic">
            <strong><Sparkles size={14} /> Mnemonic</strong>
            <p style={{ fontWeight: 700, color: "#f8fafc", fontSize: "14.5px" }}>{question.mnemonic}</p>
          </div>
          <div className="dsa-roadmap__side-card is-study">
            <strong><ListChecks size={14} /> How to study this</strong>
            <ol style={{ paddingLeft: "1.2rem", listStyleType: "decimal" }}>
              <li>Read the logic first.</li>
              <li>Click code-line circles.</li>
              <li>Trace one sample input manually.</li>
              <li>Rewrite the code without looking.</li>
            </ol>
          </div>
        </section>
      </div>
    </motion.article>
  );
}

export default function DSACodeLab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useState(() => readStoredProgress());

  // Determine initial selected module based on search params
  const [selectedModule, setSelectedModule] = useState(() => {
    const m = searchParams.get("module");
    if (m === "coding") return "coding";
    if (m && !isNaN(m)) return Number(m);
    return null;
  });

  // Sync selectedModule when searchParams change (browser back/forward or navigation)
  useEffect(() => {
    const m = searchParams.get("module");
    if (m === "coding") {
      setSelectedModule("coding");
    } else if (m && !isNaN(m)) {
      setSelectedModule(Number(m));
    } else {
      setSelectedModule(null);
    }
  }, [searchParams]);

  // Sync state changes back to search param or local storage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // Ignore local storage write failures.
    }
  }, [completed]);

  const allModules = useMemo(() => [CODING_MODULE, ...STUDY_MODULES], []);
  const allStudyTopics = useMemo(() =>
    STUDY_MODULES.flatMap((module) =>
      module.topics.map((title) => ({
        title,
        module: module.title,
        key: `study-${module.id}-${title}`,
      }))
    ), []
  );

  const allCodingTopics = useMemo(() =>
    DSA_CODE_QUESTIONS.map((question) => ({
      ...question,
      key: `code-${question.id}`,
    })), []
  );

  const totalCount = allStudyTopics.length + allCodingTopics.length;
  const doneCount = Object.values(completed).filter(Boolean).length;
  const percentage = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  const currentStudyModule = STUDY_MODULES.find((module) => module.id === selectedModule);
  const isCoding = selectedModule === "coding";

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return null;

    return {
      study: allStudyTopics.filter((topic) =>
        `${topic.title} ${topic.module}`.toLowerCase().includes(normalized)
      ),
      code: allCodingTopics.filter((question) =>
        `${question.title} ${question.concept} ${question.logic}`.toLowerCase().includes(normalized)
      ),
    };
  }, [query, allStudyTopics, allCodingTopics]);

  const toggleProgress = (key) => {
    setCompleted((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleOpenModule = (moduleId) => {
    setSelectedModule(moduleId);
    setSearchParams({ module: String(moduleId) });
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setQuery("");
    setSearchParams({});
  };

  const visibleStudyTopics = currentStudyModule
    ? currentStudyModule.topics.map((title) => ({
        title,
        module: currentStudyModule.title,
        key: `study-${currentStudyModule.id}-${title}`,
      }))
    : [];

  return (
    <div className="dsa-code-lab">
      <div className="dsa-code-lab__backdrop dsa-code-lab__backdrop--blue" />
      <div className="dsa-code-lab__backdrop dsa-code-lab__backdrop--pink" />

      <main className="dsa-roadmap">
        <section className="dsa-roadmap__hero">
          <div className="dsa-roadmap__hero-copy">
            <Link to="/" className="dsa-roadmap__back">
              ← Back to book
            </Link>
            <div className="dsa-roadmap__eyebrow">
              <Sparkles size={16} style={{ display: "inline-block", marginRight: "0.5rem", verticalAlign: "middle" }} />
              Interactive DSA Todo Studybook
            </div>
            <h1>DSA Roadmap + Code Lab.</h1>
            <p>
              First learn concepts module-wise. Then open the Coding Questions grand module for Python answers,
              clean VS Code-style formatting, and clickable line-by-line explanations.
            </p>
          </div>

          <div className="dsa-roadmap__hero-progress">
            <div className="dsa-roadmap__hero-progress-top">
              <span>Progress</span>
              <span>{doneCount}/{totalCount} done</span>
            </div>
            <ProgressBar value={percentage} />
            <div className="dsa-roadmap__hero-progress-value">{percentage}%</div>
            <p>Saved in your local storage on this device.</p>
          </div>
        </section>

        <section className="dsa-roadmap__toolbar">
          {selectedModule || query ? (
            <button
              className="dsa-roadmap__back-modules"
              onClick={handleBackToModules}
            >
              ← Back to modules
            </button>
          ) : (
            <div>
              <div className="dsa-roadmap__toolbar-kicker">
                <Layers size={14} style={{ display: "inline-block", marginRight: "0.25rem", verticalAlign: "middle" }} />
                Choose a module
              </div>
              <h2>Start from concepts or jump into coding</h2>
            </div>
          )}

          <div className="dsa-roadmap__search-wrapper" style={{ position: "relative", width: "100%", maxWidth: "380px" }}>
            <Search className="dsa-roadmap__search-icon" size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#64748b", pointerEvents: "none" }} />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelectedModule(null);
                setSearchParams({});
              }}
              style={{ paddingLeft: "2.75rem" }}
              className="dsa-roadmap__search"
              placeholder="Search concepts or coding questions..."
            />
          </div>
        </section>

        {query && searchResults ? (
          <section className="dsa-roadmap__section-stack">
            <div className="dsa-roadmap__search-summary">
              <h2>Search results for "{query}"</h2>
              <p>
                {searchResults.study.length} concept matches • {searchResults.code.length} coding matches
              </p>
            </div>

            {searchResults.study.length > 0 ? (
              <div className="dsa-roadmap__topic-grid">
                {searchResults.study.map((topic, index) => (
                  <StudyTopicCard
                    key={topic.key}
                    topic={topic}
                    index={index}
                    done={Boolean(completed[topic.key])}
                    onToggle={() => toggleProgress(topic.key)}
                  />
                ))}
              </div>
            ) : null}

            <div className="dsa-roadmap__code-stack">
              {searchResults.code.map((question) => (
                <CodeQuestionCard
                  key={question.key}
                  question={question}
                  done={Boolean(completed[question.key])}
                  onToggle={() => toggleProgress(question.key)}
                />
              ))}
            </div>
          </section>
        ) : !selectedModule ? (
          <section className="dsa-roadmap__module-grid">
            {allModules.map((module, index) => {
              const keys =
                module.id === "coding"
                  ? DSA_CODE_QUESTIONS.map((question) => `code-${question.id}`)
                  : module.topics.map((title) => `study-${module.id}-${title}`);
              const moduleDone = keys.filter((key) => completed[key]).length;

              return (
                <ModuleCard
                  key={module.id}
                  module={module}
                  done={moduleDone}
                  total={keys.length}
                  index={index}
                  grand={module.id === "coding"}
                  onOpen={() => handleOpenModule(module.id)}
                />
              );
            })}
          </section>
        ) : isCoding ? (
          <section className="dsa-roadmap__section-stack">
            <div className="dsa-roadmap__coding-banner">
              <div>
                <div className="dsa-roadmap__toolbar-kicker">Grand Module</div>
                <h2 className="flex items-center gap-2">
                  <Code2 size={24} style={{ color: "#d946ef" }} /> Coding Questions Code Lab
                </h2>
                <p>
                  Click any code line to open a focused explanation panel below the editor.
                </p>
              </div>
              <div className="dsa-roadmap__coding-count">
                <FileCode2 size={16} /> {DSA_CODE_QUESTIONS.length} programs
              </div>
            </div>

            <div className="dsa-roadmap__code-stack">
              {DSA_CODE_QUESTIONS.map((question) => (
                <CodeQuestionCard
                  key={question.id}
                  question={question}
                  done={Boolean(completed[`code-${question.id}`])}
                  onToggle={() => toggleProgress(`code-${question.id}`)}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="dsa-roadmap__section-stack">
            <div className={`dsa-roadmap__study-banner ${currentStudyModule.accent}`}>
              <div className="dsa-roadmap__toolbar-kicker">Module {currentStudyModule.id}</div>
              <h2>
                <span style={{ marginRight: "0.5rem" }}>{currentStudyModule.emoji}</span>
                {currentStudyModule.title}
              </h2>
            </div>

            <div className="dsa-roadmap__topic-grid">
              {visibleStudyTopics.map((topic, index) => (
                <StudyTopicCard
                  key={topic.key}
                  topic={topic}
                  index={index}
                  done={Boolean(completed[topic.key])}
                  onToggle={() => toggleProgress(topic.key)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
