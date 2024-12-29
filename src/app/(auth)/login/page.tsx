"use client";
import Button from "@/components/button";
import TextField from "@/components/textfield";
import Toast from "@/components/toast";
import { get, post } from "@/services/api";
import { setCustomization } from "@/store/slices/customizationSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const cookies = new Cookies();
  const router = useRouter();
  const customization = useSelector((state: RootState) => state.customization);
  const dispatch = useDispatch();
  const token = cookies.get("token");
  const role = cookies.get("role");

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

  useEffect(() => {
    if (token && role) {
      switch (role) {
        case "manager":
          router.push("/admin/persetujuan-data?type=data-pengguna");
          break;
        case "data_entry":
          router.push("/data-entry");
          break;
        default:
          router.push("/lihat-data");
          break;
      }
    }
  }, [role, router, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    setIsLoading(true);

    try {
      const response = await post("login", data);
      if (response.status === 200) {
        const token = response.data.data.token;
        const role = response.data.data.user.role;
        const id = response.data.data.user.id;
        cookies.set("token", token);
        cookies.set("role", role);
        cookies.set("user_id", id);
        if (role == "manager") {
          router.push("/admin/persetujuan-data?type=data-pengguna");
        } else if (role == "data_entry") {
          router.push("/data-entry");
        } else {
          router.push("/lihat-data");
        }
        toast.success("Login Berhasil.");
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[url('/assets/background.png')] bg-cover flex flex-col justify-center items-center gap-6">
      {isPageLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium">Loading...</p>
          </div>
        </div>
      )}
      <div className={`${isError ? "block" : "hidden"}`}>
        <Toast
          type={"error"}
          title={"Gagal Login"}
          description={"Pastikan semua field terisi dengan benar."}
        />
      </div>
      <div className="w-auto h-auto flex flex-col items-center bg-white rounded-[20px] drop-shadow-2xl shadow-[#0A0D1224] p-5 md:p-6">
        <Image src={customization.logo ?? null} alt={"Logo"} className="w-12 h-12" width={12} height={12}/>
        <p className="text-[#181D27] text-[24px] md:text-[30px] font-semibold mt-6">
          Login
        </p>
        <p className="text-[#535862] text-[12px] md:text-[16px] font-normal mt-3 mb-6 md:mb-8">
          Welcome back! Please enter your details.
        </p>
        <TextField
          name={"username"}
          type={"field"}
          placeholder={"Masukkan username"}
          label={"Username"}
          value={username}
          onChange={(val) => setUsername(val.target.value)}
        />
        <TextField
          name={"password"}
          type={"password"}
          placeholder={"Masukkan password"}
          label={"Password"}
          value={password}
          onChange={(val) => setPassword(val.target.value)}
        />
        <Button
          text={"Log in"}
          type={"submit"}
          onClick={handleLogin}
          isLoading={isLoading}
          color={customization.color}
        />
      </div>
      <div className={`${isError ? "invisible" : "hidden"}`}>
        <Toast
          type={"error"}
          title={"Gagal Login"}
          description={"Pastikan semua field terisi dengan benar."}
        />
      </div>
    </div>
  );
}
