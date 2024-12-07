"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import Button from "@/components/button";
import { IoMdArrowBack } from "react-icons/io";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";

const DataPengguna = [
  {
    idUser: "1",
    nama: "Shinta W. Kamdani",
    alamat: "Jl. Ganesha 10, Tamansari, Coblong, Dago, Kota Bandung",
    jenisKelamin: "Perempuan",
    tempatLahir: "Jakarta",
    tanggalLahir: "8 Februari 1967",
    kontak: "+6287817XXXX",
    email: "shintakamdani@gmail.com",
    mbti: "",
    keluarga: {
      suami: "Irwan Kamdani",
      anak: [
        "Syailendra Kamdani",
        "Irela Katya Kamdani",
        "Abaya Kamdani",
        "Latissa Kamdani",
      ],
    },
    mediaSosial: {
      instagram: "@shintawidjakamdani",
      facebook: "Shinta W. Kamdani",
      linkedin: "Shinta Kamdani",
    },
    riwayat: {
      parlemen: [
        "Special Advisor Wakil Preside Jusuf Kalla, Kantor Staf Presiden Republik Indonesia (2015 – 2020)",
        "Special Advisor Kementerian Koordinator Bidang Perekonomian (2020 – Present)",
        "Coordinating Vice Chairwoman for Maritime, Investment and Foreign Affairs, KADIN (2001 – Present)",
      ],
      pekerjaan: [
        "Board Member, PT. Tira Austenite Tbk (1998 – Present)",
        "Board Member, PT. Tigaraksa Satria, Tbk (1998 – Present)",
        "Commissioner, PT. Blue Gas Indonesia (2005 – Present)",
        "Founder, IBCSD (2011 – Present)",
        "Founder IBCWE (2016 – Present)",
        "Regional Coordinator Asia - Pacific, International Chamber of Commerce (2021 – Present)",
        "Chief Executive Officer, Sintesa Group (1999 – Present)",
        "Chairman, APINDO (2023 – Present)",
        "Member, GISD Alliance",
        "Member, APEC Business Advisory Council",
        "Pendiri, Angel Investment Network Indonesia (ANGIN)",
      ],
      organisasi: [
        "Member, GISD Alliance",
        "Member, APEC Business Advisory Council",
        "Pendiri, Indonesia Business Council for Sustainable Develop",
        "Pendiri, Koalisi Bisnis Indonesia untuk Pemberdayaan Perem",
        "Ketua Umum, ASOSIASI PENGUSAHA INDONESIA (APINDO)",
        "Wakil Koordinator III, Kamar Dagang dan Industri Indonesia (KADIN)",
        "Pendiri, Angel Investment Network Indonesia (ANGIN)",
      ],
      kelompok_media: [
        "Special Advisor Wakil Preside Jusuf Kalla, Kantor Staf Presiden Republik Indonesia (2015 – 2020)",
        "Special Advisor Kementerian Koordinator Bidang Perekonomian (2020 – Present)",
        "Coordinating Vice Chairwoman for Maritime, Investment and Foreign Affairs, KADIN (2001 – Present)",
      ],
    },
    pendidikan: [
      "S1, Barnard College of Columbia University New York (1989 – xxx)",
      "S2, Harvard Business School (2002 – xxx)",
    ],
  },
];

