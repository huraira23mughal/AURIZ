import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import AurizBackground from "../../components/AurizBackground";

const stats = [
  { value: "150K+", label: "Active Investors" },
  { value: "$2.4B", label: "Assets Under Management" },
  { value: "98.7%", label: "Client Satisfaction" },
  { value: "47", label: "Countries Served" },
];

const values = [
  {
    icon: "◆",
    title: "Transparency",
    desc: "Every transaction, every return, every fee is visible in real time. No hidden charges, no surprises.",
  },
  {
    icon: "⬡",
    title: "Security",
    desc: "Military-grade encryption, multi-factor authentication, and cold-storage asset protection as standard.",
  },
  {
    icon: "▲",
    title: "Innovation",
    desc: "We pioneered music-backed digital investment options — fusing entertainment economics with financial precision.",
  },
  {
    icon: "●",
    title: "Community",
    desc: "AURIZ members grow together. Our referral network and team-based rewards align everyone's success.",
  },
];

const team = [
  { name: "James Harlow", role: "CEO & Co-Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" },
  { name: "Sophia Chen", role: "CTO & Head of Security", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80" },
  { name: "Marcus Ellis", role: "Chief Investment Officer", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80" },
  { name: "Aisha Malik", role: "Head of Artist Relations", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80" },
];

function FadeIn({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: { opacity: 0, y: direction === "up" ? 40 : 0, x: direction === "left" ? -40 : direction === "right" ? 40 : 0, scale: direction === "scale" ? 0.85 : 1 },
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  };
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function FloatingOrb({ size, color, x, y, duration }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: "blur(60px)", opacity: 0.12 }}
      animate={{ y: [0, -30, 0], scale: [1, 1.08, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <AurizBackground />
      <div className="relative z-10">
        <Navbar />

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <FloatingOrb size={400} color="rgba(212,175,55,0.6)" x="60%" y="-10%" duration={8} />
          <FloatingOrb size={300} color="rgba(212,175,55,0.4)" x="-5%" y="30%" duration={11} />

          <div className="section text-center">
            <FadeIn>
              <span className="inline-block text-xs font-bold tracking-[0.3em] text-yellow-400 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6 uppercase">
                About AURIZ
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                <span className="text-white">Redefining </span>
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Investment
                </span>
                <br />
                <span className="text-white">Through Music</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                AURIZ was founded on a revolutionary premise — the global music industry is a $100B market with
                consistent, predictable returns. We built the infrastructure to give everyday investors access
                to institutional-grade music-backed assets.
              </p>
            </FadeIn>

            {/* 3D rotating ring */}
            <FadeIn delay={0.3} direction="scale">
              <div className="relative w-32 h-32 mx-auto mt-12">
                <motion.div
                  className="w-full h-full rounded-full border-2 border-yellow-400/30"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                />
                <motion.div
                  className="absolute inset-3 rounded-full border border-yellow-400/50"
                  animate={{ rotateX: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-black gold-text">A</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-16 px-4">
          <div className="section grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1} direction="scale">
                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="glass-gold rounded-2xl p-6 text-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <p className="text-3xl sm:text-4xl font-black gold-text">{s.value}</p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 font-medium">{s.label}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="py-20 px-4">
          <div className="section">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn direction="left">
                <div>
                  <span className="text-xs font-bold tracking-[0.3em] text-yellow-400 uppercase">Our Mission</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-5 leading-tight">
                    Democratizing Access to <span className="gold-text">Premium Returns</span>
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    For decades, high-yield music-backed investments were reserved for major labels, hedge funds, and
                    ultra-high-net-worth individuals. AURIZ breaks that barrier.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Our platform enables anyone — with as little as $10 — to participate in the same ticket option
                    markets that generate consistent daily returns for institutional players.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.15}>
                {/* 3D card */}
                <motion.div
                  whileHover={{ rotateY: -8, rotateX: 4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  className="glass-gold rounded-3xl p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-yellow-400/5 -mr-10 -mt-10" />
                  <div className="relative z-10 space-y-4">
                    {[
                      { pct: 85, label: "Daily Returns Delivered" },
                      { pct: 97, label: "Withdrawal Success Rate" },
                      { pct: 92, label: "Ticket Option Profitability" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{item.label}</span>
                          <span className="text-yellow-400 font-bold">{item.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full progress-gold"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.pct}%` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-20 px-4">
          <div className="section">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="text-xs font-bold tracking-[0.3em] text-yellow-400 uppercase">Core Values</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">What We Stand For</h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v, i) => (
                <FadeIn key={v.title} delay={i * 0.1} direction="scale">
                  <motion.div
                    whileHover={{ y: -8, rotateY: 5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ transformStyle: "preserve-3d", perspective: 800 }}
                    className="glass rounded-2xl p-6 h-full cursor-default"
                  >
                    <span className="text-3xl gold-text font-black">{v.icon}</span>
                    <h3 className="text-white font-bold text-lg mt-4 mb-2">{v.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="py-20 px-4">
          <div className="section">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="text-xs font-bold tracking-[0.3em] text-yellow-400 uppercase">Leadership</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">Meet the Team</h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {team.map((member, i) => (
                <FadeIn key={member.name} delay={i * 0.1} direction="scale">
                  <motion.div
                    whileHover={{ y: -10, rotateY: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 250 }}
                    style={{ transformStyle: "preserve-3d", perspective: 800 }}
                    className="glass rounded-2xl p-5 text-center cursor-default"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden border-2 border-yellow-400/40 mb-4">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-white font-bold text-sm sm:text-base">{member.name}</h4>
                    <p className="text-yellow-400/80 text-xs mt-1">{member.role}</p>
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