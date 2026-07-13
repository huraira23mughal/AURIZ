import { motion } from "framer-motion";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";

const stats = [
  {
    label: "My Vouchers",
    value: 245,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20 12V22H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Tasks Completed",
    value: 18,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Will Complete",
    value: 7,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="1.5"/>
        <path d="M12 6v6l4 2" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const tasks = [
  {
    id: 1,
    title: "Watch 5 Ads Daily",
    reward: 10,
    status: "inProgress",
    progress: 2,
    total: 5,
    progressPct: 40,
    actionLabel: "Start Task ▶",
  },
  {
    id: 2,
    title: "Daily Deposit $100",
    reward: 15,
    status: "completed",
    progress: 100,
    total: 100,
    progressPct: 100,
    actionLabel: "Claim Reward %",
  },
  {
    id: 3,
    title: "Watch 20 Ads",
    reward: 30,
    status: "unstarted",
    progress: 0,
    total: 20,
    progressPct: 0,
    actionLabel: "Start Task ▶",
  },
];

const statusConfig = {
  inProgress: {
    label: "In Progress",
    bg: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.35)",
    color: "#60a5fa",
  },
  completed: {
    label: "Completed",
    bg: "rgba(34,197,94,0.15)",
    border: "rgba(34,197,94,0.35)",
    color: "#4ade80",
  },
  unstarted: {
    label: "Not Started",
    bg: "rgba(156,163,175,0.1)",
    border: "rgba(156,163,175,0.2)",
    color: "#9ca3af",
  },
};

export default function TasksPage() {
  return (
    <MobileLayout>
      {/* ── Header ── */}
      <div
        className="px-5 pt-12 pb-5"
        style={{
          background: "linear-gradient(180deg, rgba(212,175,55,0.06) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <h1 className="text-2xl font-black text-white">
          Daily <span className="gold-text">Tasks</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Complete tasks to earn rewards & climb the leaderboard.
        </p>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="glass rounded-2xl p-3 flex flex-col items-center text-center"
              style={{ border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                style={{ background: "rgba(212,175,55,0.1)" }}
              >
                {s.icon}
              </div>
              <p className="text-xl font-black gold-text">{s.value}</p>
              <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Section Title ── */}
        <div className="flex items-center gap-3">
          <h2
            className="text-lg font-black gold-text"
          >
            Daily Tasks
          </h2>
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }}
          />
        </div>

        {/* ── Task Cards ── */}
        <div className="space-y-4">
          {tasks.map((task, i) => {
            const s = statusConfig[task.status];
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                className="glass rounded-3xl p-5"
                style={{
                  border: task.status === "completed"
                    ? "1px solid rgba(34,197,94,0.25)"
                    : task.status === "inProgress"
                    ? "1px solid rgba(212,175,55,0.25)"
                    : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white">{task.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="gold-badge">⚡{task.reward}</span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                      >
                        {s.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <p
                      className="text-2xl font-black"
                      style={{ color: task.status === "completed" ? "#4ade80" : "#FFD978" }}
                    >
                      {task.status === "completed" ? "100%" : `${task.progress}/${task.total}`}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {task.status === "completed" ? "Done" : "Progress"}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2.5 rounded-full bg-white/10 mb-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${task.progressPct}%` }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
                    className="h-full rounded-full"
                    style={{
                      background: task.progressPct === 100
                        ? "linear-gradient(90deg, #4ade80, #22c55e)"
                        : task.progressPct === 0
                        ? "transparent"
                        : "linear-gradient(90deg, #FFD978, #D4AF37)",
                      boxShadow: task.progressPct > 0
                        ? task.progressPct === 100
                          ? "0 0 8px rgba(74,222,128,0.5)"
                          : "0 0 8px rgba(212,175,55,0.5)"
                        : "none",
                    }}
                  />
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {task.status === "unstarted"
                      ? "Tap to begin earning"
                      : task.status === "completed"
                      ? "🎉 Task complete!"
                      : `${task.total - task.progress} remaining`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="text-xs font-bold px-4 py-2 rounded-full"
                    style={
                      task.status === "completed"
                        ? {
                            background: "linear-gradient(135deg, #4ade80, #22c55e)",
                            color: "#000",
                            boxShadow: "0 0 15px rgba(74,222,128,0.4)",
                          }
                        : {
                            background: "linear-gradient(135deg, #FFD978, #D4AF37)",
                            color: "#000",
                            boxShadow: "0 0 15px rgba(212,175,55,0.4)",
                          }
                    }
                  >
                    {task.actionLabel}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomNav activePage="tasks" />
    </MobileLayout>
  );
}
