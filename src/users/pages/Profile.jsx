import React from "react";
import Header from "../components/Header";
import Footer from "@/components/Footer";

const Profile = () => {

  // ✅ SAME as Header component
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const bookings = [
    {
      car: "Tesla Model 3",
      status: "In Progress",
      pickup: "Jan 13, 2026",
      dropoff: "Jan 14, 2026",
      location: "Downtown Station",
      icon: "🕒",
      statusColor: "text-yellow-400",
    },
    {
      car: "Honda Civic",
      status: "Completed",
      pickup: null,
      dropoff: null,
      location: "Uptown Branch",
      icon: "✔️",
      statusColor: "text-green-400",
    },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen w-full bg-gray-950 text-white p-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* PROFILE */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-6">
            <div className="flex items-center space-x-4">
              <img
                src={user?.profile || "https://via.placeholder.com/80"}
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-gray-600"
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {user?.username || user?.name}
                </h2>
                <p className="text-gray-400">
                  {user?.phone}
                </p>
                <p className="text-gray-500 text-sm">
                  Logged in user
                </p>
              </div>
            </div>

            <button className="px-5 py-2 bg-blue-600 rounded hover:bg-blue-700">
              Edit
            </button>
          </div>

          {/* BOOKINGS */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Booked Vehicles</h3>
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <div key={index} className="bg-gray-800 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold">{booking.car}</h4>
                  <p className={booking.statusColor}>
                    {booking.icon} {booking.status}
                  </p>
                  {booking.pickup && <p>Pickup: {booking.pickup}</p>}
                  {booking.dropoff && <p>Dropoff: {booking.dropoff}</p>}
                  <p>📍 {booking.location}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
