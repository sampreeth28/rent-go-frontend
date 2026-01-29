import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

// User APIs
export const registerAPI = async (userDetails) => {
  return await commonAPI("POST", `${serverURL}/register`, userDetails)
}

export const loginAPI = async (userDetails) => {
  return await commonAPI("POST", `${serverURL}/login`, userDetails)
}

// Car APIs
export const addCarAPI = async (carDetails) => {
  return await commonAPI("POST", `${serverURL}/addCar`, carDetails)
}

export const getAllCarsAPI = async () => {
  return await commonAPI("GET", `${serverURL}/getAllCars`, "")
}

// NEW: Get cars by location and date range
export const getCarsByLocationAndDateAPI = async (location, pickupDate, dropoffDate) => {
  return await commonAPI("GET", `${serverURL}/getCarsByLocationAndDate?location=${location}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}`, "")
}

export const getCarByIdAPI = async (carId) => {
  return await commonAPI("GET", `${serverURL}/getCarById/${carId}`, "")
}

export const updateCarAPI = async (carId, carDetails) => {
  return await commonAPI("PUT", `${serverURL}/updateCar/${carId}`, carDetails)
}

export const deleteCarAPI = async (carId) => {
  try {
    const response = await commonAPI("DELETE", `${serverURL}/deleteCar/${carId}`, {})
    console.log("Delete API response:", response)
    return response
  } catch (error) {
    console.error("Delete API error:", error)
    throw error
  }
}

// NEW: Add booking to a car
export const addBookingAPI = async (carId, bookingDetails) => {
  return await commonAPI("POST", `${serverURL}/addBooking/${carId}`, bookingDetails)
}