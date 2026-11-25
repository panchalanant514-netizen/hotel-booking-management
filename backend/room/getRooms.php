<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include "../db.php";


$sql = "SELECT
            id,
            room_number,
            room_type,
            price,
            capacity,
            image,
            description,
            status
        FROM rooms
        ORDER BY id ASC";


$result = mysqli_query($conn, $sql);


if ($result) {

    $rooms = [];

    while ($row = mysqli_fetch_assoc($result)) {

        $rooms[] = $row;

    }


    echo json_encode([
        "success" => true,
        "rooms" => $rooms
    ]);

}
else {

    echo json_encode([
        "success" => false,
        "message" => "Unable to fetch rooms"
    ]);

}

?>