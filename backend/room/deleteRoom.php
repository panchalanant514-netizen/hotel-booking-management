<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../db.php";


/* Get JSON data */

$data = json_decode(
    file_get_contents("php://input"),
    true
);


$id = isset($data["id"])
    ? $data["id"]
    : "";


/* Validate ID */

if ($id == "") {

    echo json_encode([
        "success" => false,
        "message" => "Room ID is required"
    ]);

    exit;

}


/* Delete room */

$sql = "DELETE FROM rooms
        WHERE id = ?";


$stmt = mysqli_prepare(
    $conn,
    $sql
);


mysqli_stmt_bind_param(
    $stmt,
    "i",
    $id
);


if (mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "success" => true,
        "message" => "Room deleted successfully"
    ]);

}
else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to delete room"
    ]);

}

?>