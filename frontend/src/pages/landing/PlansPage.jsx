import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle, FaCrown, FaArrowRight, FaShieldAlt,
  FaChartLine, FaHeadset, FaWallet, FaLock, FaBolt, FaCoins
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import AurizBackground from "../../components/AurizBackground";

// ─── Data ────────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Silver", price: "$100", priceNum: 100, roi: "5%", duration: "30 Days",
    popular: false, totalReturn: "$150", dailyProfit: "$5",
    color: "#94a3b8",
    features: ["Daily Profit", "Secure Investment", "24/7 Support", "Easy Withdrawal", "Email Notifications"],
  },
  {
    name: "Gold", price: "$500", priceNum: 500, roi: "10%", duration: "60 Days",
    popular: true, totalReturn: "$3,000", dailyProfit: "$50",
    color: "#D4AF37",
    features: ["Higher Daily Profit", "Priority Support", "Referral Bonus", "Fast Withdrawal", "SMS Alerts"],
  },
  {
    name: "Platinum", price: "$1,000", priceNum: 1000, roi: "15%", duration: "90 Days",
    popular: false, totalReturn: "$13,500", dailyProfit: "$150",
    color: "#a78bfa",
    features: ["Maximum Profit", "VIP Support", "Premium Rewards", "Instant Withdrawal", "Dedicated Manager"],
  },
];

const guarantees = [
  { icon: FaShieldAlt, title: "Capital Protection", desc: "15% reserve fund backing every active investment plan on the platform.", color: "#4ade80" },
  { icon: FaChartLine, title: "Proven Returns", desc: "3+ years of consistent daily returns paid to 150,000+ verified investors.", color: "#D4AF37" },
  { icon: FaHeadset, title: "24/7 Support", desc: "Real human agents available around the clock for every plan tier.", color: "#60a5fa" },
];

const liveStats = [
  { label: "Active Investors", value: "150K+", color: "#D4AF37" },
  { label: "Total Paid Out", value: "$48M+", color: "#4ade80" },
  { label: "Avg. Daily ROI", value: "9.5%", color: "#60a5fa" },
  { label: "Countries", value: "120+", color: "#a78bfa" },
];

