import React from 'react'
import { FaStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BlurText from '@/components/BlurText';
import BlurText1 from '@/components/BlurText1';
import BlurText2 from '@/components/BlurText2';


function Home() {
  return (
    <>
      <Header />
      <div className='bg-[url(https://media.istockphoto.com/id/1281323504/photo/underground-sci-fi-concrete-cement-background-dark-reflective-showroom-parking-white-lights.jpg?s=170667a&w=0&k=20&c=tUIfTMHTr9twvoIe9m0L5LNGD7HU0gKqBIpXy3ANKKE=)] bg-cover bg-top'>
        <div style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.6)' }} className='w-full flex justify-center items-center flex-col'>
          <div className="md:grid grid-cols-2 w-full mt-10 ">

            <div className="col-span-1 ">
              <img className='mt-8' src="public/thar.png" alt="" />
            </div>

            <div className="col-span-1 ">
              <div className="text-center md:text-left space-y-6 mt-40">
                <h2 className="text-center text-white text-8xl md:text-6xl lg:text-9xl font-extrabold ms-20 tracking-wide"><BlurText />
                </h2>

                <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold text-yellow-500 tracking-wide">
                  <BlurText2 />
                </h2>

                <p className="text-lg text-gray-600 max-w-xl ms-50">
                  <BlurText1 className='text-white' />
                </p>

                <div className="pt-4">
                  <Link
                    to="/user/input"
                    className="ms-65 inline-flex items-center justify-center px-8 py-2 text-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 rounded-xl shadow-lg"
                  >
                    Explore Vehicles
                  </Link>
                </div>
              </div>
            </div>
          </div>



          <div className="flex justify-center items-center my-30 h-[500px] md:h-[500px] sm:h-[300px] xs:h-[200px]">
            <img className="w-full max-w-[1400px] h-full object-cover" src="https://www.evmwheels.com/uploads/banner/car/1760100047.jpg" alt="CarBanner" />
          </div>


          {/* Featured vehichles */}
          <section className='md:px-40 p-4 flex flex-col justify-center items-center'>
            <h1 className="text-3xl font-bold text-white m-5">FEATURED VEHICHLES</h1>
            <hr />
            {/* books row and cols */}
            <div className="md:grid grid-cols-4 w-full ">
              {/* duplicate */}
              <div className="bg-yellow-500 text-white shadow-md rounded-xl p-4 mx-4
                hover:shadow-yellow-300 hover:-translate-y-2
                transition-all duration-300 cursor-pointer border
                hover:border-yellow-400">
                <h6 className="text-blue-600 font-bold text-center">Compact SUV</h6>
                <img width={'300px'} height={'300px'} src="https://www.evmwheels.com/uploads/inventory/MAGNITE-P-MT.png" alt="" />
                <div className="flex  flex-col mt-4">
                  <h6 className="text-red-600 font-bold">NISSAN</h6>
                  <h4 className="text-grey">MAGNITE Petrol MT</h4>
                  <div className='flex '><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /></div>
                </div>
              </div>
              {/* duplicate */}
              <div className="bg-yellow-500 text-white shadow-md rounded-xl p-4 mx-4
                hover:shadow-yellow-300 hover:-translate-y-2
                transition-all duration-300 cursor-pointer border
                hover:border-yellow-400">
                <h6 className="text-blue-600 font-bold text-center">Hatchback</h6>
                <img width={'300px'} height={'300px'} src="https://www.evmwheels.com/uploads/inventory/1728897649.png" alt="" />
                <div className="flex  flex-col mt-4">
                  <h6 className="text-blue-600 font-bold">SUZUKI</h6>
                  <h4 className="text-grey">WAGON R Petrol AT</h4>
                  <div className='flex'><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /></div>
                </div>
              </div>
              {/* duplicate */}
              <div className="bg-yellow-500 text-white shadow-md rounded-xl p-4 mx-4
                hover:shadow-yellow-300 hover:-translate-y-2
                transition-all duration-300 cursor-pointer border
                hover:border-yellow-400">
                <h6 className="text-blue-600 font-bold text-center">SUV</h6>
                <img width={'300px'} height={'300px'} src="https://www.evmwheels.com/uploads/inventory/1750739034.png" alt="" />
                <div className="flex  flex-col mt-4">
                  <h6 className="text-blue-600 font-bold">TOYOTA</h6>
                  <h4 className="text-grey">FORTUNER Diesel AT</h4>
                  <div className='flex'><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /></div>

                </div>
              </div>
              {/* duplicate */}
              <div className="bg-yellow-500 text-white shadow-md rounded-xl p-4 mx-4
                hover:shadow-yellow-300 hover:-translate-y-2
                transition-all duration-300 cursor-pointer border
                hover:border-yellow-400">
                <h6 className="text-blue-600 font-bold text-center">MUV</h6>
                <img width={'300px'} height={'300px'} src="https://www.evmwheels.com/uploads/inventory/CRYSTA-D-AT.png" alt="" />
                <div className="flex  flex-col mt-4">
                  <h6 className="text-blue-600 font-bold">TOYOTA</h6>
                  <h4 className="text-grey">INNOVA CRYSTA Diesel AT</h4>
                  <div className='flex'><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /><FaStar className='text-yellow-600' /></div>
                </div>
              </div>
            </div>

          </section>

          {/* IMAGES */}

          <section className='md:px-40 p-5 mt-2 flex flex-col justify-center items-center'>
            <h1 className="text-3xl font-bold text-white my-5">OFFERS JUST FOR YOU</h1>

            <div class="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-3
            w-full max-w-7xl h-80 mx-auto">
              <img src="/4f044b7b-088c-4ae6-867a-a794ba10d1ba.jpg" class="w-1/3 h-full object-cover snap-center flex-shrink-0 rounded-lg" />
              <img src="/41c75cdc-9a50-4d76-a58c-5a5f64b64b41.jpg" class="w-1/3 h-full object-cover snap-center flex-shrink-0 rounded-lg" />
              <img src="/4517a553-c3e4-4f30-afc8-5b04ccf4e5ec.jpg" class="w-1/3 h-full object-cover snap-center flex-shrink-0 rounded-lg" />
              <img src="/ae2e1933-802f-4603-bb53-fe87884f9be7.jpg" class="w-1/3 h-full object-cover snap-center flex-shrink-0 rounded-lg" />
            </div>
            <Link to="/user/input" className="mt-10 inline-flex items-center justify-center px-8 py-2 text-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 rounded-xl shadow-lg">Explore Offers</Link>

          </section>

          {/* author */}
          <section className='md:px-40 p-5  items-center text-white'>
            {/* author content */}
            <div className="text-center">
              <h1 className="text-2xl font-bold">What our customers say</h1>
              <p style={{ margin: "100px" }} className="text-justify">
                ⭐⭐⭐⭐⭐ Arjun S. (Chennai → Ooty Trip) <br /> <br />
                “I booked the BMW 5 Series for our weekend getaway to Ooty, and I can honestly say it exceeded all expectations! From the moment I picked up the car, everything was smooth and hassle-free. The staff walked me through the features, and the car was spotless inside and out. On the highway, the ride was powerful yet comfortable, making the long drive enjoyable for everyone. Returning the car was just as easy. The pricing was transparent with no hidden charges. Definitely my go-to rental service from now on!”</p>

              <p style={{ margin: "100px" }} className="text-justify mt-5">
                ⭐⭐⭐⭐☆ Meera P. (Family Trip to Munnar) <br /><br />
                “We rented an SUV for our family trip to Munnar — and it turned out to be a great choice! The vehicle was spacious and comfortable, even for long mountain roads. The booking process was quick, and customer support was friendly and helpful with route suggestions. The only minor issue was that the GPS system could have been more updated, but otherwise everything was fantastic. Highly recommended for family vacations!”</p>
              <br /><br /><br />
            </div>
          </section>

          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="light"
          />
        </div>

        <Footer />
      </div>


    </>
  )
}

export default Home