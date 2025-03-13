"use client";
import { useState } from "react";

export default function PriceHistoryButton({ priceHistory }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <button
        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        onClick={toggleExpand}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        See price history
      </button>

      {isExpanded && (
        <div className="mt-3 w-full bg-gray-50 rounded-lg p-4">
          <table className="w-full text-sm">
            <thead className="text-gray-600">
              <tr>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Change</th>
              </tr>
            </thead>
            <tbody>
              {priceHistory.map((record, index) => {
                const nextRecord = priceHistory[index + 1];
                const change = nextRecord ? record.price - nextRecord.price : 0;
                const changePercent = nextRecord
                  ? ((change / nextRecord.price) * 100).toFixed(1)
                  : 0;

                return (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="py-2">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="py-2">${record.price.toLocaleString()}</td>
                    <td
                      className={`py-2 ${
                        change > 0
                          ? "text-red-600"
                          : change < 0
                          ? "text-green-600"
                          : ""
                      }`}
                    >
                      {change !== 0 && (
                        <>
                          ${Math.abs(change).toLocaleString()} ({changePercent}
                          %)
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
