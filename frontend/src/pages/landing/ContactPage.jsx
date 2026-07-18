import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Phone, MapPin, Send, ChevronDown, Loader2, CheckCircle2 } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import AurizBackground from "../../components/AurizBackground";

const faqs = [
  { q: "How do I start investing on AURIZ?", a: "Create a free account, complete verification, deposit funds, and browse available ticket options. You can start with as little as $10." },
  { q: "How are daily returns calculated?", a: "Returns are calculated based on the profit rate of your ticket option (e.g., 3% per day) applied to the purchase price, distributed every 24 hours." },
  { q: "How long does withdrawal take?", a: "Standard withdrawals are processed within 1–3 business days. Diamond-tier users get same-hour processing on verified requests." },
  { q: "Is my investment insured?", a: "AURIZ maintains a reserve fund equal to 15% of total managed assets. All assets are stored in segregated accounts with cold-storage protection." },
  { q: "Can I refer friends to AURIZ?", a: "Yes! AURIZ offers a 3-tier referral commission: Level 1 earns 15%, Level 2 earns 10%, and Level 3 earns 5% of referred user profits." },
  { q: "What is an invitation code?", a: "AURIZ operates on an invite-only basis to ensure platform quality. An invitation code from an existing member is required during registration." },
];

const contactInfo = [
  { icon: Mail, label: "Email Support", value: "support@auriz.io", sub: "Response within 2 hours" },
  { icon: MessageSquare, label: "Live Chat", value: "Available 24/7", sub: "Avg. response < 5 min" },
  { icon: Phone, label: "Phone Support", value: "+1 (888) 287-4932", sub: "Mon–Fri, 9 AM – 6 PM EST" },
  { icon: MapPin, label: "Headquarters", value: "New York, NY", sub: "550 5th Ave, Suite 1200" },
];

function FadeIn({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === "up" ? 30 : 0, x: direction === "left" ? -30 : direction === "right" ? 30 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
      >
        <span className="text-white font-semibold text-sm sm:text-base">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
          <ChevronDown className="w-5 h-5 text-yellow-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email.";
    if (!formData.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || sending) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1800)); // Simulated send
    setSending(false);
    setSent(true);
  };

  return (
    <>
      <AurizBackground />
      <div className="relative z-10">
        <Navbar />

        {/* ── Hero ── */}
        <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
          <motion.div
            className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div className="section relative z-10">
            <FadeIn>
              <span className="inline-block text-xs font-bold tracking-[0.3em] text-yellow-400 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6 uppercase">
                Contact Us
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">
                <span className="text-white">We're Here </span>
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">24/7</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
                Whether you're a new investor or a seasoned member — our team is always ready to help.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Contact Cards ── */}
        <section className="px-4 pb-16">
          <div className="section grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.08} direction="up">
                <motion.div
                  whileHover={{ y: -6, rotateY: 5, rotateX: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ transformStyle: "preserve-3d", perspective: 800 }}
                  className="glass-gold rounded-2xl p-5 text-center h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <p className="text-yellow-400 text-xs font-bold uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="text-white font-semibold text-sm">{item.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.sub}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Form + FAQ ── */}
        <section className="px-4 pb-20">
          <div className="section grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <FadeIn direction="left">
              <div className="glass rounded-3xl p-8">
                <h2 className="text-2xl font-black text-white mb-2">Send a Message</h2>
                <p className="text-gray-400 text-sm mb-6">We typically respond within 2 hours.</p>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }}>
                      <CheckCircle2 className="w-16 h-16 text-yellow-400 mb-4" />
                    </motion.div>
                    <h3 className="text-white font-bold text-lg mb-2">Message Sent!</h3>
                    <p className="text-gray-400 text-sm">Our team will reach out to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { field: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                      { field: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                      { field: "subject", label: "Subject (optional)", type: "text", placeholder: "Investment inquiry..." },
                    ].map(({ field, label, type, placeholder }) => (
                      <div key={field}>
                        <label className="text-yellow-400 text-sm font-semibold mb-1.5 block">{label}</label>
                        <input
                          type={type}
                          value={formData[field]}
                          onChange={e => update(field, e.target.value)}
                          placeholder={placeholder}
                          className={`w-full px-4 py-3 rounded-xl bg-[#0a0a0a] text-white text-sm placeholder-gray-600 outline-none transition border ${errors[field] ? "border-red-500" : "border-white/10 focus:border-yellow-400/50 focus:shadow-[0_0_12px_rgba(255,215,0,0.15)]"}`}
                        />
                        {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
                      </div>
                    ))}
                    <div>
                      <label className="text-yellow-400 text-sm font-semibold mb-1.5 block">Message</label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={e => update("message", e.target.value)}
                        placeholder="Tell us how we can help you..."
                        className={`w-full px-4 py-3 rounded-xl bg-[#0a0a0a] text-white text-sm placeholder-gray-600 outline-none transition resize-none border ${errors.message ? "border-red-500" : "border-white/10 focus:border-yellow-400/50 focus:shadow-[0_0_12px_rgba(255,215,0,0.15)]"}`}
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={!sending ? { scale: 1.02, boxShadow: "0 0 35px rgba(255,215,0,0.6)" } : {}}
                      whileTap={!sending ? { scale: 0.97 } : {}}
                      className="w-full py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {sending ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <><Send className="w-5 h-5" /> Send Message</>}
                    </motion.button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* FAQ */}
            <FadeIn direction="right" delay={0.1}>
              <div>
                <h2 className="text-2xl font-black text-white mb-2">Frequently Asked</h2>
                <p className="text-gray-400 text-sm mb-6">Quick answers to common questions.</p>
                <div className="space-y-3">
                  {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}