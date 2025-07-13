export function getBalance(balances) {
  let chosenBalance = 0;
  let chosenSymbol;
  let chosenName;
  balances.forEach((balance) => {
    if (balance.balance > chosenBalance) {
      chosenBalance = balance.balance;
      chosenSymbol = balance.symbol;
      chosenName = balance.name;
    }
  });

  return { chosenName, chosenBalance, chosenSymbol };
}
