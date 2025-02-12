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
    name: "",
    email: "",
    phone: "",
    description: "",
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
      <h2 className="text-2xl font-bold mb-0">Schedule tour</h2>
      <p className="text-gray-600 mb-6">Tour with a local buyer's agent</p>

      {/* Date Selection */}
      <div className="flex gap-2 mb-2 overflow-x-auto ">
        {dates.map((date, index) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`flex-shrink-0 p-3 rounded-lg border ${
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

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Name and Phone on same row */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            required
            placeholder="Name"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="tel"
            required
            placeholder="Phone"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        {/* Email Input */}
        <input
          type="email"
          required
          placeholder="Your email"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        {/* Description Textarea */}
        <textarea
          required
          placeholder={`Please send me additional information about ${address}. Thank you`}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none text-sm"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Request tour
        </button>
      </form>

      {/* Terms Text */}
      <p className="mt-4 text-[10px] text-gray-500 leading-relaxed">
        I agree to receive marketing and customer service calls and text
        messages from Condomonk. Consent is not a condition of purchase.
        Msg/data rates may apply. Msg frequency varies. Reply STOP to
        unsubscribe. Privacy Policy & Terms of Service.
      </p>
    </div>
  );
}
