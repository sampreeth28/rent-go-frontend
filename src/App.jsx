import { Route, Routes } from 'react-router-dom'
import './App.css'
import Preloader from './components/Preloader'
import Authentication from './pages/Authentication'
import Home from './users/pages/Home'
import Vehicles from './users/pages/Vehicles'
import Contact from './users/pages/Contact'
import Profile from './users/pages/Profile'
import { useState } from 'react'
import Cars from './users/pages/Cars'
import Bikes from './users/pages/Bikes'
import Input from './users/pages/Input'
import ViewBike from './users/pages/ViewBike'
import AddVehichle from './admin/components/AddVehichle'
import AdminProfile from './admin/pages/AdminProfile'
import AdminHome from './admin/pages/AdminHome'
import View from './users/pages/View'
import ManageVehicles from './admin/components/ManageVehicles'


function App() {

  const[loading,setLoading]=useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 7000);

  return (
    <>
      <Routes>
      <Route path="/" element={loading?<Preloader/>:<Home/>} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication insideRegister={true} />} />

      <Route path="/vehicle" element={<Vehicles />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/view/:id" element={<View />} />
      <Route path="/view/bike" element={<ViewBike />} />
      <Route path="/user/profile" element={< Profile />} />
      <Route path="/user-profile" element={< Profile />} />
      <Route path="/user/input" element={< Input />} />
      <Route path="/vehicles/bike" element={< Bikes />} />
      <Route path="/vehicles/cars" element={< Cars />} />

      <Route path="/admin/add" element={< AddVehichle />} />
      <Route path="/admin/Profile" element={< AdminProfile />} />
      <Route path="/admin/home" element={< AdminHome />} />
      <Route path="/manage-vehicles" element={<ManageVehicles />} />
    </Routes>
    </>
  )
}

export default App
