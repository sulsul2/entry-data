"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDetailPage({ params }: { params: { id: number } }) {
  const id = params.id;
  const router = useRouter();
  const [dataCar, setDataCar] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <>
      <div className="px-6 py-2">
        <h1>MEMEK</h1>
      </div>
    </>
  );
}
