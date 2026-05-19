import {
  Children,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import HTMLFlipBook from "react-pageflip";

const getDims = () => {
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  const mobile = viewportWidth < 768;

  return {
    w: mobile ? Math.max(320, Math.floor(viewportWidth)) : Math.floor(viewportWidth / 2),
    h: Math.floor(viewportHeight),
    mobile,
  };
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const Book = forwardRef(({ children, onFlip }, ref) => {
  const flipRef = useRef(null);
  const [dims, setDims] = useState(getDims);
  const [pageIndex, setPageIndex] = useState(0);
  const pages = useMemo(() => Children.toArray(children), [children]);

  const setMobilePage = (nextIndex) => {
    const safeIndex = clamp(nextIndex, 0, pages.length - 1);
    setPageIndex(safeIndex);
    onFlip?.(safeIndex);
  };

  const flipTo = (nextIndex) => {
    const safeIndex = clamp(nextIndex, 0, pages.length - 1);

    if (dims.mobile) {
      setMobilePage(safeIndex);
      return;
    }

    flipRef.current?.pageFlip().flip(safeIndex);
  };

  const flipPrev = () => {
    if (dims.mobile) {
      setMobilePage(pageIndex - 1);
      return;
    }

    flipRef.current?.pageFlip().flipPrev();
  };

  const flipNext = () => {
    if (dims.mobile) {
      setMobilePage(pageIndex + 1);
      return;
    }

    flipRef.current?.pageFlip().flipNext();
  };

  useImperativeHandle(ref, () => ({
    flip: flipTo,
    prev: flipPrev,
    next: flipNext,
  }));

  useEffect(() => {
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setDims(getDims()), 120);
    };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    if (!dims.mobile && flipRef.current?.pageFlip()) {
      flipRef.current.pageFlip().flip(pageIndex);
    }
  }, [dims.mobile, pageIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") flipNext();
      if (e.key === "ArrowLeft") flipPrev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    let startX = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) <= 50) return;

      if (dx < 0) flipNext();
      else flipPrev();
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  });

  if (dims.mobile) {
    return (
      <div
        className="mobile-book"
        style={{ width: `${dims.w}px`, height: `${dims.h}px` }}
      >
        {pages[pageIndex]}
      </div>
    );
  }

  return (
    <HTMLFlipBook
      key={`${dims.w}x${dims.h}`}
      ref={flipRef}
      width={dims.w}
      height={dims.h}
      size="fixed"
      minWidth={dims.w}
      maxWidth={dims.w}
      minHeight={dims.h}
      maxHeight={dims.h}
      showCover={true}
      mobileScrollSupport={true}
      flippingTime={700}
      usePortrait={false}
      startPage={pageIndex}
      drawShadow={true}
      useMouseEvents={false}
      onFlip={(e) => {
        setPageIndex(e.data);
        onFlip?.(e.data);
      }}
      className="flip-book"
    >
      {pages}
    </HTMLFlipBook>
  );
});

Book.displayName = "Book";
export default Book;
