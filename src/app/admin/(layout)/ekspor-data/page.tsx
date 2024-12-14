"use client";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TextField from "@/components/textfield";
import DropdownButton from "@/components/exportDropdown";
import { getWithAuth } from "@/services/api";
import Cookies from "universal-cookie";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cookies = new Cookies();

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
  }, [type, current]);

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

  // Fungsi untuk transformasi data Pengguna
  const getUserData = async () => {
    try {
      setIsLoading(true); // Set loading state
      const response = await getWithAuth(token, `entry-user?page=${current}`);

      // Update total halaman dari response
      setTotalPages(response.data.data?.pagination.last_page);

      // Ambil data dari response dan filter pengguna dengan status "Disetujui"
      const apiData = response.data.data?.data || [];

      // Transformasi data untuk digunakan di tabel
      const data = apiData
        .filter((user: any) => user.status === "accepted")
        .map((user: any, index: number) => ({
          IdUser: index + 1,
          NamaPengguna: user.nama || "-",
          JenisKelamin: user.jenis_kelamin || "-",
          Email: user.email || "-",
          Status: (
            <div
              className={`w-fit mx-auto px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-semibold text-center bg-[#ECFDF3] text-[#027A48]`}
            >
              {user.status}
            </div>
          ), // Status dengan styling
          Action: <DropdownButton id={user.id} type="data-pengguna" />, // Tombol aksi
        }));

      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
      return [];
    }
  };

  // Fungsi untuk transformasi data Lembaga
  const getInstitutionData = async () => {
    try {
      setIsLoading(true);
      const response = await getWithAuth(
        token,
        `entry-lembaga?page=${current}`
      );

      console.log(response);

      // Update total halaman dari response
      setTotalPages(response.data.data?.pagination.last_page);

      // Ambil data dari response dan filter pengguna dengan status "Disetujui"
      const apiData = response.data.data?.data || [];

      // Transformasi data untuk digunakan di tabel
      const data = apiData
        .filter((lembaga: any) => lembaga.status === "accepted")
        .map((lembaga: any, index: number) => ({
          IdLembaga: index + 1,
          NamaInstansi: lembaga.namaInstansi,
          Alamat: lembaga.alamat || "-",
          NoTelpon: lembaga.noTelpon || "-",
          Status: (
            <div
              className={`w-fit mx-auto px-1 md:px-2 py-1 rounded-lg text-xs md:text-smfont-semibold text-center bg-[#ECFDF3] text-[#027A48]`}
            >
              {lembaga.status}
            </div>
          ),
          Action: <DropdownButton id={lembaga.idLembaga} type={type} />,
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
        <p className="text-[#605BFF] cursor-pointer">{title}</p>
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
  );
}
