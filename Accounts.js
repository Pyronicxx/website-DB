let account = cookies.account || {
    name: "Visitor",
    balance: 100,
};
let updateAccount = () => {
    cookies.account = account;
    document.querySelector("#balance").innerText = `BTC ${account.balance}`;
};
updateAccount();
