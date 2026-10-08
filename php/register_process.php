<?php
session_start();

// ==========================================
// STUDENTHUB - REGISTRATION FORM PROCESSOR
// ==========================================


// ==========================================
// 1. ALLOW ONLY POST REQUEST
// ==========================================

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header(
        "Location: ../pages/register.html?status=error&message=" .
        urlencode("Invalid request method.")
    );

    exit;
}


// ==========================================
// 2. REDIRECT FUNCTION
// ==========================================

function redirectWithMessage($status, $message)
{
    $url = "../pages/register.html?" . http_build_query([
        "status" => $status,
        "message" => $message
    ]);

    header("Location: $url");

    exit;
}


// ==========================================
// 3. SANITIZATION FUNCTION
// ==========================================

function cleanInput($value)
{
    return trim(
        preg_replace(
            '/[\x00-\x1F\x7F]/u',
            '',
            $value
        )
    );
}


// ==========================================
// 4. GET FORM DATA
// ==========================================

$fullname = cleanInput(
    $_POST["fullname"] ?? ""
);

$email = cleanInput(
    $_POST["email"] ?? ""
);

$mobile = cleanInput(
    $_POST["mobile"] ?? ""
);

$gender = cleanInput(
    $_POST["gender"] ?? ""
);

$course = cleanInput(
    $_POST["course"] ?? ""
);

$year = cleanInput(
    $_POST["year"] ?? ""
);

$password =
    $_POST["password"] ?? "";

$confirmPassword =
    $_POST["confirmPassword"] ?? "";

$termsAccepted =
    isset($_POST["terms"]);


// ==========================================
// 5. SERVER-SIDE VALIDATION
// ==========================================

// ================= SERVER-SIDE VALIDATION =================

$errors = [];

// Full Name
if ($fullname === "") {
    $errors[] = "Full name is required.";
} elseif (!preg_match("/^[\p{L} .'-]{2,60}$/u", $fullname)) {
    $errors[] = "Full name contains invalid characters.";
}

// Email
if ($email === "") {
    $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Please enter a valid email address.";
}

// Mobile
if ($mobile === "") {
    $errors[] = "Mobile number is required.";
} elseif (!preg_match("/^[0-9]{10}$/", $mobile)) {
    $errors[] = "Mobile number must contain exactly 10 digits.";
}

// Gender
if (!in_array($gender, ["male", "female", "other"], true)) {
    $errors[] = "Please select a gender.";
}

// Course
if (!in_array($course, ["cse", "it", "bca", "mca"], true)) {
    $errors[] = "Please select a valid course.";
}

// Year
if (!in_array($year, ["1", "2", "3", "4"], true)) {
    $errors[] = "Please select a valid academic year.";
}

// Password
if ($password === "") {
    $errors[] = "Password is required.";
} elseif (strlen($password) < 8) {
    $errors[] = "Password must be at least 8 characters long.";
} elseif (!preg_match("/[A-Z]/", $password)) {
    $errors[] = "Password must contain at least one uppercase letter.";
} elseif (!preg_match("/[a-z]/", $password)) {
    $errors[] = "Password must contain at least one lowercase letter.";
} elseif (!preg_match("/[0-9]/", $password)) {
    $errors[] = "Password must contain at least one number.";
} elseif (!preg_match("/[@$!%*?&]/", $password)) {
    $errors[] = "Password must contain at least one special character.";
}

// Confirm Password
if ($confirmPassword === "") {
    $errors[] = "Please confirm your password.";
} elseif ($password !== $confirmPassword) {
    $errors[] = "Passwords do not match.";
}

// Terms
if (!$terms) {
    $errors[] = "You must accept the Terms & Conditions.";
}

// Show ALL errors
if (!empty($errors)) {

    $_SESSION["old_register_data"] = [
        "fullname" => $fullname,
        "email" => $email,
        "mobile" => $mobile,
        "gender" => $gender,
        "course" => $course,
        "year" => $year,
        "terms" => $terms ? "1" : "0"
    ];

    $_SESSION["register_errors"] =
        "Please fix the following errors||" .
        implode("||", $errors);

    header("Location: ../pages/register.html?status=error");
    exit;
}


