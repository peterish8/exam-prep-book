import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import HTMLFlipBook from "react-pageflip";

const getDims = () => {
  const mobile = window.innerWidth < 768;
  return {
    w: mobile ? window.innerWidth : Math.floor(window.innerWidth / 2),
    h: window.innerHeight,
    mobile,
  };
};

const Book = forwardRef(({ children, onFlip }, ref) => {
  const flipRef = useRef(null);
  const [dims, setDims] = useState(getDims);

  useImperativeHandle(ref, () => ({
    flip: (pageIndex) => flipRef.current?.pageFlip().flip(pageIndex),
    prev: () => flipRef.current?.pageFlip().flipPrev(),
    next: () => flipRef.current?.pageFlip().flipNext(),
  }));

  useEffect(() => {
    const onResize = () => setDims(getDims());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") flipRef.current?.pageFlip().flipNext();
      if (e.key === "ArrowLeft") flipRef.current?.pageFlip().flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    let startX = 0;
    const onTouchStart = (e) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) {
        if (dx < 0) flipRef.current?.pageFlip().flipNext();
        else flipRef.current?.pageFlip().flipPrev();
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <HTMLFlipBook
      ref={flipRef}
      width={dims.w}
      height={dims.h}
      size="fixed"
      minWidth={dims.w}
      maxWidth={dims.w}
      minHeight={dims.h}
      maxHeight={dims.h}
      showCover={true}
      mobileScrollSupport={false}
      flippingTime={700}
      usePortrait={dims.mobile}
      startPage={0}
      drawShadow={true}
      useMouseEvents={false}
      onFlip={(e) => onFlip && onFlip(e.data)}
      className="flip-book"
    >
      {children}
    </HTMLFlipBook>
  );
});

Book.displayName = "Book";
export default Book;
