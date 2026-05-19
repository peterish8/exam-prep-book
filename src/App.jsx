import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Book from "./components/Book";
import MCQPanel from "./pages/MCQPanel";
import { BOOK_PAGES, NAV_ITEMS } from "./lib/bookPages";
import "./styles/book.css";

export default function App() {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showUI, setShowUI] = useState(false);
  const navigate = useNavigate();

  const jumpTo = (page) => bookRef.current?.flip(page);

  const handleDownloadPdf = () => {
    setShowUI(false);
    window.open("/print?autoprint=1", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="app-shell">
      <MCQPanel visible={currentPage === 0} />
      <div className="book-stage">
        <button className="flip-zone flip-zone--left" onClick={() => bookRef.current?.prev()} aria-label="Previous page">
          <span className="flip-zone__icon">&lt;</span>
        </button>
        <button className="flip-zone flip-zone--right" onClick={() => bookRef.current?.next()} aria-label="Next page">
          <span className="flip-zone__icon">&gt;</span>
        </button>

        <Book ref={bookRef} onFlip={setCurrentPage}>
          {BOOK_PAGES.map((PageComp, i) =>
            i === 2
              ? <PageComp key={i} onJump={jumpTo} />
              : <PageComp key={i} />
          )}
        </Book>
      </div>

      <button
        className={`ui-toggle${showUI ? " ui-toggle--open" : ""}${currentPage === 0 ? " ui-toggle--cover-mobile-hidden" : ""}`}
        onClick={() => setShowUI((s) => !s)}
        aria-label={showUI ? "Hide controls" : "Show controls"}
      >
        {showUI ? "×" : "☰"}
      </button>

      {showUI && (
        <div className="ui-overlay">
          <nav className="app-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                className="nav-btn"
                data-subj={item.subj || ""}
                onClick={() => jumpTo(item.page)}
              >
                {item.label}
              </button>
            ))}
            <button className="nav-btn nav-btn--quiz" onClick={() => { navigate("/quiz"); setShowUI(false); }}>
              Quiz ✦
            </button>
            <button className="nav-btn nav-btn--download" onClick={handleDownloadPdf}>
              Download PDF
            </button>
          </nav>
          <div className="overlay-row">
            <div className="flip-btns">
              <button className="flip-btn" onClick={() => bookRef.current?.prev()} title="Previous">&lt;</button>
              <button className="flip-btn" onClick={() => bookRef.current?.next()} title="Next">&gt;</button>
            </div>
            <span className="page-info">
              Page {currentPage + 1} / {BOOK_PAGES.length} - use arrows or tap corners to flip
            </span>
          </div>
        </div>
      )}

      <Analytics />
    </div>
  );
}
