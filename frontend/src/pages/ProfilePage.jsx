import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";
import API from "../api/axios";

const menuItems = [
  { icon: "👥", label: "Team's income", action: "team",      path: "/team-income" },
  { icon: "📝", label: "Account change record", action: "record", path: "/account-record" },
  { icon: "🎧", label: "Customer service", action: "service",  path: "/customer-service" },
  { icon: "🔗", label: "Invite friends", action: "invite",    path: "/invite" },
  { icon: "📜", label: "User Agreement", action: "agreement", path: "/user-agreement" },
];

export default function ProfilePage() {
  const { user, profile, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({ amount: "", wallet_address: "", note: "" });
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2800); };
  const handleLogout = async () => { await logout(); navigate("/login"); };
  const handleMenuAction = (path) => {
    navigate(path);
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawForm.amount || parseFloat(withdrawForm.amount) < 10) { setWithdrawError("Minimum withdrawal is $10."); return; }
    if (!withdrawForm.wallet_address.trim()) { setWithdrawError("Wallet address is required."); return; }
    setWithdrawLoading(true);
    setWithdrawError("");
    try {
      await API.post("withdraw/", { amount: parseFloat(withdrawForm.amount), wallet_address: withdrawForm.wallet_address, note: withdrawForm.note });
      setShowWithdraw(false);
      setWithdrawForm({ amount: "", wallet_address: "", note: "" });
      showToast("✅ Withdrawal request submitted! Pending review.");
    } catch (err) {
      setWithdrawError(err.response?.data?.error || "Withdrawal failed. Please try again.");
    } finally {
      setWithdrawLoading(false);
    }
  };

  const username = user?.username || "—";
  const email = user?.email || "—";
  const level = profile?.level || 1;
  const totalEarnings = parseFloat(profile?.total_earnings || 0);
  const totalAssets = parseFloat(profile?.total_assets || 0);
  const membersReferred = profile?.members_referred || 0;
  const vouchers = profile?.vouchers || 0;

  return (
    <MobileLayout>
      {/* ── Header ── */}
      <header className="flex justify-between items-center px-4 py-4 sticky top-0 z-10 backdrop-blur-2xl"
        style={{ background: "rgba(10,10,20,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={() => showToast("Settings coming soon")}
          className="text-gray-400 hover:text-white transition text-xl cursor-pointer">⚙️</button>
        <h3 className="text-sm font-black text-white tracking-wide">User Center</h3>
        <button onClick={() => showToast("Support chat coming soon")}
          className="text-gray-400 hover:text-white transition text-xl cursor-pointer">💬</button>
      </header>

      <div className="px-4 py-4 space-y-4 pb-28">

        {/* ── Profile Card ── */}
        <div className="rounded-[24px] p-5 relative overflow-hidden"
          style={{ background: "rgba(18,24,40,0.7)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(24px)" }}>
          {/* Gold shimmer top */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

          <div className="flex items-center gap-4 mb-5">
            {/* Avatar */}
            <motion.div
              animate={{ boxShadow: ["0 0 12px rgba(212,175,55,0.2)", "0 0 28px rgba(212,175,55,0.45)", "0 0 12px rgba(212,175,55,0.2)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-14 h-14 rounded-2xl p-[2px] flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}
            >
              <div className="w-full h-full rounded-[14px] flex items-center justify-center text-white font-black text-xl"
                style={{ background: "#070a12" }}>
                {username.substring(0, 1).toUpperCase()}
              </div>
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-black text-white truncate">{username}</h3>
              <p className="text-[10px] text-gray-500 truncate mt-0.5">{email}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[9px] font-black px-2 py-0.5 rounded text-black"
                  style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}>
                  VIP {level}
                </span>
                {isAdmin && (
                  <span className="text-[9px] font-black px-2 py-0.5 rounded text-white"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)" }}>
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: "Total Earnings", value: `$${totalEarnings.toFixed(2)}`, color: "#ffd066" },
              { label: "Total Assets", value: `$${totalAssets.toFixed(2)}`, color: "#ffd066" },
              { label: "Vouchers", value: vouchers, color: "#ffffff" },
              { label: "Members Referred", value: membersReferred, color: "#ffffff" },
            ].map((stat, i) => (
              <div key={i} className="rounded-2xl p-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-[10px] text-gray-500 block mb-1">{stat.label}</span>
                <span className="text-sm font-black" style={{ color: stat.color }}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Level progress */}
          <div className="rounded-2xl p-3 mb-4"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-gray-500 font-semibold">Level Progress</span>
              <span className="text-[10px] font-black text-yellow-400">VIP {level} → VIP {level + 1}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #FFD978, #D4AF37)" }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((totalAssets / ((level + 1) * 500)) * 100, 100)}%` }}
                transition={{ duration: 1.2 }}
              />
            </div>
            <p className="text-[9px] text-gray-600 mt-1.5">${totalAssets.toFixed(2)} / ${((level + 1) * 500).toFixed(2)} to next level</p>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link to="/recharge" className="w-full">
              <button className="w-full py-3.5 rounded-2xl font-black text-xs text-black transition cursor-pointer hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)", boxShadow: "0 0 16px rgba(212,175,55,0.25)" }}>
                Recharge
              </button>
            </Link>
            <button onClick={() => setShowWithdraw(true)}
              className="w-full py-3.5 rounded-2xl font-black text-xs transition cursor-pointer hover:bg-yellow-400/5"
              style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#ffd978" }}>
              Withdraw
            </button>
          </div>
        </div>

        {/* ── Admin Button ── */}
        {isAdmin && (
          <button onClick={() => navigate("/admin")}
            className="w-full py-3.5 rounded-2xl font-black text-xs transition cursor-pointer flex items-center justify-center gap-2 hover:border-purple-400/40"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)", color: "#c4b5fd" }}>
            🛡️ Open Admin Panel
          </button>
        )}

        {/* ── Menu List ── */}
        <div className="rounded-3xl overflow-hidden"
          style={{ background: "rgba(18,24,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)" }}>
          {menuItems.map((item, idx) => (
            <div key={idx} onClick={() => handleMenuAction(item.path)}
              className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-white/[0.02] transition"
              style={{ borderBottom: idx < menuItems.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs font-bold text-white">{item.label}</span>
              </div>
              <span className="text-gray-600 text-lg leading-none">›</span>
            </div>
          ))}
        </div>

        {/* ── Sign Out ── */}
        <button onClick={handleLogout}
          className="w-full py-3.5 rounded-2xl font-black text-xs transition cursor-pointer hover:bg-red-500/8"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "#f87171" }}>
          Sign out
        </button>
      </div>

      {/* ── Withdraw Drawer ── */}
      <AnimatePresence>
        {showWithdraw && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40" onClick={() => setShowWithdraw(false)} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 rounded-t-[28px] p-6 pb-10 z-50"
              style={{ background: "rgba(10,12,22,0.98)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(32px)" }}
            >
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

              <div className="flex items-center justify-between mb-5">
                <button onClick={() => setShowWithdraw(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>←</button>
                <h4 className="text-sm font-black text-white">Withdraw Funds</h4>
                <div className="w-9" />
              </div>

              {withdrawError && (
                <div className="mb-4 px-4 py-3 rounded-2xl text-xs font-semibold text-red-400"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  ⚠️ {withdrawError}
                </div>
              )}

              <form onSubmit={handleWithdraw} className="space-y-4">
                {[
                  { label: "Amount (USD)", key: "amount", type: "number", placeholder: "Min. $10.00", extra: { step: "0.01", min: "10" } },
                  { label: "TRC20 Wallet Address", key: "wallet_address", type: "text", placeholder: "Enter TRC20 wallet address" },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-[10px] font-bold text-yellow-400/80 uppercase tracking-widest mb-2">{field.label}</label>
                    <input type={field.type} {...(field.extra || {})}
                      value={withdrawForm[field.key]}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full py-3.5 px-4 rounded-2xl text-sm text-white outline-none transition focus:border-yellow-400/50"
                      style={{ background: "rgba(10,10,20,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                  </div>
                ))}

                <button type="submit" disabled={withdrawLoading}
                  className="w-full py-4 rounded-2xl font-black text-xs text-black transition disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)", boxShadow: "0 0 20px rgba(212,175,55,0.2)" }}>
                  {withdrawLoading ? (
                    <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Submitting...</>
                  ) : "Submit Withdrawal"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 60, x: "-50%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 text-black text-[11px] font-bold px-5 py-2.5 rounded-full shadow-lg z-50"
            style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activePage="profile" />
    </MobileLayout>
  );
}
