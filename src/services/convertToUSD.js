export function convertToUSD(balance, currency) {
  let usd = 0;
  if (currency?.toLowerCase() === "btc") usd = balance * 117923;
  if (currency?.toLowerCase() === "eth") usd = balance * 2960.44;
  if (currency?.toLowerCase() === "usd") usd = balance * 1;
  if (currency?.toLowerCase() === "bnb") usd = balance * 687.65;
  if (currency?.toLowerCase() === "sol") usd = balance * 161.83;

  return usd;
}
