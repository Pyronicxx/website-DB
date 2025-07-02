let accounts = cookies.accounts ?? [
    {
        name: "MaxH",
        passwordHash: 4427849782227161,
        balance: 1000,
    },
    {
        name: "MaxB",
        passwordHash: 4721474318246072,
        balance: 10000,
    },
];

let visitorAccount = {
    name: "Visitor",
    balance: 100,
};

let hashStr = (str, seed = 0) => {
    let h1 = 0xAD601D07 ^ seed;
    let h2 = 0x41C6CE57 ^ seed;
    [...str].forEach(char => {
        h1 = Math.imul(h1 ^ char.charCodeAt(0), 0x9E3779B1);
        h2 = Math.imul(h2 ^ char.charCodeAt(0), 0x5F356495);
    });
    h1 = Math.imul(h1 ^ h1 >>> 16, 0x85EBCA6B);
    h2 = Math.imul(h2 ^ h2 >>> 16, 0x85EBCA6B);
    h1 = (h1 ^ Math.imul(h2 ^ h2 >>> 13, 0xC2B2AE35)) >>> 0;
    h2 = (h2 ^ Math.imul(h1 ^ h1 >>> 13, 0xC2B2AE35)) >>> 0;
    return h1 + (h2 & 0x1FFFFF) * 0x100000000;
};

let hashPassword = (name = "Visitor", password = "", project = "website-DB") => hashStr(name, hashStr(password, hashStr(project)));

let account = accounts.find(account => account.name == cookies.account) ?? visitorAccount;
let updateAccount = () => {
    cookies.account = account.name;
    cookies.accounts = accounts;
    (document.querySelector("#account-name") ?? {}).innerText =account.name;
    (document.querySelector("#balance") ?? {}).innerText = `BTC ${account.balance}`;
};
updateAccount();
