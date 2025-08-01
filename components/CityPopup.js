// components/CityPopup.js
"use client";
import { useState, useEffect } from "react";

const CityPopup = ({ cityName }) => {
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Request Info From Builder");
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  // Format city name to match API response (capitalize first letter)
  const formatCityName = (city) => {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const response = await fetch("https://admin.homebaba.ca/api/popups/");
        if (response.ok) {
          const data = await response.json();

          // Find popup that matches the current city and should be shown
          const matchingPopup = data.find((popup) => {
            if (!popup.show_popup) return false;

            // Handle both single city object and array of cities
            const cities = Array.isArray(popup.popupCity)
              ? popup.popupCity
              : [popup.popupCity];

            return cities.some(
              (city) =>
                city.name.toLowerCase() ===
                formatCityName(cityName).toLowerCase()
            );
          });

          if (matchingPopup) {
            setPopupData(matchingPopup);
            // Show popup after a small delay
            setTimeout(() => setShowPopup(true), 2000);
          }
        }
      } catch (error) {
        console.error("Error fetching popup data:", error);
      }
    };

    if (cityName) {
      fetchPopupData();
    }
  }, [cityName]);

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
        "https://admin.homebaba.ca/api/builder-popup-submit//",
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
          setShowPopup(false);
          setSubmitBtn("Request Info From Builder");
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
        setSubmitBtn("SIGN ME UP!");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Don't render if no popup data or shouldn't show
  if (!popupData || !showPopup) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-4"
        onClick={closePopup}
      >
        {/* Popup Container */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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

          <div className="flex flex-col md:flex-row relative z-10 md:items-stretch">
            {/* Left Side - Form */}
            <div className="md:w-1/2 p-4 sm:p-6 md:p-12 order-2 md:order-1 flex flex-col justify-center">
              {/* Don't miss out badge */}
              <div className="flex justify-center">
                <div className="inline-block border-2 border-red-300 text-red-600 px-2 py-1 rounded-full text-[12px] font-medium">
                  Don't miss out
                </div>
              </div>

              {/* Project Name */}
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  {popupData.PopupName}
                </h2>
              </div>

              {/* Builder Name */}
              {/* {popupData.popupBuilder && (
                <div className=" text-center">
                  <p className="text-xs text-gray-600 font-medium">
                    by {popupData.popupBuilder}
                  </p>
                </div>
              )} */}

              {/* Price */}
              <div className="mb-4 text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-1">
                  Starting From{" "}
                  <span className="text-green-600">
                    ${popupData.starting_price?.toLocaleString()}
                  </span>
                </h3>
              </div>

              {/* Description */}
              <div className="mb-4 text-center">
                <p className="text-gray-600 text-sm leading-light">
                  Get the pricing, floor plans,
                  <br />
                  payment plan directly from the builder.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-2">
                {/* First Name */}
                <div className="group focus-within:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                      placeholder="Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Email and Phone Row */}
                <div className="flex flex-row gap-2">
                  <div className="group focus-within:shadow-lg transition-shadow duration-300 flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="group focus-within:shadow-lg transition-shadow duration-300 flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl text-base"
                >
                  {submitBtn}
                </button>
              </form>

              {/* Direct Connect Message */}
              <div className="flex items-center justify-center mt-2">
                <p className="font-bold text-center text-sm text-gray-700">
                  Directly connect with Builder Sales Team{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="inline-block ml-1 text-blue-500"
                    viewBox="0 0 16 16"
                  >
                    <circle cx="8" cy="8" r="7" fill="currentColor" />
                    <path
                      d="M6.5 8.5l1.5 1.5 3-3"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </p>
              </div>

              {/* Disclaimer */}
              <div className="mt-4 text-center">
                <p className="text-[10px] text-gray-500 leading-tight">
                  By providing your name and contact information and clicking
                  the Request info button, you consent and agree to receive
                  marketing communications from homebaba and each of the
                  builders or agents you selected above, including emails, calls
                  or text messages using an automatic telephone dialing system
                  or an artificial or prerecorded voice.{" "}
                  {!showFullDisclaimer && (
                    <button
                      type="button"
                      onClick={() => setShowFullDisclaimer(true)}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      See more
                    </button>
                  )}
                  {showFullDisclaimer && (
                    <span className="block mt-1">
                      You also agree to Homebaba's Privacy Policy, and Terms of
                      Service. Your agreement is not a condition to purchasing
                      any property, goods or services, and you may call us
                      instead of submitting the information online. You also
                      acknowledge and agree that you can revoke your
                      authorization at any time. Your consent herein also
                      applies to any future registration on national or state
                      Do-Not-Call lists. For mobile phones, standard message and
                      data charges apply. Consult our Privacy Policy for
                      additional information, including unsubscribe options.
                      <br />
                      <br />
                      This site is protected by reCAPTCHA and the Google Privacy
                      Policy and Terms of Service apply.{" "}
                      <button
                        type="button"
                        onClick={() => setShowFullDisclaimer(false)}
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        See less
                      </button>
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="md:w-1/2 relative h-48 sm:h-64 md:h-[500px] lg:h-[550px] order-1 md:order-2">
              {popupData.PopupImage && (
                <div className="relative w-full h-full">
                  <img
                    src={popupData.PopupImage}
                    alt={popupData.PopupName}
                    className="w-full h-full object-cover rounded-t-2xl md:rounded-t-none md:rounded-r-2xl"
                  />
                  {/* City name overlay */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs sm:text-sm font-medium">
                    {formatCityName(cityName)}, Ontario
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CityPopup;
