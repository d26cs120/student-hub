// ================= THEME SWITCHER =================

const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");
const htmlElement = document.documentElement;

if (themeToggleBtn) {

    const savedTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light");

    function applyTheme(theme) {

        htmlElement.setAttribute("data-bs-theme", theme);

        localStorage.setItem("theme", theme);

        if (themeIcon) {
            themeIcon.className =
                theme === "dark"
                    ? "bi bi-sun-fill"
                    : "bi bi-moon-stars-fill";
        }
    }

    applyTheme(savedTheme);

    themeToggleBtn.addEventListener("click", function () {

        const currentTheme =
            htmlElement.getAttribute("data-bs-theme");

        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);
    });
}

// ================= COLLAPSIBLE FAQ =================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const answer = question.nextElementSibling;
        const symbol = question.querySelector(".symbol");

        const isOpen = answer.classList.contains("open");

        // Close all FAQ answers
        document.querySelectorAll(".faq-answer").forEach(function (item) {
            item.classList.remove("open");
        });

        document.querySelectorAll(".faq-question").forEach(function (item) {
            item.setAttribute("aria-expanded", "false");

            const icon = item.querySelector(".symbol");

            if (icon) {
                icon.textContent = "+";
            }
        });

        // Open selected FAQ
        if (!isOpen) {

            answer.classList.add("open");

            question.setAttribute("aria-expanded", "true");

            if (symbol) {
                symbol.textContent = "−";
            }
        }
    });
});