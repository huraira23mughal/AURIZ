import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// ─── Animation #1: Floating gold particles ────────────────────────────────
// ─── Animation #2: Rotating orbital rings ────────────────────────────────
// ─── Animation #3: Pulsing ambient glow orbs ─────────────────────────────

const AurizBackground = () => {
  const [particles, setParticles] = useState([]);
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    // Floating gold dust particles
    setParticles(
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 0.8,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 18 + 10,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.6 + 0.2,
      }))
    );

    // Ambient glow orbs
    setOrbs([
      { id: 0, size: 320, x: 15, y: 20, duration: 28, delay: 0, color: "rgba(212,175,55,0.06)" },
      { id: 1, size: 250, x: 75, y: 65, duration: 22, delay: 3, color: "rgba(212,175,55,0.04)" },
      { id: 2, size: 180, x: 50, y: 80, duration: 35, delay: 6, color: "rgba(212,175,55,0.05)" },
      { id: 3, size: 200, x: 88, y: 15, duration: 20, delay: 2, color: "rgba(100,80,200,0.03)" },
      { id: 4, size: 140, x: 5,  y: 70, duration: 30, delay: 8, color: "rgba(212,175,55,0.04)" },
    ]);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "#070A12" }}>
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-[#080C18] to-[#070A12]" />

      {/* Bottom gold sweep — Animation #3: Pulsing glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.09) 0%, transparent 65%)" }}
        animate={{ opacity: [0.6, 1, 0.6], y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Ambient glow orbs — Animation #3 */}
      {orbs.map((o) => (
        <motion.div
          key={o.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: o.size,
            height: o.size,
            left: `${o.x}%`,
            top: `${o.y}%`,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: o.duration, repeat: Infinity, delay: o.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Gold floating particles — Animation #1 */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `rgba(212,175,55,${p.opacity})`,
            boxShadow: `0 0 ${p.size * 2}px rgba(212,175,55,0.4)`,
          }}
          animate={{
            y: [0, -(Math.random() * 80 + 40), 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Rotating orbital ring — Animation #2 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[
          { size: 600, border: "rgba(212,175,55,0.04)", duration: 40 },
          { size: 900, border: "rgba(212,175,55,0.025)", duration: 65, reverse: true },
          { size: 1200, border: "rgba(212,175,55,0.015)", duration: 100 },
        ].map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              border: `1px solid ${ring.border}`,
              left: -ring.size / 2,
              top: -ring.size / 2,
            }}
            animate={{ rotateZ: ring.reverse ? -360 : 360 }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
    </div>
  );
};

export default AurizBackground;