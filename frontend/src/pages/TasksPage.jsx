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

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

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

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
        if (next >= 15) {
          clearInterval(interval);
          setIsPlayingAudio(false);
        }
        return next;
      });
    }, 1000);
  };

  const handleInvite = () => {
    const inviteLink = `${window.location.origin}/register?code=AURIZ`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      showToast("✅ Invite link copied to clipboard!");
    });
  };

  const statusColor = (s) => {
    if (s === "claimed") return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (s === "completed") return "text-[#ffd066] bg-[#ffd066]/10 border-[#ffd066]/20";
    if (s === "inProgress") return "text-sky-400 bg-sky-400/10 border-sky-400/20";
    return "text-gray-400 bg-white/5 border-white/10";
  };

  const taskTypeLabel = (type) => {
    const labels = { watch_ad: "Activity", deposit: "Deposit", referral: "Ref", daily: "Daily" };
    return labels[type] || "Task";
  };

  const taskTypeColor = (type) => {
    const colors = {
      watch_ad: "text-sky-400 bg-sky-400/10 border-sky-400/20",
      deposit: "text-purple-400 bg-purple-400/10 border-purple-400/20",
      referral: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      daily: "text-[#ffd066] bg-[#ffd066]/10 border-[#ffd066]/20",
    };
    return colors[type] || "text-gray-400 bg-white/5 border-white/10";
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div
        className="px-4 pt-12 pb-5"
        style={{
          background: "linear-gradient(180deg, rgba(212, 175, 55, 0.04) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
        }}
      >
        <h1 className="text-2xl font-black text-white">
          Earning <span style={{ color: "#ffd066" }}>Tasks</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Complete daily tasks to accumulate voucher points.
        </p>
      </div>

      <div className="px-4 py-4 space-y-4 pb-28">

        {/* Voucher summary card */}
        <div className="bg-gradient-to-br from-[#ffd978] to-[#b8860b] rounded-3xl p-5 shadow-lg text-black">
          <span className="text-[10px] text-black/70 block uppercase tracking-wider font-bold">My Vouchers</span>
          <h2 className="text-3xl font-black text-black mt-1 mb-3">{summary.vouchers}</h2>
          <div className="flex gap-4">
            <div>
              <span className="text-[9px] text-black/60 block">Completed</span>
              <span className="text-sm font-black">{summary.completed}</span>
            </div>
            <div className="w-px bg-black/10" />
            <div>
              <span className="text-[9px] text-black/60 block">In Progress</span>
              <span className="text-sm font-black">{summary.will_complete}</span>
            </div>
            <div className="w-px bg-black/10" />
            <div>
              <span className="text-[9px] text-black/60 block">Total</span>
              <span className="text-sm font-black">{tasks.length}</span>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <svg className="animate-spin h-8 w-8 text-[#ffd066]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-xs text-gray-500">Loading tasks...</span>
          </div>
        )}

        {/* Tasks from API */}
        {!loading && tasks.length > 0 && (
          <div className="space-y-4">
            {tasks.map((ut) => {
              const task = ut.task;
              const isLoading = !!actionLoading[task.id];
              const isClaimed = ut.status === "claimed";
              const isCompleted = ut.status === "completed";
              const isInProgress = ut.status === "inProgress";
              const isUnstarted = ut.status === "unstarted";

              return (
                <motion.div
                  key={ut.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#151c2c]/40 border border-white/5 rounded-2xl p-3.5 flex justify-between items-center gap-3 hover:border-white/10 transition"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${taskTypeColor(task.task_type)}`}>
                        {taskTypeLabel(task.task_type)}
                      </span>
                      {isClaimed && (
                        <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded uppercase border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                          ✓ Done
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-black text-white">{task.title}</h4>
                    {task.description && (
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{task.description}</p>
                    )}

                    {/* Progress bar */}
                    {(isInProgress || isCompleted) && task.total_steps > 1 && (
                      <div className="mt-2">
                        <div className="h-1 bg-white/10 rounded overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#ffd978] to-[#d4af37] transition-all duration-300"
                            style={{ width: `${ut.progress_pct}%` }}
                          />
                        </div>
                        <span className="text-[8px] text-gray-500 mt-0.5 block">{ut.progress}/{task.total_steps} steps</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-1.5">
                      {task.reward_points > 0 && (
                        <span className="text-[10px] font-bold text-[#ffd978]">+{task.reward_points} Vouchers</span>
                      )}
                      {task.reward_amount > 0 && (
                        <span className="text-[10px] font-bold text-emerald-400">+${parseFloat(task.reward_amount).toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isClaimed ? (
                      <span className="px-3.5 py-1.5 text-[10px] font-black rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        Claimed
                      </span>
                    ) : isCompleted ? (
                      <button
                        onClick={() => handleClaim(task.id)}
                        disabled={isLoading}
                        className="px-3.5 py-1.5 text-[10px] font-black rounded-lg bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black hover:opacity-90 transition cursor-pointer disabled:opacity-60"
                      >
                        {isLoading ? "..." : "Claim"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStart(task.id)}
                        disabled={isLoading}
                        className={`px-3.5 py-1.5 text-[10px] font-black rounded-lg transition cursor-pointer disabled:opacity-60 ${
                          isInProgress
                            ? "bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20"
                            : "bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black hover:opacity-90"
                        }`}
                      >
                        {isLoading ? "..." : isInProgress ? "Continue" : "Start"}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Extra local tasks (Audio, Invite) */}
        {!loading && (
          <div className="space-y-4">
            {/* Audio Task */}
            <div className="bg-[#151c2c]/40 border border-white/5 rounded-2xl p-3.5 flex justify-between items-center gap-3">
              <div className="flex-1">
                <span className="inline-block text-[9px] font-bold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2 py-0.5 rounded uppercase mb-1">
                  Activity
                </span>
                <h4 className="text-xs font-black text-white">Watch &amp; Listen Release Promo</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Play 15s audio clip of upcoming album releases.</p>
                <div className="flex items-center gap-2 mt-2.5 bg-white/[0.02] border border-white/5 p-1.5 rounded-lg max-w-[200px]">
                  <button
                    type="button"
                    onClick={playPromo}
                    className={`text-[9px] font-bold px-2 py-1 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black rounded cursor-pointer ${isPlayingAudio ? "opacity-50" : ""}`}
                  >
                    {isPlayingAudio ? "Playing" : "▶ Play"}
                  </button>
                  <div className="flex-1 h-1 bg-white/10 rounded overflow-hidden">
                    <div className="h-full bg-[#ffd066] transition-all duration-100" style={{ width: `${audioPercent}%` }} />
                  </div>
                  <span className="text-[8px] font-mono text-gray-400">
                    0:{audioSeconds < 10 ? "0" + audioSeconds : audioSeconds} / 0:15
                  </span>
                </div>
                <div className="text-[10px] font-bold text-[#ffd978] mt-1.5">+10 Vouchers</div>
              </div>
              <button
                onClick={() => audioSeconds >= 15 && showToast("🎵 Audio listening voucher applied!")}
                disabled={audioSeconds < 15}
                className={`px-3.5 py-1.5 text-[10px] font-black rounded-lg transition flex-shrink-0 ${
                  audioSeconds >= 15
                    ? "bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black cursor-pointer"
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                }`}
              >
                Claim
              </button>
            </div>

            {/* Invite Task */}
            <div className="bg-[#151c2c]/40 border border-white/5 rounded-2xl p-3.5 flex justify-between items-center gap-3">
              <div className="flex-1">
                <span className="inline-block text-[9px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded uppercase mb-1">
                  Ref
                </span>
                <h4 className="text-xs font-black text-white">Invite 1 subordinate to join</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Grow your investment team network.</p>
                <div className="text-[10px] font-bold text-[#ffd978] mt-1.5">+25 Vouchers</div>
              </div>
              <button
                onClick={handleInvite}
                className="px-3.5 py-1.5 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-[10px] font-black rounded-lg cursor-pointer hover:opacity-90 transition flex-shrink-0"
              >
                Invite
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm font-black text-white">No tasks available</p>
            <p className="text-xs text-gray-500 mt-1">Check back soon for new earning opportunities.</p>
          </div>
        )}

      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 60, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-[11px] font-bold px-5 py-2.5 rounded-full shadow-lg z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activePage="tasks" />
    </MobileLayout>
  );
}
