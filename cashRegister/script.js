const purchaseBtn = document.querySelector(".purchase-btn");
const changeDue = document.querySelector("#change-due");
const registerAmounts = document.querySelector(".register-amounts");
const priceText = document.querySelector(".price");
const cashInput = document.querySelector(".cash");

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
// let price = 19.5;
// let cid = [
//   ["PENNY", 0.5],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 0],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0],
// ];

const denominations = [
  ["PENNY", 1],
  ["NICKEL", 5],
  ["DIME", 10],
  ["QUARTER", 25],
  ["ONE", 100],
  ["FIVE", 500],
  ["TEN", 1000],
  ["TWENTY", 2000],
  ["ONE HUNDRED", 10000],
];

window.onload = () => {
  cashInput.focus();
  priceText.innerText = `Price: $${price.toFixed(2)}`;
  updateRegisterAmountsText();
};

function updateRegisterAmountsText() {
  let content = `<ul style="list-style-type: none; padding: 0">`;
  cid.forEach((item) => {
    content += `<li>${item[0]}: $${item[1].toFixed(2)}</li>`;
  });
  content += "</ul>";
  registerAmounts.innerHTML = content;
}

purchaseBtn.addEventListener("click", () => {
  calculateChange(parseFloat(cashInput.value));
});

cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calculateChange(parseFloat(cashInput.value));
  }
});

function giveChange(changeDueToCustomer, cid) {
  let changeInCents = Math.round(changeDueToCustomer * 100);
  let changeArray = [];
  let cidCopy = cid.map((arr) => arr.slice());
  let totalCid = cidCopy.reduce(
    (acc, curr) => acc + Math.round(curr[1] * 100),
    0
  );

  if (totalCid < changeInCents) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  for (let i = cidCopy.length - 1; i >= 0; i--) {
    let [denom, amount] = cidCopy[i];
    let denomValue = denominations.find((d) => d[0] === denom)[1];
    let denomAmountInCents = Math.round(amount * 100);
    let amountToReturnInCents = 0;
    while (changeInCents >= denomValue && denomAmountInCents > 0) {
      changeInCents -= denomValue;
      denomAmountInCents -= denomValue;
      amountToReturnInCents += denomValue;
    }
    if (amountToReturnInCents > 0) {
      changeArray.push([denom, amountToReturnInCents / 100]);
      cidCopy[i][1] = denomAmountInCents / 100;
    }
  }

  cid.forEach((arr, idx) => (arr[1] = cidCopy[idx][1]));

  let isCidEmptyAfterChange = cidCopy.every(([_, amount]) => amount === 0);

  if (changeInCents > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (isCidEmptyAfterChange) {
    return { status: "CLOSED", change: changeArray };
  } else {
    return { status: "OPEN", change: changeArray };
  }
}

function calculateChange(cashGiven) {
  let changeDueToCustomer = cashGiven - price;
  let { status, change } = giveChange(changeDueToCustomer, cid);
  if (changeDueToCustomer < 0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if (changeDueToCustomer === 0) {
    changeDue.innerHTML = "No change due - customer paid with exact cash";
    return;
  }
  changeDue.innerHTML = `<strong>Status:</strong> ${status}`;

  if (status !== "INSUFFICIENT_FUNDS") {
    let changeDetails = change
      .filter(([, amount]) => amount > 0)
      .map(([denom, amount]) => `${denom}: $${amount.toFixed(2)}`)
      .join(", ");
    changeDue.innerHTML += `<br>${changeDetails}`;
  }

  updateRegisterAmountsText();
}
