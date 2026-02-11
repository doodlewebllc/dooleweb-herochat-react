import { Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminWebsites from "./pages/admin/AdminWebsites";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import PublicRoute from "./components/admin/PublicRoute";
import AdminLayout from "./layouts/AdminLayout";

export default function App() {
  return (
    <Routes>
      <Route
        path="/admin/login"
        element={<PublicRoute><AdminLogin /></PublicRoute>}
      />

      <Route
        path="/admin"
        element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="websites" element={<AdminWebsites />} />
      </Route>
    </Routes>
  );
}
