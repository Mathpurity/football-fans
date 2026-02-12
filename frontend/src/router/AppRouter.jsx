import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Gallery from "../pages/Gallery";
import Videos from "../pages/Videos";
import Contact from "../pages/Contact";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import UploadImage from "../pages/admin/UploadImage"; // ✅ Correct
import AdminMessages from "../pages/admin/Messages";

import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

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
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute>
              <UploadImage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <AdminMessages />
            </ProtectedRoute>
          }
        />

        {/* Redirect /admin → dashboard */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* ---------------- FALLBACK ---------------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}
