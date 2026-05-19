const LS_KEY = "examPrep_scores_v1";

export function saveScore(entry) {
  const all = loadAllRaw();
  const nextEntry = { ...entry, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` };
  const key = scoreKey(nextEntry);
  const existingIndex = all.findIndex((item) => scoreKey(item) === key);

  if (existingIndex === -1) {
    all.push(nextEntry);
  } else if (isBetterScore(nextEntry, all[existingIndex])) {
    all[existingIndex] = { ...all[existingIndex], ...nextEntry };
  }

  const merged = dedupeScores(all).slice(0, 200);
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(merged));
  } catch {}
}

export function loadScores(subject) {
  const all = dedupeScores(loadAllRaw());
  if (!subject || subject === "ALL") return all;
  return all.filter((s) => s.subject === subject);
}

export function loadRawScores(subject) {
  const all = loadAllRaw().sort(compareScores);
  if (!subject || subject === "ALL") return all;
  return all.filter((s) => s.subject === subject);
}

function loadAllRaw() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

function dedupeScores(scores) {
  const bestByKey = new Map();

  for (const score of scores) {
    const key = scoreKey(score);
    const current = bestByKey.get(key);
    if (!current || isBetterScore(score, current)) {
      bestByKey.set(key, score);
    }
  }

  return [...bestByKey.values()].sort(compareScores);
}

function compareScores(a, b) {
  return (
    b.pct - a.pct ||
    b.correct - a.correct ||
    b.total - a.total ||
    b.createdAt - a.createdAt
  );
}

function isBetterScore(candidate, current) {
  return compareScores(candidate, current) < 0;
}

function scoreKey(score) {
  return `${normalizeName(score.name)}::${String(score.subject || "").toUpperCase()}`;
}

function normalizeName(name) {
  return String(name || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}
