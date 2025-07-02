let slotsSymbols = {
    Cherry: [10, 20],
    Lemon: [8, 15],
    Plum: [6, 10],
    Bell: [4, 50],
    Clover: [2, 100],
    Coin: [1, 150],
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

let spinSlots = (advantage = 0, t = 200, s = .35) => {
    let tMults = [.4, .55, .7, .85, 1];
    let symbols = [];
    let html = "";
    let vs = [];
    for (let i = 0; i < 5; i++) {
        let symbolColumn = [];
        html += "<span>";
        vs.push(0);
        for (let j = 0; j < t * tMults[i]; j++) {
            vs[i] -= s * (1 - (j / t / tMults[i]) ** 2);
        }
        for (let j = 0; j < 3; j++) {
            let symbol = pickSlotSymbol(advantage);
            html += `<img src="imgs/${pickSlotSymbol(advantage)}.png">`;
            symbolColumn.push(symbol);
        }
        for (let j = 0; j < Math.ceil(-vs[i]); j++) {
            html += `<img src="imgs/${pickSlotSymbol(advantage)}.png">`;
        }
        symbols.push(symbolColumn);
        html += "</span>";
    }
    document.querySelector("#slots-rolls").innerHTML = html;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < t * tMults[i]; j++) {
            setTimeout(() => {
                vs[i] += s * (1 - (j / t / tMults[i]) ** 2);
                document.querySelector("#slots-rolls").children[i].style.transform = `translateY(${vs[i] * 100}px)`;
            }, j * 20);
        }
    }
    setTimeout(() => {
        let score = 0;
        for (let x = 0; x < 5; x++) {
            if (symbols[x][0] == symbols[x][1] && symbols[x][1] == symbols[x][2]) {
                console.log(symbols[x][0]);
                score += slotsSymbols[symbols[x][0]][1];
            }
        }
        for (let y = 0; y < 3; y++) {
            if (symbols[0][y] == symbols[1][y] && symbols[1][y] == symbols[2][y] && symbols[2][y] == symbols[3][y] && symbols[3][y] == symbols[4][y]) {
                score += slotsSymbols[symbols[2][y]][1] * 5;
            } else if (symbols[1][y] == symbols[2][y] && symbols[2][y] == symbols[3][y] && (symbols[0][y] == symbols[1][y] || symbols[3][y] == symbols[4][y])) {
                score += slotsSymbols[symbols[2][y]][1] * 3;
            } else if (symbols[1][y] == symbols[2][y] && (symbols[0][y] == symbols[1][y] || symbols[2][y] == symbols[3][y]) || symbols[2][y] == symbols[3][y] || symbols[3][y] == symbols[4][y]) {
                score += slotsSymbols[symbols[2][y]][1];
            }
        }
        console.log(symbols);
        console.log(score);
    }, t * 20);
};
