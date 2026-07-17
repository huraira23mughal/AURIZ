import { motion } from "framer-motion";
import {
  FaShieldAlt, FaChartLine, FaWallet, FaHeadset,
  FaBolt, FaGlobe, FaLock, FaTrophy,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt size={26} />,
    title: "100% Secure",
    text: "Military-grade 256-bit encryption protects every transaction and your personal data.",
    color: "#4ade80",
  },
  {
    icon: <FaChartLine size={26} />,
    title: "High Returns",
    text: "Invest in premium companies with daily ROI up to 15% — transparent and predictable.",
    color: "#D4AF37",
  },
  {
    icon: <FaWallet size={26} />,
    title: "Fast Withdrawals",
    text: "Withdraw your earnings within minutes — 24/7, no delays, no hidden fees.",
    color: "#818cf8",
  },
  {
    icon: <FaHeadset size={26} />,
    title: "24/7 Support",
    text: "Our multilingual support team is always online to assist you instantly.",
    color: "#60a5fa",
  },
  {
    icon: <FaBolt size={26} />,
    title: "Daily Rewards",
    text: "Complete daily tasks to earn bonus rewards on top of your investment returns.",
    color: "#f472b6",
  },
  {
    icon: <FaGlobe size={26} />,
    title: "Global Access",
    text: "Invest from anywhere in 120+ countries with full multi-currency support.",
    color: "#34d399",
  },
  {
    icon: <FaLock size={26} />,
    title: "Cold Storage",
    text: "90% of funds are held in offline cold wallets for maximum asset protection.",
    color: "#fb923c",
  },
  {
    icon: <FaTrophy size={26} />,
    title: "Top Rated",
    text: "Rated 9.99/10 trust score by 25,000+ verified investors worldwide.",
    color: "#D4AF37",
  },
];

function Features() {
  return (
    <section className="section py-14 md:py-24 px-4 md:px-8">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-yellow-400 uppercase tracking-[6px] font-semibold text-sm"
        >
          Why Choose Us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black mt-4"
        >
          Everything You Need To
          <span className="gold-text"> Grow Your Wealth</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="glass rounded-3xl p-5 md:p-7 group"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
              style={{ background: `${item.color}18`, color: item.color }}
            >
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="text-gray-400 mt-3 leading-7 text-sm">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;