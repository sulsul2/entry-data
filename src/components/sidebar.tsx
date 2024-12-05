"use client";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { MdFolderShared } from "react-icons/md";
import { usePathname } from "next/navigation";
import { IoPersonCircleSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { GoSync } from "react-icons/go";
import ModalApprove from "./modal-approval";
import { RiBankLine } from "react-icons/ri";

const Sidebar = () => {
  const pathname = usePathname();
  const [isUserDataOpen, setUserDataOpen] = useState(false);
  const [isInstitutionDataOpen, setInstitutionDataOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Helper: Aktifkan status halaman
  const isActive = (path: string) => pathname === path;

  // Helper: Tentukan apakah dropdown "Data Pengguna" harus aktif
  const isUserDropdownActive =
    pathname.startsWith("/persetujuan-data/?type=data-pengguna") ||
    pathname.startsWith("/ekspor-data/?type=data-pengguna");

  // Helper: Tentukan apakah dropdown "Data Lembaga" harus aktif
  const isInstitutionDropdownActive =
    pathname.startsWith("/persetujuan-data/?type=data-lembaga") ||
    pathname.startsWith("/ekspor-data/?type=data-lembaga");

  const handleLogOut = () => {
    setShowModal(false);
  };

  return (
    <div className="w-72 h-screen bg-white border-r border-[#E6E7EC] flex flex-col rounded-3xl">
      {showModal && (
        <ModalApprove
          image="/modal/logout-icon.svg"
          title="Log out Account"
          subtitle="Apakah kamu yakin ingin log out dari akun ini?"
          button1Text="Cancel"
          button2Text="Ya"
          button1Color="bg-[#FFFFFF]"
          button1TextColor="text-[#414651]"
          button2Color="bg-[#D92D20]"
          button2TextColor="text-[#FFFFFF]"
          onButton1Click={() => setShowModal(false)}
          onButton2Click={() => handleLogOut()}
        />
      )}

      {/* Header */}
      <div className="p-4 border-b border-[#EDEEF3]">
        <div className="p-4 border border-[#E6E7EC] flex flex-row rounded-2xl gap-4">
          <img src="/sidebar/icon.png" className="mb-2 text-4xl w-10" />
          <div>
            <h1 className="text-[15px] font-bold text-black">Lorem Ipsum</h1>
            <h2 className="text-[14px] text-black">Company</h2>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 py-6 flex-1 overflow-y-auto">
        {/* Data Pengguna Section */}
        <div>
          <button
            className={`flex items-center p-2 rounded-lg w-full ${
              isUserDropdownActive
                ? "text-[#605BFF] font-semibold border border-[#E6E7EC]"
                : "text-gray-700 hover:text-[#605BFF]"
            }`}
            onClick={() => setUserDataOpen((prev) => !prev)}
          >
            <div className="flex items-center w-full">
              <MdFolderShared className="w-6 h-6" />
              <span className="ml-3 mr-3">Data Pengguna</span>
              <div className="ml-auto">
                {isUserDataOpen ? (
                  <FaChevronUp className="text-gray-700" />
                ) : (
                  <FaChevronDown className="text-gray-700" />
                )}
              </div>
            </div>
          </button>
          {isUserDataOpen && (
            <div className="relative ml-6 my-6 space-y-4">
              <Link
                href="/persetujuan-data/?type=data-pengguna"
                className={`flex items-center space-x-2 ${
                  isActive("/persetujuan-data/?type=data-pengguna")
                    ? "text-[#605BFF] font-semibold"
                    : "text-gray-700 hover:text-[#605BFF]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    isActive("/persetujuan-data/?type=data-pengguna")
                      ? "bg-[#605BFF]"
                      : "border bg-[#D8DBE4]"
                  }`}
                ></div>
                <span>Persetujuan Data</span>
              </Link>
              <Link
                href="/ekspor-data/?type=data-pengguna"
                className={`flex items-center space-x-2 ${
                  isActive("/ekspor-data/?type=data-pengguna")
                    ? "text-[#605BFF] font-semibold"
                    : "text-gray-700 hover:text-[#605BFF]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    isActive("/ekspor-data/?type=data-pengguna")
                      ? "bg-[#605BFF]"
                      : "border bg-[#D8DBE4]"
                  }`}
                ></div>
                <span>Ekspor Data</span>
              </Link>
            </div>
          )}
        </div>

        {/* Data Lembaga Section */}
        <div className="mt-4">
          <button
            className={`flex items-center p-2 rounded-lg w-full ${
              isInstitutionDropdownActive
                ? "text-[#605BFF] font-semibold border border-[#E6E7EC]"
                : "text-gray-700 hover:text-[#605BFF]"
            }`}
            onClick={() => setInstitutionDataOpen((prev) => !prev)}
          >
            <div className="flex items-center w-full">
              <RiBankLine className="w-6 h-6" />
              <span className="ml-3 mr-3">Data Lembaga</span>
              <div className="ml-auto">
                {isInstitutionDataOpen ? (
                  <FaChevronUp className="text-gray-700" />
                ) : (
                  <FaChevronDown className="text-gray-700" />
                )}
              </div>
            </div>
          </button>
          {isInstitutionDataOpen && (
            <div className="relative ml-6 my-6 space-y-4">
              <Link
                href="/persetujuan-data/?type=data-lembaga"
                className={`flex items-center space-x-2 ${
                  isActive("/persetujuan-data/?type=data-lembaga")
                    ? "text-[#605BFF] font-semibold"
                    : "text-gray-700 hover:text-[#605BFF]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    isActive("/persetujuan-data/?type=data-lembaga")
                      ? "bg-[#605BFF]"
                      : "border bg-[#D8DBE4]"
                  }`}
                ></div>
                <span>Persetujuan Data</span>
              </Link>
              <Link
                href="/ekspor-data/?type=data-lembaga"
                className={`flex items-center space-x-2 ${
                  isActive("/ekspor-data/?type=data-lembaga")
                    ? "text-[#605BFF] font-semibold"
                    : "text-gray-700 hover:text-[#605BFF]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    isActive("/ekspor-data/?type=data-lembaga")
                      ? "bg-[#605BFF]"
                      : "border bg-[#D8DBE4]"
                  }`}
                ></div>
                <span>Ekspor Data</span>
              </Link>
            </div>
          )}
        </div>

        {/* Manajemen Akun Section */}
        <div className="mt-4">
          <Link
            href="/manajemen-akun"
            className={`flex items-center p-2 rounded-lg ${
              isActive("/manajemen-akun")
                ? "text-[#605BFF] font-semibold border border-[#E6E7EC]"
                : "text-gray-700 hover:text-[#605BFF]"
            }`}
          >
            <IoPersonCircleSharp className="w-6 h-6" />
            <span className="ml-3">Manajemen User</span>
          </Link>
        </div>

        {/* Sinkronisasi Data Section */}
        <div className="mt-4">
          <Link
            href="/sinkronisasi"
            className={`flex items-center p-2 rounded-lg ${
              isActive("/sinkronisasi")
                ? "text-[#605BFF] font-semibold border border-[#E6E7EC]"
                : "text-gray-700 hover:text-[#605BFF]"
            }`}
          >
            <GoSync className="w-6 h-6" />
            <span className="ml-3">Sinkronisasi Data</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-6 border-t border-gray-200">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-2">
            <p className="text-[#181D27] text-sm font-semibold">Admin Bimo</p>
            <p className="text-[#535862] text-sm font-normal">
              adminbim@gmail.m
            </p>
          </div>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            <LuLogOut className="text-lg text-gray-600 ml-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
