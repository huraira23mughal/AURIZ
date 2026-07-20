import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";
import API from "../api/axios";

const carouselSlides = [
  {
    id: 1,
    title: "GUARANTEED RECURRING RETURNS",
    desc: "AURIZ secures key marketing partnerships with top-tier musicians, offering users digital release options with steady ticket resale profit.",
    gradient: "from-amber-950/20 to-amber-900/10"
  },
  {
    id: 2,
    title: "VIP DEPOSIT TIERS ACTIVE",
    desc: "Unlock Level 2 and Level 3 tiers today for increased transaction volumes and secondary market yields.",
    gradient: "from-yellow-950/20 to-yellow-900/10"
  },
  {
    id: 3,
    title: "INVITATION COMMISSIONS",
    desc: "Refer direct coordinates to earn multi-level platform rewards: Level 1 (15%), Level 2 (10%), Level 3 (5%).",
    gradient: "from-amber-950/20 to-zinc-900/20"
  }
];

const artists = [
  { name: "BLACKPINK", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60", border: "from-yellow-500 to-amber-600" },
  { name: "ALan", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60", border: "from-yellow-500 to-amber-600" },
  { name: "Aaron Smith", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60", border: "from-yellow-500 to-amber-600" },
  { name: "Anthem Lights", img: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop&q=60", border: "from-yellow-500 to-amber-600" },
  { name: "Alvaro Soler", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60", border: "from-yellow-500 to-amber-600" }
];

const albums = [
  { id: 1, title: "BORN PINK", artist: "BLACKPINK", price: 10.00, profitRate: 0.03, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60", artistImg: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60", desc: "BORN PINK is the second studio album by South Korean girl group BLACKPINK. Releasing multiple records with secure secondary market payouts." },
  { id: 2, title: "FEFE DOBSON", artist: "ALan", price: 13.00, profitRate: 0.03, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=60", artistImg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60", desc: "Fefe Dobson's premium remix launch including acoustic tracks and secondary license rights under regional streaming platforms." },
  { id: 3, title: "AARON SMITH", artist: "Aaron Smith", price: 18.00, profitRate: 0.03, img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=60", artistImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60", desc: "Aaron Smith's indie folk release options. Provides daily royalty distributions directly back to ticket option holders." },
  { id: 4, title: "ANTHEM LIGHTS", artist: "Anthem Lights", price: 30.00, profitRate: 0.035, img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=60", artistImg: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop&q=60", desc: "Premium choral tracks. Lock-in ticket rights to maximize release week streaming numbers and local concert tour allocation." },
  { id: 5, title: "ALVARO SOLER", artist: "Alvaro Soler", price: 50.00, profitRate: 0.04, img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&auto=format&fit=crop&q=60", artistImg: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60", desc: "Latin chart-topper Alvaro Soler's special summer concert release options. Highest standard tier options with premium secondary returns." }
];

export default function DashboardPage() {
  const { profile, reloadProfile } = useAuth();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [qty, setQty] = useState(1);
  const [paymentMode, setPaymentMode] = useState("balance");
  const [toastMsg, setToastMsg] = useState("");
  const [purchasing, setPurchasing] = useState(false);

  const userBalance = parseFloat(profile?.total_assets || 0);
  const userVouchers = profile?.vouchers || 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const openDrawer = (album) => { setSelectedAlbum(album); setQty(1); setPaymentMode("balance"); };
  const closeDrawer = () => setSelectedAlbum(null);
  const triggerToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 2500); };

  const confirmPurchase = async () => {
    if (!selectedAlbum || purchasing) return;
    const total = selectedAlbum.price * qty;
    if (paymentMode === "balance" && userBalance < total) { alert("Insufficient funds in Available Balance."); return; }
    if (paymentMode === "voucher" && userVouchers < (qty * 10)) { alert("Insufficient vouchers."); return; }
    setPurchasing(true);
    try {
      await API.post("tickets/purchase/", { album_id: selectedAlbum.id, title: selectedAlbum.title, artist: selectedAlbum.artist, price: selectedAlbum.price, profitRate: selectedAlbum.profitRate, img: selectedAlbum.img, paymentMode, qty });
      triggerToast("Ticket option successfully purchased!");
      reloadProfile();
      closeDrawer();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to purchase ticket option.");
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <MobileLayout>
      {/* ── Brand Header ── */}
      <header className="flex justify-between items-center px-4 py-4 sticky top-0 z-10 backdrop-blur-2xl"
        style={{ background: "rgba(10,10,20,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          AURIZ
        </h1>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 cursor-pointer"
          style={{ background: "rgba(255,255,255,0.04)" }}>
          <span className="text-sm">🇬🇧</span>
        </div>
      </header>

      {/* ── Marquee ── */}
      <div className="px-4 py-2.5 flex items-center gap-3 overflow-hidden"
        style={{ background: "rgba(212,175,55,0.04)", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
        <span className="text-sm flex-shrink-0">📢</span>
        <div className="relative w-full h-5 overflow-hidden">
          <div className="absolute whitespace-nowrap text-xs font-semibold text-yellow-400/80 animate-[marquee_25s_linear_infinite]">
            Congratulations to rxl*** vip4, completing 500 tasks, earnings $214.50 • v7k*** vip3, earnings $79.20 • owz*** vip4, earnings $175.50
          </div>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div className="w-[92%] mx-auto my-5 rounded-3xl h-[155px] overflow-hidden relative border border-white/8 shadow-xl"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
        <div className="flex w-[300%] h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${carouselIndex * 33.333}%)` }}>
          {carouselSlides.map((slide) => (
            <div key={slide.id} className={`w-1/3 h-full relative bg-gradient-to-br ${slide.gradient} p-5 flex flex-col justify-end`}
              style={{ background: "rgba(18,24,40,0.95)", borderRadius: "inherit" }}>
              {/* Gold shimmer top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
              <h3 className="text-[10px] font-black tracking-wider text-yellow-400 uppercase mb-1.5">{slide.title}</h3>
              <p className="text-[10px] text-gray-400 leading-relaxed max-w-[280px]">{slide.desc}</p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {carouselSlides.map((_, idx) => (
            <button key={idx} onClick={() => setCarouselIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${carouselIndex === idx ? "w-5 bg-yellow-400" : "w-1.5 bg-white/20"}`} />
          ))}
        </div>
      </div>

      {/* ── Secondary Ticker ── */}
      <div className="px-4 py-2 flex items-center gap-3 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <span className="text-xs flex-shrink-0">🔊</span>
        <div className="relative w-full h-[18px] overflow-hidden">
          <div className="absolute whitespace-nowrap text-[11px] font-medium text-gray-500 animate-[marquee_20s_linear_infinite]">
            London time, 22:00-24:00 system settlement. Please bind your withdrawal address to guarantee correct processing...
          </div>
        </div>
      </div>

      {/* ── Artists Row ── */}
      <section className="px-4 py-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-black text-white">Star record man</h3>
          <span className="text-[11px] font-bold text-yellow-400 cursor-pointer hover:text-yellow-300 transition">More ›</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {artists.map((artist, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
              <div className={`w-[62px] h-[62px] rounded-full p-[2px] bg-gradient-to-br ${artist.border}`}
                style={{ boxShadow: "0 4px 12px rgba(212,175,55,0.25)" }}>
                <img src={artist.img} alt={artist.name} className="w-full h-full rounded-full object-cover border-2"
                  style={{ borderColor: "#070a12" }} />
              </div>
              <span className="text-[9px] font-bold text-gray-400 max-w-[64px] truncate">{artist.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Albums Grid ── */}
      <section className="px-4 pb-28">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-black text-white">Hit record</h3>
          <span className="text-[11px] font-bold text-yellow-400 cursor-pointer hover:text-yellow-300 transition">More ›</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {albums.map((album) => (
            <div key={album.id}
              className="rounded-2xl overflow-hidden flex flex-col transition-all hover:border-yellow-400/20"
              style={{ background: "rgba(21,28,44,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
              <div className="relative">
                <img src={album.img} alt={album.title} className="w-full h-[110px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[13px] font-black text-white truncate">{album.title}</h4>
                  <p className="text-[9.5px] text-gray-500 mt-0.5">{album.artist}</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-[13px] font-black text-yellow-400">${album.price.toFixed(2)}</span>
                  <button onClick={() => openDrawer(album)}
                    className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-yellow-300 to-yellow-500 text-black text-[10px] font-black hover:opacity-90 transition cursor-pointer">
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Purchase Drawer ── */}
      <AnimatePresence>
        {selectedAlbum && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }}
              onClick={closeDrawer} className="absolute inset-0 bg-black z-40 backdrop-blur-sm" />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 rounded-t-[28px] p-6 pb-10 z-50 text-white"
              style={{ background: "rgba(10,12,22,0.98)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(32px)" }}
            >
              {/* Top shimmer */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

              <div className="flex items-center justify-between mb-5">
                <button onClick={closeDrawer} className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>←</button>
                <h4 className="text-sm font-black text-white">{selectedAlbum.title} Detail</h4>
                <div className="w-9" />
              </div>

              <div className="flex gap-4 mb-5">
                <img src={selectedAlbum.img} alt={selectedAlbum.title}
                  className="w-[88px] h-[88px] rounded-2xl object-cover flex-shrink-0"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                <div className="flex-1">
                  <p className="text-[10.5px] text-gray-400 leading-relaxed mb-3">{selectedAlbum.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">Record man:</span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <img src={selectedAlbum.artistImg} alt={selectedAlbum.artist} className="w-3.5 h-3.5 rounded-full object-cover" />
                      <span className="text-[9px] font-bold text-gray-300">{selectedAlbum.artist}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {/* Qty stepper */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-300">Purchase quantity</span>
                  <div className="flex items-center rounded-xl overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 text-lg font-bold hover:bg-white/5 transition text-gray-300">-</button>
                    <input type="number" readOnly value={qty} className="w-10 text-center text-xs font-black bg-transparent border-none outline-none text-white" />
                    <button onClick={() => setQty(qty + 1)} className="w-9 h-9 text-lg font-bold hover:bg-white/5 transition text-gray-300">+</button>
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-2xl p-3 space-y-2" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Transaction amount</span>
                    <span className="font-black text-yellow-400">${(selectedAlbum.price * qty).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Estimated profit</span>
                    <span className="font-black text-green-400">${(selectedAlbum.price * qty * selectedAlbum.profitRate).toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-2">
                  {[
                    { mode: "balance", label: "Pay with balance", sub: `Available: $${userBalance.toFixed(2)}` },
                    { mode: "voucher", label: "Voucher payment", sub: `Current vouchers: ${userVouchers}` },
                  ].map(opt => (
                    <label key={opt.mode}
                      className="flex gap-3 p-3 items-center cursor-pointer rounded-2xl transition-all"
                      style={{
                        background: paymentMode === opt.mode ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.01)",
                        border: `1px solid ${paymentMode === opt.mode ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`,
                      }}>
                      <input type="radio" name="payment" checked={paymentMode === opt.mode}
                        onChange={() => setPaymentMode(opt.mode)} className="w-4 h-4 accent-yellow-400" />
                      <div>
                        <span className="text-[12px] font-bold text-white block">{opt.label}</span>
                        <span className="text-[9px] text-gray-500">{opt.sub}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <button onClick={confirmPurchase} disabled={purchasing}
                  className="w-full py-4 rounded-2xl font-black text-xs text-black transition disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)", boxShadow: "0 0 20px rgba(212,175,55,0.25)" }}>
                  {purchasing ? "Purchasing..." : "Confirm Purchase"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div initial={{ opacity: 0, y: 50, x: "-50%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-black text-[11px] font-bold px-5 py-2.5 rounded-full shadow-lg z-50"
            style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}>
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activePage="dashboard" />
      <style>{`@keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }`}</style>
    </MobileLayout>
  );
}
