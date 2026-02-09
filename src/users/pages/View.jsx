import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
  FaArrowLeft,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  createBookingAPI,
  getCarByIdAPI,
} from "../../services/allAPI";

import Header from "../components/Header";

function View() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================= SEARCH PARAMS =================

  const searchParams = JSON.parse(
    sessionStorage.getItem("carSearchParams")
  );

  const pickupDate = searchParams?.pickupDate;
  const dropoffDate = searchParams?.dropoffDate;
  const pickupLocation = searchParams?.pickupLocation;

  // ================= DAYS =================

  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 0;

    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);

    const diff = end - start;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const totalDays = calculateDays();

  // ================= FETCH CAR =================

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);

      const res = await getCarByIdAPI(id);

      if (res?.status === 200) {
        setCar(res.data);
      } else {
        setError("Failed to load car");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ================= BOOKING =================

  const handleConfirmBooking = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!pickupDate || !dropoffDate) {
      alert("Please select dates");
      return;
    }

    const totalPrice = car.pricePerDay * totalDays;

    const bookingData = {
      userId: user._id, // ✅ IMPORTANT
      carId: id,
      pickupDate,
      dropoffDate,
      pickupLocation,
      totalPrice,
    };

    console.log("Booking Data:", bookingData);

    try {
      const res = await createBookingAPI(bookingData);

      if (res.status === 201) {
        alert("Booking request sent! Wait for admin approval.");

        // ✅ FIXED ROUTE
        navigate("/user-profile");
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  // ================= UI STATES =================

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-300 text-xl">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>

          <Link
            to="/vehicle"
            className="bg-yellow-400 px-5 py-2 rounded-lg text-black font-semibold"
          >
            <FaArrowLeft /> Back
          </Link>
        </div>
      </section>
    );
  }

  if (!car) return null;

  const totalPrice = car.pricePerDay * totalDays;

  // ================= MAIN UI =================

  return (
    <>
      <Header />

      <section className="min-h-screen bg-gray-950 px-6 py-10 text-white">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* IMAGE */}
          <div className="bg-gray-800 rounded-2xl p-6 flex justify-center items-center shadow-xl">
            <img
              src={car.imageURL}
              alt={car.name}
              className="max-w-md w-full object-contain rounded-xl"
            />
          </div>

          {/* DETAILS */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">

            <h1 className="text-3xl font-bold">{car.name}</h1>

            <p className="text-gray-400 mt-1">
              {car.fuelType} • {car.type} • {car.seats} Seats
            </p>

            {/* Rating */}
            <div className="flex gap-1 mt-3">
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-gray-400">(4.0 / 5)</span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-sm text-gray-400">Price / Day</p>

              <h2 className="text-3xl text-yellow-400 font-bold">
                ₹{car.pricePerDay}
                <span className="text-base text-gray-400"> / day</span>
              </h2>
            </div>

            {/* Dates + Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

              <div className="bg-gray-700 p-4 rounded-xl flex gap-3">
                <FaCalendarAlt className="text-yellow-400" />

                <div>
                  <p className="text-gray-400 text-sm">Dates</p>
                  <p className="font-semibold">
                    {pickupDate} → {dropoffDate}
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-xl flex gap-3">
                <FaMapMarkerAlt className="text-yellow-400" />

                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="font-semibold">
                    {pickupLocation || car.location}
                  </p>
                </div>
              </div>

            </div>

            {/* Total */}
            <div className="mt-4 bg-gray-700 p-4 rounded-xl flex gap-3">

              <FaMoneyBillWave className="text-yellow-400 text-2xl" />

              <div>
                <p className="text-gray-400 text-sm">
                  Total ({totalDays} days)
                </p>

                <p className="text-yellow-400 text-2xl font-bold">
                  ₹{totalPrice}
                </p>
              </div>

            </div>

            {/* Availability */}
            <div
              className={`mt-4 p-3 rounded-xl ${
                car.isAvailable
                  ? "bg-green-900 text-green-300"
                  : "bg-red-900 text-red-300"
              }`}
            >
              {car.isAvailable
                ? "✓ Available"
                : "✗ Not Available"}
            </div>

            {/* About */}
            <p className="mt-4 text-gray-300 leading-relaxed">
              {car.about}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">

              <button
                onClick={handleConfirmBooking}
                disabled={!car.isAvailable || totalDays === 0}
                className="flex-1 bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-300 disabled:bg-gray-600 transition"
              >
                Book Now
              </button>

              <button
                onClick={() => navigate("/vehicles/cars")}
                className="flex-1 border border-gray-600 text-gray-300 py-3 rounded-xl hover:bg-gray-700 transition"
              >
                Back
              </button>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default View;
