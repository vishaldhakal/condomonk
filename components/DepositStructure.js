"use client";
import { useEffect, useState, useRef } from "react";
import CustomModal from "./Modal";

export default function DepositStructure({
  content,
  project_name,
  city,
  maxHeight = 300,
}) {
  const [depositStructure, setDepositStructure] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef(null);
  const expandedHeightRef = useRef(0);

  useEffect(() => {
    if (content) {
      try {
        // Try to find the deposit structure section
        const findDepositSection = (text) => {
          // First pattern: Look for content between "Deposit Structure" (including misspelled versions) and any ending marker
          const depositSection = text.match(
            /(?:depos[ie]te?\s+structures?|payment\s+schedule)(?:\s+(?:for|of)\s+[^:\n]+)?:?(.*?)(?=(?:\s*(?:register(?:\s+now|today)?|be\s+among|don't\s+miss|amenities|features|floor plan|about|location|specifications|contact|call|email|check out)\b)|$)/is
          );

          if (depositSection) {
            const sectionText = depositSection[1].trim();

            // Split into lines and filter out non-deposit related content
            const lines = sectionText.split("\n").filter((line) => {
              const trimmedLine = line.trim().toLowerCase();

              // Skip empty lines and non-deposit related content
              if (
                !trimmedLine ||
                trimmedLine.includes("check out") ||
                trimmedLine.includes("click here") ||
                trimmedLine.includes("learn more") ||
                trimmedLine.startsWith("register") ||
                trimmedLine.startsWith("for more") ||
                /^https?:\/\//.test(trimmedLine) ||
                new RegExp(`for\\s+${project_name}`, "i").test(trimmedLine)
              ) {
                return false;
              }

              return (
                // Match section headers (ending with colon)
                /^[^:]+:$/.test(trimmedLine) ||
                // Match lines with dollar amounts, percentage, or bank draft
                /(?:\$[\d,.]+|\d+%|bank\s+draft)/i.test(trimmedLine) ||
                // Match lines with "Total" or "Extended Deposit"
                /(?:total|extended\s+deposit)/i.test(trimmedLine) ||
                // Match lines with payment schedules or specific terms
                /(?:(?:at\s+)?time\s+of\s+signing|with\s+offer|offer|days?|deposit|in\s+\d+|upon\s+(?:signing|firm)|agreement|purchase|sale|occupancy|top\s+up|balance|on\s+[a-z]+\s+\d+,\s+\d{4}|(?:in|at)\s+\d+(?:\s*,\s*\d+)*\s*days?)/i.test(
                  trimmedLine
                ) ||
                // Match lines with specific deposit amounts
                /(?:\d+,\d+|\d+k|\d+K|\$\d+(?:,\d+)?(?:\s*(?:at|in|on)\s+\w+)?)/i.test(
                  trimmedLine
                )
              );
            });

            // Find the last line with relevant content
            let lastRelevantLineIndex = lines.length - 1;
            for (let i = lines.length - 1; i >= 0; i--) {
              const line = lines[i].toLowerCase();
              if (
                /(?:\$[\d,.]+|\d+%|deposit|occupancy|days|k\b|K\b)/i.test(
                  line
                ) ||
                line.includes("total") ||
                line.endsWith(":")
              ) {
                lastRelevantLineIndex = i;
                break;
              }
            }

            // Only keep lines up to the last relevant line
            const relevantLines = lines.slice(0, lastRelevantLineIndex + 1);

            if (relevantLines.length > 0) {
              return relevantLines.join("\n");
            }
          }
          return null;
        };

        const extractedContent = findDepositSection(content);

        if (extractedContent) {
          // Format the content
          let formattedContent = extractedContent;

          // Clean up any leading/trailing whitespace and remove empty lines at the start
          formattedContent = formattedContent
            .trim()
            .replace(/^(\s*\n\s*)+/, "");

          // If the content doesn't start with <p>, wrap it
          if (!formattedContent.startsWith("<p")) {
            formattedContent = `<p>${formattedContent}</p>`;
          }

          // Format the content to preserve line breaks and highlight amounts
          formattedContent = formattedContent
            .replace(/\n/g, "<br/>")
            // Remove the bold formatting for section headers
            .replace(/^([^:]+):/gm, "$1:")
            // Remove the bold formatting for dollar amounts and percentages
            .replace(/(?:\$[\d,.]+|\d+%)/g, "$&")
            // Remove extra spaces in numbers
            .replace(/(?<=\d[,.])\s*(?=\d{3})/g, "")
            // Clean up multiple line breaks
            .replace(/(<br\/>){2,}/g, "<br/>")
            // Add spacing after colons without bold
            .replace(/:/g, ":<br/>");

          setDepositStructure(formattedContent);
        }
      } catch (error) {
        console.error("Error parsing deposit structure:", error);
      }
    }
  }, [content, project_name]);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setShouldShowButton(scrollHeight > maxHeight);
      expandedHeightRef.current = scrollHeight;
    }
  }, [depositStructure, maxHeight]);

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
    }
    setIsExpanded(!isExpanded);
  };

  if (!depositStructure) return null;

  return (
    <div className="pb-20">
      <div className="bg-white rounded-xl md:p-6 p-2 shadow-sm">
        <div className="flex items-center gap-4 mb-0">
          <h2 className="text-2xl md:text-3xl font-bold">Deposit Structure</h2>
          <CustomModal
            linkText={
              <button className="text-black border border-black md:px-3 px-1 py-1.5 rounded-full text-xs font-medium hover:text-white hover:bg-black transition-colors inline-flex items-center gap-1">
                Request Deposit Info
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
            title="Request deposit info"
            proj_name={project_name}
            defaultmessage={`Please send me deposit structure of ${project_name}. Thank you`}
            city={city}
          />
        </div>
        <div className="relative">
          <div
            ref={contentRef}
            className={`prose max-w-none text-gray-600 relative overflow-hidden transition-[max-height] duration-300 ease-in-out [&>p]:mt-0 [&>p]:mb-4 ${
              !isExpanded && shouldShowButton ? "mask-bottom" : ""
            }`}
            style={{
              maxHeight: isExpanded
                ? `${expandedHeightRef.current}px`
                : `${maxHeight}px`,
            }}
            dangerouslySetInnerHTML={{ __html: depositStructure }}
          />
          {!isExpanded && shouldShowButton && (
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        {shouldShowButton && (
          <div className="flex items-center gap-4 mt-0">
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

        <p className="text-xs text-gray-500 mt-4">
          Note: Deposit structure may vary. Please contact us for the most
          up-to-date information.
        </p>
      </div>

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
