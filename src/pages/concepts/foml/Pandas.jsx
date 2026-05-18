import { forwardRef, useState } from "react";
import ExamCard from "../../../components/ExamCard";

const DF = [
  { name: "Alice", age: 25, score: 88 },
  { name: "Bob", age: 30, score: 72 },
  { name: "Charlie", age: 22, score: 95 },
  { name: "Diana", age: 28, score: 61 },
  { name: "Eve", age: 35, score: 79 },
];

export const PandasA = forwardRef((props, ref) => {
  const [filter, setFilter] = useState(0);
  const filtered = DF.filter(r => r.score >= filter);

  return (
    <div ref={ref} className="book-page concept-page">
      <div className="page-inner">
        <div className="concept-tag" style={{ background: "#16a34a" }}>FOML</div>
        <h2 className="concept-title">Pandas & DataFrames</h2>
        <p className="concept-def">
          Pandas provides <strong>DataFrames</strong> — 2D labelled data structures. Essential for loading, cleaning, and manipulating data.
        </p>

        <div className="live-demo">
          <div className="live-demo__label">DataFrame Filter: score ≥ <strong>{filter}</strong></div>
          <input type="range" min={0} max={100} step={5} value={filter}
            onChange={e => setFilter(+e.target.value)} style={{ width: "100%" }} />
          <table className="cheat-table" style={{ marginTop: "0.4rem" }}>
            <thead><tr><th>name</th><th>age</th><th>score</th></tr></thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td><td>{r.age}</td>
                  <td style={{ color: r.score >= 80 ? "#86efac" : "#fca5a5" }}>{r.score}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={3} style={{ color: "#888", textAlign: "center" }}>No rows</td></tr>}
            </tbody>
          </table>
          <p style={{ fontSize: "0.75rem", color: "#888" }}>
            df[df['score'] &gt;= {filter}] → {filtered.length} rows
          </p>
        </div>

        <h3 className="concept-subtitle" style={{ marginTop: "0.75rem" }}>iloc vs loc — The Key Difference</h3>
        <ul className="fact-list">
          <li><strong>loc</strong> — label-based: use the actual index label or column name. <code>df.loc[0, 'name']</code> gets row with label 0, column 'name'.</li>
          <li><strong>iloc</strong> — integer position-based: use 0-based integer positions like a regular array. <code>df.iloc[0, 1]</code> gets row 0, column 1.</li>
          <li><strong>When they differ:</strong> if index is [10, 20, 30], then <code>df.loc[10]</code> gets the first row but <code>df.iloc[10]</code> gets the 11th row.</li>
          <li><strong>Slicing:</strong> <code>loc</code> slices are inclusive on both ends; <code>iloc</code> slices are exclusive on the right (Python-style).</li>
        </ul>
      </div>
      <span className="page-number" style={{ left: "1rem" }}>41</span>
    </div>
  );
});
PandasA.displayName = "PandasA";

export const PandasB = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner">
      <h3 className="concept-subtitle">Pandas Cheatsheet</h3>
      <pre className="code-snippet" style={{ fontSize: "0.65rem" }}>{`import pandas as pd

df = pd.read_csv('data.csv')
df.head()           # first 5 rows
df.info()           # dtypes + nulls
df.describe()       # stats summary

# Selection
df['col']           # Series
df[['a','b']]       # multiple cols
df.loc[0]           # row by label
df.iloc[0:3]        # row by position
df[df['age'] > 25]  # filter rows

# Operations
df['col'].fillna(0)            # fill NaN
df.drop('col', axis=1)         # remove col
df.rename(columns={'a':'b'})
df.groupby('city')['score'].mean()

# Join
pd.merge(df1, df2, on='id', how='inner')`}</pre>

      <div className="exam-cards" style={{ marginTop: "0.4rem" }}>
        <ExamCard q="df.loc vs df.iloc?" a="loc: label-based indexing. iloc: integer position-based indexing." />
        <ExamCard q="How to handle missing values?" a="df.isnull().sum() to find. df.fillna(0) or df.dropna() to handle." />
        <ExamCard q="What does groupby do?" a="Groups rows by a column value, then applies aggregate function (mean, sum, count, etc.)." />
      </div>
    </div>
    <span className="page-number" style={{ right: "1rem" }}>42</span>
  </div>
));
PandasB.displayName = "PandasB";
