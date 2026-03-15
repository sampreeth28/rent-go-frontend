import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaUpload,
  FaCar,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrash,
} from "react-icons/fa";

import {
  getUserBookingsAPI,
  uploadLicenseAPI,
  cancelBookingAPI,
} from "../../services/allAPI";

import Header from "../components/Header";
import Footer from "@/components/Footer";

const BASE_URL = "http://localhost:3000";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [licenseFile, setLicenseFile] = useState(null);
  const [licenseImage, setLicenseImage] = useState(
    user?.licenseImage || ""
  );

  const isUploaded = !!licenseImage;

  // ================= FETCH BOOKINGS =================
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

  // ================= UPLOAD LICENSE =================
  const handleFileChange = (e) => {
    setLicenseFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!licenseFile) {
      alert("Please select an image first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("license", licenseFile);
      formData.append("userId", user._id);

      const res = await uploadLicenseAPI(formData);

      const imagePath = res.data.image;

      setLicenseImage(imagePath);

      const updatedUser = {
        ...user,
        licenseImage: imagePath,
      };

      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      alert("License uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // ================= CANCEL BOOKING =================
  const handleCancel = async (booking) => {
    const confirmCancel = window.confirm(
      "Do you want to cancel your booking?"
    );

    if (!confirmCancel) return;

    try {
      const res = await cancelBookingAPI(booking._id);

      if (res.status === 200) {
        alert("Booking cancelled successfully");
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Cancel failed");
    }
  };

  // ================= STATUS BADGE =================
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

    if (status === "CANCELLED")
      return (
        <span className="text-gray-400 flex items-center gap-1">
          <FaTimesCircle /> Cancelled
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
      <Header />

      <section className="min-h-screen bg-gray-950 px-6 py-10 text-white">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* ================= PROFILE ================= */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center flex-wrap gap-4">

              {/* LEFT SIDE USER INFO */}
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-yellow-400 text-5xl" />
                <div>
                  <h2 className="text-2xl font-bold">
                    {user?.username}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE LICENSE SECTION */}
              <div className="flex flex-col items-end gap-2">

                {!isUploaded ? (
                  <>
                    <p className="text-sm text-gray-400 font-semibold">
                      Upload your driving licence
                    </p>

                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="licenseUpload"
                      />

                      <label
                        htmlFor="licenseUpload"
                        className="cursor-pointer bg-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600"
                      >
                        <FaUpload />
                        Choose File
                      </label>

                      <button
                        onClick={handleUpload}
                        className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-300"
                      >
                        Upload
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-green-400 font-semibold">
                      Driving Licence Uploaded ✓
                    </p>

                    <img
                      src={`${BASE_URL}${licenseImage}`}
                      alt="Driving License"
                      className="w-48 rounded-lg border border-gray-600 shadow-md"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ================= BOOKINGS ================= */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaCar className="text-yellow-400" />
              My Bookings
            </h2>

            {loading && (
              <p className="text-gray-400 text-center">
                Loading bookings...
              </p>
            )}

            {!loading && bookings.length === 0 && (
              <p className="text-gray-400 text-center">
                No bookings found
              </p>
            )}

            <div className="space-y-5">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-gray-800 p-5 rounded-xl border border-gray-700"
                >
                  <div className="flex justify-between mb-3">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <FaCar className="text-yellow-400" />
                      {booking.carId?.name}
                    </h3>
                    {getStatusUI(booking.status)}
                  </div>

                  {/* INFO */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                    <div className="flex gap-2">
                      <FaCalendarAlt className="text-yellow-400" />
                      <span>
                        {new Date(booking.pickupDate).toLocaleDateString()} →
                        {new Date(booking.dropoffDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <FaMapMarkerAlt className="text-yellow-400" />
                      <span>{booking.pickupLocation}</span>
                    </div>

                    <div className="font-bold text-yellow-400">
                      ₹{booking.totalPrice}
                    </div>
                  </div>

                  {/* STATUS NOTE */}
                  <div className="mt-4 space-y-2">

                    {booking.status === "PENDING" && (
                      <div className="text-yellow-400 bg-yellow-900/30 border border-yellow-700 rounded-md p-2 text-sm">
                        ⏳ Your booking request is waiting for admin approval.
                      </div>
                    )}

                    {booking.status === "CONFIRMED" && (
                      <div className="text-green-400 bg-green-900/30 border border-green-700 rounded-md p-2 text-sm">
                        ✅ Booking approved! Please collect the car on time.
                      </div>
                    )}

                    {booking.status === "REJECTED" && (
                      <div className="text-red-400 bg-red-900/30 border border-red-700 rounded-md p-2 text-sm">
                        ❌ Booking rejected by admin.
                        {booking.rejectReason && (
                          <div className="text-red-300 text-xs mt-1">
                            Reason: {booking.rejectReason}
                          </div>
                        )}
                      </div>
                    )}

                    {booking.status === "CANCELLED" && (
                      <div className="text-gray-400 bg-gray-900/30 border border-gray-700 rounded-md p-2 text-sm">
                        ⚠️ Booking cancelled by you.
                        <div className="text-xs mt-1">
                          For refund contact manager. Only 80% refundable.
                        </div>
                      </div>
                    )}

                  </div>

                  {/* CANCEL BUTTON */}
                  {(booking.status === "PENDING" ||
                    booking.status === "CONFIRMED") && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleCancel(booking)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white flex items-center gap-2"
                      >
                        <FaTrash />
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;
