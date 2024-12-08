"use client";
import { FiDownload } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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

export default function DropdownButton({
  id,
  type,
}: {
  id: string;
  type: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Fungsi untuk mencari data berdasarkan ID
  const getDataById = (id: string) => {
    if (type == "data-pengguna") {
      return dataPengguna.find((item) => item.idUser === id); // Sesuaikan dengan struktur data Anda
    } else if (type == "data-lembaga") {
      return dataLembaga.find((item) => item.idLembaga === id); // Sesuaikan dengan struktur data Anda
    }
  };

  // Fungsi untuk ekspor CSV
  const handleExportCSV = (id: string) => {
    const rowData = getDataById(id);
    if (!rowData) return; // Jika data tidak ditemukan, keluar dari fungsi

    const csvRows = [
      Object.keys(rowData).join(","), // Header
      Object.values(rowData).join(","), // Data row
    ];
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${type || "data"}_${id}.csv`);
    setIsOpen(false);
  };

  // Fungsi untuk ekspor XLSX
  const handleExportXLSX = async (id: string) => {
    const rowData = getDataById(id);
    if (!rowData) return; // Jika data tidak ditemukan, keluar dari fungsi

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Tambahkan header dan data row
    worksheet.addRow(Object.keys(rowData));
    worksheet.addRow(Object.values(rowData));

    // Ekspor ke file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${type || "data"}_${id}.xlsx`);
    setIsOpen(false);
  };

  return (
    <div className="flex relative justify-center items-center">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 text-xs md:text-sm font-medium text-[#181D27] bg-white border-2 border-[#D5D7DA] rounded-md gap-2"
      >
        <div>
          <FiDownload />
        </div>
        <p>Ekspor Data</p>
        <div>
          <FaChevronDown />
        </div>
      </button>

      {isOpen && (
        <div className="z-[1000] absolute top-full mt-2 bg-white border border-[#F5F5F5] rounded-sm shadow-lg w-fit">
          <div className="p-2">
            <button
              className="flex items-left w-full text-[#181D27] text-[6px] md:text-[10px] p-1 md:p-2"
              onClick={() => handleExportCSV(id)}
            >
              Ekspor Format CSV (.csv)
            </button>
            <button
              className="flex items-left w-full text-[#181D27] text-[6px] md:text-[10px] p-1 md:p-2"
              onClick={() => handleExportXLSX(id)}
            >
              Ekspor Format XLSX (.xlsx)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
