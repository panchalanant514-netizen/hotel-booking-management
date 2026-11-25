import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total_rooms: 0,
    total_bookings: 0,
    pending_bookings: 0,
    approved_bookings: 0,
    cancelled_bookings: 0
  });

  const [loading, setLoading] = useState(true);

  const [adminName] = useState(() => {
    return localStorage.getItem("adminName") || "Admin";
  });

  useEffect(() => {
    axios
      .get(
        "http://localhost/hotel-booking-management/backend/dashboard/getDashboardStats.php"
      )
      .then((response) => {
        console.log("Dashboard Response:", response.data);

        if (response.data.success) {
          setStats({
            total_rooms: response.data.total_rooms,
            total_bookings: response.data.total_bookings,
            pending_bookings: response.data.pending_bookings,
            approved_bookings: response.data.approved_bookings,
            cancelled_bookings: response.data.cancelled_bookings
          });
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log("Dashboard Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Welcome {adminName}</h2>
        <p className="text-center mt-4">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-5">Welcome {adminName}</h2>

      <div className="row g-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h5>Total Rooms</h5>
              <h2 className="mt-3">{stats.total_rooms}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h5>Total Bookings</h5>
              <h2 className="mt-3">{stats.total_bookings}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h5>Pending Bookings</h5>
              <h2 className="mt-3">{stats.pending_bookings}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h5>Approved Bookings</h5>
              <h2 className="mt-3">{stats.approved_bookings}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h5>Cancelled Bookings</h5>
              <h2 className="mt-3">{stats.cancelled_bookings}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center mb-4">Admin Management</h3>

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <Link to="/admin-rooms" className="btn btn-primary w-100 py-3">
              Manage Rooms
            </Link>
          </div>

          <div className="col-12 col-md-6">
            <Link to="/bookings" className="btn btn-success w-100 py-3">
              Manage Bookings
            </Link>
          </div>

          <div className="col-12 col-md-6">
            <Link to="/add-admin" className="btn btn-dark w-100 py-3">
              Add New Admin
            </Link>
          </div>

          <div className="col-12 col-md-6">
            <Link to="/" className="btn btn-secondary w-100 py-3">
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;