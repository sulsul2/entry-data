// components/Header.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className="flex justify-between items-center bg-white border-b-2 border-[#EDEEF3] w-[98%] mx-auto px-10 py-9">
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
      <div className="flex items-center space-x-5">
        {/* Settings Icon */}
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => router.push("/kustomisasi")}
        >
          <IoIosSettings size={20} />
        </button>

        {/* Notification Icon */}
        <button className="text-gray-600 hover:text-gray-800">
          <IoNotifications size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
