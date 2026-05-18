import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";
import SyntaxBlock from "../../../components/SyntaxBlock";

const DF = [
  { name: "Alice", age: 25, score: 88 },
  { name: "Bob", age: 30, score: 72 },
  { name: "Charlie", age: 22, score: 95 },
  { name: "Diana", age: 28, score: 61 },
  { name: "Eve", age: 35, score: 79 },
];

export const PandasA = forwardRef((props, ref) => {
  const [filter, setFilter] = useState(0);
  const filtered = DF.filter((r) => r.score >= filter);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#16a34a" }}>FOML</div>
        <h2 className="concept-title">Pandas & DataFrames</h2>
        <p className="concept-def">
          A <strong>DataFrame</strong> is like a smart spreadsheet inside Python. It is the main tool for loading, filtering, and cleaning tabular data.
        </p>
        <ul className="fact-list">
          <li><strong>Rows and columns:</strong> both can have labels</li>
          <li><strong>Mixed types:</strong> each column can store different data</li>
          <li><strong>Common use:</strong> CSV loading, filtering, grouping, cleaning</li>
          <li><strong>ML prep:</strong> often used before model training</li>
        </ul>

        <div className="live-demo">
          <div className="live-demo__label">DataFrame Filter: score &gt;= <strong>{filter}</strong></div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={filter}
            onChange={(e) => setFilter(+e.target.value)}
            style={{ width: "100%" }}
          />
          <table className="cheat-table" style={{ marginTop: "0.4rem" }}>
            <thead><tr><th>name</th><th>age</th><th>score</th></tr></thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.age}</td>
                  <td style={{ color: r.score >= 80 ? "#86efac" : "#fca5a5" }}>{r.score}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={3} style={{ color: "#888", textAlign: "center" }}>No rows</td></tr>}
            </tbody>
          </table>
          <p style={{ fontSize: "0.75rem", color: "#888" }}>
            df[df['score'] &gt;= {filter}] -&gt; {filtered.length} rows
          </p>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>iloc vs loc</h3>
        <p className="concept-def">
          <strong>loc</strong> uses labels. <strong>iloc</strong> uses integer positions.
        </p>
        <ul className="fact-list">
          <li><strong>loc:</strong> row and column names, or index labels</li>
          <li><strong>iloc:</strong> row and column number positions</li>
          <li><strong>loc slices:</strong> include the end label</li>
          <li><strong>iloc slices:</strong> use Python&apos;s end-exclusive rule</li>
        </ul>
        <p className="concept-def">
          They only feel the same when your labels happen to match positions.
        </p>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>42</span>
    </div>
  );
});
PandasA.displayName = "PandasA";

export const PandasB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Pandas Cheatsheet</h3>
      <SyntaxBlock language="python" title="pandas-cheatsheet.py" code={`import pandas as pd

df = pd.read_csv('data.csv')
df.head()
df.info()
df.describe()

df['col']
df[['a', 'b']]
df.loc[0]
df.iloc[0:3]
df[df['age'] > 25]

df['col'].fillna(0)
df.drop('col', axis=1)
df.rename(columns={'a': 'b'})
df.groupby('city')['score'].mean()

pd.merge(df1, df2, on='id', how='inner')`} />

      <div className="exam-cards" style={{ marginTop: "0.4rem" }}>
        <ExamCard q="df.loc vs df.iloc?" a="loc is label based. iloc is position based." />
        <ExamCard q="How to handle missing values?" a="Use isnull to inspect, then fillna or dropna to fix them." />
        <ExamCard q="What does groupby do?" a="It groups rows by a column value, then applies functions like mean, sum, or count." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>43</span>
  </div>
));
PandasB.displayName = "PandasB";
