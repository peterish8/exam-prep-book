export const AFD_QUIZ_MODULES = [
  {
    id: 1,
    title: "JavaScript & Async Foundations",
    emoji: "JS",
    accent: "is-blue",
    description: "Execution context, call stack, event loop, promises, async/await, coercion, currying, debounce, throttle.",
  },
  {
    id: 2,
    title: "React Introduction & Core Concepts",
    emoji: "RX",
    accent: "is-purple",
    description: "React purpose, SPA, JSX, components, Vite setup, Virtual DOM, ReactDOM, class vs functional components.",
  },
  {
    id: 3,
    title: "Props, Conditional Rendering & Lifecycle",
    emoji: "PR",
    accent: "is-orange",
    description: "Props, children, one-way flow, conditional rendering, lists, keys, prop drilling, lifecycle methods.",
  },
  {
    id: 4,
    title: "State, Hooks & Side Effects",
    emoji: "HK",
    accent: "is-green",
    description: "useState, setter behavior, direct mutation traps, useEffect dependencies, cleanup, hook rules, pure components.",
  },
  {
    id: 5,
    title: "Events, Forms & API Calls",
    emoji: "EV",
    accent: "is-teal",
    description: "Synthetic events, controlled and uncontrolled inputs, useRef, form submit, fetch, Axios, loading and errors.",
  },
  {
    id: 6,
    title: "State Management & Routing",
    emoji: "RT",
    accent: "is-gold",
    description: "Context API, Provider, Consumer, useContext, BrowserRouter, Link, useParams, Outlet, nested routes.",
  },
  {
    id: 7,
    title: "Backend & Node Foundations",
    emoji: "ND",
    accent: "is-pink",
    description: "Client-server model, Node runtime, V8, non-blocking I/O, fs, http, npm, package.json, HTTP basics.",
  },
  {
    id: 8,
    title: "Express Fundamentals",
    emoji: "EX",
    accent: "is-blue",
    description: "Express setup, routes, middleware, req-res-next, express.json, params, query, body, errors, MVC.",
  },
  {
    id: 9,
    title: "MongoDB & Mongoose",
    emoji: "DB",
    accent: "is-green",
    description: "NoSQL, documents, collections, BSON, Atlas, schemas, models, CRUD, validation, aggregation.",
  },
  {
    id: 10,
    title: "Authentication & Authorization",
    emoji: "AU",
    accent: "is-gold",
    description: "bcrypt, hashing, salting, JWT parts, stateless auth, protected routes, auth middleware, RBAC.",
  },
];

