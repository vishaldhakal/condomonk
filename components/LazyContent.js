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

  const tableStyles = {
    table: {
      borderCollapse: "collapse",
      width: "100%",
      margin: "1rem 0",
    },
    th: {
      border: "1px solid #ddd",
      padding: "8px",
      backgroundColor: "#f8f9fa",
    },
    td: {
      border: "1px solid #ddd",
      padding: "8px",
    },
  };

  return (
    <div
      ref={contentRef}
      className="col-12 mt-mine px-3 max-w-100 iframe-container"
    >
      {isVisible ? (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            ["& table"]: tableStyles.table,
            ["& th"]: tableStyles.th,
            ["& td"]: tableStyles.td,
          }}
        />
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

      <style jsx global>{`
        .iframe-container table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }

        .iframe-container th,
        .iframe-container td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        .iframe-container th {
          background-color: #f8f9fa;
        }

        .iframe-container table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .iframe-container table tr:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default LazyContent;
