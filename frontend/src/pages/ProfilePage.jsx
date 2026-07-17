import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";
import API from "../api/axios";

const menuItems = [
  { icon: "👥", label: "Team's income", action: "team" },
  { icon: "📝", label: "Account change record", action: "record" },
  { icon: "🎧", label: "Customer service", action: "service" },
  { icon: "🔗", label: "Invite friends", action: "invite" },
  { icon: "📜", label: "User Agreement", action: "agreement" },
];

export default function ProfilePage() {
  const { user, profile, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({ amount: "", wallet_address: "", note: "" });
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleMenuAction = (action) => {
    if (action === "invite") {
      const link = `${window.location.origin}/register`;
      navigator.clipboard.writeText(link).then(() => showToast("✅ Invite link copied!"));
    } else {
      showToast(`Opening: ${menuItems.find((m) => m.action === action)?.label}`);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawForm.amount || parseFloat(withdrawForm.amount) < 10) {
      setWithdrawError("Minimum withdrawal is $10.");
      return;
    }
    if (!withdrawForm.wallet_address.trim()) {
      setWithdrawError("Wallet address is required.");
      return;
    }
    setWithdrawLoading(true);
    setWithdrawError("");
    try {
      await API.post("withdraw/", {
        amount: parseFloat(withdrawForm.amount),
        wallet_address: withdrawForm.wallet_address,
        note: withdrawForm.note,
      });
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
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-4 border-b border-white/5 bg-[#070a12]/80 backdrop-blur-md sticky top-0 z-10">
        <button
          onClick={() => showToast("Settings coming soon")}
          className="text-xl text-gray-400 hover:text-white transition cursor-pointer"
        >
          ⚙️
        </button>
        <h3 className="text-sm font-black text-white">User Center</h3>
        <button
          onClick={() => showToast("Support chat coming soon")}
          className="text-xl text-gray-400 hover:text-white transition cursor-pointer"
        >
          💬
        </button>
      </header>

      <div className="px-4 py-4 space-y-4 pb-28">

        {/* Main user info card */}
        <div className="bg-[#151c2c]/40 border border-[#ffd066]/10 rounded-[28px] p-4 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-5">
            {/* Avatar */}
            <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-br from-[#ffd978] to-[#d4af37] p-[2px] flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#070a12] flex items-center justify-center text-white font-black text-lg">
                {username.substring(0, 1).toUpperCase()}
              </div>
            </div>

            {/* Profile info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-black text-white truncate">{username}</h3>
              <p className="text-[10px] text-gray-400 truncate">{email}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                  VIP {level}
                </span>
                {isAdmin && (
                  <span className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-2.5">
              <span className="text-[10px] text-gray-400 block mb-1 tracking-tight">Total Earnings</span>
              <span className="text-sm font-black text-[#ffd066]">${totalEarnings.toFixed(2)}</span>
            </div>
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-2.5">
              <span className="text-[10px] text-gray-400 block mb-1 tracking-tight">Total Assets</span>
              <span className="text-sm font-black text-[#ffd066]">${totalAssets.toFixed(2)}</span>
            </div>
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-2.5">
              <span className="text-[10px] text-gray-400 block mb-1 tracking-tight">Vouchers</span>
              <span className="text-sm font-black text-white">{vouchers}</span>
            </div>
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-2.5">
              <span className="text-[10px] text-gray-400 block mb-1 tracking-tight">Members Referred</span>
              <span className="text-sm font-black text-white">{membersReferred}</span>
            </div>
          </div>

          {/* Progress to next level */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-3.5 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-gray-400 font-semibold">Level Progress</span>
              <span className="text-[10px] font-black text-[#ffd066]">VIP {level} → VIP {level + 1}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#ffd978] to-[#d4af37] rounded-full transition-all"
                style={{ width: `${Math.min((totalAssets / ((level + 1) * 500)) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[9px] text-gray-500 mt-1">
              ${totalAssets.toFixed(2)} / ${((level + 1) * 500).toFixed(2)} to next level
            </p>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-3">
            <Link to="/recharge" className="w-full">
              <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ffd978] to-[#d4af37] hover:brightness-105 text-black text-xs font-black shadow-lg transition cursor-pointer">
                Recharge
              </button>
            </Link>
            <button
              onClick={() => setShowWithdraw(true)}
              className="w-full py-3.5 rounded-full bg-transparent border border-[#ffd066] text-[#ffd978] text-xs font-black hover:bg-white/[0.02] transition cursor-pointer"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Admin Panel Button */}
        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600/20 to-purple-800/20 border border-purple-500/30 text-purple-300 text-xs font-black rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/10 transition cursor-pointer flex items-center justify-center gap-2"
          >
            🛡️ Open Admin Panel
          </button>
        )}

        {/* Menu List */}
        <ul className="bg-[#151c2c]/40 border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleMenuAction(item.action)}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/[0.02] transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs font-bold text-white">{item.label}</span>
              </div>
              <span className="text-gray-500 text-lg leading-none">›</span>
            </li>
          ))}
        </ul>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className="w-full py-3.5 bg-white/[0.02] border border-white/5 hover:border-red-500/20 hover:bg-red-500/5 text-red-400 text-xs font-black rounded-2xl transition cursor-pointer"
        >
          Sign out
        </button>

      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdraw && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowWithdraw(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-[#0e1424] border-t border-[#ffd066]/15 rounded-t-[28px] p-6 pb-10 z-50"
            >
              <div className="flex items-center justify-between mb-5">
                <button onClick={() => setShowWithdraw(false)} className="text-xl font-bold text-gray-400">←</button>
                <h4 className="text-sm font-black text-white">Withdraw Funds</h4>
                <div className="w-8" />
              </div>

              {withdrawError && (
                <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-400 font-semibold">
                  ⚠️ {withdrawError}
                </div>
              )}

              <form onSubmit={handleWithdraw} className="space-y-4">
                <div>
                  <label className="text-[10px] text-[#ffd066]/80 font-bold uppercase tracking-widest block mb-1.5">Amount (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="10"
                    value={withdrawForm.amount}
                    onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                    placeholder="Min. $10.00"
                    className="w-full py-3.5 px-4 bg-[#090d16] border border-white/[0.06] rounded-2xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#ffd066]/80 font-bold uppercase tracking-widest block mb-1.5">TRC20 Wallet Address</label>
                  <input
                    type="text"
                    value={withdrawForm.wallet_address}
                    onChange={(e) => setWithdrawForm({ ...withdrawForm, wallet_address: e.target.value })}
                    placeholder="Enter TRC20 wallet address"
                    className="w-full py-3.5 px-4 bg-[#090d16] border border-white/[0.06] rounded-2xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={withdrawLoading}
                  className="w-full py-4 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black font-black text-xs rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {withdrawLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : "Submit Withdrawal"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 60, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-[11px] font-bold px-5 py-2.5 rounded-full shadow-lg z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activePage="profile" />
    </MobileLayout>
  );
}
