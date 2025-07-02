let slotsSymbols = {
    Cherry: [10, 15],
    Lemon: [8, 10],
    Plum: [6, 5],
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

let scoreSlots = symbols => {
    let score = 0;
    let text = "";
    for (let x = 0; x < 5; x++) {
        if (symbols[x][0] == symbols[x][1] && symbols[x][1] == symbols[x][2]) {
            score += slotsSymbols[symbols[x][0]][1];
            text += `<br>+ ${slotsSymbols[symbols[x][0]][1]} (3 ${symbols[x][0]}s)`;
        }
    }
    for (let y = 0; y < 3; y++) {
        if (symbols[0][y] == symbols[1][y] && symbols[1][y] == symbols[2][y] && symbols[2][y] == symbols[3][y] && symbols[3][y] == symbols[4][y]) {
            score += slotsSymbols[symbols[2][y]][1] * 5;
            text += `<br>+ ${slotsSymbols[symbols[2][y]][1] * 5} (5 ${symbols[2][y]}s)`;
        } else if (symbols[1][y] == symbols[2][y] && symbols[2][y] == symbols[3][y] && (symbols[0][y] == symbols[1][y] || symbols[3][y] == symbols[4][y])) {
            score += slotsSymbols[symbols[2][y]][1] * 3;
            text += `<br>+ ${slotsSymbols[symbols[2][y]][1] * 3} (4 ${symbols[2][y]}s)`;
        } else if (symbols[1][y] == symbols[2][y] && (symbols[0][y] == symbols[1][y] || symbols[2][y] == symbols[3][y]) || symbols[2][y] == symbols[3][y] && symbols[3][y] == symbols[4][y]) {
            score += slotsSymbols[symbols[2][y]][1];
            text += `<br>+ ${slotsSymbols[symbols[2][y]][1]} (3 ${symbols[2][y]}s)`;
        }
    }
    for (let x = 0; x < 3; x++) {
        if (symbols[x][0] == symbols[x + 1][1] && symbols[x + 1][1] == symbols[x + 2][2]) {
            score += slotsSymbols[symbols[x][0]][1];
            text += `<br>+ ${slotsSymbols[symbols[x][0]][1]} (3 ${symbols[x][0]}s)`;
        }
    }
    for (let x = 0; x < 3; x++) {
        if (symbols[x][2] == symbols[x + 1][1] && symbols[x + 1][1] == symbols[x + 2][0]) {
            score += slotsSymbols[symbols[x][2]][1];
            text += `<br>+ ${slotsSymbols[symbols[x][2]][1]} (3 ${symbols[x][2]}s)`;
        }
    }
    return [score, text];
};

let spinSlots = (advantage = 0, t = 200, s = .35) => {
    let betAmount = Math.min(Math.max(document.querySelector("#slots-bet-amount input").value, 0), account.balance);
    account.balance -= betAmount;
    updateAccount();
    let tMults = [.4, .55, .7, .85, 1];
    let symbols = [];
    let html = "";
    let vs = [];
    for (let i = 0; i < 5; i++) {
        let symbolColumn = [];
        html += "<span>";
        vs.push(0);
        for (let j = 0; j < t * tMults[i]; j++) {
            vs[i] -= s * (1 - (j / t / tMults[i]) ** 10);
        }
        for (let j = 0; j < 3; j++) {
            let symbol = pickSlotSymbol(advantage);
            html += `<img src="imgs/${symbol}.png">`;
            symbolColumn.push(symbol);
        }
        for (let j = 0; j < Math.ceil(-vs[i]); j++) {
            html += `<img src="imgs/${pickSlotSymbol(advantage)}.png">`;
        }
        symbols.push(symbolColumn);
        html += "</span>";
    }
    document.querySelector("#slots-rolls").innerHTML = html;
    document.querySelector("#slots-bet *").disabled = true;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < t * tMults[i]; j++) {
            setTimeout(() => {
                vs[i] += s * (1 - (j / t / tMults[i]) ** 10);
                [...document.querySelector("#slots-rolls").children[i].children].forEach(img => img.style.transform = `translateY(${Math.round(vs[i] * 1e9) / 1e7}%)`);
            }, j * 20);
        }
    }
    setTimeout(() => {
        let score = scoreSlots(symbols);
        document.querySelector("#slots-result").innerHTML = score[0] ? `You won BTC ${score[0] * betAmount / 20}! ${score[0]} Score:${score[1]}` : "You didn't win anything :L";
        document.querySelector("#slots-bet *").disabled = false;
        account.balance += score[0] * betAmount / 20;
        saveAccount();
    }, t * 20);
};

let simulateSlots = (count = 1e4, advantage = 0) => {
    let score = 0;
    for (let i = 0; i < count; i++) {
        let symbols = [];
        for (let j = 0; j < 5; j++) {
            let symbolColumn = [];
            for (let k = 0; k < 3; k++) {
                symbolColumn.push(pickSlotSymbol(advantage));
            }
            symbols.push(symbolColumn);
        }
        score += scoreSlots(symbols)[0];
    }
    console.log(score / count);
}; // ~18.4
