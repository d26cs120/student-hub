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

// ======================================================
// STUDENT REGISTRATION FORM VALIDATION
// ======================================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    // ================= GET ELEMENTS =================

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");
    const password = document.getElementById("password");
    const confirmPassword =
        document.getElementById("confirmPassword");

    const course = document.getElementById("course");
    const year = document.getElementById("year");
    const terms = document.getElementById("terms");


    // ================= REGULAR EXPRESSIONS =================

    // Only letters and spaces, minimum 3 characters
    const nameRegex = /^[A-Za-z\s]{3,50}$/;

    // Basic email validation
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Indian 10-digit mobile number
    const mobileRegex =
        /^[6-9][0-9]{9}$/;

    // Password:
    // minimum 8 characters
    // at least one uppercase
    // at least one lowercase
    // at least one number
    // at least one special character
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


    // ================= ERROR FUNCTION =================

    function showError(input, errorId, message) {

        input.classList.remove("valid");
        input.classList.add("invalid");

        document.getElementById(errorId).textContent = message;
    }


    // ================= SUCCESS FUNCTION =================

    function showValid(input, errorId) {

        input.classList.remove("invalid");
        input.classList.add("valid");

        document.getElementById(errorId).textContent = "";
    }


    // ================= NAME VALIDATION =================

    function validateName() {

        const value = fullname.value.trim();

        if (value === "") {

            showError(
                fullname,
                "fullnameError",
                "Full name is required."
            );

            return false;
        }

        if (!nameRegex.test(value)) {

            showError(
                fullname,
                "fullnameError",
                "Name must contain only letters and spaces."
            );

            return false;
        }

        showValid(fullname, "fullnameError");

        return true;
    }


    // ================= EMAIL VALIDATION =================

    function validateEmail() {

        const value = email.value.trim();

        if (value === "") {

            showError(
                email,
                "emailError",
                "Email is required."
            );

            return false;
        }

        if (!emailRegex.test(value)) {

            showError(
                email,
                "emailError",
                "Enter a valid email address."
            );

            return false;
        }

        showValid(email, "emailError");

        return true;
    }


    // ================= MOBILE VALIDATION =================

    function validateMobile() {

        const value = mobile.value.trim();

        if (value === "") {

            showError(
                mobile,
                "mobileError",
                "Mobile number is required."
            );

            return false;
        }

        if (!mobileRegex.test(value)) {

            showError(
                mobile,
                "mobileError",
                "Enter a valid 10-digit mobile number."
            );

            return false;
        }

        showValid(mobile, "mobileError");

        return true;
    }


    // ================= PASSWORD VALIDATION =================

    function validatePassword() {

        const value = password.value;

        if (value === "") {

            showError(
                password,
                "passwordError",
                "Password is required."
            );

            return false;
        }

        if (!passwordRegex.test(value)) {

            showError(
                password,
                "passwordError",
                "Password must contain 8+ characters, uppercase, lowercase, number and special character."
            );

            return false;
        }

        showValid(password, "passwordError");

        return true;
    }


    // ================= CONFIRM PASSWORD =================

    function validateConfirmPassword() {

        const value = confirmPassword.value;

        if (value === "") {

            showError(
                confirmPassword,
                "confirmPasswordError",
                "Please confirm your password."
            );

            return false;
        }

        if (value !== password.value) {

            showError(
                confirmPassword,
                "confirmPasswordError",
                "Passwords do not match."
            );

            return false;
        }

        showValid(
            confirmPassword,
            "confirmPasswordError"
        );

        return true;
    }


    // ================= COURSE VALIDATION =================

    function validateCourse() {

        if (course.value === "") {

            showError(
                course,
                "courseError",
                "Please select your course."
            );

            return false;
        }

        showValid(course, "courseError");

        return true;
    }


    // ================= YEAR VALIDATION =================

    function validateYear() {

        if (year.value === "") {

            showError(
                year,
                "yearError",
                "Please select your academic year."
            );

            return false;
        }

        showValid(year, "yearError");

        return true;
    }


    // ================= GENDER VALIDATION =================

    function validateGender() {

        const selectedGender =
            document.querySelector(
                'input[name="gender"]:checked'
            );

        const error =
            document.getElementById("genderError");

        if (!selectedGender) {

            error.textContent =
                "Please select your gender.";

            return false;
        }

        error.textContent = "";

        return true;
    }


    // ================= TERMS VALIDATION =================

    function validateTerms() {

        const error =
            document.getElementById("termsError");

        if (!terms.checked) {

            error.textContent =
                "You must accept the Terms & Conditions.";

            return false;
        }

        error.textContent = "";

        return true;
    }


    // ==================================================
    // PASSWORD STRENGTH METER
    // ==================================================

    function updatePasswordStrength() {

        const value = password.value;

        const strengthBar =
            document.getElementById("strengthBar");

        const strengthText =
            document.getElementById("strengthText");

        let score = 0;

        if (value.length >= 8)
            score++;

        if (/[A-Z]/.test(value))
            score++;

        if (/[a-z]/.test(value))
            score++;

        if (/[0-9]/.test(value))
            score++;

        if (/[@$!%*?&]/.test(value))
            score++;


        if (score <= 1) {

            strengthBar.style.width = "20%";
            strengthText.textContent =
                "Password strength: Weak";

        } else if (score === 2) {

            strengthBar.style.width = "40%";
            strengthText.textContent =
                "Password strength: Weak";

        } else if (score === 3) {

            strengthBar.style.width = "60%";
            strengthText.textContent =
                "Password strength: Medium";

        } else if (score === 4) {

            strengthBar.style.width = "80%";
            strengthText.textContent =
                "Password strength: Good";

        } else {

            strengthBar.style.width = "100%";
            strengthText.textContent =
                "Password strength: Strong";
        }
    }


    // ================= REAL-TIME VALIDATION =================

    fullname.addEventListener("input", validateName);

    email.addEventListener("input", validateEmail);

    mobile.addEventListener("input", validateMobile);

    password.addEventListener("input", function () {

        updatePasswordStrength();
        validatePassword();

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }

    });

    confirmPassword.addEventListener(
        "input",
        validateConfirmPassword
    );

    course.addEventListener(
        "change",
        validateCourse
    );

    year.addEventListener(
        "change",
        validateYear
    );

    terms.addEventListener(
        "change",
        validateTerms
    );


    // Gender validation

    document
        .querySelectorAll('input[name="gender"]')
        .forEach(function (radio) {

            radio.addEventListener(
                "change",
                validateGender
            );

        });

// ================= PHP RESPONSE MESSAGE =================

const params =
    new URLSearchParams(window.location.search);

const status =
    params.get("status");

const message =
    params.get("message");


// Display PHP message
if (status && message) {

    const messageBox =
        document.getElementById("successMessage");

    if (messageBox) {

        if (status === "success") {

            messageBox.textContent =
                message;

            messageBox.className =
                "success-message";

        } else {

            const errors =
                message.split("||");

            messageBox.innerHTML = "";

            const heading =
                document.createElement("strong");

            heading.textContent =
                errors[0];

            messageBox.appendChild(heading);

            const list =
                document.createElement("ul");

            errors.slice(1).forEach(function (error) {

                const item =
                    document.createElement("li");

                item.textContent = error;

                list.appendChild(item);

            });

            messageBox.appendChild(list);

            messageBox.className =
                "error-message";
        }
    }

    // Remove query parameters
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
}
}