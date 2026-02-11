import { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function AdminDashboard() {

  const [stats, setStats] = useState({ cards: {} });
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // Load Dashboard Stats
  // ----------------------------
  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${API_URL}/api/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      {/* Page Header */}
      <div className="admin-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back 👋</p>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="stats-grid">

          <StatCard
            title="Websites"
            value={stats.cards.websites}
          />

          <StatCard
            title="Chatbots"
            value={stats.cards.chatbots}
          />

          <StatCard
            title="Conversations Today"
            value={stats.cards.todayConversations}
          />

          <StatCard
            title="Total Messages"
            value={stats.cards.messages}
          />

        </div>
      )}

      {/* System Overview */}
      <div className="system-card">
        <h3>System Overview</h3>
        <p>
          Manage websites, chatbots, conversations and training data
          from a single control panel.
        </p>
      </div>

    </div>
  );
}

/* ======================= */
/* Components */
/* ======================= */

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}
