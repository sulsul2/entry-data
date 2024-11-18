// components/Sidebar.js
"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdFolderShared } from "react-icons/md";

const Sidebar = () => {
  const [isUserDataOpen, setUserDataOpen] = useState(true);

  return (
    <div className="w-64 h-screen bg-white border-r border-[#E6E7EC] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#EDEEF3] items-center">
        <div className="p-4 border border-[#E6E7EC] flex flex-row rounded-2xl gap-4">
          <img src="/sidebar/icon.png" className="mb-2 text-4xl w-10" />
          <div>
            <h1 className="text-[15px] font-bold text-black">Lorem Ipsum</h1>
            <h2 className="text-[14px] text-black">Company</h2>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="p-4 flex-1 overflow-y-auto">
        {/* Data Pengguna Section */}
        <div>
          <button
            className="flex items-center justify-between w-full text-indigo-600 font-medium mb-2"
            onClick={() => setUserDataOpen(!isUserDataOpen)}
          >
            <div className="flex items-center">
              <div className="text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center">
                <span>
                  <MdFolderShared />
                </span>
              </div>
              <span className="ml-3">Data Pengguna</span>
            </div>
            {isUserDataOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          {isUserDataOpen && (
            <div className="ml-6 space-y-2 flex-row">
              <button className="text-gray-700 hover:text-indigo-600">
                Persetujuan Data
              </button>
              <button className="text-gray-700 hover:text-indigo-600">
                Ekspor Data
              </button>
              <button className="text-gray-700 hover:text-indigo-600">
                Lihat Data
              </button>
            </div>
          )}
        </div>

        {/* Other Section */}
        <div className="mt-4">
          <button className="flex items-center text-gray-700 hover:text-indigo-600 font-medium">
            <div className="text-gray-600 w-6 h-6 rounded-full flex items-center justify-center">
              <span> </span>
            </div>
            <span className="ml-3">Manajemen Akun</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-gray-900 font-medium">Admin Bimo</p>
            <p className="text-gray-500 text-sm">adminbim@gmail.m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
