import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";

/* aaa */
export default function AdminLayout({ children }) {
  return (
    <>
      <AdminSidebar></AdminSidebar>
      <main id="main">{children}</main>
    </>
  );
}
