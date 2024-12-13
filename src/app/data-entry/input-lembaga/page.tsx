import Button from "@/components/button";
import TextField from "@/components/textfield";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiInstagramLogoFill } from "react-icons/pi";
import { SiApplepodcasts, SiBukalapak } from "react-icons/si";

export default function DataEntryLembaga() {
  return (
    <>
      <div className="w-screen h-screen bg-white py-12">
        <div className="flex items-center justify-start px-5 md:px-14 gap-[14px] mb-3 md:mb-6">
          <div className="p-[6px] md:p-[10px] text-white bg-primary-900 flex justify-center items-center rounded-lg cursor-pointer">
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
          <div className="w-full flex flex-col md:grid md:grid-cols-6 justify-start md:justify-between md:gap-16">
            <div className="w-full flex flex-col col-span-2">
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
                name={"nomor"}
                type={"field"}
                placeholder={"Masukkan nomor telepon"}
                label={"Nomor Kontak"}
              />
              <TextField
                name={"website"}
                type={"field"}
                placeholder={"Masukkan link website"}
                label={"Link Website Lembaga"}
              />
            </div>
            <div className="w-full col-span-3 flex flex-col md:grid md:grid-cols-3 gap-x-[14px]">
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
                  name={"x"}
                  type={"field"}
                  placeholder={"Masukkan username X"}
                  label={""}
                  icon={<FaSquareXTwitter />}
                />
              </div>
              <div className="row-start-4 col-span-2">
                <TextField
                  name={"youtube"}
                  type={"field"}
                  placeholder={"Masukkan nama channel Youtue"}
                  label={""}
                  icon={<FaYoutube />}
                />
              </div>
              <div className="row-start-5 col-span-2">
                <TextField
                  name={"podcast"}
                  type={"field"}
                  placeholder={"Masukkan nama channel Podcast"}
                  label={""}
                  icon={<SiApplepodcasts />}
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
                name={"xfol"}
                type={"field"}
                placeholder={"1.000 followers"}
                label={""}
                icon={<FaSquareXTwitter />}
              />
              <TextField
                name={"youtubefol"}
                type={"field"}
                placeholder={"1.000 subscribers"}
                label={""}
                icon={<FaYoutube />}
              />
              <TextField
                name={"podcastfol"}
                type={"field"}
                placeholder={"1.000 subscribers"}
                label={""}
                icon={<SiApplepodcasts />}
              />
            </div>
            <div className="w-full">
              <TextField
                name={"ecommerce"}
                type={"field"}
                placeholder={"Masukkan toko"}
                label={"Akun E-commerce"}
                icon={<SiBukalapak />}
              />
            </div>
          </div>
        </section>
        <section
          id="B"
          className="w-full flex flex-col justify-start px-5 md:px-14 pb-5 md:pb-6 gap-3 md:gap-4"
        >
          <p className="text-[14px] md:text-[20px] font-semibold text-[#2A3D4A]">
            B. Data Pendukung Lembaga
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
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
            </div>
            <div className="w-full flex flex-col">
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
              <TextField
                name={"parlemen"}
                placeholder={"Masukkan deskripsi"}
                label={"Riwayat Parlemen"}
                type="area"
              />
            </div>
          </div>
          <TextField
            name={"parlemen"}
            placeholder={"Masukkan deskripsi"}
            label={"Riwayat Parlemen"}
            type="area"
          />
        </section>
        <div className="w-full flex justify-center items-center pb-10">
          <Button text={"Simpan"} type={"button"} color="primary" width={350} />
        </div>
      </div>
    </>
  );
}