const banks = {
  1: [
    c("Execution Context", "Which context is created first when a JavaScript file starts running?", ["Function execution context", "Global execution context", "Block execution context", "Module cache context"], 1, "GEC is created before any function call.", "Global execution context", ["JavaScript first creates the global execution context.", "It has memory creation and code execution phases.", "Function execution contexts are created only when functions are called."]),
    c("Memory Phase", "During the memory creation phase, what happens to function declarations?", ["They become undefined", "They are fully stored in memory", "They are deleted", "They run immediately"], 1, "Function declarations are hoisted with their full body.", "hoisted", ["Variables are allocated memory.", "var becomes undefined initially.", "Function declarations are stored fully before execution."]),
    c("Call Stack", "What does the call stack mainly track?", ["Pending CSS rules", "Function execution order", "Database connections", "HTML node count"], 1, "The stack records which function is currently running and where to return.", "Call Stack", ["The call stack follows LIFO.", "A function is pushed when called.", "It is popped when execution finishes."]),
    c("Stack Overflow", "What causes stack overflow in JavaScript?", ["Too many CSS files", "Infinite or very deep function calls", "Using const variables", "Calling fetch once"], 1, "Recursive calls without a proper base case can overflow the stack.", "base case", ["Every recursive call consumes stack space.", "A missing base case keeps adding calls.", "The browser throws a maximum call stack error."]),
    c("Event Loop", "What is the main role of Web APIs in the JavaScript runtime environment?", ["To execute synchronous JavaScript code", "To provide background handling for timers, DOM events, and fetch", "To manage the Call Stack", "To allocate memory for variables"], 1, "Web APIs handle browser-side async work outside the call stack.", "Event Loop", ["JavaScript itself is single-threaded.", "Web APIs hold async tasks like timers and fetch.", "The event loop moves ready callbacks to the stack."]),
    c("Microtask Queue", "Which queue has priority after the call stack becomes empty?", ["Callback queue", "Microtask queue", "Render queue only", "Database queue"], 1, "Promise callbacks in the microtask queue run before timer callbacks.", "Microtask", ["Promises schedule microtasks.", "setTimeout schedules macrotasks.", "Microtasks drain before macrotasks."]),
    c("Promises", "What are the three common states of a Promise?", ["open, closed, pending", "pending, fulfilled, rejected", "start, run, stop", "true, false, null"], 1, "A Promise represents future success or failure.", "Promise", ["Pending means not completed yet.", "Fulfilled means resolved successfully.", "Rejected means failed."]),
    c("Async Await", "What does await do inside an async function?", ["Blocks the whole browser thread forever", "Pauses that async function until the Promise settles", "Deletes the Promise", "Converts JSON to HTML"], 1, "await unwraps a Promise result inside async functions.", "await", ["async functions return Promises.", "await waits for a Promise in that function.", "try-catch handles await errors."]),
    c("Explicit Coercion", "What does explicit type coercion mean in JavaScript?", ["The JS engine converting types automatically", "Manually converting a value to another type, like Number(\"5\")", "Forcing a variable to be const", "Defining strict schemas in MongoDB"], 1, "Explicit coercion is manual conversion.", "explicit", ["Number('5') is explicit conversion.", "String(10) is explicit conversion.", "It is clearer than hidden automatic conversion."]),
    c("Implicit Coercion", "What is implicit coercion?", ["Manually converting data types using Number()", "JavaScript automatically converting data types", "Using === instead of ==", "Forcing a promise to resolve"], 1, "Implicit coercion happens automatically during operations.", "implicit", ["'5' + 1 gives string behavior.", "== can trigger coercion.", "=== avoids automatic type conversion."]),
  ],
  2: [
    c("React Purpose", "What is React mainly used for?", ["Building user interfaces", "Designing database schemas", "Running Node servers", "Hashing passwords"], 0, "React is a UI library.", "UI", ["React builds component-based UIs.", "It updates the view when data changes.", "It is not a backend framework."]),
    c("Declarative React", "React is called declarative because developers describe ___ the UI should look like.", ["where", "what", "why", "how many"], 1, "Declarative code focuses on the desired result.", "declarative", ["React describes the desired UI state.", "ReactDOM handles DOM updates.", "This avoids manual DOM manipulation."]),
    c("SPA", "In a Single Page Application, what usually handles navigation after first load?", ["Full server page reloads", "Client-side routing", "MongoDB collections", "bcrypt hashing"], 1, "SPAs update views in the browser without full reloads.", "SPA", ["SPA means one HTML shell.", "JavaScript swaps views.", "React Router is commonly used."]),
    c("JSX", "What is JSX in React?", ["A database language", "HTML-like syntax inside JavaScript", "A Node package manager", "A password algorithm"], 1, "JSX is transformed into JavaScript calls.", "JSX", ["JSX looks like HTML.", "It can contain JavaScript expressions.", "Build tools compile it for the browser."]),
    c("React.createElement", "What does real React.createElement return first?", ["A plain JavaScript object", "A MongoDB document", "A CSS class only", "A server response"], 0, "React elements are lightweight object descriptions.", "object", ["React creates element descriptions.", "The Virtual DOM is object-based.", "ReactDOM turns it into DOM updates."]),
    c("Virtual DOM", "What is the Virtual DOM?", ["A lightweight representation of the UI", "A second physical monitor", "A database copy", "A CSS animation"], 0, "The Virtual DOM lets React compare UI descriptions efficiently.", "Virtual DOM", ["It is not the real browser DOM.", "It helps compute minimal updates.", "It improves reasoning about UI changes."]),
    c("Diffing", "What does React diffing compare?", ["Old and new Virtual DOM trees", "Two MongoDB collections", "Two CSS files", "Two package managers"], 0, "Diffing compares previous and next UI descriptions.", "Diffing", ["Diffing finds what changed.", "React updates only needed DOM parts.", "This avoids redrawing everything manually."]),
    c("Components", "What is the main benefit of React components?", ["Reusable UI pieces", "Automatic password encryption", "SQL joins", "Server deployment"], 0, "Components split UI into reusable parts.", "component", ["Components can be composed.", "They improve separation of concerns.", "They can receive props."]),
    c("Children Prop", "What is the purpose of the children prop in React?", ["To pass functions to child elements", "To pass elements directly inside a component's opening and closing tags", "To create arrays", "To map through lists"], 1, "children represents nested content placed between tags.", "children", ["children is a special prop.", "It supports component composition.", "It is useful for layout wrapper components."]),
    c("Vite", "Why is Vite commonly preferred for modern React setup?", ["It gives fast dev server and build tooling", "It replaces JavaScript", "It stores MongoDB data", "It signs JWT tokens"], 0, "Vite provides fast development tooling.", "Vite", ["Vite uses modern tooling.", "It provides hot module replacement.", "It is used to run and build the React app."]),
  ],
  3: [
    c("Props", "How should a child component treat props received from its parent?", ["As read-only inputs", "As database rows", "As mutable global variables", "As password hashes"], 0, "Props are owned by the parent and should not be mutated by the child.", "read-only", ["Props pass data downward.", "The receiving component should not mutate props.", "State belongs to the component that owns it."]),
    c("One-Way Flow", "What does one-way data flow mean in React?", ["Data usually moves parent to child through props", "Data randomly changes everywhere", "MongoDB sends CSS to React", "Every child edits parent props directly"], 0, "React favors predictable parent-to-child flow.", "one-way", ["One-way flow makes debugging easier.", "Parent state is passed as props.", "Children request changes through callbacks."]),
    c("Conditional AND", "How do you conditionally render a component ONLY if isLoading is true?", ["{isLoading && <Spinner />}", "if(isLoading) { <Spinner /> }", "<Spinner condition={isLoading} />", "`{isLoading}`"], 0, "Logical AND renders the right side only when the condition is truthy.", "&&", ["Use && for show-or-nothing UI.", "Use ternary for either-or UI.", "JS statements cannot be placed directly as JSX output."]),
    c("Ternary Rendering", "Which conditional rendering form is best for either Login or Logout button?", ["condition ? <Login /> : <Logout />", "condition && <Login /> && <Logout />", "<if condition />", "render.condition(Login, Logout)"], 0, "Ternary is the common JSX either-or pattern.", "ternary", ["Ternary handles two UI branches.", "&& handles show-or-hide.", "Returning null renders nothing."]),
    c("Lists", "Which array method is most commonly used in React to render a list of components?", [".filter()", ".reduce()", ".forEach()", ".map()"], 3, "map returns a new array of JSX items.", "map", ["React renders arrays of elements.", "map transforms data into components.", "forEach does not return the JSX array."]),
    c("Keys", "Why does React need a key when rendering lists?", ["To identify which items changed", "To encrypt each item", "To start Express", "To create HTTP headers"], 0, "Keys help React reconcile list items correctly.", "key", ["Keys should be stable.", "Index keys can cause UI bugs after reordering.", "Keys improve list diffing."]),
    c("Prop Drilling", "What is prop drilling?", ["Passing props through many intermediate components", "Encrypting props using bcrypt", "Converting props to JSON", "Deleting props after render"], 0, "Prop drilling happens when intermediate components only forward props.", "Prop Drilling", ["It becomes hard to maintain in deep trees.", "Context API can reduce drilling.", "Composition can also help."]),
    c("Context Solution", "Which React feature is a standard way to avoid prop drilling?", ["Context API", "express.json()", "MongoDB Atlas", "setTimeout"], 0, "Context shares values with a subtree without passing props manually.", "Context", ["Create a Context.", "Wrap components with Provider.", "Read values using useContext or Consumer."]),
    c("Lifecycle Mount", "Which lifecycle method runs after a class component is rendered for the first time?", ["componentWillMount", "componentDidMount", "componentDidUpdate", "componentWillUnmount"], 1, "componentDidMount runs after the initial render.", "componentDidMount", ["Mounting is initial insertion.", "Updating happens after state/props change.", "Unmounting is removal."]),
    c("Lifecycle Unmount", "Which lifecycle method is used for cleanup before a class component is removed?", ["componentDidUpdate", "componentWillUnmount", "render", "constructor"], 1, "componentWillUnmount is used to clean timers/subscriptions.", "componentWillUnmount", ["Cleanup prevents leaks.", "Timers should be cleared.", "Subscriptions should be removed."]),
  ],
  4: [
    c("useState Return", "What does useState return?", ["An object with state and a function", "A boolean", "An array with the current state and a function to update it", "A string"], 2, "useState returns [value, setter].", "useState", ["The first item is current state.", "The second item is the setter.", "Calling the setter schedules a re-render."]),
    c("Initial State", "What is the initial value of count if you declare const [count, setCount] = useState(10)?", ["0", "undefined", "10", "null"], 2, "The argument to useState is the initial value.", "initialValue", ["useState(10) starts with 10.", "The setter changes it later.", "Initial value is used on first render."]),
    c("Direct Mutation", "What will happen if you update the state directly like this.state.count = 1?", ["It updates and re-renders", "It throws an error", "It updates but does not trigger a re-render", "It crashes the app"], 2, "React must be notified through setState/setter functions.", "setter", ["Direct mutation is not tracked.", "Use the state setter.", "React re-renders when state updates correctly."]),
    c("Previous State", "If you have const [count, setCount] = useState(0), how do you safely increment state using previous state?", ["setCount(count + 1)", "setCount(prev => prev + 1)", "count = count + 1", "setCount(1)"], 1, "Functional updates avoid stale state problems.", "previous state", ["Use prev when the new state depends on old state.", "Never assign directly to state.", "Functional setter is safer for repeated updates."]),
    c("useEffect Role", "Which hook replaces componentDidMount and componentDidUpdate behavior in function components?", ["useMemo", "useEffect", "useContext", "useState"], 1, "useEffect handles side effects after render.", "useEffect", ["Effects run after render.", "Dependencies control re-runs.", "Cleanup handles unmount/re-run cleanup."]),
    c("Dependency Array", "What is the purpose of the dependency array in useEffect?", ["To import modules", "To control when the effect re-runs", "To list external APIs", "To define state variables"], 1, "Dependencies tell React when the effect should run again.", "dependency array", ["No array means after every render.", "Empty array means after first mount.", "Values in the array trigger re-run when changed."]),
    c("No Dependency Array", "What happens if you call useEffect without providing a dependency array at all?", ["It runs only once on mount", "It runs after every single render", "It never runs", "It throws a syntax error"], 1, "No dependency array makes the effect run after every render.", "every render", ["This can cause repeated work.", "Use dependencies intentionally.", "Avoid infinite loops from setting state every render."]),
    c("Cleanup Function", "The cleanup function inside useEffect is mainly used to ___.", ["clear timers or subscriptions", "create MongoDB schemas", "replace JSX", "install npm"], 0, "Cleanup prevents leaks from timers, listeners, and subscriptions.", "cleanup", ["Cleanup runs before effect re-runs.", "Cleanup also runs on unmount.", "Intervals should be cleared."]),
    c("Rules of Hooks", "Which is a strict rule of React Hooks?", ["Call hooks only at the top level", "Call hooks inside every if block", "Call hooks only in CSS files", "Call hooks after return"], 0, "React relies on hook call order staying stable.", "top level", ["Do not call hooks in loops.", "Do not call hooks in conditions.", "Only call hooks from React functions/custom hooks."]),
    c("Pure Components", "What does a pure component avoid when props/state have not changed?", ["Unnecessary re-rendering", "HTTP requests only", "JWT signing", "File writing"], 0, "Pure rendering avoids extra work when inputs are the same.", "pure", ["Pure components depend on props/state.", "They help performance.", "React.memo is one function-component optimization."]),
  ],
  5: [
    c("Synthetic Event", "What is a Synthetic Event in React?", ["An event triggered by an automated testing framework", "A cross-browser wrapper around the browser's native event", "A fake event created to bypass the Virtual DOM", "An event that only triggers in strict mode"], 1, "Synthetic events normalize browser event behavior.", "Synthetic Event", ["React wraps native events.", "The API is consistent across browsers.", "Handlers use names like onClick and onChange."]),
    c("onClick", "Which React prop is used for a button click handler?", ["click", "onclick", "onClick", "handle"], 2, "React event props use camelCase.", "onClick", ["React uses camelCase event names.", "Pass a function, not a string.", "Do not call the handler immediately unless intended."]),
    c("onChange", "Which event is commonly used to update state while typing in an input?", ["onChange", "onRoute", "onDatabase", "onHash"], 0, "onChange fires when form input value changes.", "onChange", ["Controlled inputs use onChange.", "The value comes from state.", "The setter updates state."]),
    c("preventDefault", "Why do we call event.preventDefault() in a React form submit handler?", ["To stop full page reload", "To delete form state", "To hash passwords", "To create routes"], 0, "It prevents the browser's default submit reload.", "preventDefault", ["Forms reload by default.", "React apps usually handle submit in JavaScript.", "Then you can call fetch or update state."]),
    c("Controlled Component", "What is a controlled component in React?", ["A component controlled by Redux", "A form element whose value is controlled by React state", "A component that has no state", "A strict mode component"], 1, "Controlled inputs use state as the source of truth.", "controlled", ["value comes from state.", "onChange updates state.", "It is useful for validation."]),
    c("Uncontrolled Component", "Which hook is commonly used to read an uncontrolled input value?", ["useRef", "useEffect", "useContext", "useMemo"], 0, "useRef can access DOM input values without state on each keystroke.", "uncontrolled", ["Uncontrolled inputs keep value in the DOM.", "Refs read the value when needed.", "Useful when real-time validation is not required."]),
    c("Fetch Default Method", "What is the default HTTP method used by the fetch() API?", ["POST", "GET", "PUT", "DELETE"], 1, "fetch uses GET unless method is specified.", "GET", ["fetch(url) makes a GET request.", "POST requires method and body.", "JSON usually needs headers."]),
    c("Fetch JSON", "Which method converts a fetch Response body into JavaScript data?", ["response.textOnly()", "response.json()", "response.parseHTML()", "response.body()"], 1, "response.json() parses a JSON response body.", "json", ["fetch returns a Response object.", "JSON parsing is asynchronous.", "await response.json() is common."]),
    c("Axios", "What is one common advantage of Axios over raw fetch?", ["It automatically parses JSON responses", "It replaces React", "It creates MongoDB schemas", "It prevents all network errors"], 0, "Axios returns parsed response data in a convenient shape.", "Axios", ["Axios is an HTTP client.", "It supports interceptors.", "It often simplifies request configuration."]),
    c("Loading State", "Why do API-driven components often keep loading state?", ["To show feedback while the request is pending", "To replace package.json", "To stop JSX compilation", "To create password salts"], 0, "Loading state improves UX during async requests.", "loading", ["Requests take time.", "Loading UI avoids blank screens.", "Error state handles failures."]),
  ],
  6: [
    c("Context API", "What problem does Context API mainly solve?", ["Passing shared data without prop drilling", "Hashing passwords", "Serving static files", "Creating HTTP methods"], 0, "Context lets a subtree access shared data.", "Context API", ["Context avoids manual prop passing.", "Provider supplies value.", "Consumers read value."]),
    c("Provider", "What does a Context Provider do?", ["Supplies a value to child components", "Deletes child routes", "Compiles JSX", "Creates bcrypt salt"], 0, "Provider makes context value available below it.", "Provider", ["Provider wraps a subtree.", "The value prop is shared.", "Nested consumers can read it."]),
    c("useContext", "Which hook reads the nearest matching context value?", ["useState", "useEffect", "useContext", "useParams"], 2, "useContext reads context inside function components.", "useContext", ["Create context first.", "Wrap with Provider.", "Read with useContext."]),
    c("BrowserRouter", "Which component commonly wraps routes in a browser React app?", ["BrowserRouter", "MongoRouter", "ExpressRouter", "HashPassword"], 0, "BrowserRouter enables client-side routing using history API.", "BrowserRouter", ["It lives near the app root.", "Routes go inside it.", "It enables Link navigation."]),
    c("Link", "Which React Router DOM component is used to prevent full page reloads when navigating?", ["<Anchor>", "<a>", "<Link>", "<Navigate>"], 2, "Link changes routes client-side.", "Link", ["<a> usually reloads the page.", "Link integrates with React Router.", "Use to prop for destination."]),
    c("SPA URL", "In SPA, what manages the URL changes?", ["The server", "The browser's default form action", "Client-side routing (e.g., React Router)", "The database"], 2, "Client-side routing swaps views without full reload.", "client-side routing", ["React Router matches paths.", "The page shell remains loaded.", "The server is not rendering every route page."]),
    c("useParams", "Which hook is used to read dynamic route params like /users/:id?", ["useParams", "useBody", "useHeader", "useJWT"], 0, "useParams reads route parameters in React Router.", "useParams", ["Dynamic segments use :id.", "useParams returns string values.", "Route params differ from query strings."]),
    c("Outlet", "What does the Outlet component do in React Router?", ["Exits the application", "Navigates back", "Renders child routes in a nested layout", "Connects to the backend"], 2, "Outlet marks where nested route content appears.", "Outlet", ["Nested routes share layout.", "Outlet renders the matched child.", "Useful for dashboards and layouts."]),
    c("useNavigate", "Which hook is used for programmatic navigation in React Router?", ["useNavigate", "useEffect", "useServer", "useModel"], 0, "useNavigate returns a navigation function.", "useNavigate", ["Call navigate('/path') in handlers.", "Use Link for normal clickable navigation.", "Programmatic navigation is useful after submit/login."]),
    c("NavLink", "What is NavLink useful for compared to Link?", ["Styling active routes", "Hashing passwords", "Parsing JSON", "Creating MongoDB indexes"], 0, "NavLink can know whether its route is active.", "NavLink", ["NavLink supports active styling.", "Link is simpler navigation.", "Both avoid full reloads."]),
  ],
  7: [
    c("Backend Role", "What is the backend mainly responsible for?", ["Server logic, APIs, database work", "Only CSS styling", "Only JSX rendering", "Only browser animations"], 0, "Backend handles server-side operations and persistence.", "backend", ["Backend receives requests.", "It talks to databases.", "It sends responses to clients."]),
    c("Client Server", "In a login flow, the client usually sends credentials to the ___.", ["server", "CSS file", "Virtual DOM", "npm cache"], 0, "The server verifies credentials and returns a response.", "server", ["Client sends HTTP request.", "Server validates data.", "Database may store user records."]),
    c("Node Runtime", "What is Node.js?", ["A JavaScript runtime outside the browser", "A React hook", "A CSS framework", "A MongoDB collection"], 0, "Node runs JavaScript on the server.", "runtime", ["Node uses V8.", "It supports backend JavaScript.", "It has core modules like fs and http."]),
    c("V8", "Which engine powers JavaScript execution in Node.js?", ["V8", "JWT", "BSON", "DOM"], 0, "Node uses Google's V8 JavaScript engine.", "V8", ["V8 executes JavaScript.", "Node adds server APIs.", "Browsers also use JS engines."]),
    c("Non Blocking", "How does Node.js handle concurrent requests despite being single-threaded?", ["It spawns a new thread for every request", "It uses an Event-Driven, Non-Blocking I/O model powered by the Event Loop", "It uses multiple CPUs by default", "It forces requests to wait in line synchronously"], 1, "Node delegates I/O and continues handling work.", "non-blocking", ["Node is event-driven.", "I/O can complete later.", "Callbacks/promises handle results."]),
    c("fs Module", "Which core module is used to work with files in Node.js?", ["fs", "http", "pathless", "bcrypt"], 0, "fs provides file system APIs.", "fs", ["fs can read files.", "fs can write files.", "Async fs methods avoid blocking."]),
    c("http Module", "Which Node.js core module allows you to create a web server without using Express?", ["web", "server", "http", "net"], 2, "http is the built-in server module.", "http", ["http.createServer creates a server.", "Express abstracts over http.", "Raw http needs more manual code."]),
    c("npm", "What does npm mainly manage in a Node project?", ["Packages and scripts", "Only CSS variables", "Only browser history", "Only JWT payloads"], 0, "npm manages dependencies and scripts.", "npm", ["package.json lists dependencies.", "node_modules stores installed packages.", "npm scripts run project commands."]),
    c("package.json", "Which file commonly stores project scripts like dev and build?", ["package.json", "index.css", "schema.sql", "token.jwt"], 0, "package.json stores metadata, scripts, and dependencies.", "package.json", ["scripts define commands.", "dependencies list packages.", "devDependencies are development-only tools."]),
    c("HTTP Status", "Which status code commonly means resource not found?", ["200", "201", "404", "500"], 2, "404 means the requested resource was not found.", "404", ["200 means OK.", "201 means created.", "500 means server error."]),
  ],
  8: [
    c("Express Purpose", "What is Express.js?", ["A minimal web framework for Node.js", "A React state hook", "A NoSQL database", "A password hash"], 0, "Express simplifies Node HTTP server and routing work.", "Express", ["Express runs on Node.", "It handles routes and middleware.", "It is commonly used for APIs."]),
    c("Basic Server", "Which method starts an Express server listening on a port?", ["app.start()", "app.listen()", "app.open()", "app.route()"], 1, "app.listen binds the server to a port.", "app.listen", ["Create app with express().", "Register middleware/routes.", "Call app.listen(port)."]),
    c("JSON Middleware", "What is the purpose of express.json() middleware?", ["To convert database objects to JSON", "To parse incoming requests with JSON payloads and populate req.body", "To send JSON responses back to the client", "To format logs"], 1, "express.json parses JSON request bodies.", "express.json", ["Register before POST routes.", "It fills req.body.", "Without it JSON body may be undefined."]),
    c("Route Params", "How do you extract the dynamic ID from the URL /users/:id in Express?", ["req.body.id", "req.query.id", "req.params.id", "req.header.id"], 2, "Route parameters live in req.params.", "req.params", ["Params come from path segments.", "Query comes after ?.", "Body comes from request payload."]),
    c("Query Params", "Where does Express store URL query values like /search?q=react?", ["req.query", "req.params", "req.body", "res.query"], 0, "Query string values are in req.query.", "req.query", ["Query values appear after ?.", "Route params are path placeholders.", "Body is request payload."]),
    c("PUT Method", "Which HTTP method is typically used to update an existing resource?", ["GET", "POST", "PUT", "DELETE"], 2, "PUT commonly replaces or updates a resource.", "PUT", ["GET reads data.", "POST creates/submits data.", "DELETE removes data."]),
    c("Middleware", "What is middleware in Express?", ["A function that runs between request and response", "A MongoDB document", "A React component", "A CSS selector"], 0, "Middleware can inspect, modify, or pass requests onward.", "middleware", ["Middleware receives req and res.", "Regular middleware can call next().", "Order matters."]),
    c("req-res-next", "In Express middleware, what does next() do?", ["Passes control to the next middleware", "Ends Node.js", "Deletes req.body", "Creates a JWT"], 0, "next continues the middleware chain.", "next", ["Without response or next, request hangs.", "next(err) jumps to error middleware.", "Middleware order is important."]),
    c("Error Middleware", "How does Express error-handling middleware differ from regular middleware?", ["It has four arguments including err", "It has no req object", "It must be placed before all routes", "It only works for GET"], 0, "Error middleware signature is (err, req, res, next).", "err", ["It should usually be after routes.", "It handles thrown/passed errors.", "It sends clean error responses."]),
    c("MVC", "In Express MVC, controllers mainly handle ___.", ["request logic and responses", "CSS animations", "password salt rounds only", "browser routing"], 0, "Controllers contain route action logic.", "Controller", ["Models represent data/schema.", "Views/responses represent output.", "Controllers connect request to model and response."]),
  ],
  9: [
    c("MongoDB Definition", "What is MongoDB?", ["A relational database", "A NoSQL, document-oriented database", "A frontend framework", "A cloud hosting service"], 1, "MongoDB stores flexible documents in collections.", "NoSQL", ["MongoDB is document-oriented.", "It stores BSON documents.", "Collections group documents."]),
    c("Collection", "In MongoDB, a group of documents is called a ___.", ["table only", "collection", "component", "route"], 1, "Collections store related documents.", "collection", ["Documents are JSON-like.", "Collections are similar to tables conceptually.", "A database can have many collections."]),
    c("Document", "A MongoDB document is closest to which format?", ["JSON-like object", "CSS stylesheet", "React Router path", "bcrypt salt only"], 0, "Documents are JSON-like key-value structures.", "document", ["Documents can contain nested objects.", "Documents can contain arrays.", "MongoDB stores BSON internally."]),
    c("BSON", "What is BSON in MongoDB?", ["Binary JSON storage format", "A React event", "An Express route", "A password algorithm"], 0, "BSON is MongoDB's binary representation of JSON-like data.", "BSON", ["BSON supports extra data types.", "MongoDB stores BSON.", "Developers often write JSON-like documents."]),
    c("NoSQL Advantage", "Why is MongoDB called schema-flexible?", ["Documents in a collection do not all need identical fields", "It has no data at all", "It only stores CSS", "It blocks all updates"], 0, "MongoDB documents can vary in shape.", "schema-flexible", ["Flexible schema helps evolving apps.", "Validation can still be added.", "Mongoose can enforce structure in Node apps."]),
    c("Atlas", "What is MongoDB Atlas commonly used for?", ["Cloud-hosted MongoDB databases", "React component styling", "Local CSS linting", "JWT decoding only"], 0, "Atlas provides managed MongoDB hosting.", "Atlas", ["Atlas hosts clusters.", "Apps connect using a connection string.", "It is useful for production databases."]),
    c("Mongoose", "What is Mongoose?", ["An ODM for MongoDB in Node.js", "A browser router", "A CSS compiler", "A password hashing algorithm"], 0, "Mongoose models MongoDB data using schemas.", "ODM", ["ODM means Object Data Modeling.", "Schemas define structure.", "Models perform CRUD."]),
    c("Schema", "In Mongoose, what does a Schema define?", ["Shape and rules for documents", "React route paths", "HTTP status names only", "CSS variables"], 0, "A schema describes fields, types, and validation.", "Schema", ["Schemas define document structure.", "Fields can have validation.", "Models are created from schemas."]),
    c("Model", "What does a Mongoose Model mainly provide?", ["Methods to create/query/update documents", "JSX fragments", "Browser click events", "JWT signatures only"], 0, "Models are used to interact with a collection.", "Model", ["Model.create inserts documents.", "Model.find reads documents.", "Models map to collections."]),
    c("CRUD", "Which MongoDB operation is used to read matching documents?", ["find()", "insertOnly()", "listen()", "render()"], 0, "find reads matching documents.", "find", ["insert creates data.", "update changes data.", "delete removes data."]),
  ],
  10: [
    c("Authentication", "What is authentication?", ["Verifying who the user is", "Checking CSS color", "Choosing a React route", "Creating a database table"], 0, "Authentication verifies identity.", "authentication", ["Login is authentication.", "Signup stores credentials.", "Password checks verify identity."]),
    c("Authorization", "What is authorization?", ["Deciding what an authenticated user can access", "Parsing JSX", "Running npm install", "Reading CSS variables"], 0, "Authorization controls permissions after identity is known.", "authorization", ["AuthN verifies identity.", "AuthZ checks access rights.", "RBAC is one authorization method."]),
    c("Plain Passwords", "Why should plain passwords never be stored?", ["Database leaks expose all passwords", "React cannot render them", "MongoDB refuses strings", "HTTP cannot send them"], 0, "Plain passwords are dangerous if the database leaks.", "plain passwords", ["Passwords must be hashed.", "Users often reuse passwords.", "Leaked plain passwords cause major risk."]),
    c("Hashing", "What does password hashing do?", ["Converts password into a one-way stored string", "Decrypts JWT payload", "Creates React components", "Starts Express server"], 0, "Hashing is one-way and used for safe storage.", "hashing", ["Hashing is not encryption.", "Original password is not stored.", "Login compares hashes."]),
    c("Salt", "Why is salt used with password hashing?", ["To make identical passwords produce different hashes", "To speed up brute force attacks", "To render JSX", "To create route params"], 0, "Salt adds randomness before hashing.", "salt", ["bcrypt includes salt.", "Same password can produce different hashes.", "This protects against precomputed attacks."]),
    c("bcrypt Compare", "How does bcrypt.compare verify a password?", ["It re-hashes the entered password with stored salt and compares", "It decrypts the stored hash", "It asks React Router", "It checks CSS classes"], 0, "bcrypt does not decrypt hashes.", "compare", ["Stored bcrypt hash contains salt info.", "Entered password is hashed again.", "Hashes are compared securely."]),
    c("JWT Stateless", "Why is JSON Web Token (JWT) considered stateless?", ["Because it requires session storage on the server", "Because the token itself contains all the information needed to authenticate the user", "Because it expires quickly", "Because it is stored in cookies"], 1, "A server can verify the token without session storage.", "stateless", ["JWT carries claims.", "Server verifies signature.", "No session row is required for basic validation."]),
    c("JWT Parts", "What are the three main parts of a JWT?", ["Header, Payload, Signature", "Route, Model, View", "HTML, CSS, JS", "Salt, Hash, Schema"], 0, "JWT format is header.payload.signature.", "Signature", ["Header describes algorithm/type.", "Payload contains claims.", "Signature detects tampering."]),
    c("Protected Route", "What does auth middleware usually check before allowing a protected route?", ["A valid token or user permission", "Only CSS font size", "React component count", "npm version"], 0, "Protected routes require a verified user or role.", "protected route", ["Middleware reads Authorization header.", "It verifies token.", "It can attach user data to req."]),
    c("RBAC", "What does RBAC use to control authorization?", ["User roles like admin or user", "CSS classes only", "Virtual DOM nodes", "Promise states"], 0, "Role-Based Access Control grants permissions by role.", "RBAC", ["Roles define permissions.", "Admin can have extra access.", "Middleware can enforce roles."]),
  ],
};

