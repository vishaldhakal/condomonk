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
  const [submitBtn, setSubmitBtn] = useState("SIGN ME UP!");

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
          const matchingPopup = data.find(
            (popup) =>
              popup.show_popup &&
              popup.popupCity.name.toLowerCase() ===
                formatCityName(cityName).toLowerCase()
          );

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
      form_data.append("realtor", "No");
      form_data.append("source", `${fullUrl} - City Popup (${cityName})`);
      form_data.append("popup_city", cityName);
      form_data.append("builder_email", popupData.popupBuilderEmail || "");
      form_data.append("inquiry_type", "City Popup Form");

      const response = await fetch(
        "https://admin.homebaba.ca/api/contact-form-submit/",
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
          setSubmitBtn("SIGN ME UP!");
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
        className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4"
        onClick={closePopup}
      >
        {/* Popup Container */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-opacity-100 transition-all"
          >
            ✕
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Left Side - Form */}
            <div className="md:w-1/2 p-8 md:p-12">
              {/* Logo/Builder Name */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {popupData.PopupName}
                </h2>
              </div>

              {/* Price */}
              <div className="mb-6 flex text-center items-center justify-center">
                <h3 className="text-xl text-gray-700 mb-1">Starting From</h3>
                <p className="text-xl font-bold text-red-500 ml-2">
                  ${popupData.starting_price?.toLocaleString()}s
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-600 text-center">
                  Get the pricing, floor plans,
                  <br />
                  payment plan directly from the builder.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="group focus-within:shadow-lg transition-shadow duration-300">
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
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="group focus-within:shadow-lg transition-shadow duration-300">
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
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl"
                >
                  {submitBtn}
                </button>
              </form>

              {/* No Thanks Button */}
              <button
                onClick={closePopup}
                className="w-full mt-4 text-gray-500 hover:text-gray-700 py-2 transition-colors"
              >
                No, Thanks
              </button>
            </div>

            {/* Right Side - Image */}
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
              {popupData.PopupImage && (
                <div className="relative w-full h-full">
                  <img
                    src={popupData.PopupImage}
                    alt={popupData.PopupName}
                    className="w-full h-full object-cover rounded-r-2xl"
                  />
                  {/* City name overlay */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                    {popupData.popupCity.name}, Ontario
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
