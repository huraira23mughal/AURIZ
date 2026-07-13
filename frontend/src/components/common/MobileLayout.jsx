import { motion } from "framer-motion";

export default function MobileLayout({ children }) {
  return (
    <div
      style={{
        background: "#0D131F",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mobile-page"
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
