<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$room_number = isset($data["room_number"])
    ? trim($data["room_number"])
    : "";

$room_type = isset($data["room_type"])
    ? trim($data["room_type"])
    : "";

$price = isset($data["price"])
    ? $data["price"]
    : "";

$capacity = isset($data["capacity"])
    ? $data["capacity"]
    : "";

$image = isset($data["image"])
    ? trim($data["image"])
    : "";

$description = isset($data["description"])
    ? trim($data["description"])
    : "";

$status = isset($data["status"])
    ? trim($data["status"])
    : "Available";


/* Room number validation */

if ($room_number == "") {

    echo json_encode([
        "success" => false,
        "message" => "Room number is required"
    ]);

    exit;
}


/* Room type validation */

if ($room_type == "") {

    echo json_encode([
        "success" => false,
        "message" => "Room type is required"
    ]);

    exit;
}


/* Price validation */

if ($price == "") {

    echo json_encode([
        "success" => false,
        "message" => "Price is required"
    ]);

    exit;
}

if (!is_numeric($price) || $price <= 0) {

    echo json_encode([
        "success" => false,
        "message" => "Enter a valid room price"
    ]);

    exit;
}


/* Capacity validation */

if ($capacity == "") {

    echo json_encode([
        "success" => false,
        "message" => "Capacity is required"
    ]);

    exit;
}

if (!is_numeric($capacity) || $capacity <= 0) {

    echo json_encode([
        "success" => false,
        "message" => "Enter a valid capacity"
    ]);

    exit;
}


/* Check duplicate room number */

$checkSql = "SELECT id
             FROM rooms
             WHERE room_number = ?";

$checkStmt = mysqli_prepare(
    $conn,
    $checkSql
);

mysqli_stmt_bind_param(
    $checkStmt,
    "s",
    $room_number
);

mysqli_stmt_execute($checkStmt);

$checkResult = mysqli_stmt_get_result(
    $checkStmt
);

if (mysqli_num_rows($checkResult) > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Room number already exists"
    ]);

    exit;
}


/* Insert room */

$sql = "INSERT INTO rooms
        (
            room_number,
            room_type,
            price,
            capacity,
            image,
            description,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare(
    $conn,
    $sql
);

mysqli_stmt_bind_param(
    $stmt,
    "ssdisss",
    $room_number,
    $room_type,
    $price,
    $capacity,
    $image,
    $description,
    $status
);

if (mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "success" => true,
        "message" => "Room added successfully"
    ]);

}
else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to add room"
    ]);

}

?>