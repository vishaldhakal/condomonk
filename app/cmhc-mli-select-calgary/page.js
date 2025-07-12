export const metadata = {
  title: "CHMC MLI SELECT CALGARY | LEARN TODAY",
  description:
    "Unlock up to 85% financing with CMHC MLI Select in Alberta. Enjoy below-prime rates, 40–50 year amortization, and insurance for multiplex properties.",
};

import React from "react";
import {
  Building2,
  Calculator,
  Shield,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import CMHCContactButton from "@/components/cmhc/CMHCContactButton";
import WhyChooseCMHC from "@/components/cmhc/WhyChooseCMHC";
import CMHCAdvantages from "@/components/cmhc/CMHCAdvantages";
import CMHCMobileFixedButton from "@/components/cmhc/CMHCMobileFixedButton";
import CMHCContactForm from "@/components/cmhc/CMHCContactForm";
import CMHCDisclaimerAsterisk from "@/components/cmhc/CMHCDisclaimerAsterisk";

const PRIMARY = "#12453B";
const LIGHT_BG = "#EAF7F3";

const CMHCRentalPage = () => {
  const features = [
    {
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      title: "Multi-Unit Projects",
      description:
        "Minimum 5 units providing standard rental housing accommodations",
    },
    {
      icon: <Calculator className="w-8 h-8 text-green-600" />,
      title: "Maximum LTV",
      description:
        "Upto 85% of lending value. Construction financing, purchase or refinance options available",
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Mortgage Insurance",
      description:
        "CMHC backing enables greater financing choices for approved lenders",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Long Amortization",
      description:
        "Up to 40 years for existing properties, 50 years for new construction",
    },
  ];

  const loanPurposes = [
    "Construction financing",
    "Property purchase",
    "Refinancing existing properties",
  ];

  const dcrRequirements = [
    {
      type: "5-6 Units(For purchase)",
      purchase: "1.10",
      refinance: "1.20",
      category: "Residential Space",
    },
    {
      type: "5-6 Units(For refinance)",
      purchase: "1.10",
      refinance: "1.20",
      category: "Residential Space",
    },
    {
      type: "7+ Units (10+ years)",
      purchase: "1.20",
      refinance: "1.20",
      category: "Residential Space",
    },
    {
      type: "7+ Units (<10 years)",
      purchase: "1.30",
      refinance: "1.30",
      category: "Residential Space",
    },
    {
      type: "5+ Units (10+ years)",
      purchase: "1.40",
      refinance: "1.40",
      category: "Non-Residential Space",
    },
    {
      type: "5+ Units (<10 years)",
      purchase: "1.50",
      refinance: "1.50",
      category: "Non-Residential Space",
    },
  ];

  const guaranteeRequirements = [
    {
      type: "Construction Financing",
      initial: "100% guarantee until stabilized rents achieved for 12 months",
      ongoing: "40% of outstanding loan amount thereafter",
    },
    {
      type: "Purchase/Refinance",
      initial: "40% of outstanding loan amount",
      ongoing: "Ongoing guarantee requirement",
    },
    {
      type: "Limited Recourse",
      initial: "Available for loans ≤65% of lending value",
      ongoing: "Non-recourse to borrower option",
    },
  ];

  const heroBenefits = [
    "Up to 85% LTV financing",
    "40-50 year amortization",
    "CMHC mortgage insurance",
    "Construction & purchase options",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-0 mt-10 pb-20">
        <div className="max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{ color: PRIMARY }}
            >
              CMHC MLI Select Calgary
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Get up to 85% financing, below-prime rates, and more for your
              multi-unit investment.
              <CMHCDisclaimerAsterisk />
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Left: Message/Loader */}
            <div className="grid grid-cols-1 gap-4 mb-8 flex-1">
              {heroBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-black">{benefit}</span>
                </div>
              ))}
              <div className="w-32">
                <CMHCContactButton />
              </div>
            </div>
            {/* Right: Image */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden min-h-[220px] flex items-center justify-center w-full">
              <img
                src="/building2.png"
                alt="Multi-unit property"
                className="object-cover w-full h-56 md:h-64"
              />
            </div>
          </div>
        </div>
      </div>

      <WhyChooseCMHC />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CMHCAdvantages className="mt-40 md:mt-60 mb-28" />

        {/* Key Features */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div> */}

        {/* Main Content Grid */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-600" />
              Loan Details
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Loan Purpose
                </h3>
                <ul className="space-y-2">
                  {loanPurposes.map((purpose, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{purpose}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Maximum Loan-to-Value Ratios
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Construction:</span>
                      <span className="font-semibold text-gray-900">
                        Up to 85%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Purchase:</span>
                      <span className="font-semibold text-gray-900">
                        Up to 85%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Refinance:</span>
                      <span className="font-semibold text-gray-900">
                        Up to 85%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Interest Rate & Amortization
                </h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Rate Type:</span>
                      <span className="font-semibold text-gray-900">
                        Fixed or Floating
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">
                        Existing Properties:
                      </span>
                      <span className="font-semibold text-gray-900">
                        Up to 40 years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">New Construction:</span>
                      <span className="font-semibold text-gray-900">
                        Up to 50 years
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-600" />
              Borrower Eligibility
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Experience Requirements
                </h3>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-gray-700 mb-3">
                    <span className="font-semibold text-purple-800">
                      5+ years
                    </span>{" "}
                    of demonstrated management experience in multi-unit
                    residential properties
                  </p>
                  <p className="text-sm text-gray-600">
                    Alternative: Professional third-party property management
                    contract
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Net Worth Requirements
                </h3>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      25%
                    </div>
                    <p className="text-gray-700">
                      Minimum net worth of loan amount
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      With a minimum of{" "}
                      <span className="font-semibold">$100,000</span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Property Requirements
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <span className="text-gray-700">Minimum 5 units</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <span className="text-gray-700">
                      Self-contained rental units
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <span className="text-gray-700">
                      Non-residential ≤30% of floor area
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}

        {/* Debt Coverage Ratio Table */}
        <div className="flex flex-col md:flex-row h-auto md:h-[40rem] mb-8 md:mb-12">
          <div className="bg-white rounded-t-xl md:rounded-l-xl md:rounded-tr-none shadow-md p-4 md:p-8 mb-0 md:mb-12 flex-1 h-full">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
              <Calculator className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              Minimum Debt Coverage Ratio (DCR) Requirements
            </h2>
            <div className="overflow-x-hidden">
              <table className="w-full md:min-w-[400px] text-xs md:text-base">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-900">
                      Property Type
                    </th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="text-center py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-900">
                      DCR Requirement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dcrRequirements.map((req, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="py-2 md:py-3 px-2 md:px-4 text-gray-900">
                        {req.type}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700">
                        {req.category}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                        <span className="bg-blue-100 text-blue-800 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                          {req.purchase}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-1 overflow-hidden rounded-b-xl md:rounded-r-md md:rounded-bl-none bg-white h-48 md:h-full flex items-center justify-center">
            <img
              src="./building.png"
              alt="CMHC Rental"
              className="w-full h-auto object-cover max-h-48 md:max-h-full"
            />
          </div>
        </div>
        <div className="w-full flex justify-center mb-10">
          <CMHCContactButton title={"Contact us now!"} />
        </div>
        {/* Guarantee Requirements */}
        <div className="bg-white rounded-xl my-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            {/* <Shield className="w-6 h-6 text-red-600" /> */}
            Guarantee Requirements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guaranteeRequirements.map((guarantee, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 hover:shadow-md transition-shadow duration-300 bg-[#EAF7F3] md:text-center"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {guarantee.type}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Initial Requirement:
                    </p>
                    <p className="text-gray-800">{guarantee.initial}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ongoing:</p>
                    <p className="text-gray-800">{guarantee.ongoing}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div></div>

        {/* Contact Information */}
        <div className="bg-[#12453B] rounded-xl shadow-lg p-8 text-white div flex-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-fit md:mx-32">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Need More Information?
              </h2>
              <p className="text-white mb-6">
                For additional details on fees, premiums, documentation
                requirements, and other multi-unit products, please contact CMHC
                directly.
              </p>

              <p className="text-sm text-white">
                Check out the MLI Select page on our website for information
                about affordability, accessibility, and energy efficiency
                incentives.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white" />
                  <span>+1 (587) 435-0710</span>
                </div>
                {/* <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white" />
                  <span>1-800-668-2642 (Alternate format requests)</span>
                </div> */}
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white" />
                  <span>afaq@gsbluxuryhomes.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white" />
                  <span>665 Goddard Ave NE , Calgary</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#12453B]">
                <p className="text-sm text-white">
                  Visit{" "}
                  <span className="font-semibold">cmhc.ca/mliproducts</span> for
                  complete information
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row my-20 h-[80rem] md:h-[46rem] max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <div className="block md:hidden h-[25rem]">
            <img src="afaq.jpeg" className="h-full w-full object-cover" />
          </div>
          <div className="h-36 md:h-auto md:w-[80%] px-4 md:px-20 py-2">
            <span className="font-bold text-4xl">
              Interested in CMHC product?
            </span>
            <br />
            <span className="font-medium text-base">
              Contact CMHC specialist Afaq today.
            </span>
            <CMHCContactForm />
          </div>

          <div className="hidden md:block md:w-[30%] h-full">
            <img src="afaq.jpeg" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6" id="disclaimer">
          <p className="text-sm text-gray-600 text-center">
            Afaq Khan is a licensed real estate agent based in Calgary, Alberta.
            With deep expertise in the CMHC MLI Select program, Afaq has helped
            numerous clients navigate and secure financing for their multi-unit
            housing projects. Whether you're an investor or a developer, Afaq
            brings the knowledge and experience to guide you through the process
            with confidence.
            <br />
            This is a promotional feature. Homebaba is not involved in any
            transactions, services, or advisory related to CMHC, real estate, or
            financing. All services are provided directly by Afaq Khan and his
            affiliated brokerage.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <CMHCMobileFixedButton title="Send me more information" />
      </div>
    </div>
  );
};

export default CMHCRentalPage;
