let students = [];
let currentPage = 1;
const itemsPerPage = 9;

async function loadStudents() {
    const container = document.getElementById("studentsContainer");

    try {
        const response = await fetch("../data/students.json");

        if (!response.ok) {
            throw new Error("Failed to load students.json");
        }

        students = await response.json();

        renderStudents();

    } catch (error) {
        console.error("Error loading students:", error);

        container.innerHTML = `
            <p>Unable to load student data.</p>
        `;
    }
}


function renderStudents() {

    const searchText =
        document.getElementById("studentSearch")
        .value
        .toLowerCase();

    const selectedCourse =
        document.getElementById("courseFilter").value;

    const sortValue =
        document.getElementById("studentSort").value;


    // SEARCH
    let filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchText) ||
        student.skills.join(" ").toLowerCase().includes(searchText)
    );


    // FILTER
    if (selectedCourse !== "all") {
        filteredStudents = filteredStudents.filter(student =>
            student.course === selectedCourse
        );
    }


    // SORT
    if (sortValue === "nameAsc") {
        filteredStudents.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sortValue === "nameDesc") {
        filteredStudents.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    if (sortValue === "semesterAsc") {
        filteredStudents.sort((a, b) =>
            a.semester - b.semester
        );
    }

    if (sortValue === "semesterDesc") {
        filteredStudents.sort((a, b) =>
            b.semester - a.semester
        );
    }


    // PAGINATION
    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const endIndex =
        startIndex + itemsPerPage;

    const pageStudents =
        filteredStudents.slice(startIndex, endIndex);


    // RENDER
    const container =
        document.getElementById("studentsContainer");

    if (pageStudents.length === 0) {

        container.innerHTML =
            "<p>No students found.</p>";

    } else {

        container.innerHTML = pageStudents.map(student => `
            <div class="student-card">

                <h3>${student.name}</h3>

                <p>
                    ${student.course}
                    • Semester ${student.semester}
                </p>

                <p>
                    Skills:
                    ${student.skills.join(", ")}
                </p>

                <p>
                    ${student.email}
                </p>

            </div>
        `).join("");
    }


    createStudentPagination(filteredStudents.length);
}


function createStudentPagination(totalItems) {

    const pagination =
        document.getElementById("studentPagination");

    const totalPages =
        Math.ceil(totalItems / itemsPerPage);

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {

        const button =
            document.createElement("button");

        button.textContent = i;

        button.classList.toggle(
            "active",
            i === currentPage
        );

        button.addEventListener("click", () => {

            currentPage = i;
            renderStudents();

        });

        pagination.appendChild(button);
    }
}


document
    .getElementById("studentSearch")
    .addEventListener("input", () => {

        currentPage = 1;
        renderStudents();

    });


document
    .getElementById("courseFilter")
    .addEventListener("change", () => {

        currentPage = 1;
        renderStudents();

    });


document
    .getElementById("studentSort")
    .addEventListener("change", () => {

        currentPage = 1;
        renderStudents();

    });


loadStudents();