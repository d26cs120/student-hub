<?php

// ==========================================
// STUDENTHUB - CONTACT FORM PROCESSOR
// ==========================================


// ==========================================
// 1. ALLOW ONLY POST REQUEST
// ==========================================

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header(
        "Location: ../pages/contact.html?status=error&message=" .
        urlencode("Invalid request method.")
    );

    exit;
}


// ==========================================
// 2. REDIRECT FUNCTION
// ==========================================

function redirectWithMessage($status, $message)
{
    $url = "../pages/contact.html?" . http_build_query([
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

$name = cleanInput(
    $_POST["name"] ?? ""
);

$email = cleanInput(
    $_POST["email"] ?? ""
);

$subject = cleanInput(
    $_POST["subject"] ?? ""
);

$message = cleanInput(
    $_POST["message"] ?? ""
);


// ==========================================
// 5. SERVER-SIDE VALIDATION
// ==========================================

// Name

if ($name === "") {

    redirectWithMessage(
        "error",
        "Full name is required."
    );
}

if (!preg_match(
    "/^[\p{L} .'-]{2,60}$/u",
    $name
)) {

    redirectWithMessage(
        "error",
        "Please enter a valid name."
    );
}


// Email

if (!filter_var(
    $email,
    FILTER_VALIDATE_EMAIL
)) {

    redirectWithMessage(
        "error",
        "Please enter a valid email address."
    );
}


// Subject

if (
    $subject === "" ||
    strlen($subject) < 3
) {

    redirectWithMessage(
        "error",
        "Please enter a valid inquiry subject."
    );
}


// Message

if (
    $message === "" ||
    strlen($message) < 10
) {

    redirectWithMessage(
        "error",
        "Message must contain at least 10 characters."
    );
}


// ==========================================
// 6. COMMON DATA
// ==========================================

$id =
    uniqid();

$submittedAt =
    date("Y-m-d H:i:s");


// ==========================================
// 7. CHOOSE STORAGE FORMAT
// ==========================================

// Change to "csv" if you want CSV.
// Otherwise JSON will be used.

$storageFormat = "csv";


// ==========================================
// 8. CSV STORAGE
// ==========================================

if ($storageFormat === "csv") {

    $csvFile =
        __DIR__ . "/../data/contacts.csv";


    $fileExists =
        file_exists($csvFile);


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


    // Header

    if (
        !$fileExists ||
        filesize($csvFile) === 0
    ) {

        fputcsv(
            $handle,
            [
                "ID",
                "Name",
                "Email",
                "Subject",
                "Message",
                "Submitted At"
            ]
        );
    }


    // Data

    fputcsv(
        $handle,
        [
            $id,
            $name,
            $email,
            $subject,
            $message,
            $submittedAt
        ]
    );


    // Unlock

    flock(
        $handle,
        LOCK_UN
    );

    fclose($handle);


    redirectWithMessage(
        "success",
        "Your message was submitted and stored in CSV successfully."
    );
}


// ==========================================
// 9. JSON STORAGE
// ==========================================

else {

    $jsonFile =
        __DIR__ . "/../data/contacts.json";


    // Create JSON file

    if (!file_exists($jsonFile)) {

        file_put_contents(
            $jsonFile,
            "[]"
        );
    }


    // Read existing records

    $jsonData =
        file_get_contents($jsonFile);


    $records =
        json_decode(
            $jsonData ?: "[]",
            true
        );


    if (!is_array($records)) {

        $records = [];
    }


    // Create new record

    $newRecord = [

        "id" =>
            $id,

        "name" =>
            $name,

        "email" =>
            $email,

        "subject" =>
            $subject,

        "message" =>
            $message,

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


    redirectWithMessage(
        "success",
        "Your message was submitted and stored in JSON successfully."
    );
}

?>