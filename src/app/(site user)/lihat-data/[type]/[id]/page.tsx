"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import { IoMdArrowBack } from "react-icons/io";

export default function DetailPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  const { type, id } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <div className="px-6 py-2">
      <div>
        <Button
          text={""}
          type={"button"}
          icon={<IoMdArrowBack className="text-2xl" />}
        />
      </div>
      <h1 className="text-2xl font-semibold mb-4">
        {type === "data-pengguna" ? "Detail Pengguna" : "Detail Lembaga"}
      </h1>
      <div className="bg-white p-4 rounded-lg shadow">
        {type === "data-pengguna" ? "Data Pengguna" : "Data Lembaga"} (ID: {id})
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => history.back()}
      >
        Kembali
      </button>
    </div>
  );
}
