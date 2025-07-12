import React from "react";
import { Check } from "lucide-react";
import CMHCContactButton from "./CMHCContactButton";

const reasons = [
  {
    keyword: "Access preferred interest rates",
    text: ", reducing borrowing costs for multi-unit residential property construction, purchase and refinancing.",
  },
  {
    keyword: "Get reduced premiums",
    text: " and longer amortization periods based on your level of commitment to affordability, accessibility and climate compatibility using MLI Select.",
  },
  {
    keyword:
      "Rely on CMHC as Canada's only provider of mortgage loan insurance",
    text: " for multi-unit residential properties.",
  },
];

const WhyChooseCMHC = () => (
  <div className="py-12 bg-[#EAF7F3]">
    <section className=" mx-auto px-4 max-w-7xl  sm:px-6 lg:px-6 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Why Choose CMHC?
      </h2>
      <div className="flex flex-row flex-wrap gap-2 md:gap-6 justify-center md:justify-between items-stretch">
        {reasons.map((reason, idx) => (
          <div
            key={reason.keyword}
            className="my-2 md:my-0 flex-1 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 py-4 px-2 md:px-6 md:py-6 flex flex-col items-center text-center border-t-4 border-[#12453B] md:w-auto md:min-w-[30%] min-w-[48%] max-w-[48%] md:max-w-[30%]"
          >
            <div className="mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#EAF7F3]">
                <Check
                  className="w-7 h-7 text-[#12453B] font-bold"
                  strokeWidth={3}
                />
              </span>
            </div>
            <div className="text-sm md:text-xl text-gray-800">
              <span className="font-bold text-gray-900 mr-1">
                {reason.keyword}
              </span>
              {reason.text}
            </div>
          </div>
        ))}
        <div className="flex w-full justify-center">
          <CMHCContactButton title="Contact Us" />
        </div>
      </div>
    </section>
  </div>
);

export default WhyChooseCMHC;
