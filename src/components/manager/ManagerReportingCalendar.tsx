import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Calendar as CalendarIcon,
  Plus,
  ShieldCheck,
  Clock,
  Sparkles,
  X,
  FileText,
  Building2,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBusiness, DailyReportItem, StoreClosureItem } from '../../context/BusinessContext';

interface Props {
  businessId: string;
  managerId?: string;
}

export const ManagerReportingCalendar: React.FC<Props> = ({ businessId, managerId }) => {
  const navigate = useNavigate();
  const {
    businesses,
    managers,
    dailyReports,
    storeClosures,
    markStoreClosed,
    removeStoreClosure,
    getDateReportingState,
  } = useBusiness();

  // Current selected month view (default to current month)
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDayModal, setSelectedDayModal] = useState<{
    dateStr: string;
    state: 'submitted' | 'closed' | 'missed' | 'today' | 'future';
    report?: DailyReportItem;
    closure?: StoreClosureItem;
  } | null>(null);

  const [showMarkClosedModal, setShowMarkClosedModal] = useState(false);
  const [markClosedDate, setMarkClosedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [closureReason, setClosureReason] = useState<
    'Weekly Off' | 'Festival / Holiday' | 'Maintenance / Renovation' | 'Emergency' | 'Other'
  >('Weekly Off');
  const [closureNotes, setClosureNotes] = useState('');

  const business = businesses.find((b) => b.id === businessId) || businesses[0];
  const manager = managers.find((m) => m.id === managerId) || managers[0];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // Format Month Year heading (e.g. October 2026)
  const monthName = currentDate.toLocaleString('en-IN', { month: 'long', year: 'numeric' });

  // First day of the month & total days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();

  // Day of week for first day (0 = Sun, 1 = Mon, ..., 6 = Sat).
  // Convert so Monday = 0, Sunday = 6
  let startingDayOfWeek = firstDay.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const formatDayString = (dayNum: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(dayNum).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // Compute month counts for legend
  let submittedCount = 0;
  let missedCount = 0;
  let closedCount = 0;
  let pendingCount = 0;

  for (let d = 1; d <= totalDays; d++) {
    const dStr = formatDayString(d);
    const st = business ? getDateReportingState(business.id, dStr, manager?.cutoffTime) : 'future';
    if (st === 'submitted') submittedCount++;
    else if (st === 'missed') missedCount++;
    else if (st === 'closed') closedCount++;
    else if (st === 'today') pendingCount++;
  }

  const handleCellClick = (dStr: string, state: 'submitted' | 'closed' | 'missed' | 'today' | 'future') => {
    if (state === 'future') return;

    const report = dailyReports.find(
      (r) => r.businessId === business?.id && r.date === dStr
    );
    const closure = storeClosures.find(
      (c) => c.businessId === business?.id && c.date === dStr
    );

    setSelectedDayModal({
      dateStr: dStr,
      state,
      report,
      closure,
    });
  };

  const handleSaveStoreClosed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;

    markStoreClosed({
      businessId: business.id,
      date: markClosedDate,
      reason: closureReason,
      notes: closureNotes.trim() || undefined,
      markedBy: manager?.name || 'Owner',
    });

    setShowMarkClosedModal(false);
    setClosureNotes('');
    if (selectedDayModal) {
      setSelectedDayModal(null);
    }
  };

  const handleRemoveClosure = (closureId: string) => {
    removeStoreClosure(closureId);
    setSelectedDayModal(null);
  };

  return (
    <div className="space-y-4">
      {/* Calendar Control Bar */}
      <div className="munim-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <span>{monthName}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Daily Manager Reporting Discipline for <strong>{business?.name || 'Store'}</strong>
            </p>
          </div>
        </div>

        {/* Month Navigation & Mark Store Closed Action */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => {
              setMarkClosedDate(new Date().toISOString().split('T')[0]);
              setShowMarkClosedModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mark Store Closed</span>
          </button>

          <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-xs overflow-hidden">
            <button
              onClick={prevMonth}
              aria-label="Previous Month"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-800 px-2 select-none">
              {currentDate.toLocaleString('en-IN', { month: 'short' })}
            </span>
            <button
              onClick={nextMonth}
              aria-label="Next Month"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
          <span className="font-bold text-emerald-950">
            🟢 Submitted: {submittedCount} Days
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/80 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-600 shrink-0" />
          <span className="font-bold text-rose-950">
            🔴 Missed: {missedCount} Days
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-500 shrink-0" />
          <span className="font-bold text-slate-800">
            ⚪ Store Closed: {closedCount} Days
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
          <span className="font-bold text-blue-950">
            🔵 Today Pending: {pendingCount} Day
          </span>
        </div>
      </div>

      {/* The 7-Day Grid */}
      <div className="munim-card p-4 sm:p-5 overflow-hidden">
        {/* Day Header Names */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2 text-center text-[11px] sm:text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {/* Grid Cells */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {/* Leading blank padding */}
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="min-h-16 sm:min-h-20 rounded-xl bg-slate-50/40 border border-dashed border-slate-100 opacity-40"
            />
          ))}

          {/* Days of month */}
          {Array.from({ length: totalDays }).map((_, i) => {
            const dayNum = i + 1;
            const dStr = formatDayString(dayNum);
            const state = business
              ? getDateReportingState(business.id, dStr, manager?.cutoffTime)
              : 'future';
            const report = dailyReports.find(
              (r) => r.businessId === business?.id && r.date === dStr
            );
            const closure = storeClosures.find(
              (c) => c.businessId === business?.id && c.date === dStr
            );

            return (
              <div
                key={dStr}
                onClick={() => handleCellClick(dStr, state)}
                className={`min-h-16 sm:min-h-20 rounded-xl p-1.5 sm:p-2 border transition-all flex flex-col justify-between cursor-pointer select-none ${
                  state === 'submitted'
                    ? 'bg-emerald-50/80 hover:bg-emerald-100/90 border-emerald-300 text-emerald-950 shadow-xs'
                    : state === 'missed'
                    ? 'bg-rose-50/80 hover:bg-rose-100/90 border-rose-300 text-rose-950 shadow-xs'
                    : state === 'closed'
                    ? 'bg-slate-100 hover:bg-slate-200/90 border-slate-300 text-slate-700'
                    : state === 'today'
                    ? 'bg-white hover:bg-emerald-50/40 border-2 border-emerald-600 text-slate-900 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-slate-50/50 border-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                {/* Top Number & Status Dot */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs sm:text-sm font-extrabold ${
                      state === 'today' ? 'text-emerald-600' : ''
                    }`}
                  >
                    {dayNum}
                  </span>

                  {state === 'submitted' && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  {state === 'missed' && (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  )}
                  {state === 'closed' && (
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                  )}
                  {state === 'today' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  )}
                </div>

                {/* Bottom Content / Metric Preview */}
                <div className="mt-1">
                  {state === 'submitted' && report && (
                    <div className="leading-tight">
                      <span className="text-[10px] sm:text-xs font-bold text-emerald-800 block truncate">
                        {formatCurrency(report.revenue)}
                      </span>
                      <span className="hidden sm:block text-[9px] text-emerald-600 font-semibold truncate">
                        Verified
                      </span>
                    </div>
                  )}

                  {state === 'missed' && (
                    <div className="leading-tight">
                      <span className="text-[10px] sm:text-xs font-extrabold text-rose-700 block">
                        Missed
                      </span>
                      <span className="hidden sm:block text-[9px] text-rose-500 truncate">
                        No Report
                      </span>
                    </div>
                  )}

                  {state === 'closed' && (
                    <div className="leading-tight">
                      <span className="text-[10px] sm:text-xs font-bold text-slate-700 block truncate">
                        Closed
                      </span>
                      <span className="hidden sm:block text-[9px] text-slate-500 truncate">
                        {closure?.reason || 'Store Off'}
                      </span>
                    </div>
                  )}

                  {state === 'today' && (
                    <div className="leading-tight">
                      <span className="text-[10px] sm:text-xs font-extrabold text-emerald-700 block">
                        Today
                      </span>
                      <span className="hidden sm:block text-[9px] text-slate-500 truncate">
                        Cutoff {manager?.cutoffTime || '22:00'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal 1: Day Details & Resolution */}
      {selectedDayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {selectedDayModal.dateStr}
                </h3>
                <p className="text-xs text-slate-400">
                  {business?.name} • Manager: {manager?.name || 'Supervisor'}
                </p>
              </div>
              <button
                onClick={() => setSelectedDayModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Condition 1: Submitted Report Details */}
            {selectedDayModal.state === 'submitted' && selectedDayModal.report && (
              <div className="space-y-3.5 text-xs">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-emerald-950">
                      Report Submitted & Verified
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold">
                    On-Time
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-400 block">Sales Revenue</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      {formatCurrency(selectedDayModal.report.revenue)}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-400 block">Expenses</span>
                    <span className="font-extrabold text-rose-600 text-sm">
                      {formatCurrency(selectedDayModal.report.expenses)}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">Net Day Profit:</span>
                  <span className="font-extrabold text-emerald-600 text-sm">
                    {formatCurrency(
                      selectedDayModal.report.revenue - selectedDayModal.report.expenses
                    )}
                  </span>
                </div>

                {selectedDayModal.report.notes && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-400 font-bold block mb-1">
                      Manager Notes
                    </span>
                    <p className="text-slate-700">{selectedDayModal.report.notes}</p>
                  </div>
                )}
              </div>
            )}

            {/* Condition 2: Missed Day Resolution */}
            {selectedDayModal.state === 'missed' && (
              <div className="space-y-3.5 text-xs">
                <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-rose-950 block">Missed Daily Report</span>
                    <p className="text-rose-800 text-[11px] mt-0.5">
                      No report was logged by the manager on this date. If the store was actually closed, mark it below to remove the penalty from manager discipline.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => {
                      setMarkClosedDate(selectedDayModal.dateStr);
                      setShowMarkClosedModal(true);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Store Was Closed on this Date</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate(`/manager/report?businessId=${business?.id}&date=${selectedDayModal.dateStr}`);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Backfill Report for this Date</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Condition 3: Store Closed Details */}
            {selectedDayModal.state === 'closed' && (
              <div className="space-y-3.5 text-xs">
                <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Store Closed: {selectedDayModal.closure?.reason || 'Weekly Off'}
                    </span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Marked by {selectedDayModal.closure?.markedBy || 'Manager'}. This day does not drag down sales averages.
                    </p>
                  </div>
                </div>

                {selectedDayModal.closure?.notes && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-400 font-bold block mb-1">
                      Reason / Notes:
                    </span>
                    <p className="text-slate-700">{selectedDayModal.closure.notes}</p>
                  </div>
                )}

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                  {selectedDayModal.closure && (
                    <button
                      onClick={() => handleRemoveClosure(selectedDayModal.closure!.id)}
                      className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                    >
                      Remove Closed Mark
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedDayModal(null)}
                    className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Condition 4: Today Pending */}
            {selectedDayModal.state === 'today' && (
              <div className="space-y-3.5 text-xs">
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-950 block">Today's Operating Day</span>
                    <p className="text-emerald-800 text-[11px] mt-0.5">
                      Manager has until <strong>{manager?.cutoffTime || '22:00'} hrs</strong> to submit today's numbers.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => navigate(`/manager/report?businessId=${business?.id}`)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Submit Today's Report Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setMarkClosedDate(selectedDayModal.dateStr);
                      setShowMarkClosedModal(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
                  >
                    Store is Closed Today
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal 2: Mark Store Closed Form */}
      {showMarkClosedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Mark Store Closed</h3>
              </div>
              <button
                onClick={() => setShowMarkClosedModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStoreClosed} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Closed Date</label>
                <input
                  type="date"
                  required
                  value={markClosedDate}
                  onChange={(e) => setMarkClosedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Closure Reason</label>
                <select
                  value={closureReason}
                  onChange={(e) => setClosureReason(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none bg-white"
                >
                  <option value="Weekly Off">Weekly Off (साप्ताहिक छुट्टी)</option>
                  <option value="Festival / Holiday">Festival / Public Holiday (त्योहार / सरकारी छुट्टी)</option>
                  <option value="Maintenance / Renovation">Maintenance / Renovation (मरम्मत / काम)</option>
                  <option value="Emergency">Emergency / Unforeseen (आपातकालीन कारण)</option>
                  <option value="Other">Other / Owner Decision</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Notes / Remarks (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Scheduled Tuesday market closure..."
                  value={closureNotes}
                  onChange={(e) => setClosureNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none resize-none"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600">
                Marking the store closed preserves the manager's reporting streak and avoids counting this day as missed.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowMarkClosedModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold shadow-xs transition-colors"
                >
                  Mark as Closed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
