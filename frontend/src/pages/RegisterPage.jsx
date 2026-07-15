import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [txPassword, setTxPassword] = useState("");
  const [invite, setInvite] = useState("TDS53m");
  const [agree, setAgree] = useState(false);
  
  const [emailError, setEmailError] = useState("");
  const [codeInfo, setCodeInfo] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const isValidEmail = (val) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(val);
  };

  const handleEmailChange = (e) => {
    const val = e.target.value.trim();
    setEmail(val);
    if (val && !isValidEmail(val)) {
      setEmailError("Invalid email format. E.g., user@domain.com");
    } else {
      setEmailError("");
    }
  };

  const triggerVerificationCode = () => {
    if (!email) {
      setEmailError("Please enter email first.");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    
    // Simulate sending code
    const generatedCode = Math.floor(1000 + Math.random() * 9000);
    setCodeInfo(`Verification code: ${generatedCode}`);
    setCode(generatedCode.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6 || password.length > 15) {
      alert("Password must be between 6 and 15 digits.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (txPassword.length !== 6 || isNaN(txPassword)) {
      alert("Transaction password must be a 6-digit number.");
      return;
    }
    if (!agree) {
      alert("You must agree to the Terms of Use Agreement.");
      return;
    }

    setLoading(true);
    const username = email.split("@")[0] + "_" + Math.floor(10 + Math.random() * 90);
    const result = await register(username, email, password, password);
    setLoading(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      alert(JSON.stringify(result.error));
    }
  };

  const handleGoogleAuth = () => {
    alert("Connecting to Google authentication...");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#070a12] flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-[5%] left-[-10%] w-[300px] h-[300px] bg-[#d4af37]/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-10%] w-[300px] h-[300px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] flex flex-col bg-[#151c2c]/40 border border-white/5 rounded-[36px] shadow-2xl p-6 sm:p-8 backdrop-blur-2xl relative z-10"
      >
        
        {/* Header Banner */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white to-[#ffd066] bg-clip-text text-transparent">
            Email registration
          </h2>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 cursor-pointer hover:border-[#d4af37]/35 transition">
            <span className="text-sm">🇬🇧</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full py-4 border border-white/10 rounded-2xl bg-white/[0.04] text-gray-200 text-sm font-bold flex items-center justify-center gap-2.5 hover:bg-white/[0.08] transition cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" className="flex-shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 12-5.38z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-white/5 before:mr-3 after:flex-1 after:border-t after:border-white/5 after:ml-3 text-[10px] text-gray-500 font-bold uppercase tracking-wider text-center">
            or fill details
          </div>

          {/* Email input */}
          <div className="flex flex-col">
            <label className="text-[10px] font-black text-[#ffd066] mb-1.5 uppercase tracking-widest">Please enter email</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 text-sm">👤</span>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email address"
                className="w-full py-4 pl-11 pr-4 bg-[#0d1321] border border-white/[0.08] rounded-2xl text-xs text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-[#d4af37] focus:bg-[#0d1321] transition"
                required
              />
            </div>
            {emailError && (
              <span className="text-[10px] text-red-400 font-bold mt-1.5 ml-1">{emailError}</span>
            )}
          </div>

          {/* Verification Code */}
          <div className="flex flex-col">
            <label className="text-[10px] font-black text-[#ffd066] mb-1.5 uppercase tracking-widest">Please enter verification code</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 text-sm">⌨️</span>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full py-4 pl-11 pr-24 bg-[#0d1321] border border-white/[0.08] rounded-2xl text-xs text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-[#d4af37] focus:bg-[#0d1321] transition"
                required
              />
              <button
                type="button"
                onClick={triggerVerificationCode}
                className="absolute right-2 py-1.5 px-3 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-[10px] font-black rounded-lg cursor-pointer hover:opacity-90 transition"
              >
                Get code
              </button>
            </div>
            {codeInfo && (
              <span className="text-[10px] text-emerald-400 font-bold mt-1.5 ml-1">{codeInfo}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-[10px] font-black text-[#ffd066] mb-1.5 uppercase tracking-widest">Please enter a 6-15 digit password</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 text-sm">🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a 6-15 digit password"
                className="w-full py-4 pl-11 pr-4 bg-[#0d1321] border border-white/[0.08] rounded-2xl text-xs text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-[#d4af37] focus:bg-[#0d1321] transition"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-[10px] font-black text-[#ffd066] mb-1.5 uppercase tracking-widest">Please enter the password again</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 text-sm">🔒</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full py-4 pl-11 pr-4 bg-[#0d1321] border border-white/[0.08] rounded-2xl text-xs text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-[#d4af37] focus:bg-[#0d1321] transition"
                required
              />
            </div>
          </div>

          {/* Transaction Password */}
          <div className="flex flex-col">
            <label className="text-[10px] font-black text-[#ffd066] mb-1.5 uppercase tracking-widest">Please enter transaction password (6 digits)</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 text-sm">🔑</span>
              <input
                type="password"
                value={txPassword}
                onChange={(e) => setTxPassword(e.target.value)}
                placeholder="Enter 6-digit transaction PIN"
                maxLength="6"
                className="w-full py-4 pl-11 pr-4 bg-[#0d1321] border border-white/[0.08] rounded-2xl text-xs text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-[#d4af37] focus:bg-[#0d1321] transition"
                required
              />
            </div>
          </div>

          {/* Invitation Code */}
          <div className="flex flex-col">
            <label className="text-[10px] font-black text-[#ffd066] mb-1.5 uppercase tracking-widest">Please enter invitation code</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 text-sm">⚙️</span>
              <input
                type="text"
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                placeholder="Enter invitation code"
                className="w-full py-4 pl-11 pr-4 bg-[#0d1321] border border-white/[0.08] rounded-2xl text-xs text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-[#d4af37] focus:bg-[#0d1321] transition"
                required
              />
            </div>
          </div>

          {/* Agreement Row */}
          <div className="flex items-center gap-2 pt-2">
            <input
              id="agree-box"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-white/10 bg-white/5 text-[#d4af37] focus:ring-[#d4af37] cursor-pointer"
              required
            />
            <label htmlFor="agree-box" className="text-[11px] font-bold text-gray-400 cursor-pointer select-none">
              I know and agree <span className="text-[#ffd978]">【Terms of Use Agreement】</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-[#ffd978] to-[#d4af37] hover:from-[#ffe08c] hover:to-[#e3bf4c] text-black font-black text-sm shadow-xl transition cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6 border-t border-white/5 pt-5">
          <Link to="/login" className="text-xs font-bold text-[#ffd978] hover:underline">
            Have an account, Log in now
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
