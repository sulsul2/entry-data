"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import Button from "@/components/button";
import { IoMdArrowBack } from "react-icons/io";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { SiApplepodcasts } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
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
    [key in "facebook" | "instagram" | "x" | "youtube" | "podcast"]: IconType;
  } = {
    facebook: FaFacebook,
    instagram: RiInstagramFill,
    x: FaSquareXTwitter,
    youtube: FaYoutube,
    podcast: SiApplepodcasts,
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
      const response = await getWithAuth(token, `entry-lembaga/${id}`);
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
                A. Data Profil Lembaga
              </h2>

              <div className="flex flex-col md:flex-row gap-20">
                {/* Kiri */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama Lembaga
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.namaLembaga || "-"}
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
                <div>
                  <div className="mb-4 flex flex-col md:flex-row gap-4 md:gap-32">
                    {/* Social Media Accounts */}
                    <div>
                      <h3 className="text-xs text-[#414651] font-medium mb-2">
                        Akun Media Sosial
                      </h3>
                      <div className="text-sm text-[#000000] font-normal">
                        {[
                          "facebook",
                          "instagram",
                          "x",
                          "youtube",
                          "podcast",
                        ].map((platform, index) => {
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
                        {[
                          "facebook",
                          "instagram",
                          "x",
                          "youtube",
                          "podcast",
                        ].map((platform, index) => {
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
                  </div>
                </div>
              </div>
            </div>

            {/* Section B */}
            <div className="mb-12">
              <h2 className="text-lg md:text-xl text-[#2A3D4A] font-semibold mb-4">
                B. Data Pendukung Lembaga
              </h2>

              <div className="flex flex-col md:flex-row justify-between">
                {/* Kiri */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Deskripsi/Latar Belakang
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {/* {data.riwayat.parlemen.map(
                        (parlemen: string, index: number) => (
                          <li key={index}>{parlemen}</li>
                        )
                      )} */}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Visi dan Misi
                    </h3>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Visi:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Misi:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Dalam bekerja, ICW mengambil peran sebagai berikut:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Posisi ICW: Berpihak kepada masyarakat yang miskin
                        secara ekonomi, politik dan budaya dengan menganut
                        nilai:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Prinsip ICW:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Profil Pendiri
                    </h3>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Visi:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Misi:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Dalam bekerja, ICW mengambil peran sebagai berikut:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Posisi ICW: Berpihak kepada masyarakat yang miskin
                        secara ekonomi, politik dan budaya dengan menganut
                        nilai:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Profil Pengurus
                    </h3>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Visi:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Misi:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Dalam bekerja, ICW mengambil peran sebagai berikut:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-black font-medium mb-2">
                        Posisi ICW: Berpihak kepada masyarakat yang miskin
                        secara ekonomi, politik dan budaya dengan menganut
                        nilai:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                        {/* {data.riwayat.pekerjaan.map(
                          (pekerjaan: string, index: number) => (
                            <li key={index}>{pekerjaan}</li>
                          )
                        )} */}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Kanan */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jabatan di Kelompok Media
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {/* {data.riwayat.kelompok_media.map(
                        (kelompok_media: string, index: number) => (
                          <li key={index}>{kelompok_media}</li>
                        )
                      )} */}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jabatan di Organisasi
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {/* {data.riwayat.organisasi.map(
                        (organisasi: string, index: number) => (
                          <li key={index}>{organisasi}</li>
                        )
                      )} */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Data lembaga tidak ditemukan</p>
        )}
      </div>
    </div>
  );
}
