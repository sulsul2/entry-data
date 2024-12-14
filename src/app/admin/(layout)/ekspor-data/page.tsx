"use client";
import Table from "@/components/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TextField from "@/components/textfield";
import DropdownButton from "@/components/exportDropdown";
import { getWithAuth } from "@/services/api";

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
        const institutionData = getInstitutionData(dataLembaga);
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

  // Data untuk type 'data-lembaga'
  const dataLembaga = [
    {
      idLembaga: "1",
      namaInstansi: "Instansi Pendidikan A",
      alamat: "Jl. Raya Pendidikan No. 1",
      noTelpon: "021-567890",
      status: "Menunggu Persetujuan",
    },
    {
      idLembaga: "2",
      namaInstansi: "Sekolah Dasar B",
      alamat: "Jl. Merdeka No. 10",
      noTelpon: "021-567891",
      status: "Disetujui",
    },
    {
      idLembaga: "3",
      namaInstansi: "Universitas C",
      alamat: "Jl. Pendidikan No. 20",
      noTelpon: "021-567892",
      status: "Ditolak",
    },
    {
      idLembaga: "4",
      namaInstansi: "Sekolah Menengah Pertama D",
      alamat: "Jl. Raya No. 5",
      noTelpon: "021-567893",
      status: "Menunggu Persetujuan",
    },
    {
      idLembaga: "5",
      namaInstansi: "Perguruan Tinggi E",
      alamat: "Jl. Raya No. 15, Malang",
      noTelpon: "021-567894",
      status: "Menunggu Persetujuan",
    },
    {
      idLembaga: "6",
      namaInstansi: "Perguruan Tinggi E",
      alamat: "Jl. Raya No. 15, Malang",
      noTelpon: "021-567894",
      status: "Disetujui",
    },
  ];

  // Fungsi untuk transformasi data Pengguna
  const getUserData = async () => {
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
  const getInstitutionData = (data: any[]) => {
    return data
      .filter((lembaga) => lembaga.status === "Disetujui")
      .map((lembaga) => ({
        IdLembaga: lembaga.idLembaga,
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
