"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CommunityPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Join Priority List");
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("communityFormSubmitted");
    const lastClosed = localStorage.getItem("communityPopupLastClosed");
    const today = new Date().toDateString();
    const resalePage = pathname.includes("/resale");

    // Only set up exit intent if conditions are met
    if (!hasSubmitted && (!lastClosed || lastClosed !== today) && !resalePage) {
      // Track mouse position for exit intent
      let mouseY = 0;

      const handleMouseMove = (e) => {
        // Only track if mouse is moving upward (toward top of page)
        if (e.clientY < mouseY) {
          // If mouse is in the top 20% of the page, show popup
          if (e.clientY < window.innerHeight * 0.2) {
            setIsOpen(true);
            // Remove event listener after showing popup
            document.removeEventListener("mousemove", handleMouseMove);
          }
        }
        mouseY = e.clientY;
      };

      // Add event listener for mouse movement
      document.addEventListener("mousemove", handleMouseMove);

      // Clean up event listener on component unmount
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [pathname]);

  const handleClose = () => {
    localStorage.setItem("communityPopupLastClosed", new Date().toDateString());
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn("Submitting...");

    try {
      const response = await fetch(
        "https://admin.homebaba.ca/api/newsletter/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            page_url: pathname,
            city: pathname.split("/")[1] || "toronto",
            subscribed_at: new Date().toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data?.email?.[0]?.includes("already exists")) {
          setSubmitBtn("Email already subscribed!");
          setTimeout(() => {
            setIsOpen(false);
            setFormData({ name: "", email: "", phone: "" });
            setSubmitBtn("Join Priority List");
          }, 2000);
          return;
        }
        throw new Error("Failed to subscribe");
      }

      setSubmitBtn("Thank you for being part of the Condomonk community!");
      localStorage.setItem("communityFormSubmitted", "true");
      setTimeout(() => {
        setIsOpen(false);
        setFormData({ name: "", email: "", phone: "" });
        setSubmitBtn("Join Priority List");
      }, 3000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubmitBtn("Failed to subscribe. Try again");
      setTimeout(() => {
        setSubmitBtn("Join Priority List");
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        className="fixed inset-0 bg-white/10 backdrop-filter backdrop-blur-[8px] transition-all duration-300"
        onClick={handleClose}
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* Modal Container */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 shadow-2xl rounded-3xl w-full max-w-md overflow-hidden z-[10000]">
        {/* SVG Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="70%" cy="20%" r="100" fill="url(#gradient1)" />
            <circle cx="30%" cy="80%" r="120" fill="url(#gradient2)" />
            <defs>
              <radialGradient
                id="gradient1"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="gradient2"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="Close popup"
          className="absolute top-4 right-4 text-gray-500 hover:text-indigo-600 transition-colors duration-300 z-20 bg-white/80 rounded-full p-2 cursor-pointer shadow-md hover:shadow-lg"
        >
          <svg
            className="w-5 h-5"
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
        <div className="relative z-10 p-6">
          {/* Header Section */}
          <div className="relative mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                <div className="relative bg-white p-1 rounded-full">
                  <Image
                    src="/angela.webp"
                    alt="Real Estate Agent"
                    width={200}
                    height={200}
                    className="rounded-full w-[120px] h-[120px] object-cover object-top border-4 border-white shadow-lg"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Join Our Community
              </h2>
              <p className="text-gray-600 text-sm font-medium">
                Get Exclusive Access to Premium Properties
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="group">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 pl-12"
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 pl-12"
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 pl-12"
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitBtn === "Submitting..."}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {submitBtn}
                {submitBtn === "Submitting..." && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </span>
            </button>

            <p className="text-[0.6rem] text-center text-gray-500 mt-4 leading-relaxed">
              By submitting this form, I consent to receive marketing emails,
              calls, and texts from Homebaba Technologies. Message and data
              rates may apply. Frequency may vary. You can email us to
              unsubscribe.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
