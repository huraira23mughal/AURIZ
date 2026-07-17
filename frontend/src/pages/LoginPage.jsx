import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please enter your username and password.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await login(formData.username, formData.password);
    setLoading(false);
    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-radial-[at_50%_20%] from-[#111827] via-[#090d16] to-[#03050a] flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden font-sans">

      {/* Dynamic Gold Backglow */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-gradient-to-tr from-[#d4af37]/10 to-transparent blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-black tracking-[0.2em] bg-gradient-to-r from-white via-[#ffd066] to-[#d4af37] bg-clip-text text-transparent">
          AURIZ
        </h1>
        <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-1">Music Investment Platform</p>
      </motion.div>

      {/* auth-card animated with Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[460px] flex flex-col bg-gradient-to-b from-[#1e293b]/50 to-[#0f172a]/60 border border-white/[0.07] rounded-[32px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] p-6 sm:p-10 backdrop-blur-3xl relative z-10"
      >

        {/* Header */}
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase">
            Sign <span className="bg-gradient-to-r from-[#ffd066] to-[#d4af37] bg-clip-text text-transparent">In</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium">Welcome Back! Enter your credentials to continue.</p>
        </div>

        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-400 font-semibold"
          >
            ⚠️ {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username / Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] font-bold text-[#ffd066]/80 uppercase tracking-widest pl-1">
              Username / Email
            </label>
            <div className="relative flex items-center group">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#ffd066] transition-colors duration-200">👤</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username or email"
                required
                autoComplete="username"
                className="w-full py-3.5 pl-12 pr-4 bg-[#090d16]/90 border border-white/[0.06] rounded-2xl text-xs text-white placeholder-gray-500 font-medium focus:outline-none focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] font-bold text-[#ffd066]/80 uppercase tracking-widest pl-1">
              Password
            </label>
            <div className="relative flex items-center group">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#ffd066] transition-colors duration-200">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                className="w-full py-3.5 pl-12 pr-16 bg-[#090d16]/90 border border-white/[0.06] rounded-2xl text-xs text-white placeholder-gray-500 font-medium focus:outline-none focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/20 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-[10px] font-extrabold uppercase text-[#ffd066] hover:text-[#ffe08c] tracking-wider focus:outline-none cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot Row */}
          <div className="flex justify-between items-center text-xs font-semibold text-gray-400 pt-1 select-none">
            <label className="flex items-center gap-2.5 cursor-pointer hover:text-gray-300 transition-colors">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-[#d4af37] h-4 w-4 rounded-md border-white/10 bg-white/5 cursor-pointer"
              />
              <span>Remember Me</span>
            </label>

            <Link to="#" className="text-[#ffd978] cursor-pointer hover:text-[#ffe08c] hover:underline transition-all">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black font-extrabold text-sm tracking-wide shadow-lg shadow-[#d4af37]/10 hover:shadow-[#d4af37]/20 hover:brightness-105 active:scale-[0.98] transition-all duration-200 mt-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        {/* Bottom Navigation */}
        <div className="text-center mt-8 border-t border-white/[0.06] pt-6">
          <p className="text-xs text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#ffd978] font-bold hover:underline ml-1">
              Register now
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}

export default Login;