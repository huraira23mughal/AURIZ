import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

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
        if (triggerReload) setTimeout(() => fetchTickets(false), 500);
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [tickets, fetchTickets]);

  const processing = tickets.filter((t) => t.status === "processing");
  const completed = tickets.filter((t) => t.status === "complete");
  const defaultImg = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60";

  const TicketCard = ({ item, isCompleted }) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-4 flex gap-4 items-center transition-all hover:border-white/10"
      style={{ background: "rgba(18,24,40,0.65)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
    >
      <img src={item.image_url || defaultImg} alt={item.title}
        className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-black text-white truncate">{item.title}</h4>
        <p className="text-[9px] text-gray-500 mt-0.5">{item.artist}</p>
        {!isCompleted ? (
          <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-xl"
            style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-[9.5px] font-black font-mono text-yellow-400">Settlement: {item.time_left}s</span>
          </div>
        ) : (
          <span className="text-[9px] text-emerald-400 font-bold block mt-1.5">
            ✓ Settled at {new Date(item.settled_at || item.created_at).toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="text-right flex-shrink-0">
        <span className="text-xs font-black text-white block">${parseFloat(item.price).toFixed(2)}</span>
        <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">
          +{parseFloat(item.profit).toFixed(2)}{isCompleted ? " (Paid)" : ""}
        </span>
      </div>
    </motion.div>
  );

  return (
    <MobileLayout>
      {/* Header */}
      <div className="px-4 pt-12 pb-5 relative"
        style={{ background: "rgba(10,10,20,0.8)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <h1 className="text-2xl font-black text-white">
          Release <span className="bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">Options</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Track active yield settlements and order histories.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-4">
        {[
          { label: "Processing", value: processing.length, color: "#ffd066" },
          { label: "Completed", value: completed.length, color: "#4ade80" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl p-3 text-center"
            style={{ background: "rgba(18,24,40,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-xl font-black" style={{ color: s.color }}>{s.value}</span>
            <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Segment Switcher */}
      <div className="flex mx-4 mt-4 rounded-2xl p-1" style={{ background: "rgba(18,24,40,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {[
          { key: "processing", label: `Processing (${processing.length})` },
          { key: "complete", label: `Complete (${completed.length})` },
        ].map(tab => (
          <button key={tab.key} onClick={() => setSegment(tab.key)}
            className="flex-1 py-3 text-xs font-black rounded-xl transition-all"
            style={{
              background: segment === tab.key ? "linear-gradient(135deg, #FFD978, #D4AF37)" : "transparent",
              color: segment === tab.key ? "#000" : "rgba(255,255,255,0.4)",
              boxShadow: segment === tab.key ? "0 4px 12px rgba(212,175,55,0.2)" : "none",
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 space-y-3 pb-28 mt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-yellow-400 animate-spin" />
            <span className="text-xs text-gray-500 font-bold">Loading release logs...</span>
          </div>
        ) : segment === "processing" ? (
          processing.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-3">⏳</p>
              <p className="text-xs font-black text-white">No active release options</p>
              <p className="text-[10px] text-gray-500 mt-1">Purchase album tickets to start earning.</p>
            </div>
          ) : processing.map(item => <TicketCard key={item.id} item={item} isCompleted={false} />)
        ) : (
          completed.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-3">📋</p>
              <p className="text-xs font-black text-white">No completed logs</p>
              <p className="text-[10px] text-gray-500 mt-1">Completed settlements will appear here.</p>
            </div>
          ) : completed.map(item => <TicketCard key={item.id} item={item} isCompleted={true} />)
        )}
      </div>

      <BottomNav activePage="assets" />
    </MobileLayout>
  );
}
