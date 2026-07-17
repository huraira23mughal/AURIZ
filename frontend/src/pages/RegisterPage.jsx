import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    invitationCode: "TDx3m",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (globalError) setGlobalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.agree) {
      newErrors.agree = "Please agree to the User Agreement.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setGlobalError("");

    const result = await register(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    setLoading(false);

    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      // Handle field-level errors from backend
      const errData = result.error;
      if (typeof errData === "object" && !errData.detail) {
        const mapped = {};
        Object.entries(errData).forEach(([key, val]) => {
          mapped[key] = Array.isArray(val) ? val[0] : val;
        });
        setErrors(mapped);
      } else {
        setGlobalError(errData?.detail || "Registration failed. Please try again.");
      }
    }
  };

  const inputClass = (field) =>
    `w-full py-3.5 pl-12 pr-4 bg-[#090d16]/90 border rounded-2xl text-xs text-white placeholder-gray-500 font-medium focus:outline-none focus:ring-1 transition-all duration-200 ${
      errors[field]
        ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20"
        : "border-white/[0.06] focus:border-[#d4af37]/60 focus:ring-[#d4af37]/20"
    }`;

  return (
    <div className="min-h-screen bg-radial-[at_50%_20%] from-[#111827] via-[#090d16] to-[#03050a] flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden font-sans">

      {/* Dynamic Gold Backglow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-gradient-to-tr from-[#d4af37]/10 to-transparent blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-10%] w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

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

      {/* auth-card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[460px] flex flex-col bg-gradient-to-b from-[#1e293b]/50 to-[#0f172a]/60 border border-white/[0.07] rounded-[32px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] p-6 sm:p-10 backdrop-blur-3xl relative z-10"
      >

        {/* Header */}
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase">
            Create <span className="bg-gradient-to-r from-[#ffd066] to-[#d4af37] bg-clip-text text-transparent">Account</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium">Register a new account to start investing.</p>
        </div>

        {/* Global Error */}
        {globalError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-400 font-semibold"
          >
            ⚠️ {globalError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-[#ffd066]/80 uppercase tracking-widest pl-1">Username</label>
            <div className="relative flex items-center group">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#ffd066] transition-colors duration-200">👤</span>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
                className={inputClass("username")}
              />
            </div>
            {errors.username && <p className="text-[10px] text-red-400 pl-1">{errors.username}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-[#ffd066]/80 uppercase tracking-widest pl-1">Email Address</label>
            <div className="relative flex items-center group">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#ffd066] transition-colors duration-200">🙋‍♀️</span>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={inputClass("email")}
              />
            </div>
            {errors.email && <p className="text-[10px] text-red-400 pl-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-[#ffd066]/80 uppercase tracking-widest pl-1">Password (6–15 chars)</label>
            <div className="relative flex items-center group">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#ffd066] transition-colors duration-200">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                minLength={6}
                maxLength={15}
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className={`${inputClass("password")} pr-16`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-[10px] font-extrabold uppercase text-[#ffd066] hover:text-[#ffe08c] tracking-wider focus:outline-none cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-[10px] text-red-400 pl-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-[#ffd066]/80 uppercase tracking-widest pl-1">Confirm Password</label>
            <div className="relative flex items-center group">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#ffd066] transition-colors duration-200">🔒</span>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className={`${inputClass("confirmPassword")} pr-16`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 text-[10px] font-extrabold uppercase text-[#ffd066] hover:text-[#ffe08c] tracking-wider focus:outline-none cursor-pointer"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-[10px] text-red-400 pl-1">{errors.confirmPassword}</p>}
          </div>

          {/* Invitation Code */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-[#ffd066]/80 uppercase tracking-widest pl-1">Invitation Code</label>
            <div className="relative flex items-center group">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#ffd066] transition-colors duration-200">⚙️</span>
              <input
                type="text"
                name="invitationCode"
                value={formData.invitationCode}
                onChange={handleChange}
                required
                className={inputClass("invitationCode")}
              />
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-2 select-none">
            <label className="flex items-start gap-3 cursor-pointer text-xs font-semibold text-gray-400 hover:text-gray-300 transition-colors leading-relaxed">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="accent-[#d4af37] h-4 w-4 rounded-md border-white/10 bg-white/5 cursor-pointer mt-0.5 shrink-0"
              />
              <span>
                I know and agree to the{" "}
                <Link to="#" className="text-[#ffd978] hover:text-[#ffe08c] hover:underline transition-all font-bold">
                  User Agreement
                </Link>
              </span>
            </label>
            {errors.agree && <p className="text-[10px] text-red-400 pl-7 mt-1">{errors.agree}</p>}
          </div>

          {/* Register Button */}
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
                Creating Account...
              </>
            ) : (
              "REGISTER"
            )}
          </button>

        </form>

        {/* Bottom Navigation */}
        <div className="text-center mt-8 border-t border-white/[0.06] pt-6">
          <p className="text-xs text-gray-400">
            Have an account?{" "}
            <Link to="/login" className="text-[#ffd978] font-bold hover:underline ml-1">
              Log in now
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}

export default Register;