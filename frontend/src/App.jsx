import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout & Landing components
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Stats from "./components/home/Stats";
import Companies from "./components/home/Companies";
import Features from "./components/home/Features";
import Plans from "./components/home/Plans";
import News from "./components/home/News";
import Testimonials from "./components/home/Testimonials";
import About from "./components/home/About";
import Contact from "./components/home/Contact";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader";

// Authentication Pages
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Verification from "./pages/VerifyEmail";

// Protected Dashboard Pages
import RechargePage from "./pages/RechargePage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import TasksPage from "./pages/TasksPage";
import AssetsPage from "./pages/AssetsPage";
import FinancePage from "./pages/FinancePage";

// Admin Panel
import AdminPage from "./pages/AdminPage";

// Security & Context
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Companies />
      <Features />
      <Plans />
      <News />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Render Landing Page (Website) at root "/" */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <AssetsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance"
          element={
            <ProtectedRoute>
              <FinancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recharge"
          element={
            <ProtectedRoute>
              <RechargePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Panel (requires is_staff) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;