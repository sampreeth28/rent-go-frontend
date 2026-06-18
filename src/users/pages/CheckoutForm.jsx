import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { serverURL } from "../../services/serverURL";

const CheckoutForm = ({ carId, totalPrice, bookingDetails, car }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const user = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe is not loaded');
      return;
    }

    if (!email || !name || !phone) {
      setError('Please fill all contact details');
      return;
    }

    if (!userId) {
      setError('User not logged in');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Processing payment...');
      console.log('Amount:', totalPrice);
      console.log('Currency: INR');

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setError('Card element not found');
        return;
      }

      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: name,
          email: email,
          phone: phone,
        },
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        return;
      }

      console.log('Payment method created:', paymentMethod.id);

      const totalDays = Math.ceil(
        (new Date(bookingDetails.dropoffDate) - new Date(bookingDetails.pickupDate)) / 
        (1000 * 60 * 60 * 24)
      );

      const bookingData = {
        userId: userId,
        carId: carId,
        pickupLocation: bookingDetails.pickupLocation,
        pickupDate: new Date(bookingDetails.pickupDate),
        dropoffDate: new Date(bookingDetails.dropoffDate),
        totalDays: totalDays,
        totalPrice: totalPrice,
        paymentId: paymentMethod.id,
        paymentStatus: 'completed',
        userDetails: {
          name: name,
          email: email,
          phone: phone,
        },
        carDetails: {
          name: car.name,
          brand: car.brand,
          pricePerDay: car.pricePerDay,
        },
        status: 'PENDING',
      };

      console.log('Booking Data:', bookingData);

      const response = await fetch(`${serverURL}/api/bookings/create-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        const errorMessage = responseData.message || responseData.error || 'Booking creation failed';
        throw new Error(errorMessage);
      }

      const bookingResult = responseData;
      console.log('Booking created successfully:', bookingResult);

      navigate('/payment-success', {
        state: {
          bookingId: bookingResult.booking?._id,
          paymentId: paymentMethod.id,
          totalPrice: totalPrice,
          carName: car.name,
        },
      });

    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      
      navigate('/payment-failure', {
        state: {
          errorMessage: err.message || 'Payment processing failed',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // FIX: Better CardElement styling
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: '"Segoe UI", "Roboto", sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true, // Hide postal/zip code
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-900 border border-red-700 rounded-lg text-red-200">
          <p className="font-semibold">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Contact Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Contact Details</h3>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 9876543210"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            disabled={loading}
          />
        </div>
      </div>

      {/* Card Element - FIXED */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Card Details</h3>
        
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg min-h-[50px]">
          {stripe && elements ? (
            <CardElement options={cardElementOptions} />
          ) : (
            <p className="text-gray-400">Loading card element...</p>
          )}
        </div>

        <p className="text-xs text-gray-400">
          Your card details are secure and encrypted. We never store your full card information.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-lg font-semibold text-black text-lg transition ${
          loading
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-yellow-400 hover:bg-yellow-300'
        }`}
      >
        {loading ? 'Processing Payment...' : `Pay ₹${totalPrice}`}
      </button>

      {/* Security Info */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Secure payment powered by Stripe</span>
      </div>
    </form>
  );
};

export default CheckoutForm;