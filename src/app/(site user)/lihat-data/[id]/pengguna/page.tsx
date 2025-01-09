"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import Button from "@/components/button";
import { IoMdArrowBack } from "react-icons/io";
import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons";
import { getWithAuth } from "@/services/api";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";

interface UserData {
  id: string;
  nama: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  foto_profile: string;
  alamat: string;
  email: string | null;
  no_telp: string | null;
  mbti: string;
  data_keluarga: string;
  instagram: string;
  instagram_follow: number;
  facebook: string;
  facebook_follow: number;
  linkedin: string;
  linkedin_follow: number;
  riwayat_parlemen: string;
  riwayat_kerja: string;
  jabatan_kelompok: string;
  jabatan_organisasi: string;
  riwayat_pendidikan: string;
  riwayat_penghargaan: string | null;
  isu_kemenkeu: string | null;
  rekomen_pendekatan: string | null;
  sikap_kemenkeu: string | null;
  tingkat_pengaruh: string | null;
  riwayat_hukum: string | null;
  status: string;
  user_id: string;
}

export default function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null); // Data for the page
  const [loading, setLoading] = useState(true);
  const { id } = React.use(params);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const role = cookies.get("role");
  const customization = useSelector((state: RootState) => state.customization);

  const platformIcons: {
    [key in
      | "facebook"
      | "instagram"
      | "linkedin"
      | "tiktok"
      | "x"
      | "youtube"]: IconType;
  } = {
    facebook: FaFacebook,
    instagram: RiInstagramFill,
    linkedin: FaLinkedin,
    tiktok: FaTiktok,
    x: FaSquareXTwitter,
    youtube: FaYoutube,
  };

  const platforms: Array<"facebook" | "instagram" | "linkedin"> = [
    "facebook",
    "instagram",
    "linkedin",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getDataById(id);
        console.log(userData);
        setData(userData);
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
      // Tentukan endpoint berdasarkan role
      let endpoint = "";
      if (role === "user_kementerian") {
        endpoint = `user-kementerian/${id}`;
      } else if (role === "manager" || role == "data_entry") {
        endpoint = `entry-user/${id}`;
      } else {
        throw new Error("Role tidak dikenali");
      }

      const response = await getWithAuth(token, endpoint);
      console.log(response);
      const apiData = response.data.data;
      return apiData;
    } catch (error) {
      console.error(error);
      return null;
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
            color={customization.color}
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
                  <div className="mb-8">
                    <h2 className="text-lg md:text-xl text-[#2A3D4A] font-semibold mb-4">
                      Foto
                    </h2>
                    {data.foto_profile ? (
                      <Image
                        src={data.foto_profile}
                        alt=""
                        className="w-28 md:w-52 border-2 border-gray-300 rounded-xl p-4"
                        width={28}
                        height={28}
                      />
                    ) : null}
                  </div>
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
                </div>

                {/* Tengah */}
                <div>
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
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Alamat
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.alamat || "-",
                      }}
                    />
                  </div>
                </div>

                {/* Kanan */}
                <div className="w-1/3">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Data Keluarga
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.data_keluarga || "-",
                      }}
                    />
                  </div>
                  <div className="mb-4 flex flex-col md:flex-row gap-4 md:gap-20">
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
                                | "linkedin"
                                | "tiktok"
                                | "x"
                                | "youtube"
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
                    <div>
                      <h3 className="text-xs text-[#414651] font-medium mb-2">
                        Jumlah Pengikut
                      </h3>
                      <div className="text-sm text-[#000000] font-normal">
                        {/* Display follower counts from all platforms */}
                        {platforms.map((platform, index) => {
                          const followers = data[`${platform}_follow`];
                          const Icon =
                            platformIcons[
                              platform as
                                | "facebook"
                                | "instagram"
                                | "linkedin"
                                | "tiktok"
                                | "x"
                                | "youtube"
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
                B. Riwayat Pekerjaan dan Organisasi
              </h2>

              <div className="flex flex-col md:flex-row justify-between">
                {/* Kiri */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Parlemen
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.riwayat_parlemen || "-",
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Pekerjaan
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.riwayat_kerja || "-",
                      }}
                    />
                  </div>
                </div>

                {/* Kanan */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jabatan di Kelompok Media
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.jabatan_kelompok || "-",
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jabatan di Organisasi
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.jabatan_organisasi || "-",
                      }}
                    />
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
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.riwayat_pendidikan || "-",
                      }}
                    />
                  </div>
                </div>

                {/* Kanan */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Penghargaan
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.riwayat_penghargaan || "-",
                      }}
                    />
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
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.isu_kemenkeu || "-",
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Sikap ke Kemenkeu
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.sikap_kemenkeu || "-",
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Hukum
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.riwayat_hukum || "-",
                      }}
                    />
                  </div>
                </div>

                {/* Kanan */}
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Rekomendasi Pendekatan
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.rekomen_pendekatan || "-",
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Tingkat Pengaruh Di Masyarakat
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.tingkat_pengaruh || "-",
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      MBTI
                    </h3>
                    <div
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: data.mbti || "-",
                      }}
                    />
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
