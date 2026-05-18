import { useRef, useState } from "react";
import Book from "./components/Book";
import Cover from "./pages/Cover";
import BackCover from "./pages/BackCover";
import Toc from "./pages/Toc";
import { PlannerA, PlannerB } from "./pages/PlannerSpread";

// DSA
import { BigOA, BigOB } from "./pages/concepts/dsa/BigO";
import { RecursionA, RecursionB } from "./pages/concepts/dsa/Recursion";
import { HanoiA, HanoiB } from "./pages/concepts/dsa/Hanoi";
import { StackQA, StackQB } from "./pages/concepts/dsa/StackQ";
import { QueueA, QueueB } from "./pages/concepts/dsa/Queue";
import { TwoPointerA, TwoPointerB } from "./pages/concepts/dsa/TwoPointer";
import { TreeA, TreeB } from "./pages/concepts/dsa/Tree";
import { TraversalA, TraversalB } from "./pages/concepts/dsa/Traversal";

// AFD
import { ReactCoreA, ReactCoreB } from "./pages/concepts/afd/ReactCore";
import { StatePropsA, StatePropsB } from "./pages/concepts/afd/StateProps";
import { UseEffectA, UseEffectB } from "./pages/concepts/afd/UseEffect";
import { FormsApiA, FormsApiB } from "./pages/concepts/afd/FormsApi";
import { ContextRouterA, ContextRouterB } from "./pages/concepts/afd/ContextRouter";
import { EventLoopA, EventLoopB } from "./pages/concepts/afd/EventLoop";
import { AsyncAwaitA, AsyncAwaitB } from "./pages/concepts/afd/AsyncAwait";
import { NodeExpressA, NodeExpressB } from "./pages/concepts/afd/NodeExpress";
import { AuthBcryptA, AuthBcryptB } from "./pages/concepts/afd/AuthBcrypt";

// FOML
import { NumpyVectorsA, NumpyVectorsB } from "./pages/concepts/foml/NumpyVectors";
import { PandasA, PandasB } from "./pages/concepts/foml/Pandas";
import { ProbabilityA, ProbabilityB } from "./pages/concepts/foml/Probability";
import { GradientDescentA, GradientDescentB } from "./pages/concepts/foml/GradientDescent";
import { RegressionA, RegressionB } from "./pages/concepts/foml/Regression";
import { ConfusionMatrixA, ConfusionMatrixB } from "./pages/concepts/foml/ConfusionMatrix";
import { BiasVarianceA, BiasVarianceB } from "./pages/concepts/foml/BiasVariance";

// DBMS
import { SqlVsMongoA, SqlVsMongoB } from "./pages/concepts/dbms/SqlVsMongo";
import { CrudOpsA, CrudOpsB } from "./pages/concepts/dbms/CrudOps";
import { IndexShardingA, IndexShardingB } from "./pages/concepts/dbms/IndexSharding";
import { AggregationA, AggregationB } from "./pages/concepts/dbms/Aggregation";

import "./styles/book.css";

const PAGES = [
  Cover,
  Toc,
  PlannerA,
  PlannerB,
  BigOA, BigOB,
  RecursionA, RecursionB,
  HanoiA, HanoiB,
  StackQA, StackQB,
  QueueA, QueueB,
  TwoPointerA, TwoPointerB,
  TreeA, TreeB,
  TraversalA, TraversalB,
  ReactCoreA, ReactCoreB,
  StatePropsA, StatePropsB,
  UseEffectA, UseEffectB,
  FormsApiA, FormsApiB,
  ContextRouterA, ContextRouterB,
  EventLoopA, EventLoopB,
  AsyncAwaitA, AsyncAwaitB,
  NodeExpressA, NodeExpressB,
  AuthBcryptA, AuthBcryptB,
  NumpyVectorsA, NumpyVectorsB,
  PandasA, PandasB,
  ProbabilityA, ProbabilityB,
  GradientDescentA, GradientDescentB,
  RegressionA, RegressionB,
  ConfusionMatrixA, ConfusionMatrixB,
  BiasVarianceA, BiasVarianceB,
  SqlVsMongoA, SqlVsMongoB,
  CrudOpsA, CrudOpsB,
  IndexShardingA, IndexShardingB,
  AggregationA, AggregationB,
  BackCover,
];

const NAV_ITEMS = [
  { label: "Cover", page: 0 },
  { label: "Planner", page: 2 },
  { label: "DSA", page: 4, subj: "DSA" },
  { label: "AFD", page: 20, subj: "AFD" },
  { label: "FOML", page: 38, subj: "FOML" },
  { label: "DBMS", page: 52, subj: "DBMS" },
];

export default function App() {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showUI, setShowUI] = useState(false);

  const jumpTo = (page) => bookRef.current?.flip(page);

  return (
    <div className="app-shell">
      <div className="book-stage">
        <button className="flip-zone flip-zone--left" onClick={() => bookRef.current?.prev()} aria-label="Previous page">
          <span className="flip-zone__icon">‹</span>
        </button>
        <button className="flip-zone flip-zone--right" onClick={() => bookRef.current?.next()} aria-label="Next page">
          <span className="flip-zone__icon">›</span>
        </button>

        <Book ref={bookRef} onFlip={setCurrentPage}>
          {PAGES.map((PageComp, i) =>
            i === 1
              ? <PageComp key={i} onJump={jumpTo} />
              : <PageComp key={i} />
          )}
        </Book>
      </div>

      <button
        className={`ui-toggle${showUI ? " ui-toggle--open" : ""}`}
        onClick={() => setShowUI(s => !s)}
        aria-label={showUI ? "Hide controls" : "Show controls"}
      >
        {showUI ? "✕" : "☰"}
      </button>

      {showUI && (
        <div className="ui-overlay">
          <nav className="app-nav">
            {NAV_ITEMS.map(item => (
              <button key={item.label} className="nav-btn"
                data-subj={item.subj || ""}
                onClick={() => jumpTo(item.page)}>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="overlay-row">
            <div className="flip-btns">
              <button className="flip-btn" onClick={() => bookRef.current?.prev()} title="Previous (←)">‹</button>
              <button className="flip-btn" onClick={() => bookRef.current?.next()} title="Next (→)">›</button>
            </div>
            <span className="page-info">
              Page {currentPage + 1} / {PAGES.length} &nbsp;·&nbsp; ← → to flip
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
