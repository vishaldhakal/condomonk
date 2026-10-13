"use server";

import { Resend } from "resend";

// Throws on failure so the caller can treat the inquiry as not delivered.
export const sendCMHCMail = async (formData, cityName) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, phone, message } = formData;

  const emailBody = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `;

  const { error } = await resend.emails.send({
    from: "info@homebaba.ca", // Must be a verified sender in Resend
    to: ["apargtm@gmail.com"], // Replace with your destination email
    subject: `CMHC MLI Select ${
      cityName ? cityName : ""
    } Inquiry from condomonk.ca`,
    text: emailBody,
  });

  if (error) {
    throw new Error(error.message || "Failed to send CMHC inquiry");
  }
};
