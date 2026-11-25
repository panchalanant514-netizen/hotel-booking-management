import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// ==========================================
// COMPONENTS
// ==========================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


// ==========================================
// PAGES
// ==========================================
import FoodMenu from "./pages/FoodMenu";
import Home from "./pages/Home";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import MyBookings from "./pages/MyBookings";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddAdmin from "./pages/AddAdmin";
import AdminRooms from "./pages/AdminRooms";
import Bill from "./pages/Bill";


function App() {

  return (

    <BrowserRouter>

      {/* ================================== */}
      {/* NAVBAR */}
      {/* ================================== */}

      <Navbar />


      {/* ================================== */}
      {/* ALL ROUTES */}
      {/* ================================== */}

      <Routes>


        {/* ================================ */}
        {/* HOME */}
        {/* ================================ */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ================================ */}
        {/* ABOUT */}
        {/* ================================ */}

        <Route
          path="/about"
          element={<About />}
        />

        


        {/* ================================ */}
        {/* ROOMS */}
        {/* ================================ */}

        <Route
          path="/rooms"
          element={<Rooms />}
        />


        {/* ================================ */}
        {/* ROOM DETAILS */}
        {/* ================================ */}

        <Route
          path="/room-details/:id"
          element={<RoomDetails />}
        />

        <Route
          path="/booking/:id"
          element={<Booking />}
        />

        <Route
          path="/bookings"
          element={<Bookings />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />


        {/* ================================ */}
        {/* CONTACT */}
        {/* ================================ */}

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/feedback"
          element={<Feedback />}
        />


        {/* ================================ */}
        {/* USER LOGIN */}
        {/* ================================ */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================================ */}
        {/* USER REGISTER */}
        {/* ================================ */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================================ */}
        {/* ADMIN LOGIN */}
        {/* ================================ */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />


        {/* ================================ */}
        {/* ADMIN DASHBOARD */}
        {/* ================================ */}

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/add-admin"
          element={<AddAdmin />}
        />


        {/* ================================ */}
        {/* ADMIN ROOM MANAGEMENT */}
        {/* ================================ */}

        <Route
          path="/admin-rooms"
          element={<AdminRooms />}
        />

         <Route
          path="/bill"
          element={<Bill />}
        />

        <Route
          path="/food-menu"
          element={<FoodMenu />}
        />


      </Routes>


      {/* ================================== */}
      {/* FOOTER */}
      {/* ================================== */}

      <Footer />

    </BrowserRouter>

  );

}


export default App;