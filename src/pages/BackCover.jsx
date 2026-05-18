import { forwardRef } from "react";

const BackCover = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="book-page cover-page back-cover">
      <div className="cover-aura cover-aura--blue" />
      <div className="cover-grain" />
      <div className="cover-content" style={{ textAlign: "center" }}>
        <div className="back-quote">
          "The secret of getting ahead<br />is getting started."
        </div>
        <p className="back-author">— Mark Twain</p>
        <div className="back-exams">
          <div className="back-exam-pill" style={{ background: "#e63946" }}>DSA · 22 May</div>
          <div className="back-exam-pill" style={{ background: "#2563eb" }}>AFD · 25 May</div>
          <div className="back-exam-pill" style={{ background: "#16a34a" }}>FOML · 27 May</div>
          <div className="back-exam-pill" style={{ background: "#7c3aed" }}>DBMS · 29 May</div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "2rem" }}>
          You got this. 🔥
        </p>
      </div>
    </div>
  );
});

BackCover.displayName = "BackCover";
export default BackCover;
