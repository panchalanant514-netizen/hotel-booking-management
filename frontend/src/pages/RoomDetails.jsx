import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function RoomDetails() {

  // Get room ID from URL
  const { id } = useParams();

  // Store selected room
  const [room, setRoom] = useState(null);

  // Loading
  const [loading, setLoading] = useState(true);

  // Error
  const [error, setError] = useState("");


  // ==========================================
  // GET ROOM DETAILS
  // ==========================================

  useEffect(() => {

    const getRoomDetails = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await axios.get(
          "http://localhost/hotel-booking-management/backend/room/getRooms.php"
        );

        console.log("API Response:", response.data);
        console.log("URL Room ID:", id);


        // Check API response
        if (
          response.data.success &&
          Array.isArray(response.data.rooms)
        ) {

          // Find selected room
          const selectedRoom = response.data.rooms.find(
            (item) => String(item.id) === String(id)
          );


          if (selectedRoom) {

            console.log("Selected Room:", selectedRoom);

            setRoom(selectedRoom);

          }
          else {

            setError("Room not found.");

          }

        }
        else {

          setError("Unable to load rooms.");

        }

      }
      catch (err) {

        console.log("Error:", err);

        setError(
          "Unable to connect with the server."
        );

      }
      finally {

        setLoading(false);

      }

    };


    getRoomDetails();

  }, [id]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="container py-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <p className="mt-3">
          Loading room details...
        </p>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="container py-5">

        <div className="alert alert-danger text-center">

          {error}

        </div>

        <div className="text-center">

          <Link
            to="/rooms"
            className="btn btn-primary"
          >
            Back to Rooms
          </Link>

        </div>

      </div>

    );

  }


  // ==========================================
  // ROOM NOT FOUND
  // ==========================================

  if (!room) {

    return (

      <div className="container py-5 text-center">

        <div className="alert alert-warning">

          Room details are not available.

        </div>

        <Link
          to="/rooms"
          className="btn btn-primary"
        >
          Back to Rooms
        </Link>

      </div>

    );

  }


  // ==========================================
  // DISPLAY ROOM
  // ==========================================

  return (

    <div className="bg-light min-vh-100">

      <div className="container py-5">


        {/* ================================= */}
        {/* BACK BUTTON */}
        {/* ================================= */}

        <div className="mb-4">

          <Link
            to="/rooms"
            className="btn btn-outline-secondary"
          >

            ← Back to Rooms

          </Link>

        </div>


        {/* ================================= */}
        {/* ROOM CARD */}
        {/* ================================= */}

        <div className="card shadow border-0">

          <div className="row g-0">


            {/* ================================= */}
            {/* ROOM IMAGE */}
            {/* ================================= */}

            <div className="col-12 col-lg-6">

              <div
                className="d-flex align-items-center justify-content-center bg-secondary"
                style={{
                  minHeight: "400px"
                }}
              >

                {room.image ? (

                  <img
                    src={"/images/" + room.image}
                    alt={room.room_type}
                    className="img-fluid w-100"
                    style={{
                      height: "400px",
                      objectFit: "cover"
                    }}
                  />

                ) : (

                  <h5 className="text-white">
                    No Image Available
                  </h5>

                )}

              </div>

            </div>


            {/* ================================= */}
            {/* ROOM DETAILS */}
            {/* ================================= */}

            <div className="col-12 col-lg-6">

              <div className="p-4 p-lg-5">


                {/* ROOM TYPE */}

                <h1 className="fw-bold mb-3">

                  {room.room_type}

                </h1>


                {/* STATUS */}

                {room.status === "Available" ? (

                  <span className="badge bg-success mb-3">

                    Available

                  </span>

                ) : (

                  <span className="badge bg-danger mb-3">

                    Unavailable

                  </span>

                )}


                <hr />


                {/* ROOM NUMBER */}

                <p className="fs-5">

                  <strong>
                    Room Number:
                  </strong>{" "}

                  {room.room_number}

                </p>


                {/* PRICE */}

                <p className="fs-5">

                  <strong>
                    Price:
                  </strong>{" "}

                  <span className="text-primary fw-bold">

                    ₹{room.price}

                  </span>

                  <span className="text-muted">

                    {" "} / night

                  </span>

                </p>


                {/* CAPACITY */}

                <p className="fs-5">

                  <strong>
                    Capacity:
                  </strong>{" "}

                  {room.capacity} guests

                </p>


                {/* DESCRIPTION */}

                <div className="mt-4">

                  <h5 className="fw-bold">
                    Description
                  </h5>

                  <p className="text-muted">

                    {room.description
                      ? room.description
                      : "No description available."
                    }

                  </p>

                </div>


              </div>

            </div>

          </div>


          {/* ================================= */}
          {/* ROOM FACILITIES */}
          {/* ================================= */}

          <div className="border-top">

            <div className="p-4 p-lg-5">

              <h3 className="fw-bold text-center mb-4">

                Room Facilities

              </h3>


              <div className="row g-3">


                {/* FREE WIFI */}

                <div className="col-12 col-sm-6 col-lg-4">

                  <div className="card h-100 shadow-sm">

                    <div className="card-body text-center">

                      <div className="fs-1">
                        📶
                      </div>

                      <h5 className="mt-2">
                        Free Wi-Fi
                      </h5>

                      <p className="text-muted mb-0">
                        High-speed internet access
                        available for guests.
                      </p>

                    </div>

                  </div>

                </div>


                {/* AIR CONDITIONING */}

                <div className="col-12 col-sm-6 col-lg-4">

                  <div className="card h-100 shadow-sm">

                    <div className="card-body text-center">

                      <div className="fs-1">
                        ❄️
                      </div>

                      <h5 className="mt-2">
                        Air Conditioning
                      </h5>

                      <p className="text-muted mb-0">
                        Comfortable room temperature
                        throughout your stay.
                      </p>

                    </div>

                  </div>

                </div>


                {/* TV */}

                <div className="col-12 col-sm-6 col-lg-4">

                  <div className="card h-100 shadow-sm">

                    <div className="card-body text-center">

                      <div className="fs-1">
                        📺
                      </div>

                      <h5 className="mt-2">
                        Television
                      </h5>

                      <p className="text-muted mb-0">
                        Television available for
                        entertainment.
                      </p>

                    </div>

                  </div>

                </div>


                {/* PRIVATE BATHROOM */}

                <div className="col-12 col-sm-6 col-lg-4">

                  <div className="card h-100 shadow-sm">

                    <div className="card-body text-center">

                      <div className="fs-1">
                        🚿
                      </div>

                      <h5 className="mt-2">
                        Private Bathroom
                      </h5>

                      <p className="text-muted mb-0">
                        Clean and private bathroom
                        facilities.
                      </p>

                    </div>

                  </div>

                </div>


                {/* PARKING */}

                <div className="col-12 col-sm-6 col-lg-4">

                  <div className="card h-100 shadow-sm">

                    <div className="card-body text-center">

                      <div className="fs-1">
                        🅿️
                      </div>

                      <h5 className="mt-2">
                        Free Parking
                      </h5>

                      <p className="text-muted mb-0">
                        Parking facility available
                        for hotel guests.
                      </p>

                    </div>

                  </div>

                </div>


                {/* ROOM SERVICE */}

                <div className="col-12 col-sm-6 col-lg-4">

                  <div className="card h-100 shadow-sm">

                    <div className="card-body text-center">

                      <div className="fs-1">
                        🛎️
                      </div>

                      <h5 className="mt-2">
                        Room Service
                      </h5>

                      <p className="text-muted mb-0">
                        Convenient room service
                        for our guests.
                      </p>

                    </div>

                  </div>

                </div>


                {/* HOUSEKEEPING */}

                <div className="col-12 col-sm-6 col-lg-4">

                  <div className="card h-100 shadow-sm">

                    <div className="card-body text-center">

                      <div className="fs-1">
                        🧹
                      </div>

                      <h5 className="mt-2">
                        Daily Housekeeping
                      </h5>

                      <p className="text-muted mb-0">
                        Regular cleaning to keep
                        your room comfortable.
                      </p>

                    </div>

                  </div>

                </div>


                {/* SECURITY */}

                <div className="col-12 col-sm-6 col-lg-4">

                  <div className="card h-100 shadow-sm">

                    <div className="card-body text-center">

                      <div className="fs-1">
                        🔒
                      </div>

                      <h5 className="mt-2">
                        24/7 Security
                      </h5>

                      <p className="text-muted mb-0">
                        Safe and secure environment
                        for guests.
                      </p>

                    </div>

                  </div>

                </div>


                {/* ELECTRICITY */}

                <div className="col-12 col-sm-6 col-lg-4">

                  <div className="card h-100 shadow-sm">

                    <div className="card-body text-center">

                      <div className="fs-1">
                        ⚡
                      </div>

                      <h5 className="mt-2">
                        24/7 Electricity
                      </h5>

                      <p className="text-muted mb-0">
                        Continuous electricity
                        facility available.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ================================= */}
          {/* BOOKING SECTION */}
          {/* ================================= */}

          <div className="bg-light border-top">

            <div className="p-4 p-lg-5 text-center">

              <h3 className="fw-bold">
                Ready to Book?
              </h3>

              <p className="text-muted">
                Reserve this room and enjoy a
                comfortable stay with us.
              </p>


              {room.status === "Available" ? (

                <Link
                  to={"/booking/" + room.id}
                  className="btn btn-primary btn-lg px-5"
                >

                  Book This Room

                </Link>

              ) : (

                <button
                  className="btn btn-secondary btn-lg"
                  disabled
                >

                  Room Currently Unavailable

                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default RoomDetails;