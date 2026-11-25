<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

include("../db.php");


// ===============================
// TOTAL ROOMS
// ===============================

$roomQuery = "SELECT COUNT(*) AS total_rooms FROM rooms";

$roomResult = mysqli_query($conn, $roomQuery);

$roomData = mysqli_fetch_assoc($roomResult);

$totalRooms = $roomData["total_rooms"];


// ===============================
// TOTAL BOOKINGS
// ===============================

$bookingQuery = "SELECT COUNT(*) AS total_bookings FROM bookings";

$bookingResult = mysqli_query($conn, $bookingQuery);

$bookingData = mysqli_fetch_assoc($bookingResult);

$totalBookings = $bookingData["total_bookings"];


// ===============================
// PENDING BOOKINGS
// ===============================

$pendingQuery = "
    SELECT COUNT(*) AS pending_bookings
    FROM bookings
    WHERE status = 'Pending'
";

$pendingResult = mysqli_query($conn, $pendingQuery);

$pendingData = mysqli_fetch_assoc($pendingResult);

$pendingBookings = $pendingData["pending_bookings"];


// ===============================
// APPROVED BOOKINGS
// ===============================

$approvedQuery = "
    SELECT COUNT(*) AS approved_bookings
    FROM bookings
    WHERE status = 'Approved'
";

$approvedResult = mysqli_query($conn, $approvedQuery);

$approvedData = mysqli_fetch_assoc($approvedResult);

$approvedBookings = $approvedData["approved_bookings"];


// ===============================
// CANCELLED BOOKINGS
// ===============================

$cancelledQuery = "
    SELECT COUNT(*) AS cancelled_bookings
    FROM bookings
    WHERE status = 'Cancelled'
";

$cancelledResult = mysqli_query($conn, $cancelledQuery);

$cancelledData = mysqli_fetch_assoc($cancelledResult);

$cancelledBookings = $cancelledData["cancelled_bookings"];


// ===============================
// SEND RESPONSE
// ===============================

echo json_encode([
    "success" => true,
    "total_rooms" => $totalRooms,
    "total_bookings" => $totalBookings,
    "pending_bookings" => $pendingBookings,
    "approved_bookings" => $approvedBookings,
    "cancelled_bookings" => $cancelledBookings
]);


mysqli_close($conn);

?>