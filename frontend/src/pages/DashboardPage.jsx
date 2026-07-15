import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";

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
  {
    id: 1,
    title: "BORN PINK",
    artist: "BLACKPINK",
    price: 10.00,
    profitRate: 0.03,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60",
    artistImg: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60",
    desc: "BORN PINK is the second studio album by South Korean girl group BLACKPINK. Releasing multiple records with secure secondary market payouts."
  },
  {
    id: 2,
    title: "FEFE DOBSON",
    artist: "ALan",
    price: 13.00,
    profitRate: 0.03,
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=60",
    artistImg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60",
    desc: "Fefe Dobson's premium remix launch including acoustic tracks and secondary license rights under regional streaming platforms."
  },
  {
    id: 3,
    title: "AARON SMITH",
    artist: "Aaron Smith",
    price: 18.00,
    profitRate: 0.03,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=60",
    artistImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    desc: "Aaron Smith's indie folk release options. Provides daily royalty distributions directly back to ticket option holders."
  },
  {
    id: 4,
    title: "ANTHEM LIGHTS",
    artist: "Anthem Lights",
    price: 30.00,
    profitRate: 0.035,
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=60",
    artistImg: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop&q=60",
    desc: "Premium choral tracks. Lock-in ticket rights to maximize release week streaming numbers and local concert tour allocation."
  },
  {
    id: 5,
    title: "ALVARO SOLER",
    artist: "Alvaro Soler",
    price: 50.00,
    profitRate: 0.04,
    img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&auto=format&fit=crop&q=60",
    artistImg: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60",
    desc: "Latin chart-topper Alvaro Soler's special summer concert release options. Highest standard tier options with premium secondary returns."
  }
];

