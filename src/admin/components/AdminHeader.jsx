import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [admin, setAdmin] = useState(null);
  const [open, setOpen] = useState(false);

  // Load admin from sessionStorage
  useEffect(() => {
    const storedAdmin = sessionStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full px-3 py-2">
      <div className="bg-gray-900 rounded-3xl flex items-center justify-between p-4 shadow-lg">

        {/* Logo */}
        <div className="text-3xl font-bold select-none">
          <span className="text-white">Rent</span>
          <span className="text-yellow-500">&</span>
          <span className="text-yellow-500">GO</span>
        </div>

        {/* Admin Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                       bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            <FaUserCircle className="text-yellow-400 text-xl" />
            <span className="hidden md:block">
              {admin?.username || "Admin"}
            </span>
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50 overflow-hidden">

              {/* Logout Only */}
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2
                           text-left text-red-600 hover:bg-red-50"
              >
                <FaPowerOff />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default AdminHeader;
