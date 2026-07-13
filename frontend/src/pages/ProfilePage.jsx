import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";
import { FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="#D4AF37" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Team Earnings",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="4" width="22" height="16" rx="2" stroke="#D4AF37" strokeWidth="1.5"/>
        <path d="M1 10h22" stroke="#D4AF37" strokeWidth="1.5"/>
      </svg>
    ),
    label: "Wallet Bind",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
        <polyline points="16 6 12 2 8 6" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="2" x2="12" y2="15" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Share Code",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Company Agreement",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Membership",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Record",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function ProfilePage() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Fallback defaults if profile data is still loading
  const email = user?.email || "alex.johnson@auriz.com";
  const fullName = user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username : "Alex Johnson";
  const level = profile?.level || 2;
  const membersCount = profile?.members_referred || 1;
  const membersTarget = profile?.members_target || 3;
  const rechargeAmount = profile?.recharge_amount || 300;
  const rechargeTarget = profile?.recharge_target || 500;
  
  const totalEarnings = profile?.total_earnings || "1250";
  const personalGain = profile?.personal_gain || "450";

  // Progress percentages
  const membersProgress = Math.min((membersCount / membersTarget) * 100, 100);
  const rechargeProgress = Math.min((rechargeAmount / rechargeTarget) * 100, 100);

  return (
    <MobileLayout>
      {/* ── Header ── */}
      <div
        style={{
          background: "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
        className="px-5 pt-12 pb-6 relative"
      >
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-12 right-5 text-gray-400 hover:text-red-400 transition flex items-center gap-1.5 text-xs font-semibold"
        >
          <FaSignOutAlt /> Log out
        </button>

        <div className="flex items-center justify-between">
          {/* Left – Logo + Level */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={{ boxShadow: ["0 0 15px rgba(212,175,55,0.4)", "0 0 35px rgba(212,175,55,0.8)", "0 0 15px rgba(212,175,55,0.4)"] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl text-black"
              style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37, #B8860B)" }}
            >
              A
            </motion.div>
            <div className="text-center">
              <div
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(255,217,120,0.2), rgba(212,175,55,0.1))",
                  border: "1px solid rgba(212,175,55,0.4)",
                  color: "#FFD978",
                }}
              >
                Current Level: LV{level}
              </div>
            </div>
          </div>

          {/* Right – User Info */}
          <div className="flex-1 ml-6">
            <h2 className="text-lg font-bold text-white">{fullName}</h2>
            <p className="text-sm text-gray-400 mt-1">{email}</p>
            <p className="text-xs text-gray-500 mt-1">
              Member since {user?.date_joined ? new Date(user.date_joined).toLocaleDateString(undefined, {month: 'short', year: 'numeric'}) : "Jan 2024"}
            </p>
            <div
              className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(34,197,94,0.15)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#4ade80",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Active
            </div>
          </div>
        </div>

        {/* Level Up Requirements */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-5 glass-gold rounded-2xl p-4"
          style={{ border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#D4AF37" }}
          >
            ⬆ Level Up Requirements
          </p>

          {/* Track 1 – Members */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300 font-medium">Members</span>
              <span style={{ color: "#FFD978" }} className="font-bold">{membersCount} / {membersTarget}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${membersProgress}%` }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="h-2 rounded-full progress-gold"
              />
            </div>
          </div>

          {/* Track 2 – Recharge */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300 font-medium">Recharge</span>
              <span style={{ color: "#FFD978" }} className="font-bold">${rechargeAmount} / ${rechargeTarget} USD</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${rechargeProgress}%` }}
                transition={{ duration: 1.4, delay: 0.5 }}
                className="h-2 rounded-full progress-gold"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* ── Earnings Grid ── */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          <div
            className="glass rounded-2xl p-4"
            style={{ border: "1px solid rgba(212,175,55,0.15)" }}
          >
            <p className="text-xs text-gray-400 mb-2">Current Earnings</p>
            <p
              className="text-2xl font-black gold-text"
            >
              ${totalEarnings}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-green-400 text-xs">▲ +8.3%</span>
            </div>
          </div>
          <div
            className="glass rounded-2xl p-4"
            style={{ border: "1px solid rgba(212,175,55,0.15)" }}
          >
            <p className="text-xs text-gray-400 mb-2">Personal Gain</p>
            <p className="text-2xl font-black gold-text">${personalGain}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-green-400 text-xs">▲ +5.1%</span>
            </div>
          </div>
        </motion.div>

        {/* ── Action Buttons ── */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          <Link to="/recharge" className="w-full">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="goldPillBtn w-full py-4 text-base font-bold flex items-center justify-center gap-2"
              style={{
                boxShadow: "0 0 25px rgba(212,175,55,0.5), 0 4px 20px rgba(212,175,55,0.3)",
              }}
            >
              💳 Recharge
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="py-4 text-base font-bold rounded-full transition-all duration-300"
            style={{
              background: "transparent",
              border: "2px solid #D4AF37",
              color: "#FFD978",
              boxShadow: "0 0 15px rgba(212,175,55,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(212,175,55,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 15px rgba(212,175,55,0.2)";
            }}
          >
            💸 Withdrawal
          </motion.button>
        </motion.div>

        {/* ── Menu Items ── */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Menu</p>
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.35 }}
                className="glass flex items-center gap-3 p-4 rounded-2xl text-left"
                style={{ border: "1px solid rgba(212,175,55,0.1)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(212,175,55,0.1)" }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="rgba(212,175,55,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav activePage="profile" />
    </MobileLayout>
  );
}
