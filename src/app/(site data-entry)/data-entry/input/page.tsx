import Button from "@/components/button";
import TextField from "@/components/textfield";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiInstagramLogoFill } from "react-icons/pi";

export default function DataEntryInput() {
  return (
    <>
      <div className="w-screen h-screen bg-white py-12">
        <div className="flex items-center justify-start px-5 md:px-14 gap-[14px] mb-3 md:mb-6">
          <div className="p-[6px] md:p-[10px] text-white bg-primary-900 flex justify-center items-center rounded-lg cursor-pointer">
            <IoArrowBackOutline className="w-3 md:w-[20px] h-3 md:h-[20px]" />
          </div>
          <p className="text-[#2A3D4A] font-semibold text-[16px] md:text-[24px] ">
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
                name={"name"}
                type={"field"}
                placeholder={"Masukkan nama lengkap"}
                label={"Nama"}
              />
              <TextField
                name={"kelamin"}
                type={"dropdown"}
                options={['Laki-Laki', 'Perempuan']}
                placeholder={"Pilih jenis kelamin"}
                label={"Jenis Kelamin"}
              />
              <TextField
                name={"tempat"}
                type={"field"}
                placeholder={"Masukkan tempat lahir"}
                label={"Tempat Lahir"}
              />
              <TextField
                name={"tanggal"}
                type={"date"}
                placeholder={"Masukkan tanggal lahir"}
                label={"Tanggal Lahir"}
              />
            </div>
            <div className="w-full flex flex-col">
              <TextField
                name={"alamat"}
                type={"field"}
                placeholder={"Masukkan alamat"}
                label={"Alamat"}
              />
              <TextField
                name={"email"}
                type={"field"}
                placeholder={"Masukkan email"}
                label={"Email"}
              />
              <TextField
                name={"nomor telepon"}
                type={"field"}
                placeholder={"Masukkan nomor telepon"}
                label={"Nomor Telepon"}
              />
              <TextField
                name={"mbti"}
                type={"field"}
                placeholder={"Masukkan MBTI"}
                label={"MBTI"}
              />
            </div>
            <div className="w-full flex flex-col-reverse col-span-2">
              <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-x-[14px]">
                <div className="col-span-2">
                  <TextField
                    name={"ig"}
                    type={"field"}
                    placeholder={"Masukkan username Instagram"}
                    label={"Akun Media Sosial"}
                    icon={<PiInstagramLogoFill />}
                  />
                </div>
                <div className="row-start-2 col-span-2">
                  <TextField
                    name={"facebook"}
                    type={"field"}
                    placeholder={"Masukkan username Facebook"}
                    label={""}
                    icon={<FaFacebookSquare />}
                  />
                </div>
                <div className="row-start-3 col-span-2">
                  <TextField
                    name={"linkedin"}
                    type={"field"}
                    placeholder={"Masukkan username Instagram"}
                    label={""}
                    icon={<FaLinkedin />}
                  />
                </div>
                <div className="row-start-1 col-start-3">
                <TextField
                  name={"igfol"}
                  type={"field"}
                  placeholder={"1.000 followers"}
                  label={"Jumlah Pengikut"}
                  icon={<PiInstagramLogoFill />}
                />
                </div>
                <TextField
                  name={"facebookfol"}
                  type={"field"}
                  placeholder={"1.000 followers"}
                  label={""}
                  icon={<FaFacebookSquare />}
                />
                <TextField
                  name={"linkedinfol"}
                  type={"field"}
                  placeholder={"1.000 followers"}
                  label={""}
                  icon={<FaLinkedin />}
                />
              </div>
              <TextField
                name={"keluarga"}
                placeholder={"Masukkan deskripsi"}
                label={"Data Keluarga Inti"}
                type="area"
              />
            </div>
          </div>
        </section>
        <section
          id="B"
          className="w-full flex flex-col justify-start px-5 md:px-14 pb-5 md:pb-6 gap-3 md:gap-4"
        >
          <p className="text-[14px] md:text-[20px] font-semibold text-[#2A3D4A]">
            B. Riwayat Pekerjaan dan Organisasi
          </p>
          <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between md:gap-16">
            <div className="w-full flex flex-col">
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"keluarga"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Pekerjaan"}
                type="area"
              />
            </div>
            <div className="w-full flex flex-col">
              <TextField
                name={"keluarga"}
                placeholder={"Masukkan deskripsi"}
                label={"Jabatan di Kelompok Media"}
                type="area"
              />
              <TextField
                name={"keluarga"}
                placeholder={"Masukkan deskripsi"}
                label={"Jabatan di Organisasi"}
                type="area"
              />
            </div>
          </div>
        </section>
        <section
          id="C"
          className="w-full flex flex-col justify-start px-5 md:px-14 pb-5 md:pb-6 gap-3 md:gap-4"
        >
          <p className="text-[14px] md:text-[20px] font-semibold text-[#2A3D4A]">
            C. Pendidikan dan Penghargaan
          </p>
          <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between md:gap-16">
            <TextField
              name={"keluarga"}
              placeholder={"Masukkan deskripsi"}
              label={"Riwayat Pendidikan"}
              type="area"
            />
            <TextField
              name={"keluarga"}
              placeholder={"Masukkan deskripsi"}
              label={"Riwayat Penghargaan"}
              type="area"
            />
          </div>
        </section>
        <section
          id="D"
          className="w-full flex flex-col justify-start px-5 md:px-14 pb-5 md:pb-6 gap-3 md:gap-4"
        >
          <p className="text-[14px] md:text-[20px] font-semibold text-[#2A3D4A]">
            D. Data Lainnya
          </p>
          <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between md:gap-16">
            <div className="w-full flex flex-col">
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Pemberitaan/Isu yang sering diangkat terkait Kemenkeu"}
                type="area"
              />
              <TextField
                name={"keluarga"}
                placeholder={"Masukkan deskripsi"}
                label={"Sikap ke Kemenkeu"}
                type="area"
              />
              <TextField
                name={"keluarga"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Hukum"}
                type="area"
              />
            </div>
            <div className="w-full flex flex-col">
              <TextField
                name={"keluarga"}
                placeholder={"Masukkan deskripsi"}
                label={"Rekomendasi Pendekatan"}
                type="area"
              />
              <TextField
                name={"keluarga"}
                placeholder={"Masukkan deskripsi"}
                label={"Tingkat Pengaruh Di Masyarakat"}
                type="area"
              />
            </div>
          </div>
        </section>
        <div className="w-full flex justify-center items-center pb-10">
          <Button text={"Simpan"} type={"button"} color="primary" width={350} />
        </div>
      </div>
    </>
  );
}
