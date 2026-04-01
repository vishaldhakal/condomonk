"use client";
import { useState } from "react";

import ContactFormSubmit from "@/components/ContactFormSubmit";


export default function NotifyPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitbtn, setSubmitbtn] = useState("Notify Me");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    realtor: "No",
    message: "I would like to be notified of new listings.",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
    // close after short delay to let swal show
    setTimeout(() => setIsOpen(false), 500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-4 md:right-8 z-[100] flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-full shadow-lg hover:bg-gray-700 transition-all text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6a5 5 0 0 1 10 0c0 2.88.32 4.2 1.22 6"/>
        </svg>
        Notify Me of New Listings
      </button>

      {isOpen && (
        <div
          
        //className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"   
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"         

        onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          {/* <div className="bg-white w-full sm:w-[420px] rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 relative"> */}
            <div className="bg-white w-full sm:w-[420px] rounded-2xl shadow-2xl p-5 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsOpen(false)}
             className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none z-10"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Notify Me of New Listings
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Stay updated with the latest Pre Construction homes
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  required
                  value={credentials.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  id="phone"
                  value={credentials.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <input
                type="email"
                placeholder="Your email"
                id="email"
                required
                value={credentials.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <textarea
                rows={3}
                id="message"
                value={credentials.message}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
              />
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
              >
                {submitbtn}
              </button>
            </form>

            <p className="text-[10px] text-gray-400 mt-4 text-center leading-relaxed">
              By submitting this form, you give express written consent to real
              estate agents advertising on Condomonk and its authorized
              representatives to contact you via email, telephone, or text
              message.{" "}
              <a href="/privacy-policy" className="text-red-500 underline">
                Privacy Policy
              </a>{" "}
              &{" "}
              <a href="/terms" className="text-red-500 underline">
                Terms of Service
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}