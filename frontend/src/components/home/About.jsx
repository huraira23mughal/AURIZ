import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaShieldAlt, FaUsers, FaGlobe, FaTrophy,
  FaCheckCircle, FaArrowRight,
} from "react-icons/fa";

// Keeps the orbiting badges inside their circle at every screen size
// instead of using one fixed radius that only fit desktop widths.
function useOrbitRadius() {
  const [radius, setRadius] = useState(80);

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 400) setRadius(70);
      else if (w < 640) setRadius(90);
      else if (w < 1024) setRadius(130);
      else setRadius(170);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return radius;
}

const milestones = [
  { icon: <FaUsers size={24} />, value: "25,000+", label: "Active Investors", color: "#D4AF37" },
  { icon: <FaGlobe size={24} />, value: "120+", label: "Countries Served", color: "#4ade80" },
  { icon: <FaTrophy size={24} />, value: "$1.25M+", label: "Total Payouts", color: "#818cf8" },
  { icon: <FaShieldAlt size={24} />, value: "99.9%", label: "Uptime Guarantee", color: "#60a5fa" },
];

const values = [
  "Military-grade 256-bit encryption on all transactions",
  "Regulated investment operations across 120+ countries",
  "Transparent real-time portfolio reporting",
  "Zero hidden fees — ever",
  "9.99/10 trust score based on 25,000+ reviews",
  "Dedicated 24/7 multilingual support team",
];

function About() {
  const orbitRadius = useOrbitRadius();

  return (
    <section id="about" className="section page-section px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-yellow-400 uppercase tracking-[6px] font-semibold text-sm"
        >
          About AURIZ
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black mt-4"
        >
          The Platform Built For
          <span className="gold-text"> Serious Investors</span>
        </motion.h2>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-20">
        {/* Left – Story */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-4 text-gray-400 text-base md:text-lg leading-7 md:leading-8">
            <p>
              <span className="gold-text font-black text-xl">AURIZ</span> was founded with a single vision: to make premium investment opportunities accessible to everyone — regardless of their starting capital or location.
            </p>
            <p>
              We partner with the world's leading companies across technology, clean energy, AI, and cloud computing to bring you curated investment packages that deliver consistent, transparent returns.
            </p>
            <p>
              Our platform combines institutional-grade security with a beautiful, intuitive experience — so whether you're investing $100 or $100,000, your funds are always protected and your growth is always visible.
            </p>
          </div>

          {/* Values List */}
          <div className="mt-8 space-y-3">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" size={14} />
                <span className="text-gray-300 text-sm">{v}</span>
              </motion.div>
            ))}
          </div>

          <Link to="/plans">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="goldButton px-8 md:px-10 py-4 mt-8 md:mt-10 flex items-center gap-2 text-sm font-bold"
            >
              Start Investing Today <FaArrowRight />
            </motion.button>
          </Link>
        </motion.div>

        {/* Right – Visual */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Center Orb */}
          <div className="relative flex items-center justify-center h-[260px] sm:h-[320px] lg:h-[420px]">
            {/* Glow Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full"
              style={{ border: "1px dashed rgba(212,175,55,0.3)" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute w-60 h-60 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full"
              style={{ border: "1px dashed rgba(212,175,55,0.15)" }}
            />

            {/* Center */}
            <div
              className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full flex items-center justify-center text-black font-black text-2xl sm:text-3xl lg:text-5xl shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #FFD978, #D4AF37)",
                boxShadow: "0 0 60px rgba(212,175,55,0.4)",
              }}
            >
              A
            </div>

            {/* Orbiting Stats */}
            {[
              { label: "$1.25M Paid Out", angle: 0 },
              { label: "25k+ Investors", angle: 90 },
              { label: "120+ Countries", angle: 180 },
              { label: "9.99/10 Trust", angle: 270 },
            ].map((item, i) => {
              const rad = (item.angle * Math.PI) / 180;
              const r = orbitRadius;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.5 }}
                  className="absolute text-[9px] sm:text-xs font-bold text-yellow-400 text-center px-1.5 py-1 sm:px-3 sm:py-1.5"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    borderRadius: "50px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Milestones */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        {milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="glass rounded-3xl p-6 text-center"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4"
              style={{ background: `${m.color}18`, color: m.color }}
            >
              {m.icon}
            </div>
            <h3 className="text-3xl font-black gold-text">{m.value}</h3>
            <p className="text-gray-400 text-sm mt-2">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default About;
