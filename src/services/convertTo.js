export function convertTo(balance, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return formatResult(balance, toCurrency);

  let value;

  if (fromCurrency === "USD") {
    if (toCurrency === "BTC") value = balance / 117923;
    else if (toCurrency === "ETH") value = balance / 2960.44;
    else if (toCurrency === "BNB") value = balance / 687.65;
    else if (toCurrency === "SOL") value = balance / 161.83;
  } else if (fromCurrency === "BTC") {
    if (toCurrency === "USD") value = balance * 117923;
    else if (toCurrency === "ETH") value = (balance * 117923) / 2960.44;
    else if (toCurrency === "BNB") value = (balance * 117923) / 687.65;
    else if (toCurrency === "SOL") value = (balance * 117923) / 161.83;
  } else if (fromCurrency === "ETH") {
    if (toCurrency === "USD") value = balance * 2960.44;
    else if (toCurrency === "BTC") value = (balance * 2960.44) / 117923;
    else if (toCurrency === "BNB") value = (balance * 2960.44) / 687.65;
    else if (toCurrency === "SOL") value = (balance * 2960.44) / 161.83;
  } else if (fromCurrency === "BNB") {
    if (toCurrency === "USD") value = balance * 687.65;
    else if (toCurrency === "BTC") value = (balance * 687.65) / 117923;
    else if (toCurrency === "ETH") value = (balance * 687.65) / 2960.44;
    else if (toCurrency === "SOL") value = (balance * 687.65) / 161.83;
  } else if (fromCurrency === "SOL") {
    if (toCurrency === "USD") value = balance * 161.83;
    else if (toCurrency === "BTC") value = (balance * 161.83) / 117923;
    else if (toCurrency === "ETH") value = (balance * 161.83) / 2960.44;
    else if (toCurrency === "BNB") value = (balance * 161.83) / 687.65;
  } else {
    throw new Error("Unsupported currency conversion");
  }

  return formatResult(value, toCurrency);
}

function formatResult(value, currency) {
  return currency === "USD"
    ? Number(value).toFixed(2)
    : Number(value).toFixed(5);
}
