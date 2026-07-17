import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Verification() {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback if the user navigated here directly without registering
  const email = location.state?.email || "your email";

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // Resend Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (code.length < 6) {
      alert("Please enter the 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    try {
      // Send verification request to backend
      // const response = await axios.post('/api/auth/verify-otp', { email, code });

      alert("Email verified successfully! Welcome aboard.");
      navigate("/dashboard"); // Go to dashboard
    } catch (err) {
      alert("Invalid or expired verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setTimer(60);
    try {
      // Trigger API to send a new code
      // await axios.post('/api/auth/resend-otp', { email });
      alert("A new code has been sent!");
    } catch (err) {
      alert("Failed to resend code.");
    }
  };

  return (
    <div className="min-h-screen bg-radial-[at_50%_20%] from-[#111827] via-[#090d16] to-[#03050a] flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden font-sans">

      {/* Dynamic Gold Backglow */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-gradient-to-tr from-[#d4af37]/10 to-transparent blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* auth-card animated with Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] flex flex-col bg-gradient-to-b from-[#1e293b]/50 to-[#0f172a]/60 border border-white/[0.07] rounded-[32px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] p-6 sm:p-10 backdrop-blur-3xl relative z-10"
      >

        {/* Header */}
        <div className="space-y-2 mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase">
            Email <span className="bg-gradient-to-r from-[#ffd066] to-[#d4af37] bg-clip-text text-transparent">Verification</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-[300px] mx-auto">
            We have sent a verification code to <br />
            <span className="text-white font-semibold">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">

          {/* Verification Code Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] font-bold text-[#ffd066]/80 uppercase tracking-widest pl-1">
              Verification Code
            </label>
            <div className="relative flex items-center group">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#ffd066] transition-colors duration-200">📧</span>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                disabled={isLoading}
                className="w-full py-4 pl-12 pr-4 bg-[#090d16]/90 border border-white/[0.06] rounded-2xl text-sm text-center tracking-[0.25em] font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/20 transition-all duration-200 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black font-extrabold text-sm tracking-wide shadow-lg shadow-[#d4af37]/10 hover:shadow-[#d4af37]/20 hover:brightness-105 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? "VERIFYING..." : "VERIFY"}
            </button>

            {/* Resend Code Button with Timer Logic */}
            <button
              type="button"
              onClick={handleResend}
              disabled={timer > 0 || isLoading}
              className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-gray-300 font-bold text-xs tracking-wide hover:bg-white/[0.06] hover:text-white active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {timer > 0 ? `Resend Code in ${timer}s` : "Resend Code"}
            </button>
          </div>

        </form>

        {/* Bottom Navigation */}
        <div className="text-center mt-8 border-t border-white/[0.06] pt-6">
          <p className="text-xs text-gray-400">
            Wrong email?{" "}
            <Link to="/register" className="text-[#ffd978] font-bold hover:underline ml-1">
              Go Back
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}

export default Verification;