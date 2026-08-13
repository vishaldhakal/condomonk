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
  const {
    buyerType,
    sizeNeed,
    interest,
    purchaseBudget,
    workingWithRealtor,
  } = preferences || {};

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

/**
 * Submit inquiry to contact-form API, optionally with preferences appended.
 */
export async function submitContactInquiry(inquiry, preferences = null) {
  if (!inquiry) return false;

  const prefsBlock = preferences ? formatPreferencesBlock(preferences) : "";
  const originalMessage = inquiry.message || "";
  const message = prefsBlock
    ? `${originalMessage}${prefsBlock}`.trim()
    : originalMessage;

  const realtor = preferences?.workingWithRealtor || inquiry.realtor || "No";

  const form_data = new FormData();
  form_data.append("name", inquiry.name || "");
  form_data.append("email", inquiry.email || "");
  form_data.append("phone", inquiry.phone || "");
  form_data.append("message", message);
  form_data.append("realtor", realtor);
  form_data.append(
    "source",
    inquiry.source ||
      (typeof window !== "undefined" ? window.location.href : ""),
  );
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

  // Deduplicate: silently succeed if this email already submitted today.
  const email = inquiry.email || "";
  if (hasSubmittedToday(email)) {
    console.log("[dedup] Inquiry suppressed — already submitted today:", email);
    return true;
  }

  try {
    await axios.post(
      "https://admin.homebaba.ca/api/contact-form-submit/",
      form_data,
      { headers: { "content-type": "multipart/form-data" } },
    );
    markSubmittedToday(email);
    return true;
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return false;
  }
}

/**
 * Preference-only follow-up when inquiry was already sent.
 * Appends preferences to the original message and re-sends once.
 */
export async function submitInquiryWithPreferences(inquiry, preferences) {
  if (!inquiry || !preferences) return false;
  if (
    !preferences.buyerType &&
    !preferences.sizeNeed &&
    !preferences.interest &&
    !preferences.purchaseBudget &&
    !preferences.workingWithRealtor
  ) {
    return false;
  }

  return submitContactInquiry(
    {
      ...inquiry,
      source: `${inquiry.source || ""} | Preference Update`.trim(),
      message: inquiry.message || "",
    },
    preferences,
  );
}

/**
 * Open the shared preference + thank-you popup.
 *
 * @param {object} options
 * @param {boolean} [options.pendingSubmit=false] - If true, inquiry is NOT sent yet;
 *   host will submit on Continue (with prefs), Skip, or Close (without prefs).
 * @param {object} [options.inquiry] - Form payload for submit / preference append
 * @param {number} [options.delayMs=320] - Wait so parent modals can close first
 */
export function openLeadFollowUp({
  userName = "",
  partnerName = null,
  partnerdata = null,
  inquiry = null,
  pendingSubmit = false,
  delayMs = 320,
} = {}) {
  if (typeof window === "undefined") return;

  const partner = getDisplayPartner(partnerdata);
  const resolvedPartnerName = partnerName || partner?.name || null;

  const detail = {
    userName: userName || inquiry?.name || "",
    partnerName: resolvedPartnerName,
    inquiry: inquiry || null,
    pendingSubmit: Boolean(pendingSubmit),
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
