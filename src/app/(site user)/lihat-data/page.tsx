"use client";
import Table from "@/components/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderUser from "@/components/header-user";
import { getWithAuth } from "@/services/api";
import TextField from "@/components/textfield";
import Cookies from "universal-cookie";

export default function persetujuan() {
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const header = [
    "Id User",
    "Username",
    "Jenis Kelamin",
    "Email",
    "Status",
    "Action",
  ];

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getWithAuth(token, `entry-user?page=${current}`);

      setTotalPages(response.data.data?.pagination.last_page);
      const itemsPerPage = response.data.data?.pagination.per_page;

      const apiData = response.data.data?.data || [];

      const data = apiData
        .map((user: any, index: number) => ({
          ...user,
          originalIndex: (current - 1) * itemsPerPage + index + 1,
        }))
        .filter((user: any) => user.status === "accepted")
        .map((user: any, index: number) => ({
          IdUser: user.originalIndexs,
          username: user.nama || "-",
          JenisKelamin: user.jenis_kelamin || "-",
          Email: user.email || "-",
          Status: (
            <div
              className={`w-fit mx-auto px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-semibold text-center bg-[#ECFDF3] text-[#027A48]`}
            >
              {user.status}
            </div>
          ),
          Action: (
            <Link href={`/lihat-data/${user.id}/pengguna`}>
              <div className="border-2 border-[#D5D7DA] text-xs md:text-sm py-1 md:py-2 rounded-lg">
                Lihat Detail
              </div>
            </Link>
          ),
        }));

      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getData();
      setData(userData);
      setFilteredData(userData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = data.filter((item) => {
        // Ambil semua nilai properti kecuali elemen JSX
        const stringValues = Object.entries(item)
          .filter(
            ([key, value]) =>
              typeof value === "string" || typeof value === "number"
          )
          .map(([key, value]) => String(value).toLowerCase());

        return stringValues.some((value) =>
          value.includes(search.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [search, data]);

  return (
    <div className="h-screen bg-white">
      <HeaderUser />
      <div className="p-6">
        <div className="flex flex-col mb-3 md:mb-6">
          <div className="flex justify-end">
            <TextField
              name={"Search"}
              type="search"
              placeholder={"Search"}
              label={""}
              onChange={(e) => setSearch(e.target.value)}
              width={320}
            />
          </div>
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
  );
}
