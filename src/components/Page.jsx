import { forwardRef } from "react";

const Page = forwardRef(({ children, pageNumber, className = "" }, ref) => {
  return (
    <div ref={ref} className={`book-page ${className}`}>
      <div className="page-inner">
        {children}
      </div>
      {pageNumber !== undefined && (
        <span className="page-number">{pageNumber}</span>
      )}
    </div>
  );
});

Page.displayName = "Page";
export default Page;
