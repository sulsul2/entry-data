"use client";
import { use } from "react"; // Import `use` from React
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params); // Use `use()` to unwrap the promise
  const router = useRouter();
  const [dataUser, setDataUser] = useState([]);

  return (
    <div className="px-6 py-2">
      <h1>Detail User ID: {id}</h1>
    </div>
  );
}
