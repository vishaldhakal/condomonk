"use client";
import { useState } from "react";
import { formatPrice } from "@/utils/formatting";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PriceHistory({ priceHistory }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!priceHistory || priceHistory.length === 0) return null;

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm text-blue-600 "
      >
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        <span className="ml-1">See price history</span>
      </button>

      {isOpen && (
        <div className="mt-2 bg-gray-50 rounded-lg p-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="pb-2">Date</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Change</th>
              </tr>
            </thead>
            <tbody>
              {priceHistory.map((record, index) => {
                const previousPrice = priceHistory[index + 1]?.price;
                const priceChange = previousPrice
                  ? record.price - previousPrice
                  : 0;

                return (
                  <tr key={record.date} className="border-t border-gray-200">
                    <td className="py-2">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="py-2">${formatPrice(record.price)}</td>
                    <td
                      className={`py-2 ${
                        priceChange > 0
                          ? "text-red-600"
                          : priceChange < 0
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {priceChange !== 0 && (
                        <>
                          {priceChange > 0 ? "+" : ""}$
                          {formatPrice(Math.abs(priceChange))} (
                          {((priceChange / previousPrice) * 100).toFixed(1)}%)
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
