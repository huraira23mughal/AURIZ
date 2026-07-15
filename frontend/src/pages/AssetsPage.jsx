import React, { useState, useEffect } from "react";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";

const initialProcessing = [
  {
    id: 101,
    albumTitle: "BORN PINK",
    artist: "BLACKPINK",
    price: 20.00,
    profit: 0.60,
    timeLeft: 45,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60"
  }
];

const initialComplete = [
  {
    id: 99,
    albumTitle: "AARON SMITH",
    artist: "Aaron Smith",
    price: 18.00,
    profit: 0.54,
    date: "Today, 14:22",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=60"
  }
];

export default function AssetsPage() {
  const [segment, setSegment] = useState("processing");
  const [processing, setProcessing] = useState(initialProcessing);
  const [completed, setCompleted] = useState(initialComplete);

  useEffect(() => {
    const timer = setInterval(() => {
      setProcessing(prevList => {
        const nextList = prevList.map(item => {
          if (item.timeLeft > 0) {
            return { ...item, timeLeft: item.timeLeft - 1 };
          }
          return item;
        });

        const expired = nextList.filter(item => item.timeLeft <= 0);
        if (expired.length > 0) {
          setCompleted(prevComp => [
            ...expired.map(item => ({
              id: item.id,
              albumTitle: item.albumTitle,
              artist: item.artist,
              price: item.price,
              profit: item.profit,
              date: "Just now",
              img: item.img
            })),
            ...prevComp
          ]);
        }

        return nextList.filter(item => item.timeLeft > 0);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <MobileLayout>
      {/* Segment switcher */}
      <div className="flex m-4 bg-white/[0.02] border border-white/5 rounded-2xl p-1">
        <button
          onClick={() => setSegment("processing")}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition ${segment === "processing" ? "bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black shadow-md" : "bg-transparent text-gray-400"}`}
        >
          Processing
        </button>
        <button
          onClick={() => setSegment("complete")}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition ${segment === "complete" ? "bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black shadow-md" : "bg-transparent text-gray-400"}`}
        >
          Complete
        </button>
      </div>

      {/* List items wrapper */}
      <div className="px-4 space-y-3 pb-24">
        
        {segment === "processing" ? (
          processing.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-500 font-bold">No active release options running.</div>
          ) : (
            processing.map(item => (
              <div key={item.id} className="bg-[#151c2c]/40 border border-white/5 rounded-2xl p-4.5 flex gap-4 items-center">
                <img src={item.img} alt={item.albumTitle} className="w-[54px] h-[54px] rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-white truncate">{item.albumTitle}</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">{item.artist}</p>
                  <div className="inline-block text-[9.5px] font-mono font-black bg-[#ffd066]/10 text-[#ffd978] px-2 py-0.5 rounded mt-2 border border-[#ffd066]/15">
                    Settlement: {item.timeLeft}s
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-white">${item.price.toFixed(2)}</span>
                  <p className="text-[10px] font-bold text-emerald-400 mt-0.5">+{item.profit.toFixed(2)}</p>
                </div>
              </div>
            ))
          )
        ) : (
          completed.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-500 font-bold">No completed logs found.</div>
          ) : (
            completed.map(item => (
              <div key={item.id} className="bg-[#151c2c]/40 border border-white/5 rounded-2xl p-4.5 flex gap-4 items-center">
                <img src={item.img} alt={item.albumTitle} className="w-[54px] h-[54px] rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-white truncate">{item.albumTitle}</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">{item.artist}</p>
                  <span className="text-[9px] text-emerald-400 font-bold block mt-1">{item.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-white">${item.price.toFixed(2)}</span>
                  <p className="text-[10px] font-bold text-emerald-400 mt-0.5">+{item.profit.toFixed(2)} (Paid)</p>
                </div>
              </div>
            ))
          )
        )}

      </div>

      <BottomNav activePage="assets" />
    </MobileLayout>
  );
}
