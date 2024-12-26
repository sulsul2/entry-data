"use client";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import ModalApprove from "@/components/modal-approval";
import ModalAdd from "@/components/modal-add";
import TextField from "@/components/textfield";
import Button from "@/components/button";
import { MdAddCircleOutline } from "react-icons/md";
import {
  getWithAuth,
  patchWithAuthJson,
  deleteWithAuthJson,
  postWithAuth,
} from "@/services/api";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// import { cookies } from "next/headers";

type TransformedUser = {
  No: number; // Nomor urut, selalu berupa angka
  Username: string; // Username pengguna
  Role: string; // Role pengguna
  Status: JSX.Element; // Status dirender sebagai elemen JSX
  Action: JSX.Element; // Aksi dirender sebagai elemen JSX
};

type User = {
  id: string; // ID pengguna, diasumsikan berupa string
  username: string; // Username pengguna
  password: string; // Username pengguna
  role: string; // Role pengguna
  status: "active" | "inactive"; // Status pengguna, bisa berupa "active" atau "inactive"
};

type ValidationError = {
  name: "ValidationError";
  errors: string[]; // Array berisi pesan kesalahan validasi
};

export default function ManajemenAkun() {
  const [data, setData] = useState<TransformedUser[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<TransformedUser[]>([]); // Data setelah difilter
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nama, setNama] = useState("");
  const cookies = new Cookies();
  const customization = useSelector((state: RootState) => state.customization);
  const token = cookies.get("token");

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.lazy(() => {
      // Check if the `selectedId` is null
      if (selectedId === null) {
        return yup.string().min(8, "Password must be at least 8 characters");
      }
      return yup.string().notRequired();
    }),
  });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    status: "",
  });

  const header1 = ["No", "Username", "Role", "Status", "Action"];

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getWithAuth(
        token,
        `users?page=${current}&username=${nama}`
      );
      const apiData = response.data.data?.data || []; // Correct nested path

      setTotalPages(response.data.data?.pagination.last_page);
      const itemsPerPage = response.data.data?.pagination.per_page;

      const transformedData = apiData.map((user: User, index: number) => ({
        No: (current - 1) * itemsPerPage + index + 1,
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
      setFilteredData(UserData);
    };

    fetchData();
  }, [current, nama]);

  // Fungsi untuk filter data berdasarkan pencarian
  useEffect(() => {
    if (search) {
      const filtered = data.filter((item) => {
        // Ambil semua nilai properti kecuali elemen JSX
        const stringValues = Object.entries(item)
          .filter(
            ([value]) => typeof value === "string" || typeof value === "number"
          )
          .map(([value]) => String(value).toLowerCase());

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
  const handleOpenEditButton = (user: User) => {
    setFormData({
      username: user.username,
      password: user.password,
      role: user.role,
      status: user.status,
    });

    setSelectedId(user.id);
    setShowAddModal(true);

    console.log("Selected user:", user);
    console.log("Selected user ID:", user.id);
  };

  const handleOpenAddButton = () => {
    setFormData({
      username: "",
      password: "",
      role: "",
      status: "active",
    });
    setShowAddModal(true);
    setSelectedId(null);
  };

  const handleDelete = async (idUser: string | null) => {
    try {
      setShowDeleteModal(false);
      setIsLoading(true);
      await deleteWithAuthJson(`users/${idUser}`, token);

      const newData = await getData();
      setData(newData);

      toast.success("User successfully deleted.");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAdd = async () => {
    try {
      setIsLoading(true);
      await validationSchema.validate(formData, { abortEarly: false });
      handleModalClose();
      await postWithAuth(
        "users",
        {
          username: formData.username,
          password: formData.password,
          role: formData.role,
          status: formData.status,
        },
        token
      );
      const newData = await getData();
      setData(newData);
      toast.success("Success to add user.");
      setIsLoading(false);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "name" in error) {
        const validationError = error as ValidationError;
        if (validationError.name === "ValidationError") {
          validationError.errors.forEach((err: string) => toast.error(err));
        }
      } else {
        console.error("Error:", (error as Error).message); // Tangani error lainnya
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleEdit = async (idUser: string) => {
    try {
      setIsLoading(true);
      await validationSchema.validate(formData, { abortEarly: false }); // Validate all fields
      handleModalClose();
      await patchWithAuthJson(
        `users/${idUser}`,
        {
          username: formData.username,
          password: formData.password,
          role: formData.role,
          status: formData.status,
        },
        token
      );
      const newData = await getData();
      setData(newData);
      toast.success("User successfully edited.");
      setIsLoading(false);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "name" in error) {
        const validationError = error as ValidationError;
        if (validationError.name === "ValidationError") {
          validationError.errors.forEach((err: string) => toast.error(err));
        }
      } else {
        console.error("Error:", (error as Error).message); // Tangani error lainnya
        toast.error("An unexpected error occurred.");
      }
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
              handleModalClose();
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
            button2Text={selectedId ? "Simpan" : "Tambah"}
            onButton1Click={handleModalClose}
            onButton2Click={() =>
              selectedId ? handleEdit(selectedId) : handleAdd()
            }
            isEdit={selectedId ? true : false}
          />
        )}

        <h1
          className={`font-semibold text-${customization.color} text-[16px] md:text-[24px] mb-2 md:mb-6`}
        >
          Manajemen Akun
        </h1>

        <div className="flex flex-col md:flex-row items-end md:items-baseline md:justify-end mb-4 md:mb-6 gap-0 md:gap-4">
          <div className="flex w-52 md:w-80">
            <TextField
              name={"Search"}
              type="search"
              placeholder={"Search"}
              label={""}
              onChange={(e) => {
                setNama(e.target.value); // Update search keyword
                setSearch(e.target.value);
                setCurrent(1); // Reset to first page
              }}
            />
          </div>
          <div className="flex">
            <Button
              text={"Tambah Akun"}
              type={"button"}
              width={170}
              icon={<MdAddCircleOutline className="text-sm md:text-lg" />}
              onClick={handleOpenAddButton}
              color={customization.color}
            />
          </div>
        </div>

        <Table
          data={filteredData}
          header={header1}
          isLoading={isLoading}
          totalPages={totalPages}
          current={(curr) => setCurrent(curr)}
          active={current}
        />
      </div>
    </>
  );
}
