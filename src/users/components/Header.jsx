import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

function Header() {

  const navigate = useNavigate();
  const dropdownRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="w-full px-2 md:px-3 py-2">
      <div className="bg-gray-900 rounded-3xl grid grid-cols-3 items-center p-3 shadow-lg">

        {/* Left */}
        <div className="flex items-center gap-6 pl-4">
          <Link
            to="/"
            className="hidden md:block text-gray-300 hover:text-yellow-400"
          >
            Home
          </Link>

          <Link
            to="/contact"
            className="hidden md:block text-gray-300 hover:text-yellow-400"
          >
            Contact Us
          </Link>
        </div>

        {/* Center */}
        <div className="flex justify-center">
          <div className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-white">Rent</span>
            <span className="text-yellow-500">&</span>
            <span className="text-yellow-500">GO</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-end pr-4 relative" ref={dropdownRef}>
          {isLoggedIn ? (
            <div>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition"
              >
                <FaUserCircle className="text-xl text-yellow-400" />
                <span className="hidden md:block">{user?.username}</span>
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden z-50">
                  <Link
                    to="/user-profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 rounded-xl bg-yellow-500 text-gray-900 font-semibold hover:bg-yellow-400"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;
