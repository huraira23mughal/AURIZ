import React, { useState, useEffect, useCallback } from "react";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";
import API from "../api/axios";

export default function AssetsPage() {
  const [segment, setSegment] = useState("processing");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await API.get("tickets/");
      setTickets(res.data || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Countdown timer for processing tickets
  useEffect(() => {
    if (tickets.length === 0) return;

    const hasActive = tickets.some((t) => t.status === "processing" && t.time_left > 0);
    if (!hasActive) return;

    const interval = setInterval(() => {
      setTickets((prev) => {
        let triggerReload = false;
        const updated = prev.map((t) => {
          if (t.status === "processing" && t.time_left > 0) {
            const nextTime = t.time_left - 1;
            if (nextTime <= 0) triggerReload = true;
            return { ...t, time_left: nextTime };
          }
          return t;
        });

        if (triggerReload) {
          // Trigger a background reload to let the backend settle the finished options
          setTimeout(() => fetchTickets(false), 500);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tickets, fetchTickets]);

  const processing = tickets.filter((t) => t.status === "processing");
  const completed = tickets.filter((t) => t.status === "complete");

  const defaultImg = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60";

  return (
    <MobileLayout>
      {/* Header */}
      <div className="px-5 pt-12 pb-5 border-b border-white/5 bg-[#070a12]/80 backdrop-blur-md">
        <h1 className="text-2xl font-black text-white">
          Release <span style={{ color: "#ffd066" }}>Options</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Track active yield settlements and order histories.
        </p>
      </div>

      {/* Segment switcher */}
      <div className="flex m-4 bg-white/[0.02] border border-white/5 rounded-2xl p-1">
        <button
          onClick={() => setSegment("processing")}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition ${segment === "processing" ? "bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black shadow-md" : "bg-transparent text-gray-400"}`}
        >
          Processing ({processing.length})
        </button>
        <button
          onClick={() => setSegment("complete")}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition ${segment === "complete" ? "bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black shadow-md" : "bg-transparent text-gray-400"}`}
        >
          Complete ({completed.length})
        </button>
      </div>

      {/* List items wrapper */}
      <div className="px-4 space-y-3 pb-28">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <svg className="animate-spin h-8 w-8 text-[#ffd066]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-xs text-gray-500 font-bold">Loading release logs...</span>
          </div>
        ) : segment === "processing" ? (
          processing.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-500 font-bold">No active release options running.</div>
          ) : (
            processing.map((item) => (
              <div key={item.id} className="bg-[#151c2c]/40 border border-white/5 rounded-2xl p-4 flex gap-4 items-center">
                <img src={item.image_url || defaultImg} alt={item.title} className="w-[54px] h-[54px] rounded-xl object-cover border border-white/5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-white truncate">{item.title}</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">{item.artist}</p>
                  <div className="inline-block text-[9.5px] font-mono font-black bg-[#ffd066]/10 text-[#ffd978] px-2 py-0.5 rounded mt-2 border border-[#ffd066]/15">
                    Settlement: {item.time_left}s
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-black text-white">${parseFloat(item.price).toFixed(2)}</span>
                  <p className="text-[10px] font-bold text-emerald-400 mt-0.5">+{parseFloat(item.profit).toFixed(2)}</p>
                </div>
              </div>
            ))
          )
        ) : (
          completed.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-500 font-bold">No completed logs found.</div>
          ) : (
            completed.map((item) => (
              <div key={item.id} className="bg-[#151c2c]/40 border border-white/5 rounded-2xl p-4 flex gap-4 items-center">
                <img src={item.image_url || defaultImg} alt={item.title} className="w-[54px] h-[54px] rounded-xl object-cover border border-white/5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-white truncate">{item.title}</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">{item.artist}</p>
                  <span className="text-[9px] text-emerald-400 font-bold block mt-1">
                    Settled at: {new Date(item.settled_at || item.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-black text-white">${parseFloat(item.price).toFixed(2)}</span>
                  <p className="text-[10px] font-bold text-emerald-400 mt-0.5">+{parseFloat(item.profit).toFixed(2)} (Paid)</p>
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
