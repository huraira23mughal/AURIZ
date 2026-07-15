import { motion } from "framer-motion";

export default function MobileLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex justify-center items-start bg-[#070a12]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mobile-page w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
