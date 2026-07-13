import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";

const ads = [
  {
    title: "NexGen Crypto Index Fund",
    tag: "Crypto",
    tagColor: "#8B5CF6",
    link: "Explore →",
    gradient: "linear-gradient(135deg, #1e1b4b, #312e81)",
    icon: "₿",
  },
  {
    title: "EcoWare Smart Home Tech",
    tag: "Tech",
    tagColor: "#10B981",
    link: "Subscribe",
    gradient: "linear-gradient(135deg, #064e3b, #065f46)",
    icon: "🏠",
  },
  {
    title: "AI Investment Signals",
    tag: "AI",
    tagColor: "#3B82F6",
    link: "Explore →",
    gradient: "linear-gradient(135deg, #1e3a5f, #1e40af)",
    icon: "🤖",
  },
  {
    title: "Bio-Gen Rare Earth Fund",
    tag: "Bio",
    tagColor: "#F59E0B",
    link: "Subscribe",
    gradient: "linear-gradient(135deg, #451a03, #78350f)",
    icon: "🌿",
  },
];

const activityFeed = [
  { icon: "📈", text: "Alex reinvested $500 in Tesla Energy", time: "2m ago", color: "#4ade80" },
  { icon: "💰", text: "Sarah earned $120 daily reward", time: "15m ago", color: "#D4AF37" },
  { icon: "🔄", text: "New VIP plan activated — Gold tier", time: "1h ago", color: "#818cf8" },
  { icon: "✅", text: "Withdrawal of $250 processed", time: "3h ago", color: "#4ade80" },
  { icon: "🎯", text: "Task milestone reached: 18 completed", time: "5h ago", color: "#D4AF37" },
];

const badges = [
  { label: "Bronze", color: "#CD7F32", symbol: "🥉" },
  { label: "Silver", color: "#C0C0C0", symbol: "🥈" },
  { label: "Gold", color: "#D4AF37", symbol: "🥇" },
];

