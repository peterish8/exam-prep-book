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

function buildVariants(moduleId, concept, index) {
  const base = {
    module: moduleId,
    topic: concept.topic,
    ref: concept.ref,
  };
  const right = concept.opts[concept.ans];
  const wrong = concept.opts.filter((_, optionIndex) => optionIndex !== concept.ans);

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
      q: `Which option is the correct exam statement about ${concept.topic}?`,
      opts: [
        `${right} is the correct idea.`,
        `${wrong[0]} is the correct idea.`,
        `${wrong[1]} is the correct idea.`,
        `${wrong[2]} is the correct idea.`,
      ],
      ans: 0,
      exp: concept.exp,
    },
    {
      ...base,
      id: `m${moduleId}-q${String(index * 3 + 3).padStart(2, "0")}`,
      type: "fib",
      q: `For ${concept.topic}, the missing keyword in the answer is ___.`,
      opts: [concept.keyword, wrong[0], wrong[1], wrong[2]],
      ans: 0,
      exp: `${concept.keyword} is the key term to remember for this concept.`,
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
