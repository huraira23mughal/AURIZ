import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCrown, FaArrowRight } from "react-icons/fa";

const plans = [
  {
    name: "Silver",
    price: "$100",
    roi: "5%",
    duration: "30 Days",
    popular: false,
    totalReturn: "$150",
    dailyProfit: "$5",
    features: [
      "Daily Profit",
      "Secure Investment",
      "24/7 Support",
      "Easy Withdrawal",
      "Email Notifications",
    ],
  },
  {
    name: "Gold",
    price: "$500",
    roi: "10%",
    duration: "60 Days",
    popular: true,
    totalReturn: "$3,000",
    dailyProfit: "$50",
    features: [
      "Higher Daily Profit",
      "Priority Support",
      "Referral Bonus",
      "Fast Withdrawal",
      "SMS Alerts",
    ],
  },
  {
    name: "Platinum",
    price: "$1,000",
    roi: "15%",
    duration: "90 Days",
    popular: false,
    totalReturn: "$13,500",
    dailyProfit: "$150",
    features: [
      "Maximum Profit",
      "VIP Support",
      "Premium Rewards",
      "Instant Withdrawal",
      "Dedicated Manager",
    ],
  },
];

function Plans() {
  return (
    <section id="plans" className="section py-14 md:py-24 px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-yellow-400 uppercase tracking-[6px] font-semibold text-sm"
        >
          Investment Plans
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black mt-4"
        >
          Choose Your{" "}
          <span className="gold-text">Investment Plan</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg"
        >
          Flexible plans designed for every type of investor — start small or go big.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`glass rounded-3xl p-6 md:p-8 relative flex flex-col ${
              plan.popular
                ? "border-2 border-yellow-400 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                : "border border-white/8"
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-300 to-yellow-600 text-black px-5 py-2 rounded-full flex items-center gap-2 font-bold text-sm whitespace-nowrap shadow-lg">
                <FaCrown size={12} /> Most Popular
              </div>
            )}

            {/* Plan Name */}
            <div className={`inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-xl w-fit mb-4 ${
              plan.popular
                ? "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30"
                : "bg-white/5 text-gray-300 border border-white/10"
            }`}>
              {plan.name} Plan
            </div>

            <h2 className="text-5xl font-black gold-text">{plan.price}</h2>
            <p className="text-gray-400 mt-1 text-sm">Minimum Investment</p>

            {/* ROI Row */}
            <div className="mt-6 p-4 rounded-2xl space-y-2.5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Daily ROI</span>
                <span className="text-green-400 font-bold">{plan.roi}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Daily Profit</span>
                <span className="gold-text font-bold">{plan.dailyProfit}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="text-white font-semibold">{plan.duration}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Return</span>
                <span className="text-green-400 font-black text-base">{plan.totalReturn}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-3 flex-1">
              {plan.features.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <FaCheckCircle className="text-green-400 flex-shrink-0" size={14} />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`mt-8 w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all ${
                plan.popular
                  ? "goldButton"
                  : "border border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
              }`}
            >
              Invest Now <FaArrowRight size={12} />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Plans;