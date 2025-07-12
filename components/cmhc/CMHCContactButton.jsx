"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, User, MessageSquare, ArrowRight } from "lucide-react";
import { sendEmail } from "@/app/_resale-api/resend";
import CMHCContactForm from "./CMHCContactForm";

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
