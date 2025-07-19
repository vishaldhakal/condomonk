"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqData = [
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
      question:
        "What's the difference between pre-qualification and pre-approval?",
      answer:
        "Pre-qualification is a basic assessment based on self-reported information, while pre-approval involves a thorough review of your financial documents by a lender. Pre-approval carries more weight with sellers and gives you a more accurate picture of what you can afford.",
    },
    {
      question: "How do I know if a property is a good investment?",
      answer:
        "Consider factors like location, property condition, market trends, rental potential, and your long-term goals. Research comparable sales in the area, check for planned developments, and consider the property's potential for appreciation. Consulting with a real estate professional can provide valuable insights.",
    },
    {
      question: "What are the ongoing costs of homeownership?",
      answer:
        "Beyond your mortgage payment, expect property taxes, homeowners insurance, utilities, maintenance and repairs, HOA fees (if applicable), and potential assessments. It's wise to budget 1-3% of your home's value annually for maintenance.",
    },
    {
      question: "Can I buy a home with bad credit?",
      answer:
        "While it's more challenging, it's not impossible. Some lenders offer programs for borrowers with lower credit scores, though you may face higher interest rates and down payment requirements. Consider working on improving your credit score before applying for a mortgage.",
    },
    {
      question: "What should I look for when viewing a property?",
      answer:
        "Check the roof, foundation, electrical and plumbing systems, HVAC, windows, and overall structural integrity. Look for signs of water damage, mold, or pest issues. Don't forget to consider the neighborhood, schools, and proximity to amenities that matter to you.",
    },
    {
      question: "How do I negotiate the best price?",
      answer:
        "Research comparable sales in the area, understand the local market conditions, and work with an experienced real estate agent. Consider the property's condition, time on market, and seller motivation. Be prepared to walk away if the terms aren't right for you.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">
          Find answers to common questions about buying, selling, and investing
          in real estate.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqData.map((faq, index) => (
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
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
          Contact Our Team
        </button>
      </div>
    </div>
  );
};

export default FAQ;
