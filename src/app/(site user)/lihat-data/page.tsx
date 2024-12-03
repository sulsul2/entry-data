"use client";
import Table from "@/components/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderUser from "@/components/header-user";

interface DataUser {
  IdUser: string;
  NamaPengguna: string;
  JenisKelamin?: string;
  Email?: string;
  NoIdentitas?: string;
  Alamat: string;
  NoTelpon?: string;
  Status: JSX.Element;
  Action: JSX.Element;
}

export default function persetujuan() {
  const [data, setData] = useState<DataUser[]>([]);

  const header1 = [
    "Id User",
    "Username",
    "Jenis Kelamin",
    "Email",
    "Alamat",
    "Status",
    "Action",
  ];

  const getData = async () => {
    try {
      const localData = [
        {
          idUser: "1",
          namaPengguna: "Andi Lane",
          noIdentitas: "176984332667845",
          alamat: "Jl. Ganesha 10, Coblong",
          noTelpon: "081356565930",
          status: "Disetujui",
          jenisKelamin: "Laki-laki",
          email: "andi.lane@gmail.com",
        },
        {
          idUser: "2",
          namaPengguna: "Olivia Rhye",
          noIdentitas: "176984332667845",
          alamat: "Jl. Ganesha 10, Coblong",
          noTelpon: "081356565930",
          status: "Disetujui",
          jenisKelamin: "Perempuan",
          email: "olivia.rhye@gmail.com",
        },
        {
          idUser: "3",
          namaPengguna: "Olivia Rhye",
          noIdentitas: "176984332667845",
          alamat: "Jl. Ganesha 10, Coblong",
          noTelpon: "081356565930",
          status: "Menunggu Persetujuan", // Data ini tidak akan ditampilkan
          jenisKelamin: "Perempuan",
          email: "olivia.rhye@gmail.com",
        },
      ];

      // Filter hanya data dengan status "Disetujui"
      const approvedData = localData.filter(
        (user) => user.status === "Disetujui"
      );

      // Transformasi data
      const transformedData = approvedData.map((user) => {
        return {
          IdUser: user.idUser,
          NamaPengguna: user.namaPengguna,
          JenisKelamin: user.jenisKelamin,
          Email: user.email,
          Alamat: user.alamat,
          Status: (
            <div className="w-fit mx-auto px-2 py-1 rounded-lg text-sm font-semibold text-center bg-[#ECFDF3] text-[#027A48]">
              {user.status}
            </div>
          ),
          Action: (
            <Link
              href={`/lihat-data/${"data-pengguna"}/${user.idUser}`}
              className="border-2 border-[#D5D7DA] text-lg px-3 py-2 rounded-lg"
            >
              lihat detail
            </Link>
          ),
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
      const UserData = await getData();
      setData(UserData);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen bg-white">
      <HeaderUser />
      <div className="p-6">
        <Table data={data} header={header1} isLoading={false} />
      </div>
    </div>
  );
}
