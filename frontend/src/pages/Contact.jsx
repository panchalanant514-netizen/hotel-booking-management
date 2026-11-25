import React from "react";

function Contact() {
  return (
    <section className="py-5 bg-light">

      <div className="container">

        {/* PAGE TITLE */}

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Contact Us
          </h1>

          <p className="text-muted">
            Get in touch with Shree Kastabhanjan Dev Hotel.
          </p>

        </div>


        {/* CONTACT DETAILS */}

        <div className="row g-4 justify-content-center">


          {/* HOTEL INFORMATION */}

          <div className="col-12 col-md-6 col-lg-5">

            <div className="card shadow-sm h-100 border-0">

              <div className="card-body p-4">

                <h3 className="fw-bold mb-4">
                  Shree Kastabhanjan Dev Hotel
                </h3>


                {/* ADDRESS */}

                <div className="mb-4">

                  <h5>
                    📍 Address
                  </h5>

                  <p className="text-muted mb-0">
                    Sarangpur, Gujarat, India
                  </p>

                </div>


                {/* PHONE */}

                <div className="mb-4">

                  <h5>
                    📞 Phone
                  </h5>

                  <p className="text-muted mb-0">
                    +91 9897214214
                  </p>

                </div>


                {/* EMAIL */}

                <div className="mb-4">

                  <h5>
                    ✉️ Email
                  </h5>

                  <p className="text-muted mb-0">
                    Kastabhanjandevhotel@gmail.com
                  </p>

                </div>


                {/* RECEPTION */}

                <div className="mb-2">

                  <h5>
                    🕐 Reception
                  </h5>

                  <p className="text-muted mb-0">
                    Open 24 × 7
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* MAP */}

          <div className="col-12 col-md-6 col-lg-7">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body p-3">

                <h4 className="fw-bold text-center mb-3">
                  Our Location
                </h4>

                <div
                  className="ratio ratio-16x9"
                >

                  <iframe
                    src="https://www.google.com/maps?q=Sarangpur,Gujarat,India&output=embed"
                    title="Shree Kastabhanjan Dev Hotel Location"
                    style={{
                      border: 0
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


        {/* FOOTER MESSAGE */}

        <div className="text-center mt-5">

          <h5>
            We look forward to welcoming you!
          </h5>

          <p className="text-muted">
            For room bookings and enquiries, please contact our hotel reception.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Contact;