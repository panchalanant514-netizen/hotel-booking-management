import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>

      {/* ================= HERO SECTION ================= */}

      <section className="hero-section">

        <div className="container">

          <div className="row align-items-center min-vh-75">

            <div className="col-lg-7 text-white">

              <h1 className="display-4 fw-bold">
                Welcome to Shree Kastabhanjan Dev
              </h1>

              <p className="lead mt-3">
                Enjoy a comfortable and memorable stay
                with our excellent rooms and services.
              </p>

              <Link
                to="/rooms"
                className="btn btn-primary btn-lg mt-3"
              >
                Explore Rooms
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SERVICES SECTION ================= */}

      <section className="py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2>Why Choose Us?</h2>

            <p className="text-muted">
              We provide comfortable rooms and quality services.
            </p>

          </div>


          <div className="row g-4">


            {/* Comfortable Rooms */}

            <div className="col-12 col-md-4">

              <div className="card h-100 shadow-sm text-center p-4">

                <div className="fs-1">
                  🛏️
                </div>

                <h4 className="mt-3">
                  Comfortable Rooms
                </h4>

                <p>
                  Clean and comfortable rooms for a relaxing stay.
                </p>

              </div>

            </div>


            {/* Quality Service */}

            <div className="col-12 col-md-4">

              <div className="card h-100 shadow-sm text-center p-4">

                <div className="fs-1">
                  🍽️
                </div>

                <h4 className="mt-3">
                  Quality Service
                </h4>

                <p>
                  Friendly service to make your stay enjoyable.
                </p>

              </div>

            </div>


            {/* Safe & Secure */}

            <div className="col-12 col-md-4">

              <div className="card h-100 shadow-sm text-center p-4">

                <div className="fs-1">
                  🔒
                </div>

                <h4 className="mt-3">
                  Safe & Secure
                </h4>

                <p>
                  Your booking information is handled securely.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= LOCATION / MAP SECTION ================= */}

      <section className="py-5 bg-light">

        <div className="container">

          <div className="text-center mb-4">

            <h2>
              Find Us
            </h2>

            <p className="text-muted">
              Visit Shree Kastabhanjan Dev
            </p>

          </div>


          <div className="row justify-content-center">

            <div className="col-12 col-lg-10">

              <div className="card shadow-sm">

                <div className="card-body p-2">

                  <div
                    style={{
                      width: "100%",
                      height: "400px"
                    }}
                  >

                    <iframe
                      title="Shree Kastabhanjan Dev Location"
                      src="https://www.google.com/maps?q=Shree+Kastabhanjan+Dev&output=embed"
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        borderRadius: "8px"
                      }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Open in Google Maps Button */}

          <div className="text-center mt-4">

            <a
              href="https://www.google.com/maps/search/?api=1&query=Shree+Kastabhanjan+Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              📍 Open in Google Maps
            </a>

          </div>

        </div>

      </section>

    </>
  );
}

export default Home;