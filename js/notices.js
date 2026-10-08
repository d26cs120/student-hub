let notices = [];

let currentNoticePage = 1;

const noticesPerPage = 5;


// ================= LOAD NOTICES =================

async function loadNotices() {

    const container =
        document.getElementById("noticesContainer");

    try {

        const response =
            await fetch("../data/notices.json");

        if (!response.ok) {
            throw new Error("Failed to load notices.json");
        }

        notices = await response.json();

        renderNotices();

    } catch (error) {

        console.error("Error loading notices:", error);

        container.innerHTML =
            "<p>Unable to load notices.</p>";
    }
}


// ================= RENDER NOTICES =================

function renderNotices() {

    const searchText =
        document
            .getElementById("noticeSearch")
            .value
            .toLowerCase();

    const selectedCategory =
        document.getElementById("noticeCategory").value;

    const sortValue =
        document.getElementById("noticeSort").value;


    // SEARCH

    let filteredNotices =
        notices.filter(notice =>
            notice.title.toLowerCase().includes(searchText) ||
            notice.description.toLowerCase().includes(searchText)
        );


    // FILTER

    if (selectedCategory !== "all") {

        filteredNotices =
            filteredNotices.filter(notice =>
                notice.category === selectedCategory
            );
    }


    // SORT

    if (sortValue === "dateDesc") {

        filteredNotices.sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

    } else if (sortValue === "dateAsc") {

        filteredNotices.sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );

    } else if (sortValue === "nameAsc") {

        filteredNotices.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

    } else if (sortValue === "nameDesc") {

        filteredNotices.sort((a, b) =>
            b.title.localeCompare(a.title)
        );
    }


    // PAGINATION

    const startIndex =
        (currentNoticePage - 1) * noticesPerPage;

    const endIndex =
        startIndex + noticesPerPage;

    const pageNotices =
        filteredNotices.slice(startIndex, endIndex);


    // DISPLAY

    const container =
        document.getElementById("noticesContainer");


    if (pageNotices.length === 0) {

        container.innerHTML =
            "<p>No notices found.</p>";

    } else {

        container.innerHTML =
            pageNotices.map(notice => `

                <div class="notice-card">

                    <div class="notice-content">

                        <h3>
                            ${notice.title}
                        </h3>

                        <p>
                            ${notice.description}
                        </p>

                        <span class="notice-category">
                            ${notice.category}
                        </span>

                    </div>

                    <div class="notice-date">
                        ${notice.date}
                    </div>

                </div>

            `).join("");
    }


    createNoticePagination(filteredNotices.length);
}


// ================= PAGINATION =================

function createNoticePagination(totalItems) {

    const pagination =
        document.getElementById("noticePagination");

    const totalPages =
        Math.ceil(totalItems / noticesPerPage);

    pagination.innerHTML = "";


    for (let i = 1; i <= totalPages; i++) {

        const button =
            document.createElement("button");

        button.textContent = i;

        button.classList.toggle(
            "active",
            i === currentNoticePage
        );


        button.addEventListener("click", () => {

            currentNoticePage = i;

            renderNotices();
        });


        pagination.appendChild(button);
    }
}


// ================= SEARCH =================

document
    .getElementById("noticeSearch")
    .addEventListener("input", () => {

        currentNoticePage = 1;

        renderNotices();
    });


// ================= FILTER =================

document
    .getElementById("noticeCategory")
    .addEventListener("change", () => {

        currentNoticePage = 1;

        renderNotices();
    });


// ================= SORT =================

document
    .getElementById("noticeSort")
    .addEventListener("change", () => {

        currentNoticePage = 1;

        renderNotices();
    });


// ================= INITIALIZE =================

loadNotices();