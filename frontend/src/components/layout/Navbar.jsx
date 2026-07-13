import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaArrowRight, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const menu = [
  { label: "Home", href: "#home" },
  { label: "Companies", href: "#companies" },
  { label: "Plans", href: "#plans" },
  { label: "News", href: "#news" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (item) => {
    setActive(item.label);
    setMenuOpen(false);
    const el = document.querySelector(item.href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05060acc] backdrop-blur-xl border-b border-yellow-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="section flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ boxShadow: ["0 0 10px #d4af37aa", "0 0 25px #d4af37cc", "0 0 10px #d4af37aa"] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-black font-black text-xl"
          >
            A
          </motion.div>
          <div>
            <h2 className="text-xl font-black tracking-widest gold-text">AURIZ</h2>
            <p className="text-[10px] text-gray-400 tracking-wider">Premium Investment</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8">
          {menu.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNav(item)}
                className={`text-sm font-semibold transition-all duration-200 pb-1 border-b-2 ${
                  active === item.label
                    ? "text-yellow-400 border-yellow-400"
                    : "text-gray-300 border-transparent hover:text-yellow-400 hover:border-yellow-400/50"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex gap-3 items-center">
          {isAuthenticated ? (
            <>
              {/* Dashboard Link */}
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.35)",
                    color: "#FFD978",
                    boxShadow: "0 0 15px rgba(212,175,55,0.15)",
                  }}
                >
                  <FaChartPie size={13} /> Dashboard
                </motion.div>
              </Link>
              <span className="text-gray-300 text-sm font-medium">Hi, {user?.username}</span>
              <button
                onClick={logout}
                className="glass px-4 py-2 rounded-xl text-sm font-semibold hover:border-red-500/40 text-gray-300 hover:text-red-400 transition-all flex items-center gap-1.5"
              >
                <FaSignOutAlt size={12} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="glass px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-yellow-400/40 text-white transition-all">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="goldButton px-5 py-2.5 text-sm">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-2xl text-white"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mx-4 mb-4 rounded-2xl overflow-hidden"
          >
            <div className="p-6 space-y-1">
              {menu.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    active === item.label
                      ? "text-yellow-400 bg-yellow-400/10"
                      : "text-gray-300 hover:text-yellow-400 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 space-y-3">
                {isAuthenticated ? (
                  <>
                    {/* Dashboard Link Mobile */}
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                      <div
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold mb-1"
                        style={{
                          background: "rgba(212,175,55,0.1)",
                          border: "1px solid rgba(212,175,55,0.35)",
                          color: "#FFD978",
                        }}
                      >
                        <FaChartPie size={13} /> Open Dashboard
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="w-full py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <FaSignOutAlt size={12} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full">
                        <button className="w-full glass py-3 rounded-xl text-sm font-semibold text-center text-white">
                          Login
                        </button>
                      </Link>
                      <Link to="/register" onClick={() => setMenuOpen(false)} className="w-full">
                        <button className="w-full goldButton py-3 text-sm text-center">
                          Register
                        </button>
                      </Link>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setMenuOpen(false);
                        const el = document.querySelector("#plans");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full glass border border-yellow-400/30 text-yellow-400 py-3 text-sm text-center font-bold rounded-xl"
                    >
                      Start Investing
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;