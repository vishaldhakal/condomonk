/**
 * Formats a number as a price string with appropriate formatting
 * @param {number} price - The price to format
 * @param {boolean} [showCents=false] - Whether to show cents
 * @returns {string} Formatted price string
 */
export function formatPrice(price, showCents = false) {
  if (!price && price !== 0) return "N/A";

  try {
    return new Intl.NumberFormat("en-CA", {
      minimumFractionDigits: showCents ? 2 : 0,
      maximumFractionDigits: showCents ? 2 : 0,
    }).format(price);
  } catch (error) {
    console.error("Error formatting price:", error);
    return price.toString();
  }
}

/**
 * Formats a number with appropriate suffixes (K, M, B)
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (!num && num !== 0) return "N/A";

  try {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  } catch (error) {
    console.error("Error formatting number:", error);
    return num.toString();
  }
}

/**
 * Formats a date string into a readable format
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}
