"use client";
import Button from "@/components/button";
import ColorBox from "@/components/colorbox";
import UploadBox from "@/components/uploadbox";
import { postWithAuth } from "@/services/api";
import { setCustomization } from "@/store/slices/customizationSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export default function Kustomisasi() {
  const router = useRouter();
  const dispatch = useDispatch();
  const customization = useSelector((state: RootState) => state.customization);
  const [selectedColor, setSelectedColor] = useState<
    "primary" | "secondary" | "tersier"
  >(customization.color);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cookies = new Cookies();

  const handleColorChange = (color: "primary" | "secondary" | "tersier") => {
    setSelectedColor(color);
  };

  const handleCustomization = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("active_color", selectedColor);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      if (faviconFile) {
        formData.append("favicon", faviconFile);
      }
      const token = cookies.get("token");
      const response = await postWithAuth("customization", formData, token);
      console.log(response);
      dispatch(
        setCustomization({
          color: response.data.data.active_color ?? "primary",
          logo: response.data.data.logo,
          favicon: response.data.data.favicon,
        })
      );
      toast.success("Perubahan berhasil disimpan.");
    } catch (error) {
      console.error(error);
      toast.error("Perubahan gagal disimpan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="bg-white px-3 py-8">
      <div className="flex items-center justify-start px-5 md:px-20 gap-[14px] mb-3 md:mb-6">
        <div
          className={`p-[6px] md:p-[10px] text-white bg-${customization.color} flex justify-center items-center rounded-lg cursor-pointer`}
          onClick={() => router.back()}
        >
          <IoArrowBackOutline className="w-3 md:w-[20px] h-3 md:h-[20px]" />
        </div>
        <p className="text-[#2A3D4A] font-semibold text-[16px] md:text-[24px] ">
          Settings
        </p>
      </div>
      <hr className="text-[#EDEEF3] mx-3" />
      <div className="w-full py-3 md:py-12 px-6 md:px-28 flex flex-col items-start">
        <p className="text-[#2A3D4A] font-semibold text-[14px] md:text-[20px]">
          Tema Website
        </p>
        <div className="w-full flex justify-start items-center flex-wrap mt-3 mb-12 gap-4">
          <ColorBox
            color={"primary"}
            isSelected={selectedColor === "primary"}
            onClick={() => handleColorChange("primary")}
          />
          <ColorBox
            color={"secondary"}
            isSelected={selectedColor === "secondary"}
            onClick={() => handleColorChange("secondary")}
          />
          <ColorBox
            color={"tersier"}
            isSelected={selectedColor === "tersier"}
            onClick={() => handleColorChange("tersier")}
          />
        </div>
        <div className="w-full flex justify-start items-center flex-wrap gap-12 mb-9 md:mb-12">
          <div className="flex flex-col items-start justify-start gap-4">
            <p className="text-[#2A3D4A] font-semibold text-[14px] md:text-[20px]">
              Logo
            </p>
            <UploadBox
              type={"Logo"}
              file={customization.logo}
              setFile={setLogoFile}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-4">
            <p className="text-[#2A3D4A] font-semibold text-[14px] md:text-[20px]">
              Favicon
            </p>
            <UploadBox
              type={"Favicon"}
              file={customization.favicon}
              setFile={setFaviconFile}
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button
            text={"Simpan"}
            type={"button"}
            color={customization.color}
            width={350}
            onClick={handleCustomization}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
    </>
  );
}
