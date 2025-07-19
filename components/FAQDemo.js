"use client";

import React from "react";
import FAQ from "./FAQ";
import FAQAdvanced from "./FAQAdvanced";

const FAQDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Basic FAQ */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            FAQ Components Demo
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Basic FAQ Component
            </h2>
            <FAQ />
          </div>
        </div>

        {/* Advanced FAQ with Categories */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Advanced FAQ Component with Categories
          </h2>
          <FAQAdvanced />
        </div>

        {/* Customized FAQ */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Customized FAQ Component
          </h2>
          <FAQAdvanced
            title="Real Estate Investment FAQ"
            subtitle="Everything you need to know about investing in real estate properties."
            defaultCategory="investing"
          />
        </div>

        {/* FAQ without categories */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            FAQ Without Category Filter
          </h2>
          <FAQAdvanced
            title="General Real Estate Questions"
            subtitle="Common questions about real estate transactions."
            showCategories={false}
          />
        </div>
      </div>
    </div>
  );
};

export default FAQDemo;
