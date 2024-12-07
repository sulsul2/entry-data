"use client";
import Table from "@/components/table";
import Link from "next/link";
import { JSXElementConstructor, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import TextField from "@/components/textfield";
import ModalApprove from "@/components/modal-approval";

interface DataUser {
  IdUser: number;
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
  IdLembaga: number;
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
  const [data, setData] = useState<any[]>([]); // Data asli
  const [filteredData, setFilteredData] = useState<any[]>([]); // Data setelah difilter
  const [header, setHeader] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState<string>("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (type === "data-pengguna") {
      setTitle("Data Pengguna");
      setHeader([
        "Id User",
        "Nama Pengguna",
        "Jenis Kelamin",
        "Email",
        "Status",
        "Detail",
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
        "Details",
        "Action",
      ]);
      const institutionData = getInstitutionData(dataLembaga);
      setData(institutionData);
      setFilteredData(institutionData);
    }
  }, [type]);

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
  ];

  // Fungsi untuk transformasi data Pengguna
  const getUserData = (data: any[]) => {
    return data.map((user) => ({
      IdUser: user.idUser,
      NamaPengguna: user.namaPengguna,
      JenisKelamin: user.jenisKelamin || "-",
      Email: user.email || "-",
      Status: (
        <div
          className={`w-fit mx-auto px-2 py-1 rounded-lg text-sm font-semibold text-center ${
            user.status === "Menunggu Persetujuan"
              ? "bg-[#FFFAEB] text-[#B54708]"
              : user.status === "Disetujui"
              ? "bg-[#ECFDF3] text-[#027A48]"
              : "bg-[#FEF3F2] text-[#B42318]"
          }`}
        >
          {user.status}
        </div>
      ),
      Detail: (
        <Link
          href={`/lihat-data/${user.idUser}/pengguna`}
          className="border-2 border-[#D5D7DA] text-lg px-3 py-2 rounded-lg"
        >
          Lihat Detail
        </Link>
      ),
      Action: getActionButtons(user.status, user.idUser),
    }));
  };

  // Fungsi untuk transformasi data Lembaga
  const getInstitutionData = (data: any[]) => {
    return data.map((lembaga) => ({
      IdLembaga: lembaga.idLembaga,
      NamaInstansi: lembaga.namaInstansi,
      Alamat: lembaga.alamat || "-",
      NoTelpon: lembaga.noTelpon || "-",
      Status: (
        <div
          className={`w-fit mx-auto px-2 py-1 rounded-lg text-sm font-semibold text-center ${
            lembaga.status === "Menunggu Persetujuan"
              ? "bg-[#FFFAEB] text-[#B54708]"
              : lembaga.status === "Disetujui"
              ? "bg-[#ECFDF3] text-[#027A48]"
              : "bg-[#FEF3F2] text-[#B42318]"
          }`}
        >
          {lembaga.status}
        </div>
      ),
      Detail: (
        <Link
          href={`/lihat-data/${lembaga.idLembaga}/lembaga`}
          className="border-2 border-[#D5D7DA] text-lg px-3 py-2 rounded-lg"
        >
          Lihat Detail
        </Link>
      ),
      Action: getActionButtons(lembaga.status, lembaga.idLembaga),
    }));
  };

  // Fungsi untuk menentukan tombol berdasarkan status
  const getActionButtons = (status: string, id: number) => {
    if (status === "Menunggu Persetujuan") {
      return (
        <div className="flex justify-center items-center gap-2">
          <button
            className="text-[#F04438] text-sm border-2 border-[#F04438] p-2 rounded-lg"
            onClick={() => {
              setShowRejectModal(true);
              setSelectedId(id);
            }}
          >
            <RxCross1 />
          </button>
          <button
            className="text-[#12B76A] text-sm border-2 border-[#12B76A] p-2 rounded-lg"
            onClick={() => {
              setShowApproveModal(true);
              setSelectedId(id);
            }}
          >
            <FaCheck />
          </button>
        </div>
      );
    } else {
      return <p></p>;
    }
  };

  const handleModalClose = () => {
    setShowApproveModal(false);
    setShowRejectModal(false);
    setSelectedId(null);
  };

  // Fungsi untuk menangani aksi "Setujui"
  const handleApprove = (id: number | null, type: string | null) => {
    if (type === "data-pengguna") {
      console.log(`Pengguna dengan ID ${id} disetujui.`);
      // Tambahkan logika untuk pengguna
    } else if (type === "data-lembaga") {
      console.log(`Lembaga dengan ID ${id} disetujui.`);
      // Tambahkan logika untuk lembaga
    }
    handleModalClose();
  };

  const handleReject = (id: number | null, type: string | null) => {
    if (type === "data-pengguna") {
      console.log(`Pengguna dengan ID ${id} ditolak.`);
      // Tambahkan logika untuk pengguna
    } else if (type === "data-lembaga") {
      console.log(`Lembaga dengan ID ${id} ditolak.`);
      // Tambahkan logika untuk lembaga
    }
    handleModalClose();
  };

  return (
    <div className="px-6 py-2">
      {showApproveModal && (
        <ModalApprove
          image="/modal/approve-icon.svg"
          title="Akun Disetujui"
          subtitle="Apakah kamu yakin ingin menyetujui akun ini?"
          button1Text="Cancel"
          button2Text="Konfirmasi"
          button1Color="bg-[#FFFFFF]"
          button1TextColor="text-[#414651]"
          button2Color="bg-[#605BFF]"
          button2TextColor="text-[#FFFFFF]"
          onButton1Click={handleModalClose}
          onButton2Click={() => handleApprove(selectedId, type)}
        />
      )}

      {showRejectModal && (
        <ModalApprove
          image="/modal/reject-icon.svg"
          title="Akun Ditolak"
          subtitle="Apakah kamu yakin ingin menolak akun ini?"
          button1Text="Cancel"
          button2Text="Tolak"
          button1Color="bg-[#FFFFFF]"
          button1TextColor="text-[#414651]"
          button2Color="bg-[#D92D20]"
          button2TextColor="text-[#FFFFFF]"
          onButton1Click={handleModalClose}
          onButton2Click={() => handleReject(selectedId, type)}
        />
      )}

      <div className="flex items-center gap-2 text-xs font-inter font-medium mb-2">
        <Link href={`/user-list/`} className="text-[#605BFF] cursor-pointer">
          {title}
        </Link>
        <p className="text-[#2A3D4A]"> / </p>
        <p className="text-[#2A3D4A]">Persetujuan Data</p>
      </div>

      <h1 className="text-2xl font-semibold text-[#2A3D4A] mb-6">
        Persetujuan Data
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