const theoryBanks = {
  1: [
    t(
      "Event Loop Order",
      "Analyze the execution order of synchronous code, Microtasks (Promises), and Macrotasks (setTimeout). Why does the Event Loop prioritize the Microtask queue?",
      [
        p("JavaScript first completes all ___ code already present on the call stack.", ["synchronous", "deferred", "hashed", "routed"], 0),
        p("Promise callbacks are placed in the ___ queue, which gets priority after the stack is empty.", ["callback", "microtask", "DOM", "HTTP"], 1),
        p("setTimeout callbacks wait in the ___ queue and run only after microtasks are drained.", ["macrotask", "schema", "state", "payload"], 0),
        p("This priority makes Promise-based updates run before timer callbacks, even when the timer delay is ___.", ["0 ms", "1 hour", "undefined", "encrypted"], 0),
      ]
    ),
    t(
      "Promise Inside setTimeout",
      "Predict the output order of a script that contains a Promise inside a setTimeout. Justify your answer using the Callback Queue logic.",
      [
        p("The outer setTimeout callback first enters the ___ queue.", ["microtask", "callback", "schema", "props"], 1),
        p("When the timer callback starts running, any Promise inside it schedules a new ___.", ["microtask", "route param", "class method", "salt"], 0),
        p("That Promise callback runs after the current timer callback finishes but before the next ___ task.", ["macrotask", "JSX", "model", "state variable"], 0),
      ]
    ),
  ],
  2: [
    t(
      "Declarative React",
      "Explain the 'Declarative' nature of React. How does it simplify the developer's job compared to Imperative DOM manipulation?",
      [
        p("React is called ___ because developers describe the desired UI result.", ["declarative", "blocking", "relational", "synchronous"], 0),
        p("In imperative DOM code, the developer manually writes ___ updates step by step.", ["DOM", "JWT", "bcrypt", "MongoDB"], 0),
        p("React compares UI descriptions and updates the real DOM through ___.", ["ReactDOM", "Express", "Mongoose", "npm"], 0),
      ]
    ),
    t(
      "Virtual DOM Diffing",
      "Describe the lifecycle of a UI update in React. How does the Virtual DOM 'Diffing' algorithm prevent unnecessary re-renders of the entire page?",
      [
        p("A state or prop change creates a new ___ DOM tree.", ["Virtual", "SQL", "HTTP", "bcrypt"], 0),
        p("React ___ compares the old tree with the new tree to find changes.", ["diffing", "hashing", "routing", "salting"], 0),
        p("Only the changed parts are committed to the ___ DOM.", ["real", "NoSQL", "payload", "callback"], 0),
      ]
    ),
  ],
  3: [
    t(
      "Props vs State",
      "Compare 'Props' and 'State' in terms of ownership. Which one is considered 'read-only' from a component's perspective and why?",
      [
        p("Props are owned by the ___ component that passes them down.", ["parent", "database", "browser", "router"], 0),
        p("From the child component's perspective, props are ___.", ["read-only", "encrypted", "global", "mutable directly"], 0),
        p("State is local memory owned and updated by the ___ itself.", ["component", "CSS file", "JWT", "server only"], 0),
      ]
    ),
    t(
      "Unidirectional Data Flow",
      "Explain the significance of 'Unidirectional Data Flow' in React. How does this pattern help in tracking data changes and debugging complex apps?",
      [
        p("In React, data commonly flows from parent to child through ___.", ["props", "bcrypt", "headers", "collections"], 0),
        p("Children request changes by calling ___ functions passed from the parent.", ["callback", "schema", "salt", "status"], 0),
        p("This one-way flow makes bugs easier to trace because the data owner is ___.", ["clear", "hidden", "random", "duplicated"], 0),
      ]
    ),
    t(
      "Conditional Rendering Techniques",
      "Discuss three different techniques for Conditional Rendering in JSX. Provide a conceptual example of when to use a Ternary Operator versus the '&&' operator.",
      [
        p("Use a ___ operator when choosing between two UI branches.", ["ternary", "spread", "delete", "hash"], 0),
        p("Use logical ___ when showing something or nothing.", ["&&", "||", "==", "++"], 0),
        p("Returning ___ is a valid way to render nothing from a component.", ["null", "404", "bcrypt", "schema"], 0),
      ]
    ),
    t(
      "Prop Drilling",
      "What is 'Prop Drilling,' and what are its disadvantages in large-scale applications? Suggest one standard React feature used to bypass this problem.",
      [
        p("Prop drilling means passing props through many ___ components.", ["intermediate", "database", "server", "hashed"], 0),
        p("It hurts maintainability because components receive props they do not actually ___.", ["use", "encrypt", "route", "compile"], 0),
        p("A standard React solution for shared data is the ___ API.", ["Context", "Fetch", "BSON", "HTTP"], 0),
      ]
    ),
  ],
  4: [
    t(
      "Rules of Hooks",
      "List the two strict rules for using React Hooks. Why does React rely on these rules to maintain the state of functional components correctly?",
      [
        p("Hooks must be called at the ___ level of a React function.", ["top", "bottom", "database", "route"], 0),
        p("Hooks should not be called inside loops, conditions, or nested ___.", ["functions", "collections", "headers", "schemas"], 0),
        p("React depends on the same hook call ___ on every render.", ["order", "URL", "password", "status"], 0),
      ]
    ),
    t(
      "useEffect Cleanup",
      "Explain the purpose of the 'Cleanup Function' within the useEffect hook. Describe a specific scenario, like interval, where omitting it causes issues.",
      [
        p("A useEffect cleanup function runs before the effect re-runs and when the component ___.", ["unmounts", "hashes", "routes", "submits"], 0),
        p("For intervals, cleanup should call ___ to stop repeated execution.", ["clearInterval", "setState", "useParams", "jwt.sign"], 0),
        p("Without cleanup, timers or subscriptions can cause memory ___.", ["leaks", "indexes", "schemas", "payloads"], 0),
      ]
    ),
  ],
  5: [
    t(
      "Controlled vs Uncontrolled Inputs",
      "Contrast 'Controlled' vs. 'Uncontrolled' input fields. In what scenario would using a 'ref' (Uncontrolled) be more beneficial than 'useState' (Controlled)?",
      [
        p("A controlled input stores its value in React ___.", ["state", "BSON", "headers", "routes"], 0),
        p("An uncontrolled input keeps its current value mainly in the ___.", ["DOM", "JWT", "server", "package.json"], 0),
        p("useRef is useful when you only need to read the value on ___ instead of every keystroke.", ["submit", "mount", "hash", "route"], 0),
      ]
    ),
    t(
      "Search Fetch with useEffect",
      "If a user is typing into a search bar, how can you use local state and a side-effect (useEffect) to fetch data from an API only when the input changes?",
      [
        p("The search text should be stored in local component ___.", ["state", "JWT", "CSS", "schema"], 0),
        p("The API call belongs inside ___ because it is a side effect.", ["useEffect", "useRef", "useParams", "Link"], 0),
        p("The search value should be placed in the dependency ___ so the effect re-runs when it changes.", ["array", "payload", "collection", "salt"], 0),
      ]
    ),
  ],
  8: [
    t(
      "req-res-next Cycle",
      "Explain the 'req-res-next' cycle. What specific role does the 'next()' function play in a multi-layered middleware application?",
      [
        p("Express middleware receives ___, res, and next.", ["req", "schema", "props", "token"], 0),
        p("The req object contains request data like params, query, body, and ___.", ["headers", "JSX", "indexes", "salt"], 0),
        p("Calling ___ passes control to the next middleware in order.", ["next()", "render()", "map()", "hash()"], 0),
      ]
    ),
    t(
      "Error Middleware",
      "How does 'Error-handling middleware' differ in signature from regular middleware? Explain why its placement at the end of the file is critical.",
      [
        p("Error-handling middleware has four parameters: err, req, res, ___.", ["next", "props", "model", "state"], 0),
        p("Its first parameter is ___, which regular middleware does not have.", ["err", "id", "key", "role"], 0),
        p("It is placed after routes so it can catch errors passed using ___.", ["next(err)", "useState()", "find()", "Link"], 0),
      ]
    ),
    t(
      "Express Server Setup",
      "Describe the steps to initialize an Express server. Include the middleware required to ensure the server can process JSON data sent in a POST request.",
      [
        p("An Express app is created by calling ___.", ["express()", "ReactDOM()", "mongoose.Schema()", "bcrypt()"], 0),
        p("To read JSON request bodies, register ___ middleware.", ["express.json()", "express.staticOnly()", "jwt.decode()", "React.memo()"], 0),
        p("The server starts accepting requests using ___.", ["app.listen()", "app.mount()", "app.hash()", "app.compile()"], 0),
      ]
    ),
    t(
      "Application vs Router Middleware",
      "Differentiate between 'Application-level' middleware and 'Router-level' middleware in Express. When should you choose one over the other?",
      [
        p("Application-level middleware is attached directly with ___.", ["app.use()", "router.find()", "useState()", "jwt.sign()"], 0),
        p("Router-level middleware is attached to an Express ___.", ["Router", "Context", "Schema only", "Virtual DOM"], 0),
        p("Choose router-level middleware when logic should apply only to a specific group of ___.", ["routes", "CSS files", "passwords", "components"], 0),
      ]
    ),
    t(
      "MVC Express Mongoose",
      "Describe the MVC architecture in the context of a Node/Express/Mongoose stack. Assign 'Mongoose Schema', 'Routes/Controllers', and 'JSON Response' to their respective MVC roles.",
      [
        p("In this stack, a Mongoose Schema/Model represents the ___.", ["Model", "View", "Controller", "Router only"], 0),
        p("Routes and controllers handle request logic, so they are the ___.", ["Controller", "Payload", "Style", "Salt"], 0),
        p("For an API, the JSON response acts like the ___ layer returned to the client.", ["View", "Hash", "Package", "Index"], 0),
      ]
    ),
    t(
      "Middleware Concept",
      "What is middleware in Express.js? Also, write an example to initialize an Express server and create basic GET and POST routes, including all required middleware to handle requests.",
      [
        p("Middleware functions run between the incoming request and outgoing ___.", ["response", "component", "schema", "promise"], 0),
        p("A basic JSON API should call app.use(___) before POST routes.", ["express.json()", "ReactDOM.render()", "bcrypt.compare()", "useContext()"], 0),
        p("GET reads resources, while POST usually ___ a new resource.", ["creates", "deletes only", "styles", "encrypts JSX"], 0),
      ]
    ),
  ],
  10: [
    t(
      "JWT Auth Flow",
      "Outline the complete journey of a JWT from a user's login request to their access of a protected route. How does the server verify the token without a session database?",
      [
        p("After login succeeds, the server creates and sends a signed ___.", ["JWT", "CSS file", "component", "collection"], 0),
        p("The client sends the token back in the Authorization header using the ___ scheme.", ["Bearer", "Basic CSS", "Router", "Schema"], 0),
        p("The server verifies the token using its secret and does not need a session ___.", ["database", "stylesheet", "DOM", "Vite"], 0),
      ]
    ),
    t(
      "JWT Parts and Signature",
      "Explain the three parts of a JSON Web Token. Why is the 'Signature' crucial for ensuring that the client hasn't tampered with the 'Payload'?",
      [
        p("A JWT is commonly written as header.payload.___.", ["signature", "schema", "component", "route"], 0),
        p("The payload stores claims such as user id, role, and ___.", ["expiry", "CSS", "JSX tag", "collection name only"], 0),
        p("The signature proves the payload was not ___ by the client.", ["tampered", "rendered", "mapped", "mounted"], 0),
      ]
    ),
  ],
};

