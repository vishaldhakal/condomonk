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
      const response = await fetch("https://api.homebaba.ca/api/newsletter/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          page_url: pathname,
          city: pathname.split("/")[1] || "toronto",
        }),
      });

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
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20 xl:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl ">
            Stay Ahead with Exclusive Pre Construction Deals
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">
            Join our newsletter and never miss out on the latest pre
            construction projects, exclusive investment opportunities, and
            special offers. Be the first to access floor plans, pricing, and VIP
            incentives before they hit the market.
          </p>
        </div>

        <div className="max-w-lg mx-auto mt-12 overflow-hidden bg-white shadow-xl sm:mt-16 rounded-2xl">
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="block w-full px-6 py-4 text-base text-center text-gray-900 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center w-full px-2 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 disabled:opacity-50 max-w-[200px]"
                >
                  {status === "sending" ? "Subscribing..." : "Subscribe Now"}
                </button>
              </div>
            </form>

            {status === "success" && (
              <p className="mt-3 text-sm text-center text-green-600">
                Thank you for subscribing!
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-center text-red-600">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="mt-5 text-sm font-normal text-center text-gray-500">
              Your email is 100% confidential and won't send you any spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
