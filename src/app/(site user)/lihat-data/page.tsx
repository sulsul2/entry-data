"use client";
import Table from "@/components/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

interface DataUser {
  IdUser: number;
  NamaPengguna: string;
  NoIdentitas: string;
  Alamat: string;
  NoTelpon: string;
  Status: string;
  Action: JSX.Element;
}

export default function persetujuan() {
  const [data, setData] = useState<DataUser[]>([]);

  const header1 = [
    "Id User",
    "Nama Pengguna",
    "No. Identitas",
    "Alamat",
    "No. Telpon",
    "Status",
    "Action",
  ];

  const getApprovalData = async () => {
    try {
      // Data lokal yang Anda miliki
      const localData = [
        {
          idUser: 1,
          namaPengguna: "Andi Lane",
          noIdentitas: "176984332667845",
          alamat: "Jl. Ganesha 10, Coblong",
          noTelpon: "081356565930",
          status: "Menunggu Persetujuan",
        },
        {
          idUser: 2,
          namaPengguna: "Olivia Rhye",
          noIdentitas: "176984332667845",
          alamat: "Jl. Ganesha 10, Coblong",
          noTelpon: "081356565930",
          status: "Menunggu Persetujuan",
        },
        {
          idUser: 3,
          namaPengguna: "Olivia Rhye",
          noIdentitas: "176984332667845",
          alamat: "Jl. Ganesha 10, Coblong",
          noTelpon: "081356565930",
          status: "Disetujui",
        },
        {
          idUser: 4,
          namaPengguna: "Olivia Rhye",
          noIdentitas: "176984332667845",
          alamat: "Jl. Ganesha 10, Coblong",
          noTelpon: "081356565930",
          status: "Ditolak",
        },
      ];

      // Transformasi data
      const transformedData = localData.map((user) => {
        return {
          IdUser: user.idUser,
          NamaPengguna: user.namaPengguna,
          NoIdentitas: user.noIdentitas,
          Alamat: user.alamat,
          NoTelpon: user.noTelpon,
          Status: user.status,
          Action: getActionButtons(user.status, user.idUser),
        };
      });

      return transformedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const approvalData = await getApprovalData();
      setData(approvalData);
    };

    fetchData();
  }, []);

  // Fungsi untuk menentukan tombol berdasarkan status
  const getActionButtons = (status: string, idUser: number) => {
    if (status === "Menunggu Persetujuan") {
      return (
        <div className="flex justify-center items-center gap-2">
          <button
            className="text-[#F04438] text-sm border-2 border-[#F04438] p-2 rounded-lg"
            onClick={() => handleReject(idUser)}
          >
            <RxCross1 />
          </button>
          <button
            className="text-[#12B76A] text-sm border-2 border-[#12B76A] p-2 rounded-lg"
            onClick={() => handleApprove(idUser)}
          >
            <FaCheck />
          </button>
        </div>
      );
    } else {
      return <p></p>;
    }
  };

  // Fungsi untuk menangani aksi "Setujui"
  const handleApprove = (idUser: number) => {
    console.log(`User dengan ID ${idUser} disetujui.`);
    // Tambahkan logika untuk memperbarui status di backend atau state lokal
  };

  // Fungsi untuk menangani aksi "Tolak"
  const handleReject = (idUser: number) => {
    console.log(`User dengan ID ${idUser} ditolak.`);
    // Tambahkan logika untuk memperbarui status di backend atau state lokal
  };

  return (
    <>
      <div className="px-6 py-2">
        <div className="flex items-center gap-2 text-xs font-inter font-medium mb-2">
          <Link href={`/user-list/`} className="text-[#605BFF] cursor-pointer">
            Data Pengguna
          </Link>
          <p className="text-[#2A3D4A]"> / </p>
          <p className="text-[#2A3D4A]">Persetujuan Data</p>
        </div>

        <h1 className="text-2xl font-semibold text-[#2A3D4A] mb-20">
          Persetujuan Data
        </h1>

        <Table data={data} header={header1} isLoading={false} />
      </div>
    </>
  );
}
