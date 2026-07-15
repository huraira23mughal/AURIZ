import React, { useState } from "react";
import MobileLayout from "../components/common/MobileLayout";
import BottomNav from "../components/common/BottomNav";

export default function TasksPage() {
  const [vouchers, setVouchers] = useState(245);
  const [claimedCheckin, setClaimedCheckin] = useState(false);
  const [claimedAudio, setClaimedAudio] = useState(false);
  
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);
  const [audioPercent, setAudioPercent] = useState(0);
  
  const handleCheckin = () => {
    if (claimedCheckin) return;
    setVouchers(prev => prev + 5);
    setClaimedCheckin(true);
    alert("Daily check-in reward claimed! +5 Vouchers");
  };

  const playPromo = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    setAudioSeconds(0);
    setAudioPercent(0);

    const interval = setInterval(() => {
      setAudioSeconds(prev => {
        const next = prev + 1;
        const pct = (next / 15) * 100;
        setAudioPercent(pct);
        if (next >= 15) {
          clearInterval(interval);
          setIsPlayingAudio(false);
        }
        return next;
      });
    }, 1000);
  };

  const handleClaimAudio = () => {
    if (audioSeconds < 15 || claimedAudio) return;
    setVouchers(prev => prev + 10);
    setClaimedAudio(true);
    alert("Audio listening voucher claimed! +10 Vouchers");
  };

  const handleInvite = () => {
    const inviteLink = `https://auriz.com/register?code=TDS53m`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Invite link copied to clipboard: " + inviteLink);
    });
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-5"
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

      <div className="px-5 py-5 space-y-5">
        
        {/* Voucher summary card */}
        <div className="bg-gradient-to-br from-[#ffd978] to-[#b8860b] rounded-3xl p-5 shadow-lg text-black">
          <span className="text-[10px] text-black/70 block uppercase tracking-wider font-bold">My Vouchers</span>
          <h2 className="text-3xl font-black text-black mt-1 mb-3">{vouchers}</h2>
          <p className="text-[11px] text-black/90">
            Completed: <strong className="text-black">{(claimedCheckin ? 1 : 0) + (claimedAudio ? 1 : 0)}/3 tasks</strong>
          </p>
        </div>

        {/* Tasks list */}
        <div className="space-y-4">
          
          {/* Task 1 */}
          <div className="bg-[#151c2c]/40 border border-white/5 rounded-2xl p-4 flex justify-between items-center gap-4">
            <div className="flex-1">
              <span className="inline-block text-[9px] font-bold text-[#ffd066] bg-[#ffd066]/10 border border-[#ffd066]/20 px-2 py-0.5 rounded uppercase mb-1">
                Daily
              </span>
              <h4 className="text-xs font-black text-white">Daily Check-in Reward</h4>
              <p className="text-[10px] text-gray-400 mt-0.5">Claim your daily listening voucher support.</p>
              <div className="text-[10px] font-bold text-[#ffd978] mt-1.5">+5 Vouchers</div>
            </div>
            <button
              onClick={handleCheckin}
              className={`px-4 py-2 text-[11px] font-black rounded-xl transition ${claimedCheckin ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black hover:opacity-90 cursor-pointer"}`}
            >
              {claimedCheckin ? "Claimed" : "Claim"}
            </button>
          </div>

          {/* Task 2 */}
          <div className="bg-[#151c2c]/40 border border-white/5 rounded-2xl p-4 flex justify-between items-center gap-4">
            <div className="flex-1">
              <span className="inline-block text-[9px] font-bold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2 py-0.5 rounded uppercase mb-1">
                Activity
              </span>
              <h4 className="text-xs font-black text-white">Watch & Listen Release Promo</h4>
              <p className="text-[10px] text-gray-400 mt-0.5">Play 15s audio clip of upcoming album releases.</p>
              
              {/* Audio progress bar */}
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
              onClick={handleClaimAudio}
              disabled={audioSeconds < 15 || claimedAudio}
              className={`px-4 py-2 text-[11px] font-black rounded-xl transition ${claimedAudio ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : audioSeconds >= 15 ? "bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black cursor-pointer" : "bg-white/5 text-gray-500 cursor-not-allowed"}`}
            >
              {claimedAudio ? "Claimed" : "Claim"}
            </button>
          </div>

          {/* Task 3 */}
          <div className="bg-[#151c2c]/40 border border-white/5 rounded-2xl p-4 flex justify-between items-center gap-4">
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
              className="px-4 py-2 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-[11px] font-black rounded-xl cursor-pointer hover:opacity-90 transition"
            >
              Invite
            </button>
          </div>

        </div>

      </div>

      <BottomNav activePage="tasks" />
    </MobileLayout>
  );
}
