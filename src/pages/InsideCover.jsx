import { forwardRef } from "react";

const InsideCover = forwardRef((props, ref) => (
  <div ref={ref} className="book-page concept-page concept-page--right">
    <div className="page-inner inside-cover">
      <div className="cover-badge">Inside Cover</div>
      <h2 className="concept-title">How To Read This Book</h2>
      <p className="concept-def">
        Each topic is designed as a full <strong>left + right spread</strong>.
        The idea starts on the left page and continues naturally on the right.
      </p>
      <ul className="fact-list">
        <li><strong>Left page:</strong> concept, story, and core intuition</li>
        <li><strong>Right page:</strong> dry run, code, examples, and quick checks</li>
        <li><strong>Short style:</strong> read the bold words first, then the flow</li>
        <li><strong>Interactive parts:</strong> move sliders, step buttons, and demos slowly</li>
      </ul>
      <p className="concept-def">
        This extra page keeps all concept spreads aligned properly, so one topic
        opens across both visible pages instead of breaking awkwardly between flips.
      </p>
    </div>
  </div>
));

InsideCover.displayName = "InsideCover";
export default InsideCover;
