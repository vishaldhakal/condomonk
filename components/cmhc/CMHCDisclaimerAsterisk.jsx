"use client";
import React from "react";

const CMHCDisclaimerAsterisk = () => {
  return (
    <span
      className="text-red-500 hover:cursor-pointer"
      onClick={() => {
        const disclaimer = document.getElementById("disclaimer");
        if (disclaimer) {
          disclaimer.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      *
    </span>
  );
};

export default CMHCDisclaimerAsterisk;
