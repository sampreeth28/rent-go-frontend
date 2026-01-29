import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
   <footer className="bg-gray-100 rounded-3xl mx-4 my-6 px-6 py-10">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col items-center text-center gap-6">
      <div className="text-3xl font-bold">
        <span className="">Rent</span>
        <span className="text-yellow-500">&</span>
        <span className="text-yellow-500">GO</span>
      </div>
      <nav class="flex flex-wrap justify-center gap-6 text-sm font-medium">
        <a href="#" className="hover:text-yellow-500">Home</a>
        <a href="#" className="hover:text-yellow-500">About Us</a>
        <a href="#" className="hover:text-yellow-500">Contact Us</a>
        <a href="#" className="hover:text-yellow-500">Log out</a>
      </nav>
      <div class="flex flex-col sm:flex-row gap-4 text-sm text-gray-700">
        <p><strong>Contact:</strong> +91 790 281 0000</p>
        <p><strong>Email:</strong> support@rent&go.com</p>
      </div>
      <div className="flex gap-4">
        <a className="w-10 h-10 bg-black text-yellow-500 rounded-full flex items-center justify-center hover:scale-105 transition">
          <FaFacebook/>
        </a>
        <a className="w-10 h-10 bg-black text-yellow-500 rounded-full flex items-center justify-center hover:scale-105 transition">
          <FaInstagram/>
        </a>
        <a className="w-10 h-10 bg-black text-yellow-500 rounded-full flex items-center justify-center hover:scale-105 transition">
          <FaLinkedin/>
        </a>
      </div>

    </div>
    <div className="border-t my-8"></div>
      <p className="text-center">
        Copyright © 2025 RENT&go. All rights reserved.
      </p>
  </div>
</footer>

  )
}

export default Footer