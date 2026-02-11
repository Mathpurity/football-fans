import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Gallery from "../pages/Gallery";
import Videos from "../pages/Videos";
import Contact from "../pages/Contact";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import ImagesAdmin from "../pages/admin/Images";
import AdminMessages from "../pages/admin/Messages";

import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Redirect /admin → /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/images"
          element={
            <ProtectedRoute>
              <ImagesAdmin />
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

        {/* Catch-all (Optional but recommended) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}
