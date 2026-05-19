const LS_KEY = "examPrep_scores_v1";

export function saveScore(entry) {
  const all = loadAll();
  all.push({ ...entry, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` });
  all.sort((a, b) => b.pct - a.pct);
  try { localStorage.setItem(LS_KEY, JSON.stringify(all.slice(0, 200))); } catch {}
}

export function loadScores(subject) {
  const all = loadAll();
  if (!subject || subject === "ALL") return all;
  return all.filter(s => s.subject === subject);
}

function loadAll() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
}
