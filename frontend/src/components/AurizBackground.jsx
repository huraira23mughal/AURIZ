import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AurizBackground = () => {
  const [particles, setParticles] = useState([]);
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    setParticles(Array.from({ length: 80 }).map((_, i) => ({
      id: i, size: Math.random() * 2 + 1, x: Math.random() * 100, y: Math.random() * 100,
      duration: Math.random() * 20 + 10, delay: Math.random() * 5
    })));

    setOrbs(Array.from({ length: 6 }).map((_, i) => ({
      id: i, size: Math.random() * 100 + 60, x: Math.random() * 100, y: Math.random() * 100,
      duration: Math.random() * 20 + 25, delay: Math.random() * 3, isPoly: i % 2 === 0
    })));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
      <motion.div className="absolute bottom-0 w-full h-" style={{ background: `radial-gradient(ellipse at center, rgba(255,215,0,0.1) 0%, transparent 70%)` }} animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
      {particles.map((p) => (<motion.div key={p.id} className="absolute rounded-full bg-yellow-400" style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }} animate={{ y: [0, -120, 0], opacity: [0, 0.8, 0] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }} />))}
      {orbs.map((o) => (<motion.div key={o.id} className="absolute" style={{ width: o.size, height: o.size, left: `${o.x}%`, top: `${o.y}%` }} animate={{ y: [0, -30, 0], rotateX: [0, 360], rotateY: [0, 360] }} transition={{ duration: o.duration, repeat: Infinity, delay: o.delay }}>
          {o.isPoly? <div className="w-full h-full" style={{ background: `conic-gradient(#FFD700, #111, #FFD700)`, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}/> : <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle, #333, #000)` }}/>}
      </motion.div>))}
    </div>
  );
};
export default AurizBackground;