"use server";

import { Resend } from "resend";

export const sendCMHCMail = async (formData, cityName) => {
  try {
    console.log(process.env);
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, phone, message } = formData;

    const emailBody = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `;

    await resend.emails.send({
      from: "info@homebaba.ca", // Must be a verified sender in Resend
      to: ["milan@homebaba.ca"], // Replace with your destination email
      subject: `CMHC MLI Select ${
        cityName ? cityName : ""
      } Inquiry from condomonk.ca`,
      text: emailBody,
    });

    setIsSubmitting(false);
  } catch (error) {
    swal("Failed to submit", error);
  }
};
