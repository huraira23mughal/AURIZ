import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const plans = [
  {
    id: 1,
    name: "VIP 1 Yield Plan",
    desc: "Provides a daily yield on lockups. Ideal for entry-level digital record ticket allocation.",
    minDeposit: 10.00,
    dailyRate: "3.0%",
    cycle: "1 Day",
    accent: "from-yellow-400 to-amber-500"
  },
  {
    id: 2,
    name: "VIP 2 Premium Yield",
    desc: "Unlock secondary album launch bonuses. Yield distributions settled every 24 hours.",
    minDeposit: 100.00,
    dailyRate: "3.5%",
    cycle: "7 Days",
    accent: "from-yellow-500 to-amber-600"
  },
  {
    id: 3,
    name: "VIP 3 Executive Multiplier",
    desc: "Maximizes platform returns with high priority pre-release concert ticketing options.",
    minDeposit: 500.00,
    dailyRate: "4.0%",
    cycle: "30 Days",
    accent: "from-amber-400 to-yellow-600"
  }
];

export default function FinancePage() {
  const { profile, reloadProfile } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const userBalance = parseFloat(profile?.total_assets || 0);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSubscribe = async (plan) => {
    if (userBalance < plan.minDeposit) {
      alert(`Insufficient balance. Subscribing to ${plan.name} requires a minimum available balance of $${plan.minDeposit.toFixed(2)}. Please recharge your account.`);
      navigate("/recharge");
      return;
    }

    if (!window.confirm(`Are you sure you want to subscribe to ${plan.name} with a lockup of $${plan.minDeposit.toFixed(2)}?`)) {
      return;
    }

    setSubmitting(true);
    try {
      // Create a ticket-like purchase to represent the locked yield plan
      await API.post("tickets/purchase/", {
        album_id: plan.id + 100, // custom id offset for plans
        title: plan.name,
        artist: "Yield Lockup Package",
        price: plan.minDeposit,
        profitRate: parseFloat(plan.dailyRate) / 100,
        img: "",
        paymentMode: "balance",
        qty: 1
      });
      
      showToast(`🎉 Subscribed to ${plan.name} successfully! Check Income tab.`);
      reloadProfile();
    } catch (err) {
      alert(err.response?.data?.error || "Subscription failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div className="px-4 pt-12 pb-5 border-b border-white/5 bg-[#070a12]/80 backdrop-blur-md">
        <h1 className="text-2xl font-black text-white">
          Yield <span style={{ color: "#ffd066" }}>Packages</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Lock available funds to generate recurring daily passive returns.
        </p>
      </div>

      <div className="px-4 py-4 space-y-4 pb-28">
        {/* Balance Card */}
        <div className="bg-[#151c2c]/40 border border-white/5 rounded-3xl p-4 flex justify-between items-center">
          <div>
            <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-bold">My Available Balance</span>
            <h2 className="text-xl font-black text-[#ffd066] mt-1">${userBalance.toFixed(2)}</h2>
          </div>
          <button 
            onClick={() => navigate("/recharge")}
            className="px-4 py-2 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-xs font-black rounded-xl hover:brightness-105 transition"
          >
            Recharge
          </button>
        </div>

        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-[#151c2c]/40 border border-white/5 rounded-3xl p-4 relative overflow-hidden transition hover:border-[#ffd066]/15"
          >
            {/* Ambient accent strip */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${plan.accent}`} />
            
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-black text-white">{plan.name}</h3>
              <span className="text-[9px] font-black text-black bg-gradient-to-r from-[#ffd978] to-[#d4af37] px-2 py-0.5 rounded-full uppercase">
                Active
              </span>
            </div>
            
            <p className="text-[10px] text-gray-400 leading-relaxed mb-5">
              {plan.desc}
            </p>

            <div className="grid grid-cols-3 gap-2 mb-5">
              <div>
                <span className="text-[8px] text-gray-500 uppercase font-black block tracking-tight">Min Deposit</span>
                <span className="text-[11px] font-black text-white mt-1 block">${plan.minDeposit.toFixed(0)}</span>
              </div>
              <div>
                <span className="text-[8px] text-gray-500 uppercase font-black block tracking-tight">Daily Rate</span>
                <span className="text-[11px] font-black text-[#ffd066] mt-1 block">{plan.dailyRate}</span>
              </div>
              <div>
                <span className="text-[8px] text-gray-500 uppercase font-black block tracking-tight">Cycle Period</span>
                <span className="text-[11px] font-black text-white mt-1 block truncate">{plan.cycle}</span>
              </div>
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black font-black text-xs hover:brightness-105 shadow-md transition cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Subscribing..." : "Subscribe Package"}
            </button>

          </div>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-xs font-bold px-5 py-2.5 rounded-full shadow-lg z-50">
          {toast}
        </div>
      )}

      <BottomNav activePage="finance" />
    </MobileLayout>
  );
}
