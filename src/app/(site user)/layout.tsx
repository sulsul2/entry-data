import React from "react";
import HeaderUser from "@/components/header-user";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        <HeaderUser />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
