"use client";
import React from "react";
import TextField from "./textfield";

export default function ModalAdd({
  title,
  formData,
  setFormData,
  button1Text,
  button2Text,
  onButton1Click,
  onButton2Click,
  button1Color,
  button2Color,
  button1TextColor,
  button2TextColor,
}: {
  title: string;
  formData: { username: string; password: string; role: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{ username: string; password: string; role: string }>
  >;
  button1Text: string;
  button2Text: string;
  onButton1Click: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onButton2Click: React.MouseEventHandler<HTMLButtonElement> | undefined;
  button1Color?: string;
  button2Color?: string;
  button1TextColor?: string;
  button2TextColor?: string;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-72 md:w-96 p-6 text-center">
        <img
          src={"/modal/add-icon.svg"}
          alt="Modal Icon"
          className="w-12 h-12 mx-auto mb-4"
        />
        <h2 className="text-base md:text-lg font-semibold text-[#181D27] mb-5">
          {title}
        </h2>

        {/* Form Fields */}
        <div className="flex flex-col justify-start items-start text-left mb-8">
          <TextField
            name={"Username"}
            placeholder={"Enter username"}
            label={"Username"}
            type="field"
            value={formData.username || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <TextField
            name={"Password"}
            placeholder={"Enter password"}
            label={"Password"}
            type="password"
            value={formData.password || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <TextField
            name={"Role"}
            placeholder={"Select role"}
            label={"Role"}
            type="dropdown"
            options={["manager", "admin", "data_entry"]}
            value={formData.role || ""}
            onChangeDropdown={(e) =>
              setFormData((prev) => ({ ...prev, role: e.target.value }))
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            className={`flex-1 ${button1Color ?? "bg-[#FFFFFF]"} ${
              button1TextColor ?? "text-[#414651]"
            } py-2 px-4 rounded-lg mr-2 border-2 border-[#D5D7DA]`}
            onClick={onButton1Click}
          >
            {button1Text}
          </button>
          <button
            className={`flex-1 ${button2Color ?? "bg-[#605BFF]"} ${
              button2TextColor ?? "text-white"
            } py-2 px-4 rounded-lg ml-2`}
            onClick={onButton2Click}
          >
            {button2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
