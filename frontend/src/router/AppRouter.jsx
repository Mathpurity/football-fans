import { Routes, Route, useLocation } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Gallery from "../pages/Gallery.jsx";
import Videos from "../pages/Videos.jsx";
import Contact from "../pages/Contact.jsx";

import Login from "../pages/admin/Login.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import ImagesAdmin from "../pages/admin/Images.jsx";
import AdminMessages from "../pages/admin/Messages.jsx";

import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function AppRouter() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<Login />} />

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
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}
