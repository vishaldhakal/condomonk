"use client";
import { useState, useEffect, useRef } from "react";

export default function ExpandableContent({ content, maxHeight = 400 }) {
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
    <div className="relative">
      <div
        ref={contentRef}
        className={`prose max-w-none leading-relaxed relative overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          !isExpanded ? "mask-bottom" : ""
        }`}
        style={{
          maxHeight: isExpanded
            ? `${expandedHeightRef.current}px`
            : `${maxHeight}px`,
        }}
      >
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {!isExpanded && shouldShowButton && (
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {shouldShowButton && (
        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1 h-px bg-gray-200" />
          <button
            onClick={toggleExpand}
            className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-all duration-200 ease-in-out"
          >
            {isExpanded ? (
              <span className="flex items-center gap-1">
                Read Less
                <svg
                  className="w-4 h-4 transform rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                Read More
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            )}
          </button>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}

      <style jsx>{`
        .mask-bottom {
          mask-image: linear-gradient(
            to bottom,
            black calc(100% - 80px),
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            black calc(100% - 80px),
            transparent 100%
          );
        }
      `}</style>
    </div>
  );
}