const followUpBanks = {
  1: [
    q("What happens when a function is called in JavaScript?", ["A new function execution context is pushed onto the call stack", "The global execution context is deleted", "The microtask queue runs immediately", "The browser reloads"], 0, "Every function call creates a function execution context and pushes it onto the call stack."),
    q("What is the initial value of a var variable during memory creation?", ["null", "undefined", "0", "It is not allocated"], 1, "var declarations are hoisted and initialized as undefined."),
    q("Which order correctly describes stack behavior?", ["First In First Out", "Last In First Out", "Random access", "Priority by variable name"], 1, "The call stack follows LIFO: the last function pushed finishes first."),
    q("Why does missing a recursion base case become dangerous?", ["It keeps adding stack frames until overflow", "It converts the function to async", "It clears all variables", "It automatically returns null"], 0, "Without a base case, recursive calls continue and fill the call stack."),
    q("If console.log runs before setTimeout, why does it appear first?", ["Synchronous code runs before queued callbacks", "setTimeout deletes console.log", "Timers always run first", "Promises block console.log"], 0, "Synchronous code on the call stack completes before queued async callbacks."),
    q("Which callback runs first after the call stack becomes empty?", ["setTimeout callback", "Promise .then callback", "DOM repaint only", "HTTP response always"], 1, "Microtasks such as Promise callbacks run before macrotasks like setTimeout."),
    q("Which Promise state means the operation completed successfully?", ["pending", "fulfilled", "rejected", "blocked"], 1, "Fulfilled means the Promise resolved successfully."),
    q("Where should await be used?", ["Inside an async function", "Only inside CSS", "Only outside functions", "Inside JSON files"], 0, "await is valid inside async functions and pauses that function until the Promise settles."),
    q("Which expression is explicit coercion?", ["Number('42')", "'5' + 1", "if ('hello')", "null == undefined"], 0, "Number('42') manually converts a string to a number."),
    q("Which example best shows throttling?", ["Run search only after typing stops", "Run scroll handler at most once every 300ms", "Convert string to number", "Nest callbacks deeply"], 1, "Throttling limits how often a function can run during repeated events."),
  ],
  2: [
    q("Why is React useful in UI development?", ["It updates UI from state using components", "It replaces HTTP completely", "It stores passwords securely", "It creates MongoDB indexes"], 0, "React organizes UI into components and updates views when state changes."),
    q("What makes React declarative?", ["You describe the desired UI, not every DOM step", "You manually call appendChild everywhere", "You write SQL queries in JSX", "You disable state updates"], 0, "Declarative React describes what the UI should look like for a given state."),
    q("What is a key benefit of SPA routing?", ["Changing views without full page reload", "Removing JavaScript from the browser", "Storing all data in CSS", "Forcing every click to hit the server"], 0, "SPAs keep one page shell and swap views on the client."),
    q("Which JSX rule is correct?", ["Return one parent wrapper or fragment", "Use class instead of className always", "Write if statements directly inside JSX output", "Use for instead of htmlFor in labels"], 0, "JSX expressions must return a single parent node or fragment."),
    q("What does ReactDOM mainly do?", ["Connects React elements to the real DOM", "Hashes user passwords", "Creates Express routes", "Stores documents in MongoDB"], 0, "ReactDOM takes React's UI description and updates the browser DOM."),
    q("Why is Virtual DOM cheaper to compare than direct DOM work?", ["It is a lightweight object representation", "It is a second browser tab", "It is stored in MongoDB", "It uses bcrypt"], 0, "Virtual DOM trees are JavaScript objects that React can compare efficiently."),
    q("During reconciliation, what should React avoid?", ["Updating DOM nodes that did not change", "Using props", "Rendering components", "Using JSX"], 0, "Reconciliation tries to apply only necessary DOM updates."),
    q("What is component composition?", ["Building bigger UI by combining smaller components", "Converting strings to numbers", "Writing middleware chains", "Creating JWT signatures"], 0, "Composition means nesting and combining reusable components."),
    q("When is children most useful?", ["Creating reusable wrapper/layout components", "Reading route params", "Parsing JSON body", "Comparing passwords"], 0, "children lets a wrapper receive whatever JSX is placed between its tags."),
    q("Which command usually starts a Vite dev server?", ["npm run dev", "npm run hash", "node build.css", "mongo start react"], 0, "Vite projects commonly use npm run dev for local development."),
  ],
  3: [
    q("Which statement about props is correct?", ["Props are passed from parent to child", "Props must be mutated by the child", "Props are stored only in MongoDB", "Props replace event handlers"], 0, "Props are inputs passed down from parent components."),
    q("How should a child ask the parent to update data?", ["Call a callback prop from the parent", "Directly mutate props", "Edit the Virtual DOM manually", "Change package.json"], 0, "Children communicate upward by invoking callbacks provided by the parent."),
    q("When should you use && rendering?", ["Show a component only when a condition is true", "Choose between exactly two branches", "Create an Express server", "Read a route parameter"], 0, "&& is best for show-or-nothing conditional UI."),
    q("When should a ternary be preferred in JSX?", ["When rendering one of two alternatives", "When rendering nothing only", "When creating passwords", "When defining MongoDB schemas"], 0, "Ternary handles either-or UI branches clearly."),
    q("Why is .map() used for lists in React?", ["It returns a new array of JSX elements", "It mutates state directly", "It sends HTTP requests", "It hashes passwords"], 0, "map transforms data arrays into renderable JSX arrays."),
    q("What is a common problem with index as key?", ["Wrong UI state after reordering list items", "It prevents all rendering", "It breaks npm install", "It disables props"], 0, "Index keys are unstable when items are inserted, removed, or reordered."),
    q("What is the main pain of prop drilling?", ["Intermediate components receive props only to forward them", "The browser cannot run JavaScript", "The server cannot send JSON", "Passwords become plain text"], 0, "Prop drilling makes deep component trees harder to maintain."),
    q("Which feature can share theme/user data without passing props at every level?", ["Context API", "useParams", "express.json", "bcrypt"], 0, "Context shares values across a component subtree."),
    q("Which class lifecycle runs after updates?", ["componentDidUpdate", "componentDidMount", "componentWillUnmount", "constructor only"], 0, "componentDidUpdate runs after props or state updates render."),
    q("Which lifecycle is best for clearing subscriptions in a class component?", ["componentWillUnmount", "componentDidMount", "render", "shouldUseRouter"], 0, "componentWillUnmount is used for cleanup before removal."),
  ],
  4: [
    q("Why must state be updated with a setter?", ["React tracks setter calls and re-renders", "Setters store data in CSS", "Setters create JWT tokens", "Setters bypass React"], 0, "React schedules re-rendering when state setters are called."),
    q("What happens if setCount(count + 1) is called twice quickly in the same handler?", ["It may use stale count; functional update is safer", "It always adds 100", "It deletes state", "It turns count into a string"], 0, "Functional updates use the latest previous state."),
    q("Which dependency array makes an effect run once after mount?", ["[]", "[everyRender]", "No dependency array", "[null, null, null]"], 0, "An empty dependency array runs the effect after initial mount."),
    q("What can cause an infinite effect loop?", ["Effect sets state that is also a changing dependency", "Using JSX", "Importing React", "Writing a component name in PascalCase"], 0, "Updating a dependency inside the effect can trigger repeated re-renders."),
    q("Which side effect belongs in useEffect?", ["Fetching data from an API", "Declaring JSX only", "Returning component markup", "Choosing a file name"], 0, "API calls are side effects because they interact with external systems."),
    q("What is a cleanup function allowed to return from useEffect?", ["A function", "A JSX element", "A route path", "A MongoDB collection"], 0, "useEffect may return a cleanup function."),
    q("Why can hooks not be inside if statements?", ["React depends on the same hook order each render", "JavaScript forbids functions in if", "It breaks CSS only", "It disables npm"], 0, "Conditional hooks change call order and break state matching."),
    q("Where can a custom hook be called?", ["Inside a React component or another hook", "Inside package.json", "Inside CSS", "Inside MongoDB Compass only"], 0, "Custom hooks follow the same Rules of Hooks."),
    q("What does React.memo help avoid?", ["Re-rendering when props are unchanged", "All HTTP errors", "All state updates", "Password hashing"], 0, "React.memo can skip renders when props are the same."),
    q("Which value persists between renders without causing re-render when changed?", ["useRef().current", "local variable only", "JSX text", "route string"], 0, "Refs persist and changing ref.current does not trigger a render."),
  ],
  5: [
    q("Why does React use camelCase event names?", ["They map to React's event prop convention", "HTML forbids lowercase", "MongoDB requires it", "JWT uses it"], 0, "React event props are camelCase, such as onClick and onChange."),
    q("What is wrong with onClick={handleClick()} for a normal click handler?", ["It calls the function during render", "It never calls the function", "It converts it to CSS", "It hashes the handler"], 0, "Use onClick={handleClick} to pass the function reference."),
    q("In a controlled input, what should the value prop come from?", ["React state", "Random DOM lookup", "JWT signature", "package-lock.json"], 0, "Controlled inputs use React state as the source of truth."),
    q("When is useRef a good form choice?", ["Reading a value only on submit", "Validating each keystroke live", "Rendering route links", "Creating server middleware"], 0, "Refs suit uncontrolled fields where every keystroke need not update state."),
    q("Why use preventDefault in submit handlers?", ["To stop browser reload and handle submit in React", "To prevent state from existing", "To disable all inputs", "To parse JSON automatically"], 0, "preventDefault keeps SPA behavior during form submission."),
    q("What does fetch return first?", ["A Response object", "Already parsed JSX", "A Mongoose model", "A bcrypt hash"], 0, "fetch resolves to a Response; call response.json() to parse JSON."),
    q("What is a common fetch error-handling step?", ["Check response.ok before parsing success data", "Always ignore status codes", "Use Link instead of fetch", "Call setTimeout only"], 0, "response.ok helps detect HTTP error statuses."),
    q("Which Axios feature is useful for attaching auth headers globally?", ["Interceptors", "Fragments", "Keys", "Reducers only"], 0, "Axios interceptors can modify requests/responses globally."),
    q("Why keep error state during API calls?", ["To show a useful failure message", "To remove all loading UI", "To change database type", "To stop routing"], 0, "Error state helps users understand failed requests."),
    q("Which state pair is common for API UI?", ["loading and error", "salt and hash only", "route and schema only", "CSS and BSON"], 0, "API UIs usually track loading, data, and error states."),
  ],
  6: [
    q("Where should a Context Provider be placed?", ["Above components that need the value", "Only inside an option tag", "After every return statement", "Inside package.json"], 0, "Consumers can read only from Providers above them in the tree."),
    q("What happens if useContext is used without a matching Provider?", ["It receives the context default value", "It always crashes the app", "It creates a provider automatically", "It reads MongoDB"], 0, "Without a Provider, React uses the default context value."),
    q("Which prop supplies data from a Provider?", ["value", "data", "contextData", "payloadOnly"], 0, "Context Provider uses the value prop."),
    q("What does BrowserRouter use for clean browser URLs?", ["History API", "bcrypt", "Mongoose", "CSS variables"], 0, "BrowserRouter uses the browser history API."),
    q("Why prefer Link over a normal a tag inside SPA navigation?", ["It avoids full page reload", "It hashes passwords", "It creates a database", "It parses request body"], 0, "Link changes routes client-side."),
    q("Which hook reads /products/:id in React Router?", ["useParams", "useState", "useRef", "useEffect only"], 0, "useParams returns dynamic route parameters."),
    q("What is a nested route layout useful for?", ["Sharing UI while child routes change", "Deleting all routes", "Replacing components with CSS", "Hashing tokens"], 0, "Nested routes let parent layouts render child content via Outlet."),
    q("Where does Outlet render?", ["Where the matched child route should appear", "Inside the database", "Inside the HTTP header", "Only outside BrowserRouter"], 0, "Outlet is a placeholder for child route elements."),
    q("When is useNavigate useful?", ["Redirecting after login or form submit", "Styling active links only", "Parsing JSON body", "Creating bcrypt salt"], 0, "useNavigate performs navigation from code."),
    q("What does NavLink provide that Link does not emphasize?", ["Active route styling", "Password comparison", "MongoDB validation", "State setter batching"], 0, "NavLink can style links based on active route state."),
  ],
  7: [
    q("What does the client usually send to an API?", ["HTTP request", "React component object", "CSS animation only", "MongoDB index directly"], 0, "Clients communicate with servers through HTTP requests."),
    q("What does the server usually send back?", ["HTTP response", "JSX source file only", "npm cache", "Vite config only"], 0, "Servers process requests and return responses."),
    q("Why can Node run JavaScript outside the browser?", ["It provides a runtime built on V8", "It uses ReactDOM", "It uses CSS modules", "It requires MongoDB"], 0, "Node is a JavaScript runtime powered by V8."),
    q("Which task is I/O-bound?", ["Reading a file from disk", "Adding two numbers", "Declaring a variable", "Writing JSX"], 0, "File access is input/output work and may be handled asynchronously."),
    q("Why is non-blocking I/O important?", ["The server can keep handling other requests while waiting", "It makes all code synchronous", "It removes the event loop", "It prevents HTTP"], 0, "Non-blocking I/O improves concurrency."),
    q("Which fs method style is usually better for servers?", ["Asynchronous fs methods", "Synchronous blocking methods everywhere", "CSS-only methods", "JWT methods"], 0, "Async file operations avoid blocking the event loop."),
    q("What does http.createServer receive?", ["A request-response handler", "A React component", "A Mongo schema only", "A password salt"], 0, "Raw Node HTTP servers use a callback with req and res."),
    q("What is node_modules?", ["Folder containing installed packages", "Main source file only", "Database backup", "Browser DOM tree"], 0, "Installed npm packages live in node_modules."),
    q("What does npm install do?", ["Downloads dependencies listed for the project", "Runs React components", "Starts MongoDB Atlas", "Creates JWTs"], 0, "npm install installs dependencies."),
    q("Which status code means successful creation?", ["201", "404", "500", "301"], 0, "201 Created is commonly used after successful POST creation."),
  ],
  8: [
    q("Why use Express instead of raw http for most APIs?", ["Simpler routing and middleware", "It replaces JavaScript", "It stores all data automatically", "It removes status codes"], 0, "Express reduces boilerplate for routes, middleware, and responses."),
    q("What must happen before app.listen in a typical API?", ["Register middleware/routes", "Delete package.json", "Unmount React", "Hash all CSS"], 0, "Middleware and routes are usually configured before starting the server."),
    q("What happens if express.json() is missing for JSON POST body?", ["req.body may be undefined", "req.params stops working", "GET routes disappear", "React Router crashes"], 0, "express.json parses JSON bodies into req.body."),
    q("Which Express object is used to send JSON?", ["res.json()", "req.json()", "next.json()", "app.body()"], 0, "res.json sends a JSON response."),
    q("Which value comes from /users/42 when route is /users/:id?", ["req.params.id", "req.query.id", "req.body.id", "res.params.id"], 0, "Path parameters are stored in req.params."),
    q("Which method should not change server data?", ["GET", "POST", "PUT", "DELETE"], 0, "GET should be safe/read-only."),
    q("What causes an Express request to hang?", ["Middleware neither responds nor calls next()", "Calling res.json", "Using req.params", "Returning 404"], 0, "A middleware must end the response or pass control onward."),
    q("What does next(err) do?", ["Skips to error-handling middleware", "Starts React Router", "Deletes req.body", "Creates a model"], 0, "Passing an error to next triggers error middleware."),
    q("Why place error middleware after routes?", ["So it can catch errors from earlier route handlers", "So it runs before every import", "So it becomes a model", "So it blocks app.listen"], 0, "Error handlers should be registered after route definitions."),
    q("In MVC, where should database query logic usually be called from?", ["Controller/service layer using models", "CSS file", "React key prop", "JWT header only"], 0, "Controllers coordinate requests and use models/services for data work."),
  ],
  9: [
    q("How is a MongoDB document different from a SQL row?", ["It can contain nested objects and arrays", "It cannot store strings", "It only stores CSS", "It must be a React component"], 0, "MongoDB documents are flexible JSON-like structures."),
    q("What is a collection most similar to in SQL terms?", ["Table", "Function", "Hook", "JWT"], 0, "A collection groups related documents, roughly like a table groups rows."),
    q("Why does MongoDB use BSON internally?", ["Efficient binary storage with extra types", "To render JSX", "To hash passwords", "To route URLs"], 0, "BSON is binary JSON-like storage with more data type support."),
    q("What is a common reason to use MongoDB Atlas?", ["Managed cloud database hosting", "Local React styling", "Browser event wrapping", "Vite compilation only"], 0, "Atlas hosts MongoDB clusters in the cloud."),
    q("Why use Mongoose with Express?", ["To define schemas/models and simplify MongoDB operations", "To replace routing", "To compile JSX", "To create CSS"], 0, "Mongoose provides schemas, models, validation, and query helpers."),
    q("Which Mongoose feature enforces required fields?", ["Schema validation", "React props", "Express Router", "JWT header"], 0, "Mongoose schemas can define required fields and validators."),
    q("Which operation creates one document?", ["Model.create()", "Model.find()", "Model.listen()", "Model.render()"], 0, "Model.create inserts a new document."),
    q("Which operation updates matching documents?", ["updateOne()", "findOnly()", "listen()", "jsx()"], 0, "updateOne changes a matching document."),
    q("Which aggregation stage filters documents?", ["$match", "$groupOnly", "$render", "$route"], 0, "$match filters documents in an aggregation pipeline."),
    q("What should you never hardcode in database code?", ["Connection string credentials", "Component names", "JSX fragments", "Route labels"], 0, "Database credentials belong in environment variables."),
  ],
  10: [
    q("Which flow proves a user is who they claim to be?", ["Authentication", "Authorization", "Reconciliation", "Aggregation"], 0, "Authentication verifies identity."),
    q("Which flow decides if a logged-in user may access admin pages?", ["Authorization", "Authentication", "Diffing", "Rendering"], 0, "Authorization checks permissions."),
    q("Why is hashing one-way useful?", ["The original password cannot be recovered from the hash", "It lets React render faster", "It makes tokens never expire", "It removes salt"], 0, "Password hashes should not be reversible."),
    q("What does bcrypt store inside its hash string?", ["Salt and cost information", "React props", "Route params", "CSS variables"], 0, "bcrypt hashes include salt and cost metadata."),
    q("Why are salt rounds important?", ["They control hashing cost/slowness", "They define React route depth", "They parse JSON", "They create Mongo collections"], 0, "Higher salt rounds make brute-force attempts more expensive."),
    q("During login, what should be compared?", ["Plain entered password against stored hash using bcrypt.compare", "Two plain passwords from database", "JWT header against CSS", "Route name against model"], 0, "bcrypt.compare safely checks the entered password against the stored hash."),
    q("Where is a Bearer token commonly sent?", ["Authorization header", "CSS class", "JSX key", "package.json"], 0, "Clients commonly send JWTs as Authorization: Bearer <token>."),
    q("What does the JWT payload usually contain?", ["Claims like user id and role", "The server secret", "The bcrypt salt only", "The entire database"], 0, "Payload contains claims, not the secret."),
    q("What should protected-route middleware do after verifying a token?", ["Attach user info to req and call next()", "Delete all headers", "Render ReactDOM", "Run npm install"], 0, "Auth middleware often stores decoded user info on req for later handlers."),
    q("Which role system best matches RBAC?", ["admin/editor/user permissions", "red/green/blue CSS", "pending/fulfilled/rejected", "GET/POST/PUT"], 0, "RBAC assigns permissions based on roles."),
  ],
};

