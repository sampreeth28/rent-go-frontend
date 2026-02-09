import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaTimesCircle,
  FaRedo,
  FaHome,
} from "react-icons/fa";

import Header from "../components/Header";
import Footer from "@/components/Footer";

function PaymentError() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <section className="min-h-screen bg-gray-950 flex items-center justify-center px-6">

        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-700">

          {/* Icon */}
          <FaTimesCircle className="text-red-400 text-6xl mx-auto mb-4" />

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-2">
            Payment Failed!
          </h1>

          {/* Message */}
          <p className="text-gray-400 mb-6">
            Something went wrong while processing your payment.
            Please try again.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">

            <button
              onClick={() => navigate(-1)}
              className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition flex items-center justify-center gap-2"
            >
              <FaRedo />
              Try Again
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-700 text-white py-3 rounded-xl hover:bg-gray-600 transition flex items-center justify-center gap-2"
            >
              <FaHome />
              Go to Home
            </button>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default PaymentError;
