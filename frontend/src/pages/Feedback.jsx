import React, { useEffect, useState } from "react";
import axios from "axios";

function Feedback() {

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const [feedback, setFeedback] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  // ==========================================
  // GET FEEDBACK
  // ==========================================

  const getFeedback = async () => {

    try {

      const response = await axios.get(
        "http://localhost/hotel-booking-management/backend/feedback/getFeedback.php"
      );

      console.log("Feedback Response:", response.data);

      if (response.data.success) {

        setFeedback(response.data.feedback);

      }

    }
    catch (err) {

      console.log("Feedback Error:", err);

      setError("Unable to load feedback.");

    }
    finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getFeedback();

  }, []);


  // ==========================================
  // SUBMIT FEEDBACK
  // ==========================================

  const submitFeedback = async (e) => {

    e.preventDefault();

    setSuccess("");
    setError("");


    if (name.trim() === "") {

      setError("Please enter your name.");
      return;

    }


    if (message.trim() === "") {

      setError("Please enter your feedback.");
      return;

    }


    try {

      setSubmitting(true);


      const response = await axios.post(
        "http://localhost/hotel-booking-management/backend/feedback/addFeedback.php",
        {
          name: name,
          rating: rating,
          message: message
        }
      );


      if (response.data.success) {

        setSuccess("Thank you! Your feedback has been submitted.");

        setName("");
        setRating(5);
        setMessage("");


        // Refresh feedback list

        getFeedback();

      }
      else {

        setError(response.data.message);

      }

    }
    catch (err) {

      console.log("Submit Feedback Error:", err);

      setError(
        "Unable to submit feedback."
      );

    }
    finally {

      setSubmitting(false);

    }

  };


  return (

    <div className="bg-light min-vh-100">

      <div className="container py-5">


        {/* PAGE TITLE */}

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Guest Feedback
          </h1>

          <p className="text-muted">
            See what our guests say about their stay.
          </p>

        </div>


        <div className="row g-4">


          {/* ================================= */}
          {/* FEEDBACK FORM */}
          {/* ================================= */}

          <div className="col-12 col-lg-5">

            <div className="card shadow-sm border-0">

              <div className="card-body p-4">

                <h3 className="fw-bold mb-4">
                  Give Your Feedback
                </h3>


                {/* SUCCESS */}

                {success && (

                  <div className="alert alert-success">
                    {success}
                  </div>

                )}


                {/* ERROR */}

                {error && (

                  <div className="alert alert-danger">
                    {error}
                  </div>

                )}


                <form onSubmit={submitFeedback}>


                  {/* NAME */}

                  <div className="mb-3">

                    <label className="form-label">
                      Your Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Enter your name"
                    />

                  </div>


                  {/* RATING */}

                  <div className="mb-3">

                    <label className="form-label">
                      Rating
                    </label>

                    <select
                      className="form-select"
                      value={rating}
                      onChange={(e) =>
                        setRating(Number(e.target.value))
                      }
                    >

                      <option value="5">
                        ⭐⭐⭐⭐⭐ - Excellent
                      </option>

                      <option value="4">
                        ⭐⭐⭐⭐ - Very Good
                      </option>

                      <option value="3">
                        ⭐⭐⭐ - Good
                      </option>

                      <option value="2">
                        ⭐⭐ - Average
                      </option>

                      <option value="1">
                        ⭐ - Poor
                      </option>

                    </select>

                  </div>


                  {/* MESSAGE */}

                  <div className="mb-3">

                    <label className="form-label">
                      Your Feedback
                    </label>

                    <textarea
                      className="form-control"
                      rows="5"
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      placeholder="Write your experience..."
                    ></textarea>

                  </div>


                  {/* BUTTON */}

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={submitting}
                  >

                    {submitting
                      ? "Submitting..."
                      : "Submit Feedback"
                    }

                  </button>

                </form>

              </div>

            </div>

          </div>


          {/* ================================= */}
          {/* ALL FEEDBACK */}
          {/* ================================= */}

          <div className="col-12 col-lg-7">

            <div className="card shadow-sm border-0">

              <div className="card-body p-4">

                <h3 className="fw-bold mb-4">
                  Guest Reviews
                </h3>


                {loading ? (

                  <div className="text-center py-4">

                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>

                    <p className="mt-3">
                      Loading feedback...
                    </p>

                  </div>

                ) : feedback.length === 0 ? (

                  <div className="alert alert-info">

                    No feedback available yet.

                  </div>

                ) : (

                  feedback.map((item) => (

                    <div
                      key={item.id}
                      className="border rounded p-3 mb-3"
                    >

                      <div className="d-flex justify-content-between align-items-center">

                        <h5 className="fw-bold mb-1">
                          {item.name}
                        </h5>

                        <span className="text-warning">

                          {"⭐".repeat(
                            Number(item.rating)
                          )}

                        </span>

                      </div>


                      <p className="text-muted mb-2">

                        {item.message}

                      </p>


                      <small className="text-secondary">

                        {item.created_at}

                      </small>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Feedback;