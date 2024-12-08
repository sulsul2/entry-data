"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
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
  const [navOpen, setNavOpen] = useState(false);
  const location = usePathname();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const type = searchParams.get("type");

    if (pathname === "/persetujuan-data") {
      if (type === "data-pengguna") {
        setActive(1.1);
      } else if (type === "data-lembaga") {
        setActive(1.2);
      }
    } else if (pathname === "/ekspor-data") {
      if (type === "data-pengguna") {
        setActive(2.1);
      } else if (type === "data-lembaga") {
        setActive(2.2);
      }
    } else if (pathname === "/manajemen-akun") {
      setActive(3);
    } else if (pathname === "/sinkronisasi") {
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
      <aside className="relative h-screen">
        {/* Sidebar Desktop */}
        <nav className="flex flex-col w-72 h-full bg-white border-r border-[#E6E7EC] rounded-3xl">
          
          {/* Header */}
          <div className="p-4 border-0 lg:border-b lg:border-[#EDEEF3]">
            <div className="p-1 lg:p-4 border-0 lg:border-b lg:border-[#EDEEF3] flex flex-row rounded-2xl gap-0 lg:gap-4">
              <img
                src="/sidebar/icon.png"
                className="lg-0 lg:mb-2 w-8 lg:w-10"
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
          <div className="px-4 py-6 flex-1 overflow-y-auto">
            {/* Data Pengguna Section */}
            <div>
              <button
                className={`flex items-center p-2 rounded-lg w-full ${
                  active === 1.1 || active === 2.1
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
                      active === 1.1
                        ? "text-[#605BFF] font-semibold"
                        : "text-gray-700 hover:text-[#605BFF]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        active === 1.1 ? "bg-[#605BFF]" : "border bg-[#D8DBE4]"
                      }`}
                    ></div>
                    <span>Persetujuan Data</span>
                  </Link>
                  <Link
                    href="/ekspor-data/?type=data-pengguna"
                    className={`flex items-center space-x-2 ${
                      active === 2.1
                        ? "text-[#605BFF] font-semibold"
                        : "text-gray-700 hover:text-[#605BFF]"
                    }`}
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
            </div>

            {/* Data Lembaga Section */}
            <div className="mt-4">
              <button
                className={`flex items-center p-2 rounded-lg w-full ${
                  active === 1.2 || active === 2.2
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
                      active === 1.2
                        ? "text-[#605BFF] font-semibold"
                        : "text-gray-700 hover:text-[#605BFF]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        active === 1.2 ? "bg-[#605BFF]" : "border bg-[#D8DBE4]"
                      }`}
                    ></div>
                    <span>Persetujuan Data</span>
                  </Link>
                  <Link
                    href="/ekspor-data/?type=data-lembaga"
                    className={`flex items-center space-x-2 ${
                      active === 2.2
                        ? "text-[#605BFF] font-semibold"
                        : "text-gray-700 hover:text-[#605BFF]"
                    }`}
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
            </div>

            {/* Manajemen Akun Section */}
            <div className="mt-4">
              <Link
                href="/manajemen-akun"
                className={`flex items-center p-2 rounded-lg ${
                  active === 3
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
                  active === 4
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
