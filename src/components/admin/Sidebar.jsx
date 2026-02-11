import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Hero Chat</h2>

      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/websites">Websites</Link>
      <Link to="/admin/bots">Chatbots</Link>
      <Link to="/admin/conversations">Conversations</Link>
      <Link to="/admin/knowledge">Knowledge Base</Link>
      <Link to="/admin/settings">Settings</Link>
    </div>
  );
}
