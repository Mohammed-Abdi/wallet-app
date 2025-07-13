import { convertToUSD } from "./convertToUSD";

export function getBalance(balances) {
  let chosenBalance = 0;
  let chosenSymbol;
  balances.forEach((balance) => {
    const usdBalance = convertToUSD(balance.balance, balance.symbol);
    if (usdBalance > chosenBalance) {
      chosenBalance = usdBalance;
      chosenSymbol = balance.symbol;
    }
  });

  const availableBalance = balances.find(
    (balance) => balance.symbol.toLowerCase() === chosenSymbol.toLowerCase()
  );

  return availableBalance;
}
