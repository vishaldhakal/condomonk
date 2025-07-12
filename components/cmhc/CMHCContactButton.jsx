"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const CMHCContactButton = ({ title, buttonClassName = "" }) => {
  return (
    <Button
      onClick={() => {
        const disclaimer = document.getElementById("cmhc-contact-form");
        if (disclaimer) {
          disclaimer.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className={`bg-[#12453B] text-white px-8 py-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_24px_0_rgba(39,174,96,0.18),0_8px_32px_0_rgba(39,174,96,0.20)] hover:bg-[#12453B] hover:scale-[1.1] text-lg ${buttonClassName}`}
    >
      {title || "Get More Info"}
      {/* <ArrowRight className="w-5 h-5 rounded-lg" /> */}
    </Button>
  );
};

export default CMHCContactButton;
