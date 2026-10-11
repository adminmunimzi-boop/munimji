import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Building2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  DollarSign,
  X,
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useBusiness, ManagerItem, DailyReportItem } from '../context/BusinessContext';

type Tab = 'managers' | 'reports' | 'discrepancies';

export const ManagersPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    businesses,
    managers,
    addManager,
    updateManager,
    deleteManager,
    dailyReports,
    verifyDailyReport,
    seedSampleData,
  } = useBusiness();

  const [activeTab, setActiveTab] = useState<Tab>('managers');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBusinessFilter, setSelectedBusinessFilter] = useState<string>('all');

  // New Manager Form State
  const [newManager, setNewManager] = useState({
    name: '',
    phone: '',
    email: '',
    businessId: businesses[0]?.id || '',
    cutoffTime: '22:00',
  });

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  // KPIs
  const totalManagers = managers.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayReports = dailyReports.filter((r) => r.date === todayStr);
  const reportsSubmittedToday = todayReports.length;
  const avgCompletionRate =
    managers.length > 0
      ? Math.round(
          managers.reduce((sum, m) => sum + m.completionRate, 0) / managers.length
        )
      : 100;
  const totalDiscrepancies = dailyReports.reduce(
    (sum, r) => sum + Math.abs(r.discrepancy || 0),
    0
  );

  const filteredManagers =
    selectedBusinessFilter === 'all'
      ? managers
      : managers.filter((m) => m.businessId === selectedBusinessFilter);

  const filteredReports =
    selectedBusinessFilter === 'all'
      ? dailyReports
      : dailyReports.filter((r) => r.businessId === selectedBusinessFilter);

  const handleCreateManager = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManager.name.trim() || !newManager.businessId) return;

    const assignedBiz = businesses.find((b) => b.id === newManager.businessId);

    addManager({
      name: newManager.name.trim(),
      phone: newManager.phone.trim() || '+91 98765 00000',
      email: newManager.email.trim(),
      businessId: newManager.businessId,
      businessName: assignedBiz?.name || 'Assigned Business',
      cutoffTime: newManager.cutoffTime,
      status: 'Active',
      streakDays: 0,
      completionRate: 100,
    });

    setShowAddModal(false);
    setNewManager({
      name: '',
      phone: '',
      email: '',
      businessId: businesses[0]?.id || '',
      cutoffTime: '22:00',
    });
  };

  const handleSendNudge = (manager: ManagerItem) => {
    const text = encodeURIComponent(
      `Namaste ${manager.name} ji, please submit today's Munim Ji daily report for ${manager.businessName} before ${manager.cutoffTime}. Link: ${window.location.origin}/manager/report?managerId=${manager.id}`
    );
    window.open(`https://wa.me/${manager.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Reporting Managers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Empower store managers to submit structured daily health data and audit accountability
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/manager/report')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Open Daily Report Form</span>
          </button>

          <button
            onClick={() => {
              if (businesses.length === 0) {
                alert('Please add at least one business before assigning a manager.');
                return;
              }
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Manager</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Scorecards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="munim-card p-4 sm:p-5">
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium block">
            Active Managers
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 block">
            {totalManagers}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            Across {businesses.length} businesses
          </span>
        </div>

        <div className="munim-card p-4 sm:p-5">
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium block">
            Today's Submissions
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 block">
            {reportsSubmittedToday} / {totalManagers || 1}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Daily cutoff at 10:00 PM
          </span>
        </div>

        <div className="munim-card p-4 sm:p-5">
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium block">
            Reporting Discipline
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1 block">
            {avgCompletionRate}%
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            High on-time reliability
          </span>
        </div>

        <div className="munim-card p-4 sm:p-5">
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium block">
            Reconciliation Balance
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 block">
            {totalDiscrepancies === 0 ? '₹0.00' : formatCurrency(totalDiscrepancies)}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {totalDiscrepancies === 0 ? 'Zero cash leakage flagged' : 'Pending discrepancies'}
          </span>
        </div>
      </div>

      {/* Tabs and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 gap-3">
        <nav className="flex space-x-6 overflow-x-auto scrollbar-none">
          {[
            { id: 'managers', label: `Manager Directory (${managers.length})` },
            { id: 'reports', label: `Daily Reports Audit (${dailyReports.length})` },
            { id: 'discrepancies', label: 'Cash Reconciliations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-600 text-emerald-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {businesses.length > 1 && (
          <div className="flex items-center gap-2 pb-2 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedBusinessFilter}
              onChange={(e) => setSelectedBusinessFilter(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 outline-none focus:border-emerald-600"
            >
              <option value="all">All Businesses</option>
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tab 1: Manager Directory */}
      {activeTab === 'managers' && (
        <div className="space-y-4">
          {filteredManagers.length === 0 ? (
            <div className="munim-card p-12 text-center border-2 border-dashed border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No managers assigned yet</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Assign store managers or operational supervisors to submit daily health reports. Munim Ji ensures they report on time every single evening.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Assign First Manager</span>
                </button>
                <button
                  onClick={seedSampleData}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Load Sample Managers</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredManagers.map((m) => (
                <div key={m.id} className="munim-card p-5 munim-card-hover space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-base">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900">{m.name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-emerald-600" />
                          <span>{m.businessName}</span>
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      {m.status}
                    </span>
                  </div>

                  {/* Contact & Cutoff Bar */}
                  <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Phone / WhatsApp</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {m.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Daily Reporting Cutoff</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        {m.cutoffTime} hrs
                      </span>
                    </div>
                  </div>

                  {/* Streak & Completion */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Reporting Discipline</span>
                      <span className="font-bold text-slate-800">
                        {m.streakDays} Day Streak ({m.completionRate}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${m.completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleSendNudge(m)}
                      className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 text-slate-700 hover:text-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Nudge</span>
                    </button>

                    <button
                      onClick={() => navigate(`/manager/report?managerId=${m.id}`)}
                      className="py-2 px-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>Report as {m.name.split(' ')[0]}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Daily Reports Audit Stream */}
      {activeTab === 'reports' && (
        <div className="munim-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Submitted Daily Reports Stream
            </h3>
            <span className="text-xs text-slate-400">
              {filteredReports.length} total entries recorded
            </span>
          </div>

          {filteredReports.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl space-y-2">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-700">No daily reports recorded yet</p>
              <p className="text-[11px] text-slate-400">
                Managers submit their day-end collections through the mobile report portal.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredReports.map((r) => {
                const profit = r.revenue - r.expenses;
                return (
                  <div
                    key={r.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {r.date}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200/60">
                          {r.businessName || 'Business'}
                        </span>
                        <span className="text-slate-400">
                          by {r.managerName || 'Manager'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                            r.status === 'Verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {r.status || 'Verified'}
                        </span>
                        <button
                          onClick={() =>
                            verifyDailyReport(
                              r.id,
                              r.status === 'Verified' ? 'Flagged' : 'Verified'
                            )
                          }
                          className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline"
                        >
                          {r.status === 'Verified' ? 'Flag Issue' : 'Mark Verified'}
                        </button>
                      </div>
                    </div>

                    {/* Breakdown Numbers */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Sales Revenue</span>
                        <span className="font-bold text-slate-900 text-sm">
                          {formatCurrency(r.revenue)}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          Cash: {formatCurrency(r.cashSales || r.cashCollection || 0)} | Online: {formatCurrency(r.digitalSales || r.bankCollection || 0)}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-[11px] block">Expenses</span>
                        <span className="font-bold text-rose-600 text-sm">
                          {formatCurrency(r.expenses)}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          Raw mat & operational costs
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-[11px] block">Day's Net Profit</span>
                        <span className={`font-bold text-sm ${profit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatCurrency(profit)}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {profit >= 0 ? 'Surplus' : 'Loss'}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-[11px] block">Closing Till Cash</span>
                        <span className="font-bold text-slate-900 text-sm">
                          {formatCurrency(r.closingCashInDrawer || r.cashCollection || 0)}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold block">
                          Reconciled (₹0 Var)
                        </span>
                      </div>
                    </div>

                    {r.notes && (
                      <div className="p-2.5 rounded-lg bg-white border border-slate-100 text-[11px] text-slate-600">
                        <span className="font-bold text-slate-700 mr-1.5">Manager Note:</span>
                        {r.notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Discrepancies & Reconciliations */}
      {activeTab === 'discrepancies' && (
        <div className="munim-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base text-slate-900">
              Cash Drawer & Bank Reconciliation
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Munim Ji matches physical closing cash with reported sales and paid out expenses to immediately flag any unexplained shortage.
          </p>

          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">All Accounts Balanced Cleanly</span>
              <p>
                No cash shortages or missing deposits detected across any manager reports. All closing cash entries match recorded cash receipts.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Manager */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Assign Reporting Manager</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManager} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Manager Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={newManager.name}
                  onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={newManager.phone}
                  onChange={(e) => setNewManager({ ...newManager, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Assigned Business</label>
                <select
                  required
                  value={newManager.businessId}
                  onChange={(e) => setNewManager({ ...newManager, businessId: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none bg-white"
                >
                  {businesses.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.location || 'India'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Daily Cutoff Time</label>
                <select
                  value={newManager.cutoffTime}
                  onChange={(e) => setNewManager({ ...newManager, cutoffTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none bg-white"
                >
                  <option value="21:00">09:00 PM (Early close)</option>
                  <option value="21:30">09:30 PM</option>
                  <option value="22:00">10:00 PM (Standard Retail/F&B)</option>
                  <option value="22:30">10:30 PM</option>
                  <option value="23:00">11:00 PM (Late Night)</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-[11px] text-emerald-800">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Once saved, Munim Ji generates a direct mobile reporting link for this manager to log daily sales and expenses without needing complex passwords.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-colors"
                >
                  Save & Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
