import Footer from '@/components/Footer'
import Header from '@/users/components/Header'
import React, { useEffect, useState } from 'react'
import AddVehichle from '../components/AddVehichle'
import BookingStatus from '../components/BookingStatus'
import AdminHeader from '../components/AdminHeader'

function AdminProfile() {

  const [tab,setTab] = useState(1)

  const [dp,setDp] = useState("")
  const [username,setUsername] = useState("")
  console.log(dp);
  console.log(username);
  
   useEffect(()=>{
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      const user =JSON.parse(sessionStorage.getItem("user"))
      setUsername(user?.username)
      setDp(user?.picture)

    }
   },[])
  
  
  return (
    <>
    <AdminHeader/>
    {/* profile image */}
    <div style={{height:"1200px"}} className='bg-gray-800 text-white'>
        <div style={{width:"230px",height:"230px",borderRadius:"50%",marginLeft:"70px",marginTop:"130px"}} className='bg-white p-3'>
          <img style={{width:"200px",height:"200px",borderRadius:"50%"}} src={dp?dp.startsWith("https://lh3.googleusercontent.com/")?dp : `${serverURL}/uploads/${dp}`:"https://static.vecteezy.com/system/resources/previews/036/594/092/original/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" }alt="Logo" />
        </div>
        {/* name with edit block */}
        <div className="flex justify-between items-center px-10 my-5 ">
          <h1 className="text-2xl font-bold flex items-center mx-5 md:mx-20">username</h1>
              </div>
        <p className="text-justify md:px-30 px-5 my-5">Welcome to your personalized bookstore profile! Here, you can update your account information, revisit the books you’ve read, and explore recommendations tailored to your interests. Whether you're discovering new titles, managing your wishlist, or keeping track of your recent purchases, this space helps you stay connected to the stories and authors you love.</p>
        {/* tabs with contents */}
        <div className="md:px-40">
          <div className="flex justify-center items-center my-8 font-medium text-lg">
            <p onClick={()=>setTab(1)} className={tab==1?"text-blue-300 border-gray-200 rounded border-t border-l border-r p-4 cursor-pointer":"border-gray-200 border-b text-white p-4 cursor-pointer"}>Add Cars</p>
            <p onClick={()=>setTab(2)} className={tab==2?"text-blue-300 border-gray-200 rounded border-t border-l border-r p-4 cursor-pointer":"border-gray-200 border-b text-white p-4 cursor-pointer"}>Booking Status</p>
            {/* <p onClick={()=>setTab(3)} className={tab==3?"text-blue-600 border-gray-200 rounded border-t border-l border-r p-4 cursor-pointer":"border-gray-200 border-b  p-4 cursor-pointer"}>Purchase History</p> */}
          </div>
          {/* contents */}
          {
            tab==1 &&
            <AddVehichle/>
          }
          {
            tab==2 &&
            <BookingStatus/>
          }
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default AdminProfile