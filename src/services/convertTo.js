export function convertTo(balance, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return balance;

  if (fromCurrency === "USD") {
    if (toCurrency === "BTC") return balance / 117923;
    else if (toCurrency === "SOL") return balance / 21;
    else if (toCurrency === "ETH") return balance / 1850;
    else if (toCurrency === "BNB") return balance / 314;
  } else if (fromCurrency === "BTC") {
    if (toCurrency === "USD") return balance * 117923;
    else if (toCurrency === "SOL") return (balance * 117923) / 21;
    else if (toCurrency === "ETH") return (balance * 117923) / 1850;
    else if (toCurrency === "BNB") return (balance * 117923) / 314;
  } else if (fromCurrency === "SOL") {
    if (toCurrency === "USD") return balance * 21;
    else if (toCurrency === "BTC") return (balance * 21) / 117923;
    else if (toCurrency === "ETH") return (balance * 21) / 1850;
    else if (toCurrency === "BNB") return (balance * 21) / 314;
  } else if (fromCurrency === "ETH") {
    if (toCurrency === "USD") return balance * 1850;
    else if (toCurrency === "BTC") return (balance * 1850) / 117923;
    else if (toCurrency === "SOL") return (balance * 1850) / 21;
    else if (toCurrency === "BNB") return (balance * 1850) / 314;
  } else if (fromCurrency === "BNB") {
    if (toCurrency === "USD") return balance * 314;
    else if (toCurrency === "BTC") return (balance * 314) / 117923;
    else if (toCurrency === "SOL") return (balance * 314) / 21;
    else if (toCurrency === "ETH") return (balance * 314) / 1850;
  }

  throw new Error("Unsupported currency conversion");
}
