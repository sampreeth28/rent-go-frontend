import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from '../components/Header';
import CheckoutForm from '../pages/CheckoutForm';
import { getCarByIdAPI } from '../../services/allAPI';

const stripePromise = loadStripe('pk_test_51SkJDGIltPTJT4nU23UMJ7C4O1mBJ7aOQeyodcNy14iQjtyAqQBJDvQBz9moxkmkmWbvSLuvAMDLtokIO3sKLQ5d001omJDYSj');
function Payment() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get booking details from sessionStorage
  const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails')) || {};
  const { pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = bookingDetails;

  useEffect(() => {
    fetchCarDetails();
  }, [carId]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const result = await getCarByIdAPI(carId);
      if (result.status === 200) {
        setCar(result.data);
      } else {
        setError('Failed to load car details');
      }
    } catch (err) {
      console.error('Error fetching car:', err);
      setError('Error loading car details');
    } finally {
      setLoading(false);
    }
  };

  // Calculate rental days
  const calculateDays = () => {
    if (pickupDate && dropoffDate) {
      const pickup = new Date(pickupDate);
      const dropoff = new Date(dropoffDate);
      const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
      return Math.max(days, 1);
    }
    return 0;
  };

  const rentalDays = calculateDays();
  const totalPrice = car ? (car.pricePerDay * rentalDays) : 0;

  if (loading) {
    return (
      <>
        <Header />
        <div className="w-full min-h-[89vh] flex items-center justify-center bg-gray-950">
          <div className="text-white text-2xl">Loading car details...</div>
        </div>
      </>
    );
  }

  if (error || !car) {
    return (
      <>
        <Header />
        <div className="w-full min-h-[89vh] flex items-center justify-center bg-gray-950 px-6">
          <div className="max-w-md w-full bg-gray-900 rounded-xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-white mb-6">{error || 'Car details not found'}</p>
            <button
              onClick={() => navigate('/vehicles')}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
            >
              Back to Cars
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full min-h-[89vh] bg-gray-950 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-10 text-center">Complete Your Booking</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left: Booking Summary */}
            <div className="bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Booking Summary</h2>

              {/* Car Details */}
              <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={car.imageURL}
                    alt={car.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{car.brand.toUpperCase()}</h3>
                    <p className="text-gray-400">{car.name}</p>
                    <p className="text-yellow-400 font-semibold">₹{car.pricePerDay}/day</p>
                  </div>
                </div>
              </div>

              {/* Rental Details */}
              <div className="mb-6 pb-6 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Rental Details</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Pick-up Location:</span>
                    <span className="text-white font-semibold">{pickupLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pick-up Date:</span>
                    <span className="text-white font-semibold">{new Date(pickupDate).toLocaleDateString()}</span>
                  </div>
                  {pickupTime && (
                    <div className="flex justify-between">
                      <span>Pick-up Time:</span>
                      <span className="text-white font-semibold">{pickupTime}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Drop-off Date:</span>
                    <span className="text-white font-semibold">{new Date(dropoffDate).toLocaleDateString()}</span>
                  </div>
                  {dropoffTime && (
                    <div className="flex justify-between">
                      <span>Drop-off Time:</span>
                      <span className="text-white font-semibold">{dropoffTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Daily Rate:</span>
                  <span>₹{car.pricePerDay}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Number of Days:</span>
                  <span>{rentalDays}</span>
                </div>
                <div className="border-t border-gray-600 pt-3 flex justify-between text-xl font-bold text-yellow-400">
                  <span>Total Amount:</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-900 border border-blue-700 rounded-lg">
                <p className="text-blue-200 text-sm">
                  <strong>Note:</strong> After successful payment, your booking request will be sent to the admin for approval.
                </p>
              </div>
            </div>

            {/* Right: Payment Form */}
            <div className="bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Information</h2>
              
              {stripePromise && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    mode: 'payment',
                    amount: Math.round(totalPrice * 100),
                    currency: 'usd',
                  }}
                >
                  <CheckoutForm
                    carId={carId}
                    totalPrice={totalPrice}
                    bookingDetails={bookingDetails}
                    car={car}
                  />
                </Elements>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;