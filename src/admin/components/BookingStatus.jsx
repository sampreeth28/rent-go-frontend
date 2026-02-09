import React, { useEffect, useState } from "react";

import {
  getAllBookingsAPI,
  approveBookingAPI,
  rejectBookingAPI,
} from "../../services/allAPI";

import AdminHeader from "../components/AdminHeader";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCar,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaIdCard,
} from "react-icons/fa";

const BASE_URL = "http://localhost:3000";

function BookingStatus() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin token
  const token = sessionStorage.getItem("token");

  // ================= FETCH BOOKINGS =================

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await getAllBookingsAPI(token);

      if (res?.status === 200) {
        setBookings(res.data);
      }

    } catch (err) {
      console.error(err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ================= APPROVE =================

  const handleApprove = async (id) => {
    if (!window.confirm("Approve this booking?")) return;

    try {
      await approveBookingAPI(id, token);

      alert("Booking approved");
      fetchBookings();

    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  // ================= REJECT =================

const handleReject = async (id) => {

  const reason = prompt("Enter reason for rejection:");

  if (!reason) {
    alert("Rejection reason is required");
    return;
  }

  try {
    await rejectBookingAPI(id, { reason }, token);

    alert("Booking rejected");
    fetchBookings();

  } catch (err) {
    console.error(err);
    alert("Reject failed");
  }
};


  // ================= STATUS UI =================

  const getStatusUI = (status) => {

    if (status === "CONFIRMED")
      return (
        <span className="text-green-400 flex items-center gap-1">
          <FaCheckCircle /> Confirmed
        </span>
      );

    if (status === "REJECTED")
      return (
        <span className="text-red-400 flex items-center gap-1">
          <FaTimesCircle /> Rejected
        </span>
      );

    return (
      <span className="text-yellow-400 flex items-center gap-1">
        <FaClock /> Pending
      </span>
    );
  };

  // ================= UI =================

  return (
    <>
      <AdminHeader />

      <section className="min-h-screen bg-gray-950 px-6 py-10 text-white">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Manage Bookings
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400">
            Loading bookings...
          </p>
        )}

        {/* Empty */}
        {!loading && bookings.length === 0 && (
          <p className="text-center text-gray-400">
            No bookings found
          </p>
        )}

        {/* Bookings */}
        <div className="max-w-6xl mx-auto space-y-6">

          {bookings.map((booking) => (

            <div
              key={booking._id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
            >

              {/* Header */}
              <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaCar className="text-yellow-400" />
                  {booking.carId?.name || "Unknown Car"}
                </h2>

                {getStatusUI(booking.status)}

              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

                {/* USER + LICENSE */}
                <div className="flex gap-3 items-start">

                  <FaUser className="text-yellow-400 mt-1" />

                  <div className="space-y-2">

                    <div>
                      <p className="text-gray-400">User</p>
                      <p className="font-semibold">
                        {booking.userId?.username}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {booking.userId?.email}
                      </p>
                    </div>

                    {/* LICENSE IMAGE */}
                    <div>
                      <p className="text-gray-400 flex items-center gap-1 mb-1">
                        <FaIdCard /> License
                      </p>

                      {booking.userId?.licenseImage ? (
                        <img
                          src={`${BASE_URL}${booking.userId.licenseImage}`}
                          alt="License"
                          className="w-32 h-20 object-cover rounded border border-gray-600 cursor-pointer hover:scale-105 transition"
                          onClick={() =>
                            window.open(
                              `${BASE_URL}${booking.userId.licenseImage}`,
                              "_blank"
                            )
                          }
                        />
                      ) : (
                        <p className="text-red-400 text-xs">
                          No license uploaded
                        </p>
                      )}
                    </div>

                  </div>

                </div>

                {/* Dates */}
                <div className="flex gap-2 items-start">
                  <FaCalendarAlt className="text-yellow-400 mt-1" />
                  <div>
                    <p className="text-gray-400">Dates</p>
                    <p>
                      {new Date(booking.pickupDate).toLocaleDateString()} →{" "}
                      {new Date(booking.dropoffDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-2 items-start">
                  <FaMapMarkerAlt className="text-yellow-400 mt-1" />
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p>{booking.pickupLocation}</p>
                  </div>
                </div>

              </div>

              {/* Price */}
              <div className="mt-4 text-lg font-bold text-yellow-400">
                ₹{booking.totalPrice}
              </div>

              {/* Buttons */}
              {booking.status === "PENDING" && (

                <div className="mt-4 flex gap-4">

                  <button
                    onClick={() => handleApprove(booking._id)}
                    className="flex-1 bg-green-600 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(booking._id)}
                    className="flex-1 bg-red-600 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Reject
                  </button>

                </div>
              )}

            </div>
          ))}

        </div>
      </section>
    </>
  );
}

export default BookingStatus;
