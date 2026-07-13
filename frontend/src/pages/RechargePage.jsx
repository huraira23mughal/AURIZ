import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft, FaCoins, FaQrcode, FaCheckCircle,
  FaExclamationTriangle, FaCopy, FaHourglassHalf, FaExternalLinkAlt
} from "react-icons/fa";
import API from "../api/axios";
import MobileLayout from "../components/common/MobileLayout";

const presetAmounts = [20, 50, 100, 300, 500, 1000];

function RechargePage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, paid, expired
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress || "TRC20: TYDzsYUEpvnYmQk4zGP9sWWcTEd2MiAtW6");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) < 10) {
      setError("Minimum recharge is 10 USDT");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await API.post("payment/binance/create/", {
        amount: parseFloat(amount),
      });
      setOrder(res.data.order);
      setDemoMode(res.data.demo_mode);
      if (res.data.demo_mode) {
        setWalletAddress(res.data.wallet_address);
      }
      setPaymentStatus("pending");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create payment order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Poll status if order is pending
  useEffect(() => {
    if (!order || paymentStatus === "paid") return;

    const interval = setInterval(async () => {
      try {
        const res = await API.get(`payment/binance/status/${order.prepay_id}/`);
        const status = res.data.order.status;
        if (status === "paid") {
          setPaymentStatus("paid");
          clearInterval(interval);
        } else if (status === "expired" || status === "failed") {
          setPaymentStatus("expired");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error polling order status:", err);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [order, paymentStatus]);

  const handleDemoConfirm = async () => {
    if (!order) return;
    setChecking(true);
    try {
      const res = await API.post(`payment/binance/demo-confirm/${order.prepay_id}/`);
      if (res.data.order.status === "paid") {
        setPaymentStatus("paid");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  return (
    <MobileLayout activeTab="Profile">
      <div className="min-h-screen pb-24 text-white">
        {/* Header */}
        <div className="flex items-center gap-4 py-4 px-2 border-b border-white/5 mb-6">
          <Link to="/profile" className="text-gray-400 hover:text-white transition">
            <FaArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-black">Recharge Account</h1>
            <p className="text-xs text-gray-400">Add funds instantly using USDT</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!order ? (
            /* Recharge Amount Entry */
            <motion.div
              key="entry"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="px-4"
            >
              <form onSubmit={handleCreateOrder} className="space-y-6">
                <div className="glass rounded-[30px] p-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Select Currency</span>
                    <span className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <FaCoins size={10} /> USDT (TRC20 / BEP20)
                    </span>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
                      {error}
                    </div>
                  )}

                  {/* Input */}
                  <div className="relative mb-6">
                    <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-gray-400 font-bold text-lg">
                      $
                    </span>
                    <input
                      type="number"
                      required
                      min="10"
                      step="any"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-16 py-4 text-2xl font-black text-white focus:outline-none focus:border-yellow-400/50 transition-colors"
                    />
                    <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 font-bold text-sm">
                      USDT
                    </span>
                  </div>

                  {/* Presets */}
                  <div className="grid grid-cols-3 gap-3">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(amt.toString())}
                        className={`py-3 rounded-xl text-sm font-bold border transition ${
                          amount === amt.toString()
                            ? "bg-yellow-400/15 border-yellow-400 text-yellow-400"
                            : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                        }`}
                      >
                        +{amt}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="goldButton w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2 text-base shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  {loading ? "Initializing payment..." : "Recharge Now"}
                </motion.button>

                {/* Secure Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 text-center">
                  <FaQrcode /> Powered by Binance Pay & Secure Blockchains
                </div>
              </form>
            </motion.div>
          ) : (
            /* Payment Screen */
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="px-4"
            >
              <div className="glass rounded-[30px] p-6 space-y-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                {/* Total */}
                <div className="text-center py-4">
                  <p className="text-sm text-gray-400">Total Due Amount</p>
                  <h2 className="text-4xl font-black gold-text mt-1">{order.amount_usdt} USDT</h2>
                  <p className="text-xs text-gray-500 mt-2">Order ID: {order.merchant_trade_no}</p>
                </div>

                <div className="h-px bg-white/5" />

                {/* Payment States */}
                {paymentStatus === "pending" && (
                  <div className="space-y-6">
                    {/* Binance Pay Mode */}
                    {!demoMode ? (
                      <div className="flex flex-col items-center space-y-4">
                        <div className="bg-white p-3 rounded-2xl">
                          {/* If qrcodeLink exists, we show QR. In sandbox, it might be deepLink or redirect url. */}
                          <img
                            src={order.qr_code_url || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(order.checkout_url)}`}
                            alt="Payment QR Code"
                            className="w-44 h-44"
                          />
                        </div>
                        <p className="text-xs text-gray-400 text-center px-4 leading-5">
                          Scan the QR code with your Binance App to pay instantly.
                        </p>
                        {order.checkout_url && (
                          <a
                            href={order.checkout_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 bg-yellow-400 text-black font-bold rounded-2xl flex items-center justify-center gap-2 text-sm"
                          >
                            Pay on Binance Web <FaExternalLinkAlt size={12} />
                          </a>
                        )}
                      </div>
                    ) : (
                      /* Demo/Manual Mode */
                      <div className="space-y-4">
                        <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-4 flex gap-3 text-yellow-400">
                          <FaExclamationTriangle size={24} className="flex-shrink-0 mt-0.5" />
                          <div className="text-xs leading-5">
                            <span className="font-bold">Sandbox/Demo Mode:</span> Binance Pay API Keys not configured in .env. Confirming payments manually for testing.
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block">
                            Direct Deposit Address (USDT TRC20)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              readOnly
                              value={walletAddress || "TYDzsYUEpvnYmQk4zGP9sWWcTEd2MiAtW6"}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-gray-300 focus:outline-none"
                            />
                            <button
                              onClick={handleCopy}
                              className="px-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl flex items-center justify-center transition"
                            >
                              <FaCopy className={copied ? "text-green-400" : "text-gray-400"} />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={handleDemoConfirm}
                          disabled={checking}
                          className="w-full py-3.5 bg-green-500 text-black font-bold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                        >
                          {checking ? "Checking Block..." : "Confirm Deposit (Manual Demo)"}
                        </button>
                      </div>
                    )}

                    {/* Waiting Loader */}
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400 py-2">
                      <FaHourglassHalf className="animate-spin text-yellow-400" />
                      <span>Waiting for payment detection...</span>
                    </div>
                  </div>
                )}

                {paymentStatus === "paid" && (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 text-3xl mx-auto shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                      <FaCheckCircle />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Payment Received!</h3>
                      <p className="text-xs text-gray-400 mt-1">Your balance has been updated successfully.</p>
                    </div>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="w-full py-3.5 goldButton font-bold text-sm rounded-2xl"
                    >
                      Back to Dashboard
                    </button>
                  </motion.div>
                )}

                {paymentStatus === "expired" && (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 text-3xl mx-auto">
                      <FaExclamationTriangle />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Order Expired</h3>
                      <p className="text-xs text-gray-400 mt-1">The checkout session has timed out or failed.</p>
                    </div>
                    <button
                      onClick={() => setOrder(null)}
                      className="w-full py-3.5 bg-white/5 border border-white/10 font-bold text-sm rounded-2xl"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
}

export default RechargePage;
