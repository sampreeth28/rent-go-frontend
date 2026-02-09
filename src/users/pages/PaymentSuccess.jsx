import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCheckCircle,
  FaCar,
  FaHome,
  FaUser,
} from "react-icons/fa";

import Header from "../components/Header";
import Footer from "@/components/Footer";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <section className="min-h-screen bg-gray-950 flex items-center justify-center px-6 text-white">

        <div className="bg-gray-800 max-w-lg w-full rounded-2xl shadow-2xl p-8 text-center border border-gray-700">

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-400 text-7xl" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-3 text-green-400">
            Payment Successful!
          </h1>

          {/* Message */}
          <p className="text-gray-300 mb-6 leading-relaxed">
            Thank you for your payment. Your booking request has been
            submitted successfully and is waiting for admin approval.
          </p>

          {/* Info Box */}
          <div className="bg-gray-700 rounded-xl p-4 mb-6 text-sm text-gray-300">
            <p className="mb-1">
              ✅ Status: <span className="text-yellow-400">Pending Approval</span>
            </p>
            <p>
              📩 You will be notified once the admin confirms your booking.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">

            {/* Go to Profile */}
            <button
              onClick={() => navigate("/user-profile")}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <FaUser />
              My Profile
            </button>

            {/* Go to Vehicles */}
            <button
              onClick={() => navigate("/vehicles/cars")}
              className="flex-1 border border-gray-600 hover:bg-gray-700 text-gray-300 py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <FaCar />
              Book Another Car
            </button>

          </div>

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="mt-5 text-sm text-gray-400 hover:text-yellow-400 flex items-center justify-center gap-2 mx-auto transition"
          >
            <FaHome />
            Back to Home
          </button>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default PaymentSuccess;
