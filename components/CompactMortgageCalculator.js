"use client";
import formatCurrency from "@/helper/formatCurrency";
import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";

export default function CompactMortgageCalculator({
  price,
  showDetails = true,
  align = "center",
}) {
  const [intrest, setIntrest] = useState(0);
  const [calculatordata, setCalculatordata] = useState({
    hvalue: price || "",
    dpay: "",
    dper: "20",
    loanamt: "",
    intrate: "4",
    loanterm: "30",
  });
  const [calculated, setCalculated] = useState(null);

  useEffect(() => {
    let val =
      (parseFloat(calculatordata.loanamt) *
        parseFloat(calculatordata.loanterm) *
        parseFloat(calculatordata.intrate)) /
      100;
    setIntrest(val);
  }, [calculatordata.loanamt, calculatordata.loanterm, calculatordata.intrate]);

  useEffect(() => {
    let hvalue = parseFloat(calculatordata.hvalue) || 0;
    let dpay = parseFloat(calculatordata.dpay) || 0;
    let dper = parseFloat(calculatordata.dper) || 0;

    // Update down payment amount if percentage changes
    if (dper !== (dpay / hvalue) * 100) {
      dpay = (dper / 100) * hvalue;
      setCalculatordata((prev) => ({ ...prev, dpay: dpay.toFixed(2) }));
    }

    // Update down payment percentage if amount changes
    if (dpay !== (dper / 100) * hvalue) {
      dper = (dpay / hvalue) * 100;
      setCalculatordata((prev) => ({ ...prev, dper: dper.toFixed(2) }));
    }

    // Calculate loan amount
    let loanamt = hvalue - dpay;
    setCalculatordata((prev) => ({ ...prev, loanamt: loanamt.toFixed(2) }));
  }, [calculatordata.hvalue, calculatordata.dpay, calculatordata.dper]);

  useEffect(() => {
    setCalculated(CalcMonth().toFixed(2));
  }, [calculatordata]);

  function CalcMonth() {
    let i = parseFloat(calculatordata.intrate) / 100;
    let g = i / 12;
    let h = 1 + g;
    let tenn = parseInt(calculatordata.loanterm * 12);
    let powerr = Math.pow(h, tenn);
    let aa = g * powerr;
    let numm = parseFloat(calculatordata.loanamt) * aa;
    let deno = powerr - 1;
    let monthh = numm / deno;
    return monthh;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCalculatordata((prevState) => ({
      ...prevState,
      [id]: value.replace("-", "").replace("$", "").replaceAll(",", ""),
    }));
  };

  const priceNumber = formatCurrency(calculatordata.hvalue).replace("$", "");

  return (
    <div className={`max-w-4xl ${align == "center" ? "mx-auto" : ""}`}>
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          MORTGAGE INFO
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Input Fields */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">
                SALE PRICE
              </label>
              <input
                type="text"
                id="hvalue"
                value={priceNumber ? `$${priceNumber}` : ""}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border-0 rounded-lg text-gray-900 text-lg font-medium focus:ring-0"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">
                PERCENT DOWN PAYMENT
              </label>
              <input
                type="text"
                id="dper"
                value={`${calculatordata.dper}`}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border-0 rounded-lg text-gray-900 text-lg font-medium focus:ring-0"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">
                DOWN PAYMENT
              </label>
              <input
                type="text"
                id="dpay"
                value={`$${formatCurrency(calculatordata.dpay).replace(
                  "$",
                  ""
                )}`}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border-0 rounded-lg text-gray-900 text-lg font-medium focus:ring-0"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">
                AMORTIZATION PERIOD (YEARS)
              </label>
              <input
                type="text"
                id="loanterm"
                value={calculatordata.loanterm}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border-0 rounded-lg text-gray-900 text-lg font-medium focus:ring-0"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">
                INTEREST RATE
              </label>
              <input
                type="text"
                id="intrate"
                value={calculatordata.intrate}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border-0 rounded-lg text-gray-900 text-lg font-medium focus:ring-0"
              />
            </div>
          </div>

          {/* Right Column - Payment Display */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-6">
              ESTIMATED PAYMENT
            </h3>
            <div className="relative">
              <svg width="100%" height="300">
                {(calculatordata.loanamt > 10 || intrest > 10) && (
                  <>
                    <VictoryPie
                      standalone={false}
                      width={300}
                      height={300}
                      data={[
                        {
                          x: "Principal and Interest",
                          y: parseInt(calculatordata.loanamt),
                        },
                        {
                          x: "Property Taxes",
                          y: parseInt(intrest),
                        },
                      ]}
                      innerRadius={85}
                      labelRadius={1}
                      colorScale={["#4299E1", "#FC8181"]}
                      style={{
                        labels: { display: "none" },
                        data: {
                          fillOpacity: 0.9,
                          stroke: "#fff",
                          strokeWidth: 2,
                        },
                      }}
                    />
                    <VictoryLabel
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={150}
                      y={150}
                      style={[
                        { fontSize: 32, fontWeight: "bold" },
                        { fontSize: 16, fill: "#718096" },
                      ]}
                      text={[`$${calculated}`, "/ month"]}
                    />
                  </>
                )}
              </svg>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-600">
                  ${formatCurrency(calculatordata.loanamt).replace("$", "")}{" "}
                  Principal and Interest
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                <span className="text-gray-600">
                  ${formatCurrency(intrest).replace("$", "")} Property Taxes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remove or update showDetails section as needed */}
    </div>
  );
}

const FloatingLabelInput = ({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  disabled,
  type = "text",
}) => (
  <div className="relative">
    <input
      type={type}
      id={id}
      className={`
        peer w-full h-14 px-4 pt-4 pb-1 rounded-lg
        bg-white border-2 border-gray-200 text-gray-900 text-base
        focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
        transition-colors duration-200
        ${disabled ? "bg-gray-50 cursor-not-allowed" : ""}
        ${prefix ? "pl-8" : ""}
        ${suffix ? "pr-8" : ""}
      `}
      placeholder=" "
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    <label
      htmlFor={id}
      className={`
        absolute top-1 left-4 text-gray-500 text-xs transition-all duration-200
        peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-600
        ${prefix ? "left-8" : ""}
      `}
    >
      {label}
    </label>
    {prefix && (
      <span className="absolute left-3 top-4 text-gray-500">{prefix}</span>
    )}
    {suffix && (
      <span className="absolute right-3 top-4 text-gray-500">{suffix}</span>
    )}
  </div>
);
