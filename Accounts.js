let account = cookies.account || {
    name: "Visitor",
    balance: 1000,
};

document.querySelector("#balance").innerText = `BTC ${account.balance}`;

let setBalance = balance => {
    account.balance = balance;
    cookies.account = account;
    document.querySelector("#balance").innerText = `BTC ${account.balance}`;
};
