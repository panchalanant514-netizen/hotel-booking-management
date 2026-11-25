import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function Booking() {

  // ==========================================
  // GET ROOM ID FROM URL
  // ==========================================

  const { id } = useParams();

  const navigate = useNavigate();


  // ==========================================
  // ROOM DATA
  // ==========================================

  const [room, setRoom] = useState(null);


  // ==========================================
  // FORM DATA
  // ==========================================

  const [customerName, setCustomerName] = useState("");

  const [email, setEmail] = useState("");

  const [mobile, setMobile] = useState("");

  const [guests, setGuests] = useState("");

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");


  // ==========================================
  // TOTAL AMOUNT
  // ==========================================

  const [totalAmount, setTotalAmount] = useState(0);


  // ==========================================
  // MESSAGES
  // ==========================================

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [bookingId, setBookingId] = useState("");


  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);


  // ==========================================
  // TODAY'S DATE
  // ==========================================

  const today = new Date()
    .toISOString()
    .split("T")[0];


  // ==========================================
  // GET ROOM FROM DATABASE
  // ==========================================

  useEffect(() => {

    const getRoom = async () => {

      try {

        const response = await axios.get(
          "http://localhost/hotel-booking-management/backend/room/getRooms.php"
        );


        if (
          response.data.success &&
          Array.isArray(response.data.rooms)
        ) {

          const selectedRoom =
            response.data.rooms.find(
              (item) =>
                String(item.id) === String(id)
            );


          if (selectedRoom) {

            setRoom(selectedRoom);

          }
          else {

            setError("Room not found.");

          }

        }
        else {

          setError("Unable to load room.");

        }

      }
      catch (err) {

        console.log("Room Error:", err);

        setError(
          "Unable to connect with the server."
        );

      }
      finally {

        setLoading(false);

      }

    };


    getRoom();

  }, [id]);


  // ==========================================
  // CALCULATE TOTAL AMOUNT
  // ==========================================

  useEffect(() => {

    if (
      room &&
      checkIn &&
      checkOut
    ) {

      const startDate =
        new Date(checkIn);

      const endDate =
        new Date(checkOut);


      const difference =
        endDate - startDate;


      const numberOfNights =
        difference /
        (1000 * 60 * 60 * 24);


      if (numberOfNights > 0) {

        const total =
          numberOfNights *
          Number(room.price);

        setTotalAmount(total);

      }
      else {

        setTotalAmount(0);

      }

    }
    else {

      setTotalAmount(0);

    }

  }, [room, checkIn, checkOut]);


  // ==========================================
  // FORM VALIDATION
  // ==========================================

  const validateForm = () => {

    setError("");


    // Customer name

    if (customerName.trim() === "") {

      setError(
        "Please enter customer name."
      );

      return false;

    }


    if (customerName.trim().length < 3) {

      setError(
        "Customer name must contain at least 3 characters."
      );

      return false;

    }


    // Email

    if (email.trim() === "") {

      setError(
        "Please enter email address."
      );

      return false;

    }


    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

      setError(
        "Please enter a valid email address."
      );

      return false;

    }


    // Mobile

    if (mobile.trim() === "") {

      setError(
        "Please enter mobile number."
      );

      return false;

    }


    const mobilePattern =
      /^[0-9]{10}$/;


    if (!mobilePattern.test(mobile)) {

      setError(
        "Mobile number must contain exactly 10 digits."
      );

      return false;

    }


    // Guests

    if (guests === "") {

      setError(
        "Please enter number of guests."
      );

      return false;

    }


    if (Number(guests) <= 0) {

      setError(
        "Number of guests must be greater than 0."
      );

      return false;

    }


    // Room capacity

    if (
      room &&
      Number(guests) > Number(room.capacity)
    ) {

      setError(
        "Number of guests exceeds room capacity."
      );

      return false;

    }


    // Check-in

    if (checkIn === "") {

      setError(
        "Please select check-in date."
      );

      return false;

    }


    // Check-out

    if (checkOut === "") {

      setError(
        "Please select check-out date."
      );

      return false;

    }


    // Date comparison

    const startDate =
      new Date(checkIn);

    const endDate =
      new Date(checkOut);


    if (endDate <= startDate) {

      setError(
        "Check-out date must be after check-in date."
      );

      return false;

    }


    // Total amount

    if (totalAmount <= 0) {

      setError(
        "Please select valid dates."
      );

      return false;

    }


    return true;

  };


  // ==========================================
  // SUBMIT BOOKING
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    setError("");

    setSuccess("");

    setBookingId("");


    // Validate

    const valid = validateForm();


    if (!valid) {

      return;

    }


    try {

      setSubmitting(true);


      // ======================================
      // DATA SENT TO PHP
      // ======================================

      const bookingData = {

        room_id: room.id,

        customer_name:
          customerName.trim(),

        email:
          email.trim(),

        mobile:
          mobile.trim(),

        guests:
          Number(guests),

        check_in:
          checkIn,

        check_out:
          checkOut,

        total_amount:
          Number(totalAmount)

      };


      console.log(
        "Sending Booking:",
        bookingData
      );


      // ======================================
      // SEND DATA TO PHP
      // ======================================

      const response = await axios.post(

        "http://localhost/hotel-booking-management/backend/booking/addBooking.php",

        bookingData,

        {
          headers: {
            "Content-Type": "application/json"
          }
        }

      );


      console.log(
        "Booking Response:",
        response.data
      );


      // ======================================
      // SUCCESS
      // ======================================

      if (response.data.success) {

        setSuccess(
          response.data.message ||
          "Booking created successfully."
        );


        setBookingId(
          response.data.booking_id
        );


        // Clear form

        setCustomerName("");

        setEmail("");

        setMobile("");

        setGuests("");

        setCheckIn("");

        setCheckOut("");

        setTotalAmount(0);

      }
      else {

        setError(
          response.data.message ||
          "Booking failed."
        );

      }

    }
    catch (err) {

      console.log(
        "Booking Error:",
        err
      );


      if (
        err.response &&
        err.response.data
      ) {

        console.log(
          "PHP Error Response:",
          err.response.data
        );

      }


      setError(
        "Unable to connect with the server."
      );

    }
    finally {

      setSubmitting(false);

    }

  };


  // ==========================================
  // LOADING SCREEN
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
  // ROOM NOT FOUND
  // ==========================================

  if (!room) {

    return (

      <div className="container py-5">

        <div className="alert alert-danger text-center">

          {error || "Room not found."}

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
  // BOOKING PAGE
  // ==========================================

  return (

    <div className="bg-light min-vh-100">

      <div className="container py-4 py-md-5">


        {/* ================================= */}
        {/* PAGE TITLE */}
        {/* ================================= */}

        <div className="text-center mb-4">

          <h1 className="fw-bold">

            Book Your Room

          </h1>

          <p className="text-muted">

            Enter your details to make a booking.

          </p>

        </div>


        {/* ================================= */}
        {/* ERROR MESSAGE */}
        {/* ================================= */}

        {error !== "" && (

          <div className="alert alert-danger">

            {error}

          </div>

        )}


        {/* ================================= */}
        {/* SUCCESS MESSAGE */}
        {/* ================================= */}

        {success !== "" && (

          <div className="alert alert-success">

            <h5 className="alert-heading">

              Booking Successful!

            </h5>

            <p className="mb-1">

              {success}

            </p>


            {bookingId && (

              <p className="mb-0">

                <strong>
                  Booking ID:
                </strong>{" "}

                {bookingId}

              </p>

            )}

          </div>

        )}


        <div className="row g-4">


          {/* ================================= */}
          {/* ROOM INFORMATION */}
          {/* ================================= */}

          <div className="col-12 col-lg-5">

            <div className="card shadow-sm h-100">

              <div className="card-body">

                <h3 className="fw-bold mb-3">

                  Room Information

                </h3>


                <div className="mb-3">

                  <strong>
                    Room Number:
                  </strong>

                  <div>

                    {room.room_number}

                  </div>

                </div>


                <div className="mb-3">

                  <strong>
                    Room Type:
                  </strong>

                  <div>

                    {room.room_type}

                  </div>

                </div>


                <div className="mb-3">

                  <strong>
                    Price:
                  </strong>

                  <div className="text-primary fs-4 fw-bold">

                    ₹{room.price}

                    <small className="text-muted fs-6">

                      {" "} / night

                    </small>

                  </div>

                </div>


                <div className="mb-3">

                  <strong>
                    Capacity:
                  </strong>

                  <div>

                    {room.capacity} guests

                  </div>

                </div>


                {room.description && (

                  <div>

                    <strong>
                      Description:
                    </strong>

                    <p className="text-muted mt-1">

                      {room.description}

                    </p>

                  </div>

                )}

              </div>

            </div>

          </div>


          {/* ================================= */}
          {/* BOOKING FORM */}
          {/* ================================= */}

          <div className="col-12 col-lg-7">

            <div className="card shadow-sm">

              <div className="card-body p-3 p-md-4">

                <h3 className="fw-bold mb-4">

                  Customer Details

                </h3>


                <form onSubmit={handleSubmit}>


                  {/* CUSTOMER NAME */}

                  <div className="mb-3">

                    <label className="form-label">

                      Customer Name

                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={customerName}
                      onChange={(e) =>
                        setCustomerName(e.target.value)
                      }
                      placeholder="Enter full name"
                    />

                  </div>


                  {/* EMAIL */}

                  <div className="mb-3">

                    <label className="form-label">

                      Email Address

                    </label>

                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter email address"
                    />

                  </div>


                  {/* MOBILE */}

                  <div className="mb-3">

                    <label className="form-label">

                      Mobile Number

                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={mobile}
                      onChange={(e) => {

                        const value =
                          e.target.value;

                        if (
                          /^[0-9]*$/.test(value) &&
                          value.length <= 10
                        ) {

                          setMobile(value);

                        }

                      }}
                      placeholder="Enter 10 digit mobile number"
                    />

                  </div>


                  {/* GUESTS */}

                  <div className="mb-3">

                    <label className="form-label">

                      Number of Guests

                    </label>

                    <input
                      type="number"
                      className="form-control"
                      value={guests}
                      onChange={(e) =>
                        setGuests(e.target.value)
                      }
                      min="1"
                      max={room.capacity}
                      placeholder="Enter number of guests"
                    />

                    <small className="text-muted">

                      Maximum capacity:{" "}

                      {room.capacity} guests

                    </small>

                  </div>


                  {/* DATES */}

                  <div className="row">


                    {/* CHECK-IN */}

                    <div className="col-12 col-md-6 mb-3">

                      <label className="form-label">

                        Check-in Date

                      </label>

                      <input
                        type="date"
                        className="form-control"
                        value={checkIn}
                        min={today}
                        onChange={(e) =>
                          setCheckIn(e.target.value)
                        }
                      />

                    </div>


                    {/* CHECK-OUT */}

                    <div className="col-12 col-md-6 mb-3">

                      <label className="form-label">

                        Check-out Date

                      </label>

                      <input
                        type="date"
                        className="form-control"
                        value={checkOut}
                        min={checkIn || today}
                        onChange={(e) =>
                          setCheckOut(e.target.value)
                        }
                      />

                    </div>

                  </div>


                  {/* TOTAL AMOUNT */}

                  <div className="alert alert-info">

                    <div className="d-flex justify-content-between align-items-center">

                      <span className="fw-bold">

                        Total Amount

                      </span>

                      <span className="fs-4 fw-bold">

                        ₹{totalAmount}

                      </span>

                    </div>

                  </div>


                  {/* SUBMIT BUTTON */}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={submitting}
                  >

                    {submitting
                      ? "Submitting Booking..."
                      : "Confirm Booking"
                    }

                  </button>


                </form>

              </div>

            </div>

          </div>

        </div>


        {/* ================================= */}
        {/* BACK BUTTON */}
        {/* ================================= */}

        <div className="text-center mt-4">

          <Link
            to="/rooms"
            className="btn btn-outline-secondary"
          >

            ← Back to Rooms

          </Link>

        </div>

      </div>

    </div>

  );

}

export default Booking;