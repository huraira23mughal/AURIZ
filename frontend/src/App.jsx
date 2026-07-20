import { Routes, Route, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChartPie } from "react-icons/fa";

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
import {
  TeamIncomePage,
  AccountRecordPage,
  CustomerServicePage,
  InviteFriendsPage,
  UserAgreementPage,
} from "./pages/ProfileSubPages";

// Admin Panel
import AdminPage from "./pages/AdminPage";

// Security & Context
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

function AppContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Marketing paths where the floating button should show
  const isMarketingPage = ["/", "/companies", "/plans", "/news", "/about", "/contact"].includes(
    location.pathname
  );

  return (
    <>
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

        {/* Profile Sub-Pages */}
        <Route path="/team-income" element={<ProtectedRoute><TeamIncomePage /></ProtectedRoute>} />
        <Route path="/account-record" element={<ProtectedRoute><AccountRecordPage /></ProtectedRoute>} />
        <Route path="/customer-service" element={<ProtectedRoute><CustomerServicePage /></ProtectedRoute>} />
        <Route path="/invite" element={<ProtectedRoute><InviteFriendsPage /></ProtectedRoute>} />
        <Route path="/user-agreement" element={<ProtectedRoute><UserAgreementPage /></ProtectedRoute>} />

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

      {/* Global Floating Dashboard Button with very high z-index */}
      {isAuthenticated && isMarketingPage && (
        <Link to="/dashboard">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-4 md:bottom-8 md:right-6 z-[9999] flex items-center gap-2 font-bold text-xs md:text-sm px-4 py-3 md:px-5 md:py-3.5 rounded-2xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #FFD978, #D4AF37)",
              color: "#000",
              boxShadow: "0 0 25px rgba(212,175,55,0.4), 0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <FaChartPie size={14} />
            Open Dashboard
          </motion.div>
        </Link>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;