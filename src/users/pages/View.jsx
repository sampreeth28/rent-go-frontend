import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
  FaArrowLeft,
  FaMoneyBillWave
} from "react-icons/fa";
import { getCarByIdAPI } from "../../services/allAPI";
import Header from "../components/Header";

function View() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Get user search data
  const searchParams = JSON.parse(
    sessionStorage.getItem("carSearchParams")
  );

  const pickupDate = searchParams?.pickupDate;
  const dropoffDate = searchParams?.dropoffDate;
  const pickupLocation = searchParams?.pickupLocation;

  // ✅ Calculate number of days
  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 0;

    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);

    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const totalDays = calculateDays();

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const result = await getCarByIdAPI(id);

      if (result?.status === 200) {
        setCar(result.data);
      } else {
        setError("Failed to fetch car details");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching car details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-xl text-gray-300">Loading car details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-2xl text-red-400 mb-6">{error}</p>
          <Link
            to="/vehicle"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
          >
            <FaArrowLeft /> Back to Vehicles
          </Link>
        </div>
      </section>
    );
  }

  if (!car) return null;

  const totalPrice = car.pricePerDay * totalDays;

  return (
    <>
    <Header/>
<section className="min-h-screen bg-gray-950 px-6 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* IMAGE */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 flex items-center justify-center">
          <img
            src={car.imageURL}
            alt={car.name}
            className="w-full max-w-md object-contain rounded-xl"
          />
        </div>

        {/* DETAILS */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 text-white">

          <h1 className="text-3xl font-bold">{car.name}</h1>
          <p className="text-gray-400 mt-1">
            {car.fuelType} • {car.type} • {car.seats} Seats
          </p>

          {/* RATING */}
          <div className="flex items-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-gray-400">(4.0 / 5)</span>
          </div>

          {/* PRICE */}
          <div className="mt-2">
            <p className="text-sm text-gray-400">Price per Day</p>
            <h2 className="text-3xl font-extrabold text-yellow-400">
              ₹{car.pricePerDay}
              <span className="text-base font-medium text-gray-400"> / day</span>
            </h2>
          </div>

          {/* USER INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">

            {/* DATES */}
            <div className="flex items-center gap-3 bg-gray-700 p-4 rounded-xl">
              <FaCalendarAlt className="text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Rental Dates</p>
                <p className="font-semibold">
                  {pickupDate} → {dropoffDate}
                </p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-3 bg-gray-700 p-4 rounded-xl">
              <FaMapMarkerAlt className="text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Pickup Location</p>
                <p className="font-semibold">
                  {pickupLocation || car.location}
                </p>
              </div>
            </div>
          </div>

          {/* TOTAL PRICE */}
          <div className="mt-3 p-5 rounded-xl bg-gray-700 flex items-center gap-4">
            <FaMoneyBillWave className="text-yellow-400 text-2xl" />
            <div>
              <p className="text-sm text-gray-400">
                Total Price ({totalDays} day{totalDays > 1 ? "s" : ""})
              </p>
              <p className="text-2xl font-bold text-yellow-400">
                ₹{totalPrice}
              </p>
            </div>
          </div>

          {/* AVAILABILITY */}
          <div
            className={`mt-3 p-4 rounded-xl ${
              car.isAvailable
                ? "bg-green-900 text-green-300"
                : "bg-red-900 text-red-300"
            }`}
          >
            {car.isAvailable
              ? "✓ Available for Selected Dates"
              : "✗ Not Available"}
          </div>

          {/* DESCRIPTION */}
          <p className="mt-3 text-gray-300 leading-relaxed">
            {car.about}
          </p>

          {/* CTA */}
          <div className="mt-2 flex flex-col sm:flex-row gap-4">
            <button
              disabled={!car.isAvailable || totalDays === 0}
              className="flex-1 px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 disabled:bg-gray-600 transition"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => navigate("/vehicles/cars")}
              className="flex-1 px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
            >
              Back to Vehicles
            </button>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}

export default View;
