import { useState } from "react";
import SyntaxBlock from "./SyntaxBlock";

export default function CodeRunner({ code, language = "javascript", outputs = [] }) {
  const [ran, setRan] = useState(false);
  const [step, setStep] = useState(0);

  const runNext = () => {
    if (!ran) { setRan(true); setStep(1); return; }
    if (step < outputs.length) setStep(s => s + 1);
  };

  const reset = () => { setRan(false); setStep(0); };

  return (
    <div className="code-runner">
      <div className="code-runner__header">
        <span className="code-runner__lang">{language}</span>
        <div className="code-runner__btns">
          <button className="run-btn" onClick={runNext}>
            {!ran ? "▶ Run" : step < outputs.length ? "▶ Next" : "✓ Done"}
          </button>
          {ran && <button className="reset-btn" onClick={reset}>↺</button>}
        </div>
      </div>
        <div className="code-runner__editor-wrap">
          <SyntaxBlock code={code} language={language} showLineNumbers={true} title={`main.${language === "javascript" ? "js" : language}`} />
        </div>
      {ran && (
        <div className="code-runner__output">
          <span className="output-label">Output:</span>
          {outputs.slice(0, step).map((line, i) => (
            <div key={i} className={`output-line ${line.type || ""}`}>
              {line.type === "comment" ? (
                <span className="output-comment">// {line.text}</span>
              ) : (
                <span>{line.text}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
