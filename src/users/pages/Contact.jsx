import React from "react";
import Header from "../components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <>
      <Header />

      <div className="min-h-screen w-full bg-gray-950 text-white p-8">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-gray-400 mt-2">
              Get to know more about Rent & Go
            </p>
          </div>

          {/* About Rent & Go */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold">About Rent & Go</h2>

            <p className="text-gray-400 leading-relaxed">
              Rent & Go is a modern vehicle rental platform built to make
              transportation simple, flexible, and affordable. We offer a
              seamless booking experience for cars and bikes, ensuring that
              customers get reliable vehicles with transparent pricing.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Whether you are planning a short city trip or a long journey,
              Rent & Go provides well-maintained vehicles, flexible rental
              durations, and easy pickup locations. Our goal is to deliver
              convenience, comfort, and trust in every ride.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="mt-1 font-semibold">support@rentgo.com</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="mt-1 font-semibold">+91 98765 43210</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Location</p>
              <p className="mt-1 font-semibold">Kochi, India</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
