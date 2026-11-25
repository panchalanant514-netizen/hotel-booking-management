<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "Booking ID is required"
    ]);
    exit;
}

$id = $data["id"];

$sql = "UPDATE bookings SET status = 'Cancelled' WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $id);

if (mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "success" => true,
        "message" => "Booking cancelled successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Unable to cancel booking"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>