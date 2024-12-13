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
import {
  get,
  post,
  getWithAuth,
  patchWithAuthJson,
  deleteWithAuthJson,
} from "@/services/api";
import { toast, ToastContainer } from "react-toastify";
// import { cookies } from "next/headers";

export default function manajemenAkun() {
  const [data, setData] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]); // Data setelah difilter
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const header1 = ["No", "Username", "Role", "Status", "Action"];

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getWithAuth(
        "44|VZCpIetN36UXZtjUFNx8ir1AbnTVbJNFWhW927pxaacbb508",
        `users?page=${current}`
      );
      setTotalPages(response.data.data?.pagination.last_page);
      console.log("API Response:", response.data); // Debug log
      const apiData = response.data.data?.data || []; // Correct nested path
      console.log("User Data Array:", apiData); // Debug log
      const transformedData = apiData.map((user: any, index: number) => ({
        No: index + 1,
        Username: user.username,
        Role: user.role,
        Status: (
          <div
            className={`w-fit justify-center items-center mx-auto px-2 py-1 rounded-2xl text-xs md:text-sm font-semibold ${
              user.status === "active"
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
              className="text-[#DC2626] text-base md:text-xl"
              onClick={() => {
                setShowDeleteModal(true);
                setSelectedId(user.id);
              }}
            >
              <FiTrash2 />
            </button>

            {/* Tombol Edit */}
            <button
              className="text-[#1D4ED8] text-base md:text-xl"
              onClick={() => handleOpenEditButton(user)}
            >
              <FiEdit2 />
            </button>
          </div>
        ),
      }));
      return transformedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const UserData = await getData();
      setData(UserData);
    };

    fetchData();
  }, [current]);

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

  const handleOpenAddButton = () => {
    setFormData({
      username: "",
      password: "",
      role: "",
    });
    setShowAddModal(true);
    setSelectedId(null);
  };

  const handleEdit = async (idUser: number) => {
    try {
      await patchWithAuthJson(
        `users/${idUser}`,
        {
          username: formData.username,
          password: formData.password,
          role: formData.role,
        },
        "44|VZCpIetN36UXZtjUFNx8ir1AbnTVbJNFWhW927pxaacbb508"
      );
      console.log(`User dengan ID ${idUser} berhasil diedit.`);
      setShowAddModal(false);
      const newData = await getData();
      setData(newData);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDelete = async (idUser: number | null) => {
    try {
      if (idUser) {
        setShowDeleteModal(false);
        setIsLoading(true);
        await deleteWithAuthJson(
          `users/${idUser}`,
          "44|VZCpIetN36UXZtjUFNx8ir1AbnTVbJNFWhW927pxaacbb508"
        );
        console.log(`User dengan ID ${idUser} berhasil dihapus.`);
        const newData = await getData();
        setData(newData);
      }
      toast.success("User successfully deleted.");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await post(`users`, {
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });
      console.log("User berhasil ditambahkan:", response.data);
      setShowAddModal(false);
      const newData = await getData();
      setData(newData);
    } catch (error) {
      console.error("Error adding user:", error);
    }
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
            onButton2Click={() => {
              handleModalClose;
              handleDelete(selectedId);
            }}
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
              selectedId ? handleEdit(selectedId) : handleAdd()
            }
          />
        )}

        <h1 className="font-semibold text-[#605BFF] text-[16px] md:text-[24px] mb-2 md:mb-6">
          Management Account
        </h1>

        <div className="flex flex-col md:flex-row items-end md:items-baseline md:justify-end mb-4 md:mb-6 gap-0 md:gap-4">
          <div className="flex w-52 md:w-80">
            <TextField
              name={"Search"}
              type="search"
              placeholder={"Search"}
              label={""}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex">
            <Button
              text={"Tambah Akun"}
              type={"button"}
              width={170}
              icon={<MdAddCircleOutline className="text-sm md:text-lg" />}
              onClick={handleOpenAddButton}
            />
          </div>
        </div>

        <Table
          data={filteredData}
          header={header1}
          isLoading={isLoading}
          totalPages={totalPages}
          current={(curr) => setCurrent(curr)}
        />
      </div>
    </>
  );
}
