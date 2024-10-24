"use client";
import { useState, useEffect, useRef } from "react";

export default function ExpandableContent({ content, maxHeight = 500 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef(null);
  const expandedHeightRef = useRef(0);
  const readMorePositionRef = useRef(0);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setShouldShowButton(scrollHeight > maxHeight);
      expandedHeightRef.current = scrollHeight;
    }
  }, [content, maxHeight]);

  const toggleExpand = () => {
    if (isExpanded) {
      // Collapse
      const currentScrollTop = window.pageYOffset;
      const contentTop =
        contentRef.current.getBoundingClientRect().top + currentScrollTop;
      const collapseDistance = expandedHeightRef.current - maxHeight;

      if (currentScrollTop > contentTop) {
        window.scrollTo({
          top: Math.max(0, currentScrollTop - collapseDistance),
          behavior: "instant",
        });
      }

      setIsExpanded(false);
    } else {
      // Expand
      readMorePositionRef.current = window.pageYOffset;
      setIsExpanded(true);
    }
  };

  return (
    <div>
      <div
        ref={contentRef}
        className={`iframe-container custom-description-container leading-8 relative overflow-hidden transition-[max-height] duration-300 ease-in-out`}
        style={{
          maxHeight: isExpanded
            ? `${expandedHeightRef.current}px`
            : `${maxHeight}px`,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {!isExpanded && shouldShowButton && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>
      {shouldShowButton && (
        <button
          onClick={toggleExpand}
          className="mt-2 text-blue-600 hover:text-blue-800 focus:outline-none transition-colors duration-300 ease-in-out font-bold"
        >
          {isExpanded ? "Read Less →" : "Read More →"}
        </button>
      )}
    </div>
  );
}
