import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaPlay, FaStar, FaShieldAlt, FaBolt, FaCoins, FaChartPie } from "react-icons/fa";
import NewsTicker from "./NewsTicker";

const floatingBadges = [
  { label: "Daily Income", value: "$320", color: "text-green-400", delay: 5, dir: [0, 20, 0], pos: "-left-6 top-16" },
  { label: "Active Investors", value: "25,846", color: "text-blue-400", delay: 7, dir: [0, -20, 0], pos: "-right-6 bottom-24" },
  { label: "Portfolio Growth", value: "+18.45%", color: "text-yellow-400", delay: 4, dir: [0, 15, 0], pos: "right-4 top-4" },
];

function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <section id="home" className="relative min-h-screen overflow-hidden flex items-center pt-20 md:pt-28">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05060A] via-[#0B1220] to-[#111827]" />

        {/* Gold Glows */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/15 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/8 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/4 blur-[200px] rounded-full pointer-events-none" />

        <div className="section relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4 md:px-8 py-6 md:py-10 w-full">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left w-full"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-4 py-1.5 md:px-5 md:py-2 rounded-full font-bold text-xs md:text-sm"
            >
              <FaBolt size={12} />
              Premium Investment Platform
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mt-6 md:mt-8 leading-tight text-white">
              Invest{" "}
              <span className="gold-text">Smart.</span>
              <br />
              Earn Every Day.
            </h1>

            <p className="text-gray-400 text-sm md:text-base lg:text-lg mt-4 md:mt-6 leading-relaxed md:leading-9 max-w-xl">
              Discover premium investment opportunities, complete tasks, earn rewards, and grow your wealth securely with AURIZ.
            </p>

            {/* Trust Score */}
            <div className="flex items-center gap-3 mt-4 md:mt-6">
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
              </div>
              <span className="font-bold text-white text-sm md:text-base">9.99/10</span>
              <span className="text-gray-400 text-xs md:text-sm">· 25k+ verified reviews</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 w-full sm:w-auto">
              <Link to="/plans" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="goldButton px-8 md:px-10 py-3.5 md:py-4 flex items-center justify-center gap-3 text-sm md:text-base w-full"
                >
                  Start Investing <FaArrowRight />
                </motion.button>
              </Link>

              <Link to="/about" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass rounded-2xl px-8 md:px-10 py-3.5 md:py-4 flex items-center justify-center gap-3 text-sm md:text-base font-semibold hover:border-yellow-400/30 transition-all w-full text-white"
                >
                  <FaPlay size={12} className="text-yellow-400" /> Learn More
                </motion.button>
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-5 md:mt-8 w-full">
              {[
                { icon: <FaShieldAlt size={12} />, text: "100% Secure" },
                { icon: <FaCoins size={12} />, text: "Fast Withdrawal" },
                { icon: <FaBolt size={12} />, text: "Daily Returns" },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[11px] md:text-xs font-semibold text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                >
                  <span className="text-yellow-400">{pill.icon}</span>
                  {pill.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Interactive Mockups (Completely responsive layout) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center items-center min-h-[380px] lg:h-[600px] w-full"
          >
            {/* Main Portfolio Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="glass-gold rounded-[25px] md:rounded-[35px] w-full max-w-[340px] md:max-w-[360px] p-6 md:p-8 shadow-2xl z-10"
              style={{
                boxShadow: "0 0 60px rgba(212,175,55,0.12)",
              }}
            >
              <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest">Portfolio Balance</p>

              <motion.h2
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-5xl font-black mt-3 md:mt-4 gold-text"
              >
                $125,480
              </motion.h2>

              <p className="text-green-400 mt-2 md:mt-3 text-sm font-semibold">▲ +18.45% this month</p>

              <div className="mt-6 md:mt-8">
                <div className="flex justify-between text-xs md:text-sm mb-2">
                  <span className="text-gray-400">Growth Target</span>
                  <span className="font-bold text-white">82%</span>
                </div>
                <div className="h-2 bg-gray-700/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 2, delay: 0.8 }}
                    className="h-2 progress-gold"
                  />
                </div>
              </div>

              <div className="mt-5 md:mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Today", value: "+$320" },
                  { label: "This Week", value: "+$1,840" },
                ].map((s, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-2.5 md:p-3 text-center border border-white/5">
                    <p className="text-[10px] md:text-xs text-gray-400">{s.label}</p>
                    <p className="text-green-400 text-xs md:text-sm font-bold mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Small Floating Badges (Hidden on mobile/tablets to prevent clutter) */}
            {floatingBadges.map((badge, i) => (
              <motion.div
                key={i}
                animate={{ y: badge.dir }}
                transition={{ repeat: Infinity, duration: badge.delay, ease: "easeInOut" }}
                className={`glass absolute ${badge.pos} p-4 rounded-2xl w-44 shadow-lg hidden lg:block`}
                style={{ border: "1px solid rgba(212,175,55,0.2)" }}
              >
                <p className="text-gray-400 text-xs">{badge.label}</p>
                <h3 className={`text-xl font-bold mt-1 ${badge.color}`}>{badge.value}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      <div className="section w-full px-4 md:px-8">
        <NewsTicker />
      </div>
    </>
  );
}

export default Hero;