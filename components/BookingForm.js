"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

export default function BookingForm({
  propertyId,
  address,
  price,
  transactionType,
}) {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    date: "",
    isVeteran: false,
  });

  const [selectedDate, setSelectedDate] = useState("Feb 11"); // Default date
  const dates = ["Feb 11", "Feb 12", "Feb 13", "Feb 14"]; // Example dates

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <h2 className="text-2xl font-bold mb-4">Schedule tour</h2>
      <p className="text-gray-600 mb-6">Tour with a local buyer's agent</p>

      {/* Date Selection */}
      <div className="flex gap-2 mb-2 overflow-x-auto">
        {dates.map((date, index) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`flex-shrink-0 p-4 rounded-lg border ${
              selectedDate === date
                ? "bg-black text-white"
                : "bg-white text-black"
            } ${index === dates.length - 1 ? "" : ""}`}
          >
            <div className="text-sm">{date.split(" ")[0]}</div>
            <div className="font-bold">{date.split(" ")[1]}</div>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            required
            placeholder="Email*"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* Phone Input */}
        <div>
          <input
            type="tel"
            required
            placeholder="Phone*"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        {/* Veteran Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="veteran"
            className="w-4 h-4 rounded border-gray-300"
            checked={formData.isVeteran}
            onChange={(e) =>
              setFormData({ ...formData, isVeteran: e.target.checked })
            }
          />
          <label htmlFor="veteran" className="flex items-center gap-1">
            I've served in the U.S. military
            <span className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Request tour
        </button>
      </form>

      {/* Terms Text */}
      <p className="mt-4 text-xs text-gray-500 leading-relaxed">
        By proceeding, you consent to receive calls and texts at the number you
        provided, including marketing by autodialer and prerecorded and
        artificial voice, and email, from realtor.com and{" "}
        <button className="text-gray-700 underline">others</button> about your
        inquiry and other home-related matters.{" "}
        <button className="text-gray-700 underline">More...</button>
      </p>
    </div>
  );
}