// ─── Animation #1: Scroll-reveal fade wrapper ────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      scale: direction === "scale" ? 0.85 : 1,
    },
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Animation #2: Animated counter ─────────────────────────────────────────
function AnimatedStat({ value, label, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.08, y: -4 }}
      className="glass rounded-2xl px-6 py-4 text-center cursor-default"
      style={{ border: `1px solid ${color}22` }}
    >
      <motion.p
        className="text-2xl font-black"
        style={{ color }}
        animate={{ opacity: [1, 0.65, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {value}
      </motion.p>
      <p className="text-xs text-gray-400 mt-0.5 font-medium">{label}</p>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function PlansPage() {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  return (
    <>
      <AurizBackground />
      <div className="relative z-10">
        <Navbar />

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
          {/* Background glow */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)" }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 9, repeat: Infinity }}
          />

          {/* Animation #3: Triple concentric orbital rings */}
          <div className="absolute top-28 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 0 }}>
            {[
              { size: "w-44 h-44", opacity: "border-yellow-400/20", duration: 18 },
              { size: "w-72 h-72", opacity: "border-yellow-400/10", duration: 30, reverse: true },
              { size: "w-[430px] h-[430px]", opacity: "border-yellow-400/05", duration: 48 },
            ].map((ring, i) => (
              <motion.div
                key={i}
                className={`${ring.size} rounded-full border ${ring.opacity} absolute -translate-x-1/2 -translate-y-1/2`}
                animate={{ rotateZ: ring.reverse ? -360 : 360 }}
                transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>

          <div className="section relative z-10">
            <FadeIn>
              <span className="inline-block text-xs font-bold tracking-[0.3em] text-yellow-400 border border-yellow-400/30 rounded-full px-5 py-2 mb-7 uppercase">
                💎 Investment Plans
              </span>
            </FadeIn>

            <FadeIn delay={0.12}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
                <span className="text-white">Choose Your </span>
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Growth Plan
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.22}>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                Flexible plans designed for every type of investor. Start small or go big —
                every plan delivers daily returns backed by real music market assets.
              </p>
            </FadeIn>

            {/* Live Stats Strip — Animation #2 */}
            <div className="flex flex-wrap justify-center gap-4">
              {liveStats.map((stat, i) => (
                <AnimatedStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Plans Grid ──────────────────────────────────────────── */}
        <section className="px-4 pb-20">
          <div className="section">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.18, duration: 0.6, ease: "easeOut" }}
                  whileHover={{
                    y: -14,
                    rotateY: index === 1 ? 0 : index === 0 ? 4 : -4,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  onHoverStart={() => setHoveredPlan(index)}
                  onHoverEnd={() => setHoveredPlan(null)}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  className={`glass rounded-3xl p-7 relative flex flex-col cursor-default ${
                    plan.popular
                      ? "border-2 shadow-[0_0_60px_rgba(212,175,55,0.2)]"
                      : "border border-white/8"
                  }`}
                  // Dynamic border color per plan
                  {...(plan.popular ? { style: { transformStyle: "preserve-3d", perspective: 1000, borderColor: "#D4AF37" } } : {})}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-300 to-yellow-600 text-black px-6 py-2 rounded-full flex items-center gap-2 font-black text-xs whitespace-nowrap shadow-xl"
                      animate={{ boxShadow: ["0 0 15px rgba(212,175,55,0.4)", "0 0 30px rgba(212,175,55,0.7)", "0 0 15px rgba(212,175,55,0.4)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaCrown size={11} /> Most Popular
                    </motion.div>
                  )}

                  {/* Plan name badge */}
                  <div
                    className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl w-fit mb-5"
                    style={{ background: `${plan.color}18`, color: plan.color, border: `1px solid ${plan.color}30` }}
                  >
                    {plan.name} Plan
                  </div>

                  {/* Price */}
                  <h2 className="text-5xl font-black" style={{ color: plan.color }}>{plan.price}</h2>
                  <p className="text-gray-500 mt-1 text-sm">Minimum Investment</p>

                  {/* Stats block */}
                  <div className="mt-6 p-4 rounded-2xl space-y-3"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {[
                      { label: "Daily ROI", val: plan.roi, color: "text-green-400" },
                      { label: "Daily Profit", val: plan.dailyProfit, color: "gold-text" },
                      { label: "Duration", val: plan.duration, color: "text-white" },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between text-sm items-center">
                        <span className="text-gray-400">{row.label}</span>
                        <span className={`font-bold ${row.color}`}>{row.val}</span>
                      </div>
                    ))}
                    <div className="h-px bg-white/5 my-1" />
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-400 font-semibold">Total Return</span>
                      <span className="text-green-400 font-black text-base">{plan.totalReturn}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-6 space-y-3 flex-1">
                    {plan.features.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + i * 0.07 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <FaCheckCircle className="flex-shrink-0" size={14} style={{ color: plan.color }} />
                        <span className="text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link to="/register" className="mt-8 block">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all ${
                        plan.popular
                          ? "goldButton"
                          : "border text-sm font-bold hover:opacity-90 transition"
                      }`}
                      style={
                        !plan.popular
                          ? { borderColor: `${plan.color}50`, color: plan.color, background: `${plan.color}10` }
                          : undefined
                      }
                    >
                      Invest Now <FaArrowRight size={12} />
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Binance Pay Section ──────────────────────────────────── */}
        <section className="px-4 pb-20">
          <div className="section">
            <FadeIn delay={0.1}>
              <motion.div
                className="relative overflow-hidden rounded-3xl p-8 md:p-12"
                style={{
                  background: "linear-gradient(135deg, rgba(240,185,11,0.07) 0%, rgba(10,10,20,0.9) 60%)",
                  border: "1px solid rgba(240,185,11,0.2)",
                  boxShadow: "0 0 60px rgba(240,185,11,0.05)"
                }}
                whileHover={{ boxShadow: "0 0 80px rgba(240,185,11,0.12)" }}
                transition={{ duration: 0.4 }}
              >
                {/* Background orbs */}
                <motion.div
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(240,185,11,0.12) 0%, transparent 65%)" }}
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 60, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(240,185,11,0.08) 0%, transparent 70%)" }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 7, repeat: Infinity, delay: 2 }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  {/* Icon */}
                  <motion.div
                    className="flex-shrink-0 w-24 h-24 rounded-3xl flex items-center justify-center text-5xl font-black text-black shadow-2xl"
                    style={{ background: "linear-gradient(135deg, #F0B90B, #c9960a)", boxShadow: "0 0 40px rgba(240,185,11,0.4)" }}
                    animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    ₿
                  </motion.div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-4"
                      style={{ background: "rgba(240,185,11,0.1)", border: "1px solid rgba(240,185,11,0.3)", color: "#F0B90B" }}>
                      🔐 Secure Blockchain Payment Gateway
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
                      Pay with{" "}
                      <span className="bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">
                        Binance Pay
                      </span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                      Fund your account instantly using Binance Pay or direct USDT transfer (TRC20 / BEP20).
                      Zero transaction fees, instant credit, and fully secure on-chain verification.
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      {[
                        { label: "USDT TRC20", icon: "🟢" },
                        { label: "USDT BEP20", icon: "🟡" },
                        { label: "Binance Pay", icon: "⚡" },
                        { label: "Zero Fees", icon: "✅" },
                        { label: "Instant Credit", icon: "🚀" },
                      ].map((item, i) => (
                        <motion.span
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                        >
                          <span>{item.icon}</span> {item.label}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <Link to="/register">
                      <motion.button
                        whileHover={{ scale: 1.06, boxShadow: "0 0 50px rgba(240,185,11,0.6)" }}
                        whileTap={{ scale: 0.97 }}
                        className="goldButton px-8 py-4 font-black text-sm flex items-center gap-2 whitespace-nowrap rounded-2xl"
                      >
                        Start Investing <FaArrowRight size={12} />
                      </motion.button>
                    </Link>
                    <p className="text-xs text-gray-500 text-center mt-2">No credit card required</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </section>

        {/* ── Guarantees ──────────────────────────────────────────── */}
        <section className="px-4 pb-24">
          <div className="section">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Promise</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Every Plan Comes With <span className="gold-text">Our Guarantee</span>
                </h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-3 gap-6">
              {guarantees.map((g, i) => (
                <FadeIn key={g.title} delay={i * 0.12} direction="scale">
                  <motion.div
                    whileHover={{ y: -10, rotateY: 6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    style={{ transformStyle: "preserve-3d", perspective: 800 }}
                    className="glass-gold rounded-3xl p-7 text-center"
                  >
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                      style={{ background: `${g.color}15`, border: `1px solid ${g.color}25` }}
                      whileHover={{ rotate: 10, scale: 1.15 }}
                    >
                      <g.icon size={22} style={{ color: g.color }} />
                    </motion.div>
                    <h3 className="text-white font-bold text-lg mb-2">{g.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{g.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}