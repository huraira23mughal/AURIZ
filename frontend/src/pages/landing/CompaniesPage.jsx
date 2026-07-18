import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import AurizBackground from "../../components/AurizBackground";

const companies = [
  {
    name: "Sony Music", category: "Major Label", country: "USA", revenue: "$9.4B", logo: "S",
    color: "#1db954", desc: "Global leader in music production and distribution with 50,000+ artist roster.",
    partnership: "Platinum Partner",
  },
  {
    name: "Universal Music", category: "Major Label", country: "France", revenue: "$11.2B", logo: "U",
    color: "#ff6b35", desc: "World's largest music company, home to the most iconic artists across every genre.",
    partnership: "Diamond Partner",
  },
  {
    name: "Warner Music", category: "Major Label", country: "USA", revenue: "$5.9B", logo: "W",
    color: "#6c5ce7", desc: "Leading global music and entertainment company with iconic recording labels.",
    partnership: "Platinum Partner",
  },
  {
    name: "Spotify", category: "Streaming", country: "Sweden", revenue: "$14.6B", logo: "Sp",
    color: "#1db954", desc: "The world's largest audio streaming platform with 600M+ active users.",
    partnership: "Strategic Partner",
  },
  {
    name: "Live Nation", category: "Events", country: "USA", revenue: "$22.7B", logo: "LN",
    color: "#e63946", desc: "World's leading live entertainment company managing 500+ venues globally.",
    partnership: "Diamond Partner",
  },
  {
    name: "Ticketmaster", category: "Ticketing", country: "USA", revenue: "$8.4B", logo: "TM",
    color: "#0077b6", desc: "The global leader in live event ticketing with 500M+ tickets sold annually.",
    partnership: "Core Partner",
  },
  {
    name: "Apple Music", category: "Streaming", country: "USA", revenue: "$18.8B", logo: "AM",
    color: "#fa2d48", desc: "Premium music streaming service integrated across the Apple ecosystem.",
    partnership: "Strategic Partner",
  },
  {
    name: "CAA Music", category: "Agency", country: "USA", revenue: "$4.2B", logo: "C",
    color: "#ffd700", desc: "Creative Artists Agency — the world's most powerful talent agency for musicians.",
    partnership: "Platinum Partner",
  },
];

const categories = ["All", "Major Label", "Streaming", "Events", "Ticketing", "Agency"];

function FadeIn({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === "up" ? 30 : 0, scale: direction === "scale" ? 0.9 : 1 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function CompaniesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? companies
    : companies.filter(c => c.category === activeCategory);

  return (
    <>
      <AurizBackground />
      <div className="relative z-10">
        <Navbar />

        {/* ── Hero ── */}
        <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
          <motion.div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="section relative z-10">
            <FadeIn>
              <span className="inline-block text-xs font-bold tracking-[0.3em] text-yellow-400 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6 uppercase">
                Our Partners
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6">
                <span className="text-white">Industry </span>
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Giants
                </span>
                <br />
                <span className="text-white">Behind AURIZ</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                AURIZ partners with the world's most powerful music and entertainment companies to source
                exclusive, high-yield ticket option assets for our investors.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Filter ── */}
        <section className="px-4 pb-8">
          <div className="section">
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                      : "glass text-gray-300 hover:text-yellow-400 hover:border-yellow-400/30"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Grid ── */}
        <section className="px-4 pb-20">
          <div className="section">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((company, i) => (
                <FadeIn key={company.name} delay={i * 0.06} direction="scale">
                  <motion.div
                    whileHover={{ y: -8, rotateY: -5, rotateX: 3, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ transformStyle: "preserve-3d", perspective: 800 }}
                    className="glass rounded-2xl p-6 h-full flex flex-col cursor-default relative overflow-hidden"
                  >
                    {/* Glow accent */}
                    <div
                      className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                      style={{ background: company.color, filter: "blur(30px)", transform: "translate(30%, -30%)" }}
                    />

                    {/* Logo + badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg"
                        style={{ background: `${company.color}22`, border: `1px solid ${company.color}44` }}
                      >
                        <span style={{ color: company.color }}>{company.logo}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full border gold-text"
                        style={{ borderColor: "rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
                        {company.partnership}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-base mb-1">{company.name}</h3>
                    <p className="text-gray-400 text-xs mb-3 flex-1 leading-relaxed">{company.desc}</p>

                    <div className="flex justify-between items-center pt-3 border-t border-white/5 text-xs">
                      <span className="text-yellow-400 font-semibold">{company.category}</span>
                      <span className="text-gray-500">{company.country} · {company.revenue}</span>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Strip ── */}
        <section className="px-4 pb-20">
          <div className="section">
            <FadeIn direction="scale">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass-gold rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5" />
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 relative z-10">
                  Partner with <span className="gold-text">Industry Leaders</span>
                </h2>
                <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm relative z-10">
                  Your investment is backed by the same companies that power the global music economy.
                </p>
                <motion.a
                  href="/register"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,215,0,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block goldButton px-8 py-3.5 text-sm font-bold relative z-10"
                >
                  Start Investing Today
                </motion.a>
              </motion.div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}