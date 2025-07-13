import { convertToUSD } from "./convertToUSD";

export function getBalance(balances) {
  let highestUsdValue = 0;
  let highestValueSymbol;

  balances.forEach((balance) => {
    const usdValue = convertToUSD(balance.balance, balance.symbol);
    if (usdValue > highestUsdValue) {
      highestUsdValue = usdValue;
      highestValueSymbol = balance.symbol;
    }
  });

  const highestBalance = balances.find(
    (balance) =>
      balance.symbol.toLowerCase() === highestValueSymbol.toLowerCase()
  );

  return highestBalance;
}
