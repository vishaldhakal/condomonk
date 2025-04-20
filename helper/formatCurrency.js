function formatCurrency(value) {
  // Check if the value is not null or undefined
  if (value != null) {
    return Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  } else {
    // Handle the case where the value is null or undefined
    return "N/A"; // or any default value or message you prefer
  }
}

export default formatCurrency;
