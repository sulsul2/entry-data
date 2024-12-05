"use client";
import Table from "@/components/table";
import Link from "next/link";
import { Fragment, JSXElementConstructor, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import TextField from "@/components/textfield";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

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

export default function PersetujuanData() {
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
            className={`w-fit mx-auto px-2 py-1 rounded-lg text-sm font-semibold text-center bg-[#ECFDF3] text-[#027A48]`}
          >
            {user.status}
          </div>
        ),
        Action: dropdownButton(user.idUser),
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
            className={`w-fit mx-auto px-2 py-1 rounded-lg text-sm font-semibold text-center bg-[#ECFDF3] text-[#027A48]`}
          >
            {lembaga.status}
          </div>
        ),
        Action: dropdownButton(lembaga.idLembaga),
      }));
  };

  const dropdownButton = (id: string) => {
    return (
      <div className="relative">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="flex justify-center items-center px-4 py-2 text-sm font-medium text-[#181D27] bg-white border-2 border-[#D5D7DA] rounded-md gap-2">
              <div>
                <FiDownload />
              </div>
              <p>Ekspor Data</p>
              <div>
                <FaChevronDown />
              </div>
            </MenuButton>
          </div>
          <div>
            <MenuItems className="z-[1000] absolute flex w-full mt-2 bg-white border border-[#F5F5F5] rounded-sm shadow-lg">
              <div className="px-1 py-1">
                <MenuItem>
                  {() => (
                    <button
                      className="flex items-left w-full p-2 text-[#181D27] text-[10px]"
                      onClick={() => console.log(`Export CSV for ID ${id}`)}
                    >
                      Ekspor Format CSV (.csv)
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {() => (
                    <button
                      className="flex items-left w-full p-2 text-[#181D27] text-[10px]"
                      onClick={() => console.log(`Export XLSX for ID ${id}`)}
                    >
                      Ekspor Format XLSX (.xlsx)
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </div>
        </Menu>
      </div>
    );
  };

  // Fungsi untuk menangani aksi ekspor
  const handleEksportCSV = (id: number | null, type: string | null) => {
    if (type === "data-pengguna") {
      console.log(`Pengguna dengan ID ${id} disetujui.`);
      // Tambahkan logika untuk pengguna
    } else if (type === "data-lembaga") {
      console.log(`Lembaga dengan ID ${id} disetujui.`);
      // Tambahkan logika untuk lembaga
    }
  };

  // Fungsi untuk menangani aksi ekspor
  const handleEksportXLSX = (id: number | null, type: string | null) => {
    if (type === "data-pengguna") {
      console.log(`Pengguna dengan ID ${id} disetujui.`);
      // Tambahkan logika untuk pengguna
    } else if (type === "data-lembaga") {
      console.log(`Lembaga dengan ID ${id} disetujui.`);
      // Tambahkan logika untuk lembaga
    }
  };

  return (
    <div className="px-6 py-2">
      <div className="flex items-center gap-2 text-xs font-inter font-medium mb-2">
        <Link href={`/user-list/`} className="text-[#605BFF] cursor-pointer">
          {title}
        </Link>
        <p className="text-[#2A3D4A]"> / </p>
        <p className="text-[#2A3D4A]">Ekspor Data</p>
      </div>

      <h1 className="text-2xl font-semibold text-[#2A3D4A] mb-6">
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
