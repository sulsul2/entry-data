import React from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="ml-16 lg:ml-0 flex-1 flex flex-col w-screen bg-white overflow-hidden">
        <Header />
        <main className="p-2 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
