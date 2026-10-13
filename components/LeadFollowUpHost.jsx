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
  flushInquiryOnExit,
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
  const [buyerType, setBuyerType] = useState("");
  const [sizeNeed, setSizeNeed] = useState("");
  const [interest, setInterest] = useState("");
  const [purchaseBudget, setPurchaseBudget] = useState("");
  const [workingWithRealtor, setWorkingWithRealtor] = useState("");
  const [saving, setSaving] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  // Inquiry that still has to be sent (null once delivered or in flight)
  const pendingInquiryRef = useRef(null);
  // Preferences the visitor confirmed with Continue, reused if a retry is needed
  const confirmedPrefsRef = useRef(null);
  const inFlightRef = useRef(null);
  // Bumped on every open/close so a stale send cannot touch a newer popup
  const sessionRef = useRef(0);

  const resetPrefs = useCallback(() => {
    setBuyerType("");
    setSizeNeed("");
    setInterest("");
    setPurchaseBudget("");
    setWorkingWithRealtor("");
    setStep("prefs");
    setSaving(false);
    setSendFailed(false);
  }, []);

  // Sends the pending inquiry exactly once; puts it back if delivery failed
  // and the same popup is still open so Continue can be retried.
  const sendPending = useCallback((preferences = null) => {
    const pending = pendingInquiryRef.current;
    if (!pending) return inFlightRef.current?.request || Promise.resolve(true);

    const session = sessionRef.current;
    pendingInquiryRef.current = null;
    const request = submitContactInquiry(pending, preferences).then((ok) => {
      if (!ok && session === sessionRef.current) {
        pendingInquiryRef.current = pending;
      }
      if (inFlightRef.current?.request === request) inFlightRef.current = null;
      return ok;
    });
    inFlightRef.current = { request, inquiry: pending };
    return request;
  }, []);

  // Dismissed popup: deliver whatever is still unsent in the background.
  const settlePending = useCallback(() => {
    const preferences = confirmedPrefsRef.current;
    confirmedPrefsRef.current = null;
    // Claim the unsent inquiry now: a new popup may set its own right after this
    const unsent = pendingInquiryRef.current;
    pendingInquiryRef.current = null;
    const inFlight = inFlightRef.current;

    const deliver = (pending) =>
      submitContactInquiry(pending, preferences).then((ok) => {
        if (!ok) flushInquiryOnExit(pending, preferences);
      });

    if (unsent) {
      deliver(unsent);
    } else if (inFlight) {
      // Continue was pressed and is still sending; retry only if it fails
      inFlight.request.then((ok) => {
        if (!ok) deliver(inFlight.inquiry);
      });
    }
  }, []);

  useEffect(() => {
    const handler = (event) => {
      const detail = event?.detail || {};
      // A previous popup was replaced before it was answered
      settlePending();
      sessionRef.current += 1;
      pendingInquiryRef.current = detail.inquiry || null;
      setUserName(detail.userName || "");
      setPartnerName(detail.partnerName || null);
      resetPrefs();
      setOpen(true);
    };

    // Tab closed / refreshed while the questions are still open
    const handlePageHide = () => {
      const pending = pendingInquiryRef.current;
      if (!pending) return;
      pendingInquiryRef.current = null;
      flushInquiryOnExit(pending, confirmedPrefsRef.current);
    };

    window.addEventListener(LEAD_FOLLOWUP_EVENT, handler);
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      window.removeEventListener(LEAD_FOLLOWUP_EVENT, handler);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [resetPrefs, settlePending]);

  const canContinue = Boolean(
    buyerType && sizeNeed && interest && purchaseBudget && workingWithRealtor,
  );

  const handleContinue = async () => {
    if (!canContinue || saving) return;
    const session = sessionRef.current;
    const preferences = {
      buyerType,
      sizeNeed,
      interest,
      purchaseBudget,
      workingWithRealtor,
    };
    confirmedPrefsRef.current = preferences;
    setSaving(true);
    setSendFailed(false);
    const ok = await sendPending(preferences);
    if (session !== sessionRef.current) return;
    setSaving(false);
    if (ok) {
      setStep("thanks");
    } else {
      setSendFailed(true);
    }
  };

  const handleOpenChange = (next) => {
    if (next) {
      setOpen(true);
      return;
    }
    // Outside click / X / Done: close right away, send without blocking the UI
    sessionRef.current += 1;
    setOpen(false);
    resetPrefs();
    setUserName("");
    setPartnerName(null);
    settlePending();
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

            {sendFailed && (
              <p role="alert" className="mt-4 text-[13px] text-red-600">
                We couldn&apos;t send your request. Please try again.
              </p>
            )}

            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue || saving}
              className={`${sendFailed ? "mt-3" : "mt-6"} w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300`}
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
