import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="bg-slate-200 min-h-screen pb-[100px] dark:bg-gray-800">{children}</main>
    </>
  );
}
