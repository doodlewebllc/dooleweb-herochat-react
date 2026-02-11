import { useEffect, useState } from "react";
import "../../styles/AdminWebsite.css";

const API = import.meta.env.VITE_BACKEND_API_URL;

export default function Websites() {

  const [websites, setWebsites] = useState([]);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");

  useEffect(() => {
    loadWebsites();
  }, []);

  async function loadWebsites() {
    const res = await fetch(`${API}/api/admin/websites`);
    const data = await res.json();
    setWebsites(data);
  }

  async function createWebsite() {
    await fetch(`${API}/api/admin/websites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer_id: 1, name, domain })
    });

    setName("");
    setDomain("");
    loadWebsites();
  }

  async function deleteWebsite(id) {
    await fetch(`${API}/api/admin/websites/${id}`, {
      method: "DELETE"
    });

    loadWebsites();
  }

  return (
    <div>

      <h2>Websites</h2>

      <div className="card">

        <div className="form-row">
          <input
            placeholder="Website Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            placeholder="Domain"
            value={domain}
            onChange={e => setDomain(e.target.value)}
          />

          <button onClick={createWebsite}>
            Add Website
          </button>
        </div>

        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Domain</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {websites.map(w => (
              <tr key={w.id}>
                <td>{w.name}</td>
                <td>{w.domain}</td>
                <td>
                  <button onClick={() => deleteWebsite(w.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}
