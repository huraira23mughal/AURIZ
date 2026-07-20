import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft, FaCoins, FaQrcode, FaCheckCircle,
  FaExclamationTriangle, FaCopy, FaHourglassHalf,
  FaExternalLinkAlt, FaBolt, FaShieldAlt, FaClock,
} from "react-icons/fa";
import API from "../api/axios";
import MobileLayout from "../components/common/MobileLayout";

const presetAmounts = [20, 50, 100, 300, 500, 1000];

// ── Animated countdown timer ──────────────────────────────────────────────────
function CountdownTimer({ expiresAt }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const diff = new Date(expiresAt) - new Date();
      if (diff <= 0) { setTimeLeft("Expired"); return; }
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${m}:${s.toString().padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  return (
    <span className="font-mono font-black text-yellow-400">{timeLeft}</span>
  );
}

// ── Copy-to-clipboard hook ────────────────────────────────────────────────────
function useCopy(text, timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    });
  };
  return [copied, copy];
}

// ── Main component ────────────────────────────────────────────────────────────
function RechargePage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);
  const [directMode, setDirectMode] = useState(false); // real USDT direct transfer (no Binance API keys)
  const [walletAddress, setWalletAddress] = useState("TYDzsYUEpvnYmQk4zGP9sWWcTEd2MiAtW6");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const navigate = useNavigate();

  const [copiedAddr, copyAddr] = useCopy(walletAddress);
  const [copiedAmount, copyAmount] = useCopy(amount || "0");

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) < 10) {
      setError("Minimum recharge is $10 USDT");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await API.post("payment/binance/create/", {
        amount: parseFloat(amount),
      });
      setOrder(res.data.order);
      // If Binance Pay API keys are not configured, backend returns demo_mode=true
      // We display this as "direct USDT transfer" mode — still real money
      const isDirectMode = res.data.demo_mode === true;
      setDirectMode(isDirectMode);
      if (isDirectMode && res.data.wallet_address) {
        setWalletAddress(res.data.wallet_address.replace("TRC20: ", ""));
      }
      setPaymentStatus("pending");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create payment order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Real-time polling every 4s
  useEffect(() => {
    if (!order || paymentStatus !== "pending") return;
    const interval = setInterval(async () => {
      try {
        const res = await API.get(`payment/binance/status/${order.prepay_id}/`);
        const s = res.data.order.status;
        if (s === "paid") { setPaymentStatus("paid"); clearInterval(interval); }
        else if (s === "expired" || s === "failed") { setPaymentStatus("expired"); clearInterval(interval); }
      } catch {}
    }, 4000);
    return () => clearInterval(interval);
  }, [order, paymentStatus]);

  return (
    <MobileLayout activeTab="Profile">
      <div className="min-h-screen pb-28 text-white relative overflow-hidden">

        {/* 3D background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)", filter: "blur(30px)" }} />
          <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)", filter: "blur(40px)" }} />
        </div>

        {/* ── Header ── */}
        <div className="flex items-center gap-4 py-4 px-4 border-b border-white/5 mb-6 relative z-10">
          <Link to="/profile" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition">
            <FaArrowLeft size={14} />
          </Link>
          <div>
            <h1 className="text-xl font-black">Recharge Account</h1>
            <p className="text-xs text-gray-400">Add funds instantly with USDT</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-green-400 font-bold bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Live
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ── Step 1: Amount Entry ── */}
          {!order ? (
            <motion.div
              key="entry"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="px-4 space-y-5 relative z-10"
            >
              {/* Trust badges */}
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                {[
                  { icon: FaShieldAlt, label: "256-bit SSL" },
                  { icon: FaBolt, label: "Instant Credit" },
                  { icon: FaCoins, label: "USDT TRC20/BEP20" },
                ].map((b, i) => (
                  <div key={i} className="flex-shrink-0 flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 bg-white/[0.03] border border-white/8 px-3 py-1.5 rounded-full">
                    <b.icon size={9} className="text-yellow-400" /> {b.label}
                  </div>
                ))}
              </div>

              <form onSubmit={handleCreateOrder} className="space-y-4">
                {/* Amount card */}
                <motion.div
                  className="relative rounded-[28px] p-6 overflow-hidden"
                  style={{
                    background: "rgba(18, 24, 40, 0.7)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                  whileHover={{ boxShadow: "0 24px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 30px rgba(212,175,55,0.06)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shimmer top edge */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Enter Amount</span>
                    <span className="bg-yellow-400/10 border border-yellow-400/25 text-yellow-400 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                      <FaCoins size={8} /> USDT
                    </span>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/25 text-red-400 text-xs px-4 py-3 rounded-2xl mb-4 flex items-center gap-2"
                    >
                      <FaExclamationTriangle size={12} /> {error}
                    </motion.div>
                  )}

                  {/* Amount input */}
                  <div className="relative mb-5">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center">
                      <span className="text-gray-400 font-black text-2xl select-none">$</span>
                    </div>
                    <input
                      type="number"
                      required
                      min="10"
                      step="any"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-2xl pl-11 pr-16 py-4 text-3xl font-black text-white focus:outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "rgba(212,175,55,0.5)"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                    <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 font-bold text-sm">USDT</span>
                  </div>

                  {/* Preset amounts */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {presetAmounts.map((amt) => (
                      <motion.button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(amt.toString())}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                          amount === amt.toString()
                            ? "text-black border-yellow-400"
                            : "text-gray-400 border-white/8 hover:border-white/15 hover:text-white"
                        }`}
                        style={amount === amt.toString()
                          ? { background: "linear-gradient(135deg, #FFD978, #D4AF37)" }
                          : { background: "rgba(255,255,255,0.03)" }
                        }
                      >
                        +${amt}
                      </motion.button>
                    ))}
                  </div>

                  {/* Estimated receive */}
                  {amount && parseFloat(amount) >= 10 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-white/5"
                    >
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">You Pay</span>
                        <span className="text-white font-bold">${parseFloat(amount).toFixed(2)} USDT</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1.5">
                        <span className="text-gray-500">Fee</span>
                        <span className="text-green-400 font-bold">FREE</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-400 font-semibold">You Receive</span>
                        <span className="text-yellow-400 font-black">${parseFloat(amount).toFixed(2)} USDT</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(212,175,55,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="goldButton w-full py-4 font-black rounded-2xl flex items-center justify-center gap-2 text-base relative overflow-hidden"
                  style={{ boxShadow: "0 0 20px rgba(212,175,55,0.2)" }}
                >
                  {/* Shimmer */}
                  {!loading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                  <FaBolt size={14} />
                  {loading ? "Initializing Payment..." : "Pay Now with Binance"}
                </motion.button>

                <p className="text-center text-[10px] text-gray-600 flex items-center justify-center gap-1.5">
                  <FaShieldAlt size={9} /> Powered by Binance Pay · Secured by blockchain
                </p>
              </form>
            </motion.div>

          ) : (
            /* ── Step 2: Payment Screen ── */
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="px-4 space-y-4 relative z-10"
            >
              {/* Order summary card */}
              <motion.div
                className="relative rounded-[28px] p-6 overflow-hidden"
                style={{
                  background: "rgba(18, 24, 40, 0.8)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 24px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

                {/* Amount display */}
                <div className="text-center py-4">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Total Due</p>
                  <motion.h2
                    className="text-5xl font-black gold-text"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {order.amount_usdt} <span className="text-2xl text-gray-400">USDT</span>
                  </motion.h2>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <p className="text-[10px] text-gray-600 font-mono">#{order.merchant_trade_no?.slice(-12)}</p>
                    {order.expires_at && (
                      <div className="flex items-center gap-1 text-[10px] text-gray-500">
                        <FaClock size={8} />
                        Expires in <CountdownTimer expiresAt={order.expires_at} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                {/* ── PENDING STATE ── */}
                {paymentStatus === "pending" && (
                  <div className="space-y-5 pt-2">

                    {/* ── Real Binance Pay (QR + deep link) ── */}
                    {!directMode && (
                      <div className="flex flex-col items-center space-y-5">
                        {/* QR Code */}
                        <div className="relative">
                          <div className="absolute inset-0 rounded-2xl bg-yellow-400/10 blur-xl" />
                          <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                            <img
                              src={
                                order.qr_code_url ||
                                `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(order.checkout_url || "")}&format=png&bgcolor=ffffff`
                              }
                              alt="Binance Pay QR Code"
                              className="w-48 h-48 rounded-xl"
                            />
                          </div>
                        </div>

                        <div className="text-center space-y-1">
                          <p className="text-xs text-white font-semibold">Scan with Binance App</p>
                          <p className="text-[10px] text-gray-500 leading-relaxed max-w-[240px]">
                            Open Binance → Pay → Scan QR Code to complete payment instantly
                          </p>
                        </div>

                        {order.checkout_url && (
                          <a
                            href={order.checkout_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 goldButton font-black rounded-2xl flex items-center justify-center gap-2 text-sm"
                            style={{ boxShadow: "0 0 25px rgba(212,175,55,0.3)" }}
                          >
                            Open Binance Pay <FaExternalLinkAlt size={11} />
                          </a>
                        )}
                      </div>
                    )}

                    {/* ── Direct USDT Transfer Mode (no Binance API keys configured) ── */}
                    {directMode && (
                      <div className="space-y-4">
                        {/* Network tabs */}
                        <div className="flex gap-2">
                          {["TRC20 (Tron)", "BEP20 (BSC)"].map((net, i) => (
                            <div
                              key={net}
                              className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-center border transition ${
                                i === 0
                                  ? "bg-yellow-400/10 border-yellow-400/40 text-yellow-400"
                                  : "bg-white/[0.03] border-white/8 text-gray-500"
                              }`}
                            >
                              {net}
                            </div>
                          ))}
                        </div>

                        {/* Wallet address */}
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">USDT Deposit Address</p>
                          <div
                            className="flex gap-2 p-3 rounded-2xl"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                          >
                            <p className="flex-1 text-xs font-mono text-gray-300 break-all leading-relaxed">
                              {walletAddress}
                            </p>
                            <motion.button
                              onClick={copyAddr}
                              whileTap={{ scale: 0.9 }}
                              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                                copiedAddr
                                  ? "bg-green-500/15 border border-green-500/30 text-green-400"
                                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                              }`}
                            >
                              <FaCopy size={11} />
                              {copiedAddr ? "Copied!" : "Copy"}
                            </motion.button>
                          </div>
                        </div>

                        {/* Amount to send */}
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Exact Amount to Send</p>
                          <div
                            className="flex items-center justify-between p-4 rounded-2xl"
                            style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}
                          >
                            <span className="text-xl font-black text-yellow-400">{order.amount_usdt} USDT</span>
                            <motion.button
                              onClick={copyAmount}
                              whileTap={{ scale: 0.9 }}
                              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                                copiedAmount
                                  ? "bg-green-500/15 text-green-400"
                                  : "bg-white/10 text-gray-300 hover:text-white"
                              }`}
                            >
                              <FaCopy size={10} />
                              {copiedAmount ? "Copied!" : "Copy"}
                            </motion.button>
                          </div>
                        </div>

                        {/* Instructions */}
                        <div
                          className="rounded-2xl p-4 text-xs text-gray-400 leading-relaxed space-y-1.5"
                          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <p className="font-bold text-white mb-2">📋 Payment Instructions</p>
                          <p>1. Copy the wallet address above</p>
                          <p>2. Send <span className="text-yellow-400 font-bold">exactly {order.amount_usdt} USDT</span> on TRC20 network</p>
                          <p>3. Your balance will be credited automatically within 1–5 minutes after confirmation</p>
                          <p>4. Do not close this page — we're monitoring the blockchain in real-time</p>
                        </div>
                      </div>
                    )}

                    {/* Live polling indicator */}
                    <motion.div
                      className="flex items-center justify-center gap-2.5 text-xs text-gray-500 py-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="relative">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <div className="w-2 h-2 bg-yellow-400 rounded-full absolute inset-0 animate-ping opacity-60" />
                      </div>
                      Monitoring blockchain in real-time...
                    </motion.div>
                  </div>
                )}

                {/* ── PAID STATE ── */}
                {paymentStatus === "paid" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-center py-8 space-y-5"
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-green-400 text-4xl relative"
                      style={{ background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.3)" }}
                      animate={{ boxShadow: ["0 0 20px rgba(34,197,94,0.3)", "0 0 50px rgba(34,197,94,0.6)", "0 0 20px rgba(34,197,94,0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaCheckCircle />
                      {/* Ripple rings */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-green-400/30"
                        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-black text-white">Payment Confirmed! 🎉</h3>
                      <p className="text-sm text-gray-400 mt-2">Your balance has been updated successfully.</p>
                      <p className="text-xs text-green-400 font-bold mt-1">+{order.amount_usdt} USDT credited</p>
                    </div>
                    <motion.button
                      onClick={() => navigate("/dashboard")}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 goldButton font-black text-sm rounded-2xl"
                      style={{ boxShadow: "0 0 25px rgba(212,175,55,0.3)" }}
                    >
                      Back to Dashboard
                    </motion.button>
                  </motion.div>
                )}

                {/* ── EXPIRED STATE ── */}
                {paymentStatus === "expired" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 text-3xl mx-auto">
                      <FaExclamationTriangle />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Order Expired</h3>
                      <p className="text-xs text-gray-400 mt-1">The session timed out. Please start a new payment.</p>
                    </div>
                    <motion.button
                      onClick={() => { setOrder(null); setDirectMode(false); setPaymentStatus("pending"); }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-2xl text-sm font-bold text-gray-300 transition"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      Try Again
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>

              {/* Cancel */}
              {paymentStatus === "pending" && (
                <button
                  onClick={() => { setOrder(null); setDirectMode(false); setPaymentStatus("pending"); }}
                  className="w-full py-3 text-sm text-gray-600 hover:text-gray-400 transition text-center"
                >
                  ← Back to amount entry
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
}

export default RechargePage;
