import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const menu = [
  { label: "Home", to: "/" },
  { label: "Companies", to: "/companies" },
  { label: "Plans", to: "/plans" },
  { label: "News", to: "/news" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  // Track scroll for glass effect
  useState(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

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
      <div className="section flex justify-between items-center py-4 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
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
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8">
          {menu.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className={`text-sm font-semibold transition-all duration-200 pb-1 border-b-2 ${
                  isActive(item.to)
                    ? "text-yellow-400 border-yellow-400"
                    : "text-gray-300 border-transparent hover:text-yellow-400 hover:border-yellow-400/50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex gap-3 items-center">
          {isAuthenticated ? (
            <>
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

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          {isAuthenticated && (
            <Link to="/dashboard">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer"
                style={{
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.35)",
                  color: "#FFD978",
                }}
              >
                <FaChartPie size={15} />
              </motion.div>
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
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
            <div className="p-5 space-y-1">
              {menu.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full block py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    isActive(item.to)
                      ? "text-yellow-400 bg-yellow-400/10"
                      : "text-gray-300 hover:text-yellow-400 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                {isAuthenticated ? (
                  <>
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
                      onClick={() => { setMenuOpen(false); logout(); }}
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
                    <Link to="/plans" onClick={() => setMenuOpen(false)}>
                      <button className="w-full glass border border-yellow-400/30 text-yellow-400 py-3 text-sm text-center font-bold rounded-xl mt-2">
                        Start Investing
                      </button>
                    </Link>
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