import { convertToUSD } from "./convertToUSD";

export function getBalance(balances) {
  let chosenBalance = 0;
  let chosenSymbol;
  let chosenName;
  balances.forEach((balance) => {
    const usdBalance = convertToUSD(balance.balance, balance.symbol);
    if (usdBalance > chosenBalance) {
      chosenBalance = balance.balance;
      chosenSymbol = balance.symbol;
      chosenName = balance.name;
    }
  });

  return { chosenName, chosenBalance, chosenSymbol };
}
