import React from "react";
import { CheckCircle, Star, TrendingUp } from "lucide-react";
import CMHCContactButton from "./CMHCContactButton";

const mainAdvantages = [
  "Up to 95% financing – means as low as 5% down",
  "Below-prime interest rates",
  "50-year amortization",
  "Up to 10-year terms",
  "Bank & lender fees covered",
  "GST waived",
  "Immediate cash flow",
  "Up to 10% appreciation in year 1",
];

const extraAdvantages = [
  "Favourable refinancing opportunities – Parri Passu Mortgage",
  "Turnkey investments",
  "Pre-leasing of units with property management",
  "Government-backed security",
  "Generational wealth building",
];

// Accept className as a prop for container alignment
const CMHCAdvantages = ({ className = "" }) => (
  <section className={className}>
    <div className="bg-orange-50 md:rounded-3xl px-4 py-6 md:p-12 flex flex-col items-center relative -mx-4 md:mx-0">
      <div className="h-64 w-0 md:w-[45rem] absolute -top-36">
        <img
          src="/investors.png"
          alt="Investors working together"
          className="w-full h-full rounded-xl mb-10 shadow-md object-cover"
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-8 justify-center md:mt-20">
        {/* Left Column */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-7 h-7 text-blue-700" />
            <h3 className="text-xl font-semibold text-gray-900">
              Top CMHC MLI Select Benefits
            </h3>
          </div>
          <p className="text-gray-700 mb-4 text-base">
            Unlock exclusive advantages for investors with CMHC MLI Select.
            Enjoy flexible financing, low rates, and more.
          </p>
          <ul className="space-y-3 mb-4">
            {mainAdvantages.map((adv, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-gray-800 text-base"
              >
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Right Column */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-7 h-7 text-blue-700" />
            <h3 className="text-xl font-semibold text-gray-900">
              More Investor Advantages
            </h3>
          </div>
          <p className="text-gray-700 mb-4 text-base">
            Take your investment further with additional perks, security, and
            wealth-building opportunities.
          </p>
          <ul className="space-y-3 mb-4">
            {extraAdvantages.map((adv, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-gray-800 text-base"
              >
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 w-full mx-auto flex justify-center">
        <CMHCContactButton
          title="Send me more information"
          bg={"bg-blue-500"}
        />
      </div>
    </div>
  </section>
);

export default CMHCAdvantages;
