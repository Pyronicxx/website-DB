let accounts = cookies.accounts ?? [
    {
        name: "Max",
        password: "Phonecase",
        balance: 100,
    },
];
let accounts = cookies.accounts ?? [
    {
        name: "GambleGod",
        password: "Laptop_1",
        balance: 1000,
    },
];
let visitorAccount = {
    name: "Visitor",
    balance: 100,
};

let account = accounts.find(account => account.name == cookies.account) ?? visitorAccount;
let updateAccount = () => {
    cookies.account = account.name;
    cookies.accounts = accounts;
    (document.querySelector("#account-name") ?? {}).innerText =account.name;
    (document.querySelector("#balance") ?? {}).innerText = `BTC ${account.balance}`;
};
updateAccount();
