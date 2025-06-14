"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const projects = [
  {
    name: "Seaton Whitevale",
    city: "Pickering",
    image: "/seaton-whitevale.webp",
    link: "/pickering/seaton-whitevale",
    price: "Starting from $800,000",
    description: "Seaton Whitevale Towns and Singles",
  },
  {
    name: "Mira Townhomes",
    city: "Barrie",
    image: "/miratown.jpg",
    link: "/barrie/mira-townhomes-barrie",
    price: "Starting from $500,000",
    description: "Mira Townhomes",
  },
];

export default function CommunityPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Request Prices & Floor Plans");
  const [selectedProject, setSelectedProject] = useState(null);
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("communityFormSubmitted2");
    const lastClosed = localStorage.getItem("communityPopupLastClosed2");
    const today = new Date().toDateString();
    const resalePage = pathname.includes("/resale");

    // Only set up timeout if conditions are met
    if (!hasSubmitted && (!lastClosed || lastClosed !== today) && !resalePage) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000); // 10 seconds

      // Clean up timeout on component unmount
      return () => {
        clearTimeout(timer);
      };
    }
  }, [pathname]);

  const handleClose = () => {
    localStorage.setItem(
      "communityPopupLastClosed2",
      new Date().toDateString()
    );
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn("Submitting...");

    let form_data = new FormData();

    // Log window object availability
    console.log("Window object available:", typeof window !== "undefined");

    // Get the complete URL with multiple methods for debugging
    let fullUrl = "no-url-captured";

    if (typeof window !== "undefined") {
      try {
        fullUrl = window.location.href;
        console.log("Current URL:", fullUrl);
      } catch (error) {
        console.error("Error capturing URL:", error);
        fullUrl = "error-capturing-url";
      }
    }

    // Log form data being prepared
    console.log("Form data preparation started");
    form_data.append("name", formData.name);
    form_data.append("email", formData.email);
    form_data.append("phone", formData.phone);
    form_data.append(
      "message",
      `I would like to get the price list and floor plans for ${
        selectedProject?.name || "the selected project"
      }`
    );
    form_data.append("realtor", "No");
    form_data.append("source", fullUrl);

    // Log form data entries if possible
    try {
      console.log("Form data entries:");
      for (let pair of form_data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
    } catch (e) {
      console.log("Could not log form data entries:", e);
    }

    try {
      const response = await fetch(
        "https://admin.homebaba.ca/api/contact-form-submit/",
        {
          method: "POST",
          body: form_data,
        }
      );

      if (response.ok) {
        setSubmitBtn("Successfully Submitted");
        // Show success message
        if (typeof window !== "undefined" && window.swal) {
          window.swal(
            `Thank You, ${formData.name}`,
            "Please expect an email or call from us shortly",
            "success"
          );
        }
        localStorage.setItem("communityFormSubmitted2", "true");
        setFormData({ name: "", email: "", phone: "" });
        setTimeout(() => {
          setIsOpen(false);
          setSubmitBtn("Request Prices & Floor Plans");
        }, 2000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitBtn("Failed to submit. Try again");
      if (typeof window !== "undefined" && window.swal) {
        window.swal("Message Failed", "Cannot send your message", "error");
      }
      setTimeout(() => {
        setSubmitBtn("Request Prices & Floor Plans");
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleContactForm = (project) => {
    setSelectedProject(project);
    setShowContactForm(true);
  };

  if (!isOpen) return null;
  const isResalePage = pathname.includes("resale");

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 ${
        isResalePage ? "hidden" : ""
      }`}
    >
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Container with SVG Background */}
      <div className="relative bg-white shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
        {/* SVG Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
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
            <circle cx="50%" cy="0" r="160" fill="url(#gradient1)" />
            <circle cx="10%" cy="90%" r="120" fill="url(#gradient2)" />
            <defs>
              <radialGradient
                id="gradient1"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="#FF3A3A" stopOpacity="0.3" />
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
                <stop offset="0%" stopColor="#3A3AFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3A3AFF" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Close Button with Animation */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="Close popup"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-300 z-20 bg-white bg-opacity-80 rounded-full p-1 cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content Container */}
        <div className="relative z-10 p-4">
          {/* Back Button (only shown in contact form) */}
          {showContactForm && (
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 left-4 text-gray-500 hover:text-red-500 transition-colors duration-300 z-20"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

          {/* Community Info Section */}
          <div
            className={`transition-all duration-300 ${
              showContactForm ? "hidden" : "block"
            }`}
          >
            <div className="relative mb-8">
              {/* Profile Image with Border Animation */}
              <div className="flex justify-center mt-2">
                <div className="relative rounded-full p-1">
                  <div className="bg-white p-1 rounded-full">
                    {/* <Image
                      src="/angela.jpeg"
                      alt="Real Estate Agent"
                      width={200}
                      height={200}
                      className="rounded-full w-[140px] h-[140px] object-cover object-top"
                      priority
                    /> */}
                  </div>
                </div>
              </div>

              {/* Title with Gradient */}
              <p className="border border-red-500 rounded-full px-2 py-1 text-red-600 text-sm text-center italic mb-1 w-fit mx-auto">
                Don't miss out
              </p>
              <h2 className="text-xl font-bold text-center mt-1">
                affordable Townhomes
              </h2>
              <h2 className="text-2xl font-extrabold text-center mt-0 mb-1">
                STARTING FROM <span className="text-green-600"> $500,000</span>
              </h2>
              <div className="grid grid-cols-2 gap-6 w-full justify-center mt-3">
                {projects.map((project, idx) => (
                  <div
                    key={project.name}
                    className="flex-1 flex flex-col items-center rounded-2xl min-w-[120px] max-w-xs shadow-sm"
                  >
                    <Link href={project.link} className="w-full">
                      <div className="w-full aspect-[2/2] bg-gray-300 rounded-xl mb-2 flex items-center justify-center overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="object-cover object-top h-full w-full"
                        />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-lg text-gray-900">
                          {project.name}
                        </div>
                        <div className="text-gray-600 text-base font-medium">
                          {project.city}
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => toggleContactForm(project)}
                      className="bg-red-600 text-white text-sm w-full px-3 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 mt-2"
                    >
                      Get Prices & Floor Plans
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div
            className={`transition-all duration-300 ${
              showContactForm ? "block" : "hidden"
            }`}
          >
            <div className="p-4">
              <h2 className="text-2xl font-extrabold text-center mb-1">
                {selectedProject?.name || "Selected Project"}
              </h2>
              <p className="text-gray-600 text-center text-sm italic mb-6">
                Request Prices & Plans
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="group focus-within:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300"
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
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 h-14 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="group focus-within:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300"
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
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 h-14 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="group focus-within:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300"
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
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 h-14 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Animated Submit Button */}
                <button
                  type="submit"
                  disabled={submitBtn === "Submitting..."}
                  onClick={handleSubmit}
                  className="w-full py-4 h-14 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 overflow-hidden relative"
                >
                  <span className="relative z-10">{submitBtn}</span>
                  <span className="absolute inset-0 bg-white opacity-20 transform -translate-x-full hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                </button>

                {/* Privacy Note */}
                <p className="text-[0.5rem] text-center text-gray-500 mt-2 leading-[0.9rem]">
                  By submitting this form, I consent to receive marketing
                  emails, calls, and texts from Homebaba Technologies. Message
                  and data rates may apply. Frequency may vary. See our{" "}
                  <a href="/privacy" className="text-red-500">
                    Privacy Policy
                  </a>{" "}
                  &{" "}
                  <a href="/privacy" className="text-red-500">
                    Terms of Service
                  </a>
                  . You can email us to unsubscribe.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
