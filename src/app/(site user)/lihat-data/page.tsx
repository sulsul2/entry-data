"use client";
import Table from "@/components/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderUser from "@/components/header-user";
import { getWithAuth } from "@/services/api";
import TextField from "@/components/textfield";

export default function persetujuan() {
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

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
      setIsLoading(true); // Set loading state
      const response = await getWithAuth(
        "45|tfRZfRI8R3j7FN6l1KF5kIYybNV6uNoYDsFjzMVSabe8c120",
        `entry-user?page=${current}`
      );

      console.log(response);

      // Update total halaman dari response
      setTotalPages(response.data.data?.pagination.last_page);

      // Ambil data dari response dan filter pengguna dengan status "Disetujui"
      const apiData = response.data.data?.data || [];
      console.log("Fetched User Data:", apiData);

      // Transformasi data untuk digunakan di tabel
      const data = apiData
        .filter((user: any) => user.status === "accepted")
        .map((user: any, index: number) => ({
          IdUser: index + 1,
          username: user.nama || "-",
          JenisKelamin: user.jenis_kelamin || "-",
          Email: user.email || "-",
          Status: (
            <div
              className={`w-fit mx-auto px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-semibold text-center bg-[#ECFDF3] text-[#027A48]`}
            >
              {user.status}
            </div>
          ), // Status dengan styling
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

  // Fungsi untuk filter data berdasarkan pencarian
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
      setFilteredData(data); // Reset ke data asli jika pencarian kosong
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
