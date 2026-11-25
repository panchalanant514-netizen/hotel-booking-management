import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAdmin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  const validateForm = () => {

    let newErrors = {};

    if (formData.name.trim() === "") {

      newErrors.name = "Name is required";

    }


    if (formData.email.trim() === "") {

      newErrors.email = "Email is required";

    }
    else if (!formData.email.includes("@")) {

      newErrors.email = "Enter a valid email";

    }


    if (formData.password === "") {

      newErrors.password = "Password is required";

    }
    else if (formData.password.length < 6) {

      newErrors.password =
        "Password must be at least 6 characters";

    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {

      return;

    }


    try {

      const response = await axios.post(

        "http://localhost/hotel-booking-management/backend/admin/auth/createAdmin.php",

        formData

      );


      alert(response.data.message);


      if (response.data.success) {

        setFormData({
          name: "",
          email: "",
          password: ""
        });

        setErrors({});

      }

    }
    catch (error) {

      console.log(error);

      alert("Unable to connect to server");

    }

  };


  return (

    <section className="py-5">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-sm-10 col-md-7 col-lg-5">

            <div className="card shadow">

              <div className="card-body p-4">

                <h2 className="text-center mb-4">
                  Add New Admin
                </h2>


                <form onSubmit={handleSubmit}>

                  {/* Name */}

                  <div className="mb-3">

                    <label className="form-label">
                      Admin Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter admin name"
                    />

                    {errors.name && (

                      <small className="text-danger">
                        {errors.name}
                      </small>

                    )}

                  </div>


                  {/* Email */}

                  <div className="mb-3">

                    <label className="form-label">
                      Admin Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter admin email"
                    />

                    {errors.email && (

                      <small className="text-danger">
                        {errors.email}
                      </small>

                    )}

                  </div>


                  {/* Password */}

                  <div className="mb-3">

                    <label className="form-label">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />

                    {errors.password && (

                      <small className="text-danger">
                        {errors.password}
                      </small>

                    )}

                  </div>


                  {/* Buttons */}

                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                  >
                    Create Admin
                  </button>


                  <button
                    type="button"
                    className="btn btn-secondary w-100 mt-2"
                    onClick={() =>
                      navigate("/admin-dashboard")
                    }
                  >
                    Back to Dashboard
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default AddAdmin;