"use client";
import Table from "@/components/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

interface AccountData {
  No: number;
  Username: string;
  Role: string;
  Status: JSX.Element;
  Action: JSX.Element;
}

export default function manajemenAkun() {
  const [data, setData] = useState<AccountData[]>([]);

  const header1 = ["No", "Username", "Role", "Status", "Action"];

  const getData = async () => {
    try {
      // Data lokal
      const localData = [
        {
          idUser: 1,
          namaPengguna: "Andi Lane",
          role: "Data Entry",
          status: "Active",
        },
        {
          idUser: 2,
          namaPengguna: "Olivia Rhye",
          role: "Manager",
          status: "Non-Active",
        },
        {
          idUser: 3,
          namaPengguna: "John Doe",
          role: "Kementrian",
          status: "Non-Active",
        },
        {
          idUser: 4,
          namaPengguna: "Jane Smith",
          role: "Manager",
          status: "Active",
        },
      ];

      // Transformasi data
      const transformedData = localData.map((user, index) => {
        return {
          No: index + 1,
          Username: user.namaPengguna,
          Role: user.role,
          Status: (
            <div
              className={`w-fit justify-center items-center mx-auto px-2 py-1 rounded-2xl text-sm font-semibold ${
                user.status === "Active"
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : "bg-[#FEF3F2] text-[#B42318]"
              }`}
            >
              {user.status}
            </div>
          ),
          Action: (
            <div className="flex justify-center items-center gap-4">
              {/* Tombol Delete */}
              <button
                className="text-[#DC2626] text-xl"
                onClick={() => handleDelete(user.idUser)}
              >
                <FiTrash2 />
              </button>

              {/* Tombol Edit */}
              <button
                className="text-[#1D4ED8] text-xl"
                onClick={() => handleEdit(user.idUser)}
              >
                <FiEdit2 />
              </button>
            </div>
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

  // Fungsi untuk menangani aksi "Setujui"
  const handleEdit = (idUser: number) => {
    console.log(`User dengan ID ${idUser} diedit.`);
    // Tambahkan logika untuk memperbarui status di backend atau state lokal
  };

  // Fungsi untuk menangani aksi "Tolak"
  const handleDelete = (idUser: number) => {
    console.log(`User dengan ID ${idUser} didelete.`);
    // Tambahkan logika untuk memperbarui status di backend atau state lokal
  };

  // Fungsi untuk menangani aksi "Tolak"
  const handleAdd = (idUser: number) => {
    console.log(`User dengan ID ${idUser} ditambahkan.`);
    // Tambahkan logika untuk memperbarui status di backend atau state lokal
  };

  return (
    <>
      <div className="px-6 py-2">
        <h1 className="text-2xl font-semibold text-[#605BFF] mb-20">
          Management Account
        </h1>

        <Table data={data} header={header1} isLoading={false} />
      </div>
    </>
  );
}
