"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdFolderShared } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { IoPersonCircleSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { GoSync } from "react-icons/go";
import ModalApprove from "./modal-approval";
import { RiBankLine } from "react-icons/ri";
import { useSearchParams } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isUserDataOpen, setUserDataOpen] = useState(false);
  const [isInstitutionDataOpen, setInstitutionDataOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = usePathname();
  const [active, setActive] = useState(0);

  const [navOpen, setNavOpen] = useState(false); // Desktop toggle
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile toggle

  useEffect(() => {
    const type = searchParams.get("type");

    if (pathname === "/admin/persetujuan-data") {
      if (type === "data-pengguna") {
        setActive(1.1);
      } else if (type === "data-lembaga") {
        setActive(1.2);
      }
    } else if (pathname === "/admin/ekspor-data") {
      if (type === "data-pengguna") {
        setActive(2.1);
      } else if (type === "data-lembaga") {
        setActive(2.2);
      }
    } else if (pathname === "/admin/manajemen-akun") {
      setActive(3);
    } else if (pathname === "/admin/sinkronisasi") {
      setActive(4);
    } else {
      setActive(-1);
    }
  }, [pathname, searchParams]);

  const handleLogOut = () => {
    setShowModal(false);
  };

  return (
    <>
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

      <aside
        className={`h-screen fixed lg:relative ${
          isMobileOpen || navOpen ? "inset-0 bg-black bg-opacity-50 z-30" : ""
        } z-40 overflow-hidden`}
      >
        <button
          className="absolute top-4 left-4 lg:hidden z-20 bg-white hover:text-[#605BFF] p-2 rounded-md "
          onClick={() => {
            setIsMobileOpen((prev) => !prev);
            setInstitutionDataOpen(false);
            setUserDataOpen(false);
          }}
        >
          <FaBars className="w-6 h-6 text-gray-700" />
        </button>
        <nav
          className={`flex flex-col h-full bg-white border-r border-[#E6E7EC] transition-all duration-300 ${
            isMobileOpen ? "w-72" : "w-[72px]"
          } lg:w-72`}
        >
          {/* Header */}
          <div className="p-4 border-b border-[#EDEEF3]">
            <div className="p-0 lg:p-4 border-b border-[#EDEEF3] flex rounded-2xl gap-4">
              <img
                src="/sidebar/icon.png"
                className={`w-10 justify-center items-center transition-transform duration-300 `}
              />
              <div className="hidden lg:block">
                <h1 className="text-[15px] font-bold text-black">
                  Lorem Ipsum
                </h1>
                <h2 className="text-[14px] text-black">Company</h2>
              </div>
            </div>
          </div>

          {/* Menu */}
          <ul className="px-4 py-6 flex-1 overflow-y-auto">
            {/* Data Pengguna Section */}
            <li>
              <button
                className={`flex items-center p-2 rounded-lg w-full ${
                  active === 1.1 || active === 2.1
                    ? "text-[#605BFF] font-semibold border border-[#E6E7EC]"
                    : "text-gray-700 hover:text-[#605BFF]"
                }`}
                onClick={() => {
                  setUserDataOpen((prev) => !prev);
                  setIsMobileOpen(true);
                }}
              >
                <div className="flex items-center w-full">
                  <MdFolderShared className="w-6 h-6" />
                  <div
                    className={`flex items-center justify-between w-full ml-3 ${
                      navOpen || isMobileOpen ? "block" : "hidden"
                    } lg:flex`}
                  >
                    <span>Data Pengguna</span>
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
                    href="/admin/persetujuan-data/?type=data-pengguna"
                    className={`flex items-center space-x-2 ${
                      active === 1.1
                        ? "text-[#605BFF] font-semibold"
                        : "text-gray-700 hover:text-[#605BFF]"
                    }`}
                    onClick={() => {
                      // setIsMobileOpen(false);
                      // setUserDataOpen(false);
                    }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        active === 1.1 ? "bg-[#605BFF]" : "border bg-[#D8DBE4]"
                      }`}
                    ></div>
                    <span>Persetujuan Data</span>
                  </Link>
                  <Link
                    href="/admin/ekspor-data/?type=data-pengguna"
                    className={`flex items-center space-x-2 ${
                      active === 2.1
                        ? "text-[#605BFF] font-semibold"
                        : "text-gray-700 hover:text-[#605BFF]"
                    }`}
                    onClick={() => {
                      // setIsMobileOpen(false);
                      // setUserDataOpen(false);
                    }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        active === 2.1 ? "bg-[#605BFF]" : "border bg-[#D8DBE4]"
                      }`}
                    ></div>
                    <span>Ekspor Data</span>
                  </Link>
                </div>
              )}
            </li>

            {/* Data Lembaga Section */}
            <li className="mt-4">
              <button
                className={`flex items-center p-2 rounded-lg w-full ${
                  active === 1.2 || active === 2.2
                    ? "text-[#605BFF] font-semibold border border-[#E6E7EC]"
                    : "text-gray-700 hover:text-[#605BFF]"
                }`}
                onClick={() => {
                  setInstitutionDataOpen((prev) => !prev);
                  setIsMobileOpen(true);
                }}
              >
                <div className="flex items-center w-full">
                  <RiBankLine className="w-6 h-6" />
                  <div
                    className={`flex items-center justify-between w-full ml-3 ${
                      navOpen || isMobileOpen ? "block" : "hidden"
                    } lg:flex`}
                  >
                    <span>Data Lembaga</span>
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
                    href="/admin/persetujuan-data/?type=data-lembaga"
                    className={`flex items-center space-x-2 ${
                      active === 1.2
                        ? "text-[#605BFF] font-semibold"
                        : "text-gray-700 hover:text-[#605BFF]"
                    }`}
                    onClick={() => {
                      // setIsMobileOpen(false);
                      // setInstitutionDataOpen(false);
                    }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        active === 1.2 ? "bg-[#605BFF]" : "border bg-[#D8DBE4]"
                      }`}
                    ></div>
                    <span>Persetujuan Data</span>
                  </Link>
                  <Link
                    href="/admin/ekspor-data/?type=data-lembaga"
                    className={`flex items-center space-x-2 ${
                      active === 2.2
                        ? "text-[#605BFF] font-semibold"
                        : "text-gray-700 hover:text-[#605BFF]"
                    }`}
                    onClick={() => {
                      // setIsMobileOpen(false);
                      // setInstitutionDataOpen(false);
                    }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        active === 2.2 ? "bg-[#605BFF]" : "border bg-[#D8DBE4]"
                      }`}
                    ></div>
                    <span>Ekspor Data</span>
                  </Link>
                </div>
              )}
            </li>

            {/* Manajemen Akun Section */}
            <li className="mt-4">
              <Link
                href="/admin/manajemen-akun"
                className={`flex items-center p-2 rounded-lg ${
                  active === 3
                    ? "text-[#605BFF] font-semibold border border-[#E6E7EC]"
                    : "text-gray-700 hover:text-[#605BFF]"
                }`}
                // onClick={() => setIsMobileOpen(false)}
              >
                <IoPersonCircleSharp className="w-6 h-6" />
                <span
                  className={`${
                    navOpen || isMobileOpen ? "block" : "hidden"
                  } lg:block ml-3`}
                >
                  Manajemen User
                </span>
              </Link>
            </li>

            {/* Sinkronisasi Data Section */}
            <li className="mt-4">
              <Link
                href="/admin/sinkronisasi"
                className={`flex items-center p-2 rounded-lg ${
                  active === 4
                    ? "text-[#605BFF] font-semibold border border-[#E6E7EC]"
                    : "text-gray-700 hover:text-[#605BFF]"
                }`}
                // onClick={() => setIsMobileOpen(false)}
              >
                <GoSync className="w-6 h-6" />
                <span
                  className={`${
                    navOpen || isMobileOpen ? "block" : "hidden"
                  } lg:block ml-3`}
                >
                  Sinkronisasi Data
                </span>
              </Link>
            </li>
          </ul>

          {/* Footer */}
          <div
            className={`flex justify-center items-center mx-6 lg:mx-auto py-6 border-t border-gray-200`}
          >
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div
                className={`${
                  navOpen || isMobileOpen ? "block" : "hidden"
                } ml-2 lg:block`}
              >
                <p className="text-[#181D27] text-sm font-semibold">
                  Admin Bimo
                </p>
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
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
