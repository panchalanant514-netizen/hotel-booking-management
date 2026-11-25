import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (formData.password === "") {
      newErrors.password = "Password is required";
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
        "http://localhost/hotel-booking-management/backend/admin/auth/adminLogin.php",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.success) {
        alert(response.data.message);

        const admin = response.data.admin;

        localStorage.setItem("admin", JSON.stringify(admin));

        const fullName =
          admin?.full_name ||
          admin?.name ||
          [admin?.first_name, admin?.last_name].filter(Boolean).join(" ");

        localStorage.setItem("adminName", fullName || "Admin");
        window.location.href = "/admin-dashboard";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4">Admin Login</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="admin-email" className="form-label">
                    Admin Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter admin email"
                  />

                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="admin-password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter admin password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Admin Login
                </button>
              </form>

              <div className="text-center mt-3">
                <Link to="/login">User Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;