export default function DashboardPage() {
  const { profile, reloadProfile } = useAuth();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [qty, setQty] = useState(1);
  const [paymentMode, setPaymentMode] = useState("balance");
  const [toastMsg, setToastMsg] = useState("");

  const userBalance = profile?.available_balance || 124.83;
  const userVouchers = profile?.vouchers || 245;

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const openDrawer = (album) => {
    setSelectedAlbum(album);
    setQty(1);
    setPaymentMode("balance");
  };

  const closeDrawer = () => {
    setSelectedAlbum(null);
  };

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const confirmPurchase = () => {
    if (!selectedAlbum) return;
    const total = selectedAlbum.price * qty;
    
    if (paymentMode === "balance" && userBalance < total) {
      alert("Insufficient funds in Available Balance.");
      return;
    }
    
    if (paymentMode === "voucher" && userVouchers < (qty * 10)) {
      alert("Insufficient vouchers.");
      return;
    }

    triggerToast("Ticket option successfully purchased!");
    closeDrawer();
  };

  return (
    <MobileLayout>
      {/* ── Brand Header ── */}
      <header className="flex justify-between items-center px-6 py-5 border-b border-white/5 bg-[#070a12]/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-white to-[#ffd066] bg-clip-text text-transparent">
          AURIZ
        </h1>
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 cursor-pointer">
          <span className="text-sm">🇬🇧</span>
        </div>
      </header>

      {/* Marquee Congratulations */}
      <div className="bg-[#ffd066]/5 border-b border-[#ffd066]/10 px-5 py-3 flex items-center gap-3 overflow-hidden">
        <span className="text-sm">📢</span>
        <div className="relative w-full h-5 overflow-hidden">
          <div className="absolute whitespace-nowrap text-xs font-semibold text-[#ffd978] animate-[marquee_25s_linear_infinite]">
            Congratulations to rxl*** vip4, completing 500 tasks, earnings $214.50 • Congratulations to v7k*** vip3, completing 200 tasks, earnings $79.20 • Congratulations to owz*** vip4, completing 500 tasks, earnings $175.50
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-[92%] mx-auto my-6 rounded-3xl h-[160px] overflow-hidden relative border border-[#ffd066]/10 shadow-xl">
        <div 
          className="flex w-[300%] h-100 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${carouselIndex * 33.333}%)` }}
        >
          {carouselSlides.map((slide) => (
            <div key={slide.id} className={`w-1/3 h-full relative bg-gradient-to-br ${slide.gradient} p-6 flex flex-col justify-end`}>
              <h3 className="text-xs font-black tracking-wider text-[#ffd066] uppercase mb-1">{slide.title}</h3>
              <p className="text-[10px] text-white/80 leading-relaxed max-w-[280px]">{slide.desc}</p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {carouselSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCarouselIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${carouselIndex === idx ? "w-4 bg-[#d4af37]" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* Secondary Ticker */}
      <div className="bg-white/[0.01] border-y border-white/5 px-5 py-2.5 flex items-center gap-3 overflow-hidden">
        <span className="text-xs">🔊</span>
        <div className="relative w-full h-[18px] overflow-hidden">
          <div className="absolute whitespace-nowrap text-[11px] font-medium text-gray-400 animate-[marquee_20s_linear_infinite]">
            London time, 22:00-24:00 London time system settlement. Please bind your withdrawal address to guarantee correct processing...
          </div>
        </div>
      </div>

      {/* Star Record Man */}
      <section className="px-5 py-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-black text-white">Star record man</h3>
          <span className="text-[11px] font-bold text-[#ffd066] cursor-pointer">More ›</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {artists.map((artist, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
              <div className={`w-[64px] h-[64px] rounded-full p-[2px] bg-gradient-to-br ${artist.border}`}>
                <img src={artist.img} alt={artist.name} className="w-full h-full rounded-full object-cover border-2 border-[#070a12]" />
              </div>
              <span className="text-[9px] font-bold text-gray-400 max-w-[64px] truncate">{artist.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hit Records */}
      <section className="px-5 pb-28">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-black text-white">Hit record</h3>
          <span className="text-[11px] font-bold text-[#ffd066] cursor-pointer">More ›</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {albums.map((album) => (
            <div key={album.id} className="bg-[#151c2c]/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col transition hover:border-[#ffd066]/20">
              <img src={album.img} alt={album.title} className="w-full h-[110px] object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[13px] font-black text-white truncate">{album.title}</h4>
                  <p className="text-[9.5px] text-gray-400 mt-1">{album.artist}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[13.5px] font-black text-[#ffd066]">${album.price.toFixed(2)}</span>
                  <button 
                    onClick={() => openDrawer(album)}
                    className="px-3.5 py-2 rounded-full bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-[10px] font-black cursor-pointer hover:opacity-90 transition"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sliding Bottom Sheet Drawer */}
      <AnimatePresence>
        {selectedAlbum && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="absolute inset-0 bg-black/80 z-40 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 bg-[#0e1424] border-t border-[#ffd066]/15 rounded-t-[28px] p-6 pb-10 z-50 text-white flex flex-col"
            >
              <div className="flex items-center justify-between mb-5 relative">
                <button onClick={closeDrawer} className="text-xl font-bold">←</button>
                <h4 className="w-full text-center text-sm font-black">{selectedAlbum.title} Detail</h4>
              </div>

              <div className="flex gap-4 mb-5">
                <img src={selectedAlbum.img} alt={selectedAlbum.title} className="w-[90px] h-[90px] rounded-xl object-cover border border-white/5" />
                <div className="flex-1">
                  <p className="text-[10.5px] text-gray-400 leading-relaxed mb-3">{selectedAlbum.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">Record man:</span>
                    <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      <img src={selectedAlbum.artistImg} alt={selectedAlbum.artist} className="w-3.5 h-3.5 rounded-full object-cover" />
                      <span className="text-[9px] font-bold">{selectedAlbum.artist}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-4">
                {/* Stepper */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">Purchase quantity</span>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg text-lg font-bold hover:bg-white/5">-</button>
                    <input type="number" readOnly value={qty} className="w-10 text-center text-xs font-bold bg-transparent border-none outline-none" />
                    <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-lg text-lg font-bold hover:bg-white/5">+</button>
                  </div>
                </div>

                {/* Calculations */}
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Amount of the transaction</span>
                  <span className="text-sm font-black text-[#ffd066]">${(selectedAlbum.price * qty).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Estimated profit</span>
                  <span className="text-sm font-black text-emerald-400">${(selectedAlbum.price * qty * selectedAlbum.profitRate).toFixed(2)}</span>
                </div>

                {/* Payments */}
                <div className="flex flex-col gap-2.5 my-3">
                  <label className="flex gap-3 bg-white/[0.01] border border-white/5 rounded-2xl p-3 items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMode === "balance"} 
                      onChange={() => setPaymentMode("balance")} 
                      className="w-4 h-4 accent-[#d4af37]"
                    />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold">Pay with balance</span>
                      <span className="text-[9px] text-gray-400">Available: ${userBalance.toFixed(2)} • Tickets: 1</span>
                    </div>
                  </label>
                  <label className="flex gap-3 bg-white/[0.01] border border-white/5 rounded-2xl p-3 items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMode === "voucher"} 
                      onChange={() => setPaymentMode("voucher")}
                      className="w-4 h-4 accent-[#d4af37]"
                    />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold">Voucher payment</span>
                      <span className="text-[9px] text-gray-400">Current listening count: {userVouchers} Vouchers</span>
                    </div>
                  </label>
                </div>

                <button 
                  onClick={confirmPurchase}
                  className="w-full py-4 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black font-black text-xs rounded-xl shadow-lg transition"
                >
                  Confirm purchase
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-[11px] font-bold px-5 py-2.5 rounded-full shadow-lg z-50"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activePage="dashboard" />
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </MobileLayout>
  );
}
