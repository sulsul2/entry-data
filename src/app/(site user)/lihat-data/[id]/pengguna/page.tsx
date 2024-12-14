"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import Button from "@/components/button";
import { IoMdArrowBack } from "react-icons/io";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IconType } from "react-icons";
import { getWithAuth } from "@/services/api";
import Cookies from "universal-cookie";

export default function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null); // Data for the page
  const [loading, setLoading] = useState(true);
  const { id } = React.use(params);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const platformIcons: {
    [key in "facebook" | "instagram" | "linkedin"]: IconType;
  } = {
    facebook: FaFacebook,
    instagram: RiInstagramFill,
    linkedin: FaLinkedin,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getDataById(id);
        setData(userData);
        console.log(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Fungsi untuk mencari data berdasarkan ID
  const getDataById = async (id: string) => {
    try {
      const response = await getWithAuth(token, `entry-user/${id}`);
      const apiData = response.data.data; // Ambil data dari response
      return apiData; // Pastikan data sesuai dengan kebutuhan
    } catch (error) {
      console.error(`Error fetching data for ID ${id}:`, error);
      return null; // Kembalikan nilai null jika terjadi kesalahan
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading state until data is fetched
  }

  return (
    <div className="px-8 md:px-14 py-10 md:py-16 w-screen h-screen bg-white overflow-auto">
      <div className="flex flex-row gap-4 items-center mb-8 md:mb-12">
        <div className="w-8 md:w-12">
          <Button
            text={""}
            type={"button"}
            icon={<IoMdArrowBack className="text-lg md:text-2xl" />}
            onClick={() => router.back()}
          />
        </div>
        <h1 className="text-2xl md:text-3xl text-[#2A3D4A] font-semibold">
          Detail Data
        </h1>
      </div>

      <div>
        {data ? (
          <>
            {/* Section A */}
            <div className="mb-12">
              <h2 className="text-lg md:text-xl text-[#2A3D4A] font-semibold mb-4">
                A. Data Personal
              </h2>

              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Kiri */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama || "-"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenis_kelamin || "-"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempat_lahir || "-"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggal_lahir || "-"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      MBTI
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.mbti || "-"}
                    </p>
                  </div>
                </div>

                {/* Tengah */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Alamat
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.alamat || "-"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Email
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.email || "-"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nomor Telepon
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.no_telp || "-"}
                    </p>
                  </div>
                </div>

                {/* Kanan */}
                <div className="w-1/3">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Data Keluarga
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.data_keluarga || "-"}
                    </p>
                  </div>
                  {/* <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Anak
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.keluarga.anak.map((anak: string, index: number) => (
                        <span key={index}>
                          {index + 1}. {anak}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div> */}
                  <div className="mb-4 flex flex-col md:flex-row gap-4 md:gap-20">
                    <div>
                      <h3 className="text-xs text-[#414651] font-medium mb-2">
                        Akun Media Sosial
                      </h3>
                      <div className="text-sm text-[#000000] font-normal">
                        {["facebook", "instagram", "linkedin"].map(
                          (platform, index) => {
                            const Icon =
                              platformIcons[
                                platform as
                                  | "facebook"
                                  | "instagram"
                                  | "linkedin"
                              ];
                            const handle = data[platform];

                            if (!handle) return null;

                            return (
                              <div
                                key={index}
                                className="flex items-center gap-2 mb-4"
                              >
                                {Icon && <Icon className="text-xl" />}
                                <p>{handle || "-"}</p>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs text-[#414651] font-medium mb-2">
                        Jumlah Pengikut
                      </h3>
                      <div className="text-sm text-[#000000] font-normal">
                        {/* Display follower counts from all platforms */}
                        {["facebook", "instagram", "linkedin"].map(
                          (platform, index) => {
                            const followers = data[`${platform}_follow`];
                            const Icon =
                              platformIcons[
                                platform as
                                  | "facebook"
                                  | "instagram"
                                  | "linkedin"
                              ];
                            const handle = data[platform];

                            if (!handle) return null;

                            if (followers === undefined) return null;

                            return (
                              <div
                                key={index}
                                className="flex items-center gap-2 mb-4"
                              >
                                {Icon && <Icon className="text-xl" />}
                                {`${followers} followers` || "-"}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section B */}
            <div className="mb-12">
              <h2 className="text-lg md:text-xl text-[#2A3D4A] font-semibold mb-4">
                B. Riwayat Pekerjaan dan Organisasi
              </h2>

              <div className="flex flex-col md:flex-row justify-between">
                {/* Kiri */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Parlemen
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.riwayat_parlemen || "-"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Pekerjaan
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.riwayat_kerja || "-"}
                    </p>
                  </div>
                </div>

                {/* Kanan */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jabatan di Kelompok Media
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jabatan_kelompok || "-"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jabatan di Organisasi
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jabatan_organisasi || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section C */}
            <div className="mb-12">
              <h2 className="text-lg md:text-xl text-[#2A3D4A] font-semibold mb-4">
                C. Pendidikan dan Penghargaan
              </h2>

              <div className="flex flex-col md:flex-row justify-between">
                {/* Kiri */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Pendidikan
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.riwayat_pendidikan || "-"}
                    </p>
                  </div>
                </div>

                {/* Kanan */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Penghargaan
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.riwayat_penghargaan || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section D */}
            <div className="mb-12">
              <h2 className="text-xl text-[#2A3D4A] font-semibold mb-4">
                D. Data Lainnya
              </h2>

              <div className="flex flex-col md:flex-row justify-between">
                {/* Kiri */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Pemberitaan/Isu yang sering diangkat terkait Kemenkeu
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.isu_kemenkeu || "-"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Sikap ke Kemenkeu
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.sikap_kemenkeu || "-"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Hukum
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.riwayat_hukum || "-"}
                    </p>
                  </div>
                </div>

                {/* Kanan */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Rekomendasi Pendekatan
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.rekomen_pendekatan || "-"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Tingkat Pengaruh Di Masyarakat
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tingkat_pengaruh || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Data user tidak ditemukan</p>
        )}
      </div>
    </div>
  );
}
