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

interface ProcessedUser {
  IdUser: number;
  NamaPengguna: string;
  JenisKelamin: string;
  Email: string;
  Status: JSX.Element; // JSX element untuk status yang merupakan komponen div
  Action: JSX.Element; // JSX element untuk Action yang berisi komponen DropdownButton
}

interface User {
  id: string;
  nama: string;
  jenis_kelamin: string;
  email: string | null;
  status: string;
  originalIndex: number;
  // Anda bisa menambahkan lebih banyak field jika diperlukan
}

interface Lembaga {
  id: string;
  nama: string;
  alamat: string;
  no_kontak: string;
  status: string;
  originalIndex: number;
}

// Tipe untuk data yang diproses
interface ProcessedLembaga {
  IdLembaga: number; // ID yang dihitung berdasarkan halaman dan index
  NamaInstansi: string; // Nama lembaga
  Alamat: string; // Alamat lembaga, default "-" jika kosong
  NoTelpon: string; // Nomor telepon, default "-" jika kosong
  Status: JSX.Element; // JSX element untuk status yang berisi div
  Action: JSX.Element; // JSX element untuk action yang berisi DropdownButton
}

export default function EksporData() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // Ambil parameter type dari URL
  const [data, setData] = useState<ProcessedUser[]>([]); // We now use `any[]` to handle both user and institution data
  const [lembagaData, setLembagaData] = useState<ProcessedLembaga[]>([]); // We now use `any[]` to handle both user and institution data
  const [header, setHeader] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [filteredData, setFilteredData] = useState<ProcessedUser[]>([]);
  const [filteredLembagaData, setFilteredLembagaData] = useState<
    ProcessedLembaga[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(""); // Nilai setelah debounce
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
        setLembagaData(institutionData);
        setFilteredLembagaData(institutionData);
      }
    };
    fetchData();
  }, [type, current, nama]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn); // Bersihkan timeout saat `search` berubah
  }, [search]);

  useEffect(() => {
    if (type === "data-pengguna") {
      if (debouncedSearch) {
        const filtered = data.filter((item) => {
          // Filter hanya berdasarkan string atau angka
          const stringValues = Object.values(item)
            .filter(
              (value) => typeof value === "string" || typeof value === "number"
            )
            .map((value) => String(value).toLowerCase());

          // Cek apakah ada nilai yang cocok dengan pencarian
          return stringValues.some((value) =>
            value.includes(debouncedSearch.toLowerCase())
          );
        });
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    } else if (type === "data-lembaga") {
      if (debouncedSearch) {
        const filtered = lembagaData.filter((item) => {
          const stringValues = Object.values(item)
            .filter(
              (value) => typeof value === "string" || typeof value === "number"
            )
            .map((value) => String(value).toLowerCase());

          return stringValues.some((value) =>
            value.includes(debouncedSearch.toLowerCase())
          );
        });
        setFilteredLembagaData(filtered);
      } else {
        setFilteredLembagaData(lembagaData);
      }
    }
  }, [debouncedSearch, data, lembagaData, type]);

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
        .map((user: User, index: number) => ({
          ...user,
          originalIndex: (current - 1) * itemsPerPage + index + 1,
        }))
        .filter((user: User) => user.status === "accepted")
        .map((user: User) => ({
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
        .map((lembaga: Lembaga, index: number) => ({
          ...lembaga,
          originalIndex: (current - 1) * itemsPerPage + index + 1,
        }))
        .filter((lembaga: Lembaga) => lembaga.status === "accepted")
        .map((lembaga: Lembaga) => ({
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
              setSearch(e.target.value); // Update search keyword
              setCurrent(1); // Reset to first page
            }}
            width={320}
          />
        </div>
      </div>

      {type == "data-pengguna" ? (
        <Table
          data={filteredData}
          header={header}
          isLoading={isLoading}
          totalPages={totalPages}
          current={(curr) => setCurrent(curr)}
          active={current}
        />
      ) : (
        <Table
          data={filteredLembagaData}
          header={header}
          isLoading={isLoading}
          totalPages={totalPages}
          current={(curr) => setCurrent(curr)}
          active={current}
        />
      )}
    </div>
  );
}
