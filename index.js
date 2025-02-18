let intervalId = null;

// LocalStorage'dan intervalni o'qib olish
if (localStorage.getItem("isRunning") === "true") {
    startInterval(parseInt(localStorage.getItem("intervalTime"), 10));
}

document.getElementById("chooseBtn").addEventListener("click", function () {
    const javoxirSelect = document.getElementById("javoxir");
    const yoldaSelect = document.getElementById("yolda");
    const toshkentSelect = document.getElementById("toshkent");
    const intervalSelect = document.getElementById("interval");

    const javoxirValue = javoxirSelect.value;
    const yoldaValue = yoldaSelect.value;
    const toshkentValue = toshkentSelect.value;

    if (!javoxirValue && !yoldaValue && !toshkentValue) {
        alert("Iltimos, kamida bitta variant tanlang!");
        return;
    }

    const contactInfo = " 📞 Aloqa: +998 97 118 08 05";
    const result = [];
    if (javoxirValue) result.push(javoxirValue + contactInfo);
    if (yoldaValue) result.push(yoldaValue);
    if (toshkentValue) result.push(toshkentValue + contactInfo);

    const message = "🚖 **Yangi buyurtma:**\n\n" + result.join("\n");

    localStorage.setItem("lastOrder", message);
    sendToTelegram(message);

    javoxirSelect.selectedIndex = 0;
    yoldaSelect.selectedIndex = 0;
    toshkentSelect.selectedIndex = 0;

    alert("Tanlovingiz qabul qilindi! Ma'lumotlar Telegram kanalga yuborildi.");

    const selectedInterval = parseInt(intervalSelect.value, 10);
    localStorage.setItem("intervalTime", selectedInterval);
    localStorage.setItem("isRunning", "true");

    startInterval(selectedInterval);
});

document.getElementById("stopBtn").addEventListener("click", function () {
    clearInterval(intervalId);
    intervalId = null;
    localStorage.setItem("isRunning", "false");
    alert("Xabar yuborish to‘xtatildi.");
});

function startInterval(intervalTime) {
    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
        const lastOrder = localStorage.getItem("lastOrder");
        if (lastOrder) {
            sendToTelegram(lastOrder);
        }
    }, intervalTime);
}

function sendToTelegram(message) {
    const botToken = "7650458162:AAHgjEYf5DpuupTYl7-yX4g0B5RjfK5TYRY";
    const chatId = "@jovoxir_andijon_toshkent";
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
    })
    .then(response => response.json())
    .then(data => console.log("✅ Telegramga yuborildi:", data))
    .catch(error => console.error("❌ Xatolik:", error));
}
