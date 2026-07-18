import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle, FaCrown, FaArrowRight, FaShieldAlt, FaChartLine, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import AurizBackground from "../../components/AurizBackground";

const plans = [
  {
    name: "Silver", price: "$100", roi: "5%", duration: "30 Days",
    popular: false, totalReturn: "$150", dailyProfit: "$5",
    features: ["Daily Profit", "Secure Investment", "24/7 Support", "Easy Withdrawal", "Email Notifications"],
  },
  {
    name: "Gold", price: "$500", roi: "10%", duration: "60 Days",
    popular: true, totalReturn: "$3,000", dailyProfit: "$50",
    features: ["Higher Daily Profit", "Priority Support", "Referral Bonus", "Fast Withdrawal", "SMS Alerts"],
  },
  {
    name: "Platinum", price: "$1,000", roi: "15%", duration: "90 Days",
    popular: false, totalReturn: "$13,500", dailyProfit: "$150",
    features: ["Maximum Profit", "VIP Support", "Premium Rewards", "Instant Withdrawal", "Dedicated Manager"],
  },
];

const guarantees = [
  { icon: FaShieldAlt, title: "Capital Protection", desc: "15% reserve fund backing every active investment plan on the platform." },
  { icon: FaChartLine, title: "Proven Returns", desc: "3+ years of consistent daily returns paid to 150,000+ verified investors." },
  { icon: FaHeadset, title: "24/7 Support", desc: "Real human agents available around the clock for every plan tier." },
];

function FadeIn({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === "up" ? 30 : 0, scale: direction === "scale" ? 0.9 : 1 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function PlansPage() {
  return (
    <>
      <AurizBackground />
      <div className="relative z-10">
        <Navbar />

        {/* ── Hero ── */}
        <section className="pt-32 pb-12 px-4 text-center relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 9, repeat: Infinity }}
          />
          {/* 3D rotating rings */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-none">
            <motion.div
              className="w-48 h-48 rounded-full border border-yellow-400/10 absolute -translate-x-1/2 -translate-y-1/2"
              animate={{ rotateZ: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="w-80 h-80 rounded-full border border-yellow-400/05 absolute -translate-x-1/2 -translate-y-1/2"
              animate={{ rotateZ: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="section relative z-10">
            <FadeIn>
              <span className="inline-block text-xs font-bold tracking-[0.3em] text-yellow-400 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6 uppercase">
                Investment Plans
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6">
                <span className="text-white">Choose Your </span>
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Growth Plan
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Flexible plans designed for every type of investor. Start small or go big —
                every plan delivers daily returns backed by real music market assets.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Plans Grid ── */}
        <section className="px-4 pb-16">
          <div className="section">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.55 }}
                  whileHover={{ y: -12, rotateY: index === 1 ? 0 : index === 0 ? 5 : -5, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d", perspective: 900 }}
                  className={`glass rounded-3xl p-6 md:p-8 relative flex flex-col cursor-default ${
                    plan.popular
                      ? "border-2 border-yellow-400 shadow-[0_0_50px_rgba(212,175,55,0.25)]"
                      : "border border-white/8"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-300 to-yellow-600 text-black px-5 py-2 rounded-full flex items-center gap-2 font-bold text-sm whitespace-nowrap shadow-lg">
                      <FaCrown size={12} /> Most Popular
                    </div>
                  )}

                  <div className={`inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-xl w-fit mb-4 ${
                    plan.popular
                      ? "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30"
                      : "bg-white/5 text-gray-300 border border-white/10"
                  }`}>
                    {plan.name} Plan
                  </div>

                  <h2 className="text-5xl font-black gold-text">{plan.price}</h2>
                  <p className="text-gray-400 mt-1 text-sm">Minimum Investment</p>

                  <div className="mt-6 p-4 rounded-2xl space-y-2.5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {[
                      { label: "Daily ROI", val: plan.roi, color: "text-green-400" },
                      { label: "Daily Profit", val: plan.dailyProfit, color: "gold-text" },
                      { label: "Duration", val: plan.duration, color: "text-white" },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between text-sm">
                        <span className="text-gray-400">{row.label}</span>
                        <span className={`font-bold ${row.color}`}>{row.val}</span>
                      </div>
                    ))}
                    <div className="h-px bg-white/5" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Return</span>
                      <span className="text-green-400 font-black text-base">{plan.totalReturn}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 flex-1">
                    {plan.features.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <FaCheckCircle className="text-green-400 flex-shrink-0" size={14} />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: plan.popular ? "0 0 30px rgba(255,215,0,0.5)" : undefined }}
                      whileTap={{ scale: 0.97 }}
                      className={`mt-8 w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all ${
                        plan.popular
                          ? "goldButton"
                          : "border border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
                      }`}
                    >
                      Invest Now <FaArrowRight size={12} />
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Guarantees ── */}
        <section className="px-4 pb-20">
          <div className="section">
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Every Plan Comes With <span className="gold-text">Our Guarantee</span>
                </h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-3 gap-5">
              {guarantees.map((g, i) => (
                <FadeIn key={g.title} delay={i * 0.1} direction="scale">
                  <motion.div
                    whileHover={{ y: -8, rotateY: 6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 280 }}
                    style={{ transformStyle: "preserve-3d", perspective: 800 }}
                    className="glass-gold rounded-2xl p-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-4">
                      <g.icon className="text-yellow-400 text-xl" />
                    </div>
                    <h3 className="text-white font-bold mb-2">{g.title}</h3>
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