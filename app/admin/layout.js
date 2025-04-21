"use client";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/* aaa */
export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("../login");
    }
  }, []);
  return (
    <>
      <AdminSidebar></AdminSidebar>
      <main id="main">{children}</main>
    </>
  );
}
