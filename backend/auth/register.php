<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = isset($data["name"]) ? trim($data["name"]) : "";
$email = isset($data["email"]) ? trim($data["email"]) : "";
$mobile = isset($data["mobile"]) ? trim($data["mobile"]) : "";
$password = isset($data["password"]) ? $data["password"] : "";

if ($name == "") {

    echo json_encode([
        "success" => false,
        "message" => "Name is required"
    ]);

    exit;
}

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

if ($mobile == "") {

    echo json_encode([
        "success" => false,
        "message" => "Mobile number is required"
    ]);

    exit;
}

if (!preg_match("/^[0-9]{10}$/", $mobile)) {

    echo json_encode([
        "success" => false,
        "message" => "Mobile number must contain 10 digits"
    ]);

    exit;
}

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

$checkSql = "SELECT id FROM users WHERE email = ?";

$checkStmt = mysqli_prepare($conn, $checkSql);

mysqli_stmt_bind_param(
    $checkStmt,
    "s",
    $email
);

mysqli_stmt_execute($checkStmt);

$result = mysqli_stmt_get_result($checkStmt);

if (mysqli_num_rows($result) > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Email already registered"
    ]);

    exit;
}


/* Password encryption */

$hashedPassword = password_hash(
    $password,
    PASSWORD_DEFAULT
);


/* Insert user */

$sql = "INSERT INTO users
        (name, email, mobile, password)
        VALUES (?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "ssss",
    $name,
    $email,
    $mobile,
    $hashedPassword
);

if (mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "success" => true,
        "message" => "Registration successful"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Registration failed"
    ]);

}

?>