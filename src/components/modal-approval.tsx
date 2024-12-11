"use client";
import React from "react";

export default function ModalApprove({
  image,
  title,
  subtitle,
  button1Text,
  button2Text,
  onButton1Click,
  onButton2Click,
  button1Color,
  button2Color,
  button1TextColor,
  button2TextColor,
  button1HoverColor,
  button2HoverColor,
}: {
  image: string;
  title: string;
  subtitle: string;
  button1Text: string;
  button2Text: string;
  onButton1Click: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onButton2Click: React.MouseEventHandler<HTMLButtonElement> | undefined;
  button1Color?: string;
  button2Color?: string;
  button1TextColor?: string;
  button2TextColor?: string;
  button1HoverColor?: string;
  button2HoverColor?: string;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 md:w-96 p-6 text-center">
        <img src={image} alt="Modal Icon" className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-[#181D27] mb-2">{title}</h2>
        <p className="text-sm font-normal text-[#535862] mb-6">{subtitle}</p>
        <div className="flex justify-between">
          <button
            className={`flex-1 ${button1Color} ${button1TextColor} py-2 px-4 rounded-lg mr-2 border-2 border-[#D5D7DA] ${button1HoverColor}`}
            onClick={onButton1Click}
          >
            {button1Text}
          </button>
          <button
            className={`flex-1 ${button2Color} ${button2TextColor} py-2 px-4 rounded-lg ml-2 ${button2HoverColor}`}
            onClick={onButton2Click}
          >
            {button2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
