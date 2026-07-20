import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaShieldAlt, FaArrowLeft, FaRedo } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email";

  const [code, setCode]         = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer]       = useState(60);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);

  const inputRefs = Array.from({ length: 6 }, () => null);

  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [timer]);

  const handleChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...code];
    next[i] = val.slice(-1);
    setCode(next);
    setError("");
    if (val && i < 5) inputRefs[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) inputRefs[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
    setCode(next);
  };

  const codeStr = code.join("");

  const handleVerify = async (e) => {
    e.preventDefault();
    if (codeStr.length < 6) { setError("Please enter the complete 6-digit code."); return; }
    setIsLoading(true);
    try {
      // API call here: await API.post('/auth/verify-otp', { email, code: codeStr });
      await new Promise(r => setTimeout(r, 1200)); // Simulate API
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      setError("Invalid or expired code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setTimer(60);
    setError("");
    try {
      // await API.post('/auth/resend-otp', { email });
    } catch {}
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-5 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #05060a 0%, #0b1020 50%, #070A12 100%)" }}>

      {/* Background orbs */}
      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 12, repeat: Infinity, delay: 3 }} />

      {/* Orbital ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div className="w-[700px] h-[700px] rounded-full border absolute"
          style={{ borderColor: "rgba(212,175,55,0.04)", left: -350, top: -350 }}
          animate={{ rotateZ: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative"
      >
        <div
          className="rounded-[32px] p-8 md:p-10 relative overflow-hidden"
          style={{
            background: "rgba(10, 15, 28, 0.9)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(32px)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Shimmer top */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div key="verify" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 relative"
                    style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
                    animate={{ boxShadow: ["0 0 15px rgba(212,175,55,0.15)", "0 0 40px rgba(212,175,55,0.35)", "0 0 15px rgba(212,175,55,0.15)"] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <FaEnvelope size={30} className="text-yellow-400" />
                    {/* Ping rings */}
                    <motion.div className="absolute inset-0 rounded-2xl border border-yellow-400/20"
                      animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }} />
                  </motion.div>

                  <h1 className="text-2xl font-black text-white">Check Your Email</h1>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    We've sent a 6-digit code to<br />
                    <span className="text-yellow-400 font-semibold">{email}</span>
                  </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                  {/* OTP Input Boxes */}
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 text-center">
                      Enter Verification Code
                    </p>
                    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                      {code.map((digit, i) => (
                        <motion.input
                          key={i}
                          ref={(el) => (inputRefs[i] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleChange(i, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(i, e)}
                          whileFocus={{ scale: 1.08 }}
                          className="w-11 h-14 text-center text-xl font-black text-white rounded-2xl outline-none transition-all"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: digit
                              ? "2px solid rgba(212,175,55,0.7)"
                              : "1px solid rgba(255,255,255,0.08)",
                            boxShadow: digit ? "0 0 12px rgba(212,175,55,0.2)" : "none",
                          }}
                        />
                      ))}
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="text-center mt-3 text-xs text-red-400"
                        >
                          ⚠️ {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Verify button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || codeStr.length < 6}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    className="w-full py-4 rounded-2xl font-black text-black text-sm flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #FFD978, #D4AF37)",
                      boxShadow: "0 0 25px rgba(212,175,55,0.3), 0 8px 24px rgba(0,0,0,0.3)",
                    }}
                  >
                    {!isLoading && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                      />
                    )}
                    {isLoading ? <><Loader2 size={15} className="animate-spin" /> Verifying...</> : "Verify Email"}
                  </motion.button>

                  {/* Resend */}
                  <div className="text-center">
                    {timer > 0 ? (
                      <p className="text-sm text-gray-500">
                        Resend code in <span className="text-yellow-400 font-bold font-mono">{timer}s</span>
                      </p>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={handleResend}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="text-sm text-yellow-400 font-bold hover:text-yellow-300 transition flex items-center justify-center gap-1.5 mx-auto"
                      >
                        <FaRedo size={11} /> Resend Code
                      </motion.button>
                    )}
                  </div>
                </form>

                {/* Back */}
                <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <Link to="/register"
                    className="text-xs text-gray-500 hover:text-gray-300 transition flex items-center justify-center gap-2">
                    <FaArrowLeft size={10} /> Wrong email? Go back to register
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center py-8 space-y-5"
              >
                <motion.div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto text-green-400 text-5xl relative"
                  style={{ background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.3)" }}
                  animate={{ boxShadow: ["0 0 20px rgba(34,197,94,0.3)", "0 0 60px rgba(34,197,94,0.6)", "0 0 20px rgba(34,197,94,0.3)"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✓
                  <motion.div className="absolute inset-0 rounded-3xl border-2 border-green-400/30"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }} />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-black text-white">Email Verified! 🎉</h2>
                  <p className="text-sm text-gray-400 mt-2">Welcome to AURIZ. Redirecting to your dashboard...</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <FaShieldAlt size={9} className="text-green-500" />
                  Your account is now secure
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}