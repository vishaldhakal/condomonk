const STORAGE_KEY = "hb_inquiry_submissions";

/**
 * Returns today's date string in YYYY-MM-DD (local time).
 */
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Returns the stored map of { email -> lastSubmitDate }.
 */
function getStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

/**
 * Check if this email already submitted an inquiry today.
 * @param {string} email
 * @returns {boolean}
 */
export function hasSubmittedToday(email) {
  if (typeof window === "undefined" || !email) return false;
  try {
    const store = getStore();
    return store[email.toLowerCase().trim()] === todayKey();
  } catch {
    return false;
  }
}

/**
 * Mark this email as having submitted today.
 * Also prunes entries older than 2 days to keep storage tidy.
 * @param {string} email
 */
export function markSubmittedToday(email) {
  if (typeof window === "undefined" || !email) return;
  try {
    const today = todayKey();
    const store = getStore();

    // Prune stale entries
    for (const key of Object.keys(store)) {
      if (store[key] !== today) delete store[key];
    }

    store[email.toLowerCase().trim()] = today;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage unavailable — silently ignore
  }
}
