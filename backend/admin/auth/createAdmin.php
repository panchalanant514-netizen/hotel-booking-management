<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../../db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$name = isset($data["name"])
    ? trim($data["name"])
    : "";

$email = isset($data["email"])
    ? trim($data["email"])
    : "";

$password = isset($data["password"])
    ? $data["password"]
    : "";


/* Name validation */

if ($name == "") {

    echo json_encode([
        "success" => false,
        "message" => "Name is required"
    ]);

    exit;
}


/* Email validation */

if ($email == "") {

    echo json_encode([
        "success" => false,
        "message" => "Email is required"
    ]);

    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    echo json_encode([
        "success" => false,
        "message" => "Enter a valid email"
    ]);

    exit;
}


/* Password validation */

if ($password == "") {

    echo json_encode([
        "success" => false,
        "message" => "Password is required"
    ]);

    exit;
}

if (strlen($password) < 6) {

    echo json_encode([
        "success" => false,
        "message" => "Password must be at least 6 characters"
    ]);

    exit;
}


/* Check whether email already exists */

$sql = "SELECT id
        FROM admins
        WHERE email = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "s",
    $email
);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Admin email already exists"
    ]);

    exit;
}


/* Hash password */

$hashedPassword = password_hash(
    $password,
    PASSWORD_DEFAULT
);


/* Insert new admin */

$sql = "INSERT INTO admins
        (name, email, password)
        VALUES (?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "sss",
    $name,
    $email,
    $hashedPassword
);


if (mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "success" => true,
        "message" => "New admin created successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Unable to create new admin"
    ]);

}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>