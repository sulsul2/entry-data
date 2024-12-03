"use client";

import { useRouter } from "next/navigation";

export default function DetailPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  const { type, id } = params; // Params yang diteruskan dari server
  const router = useRouter();

  return (
    <div className="flex w-screen h-screen overflow-y-auto bg-white">
      <h1 className="text-2xl font-semibold mb-4">
        {type === "data-pengguna" ? "Detail Pengguna" : "Detail Lembaga"}
      </h1>

      {type === "data-pengguna" ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <p>Data Pengguna</p>
        </div>
      ) : type === "data-lembaga" ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <p>Data Lembaga</p>
        </div>
      ) : (
        <p>Type tidak dikenali</p>
      )}

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => router.back()}
      >
        Kembali
      </button>
    </div>
  );
}
