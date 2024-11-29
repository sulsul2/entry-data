import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { GoPersonAdd } from "react-icons/go";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

export default function DataEntry() {
  return (
    <>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex justify-start items-center gap-4 md:gap-10 px-2 md:px-10">
            <div className="bg-white py-3 md:py-6 px-8 md:px-16 rounded-[24px] border-[2px] border-[#E6E7EC] flex flex-col justify-center items-center gap-3 md:gap-5 text-primary-900 cursor-pointer">
              <GoPersonAdd className="w-[40px] md:w-[75px] h-[40px] md:h-[75px]" />
              <p className="text-[12px] md:text-[24px] font-semibold text-center">
                Input Data
                <br />
                Pengguna
              </p>
            </div>
            <div className="bg-white py-3 md:py-6 px-8 md:px-16 rounded-[24px] border-[2px] border-[#E6E7EC] flex flex-col justify-center items-center gap-3 md:gap-5 text-primary-900 cursor-pointer">
              <HiOutlineBuildingLibrary className="w-[40px] md:w-[75px] h-[40px] md:h-[75px]" />
              <p className="text-[12px] md:text-[24px] font-semibold text-center">
                Input Data
                <br />
                Lembaga
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
