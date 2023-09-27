"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link
            className={pathname.endsWith("/") ? "nav-link active" : "nav-link"}
            href="/admin/"
          >
            <i className="bi bi-grid"></i>
            <span>Preconstructions</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={
              pathname.startsWith("/admin/cities")
                ? "nav-link active"
                : "nav-link"
            }
            href="/admin/cities"
          >
            <i className="bi bi-shop-window"></i>
            <span>Cities</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={
              pathname.startsWith("/admin/developers")
                ? "nav-link active"
                : "nav-link"
            }
            href="/admin/developers"
          >
            <i className="bi bi-bricks"></i>
            <span>Developers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={
              pathname.startsWith("/admin/events")
                ? "nav-link active"
                : "nav-link"
            }
            href="/admin/events"
          >
            <i className="bi bi-calendar-check"></i>
            <span>Events</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={
              pathname.startsWith("/admin/news")
                ? "nav-link active"
                : "nav-link"
            }
            href="/admin/news"
          >
            <i className="bi bi-newspaper"></i>
            <span>News</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
