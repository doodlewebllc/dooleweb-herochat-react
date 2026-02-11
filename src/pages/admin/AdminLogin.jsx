import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import "../../styles/AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("adminToken", data.token);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        {/* Left illustration */}
        <div classNamillustratione="admin-login-left">
        </div>

        {/* Right form */}
        <div className="admin-login-right">
          <h2 className="admin-login-title">Hero Chat Admin Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="admin-input-group">
              <Mail size={18} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value); setError(""); }} className="admin-input" required />
            </div>

            <div className="admin-input-group">
              <Lock size={18} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); setError(""); }} className="admin-input" required />
            </div>

            {error && <div className="admin-error">{error}</div>}
            
            <button type="submit" className="admin-login-btn" disabled={loading} > {loading ? "Signing in..." : "LOGIN"} </button>
          </form>

          <div className="admin-login-footer">
            <p>Forgot your password? <a href="#">Get help signing in</a></p>
            <p>Terms of use. Privacy policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
