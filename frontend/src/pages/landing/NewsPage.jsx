import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import AurizBackground from "../../components/AurizBackground";

const articles = [
  {
    id: 1, category: "Platform Update", date: "Jul 15, 2026", readTime: "3 min read",
    title: "AURIZ Surpasses $2.4B in Managed Assets — A New Milestone",
    excerpt: "The platform hit a historic milestone this quarter as global user growth accelerated across Asia-Pacific and MENA regions, driven by exclusive artist partnerships.",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=80",
    tag: "Milestone",
  },
  {
    id: 2, category: "Market Insights", date: "Jul 12, 2026", readTime: "5 min read",
    title: "Music Streaming Revenue Hit $47B in 2026 — What It Means for Investors",
    excerpt: "As streaming royalty volumes break new records, AURIZ ticket option holders are positioned to capture proportional secondary market returns ahead of the curve.",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    tag: "Analysis",
  },
  {
    id: 3, category: "Artist News", date: "Jul 9, 2026", readTime: "4 min read",
    title: "BLACKPINK World Tour Options: Record Demand Pushes Returns to 4.2% Daily",
    excerpt: "BORN PINK world tour ticket options on AURIZ generated outsized returns this week as secondary market demand reached a 2026 high. Here's the breakdown.",
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80",
    tag: "Hot",
  },
  {
    id: 4, category: "Company News", date: "Jul 5, 2026", readTime: "2 min read",
    title: "New Withdrawal Tiers: Faster Payouts Starting at $10",
    excerpt: "AURIZ introduces upgraded withdrawal processing with same-day settlement for Tier 1 users and same-hour processing for Diamond-level investors.",
    img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80",
    tag: "Update",
  },
  {
    id: 5, category: "Partnership", date: "Jul 2, 2026", readTime: "4 min read",
    title: "AURIZ Signs Exclusive Data-Sharing Agreement with Live Nation",
    excerpt: "Real-time event data from over 500 Live Nation venues will power AURIZ's proprietary pricing engine, enabling more accurate ticket option valuations.",
    img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&auto=format&fit=crop&q=80",
    tag: "Partnership",
  },
  {
    id: 6, category: "Education", date: "Jun 28, 2026", readTime: "7 min read",
    title: "Beginner's Guide: How Music Ticket Options Actually Work",
    excerpt: "A comprehensive breakdown of the AURIZ investment mechanism — from ticket option purchase through daily profit distribution and final settlement.",
    img: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=600&auto=format&fit=crop&q=80",
    tag: "Guide",
  },
];

const categories = ["All", "Platform Update", "Market Insights", "Artist News", "Company News", "Partnership", "Education"];

const tagColors = {
  Milestone: "#22c55e", Analysis: "#3b82f6", Hot: "#ef4444", Update: "#f59e0b",
  Partnership: "#8b5cf6", Guide: "#06b6d4",
};

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <>
      <AurizBackground />
      <div className="relative z-10">
        <Navbar />

        {/* ── Hero ── */}
        <section className="pt-32 pb-12 px-4 text-center">
          <div className="section">
            <FadeIn>
              <span className="inline-block text-xs font-bold tracking-[0.3em] text-yellow-400 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6 uppercase">
                AURIZ News
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">
                <span className="text-white">Market </span>
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Intelligence</span>
                <br className="hidden sm:block" />
                <span className="text-white"> & Updates</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
                Stay ahead of the curve with platform updates, artist news, and market analysis.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section className="px-4 pb-8">
          <div className="section overflow-x-auto scrollbar-none">
            <div className="flex gap-2 min-w-max pb-2 justify-start md:justify-center">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                      : "glass text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Article ── */}
        {featured && (
          <section className="px-4 pb-10">
            <div className="section">
              <FadeIn>
                <motion.article
                  whileHover={{ scale: 1.01, y: -4 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="glass rounded-3xl overflow-hidden grid md:grid-cols-2 gap-0 cursor-pointer"
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                >
                  <div className="h-56 md:h-auto overflow-hidden">
                    <img src={featured.img} alt={featured.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-black"
                        style={{ background: tagColors[featured.tag] || "#D4AF37" }}>
                        {featured.tag}
                      </span>
                      <span className="text-gray-500 text-xs">{featured.category}</span>
                    </div>
                    <h2 className="text-white font-black text-xl sm:text-2xl mb-3 leading-tight">{featured.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{featured.date}</span>
                      <span>·</span>
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              </FadeIn>
            </div>
          </section>
        )}

        {/* ── Articles Grid ── */}
        <section className="px-4 pb-20">
          <div className="section grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((article, i) => (
              <FadeIn key={article.id} delay={i * 0.07}>
                <motion.article
                  whileHover={{ y: -8, rotateY: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 280 }}
                  style={{ transformStyle: "preserve-3d", perspective: 800 }}
                  className="glass rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col"
                >
                  <div className="h-44 overflow-hidden">
                    <motion.img
                      src={article.img}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-black"
                        style={{ background: tagColors[article.tag] || "#D4AF37" }}>
                        {article.tag}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm leading-snug mb-2 flex-1">{article.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-3">
                      <span>{article.date}</span>
                      <span className="text-yellow-400 font-semibold">{article.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              </FadeIn>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}