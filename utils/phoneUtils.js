/**
 * Formats a raw phone string into (XXX) XXX-XXXX style.
 * Strips all non-digit characters and limits to 10 digits.
 */
export function formatPhoneNumber(raw) {
  // Remove everything that isn't a digit
  const digits = raw.replace(/\D/g, "").slice(0, 10);

  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * KeyDown handler that blocks any key that isn't a digit,
 * navigation key, or editing key.
 */
export function handlePhoneKeyDown(e) {
  const allowed = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
  ];
  const isDigit = /^\d$/.test(e.key);
  const isCtrlOrMeta = e.ctrlKey || e.metaKey; // allow Ctrl+A, Ctrl+C etc.

  if (!isDigit && !allowed.includes(e.key) && !isCtrlOrMeta) {
    e.preventDefault();
  }
}
