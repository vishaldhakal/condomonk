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
    <div
      className={`max-w-3xl ${
        align == "center" ? "mx-auto" : ""
      }  bg-white rounded-lg overflow-hidden sm:mb-20`}
    >
      <div className="">
        <h2 className={`font-semibold pb-3 text-2xl sm:text-3xl`}>
          Mortgage Calculator
        </h2>
        <p
          className={`text-gray-500 mt-2  ${
            align === "center" ? "text-center" : ""
          }`}
        >
          Calculate your monthly mortgage payments based on the home value,
        </p>
        {/* <div className="mb-10"></div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="grid grid-cols-1 gap-4">
            <FloatingLabelInput
              id="hvalue"
              label="Home Value"
              value={priceNumber ? priceNumber : ""}
              onChange={handleChange}
              prefix="$"
            />
            <div className="flex">
              <FloatingLabelInput
                id="dpay"
                label="Down Payment"
                value={formatCurrency(calculatordata.dpay).replace("$", "")}
                onChange={handleChange}
                prefix="$"
              />
              <FloatingLabelInput
                id="dper"
                label="Down Payment %"
                value={calculatordata.dper}
                onChange={handleChange}
                suffix="%"
              />
            </div>
            <FloatingLabelInput
              id="loanamt"
              label="Mortgage Amount"
              value={formatCurrency(calculatordata.loanamt).replace("$", "")}
              onChange={handleChange}
              prefix="$"
              disabled
            />
            <FloatingLabelInput
              id="intrate"
              label="Interest Rate"
              value={calculatordata.intrate}
              onChange={handleChange}
              suffix="%"
            />
            <FloatingLabelInput
              id="loanterm"
              label="Mortgage Term"
              value={calculatordata.loanterm}
              onChange={handleChange}
              suffix="Yrs"
            />
          </div>

          <div className="mt-8">
            <svg width="400" height="250">
              {(calculatordata.loanamt > 10 || intrest > 10) && (
                <>
                  <VictoryPie
                    standalone={false}
                    width={350}
                    height={200}
                    data={[
                      {
                        x: `Mortgage \n$ ${parseInt(
                          calculatordata.loanamt
                        ).toLocaleString()}`,
                        y: parseInt(calculatordata.loanamt),
                      },
                      {
                        x: `Interest \n $ ${parseInt(
                          intrest
                        ).toLocaleString()}`,
                        y: parseInt(intrest),
                      },
                    ]}
                    innerRadius={68}
                    labelRadius={80}
                    colorScale={["rgb(82 170 146)", "rgb(82 130 146)"]}
                  />
                  <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 16 }}
                    x={190}
                    y={145}
                    text={"$" + calculated + "/mo"}
                  />
                </>
              )}
            </svg>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                ${calculated} <span className="text-lg text-gray-600">/mo</span>
              </h3>
              <p className="text-gray-600">
                Your Estimated Monthly Mortgage Payment
              </p>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <>
          <div className="bg-gray-50 p-8">
            <h3 className="text-2xl font-bold mb-4">
              Steps to Calculate Your Payments
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Determine the purchase price of the home.</li>
              <li>
                Calculate the down payment (usually 5-20% of the purchase price
                in Canada).
              </li>
              <li>
                Subtract the down payment from the purchase price to get the
                mortgage amount.
              </li>
              <li>
                Choose a mortgage term (typically 5 years in Canada) and
                amortization period (usually 25-30 years).
              </li>
              <li>
                Determine the interest rate (check current rates from Canadian
                lenders).
              </li>
              <li>
                Use a mortgage calculator to determine the monthly payment.
              </li>
              <li>
                Factor in additional costs like property taxes and home
                insurance.
              </li>
              <li>
                Consider the impact of making accelerated bi-weekly payments.
              </li>
              <li>
                Review the total interest paid over the life of the mortgage.
              </li>
              <li>
                Ensure the monthly payments fit within your budget (typically
                not exceeding 32% of your gross monthly income for housing
                costs).
              </li>
            </ol>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4">Terms Explained</h3>
            <dl className="space-y-4">
              {[
                {
                  term: "Home Value",
                  def: "The current market value or purchase price of the property.",
                },
                {
                  term: "Down Payment",
                  def: "The initial upfront portion of the total home purchase price paid by the buyer.",
                },
                {
                  term: "Mortgage Amount",
                  def: "The amount borrowed from a lender to purchase the home (Home Value minus Down Payment).",
                },
                {
                  term: "Interest Rate",
                  def: "The percentage charged by the lender for borrowing the money, usually expressed as an annual rate.",
                },
                {
                  term: "Mortgage Term",
                  def: "The length of time your mortgage agreement and interest rate are in effect (typically 1-5 years in Canada).",
                },
              ].map(({ term, def }) => (
                <div key={term}>
                  <dt className="font-semibold text-gray-800">{term}</dt>
                  <dd className="text-gray-600 mt-1">{def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </>
      )}

      <div
        className={`bg-gray-100 p-4 mt-8 ${
          align === "center" ? "text-center" : ""
        } text-sm text-gray-600`}
      >
        <p>
          This calculator is for demonstration purposes only. Always consult a
          professional financial advisor before making personal financial
          decisions.
        </p>
      </div>
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
  <div className="relative mt-4">
    <input
      type={type}
      id={id}
      className={`
        peer w-full h-[60px] px-4 pt-4 pb-1 rounded-md
        bg-white border border-gray-300 text-gray-900 text-base
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
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
        peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5
        peer-focus:top-1 peer-focus:text-xs 
        ${prefix ? "left-8" : ""}
      `}
    >
      {label}
    </label>
    {prefix && (
      <span className="absolute left-3 top-3.5 text-gray-500">{prefix}</span>
    )}
    {suffix && (
      <span className="absolute right-3 top-3.5 text-gray-500">{suffix}</span>
    )}
  </div>
);
