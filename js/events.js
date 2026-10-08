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

// ================= CONTENT SLIDER =================

const slides = document.querySelectorAll(".slide");

const nextSlide = document.getElementById("nextSlide");
const prevSlide = document.getElementById("prevSlide");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

if (slides.length > 0) {

    nextSlide.addEventListener("click", function () {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    });

    prevSlide.addEventListener("click", function () {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    });

    // Automatic slider
    setInterval(function () {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }, 4000);
}

// ================= Fetching data using json files =================

let events = [];
let currentPage = 1;
const itemsPerPage = 5;


// ================= LOAD JSON DATA =================

async function loadEvents() {
    const container = document.getElementById("eventsContainer");

    try {
        const response = await fetch("../data/events.json");

        if (!response.ok) {
            throw new Error("Failed to load events.json");
        }

        events = await response.json();

        renderEvents();

    } catch (error) {
        console.error("Error loading events:", error);

        container.innerHTML = `
            <tr>
                <td colspan="4">
                    Unable to load events.
                </td>
            </tr>
        `;
    }
}


// ================= RENDER EVENTS =================

function renderEvents() {

    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const selectedCategory =
        document.getElementById("categoryFilter").value;

    const sortValue =
        document.getElementById("sortSelect").value;


    // SEARCH
    let filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchText) ||
        event.description.toLowerCase().includes(searchText)
    );


    // FILTER
    if (selectedCategory !== "all") {
        filteredEvents = filteredEvents.filter(event =>
            event.category === selectedCategory
        );
    }


    // SORT
    if (sortValue === "dateAsc") {

        filteredEvents.sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );

    } else if (sortValue === "dateDesc") {

        filteredEvents.sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

    } else if (sortValue === "nameAsc") {

        filteredEvents.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

    } else if (sortValue === "nameDesc") {

        filteredEvents.sort((a, b) =>
            b.title.localeCompare(a.title)
        );
    }


    // PAGINATION
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const pageEvents = filteredEvents.slice(startIndex, endIndex);


    // DISPLAY
    const container =
        document.getElementById("eventsContainer");

    if (pageEvents.length === 0) {

        container.innerHTML = `
            <tr>
                <td colspan="4">
                    No events found.
                </td>
            </tr>
        `;

    } else {

        container.innerHTML = pageEvents.map(event => `
            <tr>
                <td>
                    ${event.title}
                    <br>
                    <small>${event.description}</small>
                </td>

                <td>
                    ${event.category}
                </td>

                <td>
                    ${event.date}
                    <br>
                    ${event.time}
                </td>

                <td>
                    ${event.location}
                </td>
            </tr>
        `).join("");
    }


    createPagination(filteredEvents.length);
}


// ================= PAGINATION =================

function createPagination(totalItems) {

    const pagination =
        document.getElementById("pagination");

    const totalPages =
        Math.ceil(totalItems / itemsPerPage);

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.textContent = i;

        button.classList.toggle(
            "active",
            i === currentPage
        );

        button.addEventListener("click", () => {

            currentPage = i;

            renderEvents();
        });

        pagination.appendChild(button);
    }
}


// ================= EVENT LISTENERS =================

document
    .getElementById("searchInput")
    .addEventListener("input", () => {

        currentPage = 1;
        renderEvents();
    });


document
    .getElementById("categoryFilter")
    .addEventListener("change", () => {

        currentPage = 1;
        renderEvents();
    });


document
    .getElementById("sortSelect")
    .addEventListener("change", () => {

        currentPage = 1;
        renderEvents();
    });


// ================= START =================

loadEvents();