<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../db.php";

// Handle preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

// Only GET request allowed
if ($_SERVER["REQUEST_METHOD"] !== "GET") {

    echo json_encode([
        "success" => false,
        "message" => "Only GET request is allowed"
    ]);

    exit();
}

// Get all bookings
$sql = "SELECT * FROM bookings ORDER BY id ASC";

$result = mysqli_query($conn, $sql);

if (!$result) {

    echo json_encode([
        "success" => false,
        "message" => "Failed to get bookings: " . mysqli_error($conn)
    ]);

    exit();
}

$bookings = [];

while ($row = mysqli_fetch_assoc($result)) {
    $bookings[] = $row;
}

// Send response
echo json_encode([
    "success" => true,
    "bookings" => $bookings
]);

mysqli_close($conn);

?>