import React from "react";
import { FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function ViewBike() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center justify-center">
          <img
            src="https://www.evmwheels.com/uploads/inventory/HIMALAYAN-P-MT.png"
            alt="Car"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* RIGHT : DETAILS */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800">Himalayan</h1>

          {/* RATING */}
          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
            <span className="ml-2 text-sm text-gray-600">(4.9 / 5)</span>
          </div>

          {/* PRICE */}
          <div className="mt-6">
            <p className="text-sm text-gray-500">Rental Price</p>
            <h2 className="text-4xl font-extrabold text-yellow-500">
              ₹2,500 <span className="text-base font-medium text-gray-600">/ day</span>
            </h2>
          </div>

          {/* INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
              <FaClock className="text-yellow-500" />
              <div>
                <p className="text-sm text-gray-500">Available Timing</p>
                <p className="font-semibold">9:00 AM – 9:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
              <FaMapMarkerAlt className="text-yellow-500" />
              <div>
                <p className="text-sm text-gray-500">Pickup Location</p>
                <p className="font-semibold">Chennai, TN</p>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-6 text-gray-600 leading-relaxed">
            
          </p>

          {/* CTA */}
          <div className="mt-10 flex gap-4">
            <Link
              to="/booking/confirm"
              className="flex-1 text-center px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
            >
              Confirm Booking
            </Link>

            <Link
              to="/vehicle"
              className="flex-1 text-center px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Back to Vehicles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewBike;
