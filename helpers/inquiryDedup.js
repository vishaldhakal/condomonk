const STORAGE_KEY = "hb_inquiry_submissions";

// Used when localStorage is unavailable (private mode, blocked storage)
const memoryStore = {};

/**
 * Returns today's date string in YYYY-MM-DD (local time).
 */
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Returns the stored map of { identityKey -> lastSubmitDate }.
 */
function getStore() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object"
      ? { ...memoryStore, ...parsed }
      : { ...memoryStore };
  } catch {
    return { ...memoryStore };
  }
}

/**
 * Identity keys for a contact: normalized email and 10-digit phone.
 * "(416) 555-1234", "416-555-1234" and "+1 416 555 1234" all map to one key.
 */
function identityKeys({ email, phone } = {}) {
  const keys = [];
  const normalizedEmail = String(email || "")
    .toLowerCase()
    .trim();
  if (normalizedEmail) keys.push(`e:${normalizedEmail}`);

  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length >= 7) keys.push(`p:${digits.slice(-10)}`);

  return keys;
}

/**
 * Check if this email OR phone number already submitted an inquiry today.
 * @param {{ email?: string, phone?: string }} contact
 * @returns {boolean}
 */
export function hasSubmittedToday(contact) {
  if (typeof window === "undefined") return false;
  const keys = identityKeys(contact);
  if (keys.length === 0) return false;
  const store = getStore();
  const today = todayKey();
  return keys.some((key) => store[key] === today);
}

/**
 * Mark this email and phone number as having submitted today.
 * Also prunes entries from previous days to keep storage tidy.
 * @param {{ email?: string, phone?: string }} contact
 */
export function markSubmittedToday(contact) {
  if (typeof window === "undefined") return;
  const keys = identityKeys(contact);
  if (keys.length === 0) return;

  const today = todayKey();
  const store = getStore();

  // Prune stale entries
  for (const key of Object.keys(store)) {
    if (store[key] !== today) delete store[key];
  }
  for (const key of Object.keys(memoryStore)) {
    if (memoryStore[key] !== today) delete memoryStore[key];
  }

  for (const key of keys) {
    store[key] = today;
    memoryStore[key] = today;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage unavailable — memoryStore still covers this page session
  }
}
