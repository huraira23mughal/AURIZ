import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";

/* ── Chart Data ── */
const chartData = {
  D: [
    { x: "8AM", y: 24800 },
    { x: "10AM", y: 25100 },
    { x: "12PM", y: 24600 },
    { x: "2PM", y: 25400 },
    { x: "4PM", y: 25200 },
    { x: "6PM", y: 25840 },
  ],
  W: [
    { x: "Mon", y: 24000 },
    { x: "Tue", y: 24500 },
    { x: "Wed", y: 24200 },
    { x: "Thu", y: 25000 },
    { x: "Fri", y: 24800 },
    { x: "Sat", y: 25400 },
    { x: "Sun", y: 25840 },
  ],
  M: [
    { x: "W1", y: 22000 },
    { x: "W2", y: 23100 },
    { x: "W3", y: 24300 },
    { x: "W4", y: 25840 },
  ],
  Y: [
    { x: "Jan", y: 18000 },
    { x: "Mar", y: 19500 },
    { x: "May", y: 21000 },
    { x: "Jul", y: 22800 },
    { x: "Sep", y: 24100 },
    { x: "Nov", y: 25840 },
  ],
};

const assetBadges = [
  {
    symbol: "₿",
    label: "Crypto",
    pct: "+4.2%",
    up: true,
    color: "#F7931A",
    sparkline: [10, 15, 12, 20, 18, 25, 22, 30],
  },
  {
    symbol: "📉",
    label: "Stocks",
    pct: "-1.1%",
    up: false,
    color: "#EF4444",
    sparkline: [30, 25, 28, 22, 25, 18, 20, 16],
  },
  {
    symbol: "🏅",
    label: "Gold",
    pct: "+0.9%",
    up: true,
    color: "#D4AF37",
    sparkline: [15, 17, 16, 18, 17, 19, 18, 20],
  },
];

/* ── Mini Sparkline SVG ── */
function Sparkline({ data, color, up }) {
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal || 1;
  const w = 60;
  const h = 24;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - minVal) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Portfolio Chart ── */
