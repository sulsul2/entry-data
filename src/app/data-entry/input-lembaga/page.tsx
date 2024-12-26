"use client";
import Button from "@/components/button";
import { CustomTextEditor } from "@/components/texteditor";
import TextField from "@/components/textfield";
import { postWithAuthJson } from "@/services/api";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiInstagramLogoFill } from "react-icons/pi";
import { SiApplepodcasts, SiBukalapak } from "react-icons/si";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export default function DataEntryLembaga() {
  const router = useRouter();
  const cookies = new Cookies();
  const userId = cookies.get("user_id");
  const customization = useSelector((state: RootState) => state.customization);
  console.log(customization.color);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    email: "",
    no_kontak: "",
    instagram: "",
    instagram_follow: "",
    facebook: "",
    facebook_follow: "",
    x: "",
    x_follow: "",
    youtube: "",
    youtube_follow: "",
    podcast: "",
    podcast_follow: "",
    link_web_lembaga: "",
    e_commerce: "",
    latar_belakang: "",
    visi_misi: "",
    profil_pendiri: "",
    profil_pengurus: "",
    keanggotaan: "",
    prominent_kol: "",
    bidang_usaha_gerak: "",
    isu_diangkat: "",
    pengamat_rujukan: "",
    afiliasi_ngo_parpol: "",
    pengaruh_masyarakat: "",
    pihak_belakang_ngo: "",
    sumber_dana: "",
    jumlah_cabang_anggota: "",
    segmentasi_dasar: "",
    sikap_pemerintah: "",
    rekom_pendekatan_icw: "",
    analisis_pengaruh: "",
    kesimpulan: "",
    user_id: userId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = cookies.get("token");
    console.log(formData);
    try {
      const response = await postWithAuthJson(
        "entry-lembaga",
        JSON.stringify(formData),
        token
      );
      console.log(response);
      router.push("/data-entry");
      toast.success("Berhasil menambahkan data lembaga.")
    } catch (error) {
      console.error(error);
      toast.error("Gagal menambahkan data lembaga.")
    }finally{
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-white py-12">
        <div className="flex items-center justify-start px-5 md:px-14 gap-[14px] mb-3 md:mb-6">
          <div
            className={`p-[6px] md:p-[10px] text-white bg-${customization.color} flex justify-center items-center rounded-lg cursor-pointer`}
            onClick={() => router.back()}
          >
            <IoArrowBackOutline className="w-3 md:w-[20px] h-3 md:h-[20px]" />
          </div>
          <p className="text-[#2A3D4A] font-semibold text-[16px] md:text-[24px] ">
            Input Data Lembaga
          </p>
        </div>
        <hr className="text-[#EDEEF3] mx-3" />
        <section
          id="A"
          className="w-full flex flex-col justify-start px-5 md:px-14 py-5 md:py-6 gap-3 md:gap-4"
        >
          <p className="text-[14px] md:text-[20px] font-semibold text-[#2A3D4A]">
            A. Data Profil Lembaga
          </p>
          <div className="w-full flex flex-col md:grid md:grid-cols-7 justify-start md:justify-between md:gap-16">
            <div className="w-full flex flex-col col-span-2">
              <TextField
                name={"nama"}
                type={"field"}
                placeholder={"Masukkan nama instansi"}
                label={"Nama Instansi"}
                value={formData.nama}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    nama: e.target.value,
                  }))
                }
              />
              <TextField
                name={"alamat"}
                type={"field"}
                placeholder={"Masukkan alamat"}
                label={"Alamat"}
                value={formData.alamat}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    alamat: e.target.value,
                  }))
                }
              />
              <TextField
                name={"email"}
                type={"field"}
                placeholder={"Masukkan email"}
                label={"Email"}
                value={formData.email}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }))
                }
              />
              <TextField
                name={"no_kontak"}
                type={"field"}
                placeholder={"Masukkan nomor telepon"}
                label={"Nomor Kontak"}
                value={formData.no_kontak}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    no_kontak: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full col-span-3 flex flex-col md:grid md:grid-cols-3 gap-x-[14px]">
              <div className="col-span-2">
                <TextField
                  name={"instagram"}
                  type={"field"}
                  placeholder={"Masukkan username Instagram"}
                  label={"Akun Media Sosial"}
                  icon={<PiInstagramLogoFill />}
                  value={formData.instagram}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      instagram: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="row-start-2 col-span-2">
                <TextField
                  name={"facebook"}
                  type={"field"}
                  placeholder={"Masukkan username Facebook"}
                  label={""}
                  icon={<FaFacebookSquare />}
                  value={formData.facebook}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      facebook: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="row-start-3 col-span-2">
                <TextField
                  name={"x"}
                  type={"field"}
                  placeholder={"Masukkan username X"}
                  label={""}
                  icon={<FaSquareXTwitter />}
                  value={formData.x}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      x: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="row-start-4 col-span-2">
                <TextField
                  name={"youtube"}
                  type={"field"}
                  placeholder={"Masukkan nama channel Youtue"}
                  label={""}
                  icon={<FaYoutube />}
                  value={formData.youtube}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      youtube: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="row-start-5 col-span-2">
                <TextField
                  name={"podcast"}
                  type={"field"}
                  placeholder={"Masukkan nama channel Podcast"}
                  label={""}
                  icon={<SiApplepodcasts />}
                  value={formData.podcast}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      podcast: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="row-start-1 col-start-3">
                <TextField
                  name={"instagram_follow"}
                  type={"field"}
                  placeholder={"1.000 followers"}
                  label={"Jumlah Pengikut"}
                  icon={<PiInstagramLogoFill />}
                  value={formData.instagram_follow}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      instagram_follow: e.target.value,
                    }))
                  }
                />
              </div>
              <TextField
                name={"facebook_follow"}
                type={"field"}
                placeholder={"1.000 followers"}
                label={""}
                icon={<FaFacebookSquare />}
                value={formData.facebook_follow}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    facebook_follow: e.target.value,
                  }))
                }
              />
              <TextField
                name={"x_follow"}
                type={"field"}
                placeholder={"1.000 followers"}
                label={""}
                icon={<FaSquareXTwitter />}
                value={formData.x_follow}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    x_follow: e.target.value,
                  }))
                }
              />
              <TextField
                name={"youtube_follow"}
                type={"field"}
                placeholder={"1.000 subscribers"}
                label={""}
                icon={<FaYoutube />}
                value={formData.youtube_follow}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    youtube_follow: e.target.value,
                  }))
                }
              />
              <TextField
                name={"podcast_follow"}
                type={"field"}
                placeholder={"1.000 subscribers"}
                label={""}
                icon={<SiApplepodcasts />}
                value={formData.podcast_follow}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    podcast_follow: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col col-span-2">
              <TextField
                name={"link_web_lembaga"}
                type={"field"}
                placeholder={"Masukkan link website"}
                label={"Link Website Lembaga"}
                value={formData.link_web_lembaga}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    link_web_lembaga: e.target.value,
                  }))
                }
              />
              <TextField
                name={"e_commerce"}
                type={"field"}
                placeholder={"Masukkan toko"}
                label={"Akun E-commerce"}
                icon={<SiBukalapak />}
                value={formData.e_commerce}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    e_commerce: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </section>
        <section
          id="B"
          className="w-full flex flex-col justify-start px-5 md:px-14 pb-5 md:pb-6"
        >
          <p className="text-[14px] md:text-[20px] font-semibold text-[#2A3D4A]">
            B. Data Pendukung Lembaga
          </p>
          <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between md:gap-16">
            <div className="w-full flex flex-col">
              <CustomTextEditor
                initialValue={formData.latar_belakang}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    latar_belakang: e,
                  }))
                }
                label={"Latar Belakang/Deskripsi Lembaga"}
              />
              <CustomTextEditor
                initialValue={formData.visi_misi}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    visi_misi: e,
                  }))
                }
                label={"Visi Misi"}
              />
              <CustomTextEditor
                initialValue={formData.profil_pendiri}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    profil_pendiri: e,
                  }))
                }
                label={"Profil Pendiri"}
              />
              <CustomTextEditor
                initialValue={formData.profil_pengurus}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    profil_pengurus: e,
                  }))
                }
                label={"Profil Pengurus"}
              />
              <CustomTextEditor
                initialValue={formData.keanggotaan}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    keanggotaan: e,
                  }))
                }
                label={"Keanggotaan"}
              />
              <CustomTextEditor
                initialValue={formData.prominent_kol}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    prominent_kol: e,
                  }))
                }
                label={"Prominent KOL"}
              />
              <CustomTextEditor
                initialValue={formData.bidang_usaha_gerak}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    bidang_usaha_gerak: e,
                  }))
                }
                label={"Bidang Usaha Pergerakan"}
              />
              <CustomTextEditor
                initialValue={formData.isu_diangkat}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    isu_diangkat: e,
                  }))
                }
                label={"Isu Yang Sering Diangkat"}
              />
              <CustomTextEditor
                initialValue={formData.pengamat_rujukan}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    pengamat_rujukan: e,
                  }))
                }
                label={"Pengamat Yang Sering Dijadikan Rujukan"}
              />
            </div>
            <div className="w-full flex flex-col">
            <CustomTextEditor
                initialValue={formData.afiliasi_ngo_parpol}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    afiliasi_ngo_parpol: e,
                  }))
                }
                label={"Afiliasi Keterkaitan dengan NGO/Parpol"}
              />
               <CustomTextEditor
                initialValue={formData.pengaruh_masyarakat}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    pengaruh_masyarakat: e,
                  }))
                }
                label={"Tingkat Pengaruh di Masyarakat"}
              />
              <CustomTextEditor
                initialValue={formData.pihak_belakang_ngo}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    pihak_belakang_ngo: e,
                  }))
                }
                label={"Pihak di Belakang NGO"}
              />
             <CustomTextEditor
                initialValue={formData.sumber_dana}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    sumber_dana: e,
                  }))
                }
                label={"Sumber Pendanaan"}
              />
               <CustomTextEditor
                initialValue={formData.jumlah_cabang_anggota}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    jumlah_cabang_anggota: e,
                  }))
                }
                label={"Jumlah Cabang/Anggota/Pengikut"}
              />
               <CustomTextEditor
                initialValue={formData.segmentasi_dasar}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    segmentasi_dasar: e,
                  }))
                }
                label={"Segmentasi yang Didasar"}
              />
              <CustomTextEditor
                initialValue={formData.sikap_pemerintah}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    sikap_pemerintah: e,
                  }))
                }
                label={"Sikap ke Pemerintah"}
              />
               <CustomTextEditor
                initialValue={formData.rekom_pendekatan_icw}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    rekom_pendekatan_icw: e,
                  }))
                }
                label={"Rekomendasi Pendekatan ke ICW"}
              />
               <CustomTextEditor
                initialValue={formData.analisis_pengaruh}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    analisis_pengaruh: e,
                  }))
                }
                label={"Analisis Pengaruh Lembaga dengan Pendekatan Kuantitatif (Asumsi)"}
              />
            </div>
          </div>
          <CustomTextEditor
                initialValue={formData.kesimpulan}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    kesimpulan: e,
                  }))
                }
                label={"Kesimpulan"}
              />
        </section>
        <div className="w-full flex justify-center items-center pb-10">
          <Button
            text={"Simpan"}
            type={"button"}
            color={customization.color}
            width={350}
            onClick={handleSubmit}
            isLoading={loading}
          />
        </div>
      </div>
    </>
  );
}
