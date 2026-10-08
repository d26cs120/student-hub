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

// ==========================================
// PHP SUCCESS / ERROR MESSAGE
// ==========================================

const contactParams =
    new URLSearchParams(
        window.location.search
    );

const contactStatus =
    contactParams.get("status");

const contactMessage =
    contactParams.get("message");


if (contactStatus && contactMessage) {

    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (formMessage) {

        formMessage.textContent =
            contactMessage;


        if (contactStatus === "success") {

            formMessage.classList.remove(
                "text-danger"
            );

            formMessage.classList.add(
                "text-success"
            );

        } else {

            formMessage.classList.remove(
                "text-success"
            );

            formMessage.classList.add(
                "text-danger"
            );
        }
    }


    // Remove URL parameters

    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
}

// ================= PHP RESPONSE MESSAGE =================

const contactParams =
    new URLSearchParams(window.location.search);

const contactStatus =
    contactParams.get("status");

const contactMessage =
    contactParams.get("message");

if (contactStatus && contactMessage) {

    const formMessage =
        document.getElementById("formMessage");

    if (formMessage) {

        if (contactStatus === "success") {

            formMessage.textContent =
                contactMessage;

            formMessage.className =
                "text-success";

        } else {

            const errors =
                contactMessage.split("||");

            formMessage.innerHTML = "";

            const heading =
                document.createElement("strong");

            heading.textContent =
                errors[0];

            const list =
                document.createElement("ul");

            errors.slice(1).forEach(function (error) {

                const item =
                    document.createElement("li");

                item.textContent = error;

                list.appendChild(item);
            });

            formMessage.appendChild(heading);
            formMessage.appendChild(list);

            formMessage.className =
                "text-danger";
        }
    }

    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
}