import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";

const menuItems = [
  { icon: "👥", label: "Team's income" },
  { icon: "📝", label: "Account change record" },
  { icon: "🎧", label: "Customer service" },
  { icon: "🔗", label: "Invite friends" },
  { icon: "📜", label: "User Agreement" }
];

export default function ProfilePage() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const username = user?.username || "nasirqureshi1014";
  const email = user?.email || "nasirqureshi1014@gmail.com";
  const level = profile?.level || 1;
  const availableBalance = profile?.available_balance || 124.83;
  const personalIncome = profile?.personal_income || 146.83;
  const subordinatesText = "7/3 vip1 subordinates";

  return (
    <MobileLayout>
      {/* Header bar */}
      <header className="flex justify-between items-center px-5 py-4 border-b border-white/5 bg-[#070a12]/80 backdrop-blur-md">
        <button onClick={handleLogout} className="text-xl text-gray-400 hover:text-red-400 transition cursor-pointer">
          ⚙️
        </button>
        <h3 className="text-sm font-black text-white">user center</h3>
        <button className="text-xl text-gray-400">
          💬
        </button>
      </header>

      {/* Main user info card */}
      <div className="px-5 py-5 space-y-5">
        
        <div className="bg-[#151c2c]/40 border border-[#ffd066]/10 rounded-[28px] p-5 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-5 relative">
            
            {/* Avatar circle */}
            <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-br from-[#ffd978] to-[#d4af37] p-[2px]">
              <div className="w-full h-full rounded-full bg-[#070a12] flex items-center justify-center text-white font-black text-lg">
                {username.substring(0, 1).toUpperCase()}
              </div>
            </div>

            {/* Profile tags */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-black text-white truncate">{username}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                  vip{level}
                </span>
                <span className="text-[9px] text-gray-400 truncate">
                  Next level: 59.00/300.00 (Recharge)
                </span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">{subordinatesText}</p>
            </div>

            {/* Warner Style Logo */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ffd978] to-[#d4af37] border-2 border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] flex-shrink-0">
              <span className="text-xl font-black text-black tracking-tighter">A</span>
            </div>

          </div>

          {/* Income indicator grids */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-3">
              <span className="text-[10px] text-gray-400 block mb-1">Personal income</span>
              <span className="text-base font-black text-[#ffd066]">${personalIncome.toFixed(2)}</span>
            </div>
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-3">
              <span className="text-[10px] text-gray-400 block mb-1">Available Balance</span>
              <span className="text-base font-black text-[#ffd066]">${availableBalance.toFixed(2)}</span>
            </div>
          </div>

          {/* Membership tier */}
          <div className="flex justify-between items-center bg-white/[0.01] border border-white/5 rounded-2xl p-3.5 mb-4">
            <span className="text-xs font-semibold text-white">Membership level</span>
            <button className="px-3 py-1 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-[10px] font-black rounded-lg cursor-pointer">
              More
            </button>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-3">
            <Link to="/recharge" className="w-full">
              <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ffd978] to-[#d4af37] hover:brightness-105 text-black text-xs font-black shadow-lg transition cursor-pointer">
                Recharge
              </button>
            </Link>
            <button
              onClick={() => alert("Withdrawal: Bind wallet address first under settings.")}
              className="w-full py-3.5 rounded-full bg-transparent border border-[#ffd066] text-[#ffd978] text-xs font-black hover:bg-white/[0.02] transition cursor-pointer"
            >
              Withdraw
            </button>
          </div>

        </div>

        {/* Menu list */}
        <ul className="bg-[#151c2c]/40 border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              onClick={() => alert(`Opening option: ${item.label}`)}
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

      <BottomNav activePage="profile" />
    </MobileLayout>
  );
}
