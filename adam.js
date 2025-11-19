const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
navLinks.classList.toggle("show"); 
});

const accordionButtons = document.querySelectorAll(".accordion-btn");

accordionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;

        content.classList.toggle("show");
        button.classList.toggle("active");
    });
});

const form = document.getElementById("contactForm");
const button = document.getElementById("sendBtn");
const successMsg = document.getElementById("success");
const errorMsg = document.getElementById("error");

form.addEventListener("submit", async (event) => {
event.preventDefault();

// =============================
// ✅ HONEYPOT – BOT STOP
// =============================
const botField = document.getElementById("honeypot").value;
if (botField !== "") {
console.log("Zablokowano bota.");
return;
}

// =============================
// ✅ SANITIZACJA INPUTÓW
// =============================
function sanitize(input) {
return input
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;");
}

const name = sanitize(document.getElementById("name").value.trim());
const email = sanitize(document.getElementById("email").value.trim());
const message = sanitize(document.getElementById("message").value.trim());

// =============================
// ✅ WALIDACJA
// =============================
if (!name || !email || !message) {
errorMsg.textContent = "Uzupełnij wszystkie pola!";
errorMsg.style.display = "block";
successMsg.style.display = "none";

setTimeout(() => {
errorMsg.style.display = "none";
}, 3000);
return;
}

// =============================
// ✅ BLOKADA PRZYCISKU
// =============================
button.disabled = true;
button.textContent = "Wysyłanie...";

try {
// =============================
// ✅ WYSYŁKA NA FORMSPREE
// =============================
const response = await fetch(form.action, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ name, email, message })
});

// =============================
// ✅ GDY OK
// =============================
if (response.ok) {
successMsg.style.display = "block";
errorMsg.style.display = "none";
form.reset();

setTimeout(() => {
successMsg.style.display = "none";
}, 3000);

} else {
// =============================
// ✅ GDY ERROR Z SERWERA
// =============================
errorMsg.style.display = "block";
successMsg.style.display = "none";

setTimeout(() => {
errorMsg.style.display = "none";
}, 3000);
}

} catch (err) {
// =============================
// ✅ GDY CRASH / BRAK INTERNETU
// =============================
errorMsg.style.display = "block";
successMsg.style.display = "none";

setTimeout(() => {
errorMsg.style.display = "none";
}, 3000);
}

// =============================
// ✅ ODBLOKOWANIE BUTTONA
// =============================
setTimeout(() => {
button.disabled = false;
button.textContent = "Wyślij";
}, 3000);
});