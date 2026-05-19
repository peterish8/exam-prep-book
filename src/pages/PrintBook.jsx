import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BOOK_PAGES } from "../lib/bookPages";
import "../styles/book.css";

export default function PrintBook() {
  const [params] = useSearchParams();
  const autoPrint = params.get("autoprint") === "1";

  const exportPages = useMemo(
    () =>
      BOOK_PAGES.map((PageComp, i) => ({
        key: `export-${i}`,
        element: i === 2 ? <PageComp onJump={() => {}} /> : <PageComp />,
      })),
    []
  );

  useEffect(() => {
    if (!autoPrint) return undefined;

    const timer = window.setTimeout(() => {
      window.print();
    }, 350);

    return () => window.clearTimeout(timer);
  }, [autoPrint]);

  return (
    <div className="print-route">
      <div className="print-route__bar">
        <button className="print-route__btn" onClick={() => window.print()}>
          Save as PDF
        </button>
        <span className="print-route__hint">
          Turn off browser headers/footers for a clean export.
        </span>
      </div>

      <main className="print-route__pages">
        {exportPages.map((page) => (
          <section key={page.key} className="export-entry">
            {page.element}
          </section>
        ))}
      </main>
    </div>
  );
}
