"use client";
import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";

export default function BottomContactForm(props) {
  const [submitbtn, setSubmitbtn] = useState("Send a message");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    realtor: "No",
    message: props.defaultmessage,
    proj_name: props.proj_name,
    city: props.city,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form
        method="POST"
        className="space-y-2"
        onSubmit={(e) => handleFormSubmit(e)}
        id="contactForm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              value={credentials.name}
              onChange={(e) => handleChange(e)}
              className="w-full px-4 py-5 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={(e) => handleChange(e)}
              required={true}
              className="w-full px-4 py-5 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            />
          </div>
        </div>

        <div>
          <input
            type="email"
            aria-describedby="emailHelp"
            placeholder="Your email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-5 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          />
        </div>

        <div className="relative">
          <select
            id="realtor"
            className="w-full px-3 sm:px-4 py-4 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-xs sm:text-xs placeholder:text-xs"
            value={credentials.realtor}
            onChange={handleChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <div className="absolute top-0 left-4 -translate-y-2 px-1 bg-white">
            <span className="text-[11px] sm:text-xs text-[#6B7280]">
              Are you a realtor or working with a realtor?
            </span>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B7280]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Enter your message here"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-5 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-5 bg-black text-white rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {submitbtn}
          </button>
        </div>
      </form>

      <p className="text-center text-[9px] text-gray-500 mt-6">
        By submitting this form, you give express written consent to eXp Realty
        and its authorized representatives & homebaba agent partners to contact
        you via email, telephone, text message, and other forms of electronic
        communication, including through automated systems, AI assistants, or
        prerecorded messages. Communications may include information about real
        estate services, property listings, market updates, or promotions
        related to your inquiry or expressed interests. You may withdraw your
        consent at any time by replying “STOP” to text messages or clicking
        “unsubscribe” in emails. Message and data rates may apply. For more
        details, please review our Privacy Policy & Terms of Service.
      </p>
    </div>
  );
}
