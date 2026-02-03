import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getUserBookingsAPI } from "../../services/allAPI";

import {
  FaCar,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "@/components/Footer";

function Profile() {

  // Get logged-in user
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH USER BOOKINGS =================
  const fetchBookings = async () => {
    try {

      if (!user?._id) return;

      setLoading(true);

      const res = await getUserBookingsAPI(user._id);

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

  return (
    <>
      <Header/>

      <section className="min-h-screen bg-gray-950 px-6 py-10 text-white">

        <div className="max-w-5xl mx-auto space-y-8">

          {/* ================= PROFILE ================= */}
          
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">

            <div className="flex items-center gap-4">

              {/* User Icon */}
              <FaUserCircle className="text-yellow-400 text-4xl" />

              {/* User Info */}
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {user?.username || "User"}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {user?.email || "No email"}
                </p>
              </div>

            </div>

          </div>

          {/* ================= BOOKINGS ================= */}
          <div>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaCar className="text-yellow-400" />
              My Bookings
            </h2>


            {/* Loading */}
            {loading && (
              <p className="text-gray-400 text-center">
                Loading bookings...
              </p>
            )}


            {/* Empty */}
            {!loading && bookings.length === 0 && (
              <p className="text-gray-400 text-center">
                No bookings found
              </p>
            )}


            {/* Booking List */}
            <div className="space-y-5">

              {bookings.map((booking) => (

                <div
                  key={booking._id}
                  className="bg-gray-800 p-5 rounded-xl border border-gray-700"
                >

                  {/* Header */}
                  <div className="flex justify-between mb-3">

                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <FaCar className="text-yellow-400" />
                      {booking.carId?.name}
                    </h3>

                    {getStatusUI(booking.status)}

                  </div>


                  {/* Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">

                    {/* Dates */}
                    <div className="flex gap-2">
                      <FaCalendarAlt className="text-yellow-400" />
                      <span>
                        {new Date(booking.pickupDate).toLocaleDateString()} →
                        {" "}
                        {new Date(booking.dropoffDate).toLocaleDateString()}
                      </span>
                    </div>


                    {/* Location */}
                    <div className="flex gap-2">
                      <FaMapMarkerAlt className="text-yellow-400" />
                      <span>
                        {booking.pickupLocation}
                      </span>
                    </div>


                    {/* Price */}
                    <div className="font-bold text-yellow-400">
                      ₹{booking.totalPrice}
                    </div>

                  </div>


                  {/* ================= STATUS NOTE ================= */}
                  <div className="mt-4 p-3 rounded-lg text-sm font-medium">

                    {booking.status === "PENDING" && (
                      <p className="text-yellow-400 bg-yellow-900/30 border border-yellow-700 rounded-md p-2">
                        ⏳ Please wait until admin approves your booking.
                      </p>
                    )}

                    {booking.status === "CONFIRMED" && (
                      <p className="text-green-400 bg-green-900/30 border border-green-700 rounded-md p-2">
                        ✅ Your booking has been confirmed. Pick up from the location at your selected time.
                      </p>
                    )}

                    {booking.status === "REJECTED" && (
                      <p className="text-red-400 bg-red-900/30 border border-red-700 rounded-md p-2">
                        ❌ Your booking was rejected. Please try another car.
                      </p>
                    )}

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      <Footer/>
    </>
  );
}

export default Profile;
