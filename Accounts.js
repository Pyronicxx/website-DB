let account = cookies.account || {
    name: "Visitor",
    balance: 100,
};

document.querySelector("#balance").innerText = `BTC ${account.balance}`;

let setBalance = balance => {
    account.balance = balance;
    cookies.account = account;
    document.querySelector("#balance").innerText = `BTC ${account.balance}`;
};
