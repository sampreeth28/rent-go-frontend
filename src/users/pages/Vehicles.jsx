import React from 'react'
import { Link } from 'react-router-dom'
import Cars from './Cars'
import Header from '../components/Header'

function Vehicles() {
    return (
        <>
            <Header/>
            <section className="w-full min-h-[89vh] flex items-center justify-center bg-gray-950 px-6">
                <div className="max-w-4xl w-full bg-gray-900 rounded-3xl shadow-2xl p-10 md:p-16 text-center">
                    {/* Heading */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">Choose Your Ride</h1>
                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">Select the vehicle type that fits your journey — comfort, speed, or adventure.</p>
                    <div className="w-24 h-1 bg-yellow-500 mx-auto my-8 rounded-full"></div>
    
                    <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
                        <Link to="/vehicles/cars" className="group w-full sm:w-56 py-4 rounded-2xl border border-gray-700 bg-gray-900 hover:bg-yellow-500 transition-all duration-300 shadow-lg">
                            <h2 className="text-xl font-bold text-white group-hover:text-gray-900">🚗 Cars</h2>
                            <p className="text-sm text-gray-400 group-hover:text-gray-800 mt-1">Comfort & luxury rides</p>
                        </Link>
                        <Link to="/vehicles/bike" className="group w-full sm:w-56 py-4 rounded-2xl border border-gray-700 bg-gray-900 hover:bg-yellow-500 transition-all duration-300 shadow-lg">
                            <h2 className="text-xl font-bold text-white group-hover:text-gray-900">🏍️ Bikes</h2>
                            <p className="text-sm text-gray-400 group-hover:text-gray-800 mt-1">Fast & affordable travel</p>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Vehicles