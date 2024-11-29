import { FormEventHandler, MouseEventHandler } from "react";

export default function Button({
  text,
  type,
  onClick,
  onSubmit,
  color = "primary",
  icon,
  disable = false,
  width,
}: {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
  color?: "primary" | "red" | "neutral";
  icon?: React.ReactNode;
  disable?: boolean;
  width?: number;
}) {
  const inputWidth = width ? width : "100%";
  return (
    <button
      style={{ width: inputWidth }}
      disabled={disable}
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      className={`py-[10px] rounded-[8px] mt-2 ${
        disable
          ? "bg-[#D1D1D6]"
          : color == "primary"
          ? "bg-primary-900"
          : color == "red"
          ? "bg-error-600"
          : "bg-white border-[1px] border-[#D5D7DA]"
      }`}
    >
      <div
        className={`${
          color == "neutral" ? "text-[#414651]" : "text-white"
        }  flex items-center justify-center gap-2 font-semibold`}
      >
        {icon}
        {text}
      </div>
    </button>
  );
}
