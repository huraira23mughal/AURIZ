import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";
import API from "../api/axios";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({ vouchers: 0, completed: 0, will_complete: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [toast, setToast] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);
  const [audioPercent, setAudioPercent] = useState(0);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2800); };

  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get("tasks/");
      setTasks(res.data.tasks || []);
      setSummary(res.data.summary || { vouchers: 0, completed: 0, will_complete: 0 });
    } catch (err) {
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleStart = async (taskId) => {
    setActionLoading((p) => ({ ...p, [taskId]: "starting" }));
    try {
      await API.post(`tasks/${taskId}/start/`);
      await fetchTasks();
      showToast("Task started! Keep going 🚀");
    } catch (err) {
      showToast(err.response?.data?.error || "Could not start task.");
    } finally {
      setActionLoading((p) => ({ ...p, [taskId]: null }));
    }
  };

  const handleClaim = async (taskId) => {
    setActionLoading((p) => ({ ...p, [taskId]: "claiming" }));
    try {
      const res = await API.post(`tasks/${taskId}/claim/`);
      await fetchTasks();
      showToast(`🎉 Reward claimed! +${res.data.reward_points} Vouchers`);
    } catch (err) {
      showToast(err.response?.data?.error || "Could not claim reward.");
    } finally {
      setActionLoading((p) => ({ ...p, [taskId]: null }));
    }
  };

  const playPromo = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    setAudioSeconds(0);
    setAudioPercent(0);
    const interval = setInterval(() => {
      setAudioSeconds((prev) => {
        const next = prev + 1;
        setAudioPercent((next / 15) * 100);
        if (next >= 15) { clearInterval(interval); setIsPlayingAudio(false); }
        return next;
      });
    }, 1000);
  };

  const handleInvite = () => {
    navigator.clipboard.writeText(`${window.location.origin}/register?code=AURIZ`)
      .then(() => showToast("✅ Invite link copied to clipboard!"));
  };

  const statusColor = (s) => {
    if (s === "claimed") return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (s === "completed") return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    if (s === "inProgress") return "text-sky-400 bg-sky-400/10 border-sky-400/20";
    return "text-gray-400 bg-white/5 border-white/10";
  };

  const taskTypeLabel = (type) => ({ watch_ad: "Activity", deposit: "Deposit", referral: "Ref", daily: "Daily" }[type] || "Task");
  const taskTypeColor = (type) => ({
    watch_ad: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    deposit: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    referral: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    daily: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  }[type] || "text-gray-400 bg-white/5 border-white/10");

  return (
    <MobileLayout>
      {/* ── Header ── */}
      <div className="px-4 pt-12 pb-5 relative"
        style={{ background: "rgba(10,10,20,0.8)", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <h1 className="text-2xl font-black text-white">
          Earning <span className="bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">Tasks</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Complete daily tasks to accumulate voucher points.</p>
      </div>

      <div className="px-4 py-4 space-y-4 pb-28">

        {/* ── Voucher Summary Card ── */}
        <div className="rounded-3xl p-5 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #b8860b, #d4af37, #ffd978, #d4af37)", boxShadow: "0 8px 32px rgba(212,175,55,0.25)" }}>
          {/* Frosted overlay */}
          <div className="absolute inset-0 rounded-3xl" style={{ background: "rgba(0,0,0,0.15)" }} />
          <div className="relative z-10">
            <span className="text-[10px] text-black/70 block uppercase tracking-wider font-bold">My Vouchers</span>
            <h2 className="text-3xl font-black text-black mt-1 mb-3">{summary.vouchers}</h2>
            <div className="flex gap-5">
              {[
                { label: "Completed", value: summary.completed },
                { label: "In Progress", value: summary.will_complete },
                { label: "Total", value: tasks.length },
              ].map((s, i) => (
                <div key={i} className="flex-1">
                  <span className="text-[9px] text-black/60 block">{s.label}</span>
                  <span className="text-sm font-black text-black">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-yellow-400 animate-spin" />
            <span className="text-xs text-gray-500">Loading tasks...</span>
          </div>
        )}

        {/* ── API Tasks ── */}
        {!loading && tasks.length > 0 && (
          <div className="space-y-3">
            {tasks.map((ut) => {
              const task = ut.task;
              const isLoading = !!actionLoading[task.id];
              const isClaimed = ut.status === "claimed";
              const isCompleted = ut.status === "completed";
              const isInProgress = ut.status === "inProgress";

              return (
                <motion.div key={ut.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl p-4 flex justify-between items-center gap-3 transition-all hover:border-white/10"
                  style={{ background: "rgba(18,24,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase border ${taskTypeColor(task.task_type)}`}>
                        {taskTypeLabel(task.task_type)}
                      </span>
                      {isClaimed && (
                        <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                          ✓ Done
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-black text-white">{task.title}</h4>
                    {task.description && <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{task.description}</p>}

                    {(isInProgress || isCompleted) && task.total_steps > 1 && (
                      <div className="mt-2">
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                          <div className="h-full rounded-full transition-all duration-300"
                            style={{ width: `${ut.progress_pct}%`, background: "linear-gradient(90deg, #FFD978, #D4AF37)" }} />
                        </div>
                        <span className="text-[8px] text-gray-600 mt-0.5 block">{ut.progress}/{task.total_steps} steps</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-1.5">
                      {task.reward_points > 0 && <span className="text-[10px] font-bold text-yellow-400">+{task.reward_points} Vouchers</span>}
                      {task.reward_amount > 0 && <span className="text-[10px] font-bold text-emerald-400">+${parseFloat(task.reward_amount).toFixed(2)}</span>}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isClaimed ? (
                      <span className="px-3.5 py-1.5 text-[10px] font-black rounded-xl text-emerald-400"
                        style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
                        Claimed
                      </span>
                    ) : isCompleted ? (
                      <button onClick={() => handleClaim(task.id)} disabled={isLoading}
                        className="px-3.5 py-1.5 text-[10px] font-black rounded-xl text-black hover:opacity-90 transition disabled:opacity-60"
                        style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}>
                        {isLoading ? "..." : "Claim"}
                      </button>
                    ) : (
                      <button onClick={() => handleStart(task.id)} disabled={isLoading}
                        className={`px-3.5 py-1.5 text-[10px] font-black rounded-xl transition disabled:opacity-60 ${isInProgress
                          ? "text-sky-400 border border-sky-500/20 hover:bg-sky-500/10"
                          : "text-black hover:opacity-90"}`}
                        style={!isInProgress ? { background: "linear-gradient(135deg, #FFD978, #D4AF37)" } : { background: "rgba(56,189,248,0.08)" }}>
                        {isLoading ? "..." : isInProgress ? "Continue" : "Start"}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── Static Tasks (Audio, Invite) ── */}
        {!loading && (
          <div className="space-y-3">
            {/* Audio Task */}
            <div className="rounded-2xl p-4 flex justify-between items-center gap-3"
              style={{ background: "rgba(18,24,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
              <div className="flex-1">
                <span className="inline-block text-[9px] font-bold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2 py-0.5 rounded-lg uppercase mb-1.5">Activity</span>
                <h4 className="text-xs font-black text-white">Watch & Listen Release Promo</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Play 15s audio clip of upcoming album releases.</p>
                <div className="flex items-center gap-2 mt-2.5 rounded-xl p-2 max-w-[200px]"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <button type="button" onClick={playPromo}
                    className={`text-[9px] font-bold px-2 py-1 rounded-lg text-black ${isPlayingAudio ? "opacity-50" : ""}`}
                    style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}>
                    {isPlayingAudio ? "Playing" : "▶ Play"}
                  </button>
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full bg-yellow-400 transition-all duration-100" style={{ width: `${audioPercent}%` }} />
                  </div>
                  <span className="text-[8px] font-mono text-gray-500">0:{audioSeconds < 10 ? "0" + audioSeconds : audioSeconds}/0:15</span>
                </div>
                <div className="text-[10px] font-bold text-yellow-400 mt-1.5">+10 Vouchers</div>
              </div>
              <button onClick={() => audioSeconds >= 15 && showToast("🎵 Audio listening voucher applied!")}
                disabled={audioSeconds < 15}
                className={`px-3.5 py-1.5 text-[10px] font-black rounded-xl transition flex-shrink-0 ${audioSeconds >= 15 ? "text-black cursor-pointer hover:opacity-90" : "text-gray-600 cursor-not-allowed"}`}
                style={{ background: audioSeconds >= 15 ? "linear-gradient(135deg, #FFD978, #D4AF37)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                Claim
              </button>
            </div>

            {/* Invite Task */}
            <div className="rounded-2xl p-4 flex justify-between items-center gap-3"
              style={{ background: "rgba(18,24,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
              <div className="flex-1">
                <span className="inline-block text-[9px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-lg uppercase mb-1.5">Ref</span>
                <h4 className="text-xs font-black text-white">Invite 1 subordinate to join</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Grow your investment team network.</p>
                <div className="text-[10px] font-bold text-yellow-400 mt-1.5">+25 Vouchers</div>
              </div>
              <button onClick={handleInvite}
                className="px-3.5 py-1.5 text-[10px] font-black rounded-xl text-black cursor-pointer hover:opacity-90 transition flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}>
                Invite
              </button>
            </div>
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm font-black text-white">No tasks available</p>
            <p className="text-xs text-gray-500 mt-1">Check back soon for new earning opportunities.</p>
          </div>
        )}
      </div>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 60, x: "-50%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 text-black text-[11px] font-bold px-5 py-2.5 rounded-full shadow-lg z-50"
            style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activePage="tasks" />
    </MobileLayout>
  );
}
