import React from "react";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";

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
  const handleSubscribe = (plan) => {
    alert(`Subscribing to ${plan.name} requires a minimum available deposit of $${plan.minDeposit.toFixed(2)}. Make a recharge to proceed.`);
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div className="px-5 pt-12 pb-5 border-b border-white/5 bg-[#070a12]/80 backdrop-blur-md">
        <h1 className="text-2xl font-black text-white">
          Yield <span style={{ color: "#ffd066" }}>Packages</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Lock available funds to generate recurring daily passive returns.
        </p>
      </div>

      <div className="px-5 py-5 space-y-4 pb-24">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-[#151c2c]/40 border border-white/5 rounded-3xl p-5 relative overflow-hidden transition hover:border-[#ffd066]/15"
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

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div>
                <span className="text-[8px] text-gray-500 uppercase font-black block tracking-wider">Min Deposit</span>
                <span className="text-xs font-black text-white mt-1 block">${plan.minDeposit.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[8px] text-gray-500 uppercase font-black block tracking-wider">Daily Rate</span>
                <span className="text-xs font-black text-[#ffd066] mt-1 block">{plan.dailyRate}</span>
              </div>
              <div>
                <span className="text-[8px] text-gray-500 uppercase font-black block tracking-wider">Cycle Period</span>
                <span className="text-xs font-black text-white mt-1 block">{plan.cycle}</span>
              </div>
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black font-black text-xs hover:brightness-105 shadow-md transition cursor-pointer"
            >
              Subscribe Package
            </button>

          </div>
        ))}
      </div>

      <BottomNav activePage="finance" />
    </MobileLayout>
  );
}
