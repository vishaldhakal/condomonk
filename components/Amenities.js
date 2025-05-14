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
        // Only match if it starts with capital 'A' in Amenities
        const amenitiesMatch = content.match(
          /Amenities(?:\s+(?:for|of|at)\s+[^:\n]+)?:(.*?)(?=(?:\s*(?:Features|Floor Plan|Deposit|About|Location|Specifications|Register Now|Contact|Call|Email|Check Out|Developer'?s?\s+Link)\b)|$)/s
        );

        if (amenitiesMatch && amenitiesMatch[1]) {
          // Clean and process the text
          const cleanText = amenitiesMatch[1]
            .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
            .replace(/&nbsp;/g, " ") // Replace HTML entities
            .replace(/\s+/g, " ") // Normalize whitespace
            .trim();

          // First check if the text contains "to be determined" or similar phrases
          const tbdPattern = /to be determined|tbd|tba|to be announced/i;
          if (tbdPattern.test(cleanText)) {
            setAmenityLines(["To be determined"]);
            return;
          }

          // Split text into amenities
          const amenities = cleanText
            .split(/(?:[•\n]|(?=[A-Z][a-z]))/) // Split on bullets, newlines, or capital letters
            .map((item) => item.trim())
            .filter((item) => {
              const trimmedItem = item.toLowerCase();
              return (
                item &&
                item.length > 1 && // At least 2 characters
                /[a-zA-Z]/.test(item) && // Contains at least one letter
                !trimmedItem.includes("check out") &&
                !trimmedItem.includes("click here") &&
                !trimmedItem.includes("learn more") &&
                !trimmedItem.includes("register") &&
                !trimmedItem.startsWith("for more") &&
                !/^https?:\/\//.test(trimmedItem) &&
                !new RegExp(`for\\s+${project_name}`, "i").test(trimmedItem)
              );
            });

          setAmenityLines(
            amenities.length > 0 ? amenities : ["To be determined"]
          );
        } else {
          // If no valid amenities section found, set as TBD
          setAmenityLines(["To be determined"]);
        }
      } catch (error) {
        console.error("Error parsing amenities:", error);
        setAmenityLines(["To be determined"]);
      }
    }
  }, [content, project_name]);

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
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-2xl md:text-3xl font-bold">Amenities</h2>
          <CustomModal
            linkText={
              <button className="text-black border border-black md:px-3 px-1 py-1.5 rounded-full text-xs font-medium hover:text-white hover:bg-black transition-colors">
                Request full package
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
            <div className="space-y-2">
              {amenityLines.map((line, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {shouldShowButton && (
          <div className="flex items-center gap-4 mt-2">
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
