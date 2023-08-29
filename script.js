/*      Solution 1
creating object for currency values
using 100 to address floating point decimals in currency
repeated iterations per single currency value
*/

const CURRENCY = {
  PENNY: 1,
  NICKEL: 5,
  DIME: 10,
  QUARTER: 25,
  ONE: 100,
  FIVE: 500,
  TEN: 1000,
  TWENTY: 2000,
  "ONE HUNDRED": 10000,
};

function checkCashRegister(price, cash, cid) {
  let changeDue = (cash - price) * 100;

  const cidTotal = cid.reduce((acc, denomination) => {
    return acc + denomination[1] * 100;
  }, 0);

  if (changeDue === cidTotal) {
    return { status: "CLOSED", change: cid };
  }

  const changeInHand = cid
    .reverse()
    .map(([name, value]) => {
      let totalChange = 0;
      // currencyValue is value of single currency type
      const currencyValue = CURRENCY[name];
      // denominationValue is full value of currency type in cid
      let denominationValue = value * 100;

      while (denominationValue > 0 && currencyValue <= changeDue) {
        totalChange += currencyValue;
        changeDue -= currencyValue;
        denominationValue -= currencyValue;
      }
      return [name, totalChange / 100];
      // filter to return only currency provied for change
    })
    .filter(([, total]) => total > 0);

  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  return { status: "OPEN", change: changeInHand };
}
/*    END  Solution 1   */

/*      Solution 2
creating array for currency values
using Math.floor and .toFixed(2) to address floating point decimals in currency
iterations per currency full value available
*/

const MONEY = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1.0],
  ["FIVE", 5.0],
  ["TEN", 10.0],
  ["TWENTY", 20.0],
  ["ONE HUNDRED", 100.0],
];

function checkCashRegister2(price, cash, cid) {
  const status = ["OPEN", "CLOSED", "INSUFFICIENT_FUNDS"];
  let statusAndChange = { status: "", change: [] };
  let changeDue = cash - price;

  let cidTotal = 0;
  cid.map((amount) => {
    cidTotal += amount[1];
  });

  if (changeDue > cidTotal) {
    return (statusAndChange = { status: status[2], change: [] });
  } else if (changeDue == cidTotal) {
    return (statusAndChange = { status: status[1], change: cid });
  } else {
    // changeDue < cidTotal
    statusAndChange = { status: status[0], change: [] };

    // iterate through each total cid amount of MONEY value
    for (let i = 8; i >= 0; i--) {
      let moneyName = MONEY[i][0];
      let moneyValue = MONEY[i][1];
      let cidMoneyAmount = cid[i][1];
      let moneyForChange = Math.floor(changeDue / moneyValue);
      let moneyChangeTotal = moneyForChange * moneyValue;

      if (moneyForChange > 0) {
        if (cidMoneyAmount > moneyChangeTotal) {
          statusAndChange.change.push([moneyName, moneyChangeTotal]);
          changeDue = Number((changeDue - moneyChangeTotal).toFixed(2));
        } else {
          statusAndChange.change.push([moneyName, cidMoneyAmount]);
          changeDue = Number((changeDue - cidMoneyAmount).toFixed(2));
        }
      }
    }
    if (changeDue === 0) {
      // drawer has exact change
      return statusAndChange;
    } else {
      return { status: status[2], change: [] };
    }
  }
}
/*    END  Solution 2   */

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
);
