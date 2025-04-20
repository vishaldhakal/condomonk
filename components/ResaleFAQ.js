import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResaleFAQ = ({ property }) => {
  const faqs = [
    {
      question: "What type of property is this?",
      answer: `This is a ${property.PropertySubType} property that is currently ${property.TransactionType}.`,
    },
    {
      question: "How many bedrooms and bathrooms does this property have?",
      answer: `This property features ${property.BedroomsTotal} bedrooms and ${
        (property.WashroomsType1Pcs || 0) + (property.WashroomsType2Pcs || 0)
      } bathrooms.`,
    },
    {
      question: "How many parking spaces are available?",
      answer: `${
        property.ParkingSpaces || "Information about parking spaces"
      } parking spaces are available with this property.`,
    },
    {
      question: "Where is this property located?",
      answer: `This property is located at ${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix}, ${property.City}, ${property.StateOrProvince} ${property.PostalCode}.`,
    },
  ];

  return (
    <div className="bg-white rounded-lg pt-16 pb-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold ">
        Some information about this property - {property.StreetName}{" "}
        {property.StreetSuffix}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-sm font-medium pb-0">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ResaleFAQ;
