"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  LEAD_FOLLOWUP_EVENT,
  BUDGET_OPTIONS,
  REALTOR_OPTIONS,
  submitContactInquiry,
  submitInquiryWithPreferences,
} from "@/helpers/leadFollowUp";

const BUYER_TYPE_OPTIONS = [
  { value: "downsizing", label: "Downsizing" },
  { value: "upsizing", label: "Upsizing" },
  { value: "first_time", label: "First time home buyer" },
  { value: "looking_to_invest", label: "Looking to invest" },
];

const SIZE_OPTIONS = [
  { value: "1500-2000", label: "1,500 - 2,000 sqft" },
  { value: "2000-2500", label: "2,000 - 2,500 sqft" },
  { value: "above-2500", label: "Above 2,500 sqft" },
];

const INTEREST_OPTIONS = [
  { value: "open_to_similar", label: "Open to similar projects" },
  { value: "just_this", label: "Just this project" },
];

function RadioGroup({ name, label, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-[13px] font-semibold text-neutral-900">
        {label}
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const id = `${name}-${opt.value}`;
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              htmlFor={id}
              className={`cursor-pointer select-none rounded-full border px-3 py-1.5 text-[12px] sm:text-[13px] transition-colors ${
                selected
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
              }`}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function SelectField({ id, label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-semibold text-neutral-900"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-xl border border-neutral-200 bg-white px-3.5 py-3 pr-10 text-[13px] outline-none transition focus:border-neutral-400 focus:ring-1 focus:ring-neutral-300 ${
            value ? "text-neutral-900" : "text-neutral-400"
          }`}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="h-4 w-4 text-neutral-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function LeadFollowUpHost() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("prefs");
  const [userName, setUserName] = useState("");
  const [partnerName, setPartnerName] = useState(null);
  const [inquiry, setInquiry] = useState(null);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [buyerType, setBuyerType] = useState("");
  const [sizeNeed, setSizeNeed] = useState("");
  const [interest, setInterest] = useState("");
  const [purchaseBudget, setPurchaseBudget] = useState("");
  const [workingWithRealtor, setWorkingWithRealtor] = useState("");
  const [saving, setSaving] = useState(false);
  const didSubmitRef = useRef(false);

  const resetPrefs = useCallback(() => {
    setBuyerType("");
    setSizeNeed("");
    setInterest("");
    setPurchaseBudget("");
    setWorkingWithRealtor("");
    setStep("prefs");
    setSaving(false);
  }, []);

  useEffect(() => {
    const handler = (event) => {
      const detail = event?.detail || {};
      const nextInquiry = detail.inquiry || null;
      setUserName(detail.userName || "");
      setPartnerName(detail.partnerName || null);
      setInquiry(nextInquiry);
      setPendingSubmit(Boolean(detail.pendingSubmit));
      didSubmitRef.current = !detail.pendingSubmit;
      setBuyerType("");
      setSizeNeed("");
      setInterest("");
      setPurchaseBudget("");
      setWorkingWithRealtor("");
      setStep("prefs");
      setSaving(false);
      setOpen(true);
    };

    window.addEventListener(LEAD_FOLLOWUP_EVENT, handler);
    return () => window.removeEventListener(LEAD_FOLLOWUP_EVENT, handler);
  }, []);

  const canContinue = Boolean(
    buyerType && sizeNeed && interest && purchaseBudget && workingWithRealtor,
  );

  const ensureInquirySent = async (preferences = null) => {
    if (!inquiry || didSubmitRef.current) {
      // Inquiry already sent - only push preferences if user filled them
      if (!pendingSubmit && preferences && inquiry) {
        await submitInquiryWithPreferences(inquiry, preferences);
      }
      return true;
    }

    const ok = await submitContactInquiry(inquiry, preferences);
    if (ok) didSubmitRef.current = true;
    return ok;
  };

  const handleContinue = async () => {
    if (!canContinue || saving) return;
    setSaving(true);
    await ensureInquirySent({
      buyerType,
      sizeNeed,
      interest,
      purchaseBudget,
      workingWithRealtor,
    });
    setSaving(false);
    setStep("thanks");
  };

  const handleOpenChange = async (next) => {
    if (!next) {
      // Outside click / X close: still submit the inquiry if pending
      if (pendingSubmit && inquiry && !didSubmitRef.current) {
        setSaving(true);
        await ensureInquirySent(null);
        setSaving(false);
      }
      setOpen(false);
      resetPrefs();
      setUserName("");
      setPartnerName(null);
      setInquiry(null);
      setPendingSubmit(false);
      didSubmitRef.current = false;
      return;
    }
    setOpen(next);
  };

  const thankYouLine = partnerName
    ? `${partnerName} will contact you shortly.`
    : "Our team will contact you shortly.";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[400px] w-[calc(100%-2rem)] gap-0 p-0 overflow-hidden rounded-2xl border-neutral-200 max-h-[min(90vh,720px)] overflow-y-auto">
        {step === "prefs" ? (
          <div className="p-5 sm:p-6">
            <DialogHeader className="mb-5 space-y-1 text-left">
              <DialogTitle className="text-lg font-bold text-neutral-900">
                Quick preferences
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5">
              <SelectField
                id="purchaseBudget"
                label="Purchase budget?"
                value={purchaseBudget}
                onChange={setPurchaseBudget}
                options={BUDGET_OPTIONS}
                placeholder="Select an option"
              />
              <SelectField
                id="workingWithRealtor"
                label="Are you working with a Realtor?"
                value={workingWithRealtor}
                onChange={setWorkingWithRealtor}
                options={REALTOR_OPTIONS}
                placeholder="Select an option"
              />
              <RadioGroup
                name="buyerType"
                label="I am"
                options={BUYER_TYPE_OPTIONS}
                value={buyerType}
                onChange={setBuyerType}
              />
              <RadioGroup
                name="sizeNeed"
                label="I am looking for"
                options={SIZE_OPTIONS}
                value={sizeNeed}
                onChange={setSizeNeed}
              />
              <RadioGroup
                name="interest"
                label="I am"
                options={INTEREST_OPTIONS}
                value={interest}
                onChange={setInterest}
              />
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue || saving}
              className="mt-6 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              {saving ? "Sending..." : "Continue"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center px-6 py-10 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2
                className="h-8 w-8 text-emerald-600"
                strokeWidth={1.75}
              />
            </div>
            <DialogHeader className="w-full space-y-2 text-center sm:text-center items-center">
              <DialogTitle className="text-xl font-bold text-neutral-900 text-center">
                Thank you{userName ? `, ${userName.split(" ")[0]}` : ""}
              </DialogTitle>
              <DialogDescription className="text-base text-neutral-600 leading-relaxed text-center max-w-[280px] mx-auto">
                {thankYouLine}
              </DialogDescription>
            </DialogHeader>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-7 rounded-xl bg-neutral-900 px-8 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
