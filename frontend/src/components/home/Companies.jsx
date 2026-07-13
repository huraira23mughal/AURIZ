import { motion } from "framer-motion";
import { FaArrowRight, FaChartLine } from "react-icons/fa";

const companies = [
  {
    name: "Tesla Energy",
    sector: "Clean Energy",
    roi: "8.5%",
    earnings: "$150 / Day",
    minInvest: "$100",
    icon: "⚡",
    gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
    accentColor: "#E31937",
    risk: "Low",
  },
  {
    name: "Apple Ventures",
    sector: "Technology",
    roi: "10%",
    earnings: "$210 / Day",
    minInvest: "$300",
    icon: "🍎",
    gradient: "linear-gradient(135deg, #1a1a1a, #2c2c2c)",
    accentColor: "#A2AAAD",
    risk: "Low",
  },
  {
    name: "Microsoft AI",
    sector: "Artificial Intelligence",
    roi: "12%",
    earnings: "$320 / Day",
    minInvest: "$500",
    icon: "🤖",
    gradient: "linear-gradient(135deg, #001428, #003d7a)",
    accentColor: "#00A4EF",
    risk: "Medium",
  },
  {
    name: "Amazon Cloud",
    sector: "Cloud Computing",
    roi: "15%",
    earnings: "$480 / Day",
    minInvest: "$1000",
    icon: "☁️",
    gradient: "linear-gradient(135deg, #1a0a00, #3d2200)",
    accentColor: "#FF9900",
    risk: "Medium",
  },
];

const riskColor = {
  Low: { bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)", color: "#4ade80" },
  Medium: { bg: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.3)", color: "#fbbf24" },
  High: { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)", color: "#f87171" },
};

function Companies() {
  return (
    <section id="companies" className="section py-24">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-yellow-400 uppercase tracking-[6px] font-semibold text-sm"
        >
          Featured Companies
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black mt-4"
        >
          Invest In The World's
          <span className="gold-text"> Best Companies</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg"
        >
          Choose from premium investment opportunities with high returns and secure long-term growth.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {companies.map((company, index) => {
          const risk = riskColor[company.risk];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-3xl overflow-hidden flex flex-col"
              style={{ border: "1px solid rgba(212,175,55,0.12)" }}
            >
              {/* Top gradient banner */}
              <div
                className="h-28 flex items-center justify-center text-5xl relative"
                style={{ background: company.gradient }}
              >
                <span>{company.icon}</span>
                <div
                  className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full"
                  style={{ background: risk.bg, border: `1px solid ${risk.border}`, color: risk.color }}
                >
                  {company.risk} Risk
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                  <h3 className="text-lg font-black text-white">{company.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{company.sector}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Daily ROI</span>
                    <span className="text-green-400 font-bold">{company.roi}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Daily Earnings</span>
                    <span className="gold-text font-bold">{company.earnings}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Min. Invest</span>
                    <span className="text-white font-semibold">{company.minInvest}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const el = document.querySelector("#plans");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="goldButton w-full py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <FaChartLine size={12} /> Invest Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Companies;