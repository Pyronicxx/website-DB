let selectTab = tab => [...document.querySelector("main").children].forEach(child => child.hidden = child.id != tab);

if (window.location.href.indexOf("#") > -1) {
    let tab = window.location.href.split("#")[1];
    if (document.querySelector(`#${tab}`)) {
        selectTab(tab);
    }
}

let seededRandom = (seed, x) => {
    let X = Math.floor(x);
    let t = x - X;
    let fade = t ** 3 * (t * (t * 6 - 15) + 10);
    let hash = i => {
        let h = i + seed * 374761393;
        h = (h ^ h >> 13) * 1274126177;
        h ^= h >> 16;
        return ((h >>> 0) / 42949) % 1;
    };
    let mix = i => {
        // add some nonlinearity via multiple octaves
        let a = hash(i);
        let b = hash(i * 1.3);
        let c = hash(i * 2.7);
        return (a + 0.5 * b + 0.25 * c) / 1.75; // normalize
    };
    let lerp = (a, b, u) => a + (b - a) * u;
    return lerp(mix(X), mix(X + 1), fade);
};

let fields = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

let spin = (field = 0, t = 200, s = .2) => {
    let a = -2 * fields.indexOf(field) / fields.length * Math.PI;
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

let forceResult;

let redFields = [32, 19, 21, 25, 34,27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
let bet = type => {
    let betNum = document.querySelector("#roulette-bet input").value;
    if (type == "straight") {
        if (document.querySelector("#roulette-bet input").value < 0 || document.querySelector("#roulette-bet input").value > 36 || document.querySelector("#roulette-bet input").value % 0) {
            document.querySelector("#roulette-bet input").value = 0;
            return;
        }
    }
    [...document.querySelectorAll("#roulette-bet button")].forEach(button => button.disabled = true);
    let result = forceResult ?? Math.floor(Math.random() * fields.length);
    spin(result);
    setTimeout(() => {
        let win =
            type == "straight" && result == betNum ? 36 : 10 * (
                type == "high" || type == "low" ? (type == "high" == result > 18 ? 2 : 0) :
                type == "red" || type == "black" ? (type == "red" == redFields.indexOf(result) > -1 ? 2 : 0) :
                type == "even" || type == "odd" ? (+(type == "odd") == result % 2 ? 2 : 0) : 0
            );
        document.querySelector("#roulette-result").innerText = win ? `You won $${win}!` : "You lost :L";
        [...document.querySelectorAll("#roulette-bet button")].forEach(button => button.disabled = false);
    }, 4000);
};
