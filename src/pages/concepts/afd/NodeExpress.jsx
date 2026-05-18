import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

const MW_STEPS = [
  { label: "Client Request", color: "#555" },
  { label: "Logger MW", color: "#f59e0b", note: "logs method + URL" },
  { label: "Auth MW", color: "#e63946", note: "checks JWT token" },
  { label: "Body Parser MW", color: "#2563eb", note: "parses req.body" },
  { label: "Route Handler", color: "#16a34a", note: "business logic" },
  { label: "Response sent", color: "#555" },
];

export const NodeExpressA = forwardRef((props, ref) => {
  const [step, setStep] = useState(0);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#2563eb" }}>AFD</div>
        <h2 className="concept-title">Node.js & Express</h2>
        <p className="concept-def">
          <strong>Node.js</strong> runs JavaScript on the server using Chrome&apos;s V8 engine. Its <strong>non-blocking event loop</strong> handles many requests without waiting — ideal for I/O-heavy workloads.
        </p>
        <ul className="fact-list">
          <li><strong>Express:</strong> thin framework on top of Node — adds routing and middleware</li>
          <li><strong>Middleware:</strong> chain of <code>(req, res, next)</code> functions every request passes through</li>
          <li><strong>next():</strong> must be called to pass control to the next middleware</li>
          <li><strong>Error middleware:</strong> takes 4 args <code>(err, req, res, next)</code> — Express detects it automatically</li>
        </ul>

        <h3 className="concept-subtitle">Express Middleware Pipeline</h3>
        <div className="mw-pipeline">
          {MW_STEPS.map((s, i) => (
            <div key={i} className={`mw-step ${i <= step ? "mw-step--active" : ""}`}
              style={{ "--mc": s.color }}>
              <div className="mw-dot" />
              {i < MW_STEPS.length - 1 && <div className="mw-line" />}
              <div className="mw-label">{s.label}</div>
              {s.note && i === step && <div className="mw-note">{s.note}</div>}
            </div>
          ))}
        </div>
        <div className="stepper-btns">
          <button disabled={step === 0} onClick={() => setStep(s => s - 1)}>←</button>
          <span className="step-label">{step + 1}/{MW_STEPS.length}</span>
          <button disabled={step === MW_STEPS.length - 1} onClick={() => setStep(s => s + 1)}>→</button>
          <button onClick={() => setStep(0)} className="reset-btn">↺</button>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>req, res, next — What They Are</h3>
        <p className="concept-def">
          Every middleware function and route handler in Express receives three arguments. <strong>req</strong> (Request) is the incoming HTTP request — it carries everything the client sent: URL parameters in <code>req.params</code>, query strings in <code>req.query</code>, the parsed body in <code>req.body</code>, and headers in <code>req.headers</code>. <strong>res</strong> (Response) is your outgoing reply — call <code>res.json(data)</code> to send JSON, <code>res.status(404).send("Not found")</code> to set a status code, or <code>res.redirect()</code> to redirect. <strong>next</strong> is a function you call to pass control to the next middleware in the chain — if you forget to call it and don't send a response, the request just hangs forever. Error-handling middleware is special: it takes four arguments <code>(err, req, res, next)</code> and Express recognises it by that extra parameter.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>36</span>
    </div>
  );
});
NodeExpressA.displayName = "NodeExpressA";

export const NodeExpressB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <SyntaxBlock language="javascript" title="server.js" code={`const express = require('express');
const app = express();

// Middleware
app.use(express.json());      // parse body
app.use(cors());              // allow CORS

// Routes
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

app.listen(3000);`} />

      <h3 className="concept-subtitle" style={{ marginTop: "0.5rem" }}>FS Module</h3>
      <SyntaxBlock language="javascript" title="fs-demo.js" code={`const fs = require('fs');
fs.readFile('data.txt', 'utf8', (err, data) => {
  console.log(data); // async callback
});
// sync version:
const data = fs.readFileSync('data.txt', 'utf8');`} />

      <div className="exam-cards" style={{ marginTop: "0.5rem" }}>
        <ExamCard q="What is middleware in Express?" a="A function (req, res, next) that runs between request and response. Must call next() to continue pipeline." />
        <ExamCard q="HTTP methods in REST?" a="GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove)." />
        <ExamCard q="What is CORS?" a="Cross-Origin Resource Sharing — allows/blocks requests from different domains. Use cors() middleware in Express." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>37</span>
  </div>
));
NodeExpressB.displayName = "NodeExpressB";