function c(topic, q, opts, ans, exp, keyword, points) {
  return {
    topic,
    q,
    opts,
    ans,
    exp,
    keyword,
    ref: {
      title: topic,
      points,
    },
  };
}

function t(topic, q, blanks) {
  return { topic, q, blanks };
}

function p(text, opts, ans) {
  return { text, opts, ans };
}

function q(text, opts, ans, exp) {
  return { q: text, opts, ans, exp };
}

function buildVariants(moduleId, concept, index) {
  const base = {
    module: moduleId,
    topic: concept.topic,
    ref: concept.ref,
  };
  const wrong = concept.opts.filter((_, optionIndex) => optionIndex !== concept.ans);
  const theorySet = theoryBanks[moduleId] || [];
  const theory = theorySet[index % theorySet.length];
  const followUp = followUpBanks[moduleId]?.[index];
  const thirdId = `m${moduleId}-q${String(index * 3 + 3).padStart(2, "0")}`;

  return [
    {
      ...base,
      id: `m${moduleId}-q${String(index * 3 + 1).padStart(2, "0")}`,
      type: "mcq",
      q: concept.q,
      opts: concept.opts,
      ans: concept.ans,
      exp: concept.exp,
    },
    {
      ...base,
      id: `m${moduleId}-q${String(index * 3 + 2).padStart(2, "0")}`,
      type: "mcq",
      q: followUp?.q || `Which option correctly applies ${concept.topic} in an exam scenario?`,
      opts: followUp?.opts || concept.opts,
      ans: followUp?.ans ?? concept.ans,
      exp: followUp?.exp || concept.exp,
    },
    theory
      ? {
          ...base,
          id: thirdId,
          topic: theory.topic,
          type: "theory",
          q: theory.q,
          blanks: theory.blanks,
          exp: "These are the 3-marker answer keywords. Learn the pointer flow, not just the option letter.",
          ref: {
            title: `${theory.topic} - 3 Mark Answer Frame`,
            points: theory.blanks.map((blank) => blank.text.replace("___", blank.opts[blank.ans])),
          },
        }
      : {
          ...base,
          id: thirdId,
          type: "mcq",
          q: `The exam answer for ${concept.topic} should focus on ___ as the key idea.`,
          opts: [concept.keyword, wrong[0], wrong[1], wrong[2]],
          ans: 0,
          exp: `${concept.keyword} is the key term to anchor this answer.`,
        },
  ];
}

export const AFD_QUIZ_QUESTIONS = Object.fromEntries(
  Object.entries(banks).map(([moduleId, concepts]) => [
    Number(moduleId),
    concepts.flatMap((concept, index) => buildVariants(Number(moduleId), concept, index)),
  ])
);

export const AFD_TOTAL_QUESTIONS = Object.values(AFD_QUIZ_QUESTIONS).reduce(
  (sum, questions) => sum + questions.length,
  0
);
