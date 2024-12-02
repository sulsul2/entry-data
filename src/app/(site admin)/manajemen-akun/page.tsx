"use client";
import Table from "@/components/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import ModalApprove from "@/components/modal-approval";
import ModalAdd from "@/components/modal-add";
import TextField from "@/components/textfield";
import Button from "@/components/button";
import { MdAddCircleOutline } from "react-icons/md";

interface AccountData {
  No: number;
  Username: string;
  Role: string;
  Status: JSX.Element;
  Action: JSX.Element;
}

export default function manajemenAkun() {
  const [data, setData] = useState<AccountData[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]); // Data setelah difilter
  const [search, setSearch] = useState<string>("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const header1 = ["No", "Username", "Role", "Status", "Action"];

  const getData = async () => {
    try {
      // Data lokal
      const localData = [
        {
          idUser: 1,
          namaPengguna: "Andi Lane",
          role: "data_entry",
          status: "Active",
        },
        {
          idUser: 2,
          namaPengguna: "Olivia Rhye",
          role: "manager",
          status: "Non-Active",
        },
        {
          idUser: 3,
          namaPengguna: "John Doe",
          role: "manager",
          status: "Non-Active",
        },
        {
          idUser: 4,
          namaPengguna: "Jane Smith",
          role: "admin",
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
                onClick={() => {
                  setShowDeleteModal(true);
                  setSelectedId(user.idUser);
                }}
              >
                <FiTrash2 />
              </button>

              {/* Tombol Edit */}
              <button
                className="text-[#1D4ED8] text-xl"
                onClick={() => handleOpenEditButton(user)}
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

  // Fungsi untuk menangani tombol edit
  const handleOpenEditButton = (user: any) => {
    setFormData({
      username: user.namaPengguna,
      password: "",
      role: user.role,
    });
    setShowAddModal(true);
    setSelectedId(user.idUser);
  };

  // Fungsi untuk menangani tombol tambah
  const handleOpenAddButton = () => {
    setFormData({
      username: "",
      password: "",
      role: "",
    });
    setShowAddModal(true);
    setSelectedId(null);
  };

  // Fungsi untuk menangani aksi "Setujui"
  const handleEdit = (idUser: number) => {
    console.log(`User dengan ID ${idUser} diedit.`);
    setShowAddModal(false);
  };

  // Fungsi untuk menangani aksi "Tolak"
  const handleDelete = (idUser: number | null) => {
    console.log(`User dengan ID ${idUser} didelete.`);
    setShowDeleteModal(false);
  };

  // Fungsi untuk menangani aksi "Tolak"
  const handleAdd = (idUser: number | null) => {
    console.log(`User dengan ID ${idUser} ditambahkan.`);
    setShowAddModal(false);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <>
      <div className="px-6 py-2">
        {showDeleteModal && (
          <ModalApprove
            image="/modal/delete-icon.svg"
            title="Hapus Akun"
            subtitle="Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan."
            button1Text="Cancel"
            button2Text="Delete"
            button1Color="bg-[#FFFFFF]"
            button1TextColor="text-[#414651]"
            button2Color="bg-[#D92D20]"
            button2TextColor="text-[#FFFFFF]"
            onButton1Click={handleModalClose}
            onButton2Click={() => handleDelete(selectedId)}
          />
        )}

        {showAddModal && (
          <ModalAdd
            title={selectedId ? "Edit Akun" : "Tambah Akun"}
            formData={formData}
            setFormData={setFormData}
            button1Text="Batalkan"
            button2Text={selectedId ? "Tambah" : "Simpan"}
            onButton1Click={handleModalClose}
            onButton2Click={() =>
              selectedId ? handleEdit(selectedId) : handleAdd(selectedId)
            }
          />
        )}

        <h1 className="text-2xl font-semibold text-[#605BFF] mb-6">
          Management Account
        </h1>

        <div className="flex flex-col mb-6">
          <div className="flex justify-end gap-4">
            <TextField
              name={"Search"}
              type="search"
              placeholder={"Search"}
              label={""}
              onChange={(e) => setSearch(e.target.value)}
              width={320}
            />

            <div>
              <Button
                text={"Tambah Akun"}
                type={"button"}
                width={170}
                icon={<MdAddCircleOutline className="text-lg" />}
                onClick={handleOpenAddButton}
              />
            </div>
          </div>
        </div>

        <Table data={filteredData} header={header1} isLoading={false} />
      </div>
    </>
  );
}
