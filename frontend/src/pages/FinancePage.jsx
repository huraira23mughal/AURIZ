import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const plans = [
  { id: 1, name: "VIP 1 Yield Plan", desc: "Provides a daily yield on lockups. Ideal for entry-level digital record ticket allocation.", minDeposit: 10.00, dailyRate: "3.0%", cycle: "1 Day", accent: "#D4AF37" },
  { id: 2, name: "VIP 2 Premium Yield", desc: "Unlock secondary album launch bonuses. Yield distributions settled every 24 hours.", minDeposit: 100.00, dailyRate: "3.5%", cycle: "7 Days", accent: "#60a5fa" },
  { id: 3, name: "VIP 3 Executive Multiplier", desc: "Maximizes platform returns with high priority pre-release concert ticketing options.", minDeposit: 500.00, dailyRate: "4.0%", cycle: "30 Days", accent: "#4ade80" },
];

export default function FinancePage() {
  const { profile, reloadProfile } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submittingId, setSubmittingId] = useState(null);
  const [toast, setToast] = useState("");

  const userBalance = parseFloat(profile?.total_assets || 0);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleSubscribe = async (plan) => {
    if (userBalance < plan.minDeposit) {
      alert(`Insufficient balance. Minimum required: $${plan.minDeposit.toFixed(2)}. Please recharge.`);
      navigate("/recharge");
      return;
    }
    if (!window.confirm(`Subscribe to ${plan.name} with $${plan.minDeposit.toFixed(2)} lockup?`)) return;
    setSubmitting(true);
    setSubmittingId(plan.id);
    try {
      await API.post("tickets/purchase/", {
        album_id: plan.id + 100,
        title: plan.name,
        artist: "Yield Lockup Package",
        price: plan.minDeposit,
        profitRate: parseFloat(plan.dailyRate) / 100,
        img: "",
        paymentMode: "balance",
        qty: 1
      });
      showToast(`🎉 Subscribed to ${plan.name} successfully!`);
      reloadProfile();
    } catch (err) {
      alert(err.response?.data?.error || "Subscription failed. Please try again.");
    } finally {
      setSubmitting(false);
      setSubmittingId(null);
    }
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div className="px-4 pt-12 pb-5 relative"
        style={{ background: "rgba(10,10,20,0.8)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <h1 className="text-2xl font-black text-white">
          Yield <span className="bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">Packages</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Lock funds to generate recurring daily passive returns.</p>
      </div>

      <div className="px-4 py-4 space-y-4 pb-28">

        {/* Balance Card */}
        <div className="rounded-2xl p-4 flex justify-between items-center relative overflow-hidden"
          style={{ background: "rgba(18,24,40,0.7)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
          <div>
            <span className="text-[10px] text-gray-500 block uppercase tracking-wider font-bold">My Available Balance</span>
            <motion.h2
              className="text-xl font-black text-yellow-400 mt-1"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ${userBalance.toFixed(2)}
            </motion.h2>
          </div>
          <button onClick={() => navigate("/recharge")}
            className="px-4 py-2.5 rounded-xl text-black text-xs font-black transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)", boxShadow: "0 0 14px rgba(212,175,55,0.2)" }}>
            Recharge
          </button>
        </div>

        {/* Plan Cards */}
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="rounded-[20px] p-5 relative overflow-hidden transition-all hover:border-white/10"
            style={{ background: "rgba(18,24,40,0.65)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}
          >
            {/* Left accent bar */}
            <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full" style={{ background: plan.accent }} />
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${plan.accent}10 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />

            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-black text-white">{plan.name}</h3>
              <span className="text-[9px] font-black text-black px-2 py-0.5 rounded-full"
                style={{ background: `linear-gradient(135deg, #FFD978, #D4AF37)` }}>
                Active
              </span>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed mb-5">{plan.desc}</p>

            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { label: "Min Deposit", value: `$${plan.minDeposit.toFixed(0)}`, color: "white" },
                { label: "Daily Rate", value: plan.dailyRate, color: plan.accent },
                { label: "Cycle Period", value: plan.cycle, color: "white" },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl p-2.5 text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-[8px] text-gray-600 uppercase font-black block tracking-tight">{stat.label}</span>
                  <span className="text-[11px] font-black mt-1 block truncate" style={{ color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              disabled={submitting && submittingId === plan.id}
              className="w-full py-3.5 rounded-2xl font-black text-xs text-black transition hover:opacity-90 disabled:opacity-60 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)", boxShadow: "0 0 16px rgba(212,175,55,0.2)" }}
            >
              {submitting && submittingId === plan.id ? "Subscribing..." : "Subscribe Package"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 text-black text-[11px] font-bold px-5 py-2.5 rounded-full shadow-lg z-50"
            style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activePage="finance" />
    </MobileLayout>
  );
}
