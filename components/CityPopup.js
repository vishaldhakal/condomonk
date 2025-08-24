// components/CityPopup.js
"use client";
import { useState, useEffect } from "react";

const CityPopup = ({ cityName, popupData, showPopup, onClose }) => {
  const [showForm, setShowForm] = useState(false); // New state for form stage
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Request Info From Builder");
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitBtn("SUBMITTING...");

    try {
      let form_data = new FormData();

      // Get the complete URL
      let fullUrl = "no-url-captured";
      if (typeof window !== "undefined") {
        try {
          fullUrl = window.location.href;
        } catch (error) {
          console.error("Error capturing URL:", error);
          fullUrl = "error-capturing-url";
        }
      }

      // Prepare form data
      form_data.append("name", formData.firstName);
      form_data.append("email", formData.email);
      form_data.append("phone", formData.phone);
      form_data.append(
        "message",
        `[POPUP INQUIRY] I would like to get the pricing, floor plans, and payment plan for ${popupData.PopupName} in ${cityName}. Please contact me with more information. This inquiry was submitted through the city popup on your website.`
      );
      form_data.append("popup_id", popupData.id || "");
      form_data.append("realtor", "No");
      form_data.append("source", `${fullUrl} - City Popup (${cityName})`);
      form_data.append("popup_city", cityName);
      form_data.append("builder_email", popupData.popupBuilderEmail || "");
      form_data.append("inquiry_type", "City Popup Form");

      const response = await fetch(
        "https://admin.homebaba.ca/api/builder-popup-submit/",
        {
          method: "POST",
          body: form_data,
        }
      );

      if (response.ok) {
        setSubmitBtn("SUCCESSFULLY SUBMITTED");

        // Show success message using SweetAlert if available
        if (typeof window !== "undefined" && window.swal) {
          window.swal(
            `Thank You, ${formData.firstName}!`,
            `Your inquiry for ${popupData.PopupName} in ${cityName} has been sent. Please expect an email or call from us shortly.`,
            "success"
          );
        } else {
          // Fallback alert
          alert(
            `Thank you, ${formData.firstName}! Your inquiry has been sent successfully.`
          );
        }

        // Reset form
        setFormData({ firstName: "", email: "", phone: "" });

        // Close popup after successful submission
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
          setShowForm(false); // Reset form stage
          setSubmitBtn("Request Prices & Floor Plans");
        }, 2000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitBtn("FAILED TO SUBMIT. TRY AGAIN");

      if (typeof window !== "undefined" && window.swal) {
        window.swal(
          "Submission Failed",
          "Cannot send your message. Please try again.",
          "error"
        );
      } else {
        alert("Failed to submit form. Please try again.");
      }

      setTimeout(() => {
        setSubmitBtn("Request Prices & Floor Plans");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowForm(false); // Reset form stage when closing
    if (onClose) {
      onClose();
    }
  };

  const showFormStage = () => {
    setShowForm(true);
  };

  const goBackToMain = () => {
    setShowForm(false);
  };

  // Don't render if no popup data or shouldn't show
  if (!popupData || !showPopup) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[99999] flex items-center justify-center  sm:p-4"
        onClick={closePopup}
      >
        {/* Popup Container */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern
                id="grid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <circle cx="20%" cy="20%" r="120" fill="url(#gradient1)" />
              <circle cx="80%" cy="80%" r="100" fill="url(#gradient2)" />
              <defs>
                <radialGradient
                  id="gradient1"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0%" stopColor="#FF3A3A" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FF3A3A" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                  id="gradient2"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0%" stopColor="#3A3AFF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3A3AFF" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
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

          {/* Back Button for Form Stage */}
          {showForm && (
            <button
              onClick={goBackToMain}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
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
            <div className="relative z-10 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
                {/* Left content */}
                <div className="order-2 md:order-1 flex flex-col justify-between px-8 md:px-10 md:py-6 py-2  text-center">
                  <div>
                    <div className="md:mt-20 mt-5">
                      <p className="text-red-600 text-xs md:text-sm text-center border border-red-600 rounded-full px-2 py-1 w-fit mx-auto  mt-1">
                        don't miss out
                      </p>
                      <div className="md:text-xl text-2xl font-bold text-gray-900 leading-tight">
                        {popupData.PopupTitle}
                      </div>

                      <div className="text-black font-extrabold text-3xl md:text-2xl  leading-light ">
                        Starting From{" "}
                        <span className="text-green-600">
                          ${popupData.starting_price?.toLocaleString()}{" "}
                        </span>
                      </div>
                      <div className="text-gray-800 text-xs md:text-[10px] text-center  mt-1 flex items-center justify-center gap-2">
                        Connect Directly with the Developer
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={showFormStage}
                      className="px-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 md:py-4 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl text-base md:text-md"
                    >
                      Recieve package from Developer
                    </button>
                    <p className="text-gray-500 text-xs md:text-[8px] mt-2 text-center">
                      Get the pricing, floor plans info directly from the
                      builder.
                    </p>
                  </div>
                </div>

                {/* Right image */}
                <div className="order-1 md:order-2 overflow-hidden bg-gray-200 md:min-h-[420px] min-h-[380px] h-auto md:rounded-r-2xl">
                  {popupData.PopupImage && (
                    <img
                      src={popupData.PopupImage}
                      alt={popupData.PopupName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
                {/* Left: Stage 2 Form */}
                <div className="order-2 md:order-1 flex flex-col justify-start px-8 md:px-10 py-3 md:mt-10 mt-5">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3 max-w-sm md:max-w-md"
                  >
                    {/* Full Name */}
                    <div className="group focus-within:shadow-lg transition-shadow duration-300">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Full Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-400 placeholder:text-xs md:placeholder:text-sm text-sm"
                        />
                      </div>
                    </div>

                    {/* Email and Phone in one row */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* Email Address */}
                      <div className="group focus-within:shadow-lg transition-shadow duration-300">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-400 placeholder:text-xs md:placeholder:text-sm text-sm"
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="group focus-within:shadow-lg transition-shadow duration-300">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-400 placeholder:text-xs md:placeholder:text-sm text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl text-sm mt-6"
                    >
                      {submitBtn}
                    </button>
                  </form>

                  {/* Builder Info Section */}
                  <div className="max-w-sm md:max-w-md mt-4">
                    <div className="px-2 md:px-4">
                      <div className="flex items-center justify-center gap-2 my-2">
                        <span className="text-gray-700 font-bold text-xs">
                          Directly connect with the Developer
                        </span>
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="text-[8px] text-gray-600 leading-tight space-y-1">
                        <p className="text-[8px] text-gray-600 leading-tight space-y-1">
                          By providing your name and contact information and
                          clicking the Request info button, you consent and
                          agree to receive marketing communications from
                          homebaba and each of the builders or agents you
                          selected above, including emails, calls or text
                          messages using an automatic telephone dialing system
                          or an artificial or prerecorded voice.
                        </p>
                        {showFullDisclaimer && (
                          <>
                            <p className="text-[8px] text-gray-600 leading-tight space-y-1">
                              {" "}
                              You also agree to Homebaba's Privacy Policy, and
                              Terms of Service. Your agreement is not a
                              condition to purchase any property, goods or
                              services, and you may call us instead or submit
                              the information online. You also acknowledge and
                              agree that you can revoke your authorization at
                              any time. Your consent herein also applies to any
                              future registration on national or state
                              Do-Not-Call lists. For mobile phones, standard
                              message and data charges apply. Consult our
                              Privacy Policy for additional information,
                              including unsubscribe options.
                            </p>
                            <p className="text-[8px] text-gray-600 leading-tight space-y-2">
                              This site is protected by reCAPTCHA and the Google
                              Privacy Policy and Terms of Service apply.
                            </p>
                          </>
                        )}
                        <p className="text-[8px] text-gray-600 leading-tight space-y-1">
                          <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() =>
                              setShowFullDisclaimer(!showFullDisclaimer)
                            }
                          >
                            {showFullDisclaimer ? "See less" : "See more"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Image stays visible */}
                <div className="order-1 md:order-2 overflow-hidden bg-gray-200 md:min-h-[420px] min-h-[380px] h-auto md:rounded-r-2xl">
                  {popupData.PopupImage && (
                    <img
                      src={popupData.PopupImage}
                      alt={popupData.PopupName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CityPopup;
