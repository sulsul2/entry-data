"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function FaviconUpdater() {
  const favicon = useSelector((state: RootState) => state.customization.favicon);

  useEffect(() => {
    if (!favicon) return;

    // Hapus favicon yang ada terlebih dahulu
    const existingLink = document.querySelector("link[rel='icon']");
    if (existingLink) {
      existingLink.remove();
    }

    // Buat element favicon baru
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = favicon;
    link.type = 'image/x-icon';

    // Tambahkan ke head
    document.head.appendChild(link);

    // Force browser untuk refresh favicon
    const faviconUrl = favicon + '?v=' + new Date().getTime();
    link.href = faviconUrl;

  }, [favicon]);

  return null;
}