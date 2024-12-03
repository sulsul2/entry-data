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
      pekerjaan: [
        "Special Advisor Wakil Presiden Jusuf Kalla (2015 – 2020)",
        "Special Advisor Kementerian Koordinator Bidang Perekonomian (2020 – Present)",
      ],
      organisasi: [
        "Chairman, APINDO (2023 – Present)",
        "Pendiri, Angel Investment Network Indonesia",
      ],
    },
    pendidikan: [
      "S1, Barnard College of Columbia University New York (1989 – xxx)",
      "S2, Harvard Business School (2002 – xxx)",
    ],
  },
];

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
  params: Promise<{ type: string; id: string }>;
}) {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null); // Data for the page
  const [loading, setLoading] = useState(true);
  const { type, id } = React.use(params);

  useEffect(() => {
    if (type === "data-pengguna") {
      const userData = getUserDataByID(id);
      setData(userData);
    } else if (type === "data-lembaga") {
      const institutionData = getInstitutionDataByID(id);
      setData(institutionData);
    }
    setLoading(false); // Mark as loaded
  }, [type, id]);

  function getUserDataByID(id: string) {
    const user = DataPengguna.find((user) => user.idUser === id);
    return user || null;
  }

  function getInstitutionDataByID(id: string) {
    const institution = DataLembaga.find((lembaga) => lembaga.idLembaga === id);
    return institution || null;
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
        {type === "data-pengguna" && data ? (
          <>
            {/* Section A */}
            <div className="mb-12">
              <h2 className="text-xl text-[#2A3D4A] font-semibold mb-4">
                A. Data Personal
              </h2>

              <div className="flex flex-row justify-between">
                {/* Kiri */}
                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
                    </p>
                  </div>
                  <div className="mb-3">
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
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Alamat
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.alamat}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Email
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.email}
                    </p>
                  </div>
                  <div className="mb-3">
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
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Data Keluarga Inti
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.keluarga.suami}
                    </p>
                  </div>
                  <div className="mb-3">
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
                  <div className="mb-3 flex flex-row gap-20">
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
              <div className="flex flex-row gap-28">
                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      MBTI
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.mbti || "-"}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      MBTI
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.mbti || "-"}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      MBTI
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.mbti || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section C */}
            <div className="mb-12">
              <h2 className="text-xl text-[#2A3D4A] font-semibold mb-4">
                C. Pendidikan dan Penghargaan{" "}
              </h2>
              <div className="flex flex-row gap-28">
                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      MBTI
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.mbti || "-"}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      MBTI
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.mbti || "-"}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      MBTI
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.mbti || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section D */}
            <div className="mb-12">
              <h2 className="text-xl text-[#2A3D4A] font-semibold mb-4">
                D. Data Lainnya{" "}
              </h2>
              <div className="flex flex-row gap-28">
                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      MBTI
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.mbti || "-"}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      MBTI
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.mbti || "-"}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nama}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Jenis Kelamin:
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.jenisKelamin}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tempat Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tempatLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Tanggal Lahir
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.tanggalLahir}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      MBTI
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.mbti || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : type === "data-lembaga" && data ? (
          <>
            {/* Section A */}
            <div className="mb-12">
              <h2 className="text-xl text-[#2A3D4A] font-semibold mb-4">
                A. Data Profil Lembaga{" "}
              </h2>

              <div className="flex flex-row justify-between">
                {/* Kiri */}
                <div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nama Lembaga
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.namaLembaga}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Alamat
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.alamat}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Email
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.email}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Nomor Kontak
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.nomorKontak}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3 className="text-xs text-[#414651] font-medium mb-1">
                      Link Website
                    </h3>
                    <p className="text-sm text-[#000000] font-semibold">
                      {data.linkWebsite}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Type tidak dikenali</p>
        )}
      </div>
    </div>
  );
}
