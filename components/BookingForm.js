"use client";

import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";
import { CalendarIcon } from "lucide-react";

export default function BookingForm({
  propertyId,
  address,
  price,
  transactionType,
}) {
  const [submitBtn, setSubmitBtn] = useState("Book a Showing");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    date: "",
    realtor: "No",
    proj_name: address,
    message: "",
  });

  // Generate dates for next 14 days
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        fullDate: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        dayNum: date.getDate(),
      });
    }
    return dates;
  };

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].fullDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      date: selectedDate,
      message: formData.description,
    };
    ContactFormSubmit(submissionData, setSubmitBtn, setFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-3 sticky top-24"
      id="contactForm"
    >
      <div className="d-flex items-center justify-center">
        {" "}
        <img
          src="/shally.jpg"
          className="h-40 w-full  object-contain "
          alt="shally image"
        />
      </div>
      <h2 className="text-2xl font-extrabold mb-1 text-center ">
        Book a Showing
      </h2>
      <p className="text-gray-500 text-sm mb-3 text-center">
        Tour this home with Shally ✨
      </p>

      {/* Date Selection - Horizontal Scroll */}
      {/* <div className="mb-3">
        <div
          className="flex gap-1.5 overflow-x-auto scrolling-touch hide-scrollbar"
          style={{
            scrollbarWidth: "none",
            "-ms-overflow-style": "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {dates.map((date) => (
            <button
              key={date.fullDate}
              onClick={() => setSelectedDate(date.fullDate)}
              className={`
                flex flex-col items-center justify-center
                min-w-[3.2rem] h-14 p-1
                rounded-lg border transition-all duration-200
                ${
                  selectedDate === date.fullDate
                    ? "border-black bg-black text-white"
                    : "border-gray-100 hover:border-gray-200"
                }
              `}
            >
              <span
                className={`text-[10px] font-medium ${
                  selectedDate === date.fullDate
                    ? "text-gray-300"
                    : "text-gray-400"
                }`}
              >
                {date.day}
              </span>
              <span className="text-base font-bold leading-none">
                {date.dayNum}
              </span>
              <span
                className={`text-[10px] ${
                  selectedDate === date.fullDate
                    ? "text-gray-300"
                    : "text-gray-400"
                }`}
              >
                {date.month}
              </span>
            </button>
          ))}
        </div>
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            required
            name="name"
            placeholder="Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-black text-sm"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            required
            name="phone"
            placeholder="Phone"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-black text-sm"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <input
          type="email"
          required
          name="email"
          placeholder="Your email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-black text-sm"
          value={formData.email}
          onChange={handleChange}
        />

        <select
          name="realtor"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-black text-sm"
          value={formData.realtor}
          onChange={handleChange}
          required
        >
          <option value="No">Not working with a realtor</option>
          <option value="Yes">Working with a realtor</option>
        </select>

        <textarea
          required
          name="description"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-black min-h-[110px] resize-none text-sm"
          value={`Please send me additional information about ${address}. Thank you`}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg transition-colors text-xl"
        >
          {submitBtn}
        </button>
      </form>

      <p className="mt-2 text-[9px] text-gray-500 leading-relaxed text-center">
        I agree to receive marketing and customer service calls and text
        messages from Condomonk. Consent is not a condition of purchase.
        Msg/data rates may apply. Msg frequency varies. Reply STOP to
        unsubscribe. Privacy Policy & Terms of Service.
      </p>
    </div>
  );
}
