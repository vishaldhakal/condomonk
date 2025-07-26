// components/CityPopup.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/legacy/image";

const CityPopup = ({ cityName }) => {
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    try {
      // Add your form submission logic here
      // For example, send to your contact form API
      console.log("Form submitted:", {
        ...formData,
        popup: popupData.PopupName,
        city: cityName,
        builderEmail: popupData.popupBuilderEmail,
      });

      // Close popup after successful submission
      setShowPopup(false);
    } catch (error) {
      console.error("Error submitting form:", error);
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
                  {popupData.popupBuilder}
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
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "SIGNING UP..." : "SIGN ME UP!"}
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
                  <Image
                    src={popupData.PopupImage}
                    alt={popupData.PopupName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-r-2xl"
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