// ==========================================
// 6. CREATE COMMON DATA
// ==========================================

$id = uniqid();

$submittedAt =
    date("Y-m-d H:i:s");

$passwordHash =
    password_hash(
        $password,
        PASSWORD_DEFAULT
    );


// ==========================================
// 7. CHOOSE STORAGE FORMAT
// ==========================================

// Change this to "csv" if you want CSV.
// Use "json" for JSON storage.

$storageFormat = "json";


// ==========================================
// 8. CSV STORAGE
// ==========================================

if ($storageFormat === "csv") {

    $csvFile =
        __DIR__ . "/../data/registrations.csv";


    // Check whether file already exists

    $fileExists =
        file_exists($csvFile);


    // Open file in append mode

    $handle =
        fopen($csvFile, "a");


    if ($handle === false) {

        redirectWithMessage(
            "error",
            "Unable to open CSV file."
        );
    }


    // Lock file

    if (!flock(
        $handle,
        LOCK_EX
    )) {

        fclose($handle);

        redirectWithMessage(
            "error",
            "Unable to lock CSV file."
        );
    }


    // Add header if file is new

    if (
        !$fileExists ||
        filesize($csvFile) === 0
    ) {

        fputcsv(
            $handle,
            [
                "ID",
                "Full Name",
                "Email",
                "Mobile",
                "Gender",
                "Course",
                "Year",
                "Password Hash",
                "Terms Accepted",
                "Submitted At"
            ]
        );
    }


    // Add registration data

    fputcsv(
        $handle,
        [
            $id,
            $fullname,
            $email,
            $mobile,
            $gender,
            $course,
            $year,
            $passwordHash,
            "Yes",
            $submittedAt
        ]
    );


    // Unlock and close

    flock(
        $handle,
        LOCK_UN
    );

    fclose($handle);


    // Success

    redirectWithMessage(
        "success",
        "Registration submitted and stored in CSV successfully."
    );
}


// ==========================================
// 9. JSON STORAGE
// ==========================================

else {

    $jsonFile =
        __DIR__ . "/../data/registrations.json";


    // Create file if it does not exist

    if (!file_exists($jsonFile)) {

        file_put_contents(
            $jsonFile,
            "[]"
        );
    }


    // Read existing JSON

    $jsonData =
        file_get_contents($jsonFile);


    $records =
        json_decode(
            $jsonData ?: "[]",
            true
        );


    // Make sure records are an array

    if (!is_array($records)) {

        $records = [];
    }


    // Check duplicate email

    foreach ($records as $record) {

        if (
            isset($record["email"]) &&
            strtolower($record["email"]) ===
            strtolower($email)
        ) {

            redirectWithMessage(
                "error",
                "An account with this email already exists."
            );
        }
    }


    // Create new record

    $newRecord = [

        "id" =>
            $id,

        "fullname" =>
            $fullname,

        "email" =>
            $email,

        "mobile" =>
            $mobile,

        "gender" =>
            $gender,

        "course" =>
            $course,

        "year" =>
            $year,

        "password_hash" =>
            $passwordHash,

        "terms_accepted" =>
            true,

        "submitted_at" =>
            $submittedAt
    ];


    // Add record

    $records[] =
        $newRecord;


    // Save JSON

    $result =
        file_put_contents(
            $jsonFile,

            json_encode(
                $records,
                JSON_PRETTY_PRINT |
                JSON_UNESCAPED_UNICODE
            ),

            LOCK_EX
        );


    if ($result === false) {

        redirectWithMessage(
            "error",
            "Failed to save JSON data."
        );
    }


    // Success

    redirectWithMessage(
        "success",
        "Registration submitted and stored in JSON successfully."
    );
}

?>