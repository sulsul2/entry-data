"use client";
import Table from "@/components/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TextField from "@/components/textfield";
import DropdownButton from "@/components/exportDropdown";

interface DataUser {
  IdUser: string;
  NamaPengguna: string;
  JenisKelamin: string;
  Email: string;
  NoIdentitas?: string;
  Alamat: string;
  NoTelpon?: string;
  Status: JSX.Element;
  Detail?: JSX.Element;
  Action: JSX.Element;
}

interface DataLembaga {
  IdLembaga: string;
  NamaInstansi: string;
  Alamat: string;
  NoTelpon: string;
  Status: JSX.Element;
  Detail: JSX.Element;
  Action: JSX.Element;
}

export default function EksporData() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // Ambil parameter type dari URL
  const [data, setData] = useState<any[]>([]); // We now use `any[]` to handle both user and institution data
  const [header, setHeader] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
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
      const userData = getUserData(dataPengguna);
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
  }, [type]);

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

  // Data untuk type 'data-pengguna'
  const dataPengguna = [
    {
      idUser: "1",
      namaPengguna: "Andi Lane",
      jenisKelamin: "Pria",
      email: "andi@example.com",
      noIdentitas: "176984332667845",
      alamat: "Jl. Ganesha 10, Coblong",
      noTelpon: "081356565930",
      status: "Menunggu Persetujuan",
    },
    {
      idUser: "2",
      namaPengguna: "Maria Dewi",
      jenisKelamin: "Wanita",
      email: "maria.dewi@example.com",
      noIdentitas: "176984332667846",
      alamat: "Jl. Merdeka 5, Jakarta",
      noTelpon: "081256565931",
      status: "Disetujui",
    },
    {
      idUser: "3",
      namaPengguna: "Joko Widodo",
      jenisKelamin: "Pria",
      email: "joko.widodo@example.com",
      noIdentitas: "176984332667847",
      alamat: "Jl. Sudirman 15, Bandung",
      noTelpon: "081356565932",
      status: "Ditolak",
    },
    {
      idUser: "4",
      namaPengguna: "Siti Aminah",
      jenisKelamin: "Wanita",
      email: "siti.aminah@example.com",
      noIdentitas: "176984332667848",
      alamat: "Jl. Pahlawan 8, Yogyakarta",
      noTelpon: "081356565933",
      status: "Menunggu Persetujuan",
    },
    {
      idUser: "5",
      namaPengguna: "Budi Santoso",
      jenisKelamin: "Pria",
      email: "budi.santoso@example.com",
      noIdentitas: "176984332667849",
      alamat: "Jl. Raya No. 9, Surabaya",
      noTelpon: "081356565934",
      status: "Menunggu Persetujuan",
    },
    {
      idUser: "6",
      namaPengguna: "Budi Santoso",
      jenisKelamin: "Pria",
      email: "budi.santoso@example.com",
      noIdentitas: "176984332667849",
      alamat: "Jl. Raya No. 9, Surabaya",
      noTelpon: "081356565934",
      status: "Disetujui",
    },
  ];

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
  const getUserData = (data: any[]) => {
    return data
      .filter((user) => user.status === "Disetujui")
      .map((user) => ({
        IdUser: user.idUser,
        NamaPengguna: user.namaPengguna,
        JenisKelamin: user.jenisKelamin || "-",
        Email: user.email || "-",
        Status: (
          <div
            className={`w-fit mx-auto px-1 md:px-2 py-1 rounded-lg text-xs md:text-smfont-semibold text-center bg-[#ECFDF3] text-[#027A48]`}
          >
            {user.status}
          </div>
        ),
        Action: <DropdownButton id={user.idUser} type={type} />,
      }));
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

      <Table data={filteredData} header={header} isLoading={false} />
    </div>
  );
}
