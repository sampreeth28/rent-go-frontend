import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCarAPI } from '../../services/allAPI'
import { FaArrowLeft } from 'react-icons/fa'
import AdminHeader from './AdminHeader'

function AddVehicle() {
  const navigate = useNavigate()
  
  const [carData, setCarData] = useState({
    name: '',
    brand: '',
    type: '',
    pricePerDay: '',
    location: '',
    imageURL: '',
    about: '',
    fuelType: '',
    seats: '',
    isAvailable: true
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setCarData({
      ...carData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!carData.name || !carData.brand || !carData.type || !carData.pricePerDay || 
        !carData.location || !carData.imageURL || !carData.about || !carData.fuelType || !carData.seats) {
      setMessage('All fields are required!')
      return
    }

    setLoading(true)
    try {
      const result = await addCarAPI(carData)
      if (result.status === 201) {
        setMessage('Car added successfully!')
        resetForm()
        setTimeout(() => {
          navigate('/manage-vehicles')
        }, 2000)
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    }
    setLoading(false)
  }

  const resetForm = () => {
    setCarData({
      name: '',
      brand: '',
      type: '',
      pricePerDay: '',
      location: '',
      imageURL: '',
      about: '',
      fuelType: '',
      seats: '',
      isAvailable: true
    })
  }

  return (
    <>
    <AdminHeader/>
    <div className="bg-gray-950 min-h-screen py-5">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/admin/home')}
        className="mx-5 mb-5 flex items-center gap-2 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded font-bold text-white transition"
      >
        <FaArrowLeft /> Back to Home
      </button>

      {/* Message */}
      {message && (
        <div className={`mx-5 mb-5 p-3 rounded ${message.includes('successfully') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {message}
        </div>
      )}

      {/* Add Vehicle Form */}
      <div className="p-10 mx-5 bg-gray-800 text-white rounded-lg max-w-4xl mx-auto">
        <h1 className="text-center text-4xl font-bold mb-8">Add New Vehicle</h1>

        <form onSubmit={handleSubmit} className="px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="mb-3">
              <label className="block text-sm mb-1 font-semibold">Car Name</label>
              <input 
                type="text" 
                name="name"
                placeholder='Car Name' 
                value={carData.name}
                onChange={handleChange}
                className='p-2 bg-white w-full rounded text-black' 
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1 font-semibold">Car Brand</label>
              <input  
                type="text" 
                name="brand"
                placeholder='Car Brand' 
                value={carData.brand}
                onChange={handleChange}
                className='p-2 bg-white w-full rounded text-black'
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1 font-semibold">Car Type</label>
              <select
                name="type"
                value={carData.type}
                onChange={handleChange}
                className='p-2 bg-white w-full rounded text-black'
              >
                <option value="">Select Car Type</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
                <option value="Compact SUV">Compact SUV</option>
                <option value="SUV">SUV</option>
                <option value="MUV">MUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Compact EV">Compact EV</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1 font-semibold">Price Per Day (₹)</label>
              <input  
                type="number" 
                name="pricePerDay"
                placeholder='Price Per Day' 
                value={carData.pricePerDay}
                onChange={handleChange}
                className='p-2 bg-white w-full rounded text-black'
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1 font-semibold">Location</label>
              <input  
                type="text" 
                name="location"
                placeholder='Location' 
                value={carData.location}
                onChange={handleChange}
                className='p-2 bg-white w-full rounded text-black'
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1 font-semibold">Fuel Type</label>
              <input  
                type="text" 
                name="fuelType"
                placeholder='e.g., Petrol, Diesel, Electric' 
                value={carData.fuelType}
                onChange={handleChange}
                className='p-2 bg-white w-full rounded text-black'
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1 font-semibold">Number of Seats</label>
              <input  
                type="number" 
                name="seats"
                placeholder='Number of Seats' 
                value={carData.seats}
                onChange={handleChange}
                className='p-2 bg-white w-full rounded text-black'
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1 font-semibold">Image URL</label>
              <input  
                type="text" 
                name="imageURL"
                placeholder='Image URL' 
                value={carData.imageURL}
                onChange={handleChange}
                className='p-2 bg-white w-full rounded text-black'
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm mb-1 font-semibold">About the Car</label>
            <textarea  
              name="about"
              rows={5} 
              placeholder='Describe the car features and specifications' 
              value={carData.about}
              onChange={handleChange}
              className='p-2 bg-white w-full rounded text-black'
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm mb-3 font-semibold">Availability Status</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="isAvailable"
                  checked={carData.isAvailable === true}
                  onChange={() => setCarData({ ...carData, isAvailable: true })}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-white">Available</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="isAvailable"
                  checked={carData.isAvailable === false}
                  onChange={() => setCarData({ ...carData, isAvailable: false })}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-white">Not Available</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              type="submit"
              disabled={loading}
              className='flex-1 p-3 bg-yellow-400 hover:bg-yellow-500 rounded font-bold text-black disabled:bg-gray-500 text-lg'
            >
              {loading ? 'Adding Car...' : 'Add Car'}
            </button>
            <button 
              type="button"
              onClick={() => navigate('/manage-vehicles')}
              className='flex-1 p-3 bg-gray-500 hover:bg-gray-600 rounded font-bold text-white text-lg'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddVehicle