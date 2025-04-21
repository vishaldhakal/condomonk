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
    <section className="bg-gradient-to-b from-gray-100 to-white ">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl md:pt-20 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
          {/* Left side - Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <img
              src="/hero-img.png"
              alt="Modern architectural building"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right side - Content */}
          <div className=" flex flex-col justify-center ">
            <div className=" sm-center">
              <div className="text-4xl font-bold text-orange-500 pb-4">
                Newsletter Subscription
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Stay Ahead with Exclusive Pre Construction Deals
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed">
                Join our newsletter and never miss out on the latest pre
                construction projects, exclusive investment opportunities, and
                special offers. Be the first to access floor plans, pricing, and
                VIP incentives before they hit the market.
              </p>

              {/* Email input and submit */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="flex-1 px-4 py-3 text-gray-900 border border-gray-200 rounded-lg bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-6 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {status === "sending" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {status === "success" && (
                <p className="text-sm text-green-600">
                  Thank you for subscribing!
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}

              <p className="text-xs text-gray-500 pt-2">
                Your email is 100% confidential and won't send you any spam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
