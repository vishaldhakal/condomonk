"use client";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("../login");
    }
  }, []);
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  );
}
