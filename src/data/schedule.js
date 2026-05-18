export const schedule = [
  {
    date: "Mon, 18 May",
    type: "study",
    subject: "DSA",
    color: "#e63946",
    sessions: [
      { time: "9:00 AM – 12:30 PM", task: "Big-O Notation & Time Complexity — O(1), O(log n), O(n), O(n²), space complexity" },
      { time: "1:30 PM – 5:30 PM", task: "Recursion & the Call Stack — base case, recursive calls, stack frames, examples" },
      { time: "6:30 PM – 9:30 PM", task: "Practice recursion problems + review Big-O flashcards" },
    ],
  },
  {
    date: "Tue, 19 May",
    type: "study",
    subject: "DSA",
    color: "#e63946",
    sessions: [
      { time: "7:30 AM – 10:00 AM", task: "Big-O Notation & Time Complexity — O(1), O(log n), O(n), O(n²), drop constants, dominant term rule" },
      { time: "10:00 AM – 1:00 PM", task: "Recursion & the Call Stack — base case, recursive calls, stack frames, factorial/fibonacci trace" },
      { time: "2:00 PM – 5:30 PM", task: "Tower of Hanoi O(2ⁿ) + Stack LIFO push/pop/peek + Valid Parentheses problem" },
      { time: "6:30 PM – 9:30 PM", task: "Queue — FIFO, enqueue/dequeue, Circular Queue, Deque types + flashcard review" },
    ],
  },
  {
    date: "Wed, 20 May",
    type: "study",
    subject: "DSA",
    color: "#e63946",
    sessions: [
      { time: "9:00 AM – 12:30 PM", task: "Two-Pointer & Sliding Window — patterns, when to use, example problems" },
      { time: "1:30 PM – 5:30 PM", task: "Trees — terminology, binary tree, BST properties, insertions & search" },
      { time: "6:30 PM – 9:30 PM", task: "Practice BST operations + Two-Pointer problems" },
    ],
  },
  {
    date: "Thu, 21 May",
    type: "study",
    subject: "DSA",
    color: "#e63946",
    sessions: [
      { time: "9:00 AM – 12:30 PM", task: "Binary Tree Traversals — In/Pre/Post/Level-order, height, balanced trees" },
      { time: "1:30 PM – 5:30 PM", task: "Advanced tree analysis — construct tree from traversals, Morris traversal" },
      { time: "6:30 PM – 9:30 PM", task: "Full DSA question bank revision + past exam MCQs" },
    ],
  },
  {
    date: "Fri, 22 May",
    type: "exam",
    subject: "DSA EXAM",
    color: "#ff4d4d",
    sessions: [
      { time: "8:00 AM – 9:30 AM", task: "Light revision: Big-O chart, tree traversals, stack/queue formulas only" },
      { time: "10:00 AM – 1:00 PM", task: "📝 DSA PRACTICAL EXAM" },
    ],
  },
  {
    date: "Sat, 23 May",
    type: "study",
    subject: "AFD",
    color: "#2563eb",
    sessions: [
      { time: "9:00 AM – 12:30 PM", task: "React Intro — what is React, JSX, components, props, functional vs class" },
      { time: "1:30 PM – 5:30 PM", task: "useState, conditional rendering, list rendering (.map), props drilling" },
      { time: "6:30 PM – 9:30 PM", task: "useEffect hook — lifecycle, dependencies, cleanup + Virtual DOM & diffing" },
    ],
  },
  {
    date: "Sun, 24 May",
    type: "study",
    subject: "AFD",
    color: "#2563eb",
    sessions: [
      { time: "9:00 AM – 12:30 PM", task: "Forms & validation, fetch/Axios API calls, Context API, React Router v6" },
      { time: "1:30 PM – 4:30 PM", task: "Advanced JS — execution context, call stack, event loop, async/await, throttling" },
      { time: "4:30 PM – 9:30 PM", task: "Node.js / Express — FS module, CRUD server, middleware, auth/bcrypt + AFD MCQs" },
    ],
  },
  {
    date: "Mon, 25 May",
    type: "exam",
    subject: "AFD EXAM",
    color: "#2563eb",
    sessions: [
      { time: "8:00 AM – 9:30 AM", task: "Light revision: hooks cheatsheet, event loop order, Express middleware chain" },
      { time: "10:00 AM – 1:00 PM", task: "📝 ADVANCE FRONTEND DEVELOPMENT PRACTICAL EXAM" },
    ],
  },
  {
    date: "Tue, 26 May",
    type: "study",
    subject: "FOML",
    color: "#16a34a",
    sessions: [
      { time: "9:00 AM – 12:30 PM", task: "NumPy — array creation, vectorized ops, indexing; Pandas — DataFrames, filtering, joins" },
      { time: "1:30 PM – 4:00 PM", task: "Matplotlib/Seaborn — bar, line, scatter, box, violin, heatmap + Probability (PMF/PDF, Normal/Binomial)" },
      { time: "4:00 PM – 9:30 PM", task: "Gradient Descent + learning rate; Linear/Multiple/Logistic Regression; Confusion Matrix; Bias-Variance tradeoff" },
    ],
  },
  {
    date: "Wed, 27 May",
    type: "exam",
    subject: "FOML EXAM",
    color: "#16a34a",
    sessions: [
      { time: "8:00 AM – 9:30 AM", task: "Light revision: regression formulas, gradient descent formula, bias-variance curve" },
      { time: "10:00 AM – 1:00 PM", task: "📝 FOUNDATIONS OF ML USING MATHEMATICS PRACTICAL EXAM" },
    ],
  },
  {
    date: "Thu, 28 May",
    type: "study",
    subject: "DBMS",
    color: "#7c3aed",
    sessions: [
      { time: "9:00 AM – 12:30 PM", task: "SQL vs MongoDB architecture — RDBMS vs document model, BSON, collections vs tables" },
      { time: "1:30 PM – 5:30 PM", task: "CRUD & query operators ($gt, $lt, $in, sort, limit, projection), Indexing, Sharding" },
      { time: "6:30 PM – 9:30 PM", task: "Aggregation pipeline ($match, $group, $sort, $project) + practice all MCQ sets" },
    ],
  },
  {
    date: "Fri, 29 May",
    type: "exam",
    subject: "DBMS EXAM",
    color: "#7c3aed",
    sessions: [
      { time: "8:00 AM – 9:30 AM", task: "Light revision: aggregation pipeline stages, indexing types, CRUD syntax" },
      { time: "10:00 AM – 1:00 PM", task: "📝 DATABASE MANAGEMENT SYSTEM PRACTICAL EXAM" },
    ],
  },
];
