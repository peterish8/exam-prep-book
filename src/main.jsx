import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App.jsx";
import QuizRoot from "./pages/quiz/QuizRoot.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL || "https://placeholder.convex.cloud"
);

createRoot(document.getElementById("root")).render(
  <ConvexProvider client={convex}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quiz/*" element={<QuizRoot />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  </ConvexProvider>
);
