import commonAPI from "./commonAPI";
import serverURL from "./serverURL";

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
  try {
    const response = await commonAPI(
      "DELETE",
      `${serverURL}/deleteCar/${carId}`,
      {}
    );
    console.log("Delete API response:", response);
    return response;
  } catch (error) {
    console.error("Delete API error:", error);
    throw error;
  }
};

// ================= BOOKINGS APIs =================

// Create booking (User)
export const createBookingAPI = async (bookingData, token) => {
  return await commonAPI(
    "POST",
    `${serverURL}/create-booking`,
    bookingData,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// Get all bookings (Admin)
export const getAllBookingsAPI = async (token) => {
  return await commonAPI(
    "GET",
    `${serverURL}/admin/bookings`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// Get user bookings (User)
export const getUserBookingsAPI = async (userId, token) => {
  return await commonAPI(
    "GET",
    `${serverURL}/user/bookings/${userId}`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};



// Approve booking (Admin)
export const approveBookingAPI = async (bookingId, token) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/approve-booking/${bookingId}`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// Reject booking (Admin)
export const rejectBookingAPI = async (bookingId, token) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/reject-booking/${bookingId}`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};


// ================= ADMIN STATS =================
export const getAdminStatsAPI = async () => {
  return await commonAPI(
    "GET",
    `${serverURL}/admin/stats`,
    ""
  );
};

