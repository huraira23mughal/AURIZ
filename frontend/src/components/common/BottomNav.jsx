import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  {
    key: "dashboard",
    label: "Home",
    path: "/dashboard",
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#D4AF37" : "rgba(255,255,255,0.4)"}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" stroke={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1" />
      </svg>
    ),
  },
  {
    key: "assets",
    label: "Income",
    path: "/assets",
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} />
      </svg>
    ),
  },
  {
    key: "tasks",
    label: "Task",
    path: "/tasks",
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} />
      </svg>
    ),
  },
  {
    key: "finance",
    label: "Finance",
    path: "/finance",
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z" fill={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} />
      </svg>
    ),
  },
  {
    key: "profile",
    label: "Mine",
    path: "/profile",
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} />
      </svg>
    ),
  },
];

export default function BottomNav({ activePage }) {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <div className="flex justify-around items-center px-2">
        {tabs.map((tab) => {
          const isActive = activePage === tab.key;
          return (
            <motion.button
              key={tab.key}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all duration-300"
              style={{
                background: isActive
                  ? "rgba(212, 175, 55, 0.08)"
                  : "transparent",
                border: isActive ? "1px solid rgba(212, 175, 55, 0.15)" : "1px solid transparent",
              }}
            >
              {tab.icon(isActive)}
              <span
                className="text-[10px] font-semibold"
                style={{ color: isActive ? "#D4AF37" : "rgba(255,255,255,0.4)" }}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
