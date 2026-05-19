import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addScore = mutation({
  args: {
    name: v.string(),
    subject: v.string(),
    correct: v.number(),
    total: v.number(),
    pct: v.number(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("scores", args);
  },
});

export const getLeaderboard = query({
  args: { subject: v.optional(v.string()) },
  handler: async (ctx, { subject }) => {
    const rows = subject
      ? await ctx.db
          .query("scores")
          .withIndex("by_subject", (q) => q.eq("subject", subject))
          .collect()
      : await ctx.db.query("scores").collect();

    return dedupeScores(rows).slice(0, 30);
  },
});

export const getScores = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("scores").collect();
    return rows.sort(compareScores);
  },
});

function dedupeScores(scores: Array<any>) {
  const bestByKey = new Map<string, any>();

  for (const score of scores) {
    const key = scoreKey(score);
    const current = bestByKey.get(key);
    if (!current || isBetterScore(score, current)) {
      bestByKey.set(key, score);
    }
  }

  return [...bestByKey.values()].sort(compareScores);
}

function compareScores(a: any, b: any) {
  return (
    b.pct - a.pct ||
    b.correct - a.correct ||
    b.total - a.total ||
    b.createdAt - a.createdAt
  );
}

function isBetterScore(candidate: any, current: any) {
  return compareScores(candidate, current) < 0;
}

function scoreKey(score: any) {
  return `${normalizeName(score.name)}::${String(score.subject || "").toUpperCase()}`;
}

function normalizeName(name: string) {
  return String(name || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}
