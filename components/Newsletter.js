"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const pathname = usePathname();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(
        "https://admin.homebaba.ca/api/newsletter/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            page_url: pathname,
            city: pathname.split("/")[1] || "toronto",
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-pink-50 to-yellow-0 mt-20">
      <div className="w-full max-w-2xl mx-auto px-4 text-center py-40">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Notify Me of New Projects
        </h2>
        <p className="text-lg text-gray-700 mb-1">
          Send me information about new projects that are launching or selling
        </p>
        <p className="text-base text-gray-500 mb-8">
          Join Condomonk community of{" "}
          <span className="font-semibold text-gray-900">
            500,000+ Buyers & Investors
          </span>{" "}
          today!
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-4"
        >
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 text-gray-900 border border-gray-200 rounded-lg bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none text-lg transition-all duration-200"
            required
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-8 py-4 text-white bg-black rounded-lg hover:bg-gray-900 transition-colors duration-200 text-lg font-semibold whitespace-nowrap"
          >
            {status === "sending" ? "Notifying..." : "Notify me"}
          </button>
        </form>
        {status === "success" && (
          <p className="text-sm text-green-600 mt-2 font-medium">
            Thank you for subscribing!
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 mt-2 font-medium">
            Something went wrong. Please try again.
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-gray-500 text-sm mt-2">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            No spam, ever
          </span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Unsubscribe anytime
          </span>
        </div>
      </div>
    </section>
  );
}