export default function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null); // Data for the page
  const [loading, setLoading] = useState(true);
  const { id } = React.use(params);

  useEffect(() => {
    const userData = getUserDataByID(id);
    setData(userData);
    setLoading(false); // Mark as loaded
  }, [id]);

  function getUserDataByID(id: string) {
    const user = DataPengguna.find((user) => user.idUser === id);
    return user || null;
  }

  if (loading) {
    return <p>Loading...</p>; // Display loading state until data is fetched
  }

  return (
    <div className="px-14 py-16 w-screen h-screen bg-white overflow-auto">
      <div className="flex flex-row gap-4 items-center mb-12">
        <Button
          text={""}
          type={"button"}
          icon={<IoMdArrowBack className="text-2xl" />}
          onClick={() => router.back()}
          width={48}
        />
        <h1 className="text-3xl text-[#2A3D4A] font-semibold">Detail Data</h1>
      </div>

      <div>
        {data ? (
          <>
            {/* Section A */}
            <div className="mb-12">
              <h2 className="text-xl text-[#2A3D4A] font-semibold mb-4">
                A. Data Personal
              </h2>

              <div className="flex flex-row justify-between">
                {/* Kiri */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
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
                      {data.alamat}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Email
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.email}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nomor Telepon
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.kontak}
                    </p>
                  </div>
                </div>

                {/* Kanan */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Data Keluarga Inti
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.keluarga.suami}
                    </p>
                  </div>
                  <div className="mb-4">
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
                  </div>
                  <div className="mb-4 flex flex-row gap-20">
                    <div>
                      <h3 className="text-xs text-[#414651] font-medium mb-2">
                        Akun Media Sosial
                      </h3>
                      <div className="text-sm text-[#000000] font-semibold">
                        {data.mediaSosial &&
                          Object.entries(data.mediaSosial).map(
                            ([key, value], index) => {
                              let Icon: IconType | undefined;

                              if (key === "instagram") {
                                Icon = FaInstagram;
                              } else if (key === "facebook") {
                                Icon = FaFacebook;
                              } else if (key === "linkedin") {
                                Icon = FaLinkedin;
                              }

                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 mb-4"
                                >
                                  {Icon && <Icon className="text-xl" />}
                                  <p>{value as string}</p>
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
                      <p className="text-sm text-[#000000] font-semibold">
                        {data.tempatLahir}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section B */}
            <div className="mb-12">
              <h2 className="text-xl text-[#2A3D4A] font-semibold mb-4">
                B. Riwayat Pekerjaan dan Organisasi
              </h2>

              <div className="flex flex-row justify-between">
                {/* Kiri */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Parlemen
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {data.riwayat.parlemen.map(
                        (parlemen: string, index: number) => (
                          <li key={index}>{parlemen}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Riwayat Pekerjaan
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {data.riwayat.pekerjaan.map(
                        (pekerjaan: string, index: number) => (
                          <li key={index}>{pekerjaan}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Kanan */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jabatan di Kelompok Media
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {data.riwayat.kelompok_media.map(
                        (kelompok_media: string, index: number) => (
                          <li key={index}>{kelompok_media}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jabatan di Organisasi
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {data.riwayat.organisasi.map(
                        (organisasi: string, index: number) => (
                          <li key={index}>{organisasi}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section C */}
            <div className="mb-12">
              <h2 className="text-xl text-[#2A3D4A] font-semibold mb-4">
                C. Pendidikan dan Penghargaan
              </h2>

              <div className="flex flex-row justify-between">
                {/* Kiri */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Pemberitaan/Isu yang sering diangkat terkait Kemenkeu{" "}
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {data.riwayat.parlemen.map(
                        (parlemen: string, index: number) => (
                          <li key={index}>{parlemen}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Kanan */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jabatan di Kelompok Media
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {data.riwayat.kelompok_media.map(
                        (kelompok_media: string, index: number) => (
                          <li key={index}>{kelompok_media}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section D */}
            <div className="mb-12">
              <h2 className="text-xl text-[#2A3D4A] font-semibold mb-4">
                D. Data Lainnya{" "}
              </h2>

              <div className="flex flex-row justify-between">
                {/* Kiri */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Pemberitaan/Isu yang sering diangkat terkait Kemenkeu{" "}
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {data.riwayat.parlemen.map(
                        (parlemen: string, index: number) => (
                          <li key={index}>{parlemen}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Kanan */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-2">
                      Jabatan di Kelompok Media
                    </h3>
                    <ul className="list-disc list-inside text-sm text-[#000000] font-semibold">
                      {data.riwayat.kelompok_media.map(
                        (kelompok_media: string, index: number) => (
                          <li key={index}>{kelompok_media}</li>
                        )
                      )}
                    </ul>
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
