import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const theme = {
  'code[class*="language-"]': {
    color: "#d4d4d4",
    background: "none",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.74rem",
    lineHeight: "1.65",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    tabSize: "2",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "#d4d4d4",
    background: "#111827",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.74rem",
    lineHeight: "1.65",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    tabSize: "2",
    hyphens: "none",
    padding: "0",
    margin: "0",
    overflow: "auto",
  },
  comment: { color: "#6a9955", fontStyle: "italic" },
  prolog: { color: "#808080" },
  doctype: { color: "#808080" },
  cdata: { color: "#808080" },
  punctuation: { color: "#d4d4d4" },
  namespace: { opacity: "0.7" },
  property: { color: "#9cdcfe" },
  tag: { color: "#569cd6" },
  boolean: { color: "#569cd6" },
  number: { color: "#b5cea8" },
  constant: { color: "#4fc1ff" },
  symbol: { color: "#b5cea8" },
  deleted: { color: "#ce9178" },
  selector: { color: "#d7ba7d" },
  "attr-name": { color: "#92c5f8" },
  string: { color: "#ce9178" },
  char: { color: "#ce9178" },
  builtin: { color: "#4ec9b0" },
  inserted: { color: "#b5cea8" },
  operator: { color: "#d4d4d4" },
  entity: { color: "#d7ba7d", cursor: "help" },
  url: { color: "#ce9178" },
  variable: { color: "#9cdcfe" },
  atrule: { color: "#c586c0" },
  "attr-value": { color: "#ce9178" },
  keyword: { color: "#c586c0", fontWeight: "600" },
  function: { color: "#dcdcaa" },
  "class-name": { color: "#4ec9b0" },
  regex: { color: "#d16969" },
  important: { color: "#c586c0", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
};

export default function SyntaxBlock({
  code,
  language = "javascript",
  showLineNumbers = true,
  title,
}) {
  const label = title || language;

  return (
    <div className="syntax-block">
      <div className="syntax-block__topbar">
        <div className="syntax-block__dots" aria-hidden="true">
          <span className="syntax-block__dot syntax-block__dot--red" />
          <span className="syntax-block__dot syntax-block__dot--yellow" />
          <span className="syntax-block__dot syntax-block__dot--green" />
        </div>
        <span className="syntax-block__title">{label}</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme}
        showLineNumbers={showLineNumbers}
        wrapLongLines={false}
        lineNumberStyle={{
          color: "#4b5563",
          fontSize: "0.66rem",
          paddingRight: "1.15rem",
          userSelect: "none",
          minWidth: "2.2em",
        }}
        customStyle={{
          background: "#111827",
          border: "1px solid rgba(148, 163, 184, 0.15)",
          borderTop: "none",
          borderRadius: "0 0 8px 8px",
          padding: "0.8rem 0.95rem",
          margin: "0 0 0.55rem 0",
          overflowX: "auto",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
        }}
        codeTagProps={{ style: { fontFamily: "'JetBrains Mono', monospace" } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
