import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminRooms() {

  // =====================================
  // FORM DATA
  // =====================================

  const [formData, setFormData] = useState({

    room_number: "",
    room_type: "",
    price: "",
    capacity: "",
    image: "",
    description: "",
    status: "Available"

  });


  // =====================================
  // ROOM LIST
  // =====================================

  const [rooms, setRooms] = useState([]);


  // =====================================
  // VALIDATION ERRORS
  // =====================================

  const [errors, setErrors] = useState({});


  // =====================================
  // EDITING STATE
  // =====================================

  const [editingId, setEditingId] = useState(null);


  // =====================================
  // LOADING STATE
  // =====================================

  const [loading, setLoading] = useState(false);


  // =====================================
  // GET ROOMS
  // =====================================

  const getRooms = async () => {

    try {

      const response = await axios.get(
        "http://localhost/hotel-booking-management/backend/room/getRooms.php"
      );


      if (response.data.success) {

        setRooms(response.data.rooms);

      }
      else {

        alert(response.data.message);

      }

    }
    catch (error) {

      console.log("Get Rooms Error:", error);

      alert("Unable to fetch rooms.");

    }

  };


  // =====================================
  // LOAD ROOMS
  // =====================================

  useEffect(() => {

    getRooms();

  }, []);


  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({

      ...formData,

      [name]: value

    });

  };


  // =====================================
  // VALIDATION
  // =====================================

  const validateForm = () => {

    const newErrors = {};


    if (formData.room_number.trim() === "") {

      newErrors.room_number =
        "Room number is required";

    }


    if (formData.room_type.trim() === "") {

      newErrors.room_type =
        "Please select room type";

    }


    if (formData.price === "") {

      newErrors.price =
        "Price is required";

    }
    else if (
      isNaN(formData.price) ||
      Number(formData.price) <= 0
    ) {

      newErrors.price =
        "Enter a valid price";

    }


    if (formData.capacity === "") {

      newErrors.capacity =
        "Capacity is required";

    }
    else if (
      isNaN(formData.capacity) ||
      Number(formData.capacity) <= 0
    ) {

      newErrors.capacity =
        "Enter a valid capacity";

    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };


  // =====================================
  // ADD / UPDATE ROOM
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!validateForm()) {

      return;

    }


    setLoading(true);


    try {

      let url = "";


      // UPDATE

      if (editingId !== null) {

        url =
          "http://localhost/hotel-booking-management/backend/room/updateRoom.php";

      }

      // CREATE

      else {

        url =
          "http://localhost/hotel-booking-management/backend/room/addRoom.php";

      }


      const dataToSend = {

        ...formData

      };


      // Add ID for update

      if (editingId !== null) {

        dataToSend.id = editingId;

      }


      const response = await axios.post(
        url,
        dataToSend
      );


      alert(response.data.message);


      if (response.data.success) {

        resetForm();

        getRooms();

      }

    }
    catch (error) {

      console.log("Save Room Error:", error);

      alert("Unable to save room.");

    }
    finally {

      setLoading(false);

    }

  };


  // =====================================
  // EDIT ROOM
  // =====================================

  const editRoom = (room) => {

    setEditingId(room.id);


    setFormData({

      room_number: room.room_number,
      room_type: room.room_type,
      price: room.price,
      capacity: room.capacity,
      image: room.image || "",
      description: room.description || "",
      status: room.status

    });


    setErrors({});


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };


  // =====================================
  // DELETE ROOM
  // =====================================

  const deleteRoom = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );


    if (!confirmDelete) {

      return;

    }


    try {

      const response = await axios.post(

        "http://localhost/hotel-booking-management/backend/room/deleteRoom.php",

        {
          id: id
        }

      );


      alert(response.data.message);


      if (response.data.success) {

        getRooms();

      }

    }
    catch (error) {

      console.log("Delete Room Error:", error);

      alert("Unable to delete room.");

    }

  };


  // =====================================
  // RESET FORM
  // =====================================

  const resetForm = () => {

    setFormData({

      room_number: "",
      room_type: "",
      price: "",
      capacity: "",
      image: "",
      description: "",
      status: "Available"

    });


    setEditingId(null);

    setErrors({});

  };


  // =====================================
  // PAGE
  // =====================================

  return (

    <section className="py-4">

      <div className="container">


        {/* ================================= */}
        {/* PAGE TITLE */}
        {/* ================================= */}

        <div className="mb-4">

          <h2 className="fw-bold">
            Room Management
          </h2>

          <p className="text-muted">
            Add, view, edit and delete hotel rooms.
          </p>

        </div>


        {/* ================================= */}
        {/* ROOM FORM */}
        {/* ================================= */}

        <div className="card shadow-sm mb-4">

          <div className="card-body">

            <h4 className="mb-4">

              {editingId !== null
                ? "Edit Room"
                : "Add New Room"
              }

            </h4>


            <form onSubmit={handleSubmit}>


              {/* ROOM NUMBER */}

              <div className="mb-3">

                <label className="form-label">
                  Room Number
                </label>

                <input
                  type="text"
                  name="room_number"
                  className="form-control"
                  value={formData.room_number}
                  onChange={handleChange}
                  placeholder="Example: 101"
                />

                {errors.room_number && (

                  <small className="text-danger">

                    {errors.room_number}

                  </small>

                )}

              </div>


              {/* ROOM TYPE */}

              <div className="mb-3">

                <label className="form-label">
                  Room Type
                </label>

                <select
                  name="room_type"
                  className="form-select"
                  value={formData.room_type}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Room Type
                  </option>

                  <option value="Standard Room">
                    Standard Room
                  </option>

                  <option value="Deluxe Room">
                    Deluxe Room
                  </option>

                  <option value="Luxury Suite">
                    Luxury Suite
                  </option>

                </select>

                {errors.room_type && (

                  <small className="text-danger">

                    {errors.room_type}

                  </small>

                )}

              </div>


              {/* PRICE */}

              <div className="mb-3">

                <label className="form-label">
                  Price Per Night
                </label>

                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Example: 2500"
                  min="1"
                />

                {errors.price && (

                  <small className="text-danger">

                    {errors.price}

                  </small>

                )}

              </div>


              {/* CAPACITY */}

              <div className="mb-3">

                <label className="form-label">
                  Guest Capacity
                </label>

                <input
                  type="number"
                  name="capacity"
                  className="form-control"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Example: 2"
                  min="1"
                />

                {errors.capacity && (

                  <small className="text-danger">

                    {errors.capacity}

                  </small>

                )}

              </div>


              {/* IMAGE */}

              <div className="mb-3">

                <label className="form-label">
                  Image File Name
                </label>

                <input
                  type="text"
                  name="image"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Example: standard.jpg"
                />

              </div>


              {/* DESCRIPTION */}

              <div className="mb-3">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter room description"
                ></textarea>

              </div>


              {/* STATUS */}

              <div className="mb-3">

                <label className="form-label">
                  Status
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="Available">
                    Available
                  </option>

                  <option value="Unavailable">
                    Unavailable
                  </option>

                </select>

              </div>


              {/* BUTTONS */}

              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={loading}
              >

                {loading

                  ? "Saving..."

                  : editingId !== null
                    ? "Update Room"
                    : "Add Room"

                }

              </button>


              {editingId !== null && (

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >

                  Cancel

                </button>

              )}

            </form>

          </div>

        </div>


        {/* ================================= */}
        {/* ROOM LIST */}
        {/* ================================= */}

        <div className="card shadow-sm">

          <div className="card-body">


            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">

              <h4 className="mb-0">
                Room List
              </h4>


              <span className="badge bg-primary fs-6">

                Total Rooms: {rooms.length}

              </span>

            </div>


            {rooms.length === 0 ? (

              <div className="alert alert-info">

                No rooms available.

              </div>

            ) : (

              <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">

                  <thead className="table-dark">

                    <tr>

                      <th>ID</th>

                      <th>Room No.</th>

                      <th>Room Type</th>

                      <th>Price</th>

                      <th>Capacity</th>

                      <th>Image</th>

                      <th>Status</th>

                      <th>Description</th>

                      <th>Actions</th>

                    </tr>

                  </thead>


                  <tbody>

                    {rooms.map((room) => (

                      <tr key={room.id}>


                        <td>
                          {room.id}
                        </td>


                        <td>
                          {room.room_number}
                        </td>


                        <td>
                          {room.room_type}
                        </td>


                        <td>
                          ₹{room.price}
                        </td>


                        <td>
                          {room.capacity}
                        </td>


                        <td>

                          {room.image
                            ? room.image
                            : "No image"
                          }

                        </td>


                        <td>

                          {room.status === "Available" ? (

                            <span className="badge bg-success">

                              Available

                            </span>

                          ) : (

                            <span className="badge bg-danger">

                              Unavailable

                            </span>

                          )}

                        </td>


                        <td>

                          {room.description
                            ? room.description
                            : "-"
                          }

                        </td>


                        <td>

                          <div className="d-flex flex-column gap-2">

                            <button
                              type="button"
                              className="btn btn-warning btn-sm"
                              onClick={() =>
                                editRoom(room)
                              }
                            >

                              Edit

                            </button>


                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteRoom(room.id)
                              }
                            >

                              Delete

                            </button>

                          </div>

                        </td>


                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>

    </section>

  );

}

export default AdminRooms;