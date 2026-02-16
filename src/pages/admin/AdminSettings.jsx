import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/AdminSetting.css";

export default function AdminSettingsLayout() {
  const [activeTab, setActiveTab] = useState("ai");
  const [botName, setBotName] = useState("Hero Assistant");
  const [temperature, setTemperature] = useState(0.4);
  const [fallback, setFallback] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (matches admin panel style) */}
      <aside className="w-64 bg-white border-r p-5 space-y-6">
        <h2 className="text-xl font-bold text-indigo-600">Hero Chat</h2>

        <nav className="space-y-2 text-sm">
          <Link className="block text-gray-600 hover:text-indigo-600" to="/admin">Dashboard</Link>
          <Link className="block text-gray-600 hover:text-indigo-600" to="/admin/websites">Websites</Link>
          <Link className="block text-gray-600 hover:text-indigo-600" to="/admin/conversations">Conversations</Link>
          <Link className="block text-indigo-600 font-medium" to="/admin/settings">Settings</Link>
          <Link className="block text-gray-600 hover:text-indigo-600" to="/admin/analytics">Analytics</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {[
            { id: "ai", label: "AI Behaviour" },
            { id: "widget", label: "Widget" },
            { id: "security", label: "Security" },
            { id: "notify", label: "Notifications" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm border ${activeTab === tab.id ? "bg-indigo-600 text-white" : "bg-white text-gray-600"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* AI SETTINGS */}
        {activeTab === "ai" && (
          <div className="bg-white p-6 rounded-xl shadow space-y-6">
            <div>
              <label className="text-sm font-medium">Bot Name</label>
              <input
                className="mt-2 w-full border rounded-lg p-2"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Temperature</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="mt-2 w-40 border rounded-lg p-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Enable fallback AI</span>
              <input
                type="checkbox"
                checked={fallback}
                onChange={(e) => setFallback(e.target.checked)}
              />
            </div>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Save AI Settings</button>
          </div>
        )}

        {/* WIDGET SETTINGS */}
        {activeTab === "widget" && (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div>
              <label className="text-sm font-medium">Primary Color</label>
              <input type="color" className="block mt-2 w-24 h-10" />
            </div>

            <div>
              <label className="text-sm font-medium">Welcome Message</label>
              <input className="mt-2 w-full border rounded-lg p-2" placeholder="Hi! How can I help you today?" />
            </div>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Save Widget Settings</button>
          </div>
        )}

        {/* SECURITY SETTINGS */}
        {activeTab === "security" && (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div>
              <label className="text-sm font-medium">Allowed Domains</label>
              <input className="mt-2 w-full border rounded-lg p-2" placeholder="example.com" />
            </div>

            <div>
              <label className="text-sm font-medium">Rate Limit (req/min)</label>
              <input type="number" defaultValue={60} className="mt-2 w-40 border rounded-lg p-2" />
            </div>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Update Security</button>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === "notify" && (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div>
              <label className="text-sm font-medium">Email for alerts</label>
              <input className="mt-2 w-full border rounded-lg p-2" placeholder="support@company.com" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Escalation Alerts</span>
              <input type="checkbox" defaultChecked />
            </div>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Save Notification Settings</button>
          </div>
        )}
      </main>
    </div>
  );
}