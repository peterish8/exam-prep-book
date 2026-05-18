export default function ExamCard({ q, a }) {
  return (
    <details className="exam-card">
      <summary className="exam-card__q">❓ {q}</summary>
      <div className="exam-card__a">✅ {a}</div>
    </details>
  );
}
