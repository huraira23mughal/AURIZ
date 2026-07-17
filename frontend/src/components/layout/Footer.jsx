import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTwitter, FaTelegram, FaWhatsapp, FaLinkedin, FaShieldAlt } from "react-icons/fa";

const footerLinks = {
  Platform: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Investment Plans", to: "/plans" },
    { label: "Company Listing", to: "/companies" },
    { label: "Daily Tasks", to: "/dashboard" },
    { label: "Referral Program", to: "/dashboard" },
  ],
  Support: [
    { label: "Help Center", to: "/contact" },
    { label: "Contact Us", to: "/contact" },
    { label: "FAQs", to: "/contact" },
    { label: "Live Chat", to: "/contact" },
    { label: "Report Issue", to: "/contact" },
  ],
  Company: [
    { label: "About AURIZ", to: "/about" },
    { label: "News & Updates", to: "/news" },
    { label: "Careers", to: "/about" },
    { label: "Press Kit", to: "/about" },
    { label: "Partners", to: "/about" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/" },
    { label: "Terms of Service", to: "/" },
    { label: "Risk Disclosure", to: "/" },
    { label: "Cookie Policy", to: "/" },
    { label: "Compliance", to: "/" },
  ],
};

const socials = [
  { icon: <FaTwitter />, label: "Twitter" },
  { icon: <FaTelegram />, label: "Telegram" },
  { icon: <FaWhatsapp />, label: "WhatsApp" },
  { icon: <FaLinkedin />, label: "LinkedIn" },
];

function Footer() {
  return (
    <footer
      className="mt-0"
      style={{
        background: "linear-gradient(180deg, #070A12 0%, #04060D 100%)",
        borderTop: "1px solid rgba(212,175,55,0.15)",
      }}
    >
      {/* CTA Banner */}
      <div className="section py-12 md:py-16 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-7 md:p-10 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(13,19,31,0.9), rgba(212,175,55,0.06))",
            border: "1px solid rgba(212,175,55,0.25)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, #D4AF37, transparent 70%)" }}
          />
          <p className="text-yellow-400 uppercase tracking-widest text-sm font-bold mb-3 relative z-10">
            Ready To Start?
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">
            Begin Your Investment Journey
            <span className="gold-text"> Today</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto relative z-10 text-sm md:text-base">
            Join 25,000+ investors already growing their wealth on AURIZ.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8 relative z-10">
            <Link to="/plans">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="goldButton px-8 md:px-10 py-3.5 md:py-4 flex items-center gap-2 font-bold text-sm md:text-base"
              >
                Start Investing <FaArrowRight size={14} />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass rounded-2xl px-8 md:px-10 py-3.5 md:py-4 font-semibold border border-white/10 hover:border-yellow-400/30 transition-all text-sm md:text-base"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="section pb-10 md:pb-12 px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10 mb-10 md:mb-12">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-black text-lg"
                style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}
              >
                A
              </div>
              <div>
                <h3 className="font-black text-lg gold-text tracking-widest">AURIZ</h3>
                <p className="text-[10px] text-gray-500">Premium Investment</p>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-7 max-w-xs">
              The world's leading premium investment platform, trusted by 25,000+ investors across 120+ countries.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map((s, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-yellow-400 transition-colors"
                  title={s.label}
                >
                  {s.icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-500 hover:text-yellow-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-gray-600 text-sm">
            © 2026 AURIZ Investment Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <FaShieldAlt className="text-yellow-400" />
            <span>256-bit SSL Secured · Regulated · Trusted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-500 font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