function PortfolioChart({ data }) {
  const svgRef = useRef(null);
  const W = 320;
  const H = 160;
  const PAD = { top: 20, right: 20, bottom: 30, left: 50 };

  const maxY = Math.max(...data.map((d) => d.y));
  const minY = Math.min(...data.map((d) => d.y));
  const rangeY = maxY - minY || 1;

  const toX = (i) => PAD.left + (i / (data.length - 1)) * (W - PAD.left - PAD.right);
  const toY = (val) => PAD.top + ((maxY - val) / rangeY) * (H - PAD.top - PAD.bottom);

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.y)}`)
    .join(" ");

  const areaPath =
    linePath +
    ` L${toX(data.length - 1)},${H - PAD.bottom} L${toX(0)},${H - PAD.bottom} Z`;

  const yTicks = [minY, (minY + maxY) / 2, maxY];

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ overflow: "visible" }}
    >
      {/* Grid Lines */}
      {yTicks.map((tick, i) => (
        <g key={i}>
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={toY(tick)}
            y2={toY(tick)}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="4,4"
          />
          <text
            x={PAD.left - 6}
            y={toY(tick) + 4}
            textAnchor="end"
            fontSize="9"
            fill="rgba(255,255,255,0.35)"
          >
            ${(tick / 1000).toFixed(0)}k
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={toX(i)}
          y={H - PAD.bottom + 14}
          textAnchor="middle"
          fontSize="9"
          fill="rgba(255,255,255,0.35)"
        >
          {d.x}
        </text>
      ))}

      {/* Area fill */}
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={areaPath} fill="url(#chartGrad)" />

      {/* Gold Line */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="#FFD978"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Data Points */}
      {data.map((d, i) => (
        <g key={i}>
          <circle
            cx={toX(i)}
            cy={toY(d.y)}
            r="4"
            fill="#D4AF37"
            stroke="#0D131F"
            strokeWidth="1.5"
          />
          {i === data.length - 1 && (
            <text
              x={toX(i) + 6}
              y={toY(d.y) - 4}
              fontSize="8"
              fill="#FFD978"
              fontWeight="bold"
            >
              ${(d.y / 1000).toFixed(1)}k
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function AssetsPage() {
  const [period, setPeriod] = useState("D");
  const [animKey, setAnimKey] = useState(0);

  const handlePeriod = (p) => {
    setPeriod(p);
    setAnimKey((k) => k + 1);
  };

  return (
    <MobileLayout>
      {/* ── Header ── */}
      <div
        className="px-5 pt-12 pb-5"
        style={{
          background: "linear-gradient(180deg, rgba(212,175,55,0.06) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <h1 className="text-2xl font-black text-white">
          My <span className="gold-text">Assets</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">Track your portfolio performance</p>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* ── Total Assets Hero Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(13,19,31,0.95) 100%)",
            border: "1px solid rgba(212,175,55,0.35)",
            boxShadow: "0 0 40px rgba(212,175,55,0.1)",
          }}
        >
          {/* Background decoration */}
          <div
            className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }}
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                  Total Assets
                </p>
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-5xl font-black mt-2 gold-text"
                >
                  $25,840
                </motion.p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-base"
                style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}
              >
                ↗
              </motion.button>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" }}
              >
                ▲ +6.3% this week
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── 2×2 Data Matrix ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {[
            {
              label: "Today's Earnings",
              value: "$125.50",
              goldValue: true,
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="#D4AF37" strokeWidth="1.5"/>
                  <path d="M12 6v6l3 3" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="2" fill="#D4AF37"/>
                </svg>
              ),
            },
            {
              label: "Yesterday's Earnings",
              value: "$118.20",
              goldValue: true,
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#D4AF37" strokeWidth="1.5"/>
                  <path d="M3 9h18M8 2v4M16 2v4" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              label: "Remaining Clicks",
              value: "12",
              goldValue: false,
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12a10 10 0 1 0 20 0" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 2v4M12 18v4M2 12H6M18 12h4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              label: "Total Clicks",
              value: "150",
              goldValue: false,
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
              className="glass rounded-2xl p-4 flex flex-col justify-between"
              style={{ border: "1px solid rgba(212,175,55,0.1)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: item.goldValue ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.06)" }}
              >
                {item.icon}
              </div>
              <p
                className={`text-xl font-black ${item.goldValue ? "gold-text" : "text-white"}`}
              >
                {item.value}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Portfolio Chart Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass rounded-3xl p-5"
          style={{ border: "1px solid rgba(212,175,55,0.15)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Portfolio Growth</p>
              <p className="text-sm font-bold text-white mt-0.5">& Earnings Performance</p>
            </div>
            {/* Period Switcher */}
            <div
              className="flex rounded-xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              {["D", "W", "M", "Y"].map((p) => (
                <button
                  key={p}
                  onClick={() => handlePeriod(p)}
                  className="px-3 py-1.5 text-xs font-bold transition-all duration-200"
                  style={{
                    background:
                      period === p
                        ? "linear-gradient(135deg, #FFD978, #D4AF37)"
                        : "transparent",
                    color: period === p ? "#000" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <motion.div
            key={animKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PortfolioChart data={chartData[period]} />
          </motion.div>
        </motion.div>

        {/* ── Portfolio Analytics ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
            Portfolio Analytics
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {assetBadges.map((asset, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.35 }}
                whileHover={{ y: -3 }}
                className="glass flex-shrink-0 rounded-2xl p-4 flex flex-col gap-2"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  minWidth: 130,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{asset.symbol}</span>
                  <div>
                    <p className="text-xs font-bold text-white">{asset.label}</p>
                    <p
                      className="text-sm font-black"
                      style={{ color: asset.up ? "#4ade80" : "#EF4444" }}
                    >
                      {asset.pct}
                    </p>
                  </div>
                </div>
                <Sparkline data={asset.sparkline} color={asset.up ? "#4ade80" : "#EF4444"} up={asset.up} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav activePage="assets" />
    </MobileLayout>
  );
}
