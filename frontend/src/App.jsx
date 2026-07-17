import { Routes, Route } from "react-router-dom";

// Landing Pages
import HomePage from "./pages/landing/HomePage";
import CompaniesPage from "./pages/landing/CompaniesPage";
import PlansPage from "./pages/landing/PlansPage";
import NewsPage from "./pages/landing/NewsPage";
import AboutPage from "./pages/landing/AboutPage";
import ContactPage from "./pages/landing/ContactPage";

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

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Landing / Marketing Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

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