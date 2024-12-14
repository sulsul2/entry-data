"use client";
import Table from "@/components/table";
import Link from "next/link";
import { JSXElementConstructor, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import TextField from "@/components/textfield";
import ModalApprove from "@/components/modal-approval";
import {
  getWithAuth,
  patchWithAuthJson,
  putWithAuthJson,
} from "@/services/api";
import { toast } from "react-toastify";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
          "Detail",
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
          "Details",
          "Action",
        ]);
        const institutionData = getInstitutionData();
        setData(institutionData);
        setFilteredData(institutionData);
      }
    };
    fetchData();
  }, [type, current]);

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

  // Fungsi untuk transformasi data Pengguna
  const getUserData = async () => {
    try {
      setIsLoading(true);
      const response = await getWithAuth(
        "45|tfRZfRI8R3j7FN6l1KF5kIYybNV6uNoYDsFjzMVSabe8c120",
        `entry-user?page=${current}`
      );
      console.log(response);
      setTotalPages(response.data.data?.pagination.last_page);
      const apiData = response.data.data?.data || [];
      console.log("Fetched User Data:", apiData);

      const transformedData = apiData.map((user: any, index: number) => ({
        IdUser: index + 1,
        NamaPengguna: user.nama,
        JenisKelamin: user.jenis_kelamin || "-",
        Email: user.email || "-",
        Status: (
          <div
            className={`w-fit mx-auto px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-semibold text-center ${
              user.status === "waiting"
                ? "bg-[#FFFAEB] text-[#B54708]"
                : user.status === "accepted"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            {user.status}
          </div>
        ),
        Detail: (
          <Link href={`/lihat-data/${user.id}/pengguna`}>
            <div className="border-2 border-[#D5D7DA] text-xs md:text-sm py-1 md:py-2 rounded-lg">
              Lihat Detail
            </div>
          </Link>
        ),
        Action: getActionButtons(user.status, user.id),
      }));

      setIsLoading(false); // Stop loading state
      return transformedData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false); // Stop loading state even on error
      return [];
    }
  };

  // Fungsi untuk transformasi data Lembaga
  const getInstitutionData = () => {
    return data.map((lembaga) => ({
      IdLembaga: lembaga.idLembaga,
      NamaInstansi: lembaga.namaInstansi,
      Alamat: lembaga.alamat || "-",
      NoTelpon: lembaga.noTelpon || "-",
      Status: (
        <div
          className={`w-fit mx-auto px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-semibold text-center ${
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
        <Link href={`/lihat-data/${lembaga.idLembaga}/lembaga`}>
          <div className="border-2 border-[#D5D7DA] text-xs md:text-sm py-1 md:py-2 rounded-lg">
            Lihat Detail
          </div>
        </Link>
      ),
      Action: getActionButtons(lembaga.status, lembaga.idLembaga),
    }));
  };

  // Fungsi untuk menentukan tombol berdasarkan status
  const getActionButtons = (status: string, id: string) => {
    if (status === "waiting") {
      return (
        <div className="flex justify-center items-center gap-2">
          <button
            className="text-[#F04438] text-xs md:text-sm border-2 border-[#F04438] p-2 rounded-lg"
            onClick={() => {
              setShowRejectModal(true);
              setSelectedId(id);
            }}
          >
            <RxCross1 />
          </button>
          <button
            className="text-[#12B76A] text-xs md:text-sm border-2 border-[#12B76A] p-2 rounded-lg"
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
  const handleApprove = async (id: string | null, type: string | null) => {
    if (type === "data-pengguna") {
      try {
        setShowApproveModal(false);
        setIsLoading(true);
        await putWithAuthJson(
          `entry-user/status/${id}`,
          {
            status: "accepted",
          },
          "45|tfRZfRI8R3j7FN6l1KF5kIYybNV6uNoYDsFjzMVSabe8c120"
        );
        console.log(`User dengan ID ${id} berhasil diedit.`);
        setShowApproveModal(false);
        const newData = await getUserData();
        setData(newData);
        toast.success("User successfully aprroved.");
      } catch (error) {
        console.error("Error editing user:", error);
      }
    } else if (type === "data-lembaga") {
      console.log(`Lembaga dengan ID ${id} disetujui.`);
      // Tambahkan logika untuk lembaga
    }
    handleModalClose();
  };

  const handleReject = async (id: string | null, type: string | null) => {
    if (type === "data-pengguna") {
      try {
        await patchWithAuthJson(
          `entry-user/status/${id}`,
          {
            status: "rejected",
          },
          "45|tfRZfRI8R3j7FN6l1KF5kIYybNV6uNoYDsFjzMVSabe8c120"
        );
        console.log(`User dengan ID ${id} berhasil diedit.`);
        setShowRejectModal(false);
        const newData = await getUserData();
        setData(newData);
      } catch (error) {
        console.error("Error editing user:", error);
      }
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
          onButton2Click={() => {
            handleModalClose;
            handleApprove(selectedId, type);
          }}
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
          onButton2Click={() => {
            handleModalClose;
            handleReject(selectedId, type);
          }}
        />
      )}

      <div className="hidden md:flex items-center gap-2 text-xs font-inter font-medium mb-2">
        <p className="text-[#605BFF] cursor-pointer">{title}</p>
        <p className="text-[#2A3D4A]"> / </p>
        <p className="text-[#2A3D4A]">Persetujuan Data</p>
      </div>

      <h1 className="text-[#2A3D4A] font-semibold text-[16px] md:text-[24px] mb-2 md:mb-6">
        Persetujuan Data
      </h1>

      <div className="flex flex-col mb-3 md:mb-6">
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
