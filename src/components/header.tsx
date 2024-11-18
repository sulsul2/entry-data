// components/Header.tsx
import React from "react";
import { FiSettings, FiBell } from "react-icons/fi"; // Using react-icons for icons

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow-md p-4">
      {/* Left Side: Welcome Text */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, Admin!
        </h1>
        <p className="text-gray-600 text-sm">
          Lacak dan kelola data pengguna perusahaan kamu.
        </p>
      </div>

      {/* Right Side: Icons */}
      <div className="flex items-center space-x-4">
        {/* Settings Icon */}
        <button className="text-gray-600 hover:text-gray-800">
          <FiSettings size={20} />
        </button>

        {/* Notification Icon */}
        <button className="text-gray-600 hover:text-gray-800">
          <FiBell size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
