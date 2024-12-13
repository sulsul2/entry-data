import Button from "@/components/button";
import Pagination from "@/components/pagination";
import TextField from "@/components/textfield";

export default function Sinkronisasi() {
  return (
    <div className="py-2">
      <h1 className="mx-6 text-2xl font-semibold text-[#605BFF]">
        Sinkronisasi Data
      </h1>
      <p className="mx-6 text-[16px] font-semibold text-[#2A3D4A] mt-6">
        Pengaturan Sinkronisasi
      </p>
      <div className="w-[480px] flex flex-col justify-start ml-6 mt-4">
        <TextField
          name={"url"}
          placeholder={"Masukkan URL Endpoint..."}
          label={"URL Endpoint"}
          type="area"
        />
        <TextField
          name={"api"}
          placeholder={"Masukkan API Key atau Token"}
          label={"API Key atau Token"}
          type="field"
        />
        <Button text={"Simpan"} color="primary" type={"button"} width={175} />
      </div>
      <hr className="mt-9 border-[1.5px] text-navy-300" />
      {/* <Pagination totalPages={10} current={function (x: number): void | undefined {
        throw new Error("Function not implemented.");
      } }/> */}
    </div>
  );
}
