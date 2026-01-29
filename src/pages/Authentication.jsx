import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/allAPI";

function Authentication({ insideRegister }) {
  const navigate = useNavigate();

  const [viewPassword, setViewPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;

    if (!username || !email || !password) {
      alert("Please fill the form completely");
      return;
    }

    try {
      const result = await registerAPI(userDetails);
      if (result.status === 200 || result.status === 201) {
        alert("Registered successfully. Please login.");
        setUserDetails({ username: "", email: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data || "Server error");
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;

    if (!email || !password) {
      alert("Please fill the form completely");
      return;
    }

    try {
      const result = await loginAPI(userDetails);
      if (result.status === 200) {
        alert("Login successful");

        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem(
          "user",
          JSON.stringify(result.data.user)
        );

        setTimeout(() => {
          if (result.data.user.role === "admin") {
            navigate("/admin/home");
          } else {
            navigate("/");
          }
        }, 1500);
      }
    } catch (error) {
      alert(error.response?.data || "Invalid credentials");
      setUserDetails({ username: "", email: "", password: "" });
    }
  };

  return (
    <section className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 text-white">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full border border-gray-600 flex items-center justify-center mb-4">
            <FaUser className="text-3xl text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide">
            RENT & GO
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {insideRegister ? "Create Account" : "Welcome Back"}
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-4">

          {/* USERNAME */}
          {insideRegister && (
            <input
              type="text"
              placeholder="Username"
              value={userDetails.username}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  username: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                email: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={viewPassword ? "text" : "password"}
              placeholder="Password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  password: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <span
              className="absolute right-4 top-3.5 text-gray-300 cursor-pointer"
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* INFO */}
          {!insideRegister && (
            <p className="text-xs text-gray-400">
              * Never share your password with others
            </p>
          )}

          {/* BUTTON */}
          <button
            type="button"
            onClick={insideRegister ? handleRegister : handleLogin}
            className="w-full py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
          >
            {insideRegister ? "Register" : "Login"}
          </button>
        </form>

        {/* FOOTER LINK */}
        <div className="text-center mt-6 text-sm">
          {insideRegister ? (
            <p className="text-gray-400">
              Already a user?
              <Link
                to="/login"
                className="text-yellow-400 underline ml-2"
              >
                Login
              </Link>
            </p>
          ) : (
            <p className="text-gray-400">
              New here?
              <Link
                to="/register"
                className="text-yellow-400 underline ml-2"
              >
                Register
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Authentication;
