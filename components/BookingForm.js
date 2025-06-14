"use client";

import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { CalendarIcon } from "lucide-react";

export default function BookingForm({
  propertyId,
  address,
  price,
  transactionType,
}) {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setSubmitBtn("Submitting...");

    try {
      // Get the full URL for source
      const fullUrl = window.location.href;

      let form_data = new FormData();
      form_data.append("full_name", formData.name);
      form_data.append("email", formData.email);
      form_data.append("phone", formData.phone);
      form_data.append(
        "message",
        formData.description || `Showing request for ${address}`
      );
      form_data.append("realtor", formData.realtor);
      form_data.append("proj_name", address || "");
      form_data.append("source", fullUrl);

      if (formData.date) {
        form_data.append("preferred_date", formData.date);
      }

      const url = "https://admin.homebaba.ca/api/contact-form-resale-submit/";
      const response = await axios.post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
        mode: "no-cors",
      });

      setLoading(false);
      setSubmitBtn("Successfully Submitted");
      await swal(
        `Thank You, ${formData.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        description: "",
        date: "",
        realtor: "No",
        proj_name: address,
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
      setLoading(false);
      setSubmitBtn("Book a Showing");
      await swal(
        "Message Failed",
        "Cannot send your message. Please try again.",
        "error"
      );
    }
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
      <div className="flex flex-row items-center justify-center gap-x-3 mb-3 sm:mb-3">
        <div className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] relative flex-shrink-0">
          <div className="w-full h-full overflow-hidden">
            <img
              src="/angelablob.png"
              alt="Default Agent"
              className="w-full h-full object-cover rounded-full border border-gray-200 shadow-sm"
            />
          </div>
        </div>
        <div className="min-w-fit flex-1 text-left">
          <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-black leading-none text-left whitespace-nowrap mb-0">
            Book a Showing
          </h2>
          <p className="text-[8px] sm:text-xs md:text-sm text-[#2C2C2C] flex items-center text-left whitespace-nowrap">
            Tour this home with Angela
          </p>
        </div>
      </div>

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
          value={
            formData.description ||
            `Please send me additional information about ${address}. Thank you`
          }
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white font-bold py-3 rounded-lg transition-colors text-xl disabled:opacity-75"
        >
          {loading ? "Submitting..." : submitBtn}
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
