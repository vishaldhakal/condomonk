import axios from "axios";
import { getDisplayPartner } from "@/helpers/partnerDisplay";
import { hasSubmittedToday, markSubmittedToday } from "@/helpers/inquiryDedup";

export const LEAD_FOLLOWUP_EVENT = "homebaba:lead-followup";

export const BUYER_LABELS = {
  downsizing: "Downsizing",
  upsizing: "Upsizing",
  first_time: "First time home buyer",
  looking_to_invest: "Looking to invest",
};

export const SIZE_LABELS = {
  "1500-2000": "1,500 – 2,000 sqft",
  "2000-2500": "2,000 – 2,500 sqft",
  "above-2500": "Above 2,500 sqft",
};

export const INTEREST_LABELS = {
  open_to_similar: "Open to similar projects",
  just_this: "Just this project",
};

export const BUDGET_OPTIONS = [
  { value: "under-500k", label: "Under $500,000" },
  { value: "500k-750k", label: "$500,000 – $750,000" },
  { value: "750k-1m", label: "$750,000 – $1,000,000" },
  { value: "1m-1.5m", label: "$1,000,000 – $1,500,000" },
  { value: "1.5m-2m", label: "$1,500,000 – $2,000,000" },
  { value: "above-2m", label: "Above $2,000,000" },
];

export const BUDGET_LABELS = Object.fromEntries(
  BUDGET_OPTIONS.map((opt) => [opt.value, opt.label]),
);

export const REALTOR_OPTIONS = [
  { value: "No", label: "No" },
  { value: "Yes", label: "Yes" },
];

/**
 * Build preference text to append into the inquiry message.
 */
export function formatPreferencesBlock(preferences = {}) {
  const { buyerType, sizeNeed, interest, purchaseBudget, workingWithRealtor } =
    preferences || {};

  if (
    !buyerType &&
    !sizeNeed &&
    !interest &&
    !purchaseBudget &&
    !workingWithRealtor
  ) {
    return "";
  }

  const lines = ["", "--- Quick Preferences ---"];
  if (buyerType) {
    lines.push(`I am: ${BUYER_LABELS[buyerType] || buyerType}`);
  }
  if (sizeNeed) {
    lines.push(`Looking for: ${SIZE_LABELS[sizeNeed] || sizeNeed}`);
  }
  if (interest) {
    lines.push(`Interest: ${INTEREST_LABELS[interest] || interest}`);
  }
  if (purchaseBudget) {
    lines.push(
      `Purchase budget: ${BUDGET_LABELS[purchaseBudget] || purchaseBudget}`,
    );
  }
  if (workingWithRealtor) {
    lines.push(`Working with a Realtor: ${workingWithRealtor}`);
  }
  return lines.join("\n");
}

const DEFAULT_ENDPOINT = "https://admin.homebaba.ca/api/contact-form-submit/";

/**
 * Resolve the final message / realtor answer and the request for an inquiry.
 *
 * Inquiry options beyond the contact fields:
 *  - endpoint: API url (defaults to the contact-form endpoint)
 *  - nameField: form field used for the name (defaults to "name")
 *  - extraFields: additional form fields for that endpoint
 *  - send: async (payload) => void, replaces the HTTP post entirely
 */
