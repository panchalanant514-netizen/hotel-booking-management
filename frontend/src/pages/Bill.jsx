import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Bill() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;
  const room = location.state?.room;

  if (!booking) {
    return (
      <div className="container mt-5 mb-5">
        <div className="alert alert-warning text-center">
          Booking information not found.
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/my-bookings")}
          >
            Back to My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <div className="card">

        <div className="card-header bg-dark text-white text-center">
          <h2>Invoice Bill</h2>
        </div>

        <div className="card-body">

          <div className="text-center mb-4">
            <h3>Shree Kastabhanjan Dev</h3>
            <p>Booking Invoice</p>
          </div>

          <hr />

          <h5>Booking Information</h5>

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th>Booking ID</th>
                <td>{booking.id}</td>
              </tr>

              <tr>
                <th>Room Number</th>
                <td>
                  {room
                    ? room.room_number
                    : booking.room_id}
                </td>
              </tr>

              <tr>
                <th>Room Type</th>
                <td>
                  {room
                    ? room.room_type
                    : "Room"}
                </td>
              </tr>

              <tr>
                <th>Guest Name</th>
                <td>{booking.guest_name}</td>
              </tr>

              <tr>
                <th>Mobile</th>
                <td>{booking.mobile}</td>
              </tr>

              <tr>
                <th>Number of Guests</th>
                <td>{booking.number_of_guests}</td>
              </tr>

              <tr>
                <th>Check-in</th>
                <td>{booking.check_in}</td>
              </tr>

              <tr>
                <th>Check-out</th>
                <td>{booking.check_out}</td>
              </tr>

              <tr>
                <th>Status</th>
                <td>
                  <span className="badge bg-success">
                    {booking.status}
                  </span>
                </td>
              </tr>

              <tr>
                <th>Total Amount</th>
                <td>
                  <strong>
                    ₹
                    {Number(
                      booking.total_amount || 0
                    ).toFixed(2)}
                  </strong>
                </td>
              </tr>

            </tbody>

          </table>

          <div className="text-center mt-4">

            <button
              className="btn btn-primary me-2"
              onClick={() => window.print()}
            >
              Print Bill
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/my-bookings")}
            >
              Back
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Bill;