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
    if (subject) {
      return ctx.db
        .query("scores")
        .withIndex("by_subject", (q) => q.eq("subject", subject))
        .order("desc")
        .take(30);
    }
    return ctx.db
      .query("scores")
      .withIndex("by_pct")
      .order("desc")
      .take(30);
  },
});
