document.getElementById("chooseBtn").addEventListener("click", function () {
    const javoxirSelect = document.getElementById("javoxir");
    const yoldaSelect = document.getElementById("yolda");
    const toshkentSelect = document.getElementById("toshkent");

    // Tanlangan qiymatlar
    const javoxirValue = javoxirSelect.value;
    const yoldaValue = yoldaSelect.value;
    const toshkentValue = toshkentSelect.value;

    // Agar hech biri tanlanmasa xatolik chiqarish
    if (!javoxirValue && !yoldaValue && !toshkentValue) {
        alert("Iltimos, kamida bitta variant tanlang!");
        return;
    }

    // Aloqa raqamini qo'shish
    const contactInfo = " 📞 Aloqa: +998 99 123 45 67";

    const result = [];
    if (javoxirValue) result.push(javoxirValue + contactInfo);
    if (yoldaValue) result.push(yoldaValue);
    if (toshkentValue) result.push(toshkentValue + contactInfo);

    // Foydalanuvchi tanlovlari
    const message = "🚖 **Yangi buyurtma:**\n\n" + result.join("\n");

    // Ma'lumotlarni saqlash va Telegramga yuborish
    localStorage.setItem("lastOrder", message);
    sendToTelegram(message);

    // 🔄 SELECT'LARNI DEFAULT HOLATGA QAYTARISH
    javoxirSelect.selectedIndex = 0;
    yoldaSelect.selectedIndex = 0;
    toshkentSelect.selectedIndex = 0;

    alert("Tanlovingiz qabul qilindi! Ma'lumotlar Telegram kanalga yuborildi.");
});

// 📌 Telegram bot orqali ma'lumot yuborish
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

// 📌 **Foydalanuvchi saytdan chiqib ketgandan keyin ham davom etish**
setInterval(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
        sendToTelegram(lastOrder);
    }
}, 120000); // **Har 4 sekundda yuborish**
