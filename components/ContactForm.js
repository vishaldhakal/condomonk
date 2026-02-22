"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ContactFormSubmit from "./ContactFormSubmit";

export default function ContactForm({
  projectName,
  city,
  partnerdata,
  defaultMessage,
}) {
  const [submitbtn, setSubmitbtn] = useState("Contact now");
  const pathname = usePathname();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    message: defaultMessage,
    realtor: "No",
    project_namee: projectName,
    cityy: city,
    partnerdata: partnerdata,
  });

  useEffect(() => {
    // Split the pathname into segments
    const segments = pathname.split("/").filter((segment) => segment);

    if (segments.length === 0) {
      // Homepage: homebaba.ca/
      setCredentials((prev) => ({
        ...prev,
        project_namee: null,
        cityy: null,
      }));
    } else if (segments.length === 1) {
      // City page: homebaba.ca/north-york
      setCredentials((prev) => ({
        ...prev,
        project_namee: null,
        cityy: segments[0],
      }));
    } else if (segments.length === 2) {
      // Project page: homebaba.ca/north-york/auberge-on-the-park
      setCredentials((prev) => ({
        ...prev,
        project_namee: segments[1],
        cityy: segments[0],
      }));
    }
  }, [pathname]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
  };

  return (
    <div className="max-w-[700px] mx-auto px-2 mt-3 md:px-4" id="mycontact">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            className="w-full h-[70px] px-4 bg-[#F4F6F9] rounded-xl border-0 focus:ring-0 text-gray-900 placeholder-gray-500"
            value={credentials.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full h-[70px] px-4 bg-[#F4F6F9] rounded-xl border-0 focus:ring-0 text-gray-900 placeholder-gray-500"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
          </div>

          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full h-[70px] px-4 bg-[#F4F6F9] rounded-xl border-0 focus:ring-0 text-gray-900 placeholder-gray-500"
              value={credentials.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
          </div>
        </div>

        <div className="relative">
          <select
            id="realtor"
            name="realtor"
            className="w-full h-[70px] px-4 pt-6 pb-2 bg-[#F4F6F9] rounded-xl border-0 focus:ring-0 text-gray-900 appearance-none peer"
            value={credentials.realtor}
            onChange={handleChange}
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <label
            htmlFor="realtor"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-6 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Are you a realtor or working with one?
          </label>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-6 bg-[#F4F6F9] rounded-xl border-0 focus:ring-0 text-gray-900 resize-none placeholder-gray-500"
            value={credentials.message}
            onChange={handleChange}
            placeholder="Enter your message"
            required
          />
        </div>

        <div className="text-[0.8rem] md:text-[0.8rem] text-gray-500 leading-relaxed text-center">
          By submitting this form, you give express written consent to Homebaba advertising real estate agent partners and its authorized representatives to contact you via email, telephone, text message, and other forms of electronic communication, including through automated systems, AI assistants, or prerecorded messages. Communications may include
          information about real estate services, property listings, market
          updates, or promotions related to your inquiry or expressed interests.
          You may withdraw your consent at any time by replying “STOP” to text
          messages or clicking “unsubscribe” in emails. Message and data rates
          may apply. For more details, please review our Privacy Policy & Terms
          of Service.
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 text-center"
          >
            {submitbtn}
          </button>
        </div>
      </form>
    </div>
  );
}
