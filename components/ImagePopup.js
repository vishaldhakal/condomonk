// components/ImagePopup.js
"use client";
import { useState, useEffect } from "react";

const ImagePopup = ({ cityName, popupData, showPopup, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Submit Inquiry");
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitBtn("Submitting...");

    try {
      let form_data = new FormData();
      let fullUrl = "no-url-captured";

      if (typeof window !== "undefined") {
        try {
          fullUrl = window.location.href;
        } catch (error) {
          fullUrl = "error-capturing-url";
        }
      }

      form_data.append("name", formData.name);
      form_data.append("email", formData.email);
      form_data.append("phone", formData.phone);
      form_data.append(
        "message",
        formData.message ||
          `[IMAGE POPUP INQUIRY] I would like to get more information about the property in ${cityName}. Please contact me with details. This inquiry was submitted through the image popup on your website.`
      );
      form_data.append("image_popup_id", popupData.id || "");
      form_data.append("source", `${fullUrl} - Image Popup (${cityName})`);

      const response = await fetch(
        "https://admin.homebaba.ca/api/image-popup-submit/",
        {
          method: "POST",
          body: form_data,
        }
      );

      if (response.ok) {
        setSubmitBtn("Successfully Submitted");

        // Show success message using SweetAlert if available
        if (typeof window !== "undefined" && window.swal) {
          window.swal(
            `Thank You, ${formData.name}!`,
            "Please expect an email or call from us shortly",
            "success"
          );
        } else {
          // Fallback alert
          alert(
            `Thank you, ${formData.name}! Your inquiry has been sent successfully.`
          );
        }

        // Reset form
        setFormData({ name: "", email: "", phone: "", message: "" });

        // Close popup after successful submission
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
          setShowForm(false);
          setSubmitBtn("Submit Inquiry");
        }, 2000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitBtn("Failed to submit. Try again.");

      // Show error message using SweetAlert if available
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
        setSubmitBtn("Submit Inquiry");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
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

  if (!popupData || !showPopup) {
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
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
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
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-slate-800 text-white py-3 rounded-xl text-base font-bold transition duration-200 shadow-large disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitBtn}
                  </button>
                </form>

                {/* Disclaimer Section */}
                <div className="mt-4">
                  <div className="px-2">
                    <div className="text-[8px] text-gray-600 leading-tight space-y-1">
                      <p className="text-[8px] text-gray-600 leading-tight space-y-1">
                        By submitting your information, you agree to do so
                        voluntarily with the understanding that you may receive
                        updates and related communication from Homebaba and/or
                        its partner realtors and brokerages. You may unsubscribe
                        at any time by contacting us at contact@homebaba.ca.
                      </p>
                      {showFullDisclaimer && (
                        <>
                          <p className="text-[8px] text-gray-600 leading-tight space-y-1">
                            {" "}
                            You also agree to Homebaba's Privacy Policy, and
                            Terms of Service. Your agreement is not a condition
                            to purchase any property, goods or services, and you
                            may call us instead or submit the information
                            online. You also acknowledge and agree that you can
                            revoke your authorization at any time. Your consent
                            herein also applies to any future registration on
                            national or state Do-Not-Call lists. For mobile
                            phones, standard message and data charges apply.
                            Consult our Privacy Policy for additional
                            information, including unsubscribe options.
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
