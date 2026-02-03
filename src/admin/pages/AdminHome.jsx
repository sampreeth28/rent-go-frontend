import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaCar,
  FaPlus,
  FaChartBar,
  FaCog,
  FaClipboardList,
} from "react-icons/fa";

import AdminHeader from "../components/AdminHeader";
import { getAdminStatsAPI } from "../../services/allAPI";

function AdminHome() {

  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    totalBookings: 0,
  });

  // ================= FETCH STATS =================
  const fetchStats = async () => {
    try {

      const res = await getAdminStatsAPI();

      if (res.status === 200) {
        setStats(res.data);
      }

    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <AdminHeader />

      <div className="relative min-h-screen">

        {/* Background */}
        <div
          className="
            fixed inset-0 -z-10
            bg-gradient-to-br from-gray-900 via-gray-950 to-black
          "
        ></div>

        {/* Content */}
        <section className="md:px-40 p-5 py-16 flex flex-col items-center bg-gray-950/80 min-h-screen">

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              Admin Dashboard
            </h1>

            <p className="text-gray-400 text-lg">
              Manage your vehicle rental fleet efficiently
            </p>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">

            {/* Total Vehicles */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 shadow-xl">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-2">
                    Total Vehicles
                  </p>

                  <p className="text-4xl font-bold text-white">
                    {stats.totalCars}
                  </p>

                  <p className="text-blue-200 text-xs mt-2">
                    Active listings
                  </p>
                </div>

                <FaCar className="text-5xl text-blue-200 opacity-50" />

              </div>
            </div>


            {/* Available Cars */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 shadow-xl">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-green-100 text-sm font-semibold mb-2">
                    Available Cars
                  </p>

                  <p className="text-4xl font-bold text-white">
                    {stats.availableCars}
                  </p>

                  <p className="text-green-200 text-xs mt-2">
                    Ready to book
                  </p>
                </div>

                <FaCar className="text-5xl text-green-200 opacity-50" />

              </div>
            </div>


            {/* Total Bookings */}
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-2xl p-8 shadow-xl">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-yellow-100 text-sm font-semibold mb-2">
                    Total Bookings
                  </p>

                  <p className="text-4xl font-bold text-white">
                    {stats.totalBookings}
                  </p>

                  <p className="text-yellow-200 text-xs mt-2">
                    All time
                  </p>
                </div>

                <FaChartBar className="text-5xl text-yellow-200 opacity-50" />

              </div>
            </div>

          </div>


          {/* ================= ACTIONS ================= */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

            {/* Add Vehicle */}
            <Link
              to="/admin/add"
              className="group bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-12 shadow-xl hover:scale-105 transition"
            >
              <div className="text-center">

                <FaPlus className="text-6xl text-purple-200 mx-auto mb-4" />

                <h3 className="text-3xl font-bold text-white mb-2">
                  Add Vehicle
                </h3>

                <p className="text-purple-100 mb-4">
                  Add new cars to fleet
                </p>

                <button className="px-6 py-2 bg-white text-purple-600 font-bold rounded-lg">
                  Go
                </button>

              </div>
            </Link>


            {/* Manage Vehicles */}
            <Link
              to="/manage-vehicles"
              className="group bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-2xl p-12 shadow-xl hover:scale-105 transition"
            >
              <div className="text-center">

                <FaCar className="text-6xl text-cyan-200 mx-auto mb-4" />

                <h3 className="text-3xl font-bold text-white mb-2">
                  Manage Vehicles
                </h3>

                <p className="text-cyan-100 mb-4">
                  Edit & delete cars
                </p>

                <button className="px-6 py-2 bg-white text-cyan-600 font-bold rounded-lg">
                  Manage
                </button>

              </div>
            </Link>


            {/* Manage Bookings */}
            <Link
              to="/manage-booking"
              className="group bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl p-12 shadow-xl hover:scale-105 transition"
            >
              <div className="text-center">

                <FaClipboardList className="text-6xl text-orange-200 mx-auto mb-4" />

                <h3 className="text-3xl font-bold text-white mb-2">
                  Manage Bookings
                </h3>

                <p className="text-orange-100 mb-4">
                  Approve / Reject requests
                </p>

                <button className="px-6 py-2 bg-white text-orange-600 font-bold rounded-lg">
                  Open
                </button>

              </div>
            </Link>

          </div>

        </section>
      </div>
    </>
  );
}

export default AdminHome;
