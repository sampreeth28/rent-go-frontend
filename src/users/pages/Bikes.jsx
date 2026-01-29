import React from 'react'
import { FaBars, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Bikes() {
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
          {/* <div className="absolute inset-0 bg-black/50"></div> */}
        </div>

        {/* SCROLLABLE CONTENT */}
        <section className="md:px-40 p-5 py-10 flex flex-col items-center bg-gray-950">
          <h1 className="text-4xl font-bold text-white mb-5">
            Bikes For You
          </h1>

          <div className="md:grid grid-cols-4 w-full mt-10 ">

            <div className="col-span-1 ">
              {/* filter-title */}
              <div style={{ marginLeft: "-60px" }} className='border p-5 rounded-2xl w-65'>
                <div className="flex justify-between ">
                  <h1 className="text-2xl font-semibold text-white">Filter</h1>
                  <button className="text-2xl md:hidden "><FaBars /></button>
                </div>
                {/* filter option */}
                <div className={"md:block hidden"}>
                  {/* category 1 */}
                  <div className="mt-3">
                    <input type="checkbox" name="filter" id="all" />
                    <label htmlFor="all" className='ms-3 text-white'>All</label>
                  </div>
                  {/* category 1 */}
                  <div className="mt-3">
                    <input type="checkbox" name="filter" id="all" />
                    <label htmlFor="all" className='ms-3 text-white'>Adventure</label>
                  </div>
                  {/* category 1 */}
                  <div className="mt-3">
                    <input type="checkbox" name="filter" id="all" />
                    <label htmlFor="all" className='ms-3 text-white'>Sports</label>
                  </div>
                  {/* category 1 */}
                  <div className="mt-3">
                    <input type="checkbox" name="filter" id="all" />
                    <label htmlFor="all" className='ms-3 text-white'>Electric</label>
                  </div>
                  {/* category 1 */}
                  <div className="mt-3">
                    <input type="checkbox" name="filter" id="all" />
                    <label htmlFor="all" className='ms-3 text-white'>Gearless</label>
                  </div>
                  {/* category 1 */}
                  <div className="mt-3">
                    <input type="checkbox" name="filter" id="all" />
                    <label htmlFor="all" className='ms-3 text-white'>Commuter</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <div className="md:grid grid-cols-3 mt-5 md:mt-0">
                {/* duplicate */}
                <div className="bg-white shadow-md rounded-xl p-4 mx-4 mt-5
                                      hover:shadow-yellow-300 hover:-translate-y-2
                                      transition-all duration-300 cursor-pointer border
                                      hover:border-yellow-400 mt-2">
                  {/* <h6 className="text-blue-600 font-bold text-center">Compact SUV</h6> */}
                  <img width={'300px'} height={'300px'} src="https://www.evmwheels.com/uploads/inventory/HIMALAYAN-P-MT.png" alt="" />
                  <div className="flex  flex-col mt-4">
                    <h6 className="text-blue-600 font-bold">ROYAL ENFIELD</h6>
                    <h4 className="text-grey">HIMALAYAN 410</h4>
                    <h4>₹2,911</h4>
                    <div className='flex'><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /></div>
                  </div>
                    <div className='flex justify-center items-center'><Link to="/view/bike" className="flex-1 text-center px-6 py-3 rounded-xl bg-yellow-400 m-2 text-black font-semibold hover:bg-yellow-300 transition">Book Now</Link></div>

                </div>
                {/* duplicate */}
                <div className="bg-white shadow-md rounded-xl p-4 mx-4 mt-5
                                      hover:shadow-yellow-300 hover:-translate-y-2
                                      transition-all duration-300 cursor-pointer border
                                      hover:border-yellow-400">
                  {/* <h6 className="text-blue-600 font-bold text-center">Compact SUV</h6> */}
                  <img width={'300px'} height={'300px'} src="https://www.evmwheels.com/uploads/inventory/1753513737.png" alt="" />
                  <div className="flex  flex-col mt-4">
                    <h6 className="text-blue-600 font-bold">BMW</h6>
                    <h4 className="text-grey">F900 GS</h4>
                    <h4>₹2,500</h4>
                    <div className='flex'><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /></div>
                  </div>
                    <div className='flex justify-center items-center'><Link to="/view/bike" className="flex-1 text-center px-6 py-3 rounded-xl bg-yellow-400 m-2 text-black font-semibold hover:bg-yellow-300 transition">Book Now</Link></div>

                </div>
                {/* duplicate */}
                <div className="bg-white shadow-md rounded-xl p-4 mx-4 mt-5
                                      hover:shadow-yellow-300 hover:-translate-y-2
                                      transition-all duration-300 cursor-pointer border
                                      hover:border-yellow-400">
                  {/* <h6 className="text-blue-600 font-bold text-center">SUV</h6> */}
                  <img width={'300px'} height={'300px'} src="https://www.evmwheels.com/uploads/inventory/1732601218.png" alt="" />
                  <div className="flex  flex-col mt-4">
                    <h6 className="text-blue-600 font-bold">HERO</h6>
                    <h4 className="text-grey">SPLENDOR PLUS</h4>
                    <h4>₹4,000</h4>
                    <div className='flex'><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /></div>

                  </div>
                    <div className='flex justify-center items-center'><Link to="/view/bike" className="flex-1 text-center px-6 py-3 rounded-xl bg-yellow-400 m-2 text-black font-semibold hover:bg-yellow-300 transition">Book Now</Link></div>

                </div>
                {/* duplicate */}
                <div className="bg-white shadow-md rounded-xl p-4 mx-4 mt-5
                                      hover:shadow-yellow-300 hover:-translate-y-2
                                      transition-all duration-300 cursor-pointer border
                                      hover:border-yellow-400">
                  {/* <h6 className="text-blue-600 font-bold text-center">SUV</h6> */}
                  <img width={'300px'} height={'300px'} src="https://www.evmwheels.com/uploads/inventory/1732605076.png" alt="" />
                  <div className="flex  flex-col mt-4">
                    <h6 className="text-blue-600 font-bold">HERO</h6>
                    <h4 className="text-grey">X PULSE 4V</h4>
                    <h4>₹4,000</h4>
                    <div className='flex'><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /></div>

                  </div>
                    <div className='flex justify-center items-center'><Link to="/view/bike" className="flex-1 text-center px-6 py-3 rounded-xl bg-yellow-400 m-2 text-black font-semibold hover:bg-yellow-300 transition">Book Now</Link></div>


                </div>
                <div className="bg-white shadow-md rounded-xl p-4 mx-4 mt-5
                                      hover:shadow-yellow-300 hover:-translate-y-2
                                      transition-all duration-300 cursor-pointer border
                                      hover:border-yellow-400">
                  {/* <h6 className="text-blue-600 font-bold text-center">SUV</h6> */}
                  <img width={'300px'} height={'300px'} src="https://www.evmwheels.com/uploads/inventory/1732605076.png" alt="" />
                  <div className="flex  flex-col mt-4">
                    <h6 className="text-blue-600 font-bold">HERO</h6>
                    <h4 className="text-grey">X PULSE 4V</h4>
                    <h4>₹4,000</h4>
                    <div className='flex'><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /></div>

                  </div>
                    <div className='flex justify-center items-center'><Link to="/view/bike" className="flex-1 text-center px-6 py-3 rounded-xl bg-yellow-400 m-2 text-black font-semibold hover:bg-yellow-300 transition">Book Now</Link></div>


                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Bikes