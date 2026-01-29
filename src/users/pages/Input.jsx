import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Input() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickupLocation: "",
    pickupDate: "",
    dropoffLocation: "",
    dropoffDate: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = "Pickup location is required";
    }

    if (!formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation = "Dropoff location is required";
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = "Pickup date is required";
    }

    if (!formData.dropoffDate) {
      newErrors.dropoffDate = "Dropoff date is required";
    }

    if (formData.pickupDate && formData.dropoffDate) {
      const pickup = new Date(formData.pickupDate);
      const dropoff = new Date(formData.dropoffDate);

      if (pickup >= dropoff) {
        newErrors.dropoffDate =
          "Dropoff date must be after pickup date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle button click
  const handleChooseVehicles = () => {
    if (!validateForm()) {
      alert("Please fill all required fields correctly ");
      return;
    }

    const searchParams = {
      pickupLocation: formData.pickupLocation,
      pickupDate: formData.pickupDate,
      dropoffLocation: formData.dropoffLocation,
      dropoffDate: formData.dropoffDate,
    };

    // Store data for Cars.jsx
    sessionStorage.setItem(
      "carSearchParams",
      JSON.stringify(searchParams)
    );

    navigate("/vehicles/cars", { state: { searchParams } });
  };

  return (
    <>
      <Header />

      <section className="w-full min-h-[89vh] flex items-center justify-center bg-gray-950 px-6">
        <div className="max-w-4xl w-full bg-gray-900 rounded-3xl shadow-2xl p-10 md:p-16 text-center">

          <h2 className="text-2xl font-bold mb-6 text-white">
            Book Your Ride
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">

            {/* Pick-Up Section */}
            <div className="border border-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">
                Pick-Up Details
              </h3>

              <label className="block text-sm mb-2">
                Pick-Up Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                placeholder="Enter city or location"
                className={`w-full mb-1 px-4 py-3 rounded-lg bg-gray-800 border ${
                  errors.pickupLocation
                    ? "border-red-500"
                    : "border-gray-700"
                }`}
              />
              {errors.pickupLocation && (
                <p className="text-red-500 text-xs mb-3">
                  {errors.pickupLocation}
                </p>
              )}

              <label className="block text-sm mb-2">
                Pick-Up Date
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                  errors.pickupDate
                    ? "border-red-500"
                    : "border-gray-700"
                }`}
              />
              {errors.pickupDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.pickupDate}
                </p>
              )}
            </div>

            {/* Drop-Off Section */}
            <div className="border border-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">
                Drop-Off Details
              </h3>

              <label className="block text-sm mb-2">
                Drop-Off Location
              </label>
              <input
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                placeholder="Enter drop location"
                className={`w-full mb-1 px-4 py-3 rounded-lg bg-gray-800 border ${
                  errors.dropoffLocation
                    ? "border-red-500"
                    : "border-gray-700"
                }`}
              />
              {errors.dropoffLocation && (
                <p className="text-red-500 text-xs mb-3">
                  {errors.dropoffLocation}
                </p>
              )}

              <label className="block text-sm mb-2">
                Drop-Off Date
              </label>
              <input
                type="date"
                name="dropoffDate"
                value={formData.dropoffDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                  errors.dropoffDate
                    ? "border-red-500"
                    : "border-gray-700"
                }`}
              />
              {errors.dropoffDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dropoffDate}
                </p>
              )}
            </div>
          </form>

          {/* CTA Button */}
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={handleChooseVehicles}
              className="px-10 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
            >
              Choose Vehicles
            </button>
          </div>

        </div>
      </section>
    </>
  );
}

export default Input;
