// components/Header.tsx
import React from "react";
import { LuLogOut } from "react-icons/lu";

const HeaderUser: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-white border-b-2 border-[#EDEEF3] w-[98%] mx-auto px-10 py-9">
      {/* Left Side: Welcome Text */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, User!
        </h1>
      </div>

      {/* Right Side: Icons */}
      <div className="flex items-center space-x-5">
        <button className="text-gray-600 hover:text-gray-800">
          <LuLogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default HeaderUser;
