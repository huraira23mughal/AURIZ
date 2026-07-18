import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AurizBackground from "../components/AurizBackground";

const InputWithIcon = ({ icon: Icon, type, placeholder, value, onChange, showToggle, onToggle, error }) => (
  <div className={`relative flex items-center rounded-xl overflow-hidden transition
    ${error
      ? "border border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
      : "border border-white/10 focus-within:border-yellow-400/50 focus-within:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
    } bg-[#0a0a0a]`}
  >
    <div className="flex items-center justify-center w-12 h-12 border-r border-white/10 shrink-0">
      <Icon className="w-5 h-5 text-yellow-400" />
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      className="flex-1 bg-transparent px-4 py-3.5 text-white placeholder-gray-500 outline-none text-sm"
    />
    {showToggle !== undefined && (
      <button type="button" onClick={onToggle} className="pr-4 text-yellow-400 shrink-0">
        {showToggle ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    )}
  </div>
);

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const update = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    setErrors(prev => ({ ...prev, [field]: "" }));
    setApiError("");
  };

  const validate = () => {
    const e = {};
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) e.email = "Enter a valid email.";
    if (!formData.password) e.password = "Password is required.";
    else if (formData.password.length < 6) e.password = "Minimum 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || loading) return;
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setApiError(result.error || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      <AurizBackground />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-black/50 border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(255,215,0,0.2)]"
      >
        <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

        <div className="text-center mb-7">
          <h1 className="text-5xl font-extrabold tracking-[0.4em] bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            AURIZ
          </h1>
          <p className="mt-2 text-gray-400 text-sm">Welcome back</p>
        </div>

        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
          >
            {apiError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-yellow-400 mb-2 block font-semibold">Email Address</label>
            <InputWithIcon
              icon={Mail}
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              error={errors.email}
              onChange={(e) => update("email", e.target.value)}
            />
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm text-yellow-400 mb-2 block font-semibold">Password</label>
            <InputWithIcon
              icon={Lock}
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              error={errors.password}
              onChange={(e) => update("password", e.target.value)}
              showToggle={showPass}
              onToggle={() => setShowPass(p => !p)}
            />
            {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-end text-sm">
            <Link to="/forgot" className="text-yellow-400 hover:text-yellow-300 transition">
              Forgot Password?
            </Link>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 40px rgba(255,215,0,0.8)" } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            className="w-full py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-[0_0_30px_rgba(255,215,0,0.6)] flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Logging in...</> : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-gray-400 mt-5 text-sm">Don't have an account?</p>
        <Link
          to="/register"
          className="block text-center text-yellow-400 font-semibold mt-1 hover:text-yellow-300 transition"
        >
          Create Account →
        </Link>
      </motion.div>
    </div>
  );
}