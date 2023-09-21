import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <AdminSidebar></AdminSidebar>
      <main id="main">{children}</main>
    </>
  );
}
