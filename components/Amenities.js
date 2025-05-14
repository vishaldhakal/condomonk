"use client";
import { useEffect, useState, useRef } from "react";
import CustomModal from "./Modal";

export default function Amenities({
  content,
  project_name,
  city,
  maxHeight = 400,
}) {
  const [amenityLines, setAmenityLines] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef(null);
  const expandedHeightRef = useRef(0);

  useEffect(() => {
    if (content) {
      try {
        let amenities = [];

        // Clean up the content first
        let cleanContent = content
          .replace(/<span class="ql-cursor">.*?<\/span>/g, "") // Remove ql-cursor spans
          .replace(/&nbsp;/g, " ") // Replace &nbsp; with spaces
          .replace(/\u200B/g, ""); // Remove zero-width spaces

        // Look for content between "Amenities" and the next section
        const sections = cleanContent
          .split(/<\/?(?:p|div|section)[^>]*>/g)
          .map((section) => section.trim())
          .filter((section) => section.length > 0);

        let amenitiesSection = "";
        for (let i = 0; i < sections.length; i++) {
          // Check for both "Amenities" and "Amenities:" in bold
          if (
            sections[i].includes("<strong>Amenities</strong>") ||
            sections[i].includes("<strong>Amenities:</strong>")
          ) {
            amenitiesSection = sections[i];
            // Also include the next section if it's part of the amenities list
            if (
              i + 1 < sections.length &&
              !sections[i + 1].includes("<strong>")
            ) {
              amenitiesSection += sections[i + 1];
            }
            break;
          }
        }

        if (amenitiesSection) {
          // Remove the "Amenities" header with or without colon
          amenitiesSection = amenitiesSection
            .replace(/<strong>Amenities:<\/strong>/, "")
            .replace(/<strong>Amenities<\/strong>/, "");

          // Extract list items if they exist
          const listItems = amenitiesSection.match(/<li>(.*?)<\/li>/g);
          if (listItems) {
            amenities = listItems
              .map((item) => item.replace(/<\/?li>/g, "").trim())
              .map((item) => item.replace(/<[^>]+>/g, "").trim()) // Remove any remaining HTML tags
              .filter((item) => item && item.length > 0);
          } else {
            // Split by bullet points, line breaks, or commas
            amenities = amenitiesSection
              .split(/[•\n,]/)
              .map((line) => line.replace(/<[^>]+>/g, "").trim()) // Remove any HTML tags
              .filter(
                (line) =>
                  line &&
                  line.length > 0 &&
                  !line.includes("Deposit Structure") &&
                  !line.includes("Features") &&
                  !line.includes("EXTERIOR") &&
                  !line.includes("and many more")
              );
          }
        }

        // Remove duplicates and empty strings
        amenities = [...new Set(amenities)].filter((item) => item.trim());

        setAmenityLines(
          amenities.length > 0 ? amenities : ["To be determined"]
        );
      } catch (error) {
        console.error("Error parsing amenities:", error);
        setAmenityLines(["To be determined"]);
      }
    }
  }, [content]);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setShouldShowButton(scrollHeight > maxHeight);
      expandedHeightRef.current = scrollHeight;
    }
  }, [amenityLines, maxHeight]);

  const toggleExpand = () => {
    if (isExpanded) {
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
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="pb-16">
      <div className="bg-white rounded-xl md:p-6 p-2 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold">Amenities</h2>
          <CustomModal
            linkText={
              <button className="text-black border border-black md:px-3 px-1 py-1.5 rounded-full text-xs font-medium hover:text-white hover:bg-black transition-colors inline-flex items-center gap-1">
                Request full package
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </button>
            }
            title="Request full package"
            proj_name={project_name}
            defaultmessage={`Please send me additional information for ${project_name}. Thank you`}
            city={city}
          />
        </div>
        <div className="relative">
          <div
            ref={contentRef}
            className={`relative overflow-hidden transition-[max-height] duration-300 ease-in-out`}
            style={{
              maxHeight: isExpanded
                ? `${expandedHeightRef.current}px`
                : `${maxHeight}px`,
            }}
          >
            <div className="grid grid-cols-1 gap-3">
              {amenityLines.map((line, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 transition-colors group"
                >
                  <svg
                    className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900">
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {shouldShowButton && (
          <div className="flex items-center gap-4 mt-4">
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
      </div>
    </div>
  );
}
