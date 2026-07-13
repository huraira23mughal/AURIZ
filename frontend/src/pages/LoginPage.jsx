import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaUser, FaArrowRight, FaStar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await login(username, password);
    setSubmitting(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D131F] relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-400/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-black font-black text-2xl mx-auto shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              A
            </motion.div>
          </Link>
          <h2 className="mt-4 text-3xl font-black tracking-widest gold-text">AURIZ</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Premium Investment Portal</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-gold p-8 rounded-[30px] shadow-2xl relative"
          style={{ border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <h3 className="text-2xl font-black text-white mb-6">Welcome Back</h3>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                Username / Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <FaUser size={14} />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="alex"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <FaLock size={14} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-white/5 text-yellow-500 focus:ring-yellow-500"
                />
                <label htmlFor="remember" className="text-gray-400 cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-yellow-400 hover:text-yellow-300">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="goldButton w-full py-3.5 flex items-center justify-center gap-2 font-bold text-sm"
            >
              {submitting ? "Signing in..." : "Sign In"}{" "}
              {!submitting && <FaArrowRight size={12} />}
            </motion.button>
          </form>

          {/* Seed/Test Info Overlay */}
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500">
              Demo Credentials: <span className="text-yellow-400/80 font-mono font-bold">alex</span> /{" "}
              <span className="text-yellow-400/80 font-mono font-bold">auriz2024</span>
            </p>
          </div>
        </motion.div>

        {/* Footnote */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:text-yellow-300 font-bold">
            Sign up now
          </Link>
        </p>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 mt-8 text-gray-500 text-xs">
          <div className="flex text-yellow-400/50 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={10} />
            ))}
          </div>
          <span>9.99/10 Trust score</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
