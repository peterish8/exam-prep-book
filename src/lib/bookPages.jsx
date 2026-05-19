import Cover from "../pages/Cover";
import InsideCover from "../pages/InsideCover";
import BackCover from "../pages/BackCover";
import Toc from "../pages/Toc";
import { PlannerA, PlannerB } from "../pages/PlannerSpread";
import { BigOA, BigOB } from "../pages/concepts/dsa/BigO";
import { RecursionA, RecursionB } from "../pages/concepts/dsa/Recursion";
import { HanoiA, HanoiB } from "../pages/concepts/dsa/Hanoi";
import { StackQA, StackQB } from "../pages/concepts/dsa/StackQ";
import { QueueA, QueueB } from "../pages/concepts/dsa/Queue";
import { TwoPointerA, TwoPointerB } from "../pages/concepts/dsa/TwoPointer";
import { TreeA, TreeB } from "../pages/concepts/dsa/Tree";
import { TraversalA, TraversalB } from "../pages/concepts/dsa/Traversal";
import { ReactCoreA, ReactCoreB } from "../pages/concepts/afd/ReactCore";
import { StatePropsA, StatePropsB } from "../pages/concepts/afd/StateProps";
import { UseEffectA, UseEffectB } from "../pages/concepts/afd/UseEffect";
import { FormsApiA, FormsApiB } from "../pages/concepts/afd/FormsApi";
import { ContextRouterA, ContextRouterB } from "../pages/concepts/afd/ContextRouter";
import { EventLoopA, EventLoopB } from "../pages/concepts/afd/EventLoop";
import { AsyncAwaitA, AsyncAwaitB } from "../pages/concepts/afd/AsyncAwait";
import { NodeExpressA, NodeExpressB } from "../pages/concepts/afd/NodeExpress";
import { AuthBcryptA, AuthBcryptB } from "../pages/concepts/afd/AuthBcrypt";
import { NumpyVectorsA, NumpyVectorsB } from "../pages/concepts/foml/NumpyVectors";
import { PandasA, PandasB } from "../pages/concepts/foml/Pandas";
import { ProbabilityA, ProbabilityB } from "../pages/concepts/foml/Probability";
import { GradientDescentA, GradientDescentB } from "../pages/concepts/foml/GradientDescent";
import { RegressionA, RegressionB } from "../pages/concepts/foml/Regression";
import { ConfusionMatrixA, ConfusionMatrixB } from "../pages/concepts/foml/ConfusionMatrix";
import { BiasVarianceA, BiasVarianceB } from "../pages/concepts/foml/BiasVariance";
import { FoundationsA, FoundationsB } from "../pages/concepts/dbms/Foundations";
import { DesignA, DesignB } from "../pages/concepts/dbms/Design";
import { NormalizationA, NormalizationB } from "../pages/concepts/dbms/Normalization";
import { SqlBasicsA, SqlBasicsB } from "../pages/concepts/dbms/SqlBasics";
import { SqlAdvancedA, SqlAdvancedB } from "../pages/concepts/dbms/SqlAdvanced";
import { RelationalTransactionsA, RelationalTransactionsB } from "../pages/concepts/dbms/RelationalTransactions";
import { MongoFoundationsA, MongoFoundationsB } from "../pages/concepts/dbms/MongoFoundations";
import { MongoCrudA, MongoCrudB } from "../pages/concepts/dbms/MongoCrud";
import { MongoPerformanceA, MongoPerformanceB } from "../pages/concepts/dbms/MongoPerformance";

export const BOOK_PAGES = [
  Cover,
  InsideCover,
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
  FoundationsA, FoundationsB,
  DesignA, DesignB,
  NormalizationA, NormalizationB,
  SqlBasicsA, SqlBasicsB,
  SqlAdvancedA, SqlAdvancedB,
  RelationalTransactionsA, RelationalTransactionsB,
  MongoFoundationsA, MongoFoundationsB,
  MongoCrudA, MongoCrudB,
  MongoPerformanceA, MongoPerformanceB,
  BackCover,
];

export const NAV_ITEMS = [
  { label: "Cover", page: 0 },
  { label: "Planner", page: 3 },
  { label: "DSA", page: 5, subj: "DSA" },
  { label: "AFD", page: 21, subj: "AFD" },
  { label: "FOML", page: 39, subj: "FOML" },
  { label: "DBMS", page: 53, subj: "DBMS" },
];
