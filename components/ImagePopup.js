// components/ImagePopup.js
"use client";
import { useState, useEffect } from "react";
import ContactFormDisclaimer from "./ContactFormDisclaimer";
import { formatPhoneNumber, handlePhoneKeyDown } from "@/utils/phoneUtils";
import { openLeadFollowUp } from "@/helpers/leadFollowUp";

const ImagePopup = ({ cityName, popupData, showPopup, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitBtn] = useState("Submit Inquiry");
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload image when popup data changes
  useEffect(() => {
    if (popupData && popupData.image) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true); // Still show popup even if image fails
      img.src = popupData.image;
    }
  }, [popupData]);

  // While open: lock page scroll behind the popup and close on Escape
  useEffect(() => {
    if (!popupData || !showPopup) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key !== "Escape") return;
      setShowForm(false);
      if (onClose) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupData, showPopup, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "phone" ? formatPhoneNumber(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleImageClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullUrl =
      typeof window !== "undefined" ? window.location.href : "no-url-captured";

    // Close the popup immediately to prevent backdrop stacking
    if (onClose) {
      onClose({ submitted: true });
    }
    setShowForm(false);

    // Sent once by the Quick Preferences popup (with answers, or without on dismiss)
    openLeadFollowUp({
      userName: formData.name || "",
      inquiry: {
        endpoint: "https://admin.homebaba.ca/api/image-popup-submit/",
        name: formData.name || "",
        email: formData.email,
        phone: formData.phone,
        message:
          formData.message ||
          `[IMAGE POPUP INQUIRY] I would like to get more information about the property in ${cityName}. Please contact me with details. This inquiry was submitted through the image popup on your website.`,
        realtor: "No",
        source: `${fullUrl} - Image Popup (${cityName})`,
        extraFields: {
          image_popup_id: popupData.id || "",
        },
      },
    });

    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const closePopup = () => {
    setShowForm(false);
    if (onClose) {
      onClose();
    }
  };

  const goBackToImage = () => {
    setShowForm(false);
  };

  if (!popupData || !showPopup || !imageLoaded) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
        onClick={closePopup}
      >
        <div
          className="relative rounded-xl shadow-2xl w-fit overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 z-20 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Back Button for Form */}
          {showForm && (
            <button
              onClick={goBackToImage}
              className="absolute top-4 left-4 z-20 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {!showForm ? (
            <div className="cursor-pointer" onClick={handleImageClick}>
              {popupData.image && (
                <img
                  src={popupData.image}
                  alt={
                    popupData.image_alt_description || `Property in ${cityName}`
                  }
                  className="w-fit h-auto max-h-[80vh] object-contain rounded-xl"
                  loading="eager"
                  decoding="sync"
                  style={{ imageRendering: "auto" }}
                />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white max-w-3xl rounded-xl">
              {/* Left: Form */}
              <div className="flex flex-col justify-start overflow-y-auto mt-16 p-8">
                <h2 className="text-3xl font-bold mb-4">
                  Submit Your Interest
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none text-sm placeholder:text-xs"
                    />
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9\s\(\)\-]+"
                      maxLength={14}
                      name="phone"
                      placeholder="(416) 555-1234"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onKeyDown={handlePhoneKeyDown}
                      className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none text-sm placeholder:text-xs"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none text-sm placeholder:text-xs"
                  />

                  <textarea
                    name="message"
                    placeholder="Message (optional)"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none resize-none text-sm placeholder:text-xs"
                  >
                    Please
                  </textarea>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-slate-800 text-white py-3 rounded-xl text-base font-bold transition duration-200 shadow-large disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitBtn}
                  </button>
                </form>

                <div className="mt-4 px-2">
                  <ContactFormDisclaimer className="text-[8px] text-gray-600 leading-tight" />
                </div>
              </div>

              {/* Right: Image */}
              <div className="hidden lg:flex items-center justify-end">
                {popupData.image && (
                  <img
                    src={popupData.image}
                    alt={
                      popupData.image_alt_description ||
                      `Property in ${cityName}`
                    }
                    className="w-fit h-auto max-h-[80vh] object-contain shadow-lg"
                    loading="eager"
                    decoding="sync"
                    style={{ imageRendering: "auto" }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImagePopup;
