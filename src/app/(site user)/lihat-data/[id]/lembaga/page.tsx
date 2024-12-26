"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import Button from "@/components/button";
import { IoMdArrowBack } from "react-icons/io";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { SiApplepodcasts, SiBukalapak } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons";
import { getWithAuth } from "@/services/api";
import Cookies from "universal-cookie";

interface LembagaData {
  id: string;
  nama: string;
  alamat: string;
  email: string;
  no_kontak: string;
  link_web_lembaga: string;
  instagram: string;
  instagram_follow: number;
  facebook: string;
  facebook_follow: number;
  x: string;
  x_follow: number;
  youtube: string;
  youtube_follow: number;
  podcast: string;
  podcast_follow: number;
  e_commerce: string;
  latar_belakang: string;
  visi_misi: string;
  profil_pendiri: string;
  profil_pengurus: string;
  keanggotaan: string;
  prominent_kol: string;
  bidang_usaha_gerak: string;
  isu_diangkat: string;
  pengamat_rujukan: string;
  afiliasi_ngo_parpol: string;
  pengaruh_masyarakat: string;
  pihak_belakang_ngo: string;
  sumber_dana: string;
  jumlah_cabang_anggota: string;
  segmentasi_dasar: string;
  sikap_pemerintah: string;
  rekom_pendekatan_icw: string;
  analisis_pengaruh: string;
  kesimpulan: string;
  status: string;
  user_id: string | null;
}

export default function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [data, setData] = useState<LembagaData | null>(null); // Data for the page
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = React.use(params);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const platformIcons: {
    [key in "facebook" | "instagram" | "x" | "youtube" | "podcast"]: IconType;
  } = {
    facebook: FaFacebook,
    instagram: RiInstagramFill,
    x: FaSquareXTwitter,
    youtube: FaYoutube,
    podcast: SiApplepodcasts,
  };

  const platforms: Array<
    "facebook" | "instagram" | "x" | "youtube" | "podcast"
  > = ["facebook", "instagram", "x", "youtube", "podcast"];

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
      const response = await getWithAuth(token, `entry-lembaga/${id}`);
      const apiData = response.data.data; // Ambil data dari response
      return apiData; // Pastikan data sesuai dengan kebutuhan
    } catch (error) {
      console.error(`Error fetching data for ID ${id}:`, error);
      return null; // Kembalikan nilai null jika terjadi kesalahan
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#414651] border-solid"></div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    );
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
                A. Data Profil Lembaga
              </h2>

              <div className="flex flex-col md:flex-row md:gap-20">
                {/* Kiri */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama Lembaga
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama || "-"}
                    </p>
                  </div>
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
                      Nomor Kontak
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.no_kontak || "-"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Link Website
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.link_web_lembaga || "-"}
                    </p>
                  </div>
                </div>

                {/* Tengah */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-32">
                  {/* Social Media Accounts */}
                  <div>
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Akun Media Sosial
                    </h3>
                    <div className="text-sm text-[#000000] font-normal">
                      {platforms.map((platform, index) => {
                        const Icon =
                          platformIcons[
                            platform as
                              | "facebook"
                              | "instagram"
                              | "x"
                              | "youtube"
                              | "podcast"
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
                      })}
                    </div>
                  </div>

                  {/* Follower Count */}
                  <div>
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jumlah Pengikut
                    </h3>
                    <div className="text-sm text-[#000000] font-normal">
                      {platforms.map((platform, index) => {
                        const Icon =
                          platformIcons[
                            platform as
                              | "facebook"
                              | "instagram"
                              | "x"
                              | "youtube"
                              | "podcast"
                          ];
                        const handle = data[platform];

                        if (!handle) return null;
                        const followers = data[`${platform}_follow`];

                        if (followers === undefined) return null;

                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2 mb-4"
                          >
                            {Icon && <Icon className="text-xl" />}
                            {followers ? `${followers} followers` : "-"}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* E-Commerce */}
                  <div>
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Akun E-commerce
                    </h3>
                    <p className="flex items-center gap-2 text-sm text-[#000000] font-normal">
                      <SiBukalapak className="text-xl" />
                      {data.e_commerce}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section B */}
            <div className="">
              <h2 className="text-lg md:text-xl text-[#2A3D4A] font-semibold mb-4">
                B. Data Pendukung Lembaga
              </h2>

              <div className="flex flex-col md:flex-row justify-evenly">
                {/* Kiri */}
                <div className="">
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Deskripsi/Latar Belakang
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.latar_belakang || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Visi dan Misi
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.visi_misi || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Profil Pendiri
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.profil_pendiri || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Profil Pengurus
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.profil_pengurus || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Keanggotaan
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.keanggotaan || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Prominent Kol
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.prominent_kol || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Bidang Usaha Pergerakan
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.bidang_usaha_gerak || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Isu yang Sering Diangkat
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.isu_diangkat || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Pengamat Yang Sering Dijadikan Rujukan
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.pengamat_rujukan || "-"}
                    </p>
                  </div>
                </div>

                {/* Kanan */}
                <div className="ml-0 md:ml-20">
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Afiliasi Keterkaitan Dengan NGO/Parpol
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.afiliasi_ngo_parpol || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Tingkat Pengaruh Di Masyarakat
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.pengaruh_masyarakat || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Pihak Dibelakang NGO
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.pihak_belakang_ngo || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Sumber Pendanaan
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.sumber_dana || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jumlah Cabang/Anggota/Pengikut
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jumlah_cabang_anggota || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Segmentasi Yang Disasar
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.segmentasi_dasar || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Sikap Ke Pemerintah
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.sikap_pemerintah || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Rekomendasi Pendekatan Ke ICW
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.rekom_pendekatan_icw || "-"}
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Analisis Pengaruh Lembaga Dengan Pendekatan Kuantitatif
                      (Asumsi)
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.analisis_pengaruh || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12 w-full">
              <h3 className="text-xs text-[#414651] font-medium mb-2">
                Kesimpulan
              </h3>
              <p className="text-sm text-[#000000] font-semibold">
                {data.kesimpulan || "-"}
              </p>
            </div>
          </>
        ) : (
          <p>Data lembaga tidak ditemukan</p>
        )}
      </div>
    </div>
  );
}
