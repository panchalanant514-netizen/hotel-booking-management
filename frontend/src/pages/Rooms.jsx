import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Rooms() {

  // Store all rooms
  const [rooms, setRooms] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error message
  const [error, setError] = useState("");


  // ==========================================
  // GET ROOMS FROM DATABASE
  // ==========================================

  const getRooms = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost/hotel-booking-management/backend/room/getRooms.php"
      );

      if (response.data.success) {

        setRooms(response.data.rooms);

        setError("");

      } else {

        setError(
          response.data.message || "Unable to load rooms."
        );

      }

    } catch (err) {

      console.log("Rooms Error:", err);

      setError(
        "Unable to connect with the server."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD ROOMS WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {

    getRooms();

  }, []);


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="bg-light min-vh-100">

      <div className="container py-5">


        {/* ================================= */}
        {/* PAGE TITLE */}
        {/* ================================= */}

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Our Rooms
          </h1>

          <p className="text-muted">
            Choose a comfortable room for your stay.
          </p>

        </div>


        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading && (

          <div className="text-center py-5">

            <div
              className="spinner-border text-primary"
              role="status"
            >

              <span className="visually-hidden">
                Loading...
              </span>

            </div>

            <p className="mt-3">
              Loading rooms...
            </p>

          </div>

        )}


        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {!loading && error !== "" && (

          <div className="alert alert-danger text-center">

            {error}

          </div>

        )}


        {/* ================================= */}
        {/* NO ROOMS */}
        {/* ================================= */}

        {!loading &&
          error === "" &&
          rooms.length === 0 && (

            <div className="alert alert-info text-center">

              No rooms are currently available.

            </div>

          )}


        {/* ================================= */}
        {/* ROOM CARDS */}
        {/* ================================= */}

        {!loading &&
          error === "" &&
          rooms.length > 0 && (

            <div className="row g-4">

              {rooms.map((room) => (

                <div
                  className="col-12 col-sm-6 col-lg-4"
                  key={room.id}
                >

                  <div className="card h-100 shadow-sm border-0">


                    {/* ============================= */}
                    {/* ROOM IMAGE */}
                    {/* ============================= */}

                    <div
                      className="bg-secondary d-flex align-items-center justify-content-center"
                      style={{
                        height: "220px",
                        overflow: "hidden"
                      }}
                    >

                      {room.image ? (

                        <img
                          src={"/images/" + room.image}
                          alt={room.room_type}
                          className="w-100 h-100"
                          style={{
                            objectFit: "cover"
                          }}
                        />

                      ) : (

                        <span className="text-white">
                          No Image Available
                        </span>

                      )}

                    </div>


                    {/* ============================= */}
                    {/* ROOM INFORMATION */}
                    {/* ============================= */}

                    <div className="card-body">


                      <div className="d-flex justify-content-between align-items-start gap-2 mb-2">

                        <h4 className="card-title mb-0">

                          {room.room_type}

                        </h4>


                        {room.status === "Available" ? (

                          <span className="badge bg-success">

                            Available

                          </span>

                        ) : (

                          <span className="badge bg-danger">

                            Unavailable

                          </span>

                        )}

                      </div>


                      <p className="text-muted mb-2">

                        Room No. {room.room_number}

                      </p>


                      <p className="mb-2">

                        <strong>
                          ₹{room.price}
                        </strong>

                        <span className="text-muted">
                          {" "} / night
                        </span>

                      </p>


                      <p className="mb-2">

                        <strong>
                          Capacity:
                        </strong>{" "}

                        {room.capacity} guests

                      </p>


                      <p className="card-text text-muted">

                        {room.description
                          ? room.description
                          : "Comfortable room with modern facilities."
                        }

                      </p>

                    </div>


                    {/* ============================= */}
                    {/* BUTTONS */}
                    {/* ============================= */}

                    <div className="card-footer bg-white border-0 p-3">

                      <div className="d-grid gap-2">


                        {/* VIEW DETAILS */}

                        <Link
                          to={"/room-details/" + room.id}
                          className="btn btn-outline-primary"
                        >

                          View Details

                        </Link>


                        {/* BOOK NOW */}

                        {room.status === "Available" ? (

                          <Link
                            to={"/booking/" + room.id}
                            className="btn btn-primary"
                          >

                            Book Now

                          </Link>

                        ) : (

                          <button
                            type="button"
                            className="btn btn-secondary"
                            disabled
                          >

                            Currently Unavailable

                          </button>

                        )}

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

      </div>

    </div>

  );

}

export default Rooms;