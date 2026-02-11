import { useState } from "react";
import { Home, Globe, Bot, Settings, LogOut, Menu } from "lucide-react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "../styles/AdminDashboard.css";

export default function AdminLayout() {

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">

      {/* ============ SIDEBAR ============ */}
      <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>

        <div className="sidebar-header">
          {!collapsed && <h2 className="logo-text">Hero Chat</h2>}
          <Menu
            className="menu-toggle"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        <nav className="sidebar-menu">

          <SidebarItem
            icon={<Home />}
            label="Dashboard"
            active={location.pathname === "/admin/dashboard"}
            onClick={() => navigate("/admin/dashboard")}
          />

          <SidebarItem
            icon={<Globe />}
            label="Websites"
            active={location.pathname === "/admin/websites"}
            onClick={() => navigate("/admin/websites")}
          />

          <SidebarItem
            icon={<Bot />}
            label="Chatbots"
            active={location.pathname === "/admin/bots"}
            onClick={() => navigate("/admin/bots")}
          />

          <SidebarItem
            icon={<Settings />}
            label="Settings"
            active={location.pathname === "/admin/settings"}
            onClick={() => navigate("/admin/settings")}
          />

          <SidebarItem
            icon={<LogOut />}
            label="Logout"
            onClick={logout}
          />

        </nav>

      </aside>

      {/* ============ MAIN ============ */}
      <main className="admin-main">

        {/* Header */}
        <div className="admin-header">
          <h2>Hero Chat Admin</h2>
        </div>

        {/* Page Content */}
        <Outlet />

      </main>

    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div
      className={`menu-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
