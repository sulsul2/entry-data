"use client";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { get } from "@/services/api";
import { setCustomization } from "@/store/slices/customizationSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoPersonAdd } from "react-icons/go";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

export default function DataEntry() {
  const router = useRouter();
  const customization = useSelector((state: RootState) => state.customization);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("customization/current");
        const data = response.data.data;

        dispatch(
          setCustomization({
            color: data.active_color,
            logo: data.logo,
            favicon: data.favicon,
          })
        );
      } catch (error) {
        console.error("Error fetching customization data:", error);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="flex h-screen bg-white">
        {isPageLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white text-sm font-medium">Loading...</p>
            </div>
          </div>
        )}
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex justify-start items-center mt-12 gap-4 md:gap-10 px-2 md:px-10">
            <div
              className={`bg-white py-3 md:py-6 px-8 md:px-16 rounded-[24px] border-[2px] border-[#E6E7EC] flex flex-col justify-center items-center gap-3 md:gap-5 text-${customization.color} cursor-pointer`}
              onClick={() => router.push("/data-entry/input-user")}
            >
              <GoPersonAdd className="w-[40px] md:w-[75px] h-[40px] md:h-[75px]" />
              <p className="text-[12px] md:text-[24px] font-semibold text-center">
                Input Data
                <br />
                Pengguna
              </p>
            </div>
            <div
              className={`bg-white py-3 md:py-6 px-8 md:px-16 rounded-[24px] border-[2px] border-[#E6E7EC] flex flex-col justify-center items-center gap-3 md:gap-5 text-${customization.color} cursor-pointer`}
              onClick={() => router.push("/data-entry/input-lembaga")}
            >
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
