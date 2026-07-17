import { motion } from "framer-motion";
import { FaBullhorn, FaClock, FaExternalLinkAlt } from "react-icons/fa";

const newsItems = [
  {
    category: "Platform Update",
    catColor: "#D4AF37",
    catBg: "rgba(212,175,55,0.12)",
    title: "AURIZ Launches New VIP Investment Tiers with Enhanced Returns",
    excerpt: "Our new Platinum+ and Diamond tiers offer up to 22% daily ROI with dedicated account managers and priority withdrawal processing.",
    date: "July 12, 2026",
    readTime: "3 min read",
    icon: "🚀",
  },
  {
    category: "Market News",
    catColor: "#4ade80",
    catBg: "rgba(74,222,128,0.12)",
    title: "Tesla Energy and Microsoft AI Report Record Q2 Earnings",
    excerpt: "Both major AURIZ portfolio companies have posted exceptional quarterly results, driving investor returns beyond projected targets.",
    date: "July 10, 2026",
    readTime: "5 min read",
    icon: "📈",
  },
  {
    category: "Crypto Update",
    catColor: "#818cf8",
    catBg: "rgba(129,140,248,0.12)",
    title: "Bitcoin Surpasses $120,000: What It Means For Your Portfolio",
    excerpt: "Crypto assets in the AURIZ investment ecosystem have seen significant appreciation. Here's what you should know.",
    date: "July 8, 2026",
    readTime: "4 min read",
    icon: "₿",
  },
  {
    category: "Rewards",
    catColor: "#f472b6",
    catBg: "rgba(244,114,182,0.12)",
    title: "Referral Bonus Program Upgraded: Earn 15% on Every Invite",
    excerpt: "Our revamped referral system now rewards you and your friends with an instant 15% bonus on the first investment.",
    date: "July 5, 2026",
    readTime: "2 min read",
    icon: "🎁",
  },
  {
    category: "Security",
    catColor: "#60a5fa",
    catBg: "rgba(96,165,250,0.12)",
    title: "Advanced 256-bit Encryption Now Protects All AURIZ Transactions",
    excerpt: "We have upgraded our security infrastructure to bank-grade 256-bit encryption ensuring your funds are always safe.",
    date: "July 2, 2026",
    readTime: "3 min read",
    icon: "🔒",
  },
  {
    category: "Achievement",
    catColor: "#D4AF37",
    catBg: "rgba(212,175,55,0.12)",
    title: "AURIZ Crosses 25,000 Active Investors Milestone",
    excerpt: "We're proud to announce our platform has reached a major milestone with over 25,000 active investors globally.",
    date: "June 30, 2026",
    readTime: "2 min read",
    icon: "🏆",
  },
];

const tickerItems = [
  "🔥 Welcome to AURIZ Premium Investment Platform",
  "💰 New VIP Plans Available Now",
  "🎁 Complete Daily Tasks & Earn Rewards",
  "📈 Assets Updated Every Minute",
  "🚀 Invite Friends & Earn 15% Referral Bonus",
  "⚡ Bitcoin +4.2% | Gold +0.9% | Crypto Index +6.1%",
];

function News() {
  return (
    <section id="news" className="section landing-section px-4 md:px-8">
      {/* Live Ticker */}
      <div
        className="rounded-2xl overflow-hidden mb-16"
        style={{
          background: "rgba(212,175,55,0.06)",
          border: "1px solid rgba(212,175,55,0.2)",
        }}
      >
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-4 flex items-center gap-2 font-black text-sm whitespace-nowrap">
            <FaBullhorn size={14} />
            LIVE NEWS
          </div>
          <div className="overflow-hidden flex-1">
            <motion.div
              className="flex gap-16 whitespace-nowrap py-4 text-gray-200 text-sm font-medium"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            >
              {tickerItems.map((item, i) => (
                <span key={i} className="text-gray-300">{item}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-yellow-400 uppercase tracking-[6px] font-semibold text-sm"
        >
          Latest News
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black mt-4"
        >
          Stay Up To Date With
          <span className="gold-text"> AURIZ News</span>
        </motion.h2>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {newsItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="glass rounded-3xl p-6 flex flex-col group cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Icon + Category */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{item.icon}</div>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ background: item.catBg, color: item.catColor }}
              >
                {item.category}
              </span>
            </div>

            <h3 className="text-base font-bold text-white leading-snug mb-3 group-hover:text-yellow-400 transition-colors">
              {item.title}
            </h3>

            <p className="text-sm text-gray-400 leading-6 flex-1">{item.excerpt}</p>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <FaClock size={10} />
                <span>{item.date}</span>
                <span>·</span>
                <span>{item.readTime}</span>
              </div>
              <FaExternalLinkAlt
                size={10}
                className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default News;
