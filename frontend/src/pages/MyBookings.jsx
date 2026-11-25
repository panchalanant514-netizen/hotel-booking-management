import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const BOOKINGS_URL =
    "http://localhost/hotel-booking-management/backend/booking/getBookings.php";

  const ROOMS_URL =
    "http://localhost/hotel-booking-management/backend/room/getRooms.php";

  const CANCEL_URL =
    "http://localhost/hotel-booking-management/backend/booking/cancelBooking.php";


  // ==========================================
  // GET BOOKINGS
  // ==========================================

  const getBookings = async () => {

    try {

      const response = await axios.get(BOOKINGS_URL);

      console.log("BOOKINGS RESPONSE:", response.data);

      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.bookings)
      ) {

        setBookings(response.data.bookings);

      } else {

        setBookings([]);

      }

    } catch (error) {

      console.log("GET BOOKINGS ERROR:", error);

      setBookings([]);

    }

  };


  // ==========================================
  // GET ROOMS
  // ==========================================

  const getRooms = async () => {

    try {

      const response = await axios.get(ROOMS_URL);

      console.log("ROOMS RESPONSE:", response.data);

      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.rooms)
      ) {

        setRooms(response.data.rooms);

      } else {

        setRooms([]);

      }

    } catch (error) {

      console.log("GET ROOMS ERROR:", error);

      setRooms([]);

    }

  };


  // ==========================================
  // FIND ROOM
  // ==========================================

  const getRoom = (roomId) => {

    return rooms.find(
      (room) =>
        String(room.id) === String(roomId)
    );

  };


  // ==========================================
  // CANCEL BOOKING
  // ==========================================

  const cancelBooking = async (bookingId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {

      return;

    }


    try {

      const response = await axios.post(
        CANCEL_URL,
        {
          id: bookingId
        }
      );


      console.log(
        "CANCEL RESPONSE:",
        response.data
      );


      if (response.data.success) {

        alert(
          "Booking cancelled successfully."
        );

        getBookings();

      } else {

        alert(
          response.data.message ||
          "Booking cancellation failed."
        );

      }

    } catch (error) {

      console.log(
        "CANCEL ERROR:",
        error
      );

      alert(
        "Unable to cancel booking."
      );

    }

  };


  // ==========================================
  // LOAD BOOKINGS AND ROOMS
  // ==========================================

  useEffect(() => {

    const loadData = async () => {

      setLoading(true);

      await getRooms();

      await getBookings();

      setLoading(false);

    };


    loadData();

  }, []);


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div className="container mt-5 mb-5">

        <h2 className="text-center">
          My Bookings
        </h2>

        <div className="alert alert-info text-center mt-4">

          Loading bookings...

        </div>

      </div>

    );

  }


  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (

    <div className="container mt-5 mb-5">

      <h2 className="text-center mb-4">
        My Bookings
      </h2>


      {/* =====================================
          NO BOOKINGS
      ===================================== */}

      {bookings.length === 0 ? (

        <div className="alert alert-warning text-center">

          You have no bookings.

        </div>

      ) : (


        /* =====================================
           BOOKINGS TABLE
        ===================================== */

        <div className="table-responsive">

          <table className="table table-bordered table-striped">

            <thead className="table-dark">

              <tr>

                <th>#</th>

                <th>Room</th>

                <th>Guest Name</th>

                <th>Mobile</th>

                <th>Guests</th>

                <th>Check-in</th>

                <th>Check-out</th>

                <th>Total Amount</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {bookings.map(
                (booking, index) => {

                  const room =
                    getRoom(
                      booking.room_id
                    );


                  return (

                    <tr
                      key={booking.id}
                    >

                      {/* Number */}

                      <td>
                        {index + 1}
                      </td>


                      {/* Room */}

                      <td>

                        {room ? (

                          <>

                            <strong>
                              Room{" "}
                              {room.room_number}
                            </strong>

                            <br />

                            <small>
                              {room.room_type}
                            </small>

                          </>

                        ) : (

                          <>
                            Room{" "}
                            {booking.room_id}
                          </>

                        )}

                      </td>


                      {/* Guest Name */}

                      <td>
                        {booking.guest_name}
                      </td>


                      {/* Mobile */}

                      <td>
                        {booking.mobile}
                      </td>


                      {/* Guests */}

                      <td>
                        {booking.number_of_guests}
                      </td>


                      {/* Check In */}

                      <td>
                        {booking.check_in}
                      </td>


                      {/* Check Out */}

                      <td>
                        {booking.check_out}
                      </td>


                      {/* Total Amount */}

                      <td>

                        ₹
                        {Number(
                          booking.total_amount || 0
                        ).toFixed(2)}

                      </td>


                      {/* Status */}

                      <td>

                        {booking.status ===
                          "Approved" && (

                          <span className="badge bg-success">

                            Approved

                          </span>

                        )}


                        {booking.status ===
                          "Pending" && (

                          <span className="badge bg-warning text-dark">

                            Pending

                          </span>

                        )}


                        {booking.status ===
                          "Cancelled" && (

                          <span className="badge bg-danger">

                            Cancelled

                          </span>

                        )}

                      </td>


                      {/* =================================
                          ACTION
                      ================================= */}

                      <td>


                        {/* VIEW BILL */}

                        {booking.status ===
                          "Approved" && (

                          <button
                            type="button"
                            className="btn btn-success btn-sm me-2"
                            onClick={() => {

                              navigate(
                                "/bill",
                                {
                                  state: {
                                    booking:
                                      booking,

                                    room:
                                      getRoom(
                                        booking.room_id
                                      )
                                  }
                                }
                              );

                            }}
                          >

                            View Bill

                          </button>

                        )}


                        {/* CANCEL BUTTON */}

                        {booking.status !==
                          "Cancelled" &&
                          booking.status !==
                            "Approved" && (

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              cancelBooking(
                                booking.id
                              )
                            }
                          >

                            Cancel

                          </button>

                        )}


                        {/* CANCELLED TEXT */}

                        {booking.status ===
                          "Cancelled" && (

                          <span className="text-danger">

                            Cancelled

                          </span>

                        )}

                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}

export default MyBookings;