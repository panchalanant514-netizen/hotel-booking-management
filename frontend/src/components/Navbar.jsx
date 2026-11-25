import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");

  // USER LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");

    alert("User logged out successfully.");

    setMenuOpen(false);
    navigate("/login");
  };

  // ADMIN LOGOUT
  const handleAdminLogout = () => {
    localStorage.removeItem("admin");

    alert("Admin logged out successfully.");

    setMenuOpen(false);
    navigate("/admin-login");
  };

  // CLOSE MOBILE MENU
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* HOTEL NAME */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
          onClick={closeMenu}
        >
          🏨 Shree Kastabhanjan Dev Hotel
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVIGATION */}
        <div
          className={
            menuOpen
              ? "collapse navbar-collapse show"
              : "collapse navbar-collapse"
          }
        >
          <ul className="navbar-nav ms-auto">

            {/* HOME */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>

            {/* ABOUT */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                onClick={closeMenu}
              >
                About
              </Link>
            </li>

            {/* ROOMS */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/rooms"
                onClick={closeMenu}
              >
                Rooms
              </Link>
            </li>

            {/* FOOD MENU */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/food-menu"
                onClick={closeMenu}
              >
                Food Menu
              </Link>
            </li>

            {/* FEEDBACK */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/feedback"
                onClick={closeMenu}
              >
                Feedback
              </Link>
            </li>

            {/* CONTACT */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>

            {/* USER MENU */}
            {user && (
              <>
                {/* MY BOOKINGS */}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/my-bookings"
                    onClick={closeMenu}
                  >
                    My Bookings
                  </Link>
                </li>

                {/* USER LOGOUT */}
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm mt-1 ms-lg-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* LOGIN */}
            {!user && !admin && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </li>
            )}

            {/* REGISTER */}
            {!user && !admin && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/register"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </li>
            )}

            {/* ADMIN LOGIN */}
            {!user && !admin && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin-login"
                  onClick={closeMenu}
                >
                  Admin Login
                </Link>
              </li>
            )}

            {/* ADMIN DASHBOARD */}
            {admin && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin-dashboard"
                  onClick={closeMenu}
                >
                  Admin Dashboard
                </Link>
              </li>
            )}

            {/* ADMIN LOGOUT */}
            {admin && (
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-danger btn-sm mt-1 ms-lg-2"
                  onClick={handleAdminLogout}
                >
                  Admin Logout
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;