export default function DashboardPage() {
  const [bannerSlide, setBannerSlide] = useState(0);

  return (
    <MobileLayout>
      {/* ── Brand Header ── */}
      <div
        className="px-5 pt-12 pb-5"
        style={{
          background: "linear-gradient(180deg, rgba(212,175,55,0.06) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          {/* Planetary Ring Logo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="relative flex-shrink-0"
            style={{ width: 44, height: 44 }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill="#000"/>
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#000" strokeWidth="1.5" fill="none" transform="rotate(-30 12 12)"/>
              </svg>
            </div>
          </motion.div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Investment Platform</p>
            <h1 className="text-base font-black text-white">Nova Horizon Ventures</h1>
          </div>
          <div className="ml-auto">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div>
          <p className="text-gray-400 text-sm">Good Evening 👋</p>
          <h2 className="text-2xl font-black mt-1">
            Welcome Back,{" "}
            <span className="gold-text">Alex</span>
          </h2>
        </div>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* ── Total Portfolio Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-3xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(13,19,31,0.9))",
            border: "1px solid rgba(212,175,55,0.25)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Total Portfolio</p>
              <motion.p
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl font-black mt-2 gold-text"
              >
                $12,450.00
              </motion.p>
              <p className="text-gray-500 text-xs mt-1">Updated just now</p>
            </div>
            <div
              className="px-3 py-1.5 rounded-full flex items-center gap-1"
              style={{
                background: "rgba(34,197,94,0.15)",
                border: "1px solid rgba(34,197,94,0.3)",
              }}
            >
              <span className="text-green-400 font-bold text-sm">▲ +13.36%</span>
            </div>
          </div>
          {/* Mini progress bar */}
          <div className="mt-4 h-1.5 rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "73%" }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="h-1.5 rounded-full progress-gold"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Monthly target</span>
            <span className="text-yellow-400">73% reached</span>
          </div>
        </motion.div>

        {/* ── Exclusive Offers Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1000, #2d1f00, #1a1000)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          <div className="flex items-stretch min-h-[160px] relative">
            {/* Left Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-yellow-400/70 font-semibold mb-1">
                  Exclusive Offer
                </p>
                <h3 className="text-base font-black gold-text leading-tight">
                  Aethelred Virtual Property
                </h3>
                <p className="text-gray-400 text-xs mt-2 leading-5">
                  Premium digital land with guaranteed 22% monthly returns.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="goldPillBtn text-xs font-bold px-5 py-2 self-start mt-3"
              >
                Go to Site ↗
              </motion.button>
            </div>

            {/* Right – 3D Isometric Land */}
            <div
              className="w-36 flex items-center justify-center p-4 relative"
              style={{ background: "rgba(212,175,55,0.04)" }}
            >
              {/* Isometric Land Parcel */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="relative"
              >
                <svg width="100" height="100" viewBox="0 0 100 100">
                  {/* Ground */}
                  <polygon points="50,60 85,40 50,20 15,40" fill="#2d1f00" stroke="#D4AF37" strokeWidth="1"/>
                  {/* Left face */}
                  <polygon points="15,40 50,60 50,80 15,60" fill="#1a1000" stroke="#D4AF37" strokeWidth="0.5"/>
                  {/* Right face */}
                  <polygon points="85,40 50,60 50,80 85,60" fill="#2a1800" stroke="#D4AF37" strokeWidth="0.5"/>
                  {/* Building */}
                  <polygon points="38,48 62,36 62,26 38,38" fill="#D4AF37" opacity="0.7"/>
                  <polygon points="38,48 62,48 62,26 38,26" fill="#FFD978" opacity="0.3"/>
                  <polygon points="38,48 38,26 20,36 20,48" fill="#B8860B" opacity="0.7"/>
                  {/* Gold glow */}
                  <circle cx="50" cy="35" r="20" fill="rgba(212,175,55,0.08)"/>
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 pb-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setBannerSlide(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: bannerSlide === i ? 20 : 6,
                  height: 6,
                  background: bannerSlide === i
                    ? "linear-gradient(90deg, #FFD978, #D4AF37)"
                    : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Ads Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
            Advertisements
          </p>
          <div className="grid grid-cols-2 gap-3">
            {ads.map((ad, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.35 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="glass rounded-2xl overflow-hidden flex flex-col"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Thumbnail */}
                <div
                  className="h-20 flex items-center justify-center text-4xl"
                  style={{ background: ad.gradient }}
                >
                  {ad.icon}
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${ad.tagColor}22`, color: ad.tagColor }}
                    >
                      {ad.tag}
                    </span>
                    <p className="text-xs font-semibold text-white mt-1.5 leading-tight">
                      {ad.title}
                    </p>
                  </div>
                  <button
                    className="text-[10px] font-bold mt-2 self-end"
                    style={{ color: "#FFD978" }}
                  >
                    {ad.link}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Membership Benefits ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass rounded-3xl p-5 flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.07), rgba(13,19,31,0.9))",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          <div className="flex-1 mr-4">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "#D4AF37" }}
            >
              ✨ Exclusive Membership
            </p>
            <h3 className="text-sm font-black text-white leading-snug">
              Unlock Premium Investment Benefits
            </h3>
            <p className="text-xs text-gray-400 mt-1.5">
              Tier rewards, priority access & VIP returns
            </p>
          </div>
          {/* Tier Badges */}
          <div className="flex gap-1">
            {badges.map((b, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.4, delay: i * 0.2 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${b.color}33, ${b.color}11)`,
                    border: `1px solid ${b.color}44`,
                  }}
                >
                  {b.symbol}
                </div>
                <span
                  className="text-[8px] font-bold"
                  style={{ color: b.color }}
                >
                  {b.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Live Activity Feed ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-300 uppercase tracking-wider">
              Live Activity
            </p>
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2 h-2 rounded-full bg-green-400"
              />
              <span className="text-green-400 text-xs font-semibold">LIVE</span>
            </div>
          </div>
          <div className="space-y-2">
            {activityFeed.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.07, duration: 0.35 }}
                className="glass flex items-center gap-3 p-3 rounded-2xl"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${item.color}18` }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-300 font-medium leading-snug truncate">
                    {item.text}
                  </p>
                </div>
                <span className="text-[10px] text-gray-500 flex-shrink-0">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav activePage="dashboard" />
    </MobileLayout>
  );
}
