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
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  ArrowRight,
  Headset,
} from "lucide-react";
import { sendEmail } from "@/app/_resale-api/resend";

const CMHCMobileFixedButton = ({ title, buttonClassName = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Update button state and show loading
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      // Your form submission logic here
      await sendEmail({
        content: formData,
        page: "CMHC Inquiry from CMHC MLI Select Page",
        title: "Inquiry from CMHC MLI Select page",
      });
      submitButton.innerHTML = "Submitted";
      setIsSubmitting(false);
    } catch (error) {
      // Handle error
      submitButton.disabled = false;
      submitButton.innerHTML = "Submit";
      console.error("Submission error:", error);
    }
  };

  return (
    <Dialog>
      <Button
        className={`bg-[#12453B] z-[999] text-white px-8 py-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_24px_0_rgba(39,174,96,0.18),0_8px_32px_0_rgba(39,174,96,0.20)] hover:bg-[#12453B] hover:scale-[1.1] text-lg ${buttonClassName} flex bottom-2 fixed items-center`}
        onClick={() => {
          const disclaimer = document.getElementById("cmhc-contact-form");
          if (disclaimer) {
            disclaimer.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        {title || "Get More Info"}
        {/* <ArrowRight className="w-5 h-5 rounded-lg" /> */}
      </Button>
    </Dialog>
  );
};

export default CMHCMobileFixedButton;
