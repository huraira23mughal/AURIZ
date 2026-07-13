import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  {
    key: "dashboard",
    label: "Home",
    path: "/dashboard",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#D4AF37" : "rgba(255,255,255,0.4)"}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" stroke={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" fill="none"/>
        <path d="M9 21V12h6v9" stroke={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "assets",
    label: "Assets",
    path: "/assets",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1.5"/>
        <path d="M12 6v6l4 2" stroke={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 16h10M9 13h6" stroke={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "tasks",
    label: "Tasks",
    path: "/tasks",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1.5"/>
        <path d="M8 12l3 3 5-5" stroke={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: "profile",
    label: "Profile",
    path: "/profile",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1.5"/>
        <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={active ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round"/>
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
                  ? "linear-gradient(135deg, rgba(255,217,120,0.15), rgba(212,175,55,0.1))"
                  : "transparent",
                border: isActive ? "1px solid rgba(212,175,55,0.3)" : "1px solid transparent",
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
