import React, { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Get all bookings
  const getBookings = () => {

    axios
      .get(
        "http://localhost/hotel-booking-management/backend/booking/getBookings.php"
      )
      .then((response) => {

        console.log("Bookings Response:", response.data);

        if (response.data.success) {

          setBookings(response.data.bookings);

        } else {

          setError("Unable to load bookings.");

        }

        setLoading(false);

      })
      .catch((error) => {

        console.log("Bookings Error:", error);

        setError("Unable to connect with the server.");

        setLoading(false);

      });

  };


  // Load bookings when page opens
  useEffect(() => {

    getBookings();

  }, []);


  // Approve booking
  const approveBooking = (id) => {

    axios
      .post(
        "http://localhost/hotel-booking-management/backend/booking/approveBooking.php",
        {
          id: id
        }
      )
      .then((response) => {

        console.log("Approve Response:", response.data);

        if (response.data.success) {

          alert("Booking approved successfully!");

          getBookings();

        } else {

          alert(response.data.message);

        }

      })
      .catch((error) => {

        console.log("Approve Error:", error);

        alert("Unable to approve booking.");

      });

  };


  // Cancel booking
  const cancelBooking = (id) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {

      return;

    }


    axios
      .post(
        "http://localhost/hotel-booking-management/backend/booking/cancelBooking.php",
        {
          id: id
        }
      )
      .then((response) => {

        console.log("Cancel Response:", response.data);

        if (response.data.success) {

          alert("Booking cancelled successfully!");

          getBookings();

        } else {

          alert(response.data.message);

        }

      })
      .catch((error) => {

        console.log("Cancel Error:", error);

        alert("Unable to cancel booking.");

      });

  };


  return (

    <div className="container mt-5 mb-5">

      <h2 className="text-center mb-4">
        Booking Management
      </h2>


      {/* Loading */}

      {loading && (

        <div className="alert alert-info text-center">

          Loading bookings...

        </div>

      )}


      {/* Error */}

      {error && (

        <div className="alert alert-danger text-center">

          {error}

        </div>

      )}


      {/* No bookings */}

      {!loading && !error && bookings.length === 0 && (

        <div className="alert alert-warning text-center">

          No bookings found.

        </div>

      )}


      {/* Booking table */}

      {!loading && !error && bookings.length > 0 && (

        <div className="table-responsive">

          <table className="table table-bordered table-striped">

            <thead className="table-dark">

              <tr>

                <th>ID</th>

                <th>User ID</th>

                <th>Room ID</th>

                <th>Guest Name</th>

                <th>Mobile</th>

                <th>Check-in</th>

                <th>Check-out</th>

                <th>Guests</th>

                <th>Total Amount</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {bookings.map((booking) => (

                <tr key={booking.id}>

                  <td>
                    {booking.id}
                  </td>

                  <td>
                    {booking.user_id}
                  </td>

                  <td>
                    {booking.room_id}
                  </td>

                  <td>
                    {booking.guest_name}
                  </td>

                  <td>
                    {booking.mobile}
                  </td>

                  <td>
                    {booking.check_in}
                  </td>

                  <td>
                    {booking.check_out}
                  </td>

                  <td>
                    {booking.number_of_guests}
                  </td>

                  <td>
                    ₹{booking.total_amount}
                  </td>

                  <td>

                    {booking.status === "Approved" ? (

                      <span className="text-success fw-bold">
                        Approved
                      </span>

                    ) : booking.status === "Cancelled" ? (

                      <span className="text-danger fw-bold">
                        Cancelled
                      </span>

                    ) : (

                      <span className="text-warning fw-bold">
                        Pending
                      </span>

                    )}

                  </td>


                  <td>

                    {booking.status === "Pending" ? (

                      <div>

                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => approveBooking(booking.id)}
                        >
                          Approve
                        </button>


                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Cancel
                        </button>

                      </div>

                    ) : booking.status === "Approved" ? (

                      <span className="text-success fw-bold">
                        Approved
                      </span>

                    ) : (

                      <span className="text-danger fw-bold">
                        Cancelled
                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}

export default Bookings;