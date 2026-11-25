<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../db.php";

// Handle browser preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

// Only allow POST request
if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "success" => false,
        "message" => "Only POST request is allowed"
    ]);

    exit();
}

// Get JSON data from React
$data = json_decode(file_get_contents("php://input"), true);

// Check whether data was received
if (!$data) {

    echo json_encode([
        "success" => false,
        "message" => "No booking data received"
    ]);

    exit();
}

// Get values
$room_id = isset($data["room_id"]) ? $data["room_id"] : "";
$guest_name = isset($data["customer_name"]) ? $data["customer_name"] : "";
$mobile = isset($data["mobile"]) ? $data["mobile"] : "";
$check_in = isset($data["check_in"]) ? $data["check_in"] : "";
$check_out = isset($data["check_out"]) ? $data["check_out"] : "";
$number_of_guests = isset($data["guests"]) ? $data["guests"] : "";
$total_amount = isset($data["total_amount"]) ? $data["total_amount"] : 0;

// Validation
if (
    empty($room_id) ||
    empty($guest_name) ||
    empty($mobile) ||
    empty($check_in) ||
    empty($check_out) ||
    empty($number_of_guests)
) {

    echo json_encode([
        "success" => false,
        "message" => "Please fill all required fields"
    ]);

    exit();
}

// Mobile validation
if (!preg_match("/^[0-9]{10}$/", $mobile)) {

    echo json_encode([
        "success" => false,
        "message" => "Mobile number must contain exactly 10 digits"
    ]);

    exit();
}

// Guest validation
if ($number_of_guests <= 0) {

    echo json_encode([
        "success" => false,
        "message" => "Number of guests must be greater than 0"
    ]);

    exit();
}

// Date validation
if ($check_out <= $check_in) {

    echo json_encode([
        "success" => false,
        "message" => "Check-out date must be after check-in date"
    ]);

    exit();
}

// Insert booking
$sql = "INSERT INTO bookings
        (room_id, guest_name, mobile, check_in, check_out, number_of_guests, total_amount, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {

    echo json_encode([
        "success" => false,
        "message" => "SQL prepare error: " . mysqli_error($conn)
    ]);

    exit();
}

// Bind values
mysqli_stmt_bind_param(
    $stmt,
    "issssid",
    $room_id,
    $guest_name,
    $mobile,
    $check_in,
    $check_out,
    $number_of_guests,
    $total_amount
);

// Execute query
if (mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "success" => true,
        "message" => "Booking created successfully",
        "booking_id" => mysqli_insert_id($conn)
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Booking failed: " . mysqli_stmt_error($stmt)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>