let rouletteFields = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

let spinRoulette = (field = 0, t = 200, s = .2) => {
    let a = -2 * rouletteFields.indexOf(field) / rouletteFields.length * Math.PI;
    for (let i = 0; i < t; i++) {
        a -= s * (1 - (i / t) ** 1.5);
    }
    for (let i = 0; i < t; i++) {
        setTimeout(() => {
            a += s * (1 - (i / t) ** 1.5);
            document.querySelector("#roulette-img").style.transform = `rotate(${a * 180 / Math.PI}deg)`;
            document.querySelector("#roulette-ball").style.transform = `translateX(${100 * (1 - (i / t) ** 1.5) * (Math.random() - .5)}%)`;
        }, i * 20);
    }
};

let forceRouletteResult;

let redRouletteFields = [32, 19, 21, 25, 34,27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
let betOnRoulette = type => {
    let betAmount = Math.min(Math.max(document.querySelector("#roulette-bet-amount input").value, 0), account.balance);
    account.balance -= betAmount;
    updateAccount();
    let betNum = document.querySelector("#roulette-bet input").value;
    if (type == "straight") {
        if (document.querySelector("#roulette-bet input").value < 0 || document.querySelector("#roulette-bet input").value > 36 || document.querySelector("#roulette-bet input").value % 0) {
            document.querySelector("#roulette-bet input").value = 0;
            return;
        }
    }
    [...document.querySelectorAll("#roulette-bet button")].forEach(button => button.disabled = true);
    let result = forceRouletteResult ?? Math.floor(Math.random() * rouletteFields.length);
    spinRoulette(result);
    setTimeout(() => {
        let win =
            type == "straight" && result == betNum ? 36 : betNum ? (
            type == "high" || type == "low" ? (type == "high" == result > 18 ? 2 : 0) :
            type == "red" || type == "black" ? (type == "red" == redRouletteFields.indexOf(result) > -1 ? 2 : 0) :
            type == "even" || type == "odd" ? (+(type == "odd") == result % 2 ? 2 : 0) : 0
            ) : 0;
        document.querySelector("#roulette-result").innerText = win ? `You won BTC ${win * betAmount}!` : "You lost :L";
        [...document.querySelectorAll("#roulette-bet button")].forEach(button => button.disabled = false);
        account.balance += win * betAmount;
        updateAccount();
    }, 4000);
};
