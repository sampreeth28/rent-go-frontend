import React, { useState, useEffect } from 'react'
import { FaBars, FaStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { getAllCarsAPI, getCarsByLocationAndDateAPI } from '../../services/allAPI';

function Cars() {
  const location = useLocation();
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useState({
    pickupLocation: "",
    pickupDate: "",
    dropoffLocation: "",
    dropoffDate: ""
  })
  const [selectedFilters, setSelectedFilters] = useState({
    all: false,
    hatchback: false,
    sedan: false,
    compactSUV: false,
    suv: false,
    muv: false,
    luxury: false,
    compactEV: false
  })

  const carTypes = {
    all: 'All',
    hatchback: 'Hatchback',
    sedan: 'Sedan',
    compactSUV: 'Compact SUV',
    suv: 'SUV',
    muv: 'MUV',
    luxury: 'Luxury',
    compactEV: 'Compact EV'
  }

  useEffect(() => {
    // Get search params from sessionStorage or route state
    const storedParams = sessionStorage.getItem("carSearchParams");
    const stateParams = location.state?.searchParams;

    if (storedParams) {
      const params = JSON.parse(storedParams);
      setSearchParams(params);
      fetchCarsByLocationAndDate(params);
    } else if (stateParams) {
      setSearchParams(stateParams);
      fetchCarsByLocationAndDate(stateParams);
    } else {
      // Fallback: fetch all cars if no search params
      fetchCars();
    }
  }, [])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const result = await getAllCarsAPI()
      console.log("All cars fetched:", result)
      
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

  const fetchCarsByLocationAndDate = async (params) => {
    try {
      setLoading(true)
      const result = await getCarsByLocationAndDateAPI(
        params.pickupLocation,
        params.pickupDate,
        params.dropoffDate
      )
      console.log("Cars fetched by location and date:", result)
      
      if (result.status === 200) {
        setCars(result.data)
        if (result.data.length === 0) {
          setError("No cars available for the selected location and dates")
        }
      } else {
        setError("Failed to fetch cars")
      }
    } catch (err) {
      console.error("Error fetching cars:", err)
      setError(err.response?.data?.message || "Error fetching cars")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filterType) => {
    if (filterType === 'all') {
      // If "All" is clicked, toggle all filters
      const newState = !selectedFilters.all
      setSelectedFilters({
        all: newState,
        hatchback: newState,
        sedan: newState,
        compactSUV: newState,
        suv: newState,
        muv: newState,
        luxury: newState,
        compactEV: newState
      })
    } else {
      // Toggle individual filter
      setSelectedFilters({
        ...selectedFilters,
        [filterType]: !selectedFilters[filterType]
      })
    }
  }

  // Filter cars based on selected filters
  const getFilteredCars = () => {
    let filtered = cars.filter(car => car.isAvailable === true)

    // Check if any filter is selected
    const anyFilterSelected = Object.entries(selectedFilters)
      .some(([key, value]) => key !== 'all' && value === true)

    if (!anyFilterSelected) {
      return filtered
    }

    // Filter by selected car types
    filtered = filtered.filter(car => {
      if (selectedFilters.hatchback && car.type === 'Hatchback') return true
      if (selectedFilters.sedan && car.type === 'Sedan') return true
      if (selectedFilters.compactSUV && car.type === 'Compact SUV') return true
      if (selectedFilters.suv && car.type === 'SUV') return true
      if (selectedFilters.muv && car.type === 'MUV') return true
      if (selectedFilters.luxury && car.type === 'Luxury') return true
      if (selectedFilters.compactEV && car.type === 'Compact EV') return true
      return false
    })

    return filtered
  }



  const filteredCars = getFilteredCars()

  return (
    <>
      <Header />
      <div className="relative min-h-screen">
        
        {/* FIXED BACKGROUND ONLY */}
        <div
          className="
            fixed inset-0 -z-10
            bg-white
            bg-cover bg-center
            md:bg-fixed
          "
        >
        </div>

        {/* SCROLLABLE CONTENT */}
        <section className="md:px-40 p-5 py-10 flex flex-col items-center bg-gray-950">
          <h1 className="text-4xl font-bold text-white mb-5">
            Cars For You
          </h1>

          {/* Display search criteria if available */}
          {searchParams.pickupLocation && (
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg p-4 mb-6 border border-yellow-400">
              <p className="text-white text-sm">
                <span className="font-semibold">Searching for:</span> {searchParams.pickupLocation} 
                {' '}({new Date(searchParams.pickupDate).toLocaleDateString()} - {new Date(searchParams.dropoffDate).toLocaleDateString()})
              </p>
              <Link
                to="/user/input"
                className="mt-2 inline-block text-xs px-3 py-1 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
              >
                New Search
              </Link>
            </div>
          )}
          
          {/* Loading state */}
          {loading && (
            <div className="text-white text-xl">Loading cars...</div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-red-500 text-xl text-center max-w-2xl">{error}</div>
          )}

          {/* Cars grid */}
          {!loading && !error && (
            <div className="md:grid grid-cols-4 w-full mt-10">

              <div className="col-span-1">
                {/* filter-title */}
                <div style={{ marginLeft: "-60px" }} className='border p-5 rounded-2xl w-65 bg-gray-800'>
                  <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold text-white">Filter</h1>
                    <button className="text-2xl md:hidden"><FaBars /></button>
                  </div>
                  {/* filter option */}
                  <div className={"md:block hidden"}>
                    {/* All */}
                    <div className="mt-3">
                      <input 
                        type="checkbox" 
                        name="filter" 
                        id="all"
                        checked={selectedFilters.all}
                        onChange={() => handleFilterChange('all')}
                        className="cursor-pointer"
                      />
                      <label htmlFor="all" className='ms-3 text-white cursor-pointer'>All</label>
                    </div>

                    {/* Hatchback */}
                    <div className="mt-3">
                      <input 
                        type="checkbox" 
                        name="filter" 
                        id="hatchback"
                        checked={selectedFilters.hatchback}
                        onChange={() => handleFilterChange('hatchback')}
                        className="cursor-pointer"
                      />
                      <label htmlFor="hatchback" className='ms-3 text-white cursor-pointer'>Hatchback</label>
                    </div>

                    {/* Sedan */}
                    <div className="mt-3">
                      <input 
                        type="checkbox" 
                        name="filter" 
                        id="sedan"
                        checked={selectedFilters.sedan}
                        onChange={() => handleFilterChange('sedan')}
                        className="cursor-pointer"
                      />
                      <label htmlFor="sedan" className='ms-3 text-white cursor-pointer'>Sedan</label>
                    </div>

                    {/* Compact SUV */}
                    <div className="mt-3">
                      <input 
                        type="checkbox" 
                        name="filter" 
                        id="compactSUV"
                        checked={selectedFilters.compactSUV}
                        onChange={() => handleFilterChange('compactSUV')}
                        className="cursor-pointer"
                      />
                      <label htmlFor="compactSUV" className='ms-3 text-white cursor-pointer'>Compact SUV</label>
                    </div>

                    {/* SUV */}
                    <div className="mt-3">
                      <input 
                        type="checkbox" 
                        name="filter" 
                        id="suv"
                        checked={selectedFilters.suv}
                        onChange={() => handleFilterChange('suv')}
                        className="cursor-pointer"
                      />
                      <label htmlFor="suv" className='ms-3 text-white cursor-pointer'>SUV</label>
                    </div>

                    {/* MUV */}
                    <div className="mt-3">
                      <input 
                        type="checkbox" 
                        name="filter" 
                        id="muv"
                        checked={selectedFilters.muv}
                        onChange={() => handleFilterChange('muv')}
                        className="cursor-pointer"
                      />
                      <label htmlFor="muv" className='ms-3 text-white cursor-pointer'>MUV</label>
                    </div>

                    {/* Luxury */}
                    <div className="mt-3">
                      <input 
                        type="checkbox" 
                        name="filter" 
                        id="luxury"
                        checked={selectedFilters.luxury}
                        onChange={() => handleFilterChange('luxury')}
                        className="cursor-pointer"
                      />
                      <label htmlFor="luxury" className='ms-3 text-white cursor-pointer'>Luxury</label>
                    </div>

                    {/* Compact EV */}
                    <div className="mt-3">
                      <input 
                        type="checkbox" 
                        name="filter" 
                        id="compactEV"
                        checked={selectedFilters.compactEV}
                        onChange={() => handleFilterChange('compactEV')}
                        className="cursor-pointer"
                      />
                      <label htmlFor="compactEV" className='ms-3 text-white cursor-pointer'>Compact EV</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <div className="md:grid grid-cols-3 mt-5 md:mt-0">
                  
                  {/* Display filtered cars from database */}
                  {filteredCars && filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                      <div className='mb-5' key={car._id}>
                        <div className="bg-white shadow-md rounded-xl overflow-hidden mx-4 mt-5
                          hover:shadow-yellow-300 hover:-translate-y-2
                          transition-all duration-300 cursor-pointer border
                          hover:border-yellow-400 flex flex-col h-full ">
                          
                          <h6 className="text-blue-600 font-bold text-center pt-3">{car.type}</h6>
                          
                          {/* Fixed Image Container */}
                          <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-100">
                            <img 
                              src={car.imageURL} 
                              alt={car.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/300x200?text=No+Image"
                              }}
                            />
                          </div>
                          
                          {/* Content Container */}
                          <div className="flex flex-col flex-grow p-4">
                            <h6 className="text-blue-600 font-bold">{car.brand.toUpperCase()}</h6>
                            <h4 className="text-grey text-sm">{car.name}</h4>
                            <h4 className="font-bold text-lg mt-1">₹{car.pricePerDay}/day</h4>
                            
                            {/* Location Display */}
                            <div className="flex items-center mt-2 text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span className="font-semibold">{car.location}</span>
                            </div>
                            
                            <div className='flex mt-3'>
                              <FaStar className='text-yellow-600 text-sm'/>
                              <FaStar className='text-yellow-600 text-sm'/>
                              <FaStar className='text-yellow-600 text-sm'/>
                              <FaStar className='text-yellow-600 text-sm'/>
                            </div>
  
                            <hr className='mt-3 my-2' />
                            
                            <div className='flex justify-between my-2 text-xs'>
                              <p>{car.fuelType}</p>
                              <p>{car.seats} Seats</p>
                            </div>
                            
                            <hr className='mb-3' />
                            
                            {/* Push button to bottom */}
                            <div className='flex justify-center items-center mt-auto'>
                              <Link 
                                to={`/view/${car._id}`} 
                                className="flex-1 text-center px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition text-sm"
                              >
                                Book Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 text-white text-center text-xl">
                      No cars match your filter
                    </div>
                  )}

                </div>
              </div>

            </div>
          )}

        </section>
      </div>
    </>
  )
}

export default Cars