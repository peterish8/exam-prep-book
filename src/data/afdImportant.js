export const AFD_IMPORTANT_QUESTIONS = [
  {
    id: 1,
    title: "What is React, and how does it help developers? Differentiate props and state.",
    answer: [
      "React is a JavaScript library for building user interfaces using reusable components. It helps developers create declarative UIs, reuse code, and manage screen updates more easily.",
      "It is widely used because components can be combined to build large applications while keeping logic organized.",
    ],
    bullets: [
      "Props are inputs passed from parent to child.",
      "Props are read-only inside the child component.",
      "State is internal data owned by the component.",
      "State can change over time by using a setter like setState or useState.",
      "Changing state usually triggers re-rendering.",
    ],
  },
  {
    id: 2,
    title: "What is the Virtual DOM, and how does it improve performance in React applications?",
    answer: [
      "The Virtual DOM is a lightweight JavaScript copy of the real DOM.",
      "When data changes, React creates a new Virtual DOM tree, compares it with the old one, and updates only the changed parts in the real DOM.",
    ],
    bullets: [
      "Reduces expensive direct DOM operations.",
      "Uses diffing and reconciliation.",
      "Applies only minimal updates to the browser DOM.",
    ],
  },
  {
    id: 3,
    title: "Explain the execution order of synchronous code, Promises, and setTimeout in the JavaScript Event Loop.",
    answer: [
      "Synchronous code runs first on the call stack.",
      "After the stack is empty, JavaScript checks the microtask queue.",
      "Promise callbacks are microtasks, so they run before the callback queue.",
      "setTimeout callbacks are macrotasks, so they run after synchronous code and pending microtasks.",
    ],
    code: `console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("end");

// Output:
// start
// end
// promise
// timeout`,
  },
  {
    id: 4,
    title: "What is conditional rendering in React? What are the different ways to implement it?",
    answer: [
      "Conditional rendering means showing different UI based on a condition.",
      "It is commonly used for login status, loading states, empty states, and feature visibility.",
    ],
    bullets: [
      "if / else statements",
      "ternary operator",
      "logical && operator",
      "return null when nothing should be rendered",
    ],
    code: `function Welcome({ isLoggedIn, showAlert }) {
  if (!isLoggedIn) {
    return <h1>Please log in</h1>;
  }

  return (
    <div>
      <h1>Welcome back</h1>
      <p>{showAlert ? "Profile complete" : "Update your profile"}</p>
      {showAlert && <span>Alert visible</span>}
    </div>
  );
}`,
  },
  {
    id: 5,
    title: "Describe the req-res-next cycle in Express.js middleware and explain how error-handling middleware differs from regular middleware.",
    answer: [
      "A request enters Express and passes through middleware functions one by one.",
      "Each middleware receives req, res, and next. req stores request data, res sends the response, and next passes control forward.",
      "If a middleware sends a response, the cycle stops. If it calls next(), Express moves to the next middleware or route handler.",
      "Regular middleware uses (req, res, next). Error-handling middleware uses (err, req, res, next) and runs when next(err) is called.",
    ],
  },
  {
    id: 6,
    title: "What are React Hooks, and what are the strict rules for using them?",
    answer: [
      "Hooks are special React functions that allow functional components to use state, effects, refs, context, and more.",
      "Examples include useState, useEffect, useRef, useContext, and useReducer.",
    ],
    bullets: [
      "Call hooks only at the top level.",
      "Do not call hooks inside loops, conditions, or nested functions.",
      "Call hooks only inside React function components or custom hooks.",
      "Custom hooks usually begin with use.",
    ],
  },
  {
    id: 7,
    title: "Explain the concept of Prop Drilling and provide one standard way to avoid it in React.",
    answer: [
      "Prop drilling happens when data is passed through multiple intermediate components just to reach a deeply nested child.",
      "This can make code harder to maintain because middle components may forward props they do not use.",
      "A standard solution is the Context API, which allows shared data to be provided once and consumed where needed.",
    ],
  },
  {
    id: 8,
    title: "Write a short explanation and code snippet showing how to implement an uncontrolled input field in React.",
    answer: [
      "An uncontrolled input keeps its current value in the DOM instead of React state.",
      "In React, useRef is commonly used to read the value during submit.",
    ],
    code: `import { useRef } from "react";

function NameForm() {
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    alert(inputRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" placeholder="Enter name" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
  },
  {
    id: 9,
    title: "What is JWT Authentication? Explain the complete flow from login to protected route.",
    answer: [
      "JWT stands for JSON Web Token. It is a signed token used to represent authenticated user identity.",
      "First, the user sends login credentials to the server.",
      "The server verifies the credentials and creates a JWT containing data such as user id or role.",
      "The server sends the token back to the client.",
      "The client stores it and sends it with future requests, usually in the Authorization header as Bearer token.",
      "For a protected route, the server verifies the token signature. If valid, access is allowed. If invalid or expired, access is denied.",
    ],
  },
  {
    id: 10,
    title: "Explain the concept of one-way data flow in React.",
    answer: [
      "One-way data flow means data moves from parent components to child components through props.",
      "Children receive data and display it, but they do not directly change the parent state.",
      "If a child needs to affect parent data, the parent passes down a callback function.",
      "This makes the app easier to debug because the direction of data is predictable.",
    ],
  },
  {
    id: 11,
    title: "Provide an example of how to use a cleanup function inside useEffect and explain when it executes.",
    answer: [
      "A cleanup function is returned from useEffect.",
      "It is used to clear timers, remove subscriptions, or detach event listeners.",
      "It runs before the effect re-runs because of dependency changes and also when the component unmounts.",
    ],
    code: `import { useEffect } from "react";

function Timer() {
  useEffect(() => {
    const id = setInterval(() => {
      console.log("tick");
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return <p>Timer started</p>;
}`,
  },
  {
    id: 12,
    title: "Describe the MVC architecture pattern in the context of an Express and Mongoose backend.",
    answer: [
      "MVC stands for Model, View, and Controller.",
      "In an Express and Mongoose backend, the Model is the Mongoose schema and model used for database structure and queries.",
      "The Controller contains application logic for handling requests and preparing responses.",
      "The View is often the JSON response sent to the client, or the frontend that consumes the API.",
      "This separation keeps the backend more organized and easier to scale.",
    ],
  },
  {
    id: 13,
    title: "What is middleware in Express.js? Write an example with server setup and basic GET and POST routes.",
    answer: [
      "Middleware is a function that runs during the request-response cycle.",
      "It can inspect requests, modify data, end the response, or pass control to the next function.",
    ],
    code: `const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/users", (req, res) => {
  res.json({ message: "GET route working" });
});

app.post("/users", (req, res) => {
  res.status(201).json({
    message: "POST route working",
    body: req.body,
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});`,
  },
];

export const AFD_RAPID_RECALL = [
  "React = component-based UI library",
  "Props = external and read-only",
  "State = internal and changeable",
  "Virtual DOM = diff before real DOM update",
  "Promises run before setTimeout",
  "Hooks stay at the top level",
  "Context avoids prop drilling",
  "useEffect cleanup clears side effects",
  "JWT proves authentication",
  "Express middleware follows req-res-next",
];

export const CODECHEF_IMPORTANT = [
  "AFDQ16",
  "AFDQ17",
  "AFDQ18",
  "AFDQ19",
  "AFDQ20",
  "AFDQ21",
  "AFDQ22",
  "AFDQ8",
  "AFDQ9",
  "AFDQ10",
  "AFDQ11",
  "AFDQ12",
  "AFDQ13",
  "AFDQ14",
  "AFDQ1",
  "AFDQ2",
  "AFDQ3",
  "AFDQ4",
  "AFDQ5",
  "AFDQ6",
  "AFDQ7",
].map((code, index) => ({
  id: index + 1,
  code,
  url: `https://www.codechef.com/learn/course/undefined/FREEPROB/problems/${code}?folder=%2Fhome%2Fchef%2Fworkspace`,
}));
