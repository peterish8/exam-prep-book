import { forwardRef } from "react";
import { schedule } from "../data/schedule";

const subjectColors = {
  DSA: "#e63946",
  AFD: "#2563eb",
  FOML: "#16a34a",
  DBMS: "#7c3aed",
};

function DayCard({ day }) {
  const color = subjectColors[day.subject.replace(" EXAM", "")] || "#888";
  const isExam = day.type === "exam";
  return (
    <div className={`day-card ${isExam ? "day-card--exam" : ""}`} style={{ "--accent": color }}>
      <div className="day-card__header">
        <span className="day-card__date">{day.date}</span>
        <span className="day-card__subject" style={{ background: color }}>{day.subject}</span>
      </div>
      {day.sessions.map((s, i) => (
        <div key={i} className="day-card__session">
          <span className="session-time">{s.time}</span>
          <span className="session-task">{s.task}</span>
        </div>
      ))}
    </div>
  );
}

// Page A: DSA days (19–22), 18 May already done
export const PlannerA = forwardRef((props, ref) => (
  <div ref={ref} className="book-page planner-page">
    <div className="page-inner">
      <div className="planner-header">
        <div className="planner-tag" style={{ background: "#e63946" }}>DSA PHASE</div>
        <h2 className="planner-title">19 – 22 May 2026</h2>
      </div>
      <div className="planner-days">
        {schedule.slice(1, 5).map((d, i) => <DayCard key={i} day={d} />)}
      </div>
    </div>
    <span className="page-number" style={{ left: "1rem" }}>3</span>
  </div>
));
PlannerA.displayName = "PlannerA";

// Page B: AFD + FOML + DBMS days (23–29)
export const PlannerB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page planner-page">
    <div className="page-inner">
      <div className="planner-header">
        <div className="planner-tag" style={{ background: "#2563eb" }}>AFD · FOML · DBMS</div>
        <h2 className="planner-title">23 – 29 May 2026</h2>
      </div>
      <div className="planner-days">
        {schedule.slice(5).map((d, i) => <DayCard key={i} day={d} />)}
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>4</span>
  </div>
));
PlannerB.displayName = "PlannerB";
