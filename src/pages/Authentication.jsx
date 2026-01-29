import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { loginAPI, registerAPI } from '../services/allAPI';




function Authentication({insideRegister}) {

  const navigate = useNavigate()

  const[viewPassword,setViewPassword]=useState(false)
  // store data from form
  const [ userDetails,setUserDetails]=useState({
    username:"",email:"",password:""
  })
  console.log(userDetails);


  
  const handleRegister = async (e) => {
  e.preventDefault();
  console.log("REGISTER BUTTON CLICKED");

  const { username, email, password } = userDetails;

  if (!username || !email || !password) {
    alert("Please fill the form completely");
    return;
  }

  try {
    const result = await registerAPI(userDetails);

    // SUCCESS
    if (result.status === 200 || result.status === 201) {
      alert("Registered successfully. Please login.");
      setUserDetails({ username: "", email: "", password: "" });
      navigate("/login");
    }

  } catch (error) {

    // 🔥 THIS IS WHERE 409 / 500 COMES
    if (error.response) {
      if (error.response.status === 409) {
        alert(error.response.data); // User already exists
      } else {
        alert("Server error. Try again later.");
      }
    } else {
      alert("Network error. Check backend server.");
    }

    console.error(error);
  }
};


  const handleLogin = async (e)=>{
    e.preventDefault()
    const{email,password}=userDetails
    if(email && password){
      // toast.success("login Successfully") //api call
      try {
      //  api call
      const result = await loginAPI(userDetails)
      console.log(result);
      if(result.status==200){
        alert("login Successfully")
        sessionStorage.setItem("token",result.data.token)
        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        setTimeout(()=>{
          if(result.data.user.role=="admin"){
            navigate('/admin/home')
          }else{
            navigate('/')
          }
        },2500)
      }else if(result.status==401 || result.status==404){
        alert(result.response.data)
        setUserDetails({username:"",email:"",password:""})
      }else{
        alert("something went wrong!!!")
        setUserDetails({username:"",email:"",password:""})

      }
 
      } catch (error) {
        console.log(error);
      }
    }else{
      alert("Please fill the form completely")
    }
  }


  return (
    <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[url(public/blurred_image_1_5px.png)] bg-cover bg-center'>
      <div className="p-10">
        <h1 className="text-3xl font-bold  text-center">
          RENT & GO
        </h1>
        <div style={{width:"400px",borderRadius:"15px"}} className='bg-black text-white p-5 flex flex-col justify-center items-center my-5'>
          <div style={{width:"100px",height:"100px",borderRadius:"50%"}} className='border mb-5 flex justify-center-items-center'>
            <FaUser style={{marginLeft:"34px",marginTop:"34px"}} className='text-3xl'/>
          </div>
          <h2 className='text-2xl'>{insideRegister?"Register":"Login"}</h2>
          <form className='my-5 w-full'>
             {/* username */}
             {
              insideRegister&&
            <input value={userDetails.username} onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} type="text" placeholder='Username' className='bg-white text-black placeholder-gray-400 w-full p-2 rounded mb-5' />
             }
            {/* email */}
            <input value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} type="text" placeholder='Email ID' className='bg-white text-black placeholder-gray-400 w-full p-2 rounded mb-5' />
            {/* passsword */}
              <div className='flex text-center'>
              <input value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} type={viewPassword?"text":"password"} placeholder='Password' className='bg-white text-black placeholder-gray-400 w-full p-2 rounded mb-5' />
              {
                viewPassword?
              <FaEyeSlash onClick={()=>setViewPassword(!viewPassword)} className='text-black cursor-pointer' style={{marginLeft:"-30px",marginTop:"12px"}}/>
              :
              <FaEye onClick={()=>setViewPassword(!viewPassword)} className='text-black cursor-pointer' style={{marginLeft:"-30px",marginTop:"12px"}}/>
              }
              </div>
            {/* forgot pass */}
            {
              !insideRegister &&
              <div className="flex justify-between mb-5">
                <p className="text-xs text-orange-300">*Never share your password with others</p>
                <button className='text-xs underline'>Forgot Password</button>
              </div>
            }
            {/* login/reg btn */}
            <div className="text-center">
              {
                insideRegister ?
                <button onClick={handleRegister} type='button' className='bg-green-700 p-2 w-full rounded'>Register</button>
                :
                <button onClick={handleLogin} type='button' className='bg-green-700 p-2 w-full rounded'>Login</button>
                
              }
            </div>
            <div className="my-5 text-center">
              {
                insideRegister?
                <p className='text-blue-600'>Already a user ? <Link to={'/login'} className='underline ms-5'>Login</Link></p>
                :
                <p className='text-blue-600'>Are you a new user ? <Link to={'/register'} className='underline ms-5'>Register</Link></p>
              }
            </div>

          </form>
        </div>
      </div>
     {/* <ToastContainer
  position="top-center"
  autoClose={3000}
  theme="light"
/> */}

    </div>
  )
}

export default Authentication