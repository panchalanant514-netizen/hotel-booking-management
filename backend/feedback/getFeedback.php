<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../db.php";


$sql = "SELECT * FROM feedback ORDER BY id DESC";

$result = mysqli_query($conn, $sql);


$feedback = [];


if ($result) {

    while ($row = mysqli_fetch_assoc($result)) {

        $feedback[] = $row;

    }

}


echo json_encode([
    "success" => true,
    "feedback" => $feedback
]);

?>