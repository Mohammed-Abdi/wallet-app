import { convertToUSD } from "./convertToUSD";

export function calcTotal(balances, currency) {
  const balance = balances?.reduce(
    (acc, cur) => acc + convertToUSD(cur?.balance, cur.symbol),
    0
  );

  let value;
  if (currency?.toLowerCase() === "btc") value = balance / 117923;
  if (currency?.toLowerCase() === "eth") value = balance / 2960.44;
  if (currency?.toLowerCase() === "usd") value = balance / 1;
  if (currency?.toLowerCase() === "bnb") value = balance / 687.65;
  if (currency?.toLowerCase() === "sol") value = balance / 161.83;

  return value;
}
