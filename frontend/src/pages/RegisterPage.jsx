import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaUser, FaEnvelope, FaArrowRight, FaStar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    if (password !== password2) {
      setErrors({ password2: ["Passwords do not match."] });
      setSubmitting(false);
      return;
    }

    const result = await register(username, email, password, password2);
    setSubmitting(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setErrors(result.error);
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
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Create Account</p>
        </div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-gold p-8 rounded-[30px] shadow-2xl relative"
          style={{ border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <h3 className="text-2xl font-black text-white mb-6">Join AURIZ</h3>

          {errors.non_field_errors && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {errors.non_field_errors[0]}
            </div>
          )}

          {errors.detail && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {errors.detail}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <FaUser size={13} />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="alex_johnson"
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors ${
                    errors.username ? "border-red-500/50" : "border-white/10"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-xs mt-1 font-semibold">{errors.username[0]}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <FaEnvelope size={13} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@auriz.com"
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors ${
                    errors.email ? "border-red-500/50" : "border-white/10"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 font-semibold">{errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <FaLock size={13} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors ${
                    errors.password ? "border-red-500/50" : "border-white/10"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 font-semibold">{errors.password[0]}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <FaLock size={13} />
                </span>
                <input
                  type="password"
                  required
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors ${
                    errors.password2 ? "border-red-500/50" : "border-white/10"
                  }`}
                />
              </div>
              {errors.password2 && (
                <p className="text-red-400 text-xs mt-1 font-semibold">{errors.password2[0]}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 text-xs font-semibold py-1">
              <input
                id="terms"
                type="checkbox"
                required
                className="w-4 h-4 rounded border-gray-700 bg-white/5 text-yellow-500 focus:ring-yellow-500"
              />
              <label htmlFor="terms" className="text-gray-400 cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-yellow-400 hover:text-yellow-300">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-yellow-400 hover:text-yellow-300">
                  Risk Disclosure
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="goldButton w-full py-3.5 flex items-center justify-center gap-2 font-bold text-sm"
            >
              {submitting ? "Creating Account..." : "Create Account"}{" "}
              {!submitting && <FaArrowRight size={12} />}
            </motion.button>
          </form>
        </motion.div>

        {/* Footnote */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
