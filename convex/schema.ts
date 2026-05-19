import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  scores: defineTable({
    name: v.string(),
    subject: v.string(),
    correct: v.number(),
    total: v.number(),
    pct: v.number(),
    createdAt: v.number(),
  })
    .index("by_subject", ["subject"])
    .index("by_pct", ["pct"]),
});