function buildInquiryRequest(inquiry, preferences = null) {
  const prefsBlock = preferences ? formatPreferencesBlock(preferences) : "";
  const originalMessage = inquiry.message || "";
  const message = prefsBlock
    ? `${originalMessage}${prefsBlock}`.trim()
    : originalMessage;
  const realtor = preferences?.workingWithRealtor || inquiry.realtor || "No";
  const source =
    inquiry.source ||
    (typeof window !== "undefined" ? window.location.href : "");
  const url = inquiry.endpoint || DEFAULT_ENDPOINT;

  const form_data = new FormData();
  form_data.append(inquiry.nameField || "name", inquiry.name || "");
  form_data.append("email", inquiry.email || "");
  form_data.append("phone", inquiry.phone || "");
  form_data.append("message", message);
  form_data.append("realtor", realtor);
  form_data.append("source", source);

  if (url === DEFAULT_ENDPOINT) {
    form_data.append(
      "proj_name",
      inquiry.proj_name || inquiry.project_namee || "",
    );
    form_data.append(
      "cityy",
      inquiry.cityy ||
        (typeof window !== "undefined"
          ? window.location.pathname.split("/")[1] || ""
          : ""),
    );
    form_data.append("full_url", inquiry.full_url || source);
  }

  for (const [key, value] of Object.entries(inquiry.extraFields || {})) {
    if (value !== undefined && value !== null) form_data.append(key, value);
  }

  return { url, form_data, message, realtor };
}

/**
 * Submit an inquiry once, optionally with preferences appended.
 * Resolves true when the lead was delivered OR when the same email / phone
 * already submitted today (the visitor still sees success, nothing is sent).
 */
export async function submitContactInquiry(inquiry, preferences = null) {
  if (!inquiry) return false;

  // Deduplicate: silently succeed if this email or phone already submitted today.
  if (hasSubmittedToday(inquiry)) return true;

  const { url, form_data, message, realtor } = buildInquiryRequest(
    inquiry,
    preferences,
  );

  try {
    if (typeof inquiry.send === "function") {
      await inquiry.send({ ...inquiry, message, realtor });
    } else {
      await axios.post(url, form_data, {
        headers: { "content-type": "multipart/form-data" },
      });
    }
    markSubmittedToday(inquiry);
    return true;
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return false;
  }
}

/**
 * Last-chance delivery when the page is going away (tab closed, refresh) or a
 * normal submit failed after the popup was dismissed. Fire-and-forget.
 */
export function flushInquiryOnExit(inquiry, preferences = null) {
  if (typeof window === "undefined" || !inquiry) return;
  if (hasSubmittedToday(inquiry)) return;

  const { url, form_data, message, realtor } = buildInquiryRequest(
    inquiry,
    preferences,
  );

  try {
    if (typeof inquiry.send === "function") {
      Promise.resolve(inquiry.send({ ...inquiry, message, realtor })).catch(
        () => {},
      );
    } else if (
      !(navigator.sendBeacon && navigator.sendBeacon(url, form_data))
    ) {
      fetch(url, { method: "POST", body: form_data, keepalive: true }).catch(
        () => {},
      );
    }
    markSubmittedToday(inquiry);
  } catch (error) {
    console.error("Failed to flush inquiry:", error);
  }
}

/**
 * Open the shared preference + thank-you popup.
 *
 * The inquiry is NOT sent by the calling form. The popup host sends it exactly
 * once: with preferences when the visitor completes the questions, or without
 * them when the popup is dismissed.
 *
 * @param {object} options
 * @param {object} options.inquiry - Form payload (see buildInquiryRequest)
 * @param {number} [options.delayMs=320] - Wait so parent modals can close first
 */
export function openLeadFollowUp({
  userName = "",
  partnerName = null,
  partnerdata = null,
  inquiry = null,
  delayMs = 320,
} = {}) {
  if (typeof window === "undefined") return;

  const partner = getDisplayPartner(partnerdata);
  const resolvedPartnerName = partnerName || partner?.name || null;

  const detail = {
    userName: userName || inquiry?.name || "",
    partnerName: resolvedPartnerName,
    inquiry: inquiry || null,
  };

  const dispatch = () => {
    window.dispatchEvent(
      new CustomEvent(LEAD_FOLLOWUP_EVENT, {
        detail,
      }),
    );
  };

  // Let any parent contact popup finish closing before Quick Preferences opens
  if (delayMs > 0) {
    window.setTimeout(dispatch, delayMs);
  } else {
    dispatch();
  }
}
