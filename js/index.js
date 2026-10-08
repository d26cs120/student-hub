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

// ================= MODAL POPUP =================

const modal = document.getElementById("welcomeModal");
const closeModal = document.getElementById("closeModal");
const modalOkBtn = document.getElementById("modalOkBtn");

if (modal) {

    // Show modal after page loads
    setTimeout(function () {
        modal.classList.add("show");
    }, 1000);

    // Close button
    closeModal.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    // Continue button
    modalOkBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    // Close when clicking outside
    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            modal.classList.remove("show");
        }

    });
}

// ================= NOTIFICATION BANNER =================

const notificationBanner =
    document.getElementById("notificationBanner");

const closeNotification =
    document.getElementById("closeNotification");

if (notificationBanner && closeNotification) {

    closeNotification.addEventListener("click", function () {

        notificationBanner.style.display = "none";

    });

}