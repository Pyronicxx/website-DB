let slotsSymbols = {
    Cherry: [10, 20],
    Lemon: [8, 15],
    Plum: [6, 10],
    Bell: [4, 50],
    Diamond: [2, 100],
    Lucky7: [1, 150],
};

let pickSlotSymbol = (advantage = 0) => {
    let rand = Math.floor(Math.random() * Object.entries(slotsSymbols).reduce((sum, [, value]) => sum + value[0] * (value[1] * advantage + 1), 0));
    for (let [symbol, value] of Object.entries(slotsSymbols)) {
        rand -= value[0] * (value[1] * advantage + 1);
        if (rand < 0) {
            return symbol;
        }
    }
};

let spinSlots = (t = 200, s = .2, advantage = 0) => {
    let rolls = [];
    let html = "";
    let v = 0;
    for (let j = 0; j < t; j++) {
        v -= s * (1 - (j / t) ** 2);
    }
    for (let i = 0; i < 5; i++) {
        let roll = [];
        for (let j = 0; j < Math.ceil(v); j++) {
            let symbol = pickSlotSymbol(advantage);
            roll.push(symbol);
        }
        rolls.push(roll);
        html += `<span>${`<img src=''>`.repeat(4)}</span>`;
    }
    document.querySelector("#slots-rolls").innerHTML = html;
    for (let i = 0; i < t; i++) {
        setTimeout(() => {
            v += s * (1 - (i / t) ** 2);
            [...document.querySelectorAll("#slots-rolls > *")].forEach((roll, j) => {
                roll.style.transform = `translateY(${(v % 1) * 100}px)`;
                [...roll.children].forEach((slot, k) => {
                    slot.src = `imgs/${rolls[j][k]}.png`;
                });
            });
        }, i * 20);
    }
};
