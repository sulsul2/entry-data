"use client";
import Button from "@/components/button";
import { CustomTextEditor } from "@/components/texteditor";
import TextField from "@/components/textfield";
import { postWithAuthJson } from "@/services/api";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiInstagramLogoFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export default function DataEntryInput() {
  const cookies = new Cookies();
  const router = useRouter();
  const userId = cookies.get("user_id");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    nama: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    email: "",
    no_telp: "",
    mbti: "",
    data_keluarga: "",
    instagram: "",
    instagram_follow: "",
    facebook: "",
    facebook_follow: "",
    linkedin: "",
    linkedin_follow: "",
    riwayat_parlemen: "",
    riwayat_kerja: "",
    jabatan_kelompok: "",
    jabatan_organisasi: "",
    riwayat_pendidikan: "",
    riwayat_penghargaan: "",
    isu_kemenkeu: "",
    rekomen_pendekatan: "",
    sikap_kemenkeu: "",
    tingkat_pengaruh: "",
    riwayat_hukum: "",
    user_id: userId,
  });
  const customization = useSelector((state: RootState) => state.customization);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = cookies.get("token");
    console.log(formData);
    try {
      const response = await postWithAuthJson(
        "entry-user",
        JSON.stringify(formData),
        token
      );
      console.log(response);
      router.push("/data-entry");
      toast.success("Berhasil menambahkan data user.");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menambahkan data user.");
    } finally {
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
          <p className="text-[#2A3D4A] font-semibold text-[16px] md:text-[24px]">
            Input Data Pengguna
          </p>
        </div>
        <hr className="text-[#EDEEF3] mx-3" />
        <section
          id="A"
          className="w-full flex flex-col justify-start px-5 md:px-14 py-5 md:py-6 gap-3 md:gap-4"
        >
          <p className="text-[14px] md:text-[20px] font-semibold text-[#2A3D4A]">
            A. Data Pribadi
          </p>
          <div className="w-full flex flex-col md:grid md:grid-cols-4 justify-start md:justify-between md:gap-16">
            <div className="w-full flex flex-col">
              <TextField
                name={"nama"}
                type={"field"}
                placeholder={"Masukkan nama lengkap"}
                label={"Nama"}
                value={formData.nama}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    nama: e.target.value,
                  }))
                }
              />
              <TextField
                name={"jenis_kelamin"}
                type={"dropdown"}
                options={[
                  { label: "Laki-Laki", value: "L" },
                  { label: "Perempuan", value: "P" },
                ]}
                placeholder={"Pilih jenis kelamin"}
                label={"Jenis Kelamin"}
                value={formData.jenis_kelamin}
                onChangeDropdown={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    jenis_kelamin: e.target.value,
                  }))
                }
              />
              <TextField
                name={"tempat_lahir"}
                type={"field"}
                placeholder={"Masukkan tempat lahir"}
                label={"Tempat Lahir"}
                value={formData.tempat_lahir}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    tempat_lahir: e.target.value,
                  }))
                }
              />
              <TextField
                name={"tanggal_lahir"}
                type={"date"}
                placeholder={"Masukkan tanggal lahir"}
                label={"Tanggal Lahir"}
                value={formData.tanggal_lahir}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    tanggal_lahir: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col">
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
                name={"no_telp"}
                type={"field"}
                placeholder={"Masukkan nomor telepon"}
                label={"Nomor Telepon"}
                value={formData.no_telp}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    no_telp: e.target.value,
                  }))
                }
              />
              <TextField
                name={"mbti"}
                type={"field"}
                placeholder={"Masukkan MBTI"}
                label={"MBTI"}
                value={formData.mbti}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    mbti: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col-reverse col-span-2 gap-4">
              <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-x-[14px]">
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
                    name={"linkedin"}
                    type={"field"}
                    placeholder={"Masukkan username Linkedin"}
                    label={""}
                    icon={<FaLinkedin />}
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        linkedin: e.target.value,
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
                  name={"linkedin_follow"}
                  type={"field"}
                  placeholder={"1.000 followers"}
                  label={""}
                  icon={<FaLinkedin />}
                  value={formData.linkedin_follow}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      linkedin_follow: e.target.value,
                    }))
                  }
                />
              </div>
              {/* <TextField
                name={"data_keluarga"}
                placeholder={"Masukkan deskripsi"}
                label={"Data Keluarga Inti"}
                type="area"
                value={formData.data_keluarga}
                onChangeArea={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    data_keluarga: e.target.value,
                  }))
                }
              /> */}
              <CustomTextEditor
                initialValue={formData.data_keluarga}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    data_keluarga: e,
                  }))
                }
                label={"Data Keluarga Inti"}
              />
            </div>
          </div>
        </section>
        <section
          id="B"
          className="w-full flex flex-col justify-start px-5 md:px-14 pb-5 md:pb-6"
        >
          <p className="text-[14px] md:text-[20px] font-semibold text-[#2A3D4A]">
            B. Riwayat Pekerjaan dan Organisasi
          </p>
          <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between md:gap-16">
            <div className="w-full flex flex-col">
              {/* <TextField
                name={"riwayat_parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
                value={formData.riwayat_parlemen}
                onChangeArea={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    riwayat_parlemen: e.target.value,
                  }))
                }
              /> */}
              <CustomTextEditor
                initialValue={formData.riwayat_parlemen}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    riwayat_parlemen: e,
                  }))
                }
                label={"Riwayat Parlemen"}
              />
              {/* <TextField
                name={"riwayat_kerja"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Pekerjaan"}
                type="area"
                value={formData.riwayat_kerja}
                onChangeArea={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    riwayat_kerja: e.target.value,
                  }))
                }
              /> */}
              <CustomTextEditor
                initialValue={formData.riwayat_kerja}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    riwayat_kerja: e,
                  }))
                }
                label={"Riwayat Kerja"}
              />
            </div>
            <div className="w-full flex flex-col">
              {/* <TextField
                name={"jabatan_kelompok"}
                placeholder={"Masukkan deskripsi"}
                label={"Jabatan di Kelompok Media"}
                type="area"
                value={formData.jabatan_kelompok}
                onChangeArea={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    jabatan_kelompok: e.target.value,
                  }))
                }
              /> */}
              <CustomTextEditor
                initialValue={formData.jabatan_kelompok}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    jabatan_kelompok: e,
                  }))
                }
                label={"Jabatan di Kelompok Media"}
              />
              {/* <TextField
                name={"jabatan_organisasi"}
                placeholder={"Masukkan deskripsi"}
                label={"Jabatan di Organisasi"}
                type="area"
                value={formData.jabatan_organisasi}
                onChangeArea={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    jabatan_organisasi: e.target.value,
                  }))
                }
              /> */}
              <CustomTextEditor
                initialValue={formData.jabatan_organisasi}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    jabatan_organisasi: e,
                  }))
                }
                label={"Jabatan di Organisasi"}
              />
            </div>
          </div>
        </section>
        <section
          id="C"
          className="w-full flex flex-col justify-start px-5 md:px-14 pb-5 md:pb-6"
        >
          <p className="text-[14px] md:text-[20px] font-semibold text-[#2A3D4A]">
            C. Pendidikan dan Penghargaan
          </p>
          <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between md:gap-16">
            {/* <TextField
              name={"riwayat_pendidikan"}
              placeholder={"Masukkan deskripsi"}
              label={"Riwayat Pendidikan"}
              type="area"
              value={formData.riwayat_pendidikan}
              onChangeArea={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  riwayat_pendidikan: e.target.value,
                }))
              }
            /> */}
            <div className="w-full">

            <CustomTextEditor
              initialValue={formData.riwayat_pendidikan}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  riwayat_pendidikan: e,
                }))
              }
              label={"Riwayat Pendidikan"}
            />
            </div>
            {/* <TextField
              name={"riwayat_penghargaan"}
              placeholder={"Masukkan deskripsi"}
              label={"Riwayat Penghargaan"}
              type="area"
              value={formData.riwayat_penghargaan}
              onChangeArea={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  riwayat_penghargaan: e.target.value,
                }))
              }
            /> */}
            <div className="w-full">

            <CustomTextEditor
              initialValue={formData.riwayat_penghargaan}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  riwayat_penghargaan: e,
                }))
              }
              label={"Riwayat Penghargaan"}
            />
            </div>
          </div>
        </section>
        <section
          id="D"
          className="w-full flex flex-col justify-start px-5 md:px-14 pb-5 md:pb-6"
        >
          <p className="text-[14px] md:text-[20px] font-semibold text-[#2A3D4A]">
            D. Data Lainnya
          </p>
          <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between md:gap-16">
            <div className="w-full flex flex-col">
              {/* <TextField
                name={"isu_kemenkeu"}
                placeholder={"Masukkan deskripsi"}
                label={"Pemberitaan/Isu yang sering diangkat terkait Kemenkeu"}
                type="area"
                value={formData.isu_kemenkeu}
                onChangeArea={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    isu_kemenkeu: e.target.value,
                  }))
                }
              /> */}
              <CustomTextEditor
                initialValue={formData.isu_kemenkeu}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    isu_kemenkeu: e,
                  }))
                }
                label={"Pemberitaan/Isu yang sering diangkat terkait Kemenkeu"}
              />
              {/* <TextField
                name={"sikap_kemenkeu"}
                placeholder={"Masukkan deskripsi"}
                label={"Sikap ke Kemenkeu"}
                type="area"
                value={formData.sikap_kemenkeu}
                onChangeArea={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    sikap_kemenkeu: e.target.value,
                  }))
                }
              /> */}
              <CustomTextEditor
                initialValue={formData.sikap_kemenkeu}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    sikap_kemenkeu: e,
                  }))
                }
                label={"Sikap ke Kemenkeu"}
              />
              {/* <TextField
                name={"riwayat_hukum"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Hukum"}
                type="area"
                value={formData.riwayat_hukum}
                onChangeArea={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    riwayat_hukum: e.target.value,
                  }))
                }
              /> */}
              <CustomTextEditor
                initialValue={formData.riwayat_hukum}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    riwayat_hukum: e,
                  }))
                }
                label={"Riwayat Hukum"}
              />
            </div>
            <div className="w-full flex flex-col">
              {/* <TextField
                name={"rekomen_pendekatan"}
                placeholder={"Masukkan deskripsi"}
                label={"Rekomendasi Pendekatan"}
                type="area"
                value={formData.rekomen_pendekatan}
                onChangeArea={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    rekomen_pendekatan: e.target.value,
                  }))
                }
              /> */}
              <CustomTextEditor
                initialValue={formData.rekomen_pendekatan}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    rekomen_pendekatan: e,
                  }))
                }
                label={"Rekomendasi Pendekatan"}
              />
              {/* <TextField
                name={"tingkat_pengaruh"}
                placeholder={"Masukkan deskripsi"}
                label={"Tingkat Pengaruh Di Masyarakat"}
                type="area"
                value={formData.tingkat_pengaruh}
                onChangeArea={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    tingkat_pengaruh: e.target.value,
                  }))
                }
              /> */}
              <CustomTextEditor
                initialValue={formData.tingkat_pengaruh}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    tingkat_pengaruh: e,
                  }))
                }
                label={"Tingkat Pengaruh Di Masyarakat"}
              />
            </div>
          </div>
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
