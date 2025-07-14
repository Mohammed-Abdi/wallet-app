export function convertTo(balance, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return formatResult(balance, toCurrency);

  let value;

  if (fromCurrency === "USD") {
    if (toCurrency === "BTC") value = balance / 117923;
    else if (toCurrency === "SOL") value = balance / 21;
    else if (toCurrency === "ETH") value = balance / 1850;
    else if (toCurrency === "BNB") value = balance / 314;
  } else if (fromCurrency === "BTC") {
    if (toCurrency === "USD") value = balance * 117923;
    else if (toCurrency === "SOL") value = (balance * 117923) / 21;
    else if (toCurrency === "ETH") value = (balance * 117923) / 1850;
    else if (toCurrency === "BNB") value = (balance * 117923) / 314;
  } else if (fromCurrency === "SOL") {
    if (toCurrency === "USD") value = balance * 21;
    else if (toCurrency === "BTC") value = (balance * 21) / 117923;
    else if (toCurrency === "ETH") value = (balance * 21) / 1850;
    else if (toCurrency === "BNB") value = (balance * 21) / 314;
  } else if (fromCurrency === "ETH") {
    if (toCurrency === "USD") value = balance * 1850;
    else if (toCurrency === "BTC") value = (balance * 1850) / 117923;
    else if (toCurrency === "SOL") value = (balance * 1850) / 21;
    else if (toCurrency === "BNB") value = (balance * 1850) / 314;
  } else if (fromCurrency === "BNB") {
    if (toCurrency === "USD") value = balance * 314;
    else if (toCurrency === "BTC") value = (balance * 314) / 117923;
    else if (toCurrency === "SOL") value = (balance * 314) / 21;
    else if (toCurrency === "ETH") value = (balance * 314) / 1850;
  } else {
    throw new Error("Unsupported currency conversion");
  }

  return formatResult(value, toCurrency);
}

function formatResult(value, currency) {
  if (currency === "USD") return Number(value).toFixed(2);
  else return Number(value).toFixed(5);
}
