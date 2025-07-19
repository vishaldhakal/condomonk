"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FAQAdvanced = ({
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about buying, selling, and investing in real estate.",
  showCategories = true,
  defaultCategory = "all",
}) => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const faqData = {
    buying: [
      {
        question: "How do I start the home buying process?",
        answer:
          "The home buying process typically starts with getting pre-approved for a mortgage, determining your budget, and identifying your must-haves in a home. We recommend working with a real estate agent who can guide you through the entire process, from house hunting to closing.",
      },
      {
        question: "What documents do I need to apply for a mortgage?",
        answer:
          "You'll typically need proof of income (pay stubs, W-2s, tax returns), proof of assets (bank statements, investment accounts), employment verification, credit history, and identification documents. Your lender will provide a complete list of required documents.",
      },
      {
        question: "How much should I save for a down payment?",
        answer:
          "While 20% down payment is traditional to avoid private mortgage insurance (PMI), many programs allow down payments as low as 3-5%. However, a larger down payment means lower monthly payments and less interest paid over time. Consider your financial situation and goals when deciding.",
      },
      {
        question: "What are closing costs and how much should I expect?",
        answer:
          "Closing costs typically range from 2-5% of the home's purchase price and include fees for loan origination, appraisal, title insurance, escrow, and other services. Your lender will provide a detailed breakdown of all closing costs before closing.",
      },
    ],
    selling: [
      {
        question: "How do I determine the right listing price for my home?",
        answer:
          "Work with a real estate agent to conduct a comparative market analysis (CMA) of similar properties in your area. Consider factors like location, property condition, market conditions, and recent sales. Pricing too high can deter buyers, while pricing too low may leave money on the table.",
      },
      {
        question: "What should I do to prepare my home for sale?",
        answer:
          "Focus on curb appeal, declutter and depersonalize, make necessary repairs, consider minor updates that add value, and ensure your home is clean and well-maintained. Professional staging can also help showcase your home's potential.",
      },
      {
        question: "How long does it typically take to sell a home?",
        answer:
          "The time to sell varies by market conditions, property type, and pricing strategy. In a seller's market, homes may sell in days or weeks. In a buyer's market, it could take months. Your agent can provide market-specific insights.",
      },
      {
        question: "What are the costs associated with selling a home?",
        answer:
          "Common costs include real estate agent commissions (typically 5-6%), closing costs, repairs or improvements, staging, marketing expenses, and potential concessions to buyers. Your agent can provide a detailed breakdown.",
      },
    ],
    investing: [
      {
        question: "How do I know if a property is a good investment?",
        answer:
          "Consider factors like location, property condition, market trends, rental potential, and your long-term goals. Research comparable sales in the area, check for planned developments, and consider the property's potential for appreciation. Consulting with a real estate professional can provide valuable insights.",
      },
      {
        question: "What are the different types of real estate investments?",
        answer:
          "Common investment types include residential rentals, commercial properties, REITs (Real Estate Investment Trusts), fix-and-flip projects, and land investments. Each has different risk profiles, capital requirements, and potential returns.",
      },
      {
        question:
          "How do I calculate return on investment (ROI) for real estate?",
        answer:
          "ROI = (Annual Rental Income - Annual Expenses) / Total Investment × 100. Consider all costs including mortgage, taxes, insurance, maintenance, and vacancy rates. Cash-on-cash return and cap rate are also important metrics.",
      },
      {
        question: "What are the tax implications of real estate investing?",
        answer:
          "Real estate investments offer various tax benefits including depreciation, mortgage interest deductions, property tax deductions, and potential 1031 exchanges. Consult with a tax professional to understand your specific situation.",
      },
    ],
    financing: [
      {
        question:
          "What's the difference between pre-qualification and pre-approval?",
        answer:
          "Pre-qualification is a basic assessment based on self-reported information, while pre-approval involves a thorough review of your financial documents by a lender. Pre-approval carries more weight with sellers and gives you a more accurate picture of what you can afford.",
      },
      {
        question: "Can I buy a home with bad credit?",
        answer:
          "While it's more challenging, it's not impossible. Some lenders offer programs for borrowers with lower credit scores, though you may face higher interest rates and down payment requirements. Consider working on improving your credit score before applying for a mortgage.",
      },
      {
        question: "What are the different types of mortgages available?",
        answer:
          "Common mortgage types include conventional, FHA, VA, USDA, and jumbo loans. Each has different requirements, down payment minimums, and benefits. Your lender can help you choose the best option for your situation.",
      },
      {
        question: "How do interest rates affect my mortgage payment?",
        answer:
          "Higher interest rates increase your monthly payment and total interest paid over the loan term. Even a small difference in rate can significantly impact your total cost. Consider both fixed and adjustable-rate mortgages based on your plans.",
      },
    ],
    general: [
      {
        question: "How long does it take to close on a house?",
        answer:
          "The typical closing timeline is 30-45 days from contract to closing, though this can vary. Factors affecting timeline include loan type, property condition, and market conditions. Cash purchases can close faster, often within 1-2 weeks.",
      },
      {
        question: "Should I get a home inspection?",
        answer:
          "Yes, a home inspection is highly recommended. It can reveal potential issues with the property that aren't visible during a regular viewing. This information can help you negotiate repairs or price adjustments, or even decide to walk away from a problematic property.",
      },
      {
        question: "What are the ongoing costs of homeownership?",
        answer:
          "Beyond your mortgage payment, expect property taxes, homeowners insurance, utilities, maintenance and repairs, HOA fees (if applicable), and potential assessments. It's wise to budget 1-3% of your home's value annually for maintenance.",
      },
      {
        question: "What should I look for when viewing a property?",
        answer:
          "Check the roof, foundation, electrical and plumbing systems, HVAC, windows, and overall structural integrity. Look for signs of water damage, mold, or pest issues. Don't forget to consider the neighborhood, schools, and proximity to amenities that matter to you.",
      },
    ],
  };

  const categories = [
    {
      id: "all",
      label: "All Questions",
      count: Object.values(faqData).flat().length,
    },
    { id: "buying", label: "Buying", count: faqData.buying.length },
    { id: "selling", label: "Selling", count: faqData.selling.length },
    { id: "investing", label: "Investing", count: faqData.investing.length },
    { id: "financing", label: "Financing", count: faqData.financing.length },
    { id: "general", label: "General", count: faqData.general.length },
  ];

  const getFilteredFAQs = () => {
    if (activeCategory === "all") {
      return Object.values(faqData).flat();
    }
    return faqData[activeCategory] || [];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {showCategories && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.label}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      )}

      <Accordion type="single" collapsible className="w-full">
        {getFilteredFAQs().map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Still have questions? We're here to help!
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Contact Our Team
        </Button>
      </div>
    </div>
  );
};

export default FAQAdvanced;
