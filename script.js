"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

///////////////////////////////////////////////////////////
/* Precaution : In this program dates and movements are not linked in any way like nested list or key value pair so filtering these movements may result in same order of dates */
///////////////////////////////////////////////////////////

const account1 = {
  owner: "Samarjeet Singh",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2023-07-24T10:51:36.790Z",
  ],
  currency: "EUR", // de-DE
};

const account2 = {
  owner: "Manish Kumar",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
};

const account3 = {
  owner: "Aman Kumar",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
};

const account4 = {
  owner: "Devansh Sharma",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const lm = document.querySelector(".loan__msg");

let loantaken = 0;
const displayMovements = function (acc) {
  containerMovements.innerHTML = " ";
  acc.movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const displayDates = formatMovementDate(date);
    const formattedMov = new Intl.NumberFormat(acc.locale, {
      style: "currency",
      currency: acc.currency,
    }).format(mov);

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
              <div class="movements__date">${displayDates}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
};

// displayMovements(account1.movements);

const createUsernames = function (user) {
  user.forEach(function (users) {
    users.username = users.owner
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word[0];
      })
      .join("");
  });
};

createUsernames(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});

const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur;
}, 0 /* initial balance*/);

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedMov1 = new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(acc.balance);
  labelBalance.textContent = `${formattedMov1}`;
};
// calcPrintBalance(account1.movements);
/////////////////////////////////////////////////

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
// const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return Math.trunc(mov * eurToUsd);
// });
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) {
//   movementsUSDfor.push(Math.trunc(mov * eurToUsd));
// }
// console.log(movementsUSDfor);

// const movementsUSDa = movements.map(mov => mov * eurToUsd);
// console.log(movementsUSDa);

/////////////////////////////////////////////////////////

const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

const calcPrintSummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formattedMov2 = new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(incomes);
  labelSumIn.textContent = `${formattedMov2}`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formattedMov3 = new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(out);
  labelSumOut.textContent = `${formattedMov3}`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((balance) => (balance * 1.2) / 100)
    .filter((int, i, arr) => {
      return (int) => 1;
    })
    .reduce((acc, int) => acc + int, 0);
  const formattedMov4 = new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(interest);
  labelSumInterest.textContent = `${formattedMov4}`;
};
// calcPrintSummary(account1.movements);

let currentAccount;
let def;
let time;

///////////////////////
let startLogoutTimer = function () {
  time = 300;
  // function to format time
  const formatTime = (time) => String(time).padStart(2, "0");

  const timerInterval = setInterval(function () {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;
    labelTimer.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;

    time--;
    if (time === 0) {
      labelWelcome.textContent = "You have been logged out!";
      containerApp.style.opacity = 0;
      clearInterval(timerInterval);
    }
  }, 1000);
};

/////////

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername?.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
    containerApp.style.opacity = 1;
    displayMovements(currentAccount);
    calcPrintBalance(currentAccount);
    calcPrintSummary(currentAccount);

    def = JSON.parse(JSON.stringify(currentAccount));
    startLogoutTimer();
  } else {
    labelWelcome.textContent = "Invalid Action !!!!!";
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const ra = accounts.find((acc) => acc.username === inputTransferTo.value);

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    ra?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    ra.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    ra.movementsDates.push(new Date().toISOString());

    //updating ui
    displayMovements(currentAccount);
    calcPrintBalance(currentAccount);
    calcPrintSummary(currentAccount);
    time = 300;
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) == currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `User Deleted Successfully`;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount / 10) &&
    loantaken === 0
  ) {
    currentAccount.movements.push(Math.trunc(amount));
    currentAccount.movementsDates.push(new Date().toISOString());
    displayMovements(currentAccount);
    calcPrintBalance(currentAccount);
    calcPrintSummary(currentAccount);
    inputLoanAmount.value = " ";
    loantaken++;
    time = 300;
    // inputLoanAmount.style.opacity = 0;
  } else {
    lm.textContent = `Invalid Loan Request`;
  }
});

//sort functionality
let clicker = 0;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  clicker++;

  if (clicker === 0) {
    displayMovements(def);
  } else if (clicker === 1) {
    currentAccount.movements.sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
    });
    displayMovements(currentAccount);
  } else if (clicker === 2) {
    currentAccount.movements.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
    });
    clicker = -1;
    displayMovements(currentAccount);
  }
});

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
let locale = navigator.language;
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
const now = new Date();

// date settings

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 0) return `${daysPassed} Days Ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const hour = `${date.getHours()}`.padStart(2, 0);
    // const min = `${date.getMinutes()}`.padStart(2, 0);
    // return `${day}/${month}/${year}, ${hour}:${min}`;
    locale = navigator.language;
    return new Intl.DateTimeFormat(locale, options).format(date);
  }
};
