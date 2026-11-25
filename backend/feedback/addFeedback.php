<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

header("Content-Type: application/json");

include "../db.php";


$data = json_decode(file_get_contents("php://input"), true);


if (
    !isset($data["name"]) ||
    !isset($data["rating"]) ||
    !isset($data["message"])
) {

    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);

    exit;

}


$name = trim($data["name"]);
$rating = intval($data["rating"]);
$message = trim($data["message"]);


if ($name == "" || $message == "") {

    echo json_encode([
        "success" => false,
        "message" => "Please fill all fields."
    ]);

    exit;

}


if ($rating < 1 || $rating > 5) {

    echo json_encode([
        "success" => false,
        "message" => "Rating must be between 1 and 5."
    ]);

    exit;

}


$sql = "INSERT INTO feedback (name, rating, message)
        VALUES (?, ?, ?)";


$stmt = mysqli_prepare($conn, $sql);


mysqli_stmt_bind_param(
    $stmt,
    "sis",
    $name,
    $rating,
    $message
);


if (mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "success" => true,
        "message" => "Feedback submitted successfully."
    ]);

}
else {

    echo json_encode([
        "success" => false,
        "message" => "Unable to submit feedback."
    ]);

}


mysqli_stmt_close($stmt);

?>