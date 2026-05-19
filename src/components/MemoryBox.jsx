export default function MemoryBox({ title = "Quick Recall", mnemonic, items = [], accent = "#3b82f6" }) {
  return (
    <aside
      className="memory-box"
      style={{ "--memory-accent": accent }}
      aria-label={title}
    >
      <div className="memory-box__header">
        <span className="memory-box__eyebrow">Cheatsheet</span>
        <h4 className="memory-box__title">{title}</h4>
      </div>
      {mnemonic && <p className="memory-box__mnemonic">{mnemonic}</p>}
      {items.length > 0 && (
        <ul className="memory-box__list">
          {items.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
