"use client";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TextField from "@/components/textfield";
import DropdownButton from "@/components/exportDropdown";
import { getWithAuth } from "@/services/api";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function EksporData() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // Ambil parameter type dari URL
  const [data, setData] = useState<any[]>([]); // We now use `any[]` to handle both user and institution data
  const [header, setHeader] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [nama, setNama] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cookies = new Cookies();
  const customization = useSelector((state: RootState) => state.customization);

  const token = cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      if (type === "data-pengguna") {
        setTitle("Data Pengguna");
        setHeader([
          "Id User",
          "Nama Pengguna",
          "Jenis Kelamin",
          "Email",
          "Status",
          "Action",
        ]);
        const userData = await getUserData();
        setData(userData);
        setFilteredData(userData);
      } else if (type === "data-lembaga") {
        setTitle("Data Lembaga");
        setHeader([
          "Id",
          "Nama Instansi",
          "Alamat",
          "Kontak",
          "Status",
          "Action",
        ]);
        const institutionData = await getInstitutionData();
        setData(institutionData);
        setFilteredData(institutionData);
      }
    };
    fetchData();
  }, [type, current, nama]);

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

  // Fungsi untuk transformasi data Pengguna
  const getUserData = async () => {
    try {
      setIsLoading(true);
      const response = await getWithAuth(
        token,
        `entry-user?page=${current}&nama=${nama}`
      );

      setTotalPages(response.data.data?.pagination.last_page);
      const apiData = response.data.data?.data || [];
      const itemsPerPage = response.data.data?.pagination.per_page;

      // Transformasi data untuk digunakan di tabel
      const data = apiData
        .map((user: any, index: number) => ({
          ...user,
          originalIndex: (current - 1) * itemsPerPage + index + 1,
        }))
        .filter((user: any) => user.status === "accepted")
        .map((user: any, index: number) => ({
          IdUser: user.originalIndex,
          NamaPengguna: user.nama || "-",
          JenisKelamin: user.jenis_kelamin || "-",
          Email: user.email || "-",
          Status: (
            <div
              className={`w-fit mx-auto px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-semibold text-center bg-[#ECFDF3] text-[#027A48]`}
            >
              {user.status}
            </div>
          ),
          Action: <DropdownButton id={user.id} type="data-pengguna" />,
        }));

      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
      return [];
    }
  };

  const getInstitutionData = async () => {
    try {
      setIsLoading(true);
      const response = await getWithAuth(
        token,
        `entry-lembaga?page=${current}&nama=${nama}`
      );

      // Update total halaman dan item per halaman dari response
      setTotalPages(response.data.data?.pagination.last_page);
      const apiData = response.data.data?.data || [];
      const itemsPerPage = response.data.data?.pagination.per_page;

      // Transformasi data untuk digunakan di tabel
      const data = apiData
        .map((lembaga: any, index: number) => ({
          ...lembaga,
          originalIndex: (current - 1) * itemsPerPage + index + 1,
        }))
        .filter((lembaga: any) => lembaga.status === "accepted")
        .map((lembaga: any) => ({
          IdLembaga: lembaga.originalIndex,
          NamaInstansi: lembaga.nama,
          Alamat: lembaga.alamat || "-",
          NoTelpon: lembaga.no_kontak || "-",
          Status: (
            <div
              className={`w-fit mx-auto px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-semibold text-center bg-[#ECFDF3] text-[#027A48]`}
            >
              {lembaga.status}
            </div>
          ),
          Action: <DropdownButton id={lembaga.id} type={type} />,
        }));

      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching lembaga data:", error);
      setIsLoading(false);
      return [];
    }
  };

  return (
    <div className="px-6 py-2">
      <div className="hidden md:flex items-center gap-2 text-xs font-inter font-medium mb-2">
        <p className={`text-${customization.color} cursor-pointer`}>{title}</p>
        <p className="text-[#2A3D4A]"> / </p>
        <p className="text-[#2A3D4A]">Ekspor Data</p>
      </div>

      <h1 className="font-semibold text-[#2A3D4A] text-[16px] md:text-[24px] mb-2 md:mb-6">
        Ekspor Data
      </h1>

      <div className="flex flex-col mb-6">
        <div className="flex justify-end">
          <TextField
            name={"Search"}
            type="search"
            placeholder={"Search"}
            label={""}
            onChange={(e) => {
              setNama(e.target.value); // Update search keyword
              setCurrent(1); // Reset to first page
            }}
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
        active={current}
      />
    </div>
  );
}
