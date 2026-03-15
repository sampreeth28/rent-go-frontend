import commonAPI from "./commonAPI";
import serverURL from "./serverURL";
import axios from "axios";

// ================= USER APIs =================

export const registerAPI = async (userDetails) => {
  return await commonAPI("POST", `${serverURL}/register`, userDetails);
};

export const loginAPI = async (userDetails) => {
  return await commonAPI("POST", `${serverURL}/login`, userDetails);
};

// ================= CAR APIs ==================

export const addCarAPI = async (carDetails) => {
  return await commonAPI("POST", `${serverURL}/addCar`, carDetails);
};

export const getAllCarsAPI = async () => {
  return await commonAPI("GET", `${serverURL}/getAllCars`, "");
};

export const getCarsByLocationAndDateAPI = async (
  location,
  pickupDate,
  dropoffDate
) => {
  return await commonAPI(
    "GET",
    `${serverURL}/getCarsByLocationAndDate?location=${location}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}`,
    ""
  );
};

export const getCarByIdAPI = async (carId) => {
  return await commonAPI("GET", `${serverURL}/getCarById/${carId}`, "");
};

export const updateCarAPI = async (carId, carDetails) => {
  return await commonAPI("PUT", `${serverURL}/updateCar/${carId}`, carDetails);
};

export const deleteCarAPI = async (carId) => {
  return await commonAPI(
    "DELETE",
    `${serverURL}/deleteCar/${carId}`,
    {}
  );
};

// ================= BOOKINGS APIs =================

// ✅ CREATE BOOKING
export const createBookingAPI = async (bookingData, token) => {
  return await commonAPI(
    "POST",
    `${serverURL}/api/bookings/create-booking`,
    bookingData,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// ✅ GET ALL BOOKINGS (ADMIN)
export const getAllBookingsAPI = async (token) => {
  return await commonAPI(
    "GET",
    `${serverURL}/api/bookings/all-bookings`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// ✅ GET PENDING BOOKINGS
export const getPendingBookingsAPI = async (token) => {
  return await commonAPI(
    "GET",
    `${serverURL}/api/bookings/pending-bookings`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// ✅ GET USER BOOKINGS
export const getUserBookingsAPI = async (userId, token) => {
  return await commonAPI(
    "GET",
    `${serverURL}/api/bookings/user-bookings/${userId}`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// ✅ APPROVE BOOKING
export const approveBookingAPI = async (bookingId, token) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/api/bookings/approve-booking/${bookingId}`,
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// ✅ REJECT BOOKING
export const rejectBookingAPI = async (bookingId, data, token) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/api/bookings/reject-booking/${bookingId}`,
    data,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// ✅ CANCEL BOOKING
export const cancelBookingAPI = async (bookingId) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/api/bookings/cancel-booking/${bookingId}`,
    {}
  );
};

// ================= ADMIN STATS =================

export const getAdminStatsAPI = async () => {
  return await commonAPI(
    "GET",
    `${serverURL}/api/bookings/admin-stats`,
    ""
  );
};

// ================= PAYMENT APIs =================

export const createPaymentIntentAPI = async (data) => {
  return await commonAPI(
    "POST",
    `${serverURL}/api/payment/create-payment-intent`,
    data
  );
};

export const confirmPaymentAPI = async (paymentData) => {
  return await commonAPI(
    "POST",
    `${serverURL}/api/payment/confirm-payment`,
    paymentData
  );
};

// ================= LICENSE UPLOAD =================

export const uploadLicenseAPI = (formData) => {
  return axios.post(
    `${serverURL}/upload-license`,
    formData
  );
};
