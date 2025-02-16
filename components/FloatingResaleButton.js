"use client";
import React from "react";

const FloatingResaleButton = () => {
  return (
    <button
      onClick={() =>
        document
          .getElementById("contactForm")
          ?.scrollIntoView({ behavior: "smooth" })
      }
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden bg-yellow-400 text-black  px-6 py-3 rounded-xl shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-3 "
    >
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-medium text-center text-lg">Book a tour</span>
      </div>
    </button>
  );
};

export default FloatingResaleButton;
