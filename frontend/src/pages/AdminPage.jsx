import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

// ── Reusable components ────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, color = "#ffd066" }) {
  return (
    <div className="bg-[#0e1424] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-10"
        style={{ background: color }}
      />
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{label}</div>
      <div className="text-2xl font-black text-white">{value}</div>
      {sub && <div className="text-[10px] text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

function Badge({ children, color = "gold" }) {
  const colors = {
    gold: "bg-[#ffd066]/10 text-[#ffd066] border-[#ffd066]/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    blue: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    gray: "bg-white/5 text-gray-400 border-white/10",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${colors[color]}`}>
      {children}
    </span>
  );
}

function Toast({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-xs font-bold px-6 py-3 rounded-full shadow-xl z-[100]"
        >
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <svg className="animate-spin h-8 w-8 text-[#ffd066]" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </div>
  );
}

// ── TABS ───────────────────────────────────────────────────────────────────

function DashboardTab({ stats }) {
  if (!stats) return <LoadingSpinner />;

  const txnBadgeColor = (type) => {
    const map = { recharge: "green", withdrawal: "gold", reward: "blue", earning: "blue" };
    return map[type] || "gray";
  };

  const statusBadgeColor = (s) => {
    const map = { approved: "green", pending: "gold", rejected: "red" };
    return map[s] || "gray";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon="👥" label="Total Users" value={stats.users.total} sub={`${stats.users.active} active`} />
        <StatCard icon="💰" label="Total Deposited" value={`$${stats.transactions.total_deposited.toFixed(2)}`} color="#10b981" />
        <StatCard icon="⏳" label="Pending Recharges" value={stats.transactions.pending_recharges} color="#f59e0b" />
        <StatCard icon="📤" label="Pending Withdrawals" value={stats.transactions.pending_withdrawals} color="#ef4444" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <StatCard icon="📋" label="Total Tasks" value={stats.tasks.total} sub={`${stats.tasks.active} active`} />
        <StatCard icon="✅" label="Total Withdrawn" value={`$${stats.transactions.total_withdrawn.toFixed(2)}`} color="#6366f1" />
      </div>

      <div>
        <h3 className="text-sm font-black text-white mb-3">Recent Transactions</h3>
        <div className="bg-[#0e1424] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">User</th>
                  <th className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                  <th className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-xs text-white font-semibold">{txn.username}</td>
                    <td className="px-4 py-3"><Badge color={txnBadgeColor(txn.transaction_type)}>{txn.transaction_type}</Badge></td>
                    <td className="px-4 py-3 text-xs font-black text-[#ffd066]">${parseFloat(txn.amount).toFixed(2)}</td>
                    <td className="px-4 py-3"><Badge color={statusBadgeColor(txn.status)}>{txn.status}</Badge></td>
                    <td className="px-4 py-3 text-[10px] text-gray-400">{new Date(txn.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersTab({ showToast }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const fetchUsers = useCallback(async (q = "") => {
    setLoading(true);
    try {
      const res = await API.get(`admin/users/${q ? `?search=${q}` : ""}`);
      setUsers(res.data);
    } catch (err) {
      showToast("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(search);
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      is_active: user.is_active,
      is_staff: user.is_staff,
      email: user.email,
      level: user.profile?.level || 1,
      total_assets: user.profile?.total_assets || 0,
      vouchers: user.profile?.vouchers || 0,
    });
  };

  const saveUser = async () => {
    setSaving(true);
    try {
      await API.patch(`admin/users/${selectedUser.id}/`, editForm);
      showToast("✅ User updated successfully");
      setSelectedUser(null);
      fetchUsers(search);
    } catch (err) {
      showToast("❌ Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (user) => {
    try {
      await API.patch(`admin/users/${user.id}/`, { is_active: !user.is_active });
      showToast(`✅ User ${!user.is_active ? "activated" : "deactivated"}`);
      fetchUsers(search);
    } catch {
      showToast("❌ Action failed");
    }
  };

  const deleteUser = async (user) => {
    if (!window.confirm(`Delete user "${user.username}"? This is permanent.`)) return;
    try {
      await API.delete(`admin/users/${user.id}/`);
      showToast("✅ User deleted");
      fetchUsers(search);
    } catch (err) {
      showToast(err.response?.data?.error || "❌ Cannot delete this user");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username or email..."
          className="flex-1 py-2.5 px-4 bg-[#0e1424] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-xs font-black rounded-xl hover:brightness-105 transition"
        >
          Search
        </button>
      </form>

      {/* Stats row */}
      <p className="text-[10px] text-gray-400">{users.length} users found</p>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-[#0e1424] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5">
                  {["User", "Email", "Level", "Assets", "Status", "Joined", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ffd978] to-[#d4af37] flex items-center justify-center text-black text-xs font-black flex-shrink-0">
                          {u.username?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-black text-white">{u.username}</p>
                          {u.is_staff && <Badge color="purple">Admin</Badge>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[10px] text-gray-400">{u.email}</td>
                    <td className="px-4 py-3 text-xs font-black text-[#ffd066]">VIP {u.profile?.level || 1}</td>
                    <td className="px-4 py-3 text-xs font-black text-white">${parseFloat(u.profile?.total_assets || 0).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Badge color={u.is_active ? "green" : "red"}>{u.is_active ? "Active" : "Banned"}</Badge>
                    </td>
                    <td className="px-4 py-3 text-[10px] text-gray-400">{new Date(u.date_joined).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        <button
                          onClick={() => openEdit(u)}
                          className="px-2.5 py-1 bg-[#ffd066]/10 text-[#ffd066] border border-[#ffd066]/20 text-[9px] font-black rounded-lg hover:bg-[#ffd066]/20 transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleActive(u)}
                          className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition cursor-pointer border ${
                            u.is_active
                              ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                          }`}
                        >
                          {u.is_active ? "Ban" : "Unban"}
                        </button>
                        {!u.is_staff && (
                          <button
                            onClick={() => deleteUser(u)}
                            className="px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-black rounded-lg hover:bg-red-500/20 transition cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setSelectedUser(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-[#0e1424] border border-[#ffd066]/15 rounded-3xl p-6 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-black text-white">Edit User: {selectedUser.username}</h3>
                <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-white text-xl">×</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Level</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={editForm.level}
                      onChange={(e) => setEditForm({ ...editForm, level: parseInt(e.target.value) })}
                      className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Total Assets ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.total_assets}
                      onChange={(e) => setEditForm({ ...editForm, total_assets: parseFloat(e.target.value) })}
                      className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Vouchers</label>
                  <input
                    type="number"
                    value={editForm.vouchers}
                    onChange={(e) => setEditForm({ ...editForm, vouchers: parseInt(e.target.value) })}
                    className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition"
                  />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.is_active}
                      onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                      className="accent-[#d4af37]"
                    />
                    <span className="text-xs text-gray-300">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.is_staff}
                      onChange={(e) => setEditForm({ ...editForm, is_staff: e.target.checked })}
                      className="accent-purple-500"
                    />
                    <span className="text-xs text-gray-300">Admin</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-gray-300 text-xs font-black rounded-xl hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveUser}
                  disabled={saving}
                  className="flex-1 py-3 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-xs font-black rounded-xl hover:brightness-105 transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function TransactionsTab({ showToast }) {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [processing, setProcessing] = useState({});

  const fetchTxns = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter) params.append("type", typeFilter);
      if (statusFilter) params.append("status", statusFilter);
      const res = await API.get(`admin/transactions/?${params}`);
      setTxns(res.data);
    } catch {
      showToast("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, [typeFilter, statusFilter]);

  useEffect(() => { fetchTxns(); }, [fetchTxns]);

  const approve = async (id) => {
    setProcessing((p) => ({ ...p, [id]: "approving" }));
    try {
      await API.post(`admin/transactions/${id}/approve/`);
      showToast("✅ Transaction approved & credited");
      fetchTxns();
    } catch (err) {
      showToast(err.response?.data?.error || "❌ Failed to approve");
    } finally {
      setProcessing((p) => ({ ...p, [id]: null }));
    }
  };

  const reject = async (id) => {
    const reason = window.prompt("Rejection reason (optional):");
    setProcessing((p) => ({ ...p, [id]: "rejecting" }));
    try {
      await API.post(`admin/transactions/${id}/reject/`, { reason: reason || "" });
      showToast("✅ Transaction rejected");
      fetchTxns();
    } catch {
      showToast("❌ Failed to reject");
    } finally {
      setProcessing((p) => ({ ...p, [id]: null }));
    }
  };

  const txnTypeColor = (t) => ({ recharge: "green", withdrawal: "gold", reward: "blue", earning: "blue" })[t] || "gray";
  const txnStatusColor = (s) => ({ approved: "green", pending: "gold", rejected: "red" })[s] || "gray";

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="py-2 px-3 bg-[#0e1424] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60"
        >
          <option value="">All Types</option>
          <option value="recharge">Recharge</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="reward">Reward</option>
          <option value="earning">Earning</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="py-2 px-3 bg-[#0e1424] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <p className="text-[10px] text-gray-400">{txns.length} transactions</p>

      {loading ? (
        <LoadingSpinner />
      ) : txns.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-xs">No transactions found.</div>
      ) : (
        <div className="bg-[#0e1424] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-white/5">
                  {["User", "Type", "Amount", "Status", "Note", "Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {txns.map((txn) => {
                  const isProc = !!processing[txn.id];
                  return (
                    <tr key={txn.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-xs text-white font-semibold">{txn.username}</td>
                      <td className="px-4 py-3"><Badge color={txnTypeColor(txn.transaction_type)}>{txn.transaction_type}</Badge></td>
                      <td className="px-4 py-3 text-xs font-black text-[#ffd066]">${parseFloat(txn.amount).toFixed(2)}</td>
                      <td className="px-4 py-3"><Badge color={txnStatusColor(txn.status)}>{txn.status}</Badge></td>
                      <td className="px-4 py-3 text-[10px] text-gray-400 max-w-[120px] truncate">{txn.note || "—"}</td>
                      <td className="px-4 py-3 text-[10px] text-gray-400">{new Date(txn.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        {txn.status === "pending" ? (
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => approve(txn.id)}
                              disabled={isProc}
                              className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black rounded-lg hover:bg-emerald-500/20 transition cursor-pointer disabled:opacity-50"
                            >
                              {processing[txn.id] === "approving" ? "..." : "Approve"}
                            </button>
                            <button
                              onClick={() => reject(txn.id)}
                              disabled={isProc}
                              className="px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-black rounded-lg hover:bg-red-500/20 transition cursor-pointer disabled:opacity-50"
                            >
                              {processing[txn.id] === "rejecting" ? "..." : "Reject"}
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-gray-500">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function TasksTab({ showToast }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", task_type: "daily",
    reward_points: 10, reward_amount: "0", total_steps: 1, is_active: true,
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get("admin/tasks/");
      setTasks(res.data);
    } catch {
      showToast("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const openCreate = () => {
    setEditingTask(null);
    setForm({ title: "", description: "", task_type: "daily", reward_points: 10, reward_amount: "0", total_steps: 1, is_active: true });
    setShowForm(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      task_type: task.task_type,
      reward_points: task.reward_points,
      reward_amount: task.reward_amount,
      total_steps: task.total_steps,
      is_active: task.is_active,
    });
    setShowForm(true);
  };

  const saveTask = async () => {
    if (!form.title.trim()) { showToast("Title is required"); return; }
    setSaving(true);
    try {
      if (editingTask) {
        await API.patch(`admin/tasks/${editingTask.id}/`, form);
        showToast("✅ Task updated");
      } else {
        await API.post("admin/tasks/", form);
        showToast("✅ Task created");
      }
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      showToast("❌ Failed to save task");
    } finally {
      setSaving(false);
    }
  };

  const deleteTask = async (task) => {
    if (!window.confirm(`Delete task "${task.title}"?`)) return;
    try {
      await API.delete(`admin/tasks/${task.id}/`);
      showToast("✅ Task deleted");
      fetchTasks();
    } catch {
      showToast("❌ Failed to delete");
    }
  };

  const toggleActive = async (task) => {
    try {
      await API.patch(`admin/tasks/${task.id}/`, { is_active: !task.is_active });
      showToast(`✅ Task ${!task.is_active ? "activated" : "deactivated"}`);
      fetchTasks();
    } catch {
      showToast("❌ Failed");
    }
  };

  const taskTypeColors = { daily: "gold", watch_ad: "blue", deposit: "purple", referral: "green" };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-[10px] text-gray-400">{tasks.length} tasks</p>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-xs font-black rounded-xl hover:brightness-105 transition"
        >
          + New Task
        </button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="bg-[#0e1424] border border-white/5 rounded-2xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Badge color={taskTypeColors[task.task_type]}>{task.task_type}</Badge>
                    <Badge color={task.is_active ? "green" : "red"}>{task.is_active ? "Active" : "Inactive"}</Badge>
                  </div>
                  <h4 className="text-sm font-black text-white">{task.title}</h4>
                  {task.description && <p className="text-[10px] text-gray-400 mt-0.5">{task.description}</p>}
                  <div className="flex gap-4 mt-2 flex-wrap">
                    <span className="text-[10px] text-[#ffd066] font-bold">+{task.reward_points} Vouchers</span>
                    <span className="text-[10px] text-emerald-400 font-bold">+${parseFloat(task.reward_amount).toFixed(2)}</span>
                    <span className="text-[10px] text-gray-400">{task.total_steps} step(s)</span>
                    <span className="text-[10px] text-gray-400">{task.user_count} users</span>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0 flex-wrap">
                  <button
                    onClick={() => openEdit(task)}
                    className="px-2.5 py-1 bg-[#ffd066]/10 text-[#ffd066] border border-[#ffd066]/20 text-[9px] font-black rounded-lg hover:bg-[#ffd066]/20 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleActive(task)}
                    className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition cursor-pointer border ${
                      task.is_active
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                    }`}
                  >
                    {task.is_active ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => deleteTask(task)}
                    className="px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-black rounded-lg hover:bg-red-500/20 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && <div className="text-center py-12 text-gray-500 text-xs">No tasks yet.</div>}
        </div>
      )}

      {/* Task Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-[#0e1424] border border-[#ffd066]/15 rounded-3xl p-6 z-50 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-black text-white">{editingTask ? "Edit Task" : "New Task"}</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-xl">×</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Title *</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                    className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition resize-none" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Task Type</label>
                  <select value={form.task_type} onChange={(e) => setForm({ ...form, task_type: e.target.value })}
                    className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60">
                    <option value="daily">Daily</option>
                    <option value="watch_ad">Watch Ad</option>
                    <option value="deposit">Deposit</option>
                    <option value="referral">Referral</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Vouchers</label>
                    <input type="number" value={form.reward_points} onChange={(e) => setForm({ ...form, reward_points: parseInt(e.target.value) })}
                      className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Reward ($)</label>
                    <input type="number" step="0.01" value={form.reward_amount} onChange={(e) => setForm({ ...form, reward_amount: e.target.value })}
                      className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Steps</label>
                    <input type="number" min="1" value={form.total_steps} onChange={(e) => setForm({ ...form, total_steps: parseInt(e.target.value) })}
                      className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition" />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="accent-[#d4af37]" />
                  <span className="text-xs text-gray-300">Active (visible to users)</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-gray-300 text-xs font-black rounded-xl hover:bg-white/10 transition">
                  Cancel
                </button>
                <button onClick={saveTask} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-xs font-black rounded-xl hover:brightness-105 transition disabled:opacity-60">
                  {saving ? "Saving..." : editingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActivityFeedTab({ showToast }) {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ text: "", icon: "🎵", color: "#D4AF37", is_public: true });
  const [saving, setSaving] = useState(false);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const res = await API.get("admin/activity-feed/");
      setFeed(res.data);
    } catch {
      showToast("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFeed(); }, []);

  const createItem = async () => {
    if (!form.text.trim()) { showToast("Text is required"); return; }
    setSaving(true);
    try {
      await API.post("admin/activity-feed/", form);
      showToast("✅ Feed item created");
      setShowForm(false);
      setForm({ text: "", icon: "🎵", color: "#D4AF37", is_public: true });
      fetchFeed();
    } catch {
      showToast("❌ Failed to create");
    } finally {
      setSaving(false);
    }
  };

  const togglePublic = async (item) => {
    try {
      await API.patch(`admin/activity-feed/${item.id}/`, { is_public: !item.is_public });
      showToast(`✅ ${!item.is_public ? "Published" : "Hidden"}`);
      fetchFeed();
    } catch {
      showToast("❌ Failed");
    }
  };

  const deleteItem = async (item) => {
    if (!window.confirm("Delete this feed item?")) return;
    try {
      await API.delete(`admin/activity-feed/${item.id}/`);
      showToast("✅ Deleted");
      fetchFeed();
    } catch {
      showToast("❌ Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-[10px] text-gray-400">{feed.length} announcements</p>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-xs font-black rounded-xl hover:brightness-105 transition"
        >
          + New Announcement
        </button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="space-y-3">
          {feed.map((item) => (
            <div key={item.id} className="bg-[#0e1424] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 border border-white/10"
                style={{ background: `${item.color}15` }}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white font-semibold">{item.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge color={item.is_public ? "green" : "gray"}>{item.is_public ? "Public" : "Hidden"}</Badge>
                  <span className="text-[9px] text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <button
                  onClick={() => togglePublic(item)}
                  className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition cursor-pointer border ${
                    item.is_public
                      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}
                >
                  {item.is_public ? "Hide" : "Publish"}
                </button>
                <button
                  onClick={() => deleteItem(item)}
                  className="px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-black rounded-lg hover:bg-red-500/20 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {feed.length === 0 && <div className="text-center py-12 text-gray-500 text-xs">No announcements yet.</div>}
        </div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-[#0e1424] border border-[#ffd066]/15 rounded-3xl p-6 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-black text-white">New Announcement</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-xl">×</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Text *</label>
                  <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3}
                    placeholder="Congratulations to..."
                    className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Icon (Emoji)</label>
                    <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                      className="w-full py-2.5 px-3 bg-[#090d16] border border-white/[0.06] rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]/60 transition" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Color</label>
                    <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="w-full h-[34px] py-1 px-1 bg-[#090d16] border border-white/[0.06] rounded-xl cursor-pointer" />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_public} onChange={(e) => setForm({ ...form, is_public: e.target.checked })} className="accent-[#d4af37]" />
                  <span className="text-xs text-gray-300">Publish immediately</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-gray-300 text-xs font-black rounded-xl">Cancel</button>
                <button onClick={createItem} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-[#ffd978] to-[#d4af37] text-black text-xs font-black rounded-xl hover:brightness-105 transition disabled:opacity-60">
                  {saving ? "Creating..." : "Create"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── MAIN ADMIN PAGE ────────────────────────────────────────────────────────

const TABS = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "users", label: "Users", icon: "👥" },
  { key: "transactions", label: "Transactions", icon: "💳" },
  { key: "tasks", label: "Tasks", icon: "📋" },
  { key: "feed", label: "Activity Feed", icon: "📢" },
];

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    API.get("admin/stats/").then((res) => {
      setStats(res.data);
      setStatsLoading(false);
    }).catch(() => {
      showToast("Failed to load stats");
      setStatsLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-white flex flex-col" style={{ fontFamily: "'Inter', 'Outfit', sans-serif" }}>

      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0a0e1a] border-b border-white/5 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-400 hover:text-white transition p-1"
          >
            ☰
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffd978] to-[#d4af37] flex items-center justify-center text-black font-black text-sm">
              A
            </div>
            <div>
              <h1 className="text-sm font-black tracking-widest bg-gradient-to-r from-white to-[#ffd066] bg-clip-text text-transparent">
                AURIZ
              </h1>
              <p className="text-[9px] text-gray-500 -mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#ffd978] to-[#d4af37] flex items-center justify-center text-black font-black text-xs">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <span className="text-xs text-gray-300 font-semibold">{user?.username}</span>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-[10px] font-black rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            ← App
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black rounded-lg hover:bg-red-500/20 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">

        {/* Sidebar Overlay (mobile) */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-10 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`
          fixed md:static top-0 left-0 h-full z-20 md:z-auto
          w-56 bg-[#0a0e1a] border-r border-white/5 flex flex-col pt-[72px] md:pt-0 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <nav className="flex flex-col p-3 gap-1 mt-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-[#ffd978]/15 to-[#d4af37]/10 border border-[#ffd066]/20 text-[#ffd066]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs font-black">{tab.label}</span>
                {activeTab === tab.key && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ffd066]" />
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Stats */}
          {stats && (
            <div className="mx-3 mt-auto mb-4 p-3 bg-gradient-to-br from-[#ffd978]/10 to-[#d4af37]/5 border border-[#ffd066]/15 rounded-2xl">
              <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-2">Quick Stats</p>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-400">Users</span>
                  <span className="text-[10px] font-black text-white">{stats.users.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-400">Pending</span>
                  <span className="text-[10px] font-black text-[#ffd066]">{stats.transactions.pending_recharges + stats.transactions.pending_withdrawals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-400">Revenue</span>
                  <span className="text-[10px] font-black text-emerald-400">${stats.transactions.total_deposited.toFixed(0)}</span>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* Tab Header */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {TABS.find((t) => t.key === activeTab)?.icon}{" "}
              {TABS.find((t) => t.key === activeTab)?.label}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {activeTab === "dashboard" && "Platform overview and key performance indicators"}
              {activeTab === "users" && "Manage all registered users, balances and permissions"}
              {activeTab === "transactions" && "Review and approve/reject recharge & withdrawal requests"}
              {activeTab === "tasks" && "Create, edit and manage earning tasks for users"}
              {activeTab === "feed" && "Manage public activity announcements shown on dashboard"}
            </p>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "dashboard" && <DashboardTab stats={statsLoading ? null : stats} />}
              {activeTab === "users" && <UsersTab showToast={showToast} />}
              {activeTab === "transactions" && <TransactionsTab showToast={showToast} />}
              {activeTab === "tasks" && <TasksTab showToast={showToast} />}
              {activeTab === "feed" && <ActivityFeedTab showToast={showToast} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toast msg={toast} />
    </div>
  );
}
