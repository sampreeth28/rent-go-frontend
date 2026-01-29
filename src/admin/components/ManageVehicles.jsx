import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCarsAPI, updateCarAPI, deleteCarAPI } from '../../services/allAPI'
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa'
import AdminHeader from './AdminHeader'

function ManageVehicles() {
  const navigate = useNavigate()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const [editData, setEditData] = useState({
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

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const result = await getAllCarsAPI()
      if (result.status === 200) {
        setCars(result.data)
      } else {
        setError("Failed to fetch cars")
      }
    } catch (err) {
      console.error("Error fetching cars:", err)
      setError("Error fetching cars")
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (car) => {
    setEditingId(car._id)
    setEditData(car)
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData({
      ...editData,
      [name]: value
    })
  }

  const handleUpdateCar = async (e) => {
    e.preventDefault()

    if (!editData.name || !editData.brand || !editData.type || !editData.pricePerDay || 
        !editData.location || !editData.imageURL || !editData.about || !editData.fuelType || !editData.seats) {
      setMessage('All fields are required!')
      return
    }

    try {
      const result = await updateCarAPI(editingId, editData)
      if (result.status === 200) {
        setMessage('Car updated successfully!')
        setCars(cars.map(car => car._id === editingId ? editData : car))
        setShowForm(false)
        setEditingId(null)
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Error updating car: ' + error.message)
    }
  }

  const handleDeleteCar = async (carId) => {
    try {
      const result = await deleteCarAPI(carId)
      if (result.status === 200) {
        setMessage('Car deleted successfully!')
        setCars(cars.filter(car => car._id !== carId))
        setDeleteConfirm(null)
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Error deleting car: ' + error.message)
    }
  }

  const cancelEdit = () => {
    setShowForm(false)
    setEditingId(null)
  }

  if (loading) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading vehicles...</div>
      </div>
    )
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

      {error && (
        <div className="mx-5 mb-5 p-3 rounded bg-red-500 text-white">
          {error}
        </div>
      )}

      {/* Edit Form */}
      {showForm && (
        <div className="p-10 mx-5 mb-8 bg-gray-800 text-white rounded-lg max-w-4xl">
          <h1 className="text-center text-3xl font-bold mb-8">Edit Vehicle</h1>

          <form onSubmit={handleUpdateCar} className="px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="mb-3">
                <label className="block text-sm mb-1 font-semibold">Car Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className='p-2 bg-white w-full rounded text-black' 
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-1 font-semibold">Car Brand</label>
                <input  
                  type="text" 
                  name="brand"
                  value={editData.brand}
                  onChange={handleEditChange}
                  className='p-2 bg-white w-full rounded text-black'
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-1 font-semibold">Car Type</label>
                <select
                  name="type"
                  value={editData.type}
                  onChange={handleEditChange}
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
                <label className="block text-sm mb-1 font-semibold">Price Per Day</label>
                <input  
                  type="number" 
                  name="pricePerDay"
                  value={editData.pricePerDay}
                  onChange={handleEditChange}
                  className='p-2 bg-white w-full rounded text-black'
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-1 font-semibold">Location</label>
                <input  
                  type="text" 
                  name="location"
                  value={editData.location}
                  onChange={handleEditChange}
                  className='p-2 bg-white w-full rounded text-black'
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-1 font-semibold">Fuel Type</label>
                <input  
                  type="text" 
                  name="fuelType"
                  value={editData.fuelType}
                  onChange={handleEditChange}
                  className='p-2 bg-white w-full rounded text-black'
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-1 font-semibold">Number of Seats</label>
                <input  
                  type="number" 
                  name="seats"
                  value={editData.seats}
                  onChange={handleEditChange}
                  className='p-2 bg-white w-full rounded text-black'
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-1 font-semibold">Image URL</label>
                <input  
                  type="text" 
                  name="imageURL"
                  value={editData.imageURL}
                  onChange={handleEditChange}
                  className='p-2 bg-white w-full rounded text-black'
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1 font-semibold">About the Car</label>
              <textarea  
                name="about"
                rows={5} 
                value={editData.about}
                onChange={handleEditChange}
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
                    checked={editData.isAvailable === true}
                    onChange={() => setEditData({ ...editData, isAvailable: true })}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-white">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="isAvailable"
                    checked={editData.isAvailable === false}
                    onChange={() => setEditData({ ...editData, isAvailable: false })}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-white">Not Available</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="submit"
                className='flex-1 p-3 bg-yellow-400 hover:bg-yellow-500 rounded font-bold text-black'
              >
                Update Car
              </button>
              <button 
                type="button"
                onClick={cancelEdit}
                className='flex-1 p-3 bg-gray-500 hover:bg-gray-600 rounded font-bold text-white'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Vehicles Management */}
      <div className="p-10 mx-5 bg-gray-800 text-white rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Vehicles</h1>
          <Link 
            to="/admin/vehicles"
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded font-bold text-black transition"
          >
            + Add New Vehicle
          </Link>
        </div>

        {cars && cars.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-700">
                <tr>
                  <th className="border border-gray-600 px-4 py-3 text-left">Name</th>
                  <th className="border border-gray-600 px-4 py-3 text-left">Brand</th>
                  <th className="border border-gray-600 px-4 py-3 text-left">Type</th>
                  <th className="border border-gray-600 px-4 py-3 text-left">Price/Day</th>
                  <th className="border border-gray-600 px-4 py-3 text-left">Location</th>
                  <th className="border border-gray-600 px-4 py-3 text-left">Status</th>
                  <th className="border border-gray-600 px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id} className="border border-gray-600 hover:bg-gray-700 transition">
                    <td className="border border-gray-600 px-4 py-3">{car.name}</td>
                    <td className="border border-gray-600 px-4 py-3">{car.brand}</td>
                    <td className="border border-gray-600 px-4 py-3">{car.type}</td>
                    <td className="border border-gray-600 px-4 py-3">₹{car.pricePerDay}</td>
                    <td className="border border-gray-600 px-4 py-3">{car.location}</td>
                    <td className="border border-gray-600 px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        car.isAvailable 
                          ? 'bg-green-600 text-white' 
                          : 'bg-red-600 text-white'
                      }`}>
                        {car.isAvailable ? 'Available' : 'Not Available'}
                      </span>
                    </td>
                    <td className="border border-gray-600 px-4 py-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditClick(car)}
                          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded font-bold text-black transition flex items-center gap-2"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(car._id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-bold text-white transition flex items-center gap-2"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-xl">
            <p className="text-gray-400 mb-4">No vehicles found</p>
            <Link 
              to="/admin/vehicles"
              className="inline-block px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded font-bold text-black transition"
            >
              Add Your First Vehicle
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-sm w-full mx-5">
            <h2 className="text-2xl font-bold text-white mb-4">Delete Vehicle</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this vehicle? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => handleDeleteCar(deleteConfirm)}
                className="flex-1 p-3 bg-red-600 hover:bg-red-700 rounded font-bold text-white"
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 p-3 bg-gray-600 hover:bg-gray-700 rounded font-bold text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default ManageVehicles