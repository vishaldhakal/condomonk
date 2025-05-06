"use client";
import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";

export default function BottomContactForm(props) {
  const [submitbtn, setSubmitbtn] = useState("Send a message");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    realtor: "No",
    message: props.defaultmessage,
    proj_name: props.proj_name,
    city: props.city,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <form
        method="POST"
        className="space-y-2"
        onSubmit={(e) => handleFormSubmit(e)}
        id="contactForm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              value={credentials.name}
              onChange={(e) => handleChange(e)}
              className="w-full px-4 py-5 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={(e) => handleChange(e)}
              required={true}
              className="w-full px-4 py-5 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            />
          </div>
        </div>

        <div>
          <input
            type="email"
            aria-describedby="emailHelp"
            placeholder="Your email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-5 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          />
        </div>

        <div className="relative">
          <select
            className="w-full px-4 py-5 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm appearance-none"
            id="realtor"
            value={credentials.realtor}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Are you a realtor or working with a realtor?
          </label>
        </div>

        <div>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Enter your message here"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-5 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-5 bg-black text-white rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {submitbtn}
          </button>
        </div>
      </form>

      <p className="text-center text-xs text-gray-500 mt-6">
        I agree to receive marketing and customer service communications from
        Homebaba Technologies. Consent is not a condition of purchase. Msg/data
        rates may apply. Msg frequency varies. Reply STOP to unsubscribe.
      </p>
    </div>
  );
}
