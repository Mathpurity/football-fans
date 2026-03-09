import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "../pages/Home";
import Gallery from "../pages/Gallery";
import Videos from "../pages/Videos";
import Contact from "../pages/Contact";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import UploadImage from "../pages/admin/UploadImage";
import AdminMessages from "../pages/admin/Messages";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../components/admin/DashboardLayout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ---------------- PUBLIC ROUTES ---------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />

        {/* ---------------- ADMIN LOGIN ---------------- */}
        <Route path="/admin/login" element={<Login />} />

        {/* ---------------- PROTECTED ADMIN ROUTES ---------------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload" element={<UploadImage />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>

        {/* ---------------- FALLBACK ---------------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}