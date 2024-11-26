import Button from "@/components/button";
import TextField from "@/components/textfield";

export default function Login() {
  return (
    <div className="w-screen h-screen bg-[url('/assets/background.png')] bg-cover flex justify-center items-center">
      <div className="w-auto h-auto flex flex-col items-center bg-white rounded-[20px] drop-shadow-2xl shadow-[#0A0D1224] p-6">
        <img src="/globe.svg" alt="" className="w-12 h-12" />
        <p className="text-[#181D27] text-[30px] font-semibold mt-6">
          Log in to your account
        </p>
        <p className="text-[#535862] text-[16px] font-normal mt-3 mb-8">
          Welcome back! Please enter your details.
        </p>
        <TextField
          name={"username"}
          type={"field"}
          placeholder={"Masukkan username"}
          label={"Username"}
        />
        <TextField
          name={"password"}
          type={"password"}
          placeholder={"Masukkan password"}
          label={"Password"}
        />
        <Button text={"Log in"} type={undefined}/>
      </div>
    </div>
  );
}
