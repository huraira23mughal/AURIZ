import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaPaperPlane, FaWhatsapp, FaTelegram, FaTwitter,
} from "react-icons/fa";

const contactInfo = [
  {
    icon: <FaEnvelope size={20} />,
    label: "Email Us",
    value: "support@auriz.com",
    link: "mailto:support@auriz.com",
    color: "#D4AF37",
  },
  {
    icon: <FaPhone size={20} />,
    label: "Call Us",
    value: "+1 (800) AURIZ-99",
    link: "tel:+18002874999",
    color: "#4ade80",
  },
  {
    icon: <FaMapMarkerAlt size={20} />,
    label: "Headquarters",
    value: "Dubai, United Arab Emirates",
    link: "#",
    color: "#818cf8",
  },
];

const socials = [
  { icon: <FaWhatsapp size={20} />, label: "WhatsApp", color: "#25D366" },
  { icon: <FaTelegram size={20} />, label: "Telegram", color: "#229ED9" },
  { icon: <FaTwitter size={20} />, label: "Twitter / X", color: "#1DA1F2" },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="section py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-yellow-400 uppercase tracking-[6px] font-semibold text-sm"
        >
          Contact Us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black mt-4"
        >
          We're Here To
          <span className="gold-text"> Help You</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-6 max-w-xl mx-auto"
        >
          Have a question, concern, or partnership inquiry? Our expert team is available 24/7.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left — Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Contact Cards */}
          {contactInfo.map((info, i) => (
            <a
              key={i}
              href={info.link}
              className="glass flex items-center gap-5 p-5 rounded-2xl group hover:scale-[1.01] transition-transform"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${info.color}18`, color: info.color }}
              >
                {info.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{info.label}</p>
                <p className="text-white font-bold mt-0.5 group-hover:text-yellow-400 transition-colors">
                  {info.value}
                </p>
              </div>
            </a>
          ))}

          {/* Socials */}
          <div>
            <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-4">
              Follow Us
            </p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{
                    background: `${s.color}18`,
                    border: `1px solid ${s.color}30`,
                    color: s.color,
                  }}
                >
                  {s.icon} {s.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Support Hours */}
          <div
            className="glass rounded-2xl p-5"
            style={{ border: "1px solid rgba(212,175,55,0.2)", background: "rgba(212,175,55,0.04)" }}
          >
            <p className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-3">
              ⏰ Support Hours
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Live Chat & Email</span>
                <span className="text-green-400 font-semibold">24/7</span>
              </div>
              <div className="flex justify-between">
                <span>Phone Support</span>
                <span className="text-white">Mon–Sat, 9AM–9PM (UAE)</span>
              </div>
              <div className="flex justify-between">
                <span>Response Time</span>
                <span className="text-white">Under 2 hours</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 space-y-5"
            style={{ border: "1px solid rgba(212,175,55,0.15)" }}
          >
            <h3 className="text-xl font-black gold-text mb-2">Send Us a Message</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Alex Johnson"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
              </div>
              {/* Email */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Investment inquiry..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Write your message here..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="goldButton w-full py-4 flex items-center justify-center gap-2 font-bold"
            >
              {sent ? (
                <span className="text-green-900">✅ Message Sent Successfully!</span>
              ) : (
                <>
                  <FaPaperPlane size={14} /> Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
