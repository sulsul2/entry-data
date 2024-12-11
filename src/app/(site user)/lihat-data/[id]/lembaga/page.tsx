"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import Button from "@/components/button";
import { IoMdArrowBack } from "react-icons/io";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { IconType } from "react-icons";

const DataLembaga = [
  {
    idLembaga: "1",
    namaLembaga: "Kemenkeu",
    akunMediaSosial: "@sahabaticw",
    jumlahPengikut: "1.000 followers",
    akunEcommerce: "Sahabat ICW",
    alamat: "Jl. Ganesha 10, Tamansari, Coblong, Dago, Kota Bandung",
    email: "shintakamdani@gmail.com",
    nomorKontak: "+6281817XXXX",
    linkWebsite: "https://antikorupsi.org/id",
    deskripsi:
      "Indonesia Corruption Watch lahir di tengah gejolak reformasi 98, tepatnya 21 Juni 1998. Digawangi beberapa aktivis YLBHI, ICW berdiri dengan keyakinan bahwa korupsi harus diberantas...",
    mediaSosial: {
      instagram: "@sahabaticw",
      facebook: "@sahabaticw",
      x: "@sahabaticw",
      Youtube: "@sahabaticw",
      linkedin: "@sahabaticw",
    },
    afiliasiNGO: [
      "YLBHI",
      "LBH Jakarta",
      "ELSAM",
      "Kesatuan Aksi Serikat Buruh Indonesia (KASBI)",
      "BEM Seluruh Indonesia (BEM SI) Kerakyatan",
      "KontraS",
      "Imparsial",
      "Public Virtue Indonesia",
      "Puskapol UI",
      "KoDE Inisiatif",
      "Perludem",
      "Transparency International Indonesia (TII)",
      "Seknas Fitra",
      "Yayasan TIFA",
      "USAID",
      "GIZ Jerman",
      "HIVOS",
      "UNODC",
      "Cakra Wikara Indonesia",
      "Extinction Rebellion",
      "INDEF",
      "Visi Law Office",
      "WALHI",
      "Aliansi Masyarakat Adat Nasional",
      "Pusat Studi Hukum Kebijakan Indonesia",
      "Narasi Newsroom",
      "PUKAT UGM",
      "STHI Jentera",
      "LBH APIK",
      "Publish What You Pay Indonesia",
      "Tempo Majalah",
      "Greenpeace",
    ],
    visi: "Menguatnya posisi tawar rakyat untuk mengontrol negara...",
    misi: [
      "Memperjuangkan terwujudnya sistem politik, hukum, ekonomi, dan birokrasi yang bersih dari korupsi...",
      "Memperkuat partisipasi rakyat dalam proses pengambilan dan pengawasan kebijakan publik...",
    ],
    tingkatPengaruh:
      "Memiliki pengaruh yang besar di kalangan aktivis anti korupsi, aktivis pembela HAM, dan mahasiswa...",
    sumberDana: ["Sumbangan masyarakat", "Sponsor"],
    pendiri: [
      {
        nama: "Teten Masduki",
        profil: "Teten berasal dari Garut, Jawa Barat, 6 Mei 1963...",
      },
      {
        nama: "Todung Mulya Lubis",
        profil: "Lahir di Tapanuli Selatan pada tanggal 4 Juli 1949...",
      },
      {
        nama: "Faisal Basri",
        profil:
          "Faisal Basri lebih dikenal sebagai seorang ekonom dan politisi...",
      },
      {
        nama: "Ani Soetjipto",
        profil:
          "Ani Soetjipto adalah pengajar senior di Departemen Hubungan Internasional Universitas Indonesia...",
      },
    ],
    pengurus: {
      dewanEtik: [
        { koordinator: "Dadang Trisasongko" },
        { anggota: "dra. Ani Soetjipto, MA" },
        { anggota: "Ny. Kamala Chandrakirana" },
      ],
      badanPengurus: [{ koordinator: "Adnan Topan Husodo" }],
    },
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
    const institutionData = getInstitutionDataByID(id);
    setData(institutionData);
    setLoading(false); // Mark as loaded
  }, [id]);

  function getInstitutionDataByID(id: string) {
    const institution = DataLembaga.find((lembaga) => lembaga.idLembaga === id);
    return institution || null;
  }

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
                      {data.namaLembaga}
                    </p>
                  </div>
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
                      Nomor Kontak
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nomorKontak}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Link Website
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.linkWebsite || "-"}
                    </p>
                  </div>
                </div>

                {/* Tengah */}
                <div>
                  <div className="mb-4 flex flex-col md:flex-row gap-4 md:gap-32">
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
                              } else if (key === "Youtube") {
                                Icon = FaYoutube;
                              } else if (key === "x") {
                                Icon = FaTwitter;
                              }

                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 mb-6"
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
                    <div>
                      <h3 className="text-xs text-[#414651] font-medium mb-2">
                        Akun E-commerce
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
