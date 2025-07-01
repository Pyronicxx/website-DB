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

 const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        const errorMsg = document.getElementById("error-msg");

        if (user === "Max" && pass === "Praktikum") {
            errorMsg.style.color = "green";
            errorMsg.textContent = "Login erfolgreich!, Max";

            setTimeout(() => {
                window.location.href = "Homepage.html";
            }, 1000);
        } else {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Benutzername oder Passwort falsch.";
        }
    });
}
