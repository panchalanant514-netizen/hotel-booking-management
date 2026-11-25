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

$email = isset($data["email"])
    ? trim($data["email"])
    : "";

$password = isset($data["password"])
    ? $data["password"]
    : "";


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


/* Find admin */

$sql = "SELECT id, name, email, password
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


/* Check admin */

if (mysqli_num_rows($result) == 0) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid admin email or password"
    ]);

    exit;
}

$admin = mysqli_fetch_assoc($result);


/* Verify password */

if (!password_verify(
    $password,
    $admin["password"]
)) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid admin email or password"
    ]);

    exit;
}


/* Successful login */

echo json_encode([

    "success" => true,

    "message" => "Admin login successful",

    "admin" => [
        "id" => $admin["id"],
        "name" => $admin["name"],
        "email" => $admin["email"]
    ]

]);

?>