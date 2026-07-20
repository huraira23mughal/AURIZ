import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "../components/common/MobileLayout";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

// ── Shared back-header ────────────────────────────────────────────
function SubHeader({ title, onBack }) {
  return (
    <header className="flex items-center gap-3 px-4 py-4 sticky top-0 z-10 backdrop-blur-2xl"
      style={{ background: "rgba(10,10,20,0.92)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button onClick={onBack}
        className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        ←
      </button>
      <h2 className="text-sm font-black text-white">{title}</h2>
    </header>
  );
}

// ── Team Income ────────────────────────────────────────────────────
export function TeamIncomePage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate team data (replace with real API when available)
    setTimeout(() => {
      setMembers([
        { id: 1, username: "usr_a8k2", level: "Direct", earnings: 42.50, joined: "2025-12-01" },
        { id: 2, username: "usr_b3m7", level: "Direct", earnings: 18.00, joined: "2026-01-15" },
        { id: 3, username: "usr_c9x4", level: "Level 2", earnings: 9.75, joined: "2026-02-20" },
        { id: 4, username: "usr_d1n5", level: "Level 3", earnings: 3.20, joined: "2026-03-10" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const totalTeamEarnings = members.reduce((s, m) => s + m.earnings, 0);
  const referred = profile?.members_referred || 0;

  const levelColors = { "Direct": "#D4AF37", "Level 2": "#60a5fa", "Level 3": "#4ade80" };

  return (
    <MobileLayout>
      <SubHeader title="Team's Income" onBack={() => navigate("/profile")} />
      <div className="px-4 py-4 space-y-4 pb-10">

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Members", value: referred, color: "#ffd066" },
            { label: "Team Earnings", value: `$${totalTeamEarnings.toFixed(2)}`, color: "#4ade80" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-4 relative overflow-hidden"
              style={{ background: "rgba(18,24,40,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
              <span className="text-[10px] text-gray-500 block">{s.label}</span>
              <span className="text-xl font-black mt-1 block" style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Commission rates */}
        <div className="rounded-2xl p-4"
          style={{ background: "rgba(18,24,40,0.65)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
          <h3 className="text-xs font-black text-white mb-3">Commission Structure</h3>
          {[
            { level: "Level 1 (Direct)", rate: "15%", color: "#D4AF37" },
            { level: "Level 2", rate: "10%", color: "#60a5fa" },
            { level: "Level 3", rate: "5%", color: "#4ade80" },
          ].map((r, i) => (
            <div key={i} className="flex justify-between items-center py-2.5"
              style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span className="text-xs text-gray-400">{r.level}</span>
              <span className="text-xs font-black" style={{ color: r.color }}>{r.rate}</span>
            </div>
          ))}
        </div>

        {/* Member list */}
        <h3 className="text-xs font-black text-white mt-2">Your Team ({members.length})</h3>
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-7 h-7 rounded-full border-2 border-transparent border-t-yellow-400 animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-3xl mb-2">👥</p>
            <p className="text-xs font-black text-white">No team members yet</p>
            <p className="text-[10px] text-gray-500 mt-1">Invite friends to start earning commissions.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {members.map((m) => (
              <motion.div key={m.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 rounded-2xl"
                style={{ background: "rgba(18,24,40,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs"
                    style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    {m.username.slice(-1).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{m.username}</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: levelColors[m.level] || "#fff", background: `${levelColors[m.level]}15` }}>
                      {m.level}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-400">+${m.earnings.toFixed(2)}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}

// ── Account Change Record ─────────────────────────────────────────
export function AccountRecordPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRecords([
        { id: 1, type: "Recharge", amount: "+$100.00", time: "2026-07-19 14:32", color: "#4ade80", icon: "↑" },
        { id: 2, type: "Ticket Purchase", amount: "-$30.00", time: "2026-07-19 15:10", color: "#f87171", icon: "↓" },
        { id: 3, type: "Daily Profit", amount: "+$0.90", time: "2026-07-20 00:00", color: "#4ade80", icon: "↑" },
        { id: 4, type: "Task Reward", amount: "+$0.50", time: "2026-07-20 09:15", color: "#4ade80", icon: "↑" },
        { id: 5, type: "Withdrawal", amount: "-$50.00", time: "2026-07-20 11:00", color: "#f87171", icon: "↓" },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <MobileLayout>
      <SubHeader title="Account Change Record" onBack={() => navigate("/profile")} />
      <div className="px-4 py-4 pb-10">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 rounded-full border-2 border-transparent border-t-yellow-400 animate-spin" />
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-3xl mb-2">📝</p>
            <p className="text-xs font-black text-white">No records yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {records.map((r) => (
              <motion.div key={r.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{ background: "rgba(18,24,40,0.65)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black"
                    style={{ background: `${r.color}15`, border: `1px solid ${r.color}30`, color: r.color }}>
                    {r.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{r.type}</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">{r.time}</p>
                  </div>
                </div>
                <span className="text-sm font-black" style={{ color: r.color }}>{r.amount}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}

// ── Customer Service ──────────────────────────────────────────────
export function CustomerServicePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setMessage(""); }, 3000);
  };

  const faqs = [
    { q: "How do I recharge my account?", a: "Go to Profile → Recharge and send USDT TRC20 to our wallet address." },
    { q: "How long does withdrawal take?", a: "Withdrawals are processed within 24-48 hours after review." },
    { q: "What is the minimum withdrawal amount?", a: "The minimum withdrawal amount is $10 USD." },
    { q: "How are daily profits calculated?", a: "Profits are calculated based on your ticket purchase value × the daily profit rate of each album." },
  ];

  return (
    <MobileLayout>
      <SubHeader title="Customer Service" onBack={() => navigate("/profile")} />
      <div className="px-4 py-4 space-y-4 pb-10">

        {/* Support banner */}
        <div className="rounded-2xl p-4 text-center relative overflow-hidden"
          style={{ background: "rgba(18,24,40,0.7)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          <p className="text-2xl mb-2">🎧</p>
          <h3 className="text-sm font-black text-white">24/7 Support</h3>
          <p className="text-[10px] text-gray-500 mt-1">Our team responds within 2-4 hours</p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400 font-bold">Online Now</span>
          </div>
        </div>

        {/* FAQ */}
        <h3 className="text-xs font-black text-white">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <details key={i} className="rounded-2xl overflow-hidden group"
              style={{ background: "rgba(18,24,40,0.65)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <summary className="px-4 py-3.5 text-xs font-bold text-white cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-yellow-400 text-base leading-none group-open:rotate-45 transition-transform duration-200">+</span>
              </summary>
              <p className="px-4 pb-4 text-[10px] text-gray-400 leading-relaxed border-t border-white/5 pt-2">{faq.a}</p>
            </details>
          ))}
        </div>

        {/* Message form */}
        <h3 className="text-xs font-black text-white">Send a Message</h3>
        <div className="rounded-2xl p-4 space-y-3"
          style={{ background: "rgba(18,24,40,0.65)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue..."
            className="w-full rounded-xl p-3 text-xs text-white resize-none outline-none transition"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}
          />
          <AnimatePresence>
            {sent && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs text-green-400 font-bold">✓ Message sent! We'll reply soon.</motion.p>
            )}
          </AnimatePresence>
          <button onClick={handleSend}
            className="w-full py-3.5 rounded-xl font-black text-xs text-black transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}>
            Send Message
          </button>
        </div>

        {/* Contact info */}
        <div className="rounded-2xl p-4 space-y-3"
          style={{ background: "rgba(18,24,40,0.65)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { icon: "📧", label: "Email", value: "support@auriz.io" },
            { icon: "💬", label: "Telegram", value: "@AURIZSupport" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-base">{c.icon}</span>
              <div>
                <p className="text-[10px] text-gray-500">{c.label}</p>
                <p className="text-xs font-bold text-yellow-400">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}

// ── Invite Friends ────────────────────────────────────────────────
export function InviteFriendsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const inviteLink = `${window.location.origin}/register`;
  const inviteCode = "TDx3m";

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <MobileLayout>
      <SubHeader title="Invite Friends" onBack={() => navigate("/profile")} />
      <div className="px-4 py-4 space-y-4 pb-10">

        {/* Hero */}
        <div className="rounded-2xl p-6 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(18,24,40,0.9))", border: "1px solid rgba(212,175,55,0.2)" }}>
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
          <p className="text-4xl mb-3">🔗</p>
          <h2 className="text-lg font-black text-white">Earn with Every Referral</h2>
          <p className="text-[10px] text-gray-400 mt-2 leading-relaxed max-w-xs mx-auto">
            Invite friends and earn up to <span className="text-yellow-400 font-bold">15%</span> commission on their daily returns — forever.
          </p>
        </div>

        {/* Commission tiers */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { level: "L1", rate: "15%", desc: "Direct", color: "#D4AF37" },
            { level: "L2", rate: "10%", desc: "2nd Level", color: "#60a5fa" },
            { level: "L3", rate: "5%", desc: "3rd Level", color: "#4ade80" },
          ].map((t, i) => (
            <div key={i} className="rounded-2xl p-3 text-center"
              style={{ background: "rgba(18,24,40,0.6)", border: `1px solid ${t.color}20` }}>
              <span className="text-xs font-black" style={{ color: t.color }}>{t.rate}</span>
              <p className="text-[8px] text-gray-500 mt-0.5">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Invite link */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-white">Your Invite Link</h3>
          <div className="rounded-2xl p-4"
            style={{ background: "rgba(18,24,40,0.65)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[10px] text-gray-500 mb-1.5">Invitation Code</p>
            <div className="flex items-center justify-between p-3 rounded-xl mb-3"
              style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <span className="text-sm font-black text-yellow-400 tracking-widest">{inviteCode}</span>
            </div>

            <p className="text-[10px] text-gray-500 mb-1.5">Share Link</p>
            <div className="flex items-center gap-2 p-3 rounded-xl mb-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-[10px] text-gray-400 flex-1 truncate">{inviteLink}</span>
            </div>

            <motion.button
              onClick={copyLink}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-xl font-black text-xs text-black transition hover:opacity-90 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}
            >
              {copied ? "✓ Copied!" : "Copy Invite Link"}
            </motion.button>
          </div>
        </div>

        {/* How it works */}
        <h3 className="text-xs font-black text-white">How It Works</h3>
        <div className="space-y-2">
          {[
            { step: "1", title: "Share your link", desc: "Copy and share your unique invite link with friends." },
            { step: "2", title: "They register & recharge", desc: "Your friend signs up and makes their first deposit." },
            { step: "3", title: "You earn commission", desc: "Automatically earn 15% of their daily returns forever." },
          ].map((h, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-2xl"
              style={{ background: "rgba(18,24,40,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs text-black flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #FFD978, #D4AF37)" }}>{h.step}</div>
              <div>
                <p className="text-xs font-black text-white">{h.title}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}

// ── User Agreement ────────────────────────────────────────────────
export function UserAgreementPage() {
  const navigate = useNavigate();

  const sections = [
    { title: "1. Acceptance of Terms", content: "By registering and using the AURIZ platform, you agree to these Terms of Service. If you do not agree, please do not use our platform. These terms may be updated at any time and your continued use constitutes acceptance of any changes." },
    { title: "2. Investment Risk Disclosure", content: "All investments carry inherent risk. Past returns are not indicative of future performance. AURIZ provides access to music industry investment opportunities but does not guarantee profits. You may lose some or all of your invested capital." },
    { title: "3. Account Registration", content: "You must provide accurate information during registration. You are responsible for maintaining the security of your account. Each user is permitted one account only. We reserve the right to suspend accounts that violate our policies." },
    { title: "4. Deposits & Withdrawals", content: "Deposits are processed in USDT (TRC20). Withdrawals require a minimum of $10 and are processed within 24-48 business hours pending review. We reserve the right to verify identity before processing large withdrawals." },
    { title: "5. Referral Program", content: "The referral program rewards users for inviting others to the platform. Commission rates are Level 1: 15%, Level 2: 10%, Level 3: 5%. Commission is earned on direct referral earnings and is subject to change with notice." },
    { title: "6. Prohibited Activities", content: "Users may not engage in fraud, market manipulation, multiple account creation, or any activity that undermines the integrity of the platform. Violations may result in immediate account suspension and forfeiture of funds." },
    { title: "7. Privacy Policy", content: "We collect and process personal data in accordance with applicable laws. Your data is encrypted and never sold to third parties. By using AURIZ, you consent to our data collection practices as described in our Privacy Policy." },
    { title: "8. Contact & Disputes", content: "For disputes or inquiries, contact our support team at support@auriz.io. We aim to resolve all disputes within 7 business days. Unresolved disputes are subject to binding arbitration under international commercial arbitration rules." },
  ];

  return (
    <MobileLayout>
      <SubHeader title="User Agreement" onBack={() => navigate("/profile")} />
      <div className="px-4 py-4 pb-10">

        {/* Header */}
        <div className="rounded-2xl p-4 mb-4 text-center relative overflow-hidden"
          style={{ background: "rgba(18,24,40,0.7)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          <p className="text-2xl mb-1">📜</p>
          <h2 className="text-sm font-black text-white">AURIZ User Agreement</h2>
          <p className="text-[9px] text-gray-500 mt-1">Last updated: July 2026</p>
        </div>

        <div className="space-y-3">
          {sections.map((s, i) => (
            <div key={i} className="rounded-2xl p-4"
              style={{ background: "rgba(18,24,40,0.65)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-xs font-black text-yellow-400 mb-2">{s.title}</h3>
              <p className="text-[10px] text-gray-400 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-2xl text-center"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <p className="text-[10px] text-gray-500">By using AURIZ you agree to all the above terms.</p>
          <p className="text-[10px] text-yellow-400 font-bold mt-1">© 2026 AURIZ Investment Platform</p>
        </div>
      </div>
    </MobileLayout>
  );
}
