export const priceFormatter = (num) => {
  const numStr = num.toString();
  const length = numStr.length;
  const decimalIndex = numStr.indexOf(".");

  // Check if the number has more than four digits before the decimal point
  if (decimalIndex === -1 && length > 4) {
    // Handle integers with more than four digits
    if (numStr.slice(-3) === "000") {
      // Replace the last three zeros with 'K'
      return numStr.slice(0, length - 3) + "K";
    } else {
      // Replace the last three digits with 'K'
      return numStr.slice(0, length - 3) + "K";
    }
  } else if (decimalIndex !== -1 && decimalIndex > 4) {
    // Handle decimal numbers with more than four digits before the decimal point
    const wholeNumber = numStr.slice(0, decimalIndex);
    const decimalPart = numStr.slice(decimalIndex);

    if (wholeNumber.slice(-3) === "000") {
      // Replace the last three zeros with 'K'
      return wholeNumber.slice(0, wholeNumber.length - 3) + "K" + decimalPart;
    } else {
      // Replace the last three digits with 'K'
      return wholeNumber.slice(0, wholeNumber.length - 3) + "K" + decimalPart;
    }
  } else {
    // Return the original number if it has four digits or fewer before the decimal point
    return numStr;
  }
};
