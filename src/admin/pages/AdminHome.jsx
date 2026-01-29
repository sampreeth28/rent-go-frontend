import React from 'react'
import { Link } from 'react-router-dom'
import { FaCar, FaPlus, FaChartBar, FaUsers, FaCog } from 'react-icons/fa'
import AdminHeader from '../components/AdminHeader'

function AdminHome() {
  return (
    <>
    <AdminHeader/>
      <div className="relative min-h-screen">
        
        {/* Background */}
        <div
          className="
            fixed inset-0 -z-10
            bg-gradient-to-br from-gray-900 via-gray-950 to-black
            bg-cover bg-center
            md:bg-fixed
          "
        >
        </div>

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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
            
            {/* Total Vehicles */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-2">Total Vehicles</p>
                  <p className="text-4xl font-bold text-white">12</p>
                  <p className="text-blue-200 text-xs mt-2">Active listings</p>
                </div>
                <FaCar className="text-5xl text-blue-200 opacity-50" />
              </div>
            </div>

            {/* Available Cars */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold mb-2">Available Cars</p>
                  <p className="text-4xl font-bold text-white">10</p>
                  <p className="text-green-200 text-xs mt-2">Ready to book</p>
                </div>
                <FaCar className="text-5xl text-green-200 opacity-50" />
              </div>
            </div>

            {/* Bookings */}
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-semibold mb-2">Total Bookings</p>
                  <p className="text-4xl font-bold text-white">24</p>
                  <p className="text-yellow-200 text-xs mt-2">This month</p>
                </div>
                <FaChartBar className="text-5xl text-yellow-200 opacity-50" />
              </div>
            </div>

          </div>

          {/* Main Actions */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* Add Vehicle Card */}
            <Link 
              to="/admin/add"
              className="group bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-12 shadow-xl hover:shadow-2xl transition transform hover:scale-105"
            >
              <div className="text-center">
                <FaPlus className="text-6xl text-purple-200 mx-auto mb-4 group-hover:scale-110 transition" />
                <h3 className="text-3xl font-bold text-white mb-2">Add Vehicle</h3>
                <p className="text-purple-100 mb-4">Add new cars to your rental fleet</p>
                <button className="inline-block px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-100 transition">
                  Go to Vehicles
                </button>
              </div>
            </Link>

            {/* Manage Vehicles Card */}
            <Link 
              to="/manage-vehicles"
              className="group bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-2xl p-12 shadow-xl hover:shadow-2xl transition transform hover:scale-105"
            >
              <div className="text-center">
                <FaCar className="text-6xl text-cyan-200 mx-auto mb-4 group-hover:scale-110 transition" />
                <h3 className="text-3xl font-bold text-white mb-2">Manage Vehicles</h3>
                <p className="text-cyan-100 mb-4">Edit, update or delete existing vehicles</p>
                <button className="inline-block px-6 py-2 bg-white text-cyan-600 font-bold rounded-lg hover:bg-cyan-100 transition">
                  Manage Vehicle
                </button>
              </div>
            </Link>

          </div>

          {/* Features Section */}
          <div className="w-full">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-400 transition">
                <FaCar className="text-4xl text-yellow-400 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Fleet Management</h4>
                <p className="text-gray-300">Easily manage all your vehicles in one place</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-400 transition">
                <FaChartBar className="text-4xl text-yellow-400 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Analytics</h4>
                <p className="text-gray-300">Track bookings and revenue in real-time</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-400 transition">
                <FaCog className="text-4xl text-yellow-400 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Settings</h4>
                <p className="text-gray-300">Customize your admin preferences</p>
              </div>

            </div>
          </div>

        </section>
      </div>
    </>
  )
}

export default AdminHome