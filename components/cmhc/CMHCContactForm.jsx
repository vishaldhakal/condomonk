"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, User, MessageSquare, ArrowRight } from "lucide-react";

import { sendCMHCMail } from "@/api/sendCMHCMail";
import { usePathname } from "next/navigation";

const CMHCContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const cityName = () => {
    if (pathname.includes("calgary")) {
      return "Calgary";
    } else if (pathname.includes("edmonton")) {
      return "Edmonton";
    }
    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Update button state and show loading
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    await sendCMHCMail(formData, cityName());
    setIsSubmitting(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mt-6"
      id="cmhc-contact-form"
    >
      <div className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="text-sm font-medium text-gray-700 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        {/* Message Field */}
        {/* <div className="space-y-2">
        <Label
          htmlFor="message"
          className="text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Additional Information
        </Label>
        <Textarea
          id="message"
          name="message"
          
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
        />
      </div> */}
      </div>

      {/* Benefits Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-900 mb-2">
            What you'll receive:
          </h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Detailed CMHC MLI Select program information
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Eligibility requirements and qualification criteria
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Financing options and rates
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Application process and documentation requirements
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            Sending...
          </div>
        ) : (
          "Get Information"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center" id="disclaimer">
        By submitting this form, you consent to be contacted with information
        regarding CMHC MLI Select financing options. Your information will be
        securely sent directly to Afaq Khan, a licensed real estate agent and
        CMHC specialist, to assist you with your inquiry.
      </p>
    </form>
  );
};

export default CMHCContactForm;
