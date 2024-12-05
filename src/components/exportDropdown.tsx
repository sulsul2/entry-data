"use client";
import { FiDownload } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function DropdownButton({
  id,
  type,
}: {
  id: string;
  type: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Fungsi untuk menangani aksi ekspor
  const handleExportCSV = (id: string | null, type: string | null) => {
    if (type === "data-pengguna") {
      console.log(`Pengguna dengan ID ${id} disetujui.`);
      // Tambahkan logika untuk pengguna
    } else if (type === "data-lembaga") {
      console.log(`Lembaga dengan ID ${id} disetujui.`);
      // Tambahkan logika untuk lembaga
    }

    setIsOpen(false);
  };

  // Fungsi untuk menangani aksi ekspor
  const handleExportXLSX = (id: string | null, type: string | null) => {
    if (type === "data-pengguna") {
      console.log(`ID ${id}, type ${type}`);
      // Tambahkan logika untuk pengguna
    } else if (type === "data-lembaga") {
      console.log(`ID ${id}, type ${type}`);
      // Tambahkan logika untuk lembaga
    }

    setIsOpen(false);
  };

  return (
    <div className="flex relative justify-center items-center">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 text-sm font-medium text-[#181D27] bg-white border-2 border-[#D5D7DA] rounded-md gap-2"
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
              className="flex items-left w-full p-2 text-[#181D27] text-[10px]"
              onClick={() => handleExportCSV(id, type)}
            >
              Ekspor Format CSV (.csv)
            </button>
            <button
              className="flex items-left w-full p-2 text-[#181D27] text-[10px]"
              onClick={() => handleExportXLSX(id, type)}
            >
              Ekspor Format XLSX (.xlsx)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
