"use client";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Table from "@/components/table";
import TextField from "@/components/textfield";
import { getWithAuth } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import Cookies from "universal-cookie";

export default function HistoryEntry() {
  const [search, setSearch] = useState<String>("");
  const [current, setCurrent] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const header = ["No", "Nama", "Email", "Status", "Lihat Detail"];

  const cookies = new Cookies();
  const token = cookies.get("token");
  const user_id = cookies.get("user_id");

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      setData(userData);
      setFilteredData(userData);
    };
    fetchData();
  }, [current]);

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const response = await getWithAuth(
        token,
        `entry-user/user/${user_id}?page=${current}`
      );

      setTotalPages(response.data.data?.pagination.last_page);
      const apiData = response.data.data?.data || [];
      const itemsPerPage = response.data.data?.pagination.per_page;

      const transformedData = apiData.map((user: any, index: number) => ({
        IdUser: (current - 1) * itemsPerPage + index + 1,
        NamaPengguna: user.nama,
        Email: user.email || "-",
        Status: (
          <div
            className={`w-fit mx-auto px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-semibold text-center ${
              user.status === "waiting"
                ? "bg-[#FFFAEB] text-[#B54708]"
                : user.status === "accepted"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            {user.status}
          </div>
        ),
        Detail: (
          <Link href={`/lihat-data/${user.id}/pengguna`}>
            <div className="border-2 border-[#D5D7DA] text-xs md:text-sm py-1 md:py-2 rounded-lg">
              Lihat Detail
            </div>
          </Link>
        ),
      }));

      setIsLoading(false); // Stop loading state
      return transformedData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false); // Stop loading state even on error
      return [];
    }
  };
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-col mb-3 md:mb-6 px-6 py-2">
          <div className="flex justify-end items-center gap-4">
            <TextField
              name={"status"}
              placeholder={"Status"}
              label={""}
              type={"dropdown"}
              options={[
                { label: "Disetujui", value: "accepted" },
                { label: "Ditolak", value: "rejected" },
                { label: "Menunggu", value: "waiting" },
              ]}
              width={180}
              icon={<CiFilter />}
            />
            <TextField
              name={"Search"}
              type="search"
              placeholder={"Search"}
              label={""}
              onChange={(e) => setSearch(e.target.value)}
              width={320}
            />
          </div>
          <Table
            data={filteredData}
            header={header}
            isLoading={isLoading}
            totalPages={totalPages}
            current={(curr) => setCurrent(curr)}
          />
        </div>
      </div>
    </div>
  );
}
