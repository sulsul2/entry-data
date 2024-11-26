"use client";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function TextField({
  name,
  type = "field",
  placeholder,
  value,
  label,
  onChange,
}: {
  name: string;
  type?: "field" | "password" | "search" | "area" | "dropdown" | "date";
  value?: string | number | readonly string[] | undefined;
  placeholder: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  const useLabel = type != "search";
  const [showPassword, setShowPassword] = useState("password");
  const [icon, setIcon] = useState(<LuEyeOff></LuEyeOff>);
  const handleToggle = () => {
    if (showPassword === "password") {
      setIcon(<LuEye></LuEye>);
      setShowPassword("text");
    } else {
      setIcon(<LuEyeOff></LuEyeOff>);
      setShowPassword("password");
    }
  };
  return (
    <div className="w-full">
      {useLabel && (
        <label
          htmlFor={name}
          className="text-[#414651] font-medium text-[14px]"
        >
          {label}
        </label>
      )}
      {type == "field" && (
        <div className="mt-2 mb-4 w-full flex items-center px-[14px] py-[10px] text-[14px] text-[#1A0048] bg-white border-[1px] border-[#D5D7DA] focus-within:border-primary-900 rounded-[8px]">
          <input
            id={name}
            type="text"
            // required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="grow focus:outline-none w-full"
          />
        </div>
      )}
      {type == "password" && (
        <div className="mt-2 mb-4 w-full flex items-center px-[14px] py-[10px] text-[14px] text-[#1A0048] bg-white border-[1px] border-[#D5D7DA] focus-within:border-primary-900 rounded-[8px] group">
          <input
            id="password"
            type={showPassword}
            //   required={required}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className="grow focus:outline-none w-full"
          />
          <div
            className="text-[16px] w-fit group-focus-within:text-primary-900 text-[#1E1E1E]"
            onClick={handleToggle}
          >
            {icon}
          </div>
        </div>
      )}
    </div>
  );
}
