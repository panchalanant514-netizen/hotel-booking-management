import React from "react";

function About() {

  return (

    
    <section className="py-5">

      <div className="container">

        <div className="row align-items-center g-4">

          {/* =========================
              ABOUT CONTENT
          ========================= */}

          <div className="col-12 col-md-6">

            <h1 className="fw-bold">
              About Our Hotel
            </h1>

            <p className="mt-3">

              Welcome to
              <strong> Shree Kastabhanjan Dev Hotel</strong>.
              Our hotel provides comfortable accommodation,
              quality service and a pleasant environment for
              our guests.

            </p>

            <p>

              Our Hotel Booking Management System allows
              customers to view rooms, check room details,
              make bookings and manage their reservations
              easily.

            </p>

            <p>

              We aim to provide our guests with a comfortable
              and convenient hotel booking experience.

            </p>

          </div>


          {/* =========================
              HOTEL IMAGE
          ========================= */}

          <div className="col-12 col-md-6">

            <img
              src="/images/about1.jpg"
              alt="Shree Kastabhanjan Dev Hotel"
              className="img-fluid rounded shadow"
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover"
              }}
            />

          </div>

        </div>

      </div>

    </section>

  );

}

export default About;