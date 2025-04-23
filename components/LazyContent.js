"use client";
import { useEffect, useState, useRef } from "react";

const LazyContent = ({ html }) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" } // Load when within 200px of viewport
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={contentRef}
      className="col-12 mt-mine px-3 max-w-100 iframe-container"
    >
      {isVisible ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div
          className="lazy-content-placeholder py-5 bg-gray-50 rounded d-flex align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <div className="text-center text-gray-500">
            <div className="spinner-border text-secondary mb-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading content...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyContent;
