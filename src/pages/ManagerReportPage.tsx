import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  DollarSign,
  Send,
  Sparkles,
  Clock,
  Shield,
  FileText
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const ManagerReportPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { businesses, managers, addDailyReport, dailyReports } = useBusiness();

  // Query params or default to first manager/business
  const urlManagerId = searchParams.get('managerId');
  const urlBizId = searchParams.get('businessId');

  const [selectedManagerId, setSelectedManagerId] = useState<string>(
    urlManagerId || managers[0]?.id || ''
  );
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>(
    urlBizId || businesses[0]?.id || ''
  );

  const selectedManager = managers.find((m) => m.id === selectedManagerId) || managers[0];
  const selectedBusiness =
    businesses.find((b) => b.id === (selectedManager ? selectedManager.businessId : selectedBusinessId)) ||
    businesses[0];

  // Date
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  // Inflow / Sales
  const [cashSales, setCashSales] = useState<string>('');
  const [digitalSales, setDigitalSales] = useState<string>('');
  const [creditSales, setCreditSales] = useState<string>('');

  // Outflow / Expenses
  const [rawMaterials, setRawMaterials] = useState<string>('');
  const [laborExpenses, setLaborExpenses] = useState<string>('');
  const [utilities, setUtilities] = useState<string>('');
  const [otherExpenses, setOtherExpenses] = useState<string>('');

  // Cash Balancing
  const [closingCash, setClosingCash] = useState<string>('');
  const [bankDeposited, setBankDeposited] = useState<string>('');

  // Operations
  const [billCount, setBillCount] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Auto-calculated totals
  const totalSalesNum =
    (parseFloat(cashSales) || 0) +
    (parseFloat(digitalSales) || 0) +
    (parseFloat(creditSales) || 0);

  const totalExpensesNum =
    (parseFloat(rawMaterials) || 0) +
    (parseFloat(laborExpenses) || 0) +
    (parseFloat(utilities) || 0) +
    (parseFloat(otherExpenses) || 0);

  const netDayProfit = totalSalesNum - totalExpensesNum;

  // Drawer Cash Reconciliation
  const cashSalesVal = parseFloat(cashSales) || 0;
  const cashExpensesVal = totalExpensesNum * 0.5; // estimated cash expenses
  const expectedTill = Math.max(0, cashSalesVal - cashExpensesVal);
  const actualTill = (parseFloat(closingCash) || 0) + (parseFloat(bankDeposited) || 0);
  const tillDiscrepancy = actualTill > 0 && cashSalesVal > 0 ? actualTill - expectedTill : 0;

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBusiness) {
      alert('Please select a valid business.');
      return;
    }

    addDailyReport({
      businessId: selectedBusiness.id,
      businessName: selectedBusiness.name,
      managerId: selectedManager?.id,
      managerName: selectedManager?.name || 'Store Supervisor',
      date: reportDate,
      revenue: totalSalesNum,
      expenses: totalExpensesNum,
      cashCollection: parseFloat(closingCash) || cashSalesVal * 0.6,
      bankCollection: parseFloat(bankDeposited) || (parseFloat(digitalSales) || 0),
      cashSales: parseFloat(cashSales) || 0,
      digitalSales: parseFloat(digitalSales) || 0,
      creditSales: parseFloat(creditSales) || 0,
      rawMaterialExpenses: parseFloat(rawMaterials) || 0,
      laborExpenses: parseFloat(laborExpenses) || 0,
      utilitiesExpenses: parseFloat(utilities) || 0,
      otherExpenses: parseFloat(otherExpenses) || 0,
      closingCashInDrawer: parseFloat(closingCash) || 0,
      discrepancy: Math.round(tillDiscrepancy),
      billCount: parseInt(billCount, 10) || 0,
      outstanding: parseFloat(creditSales) || 0,
      notes: notes.trim(),
      status: Math.abs(tillDiscrepancy) > 500 ? 'Flagged' : 'Verified',
      submittedAt: new Date().toISOString(),
    });

    setSubmittedSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setCashSales('');
    setDigitalSales('');
    setCreditSales('');
    setRawMaterials('');
    setLaborExpenses('');
    setUtilities('');
    setOtherExpenses('');
    setClosingCash('');
    setBankDeposited('');
    setBillCount('');
    setNotes('');
    setSubmittedSuccess(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/managers')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Manager Hub</span>
        </button>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60">
          <Clock className="w-3 h-3 text-emerald-600" />
          <span>Cutoff: {selectedManager?.cutoffTime || '22:00'} hrs</span>
        </span>
      </div>

      {/* Header Banner */}
      <div className="munim-card p-6 bg-white border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-sm">
              म
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Daily Health Report
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                End-of-day operational sales, expenses & cash reconciliation
              </p>
            </div>
          </div>
        </div>

        {/* Manager & Business Selector */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1 text-[11px]">Reporting For Business</label>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>{selectedBusiness?.name || 'No Business Selected'}</span>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1 text-[11px]">Reporting Manager</label>
            {managers.length > 1 ? (
              <select
                value={selectedManager?.id}
                onChange={(e) => setSelectedManagerId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 font-semibold text-slate-900 outline-none focus:border-emerald-600"
              >
                {managers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.businessName})
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 font-bold text-slate-900">
                {selectedManager?.name || 'Owner / Store Supervisor'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {submittedSuccess && (
        <div className="munim-card p-6 bg-emerald-50 border border-emerald-300 text-center space-y-3 animate-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-emerald-950">
            Daily Report Submitted Successfully!
          </h3>
          <p className="text-xs text-emerald-800 max-w-md mx-auto">
            Today's report for <strong>{selectedBusiness?.name}</strong> has been verified and added to the owner's dashboard. Net Profit recorded: <strong>{formatCurrency(netDayProfit)}</strong>.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              View Owner Dashboard
            </button>
            <button
              onClick={handleResetForm}
              className="px-4 py-2 rounded-xl border border-emerald-300 bg-white text-emerald-800 text-xs font-semibold"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      )}

      {/* The Reporting Form */}
      {!submittedSuccess && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date Picker Card */}
          <div className="munim-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <label htmlFor="reportDate" className="text-xs font-bold text-slate-800">
                Report Date
              </label>
            </div>
            <input
              id="reportDate"
              type="date"
              required
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-emerald-600"
            />
          </div>

          {/* Section 1: Sales / Inflow */}
          <div className="munim-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  1. Daily Sales & Customer Inflow
                </h3>
                <p className="text-[11px] text-slate-400">
                  Enter gross collections by payment mode
                </p>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Total: {formatCurrency(totalSalesNum)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Cash Sales (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 11000"
                  value={cashSales}
                  onChange={(e) => setCashSales(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  UPI / QR / Cards (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 7500"
                  value={digitalSales}
                  onChange={(e) => setDigitalSales(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Credit / Udhar Given (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 0"
                  value={creditSales}
                  onChange={(e) => setCreditSales(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Daily Expenses */}
          <div className="munim-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  2. Operational Expenses (Outflow)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Daily procurement and routine shop operating costs
                </p>
              </div>
              <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                Total: {formatCurrency(totalExpensesNum)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Raw Materials / Stock Purchase (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 8000"
                  value={rawMaterials}
                  onChange={(e) => setRawMaterials(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Daily Labor / Helper Wages (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 2500"
                  value={laborExpenses}
                  onChange={(e) => setLaborExpenses(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Utilities / Fuel / Transport (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 700"
                  value={utilities}
                  onChange={(e) => setUtilities(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Petty Cash / Tea / Repairs (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 0"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Cash Balancing & Settlement */}
          <div className="munim-card p-5 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                3. Till Settlement & Bank Deposit
              </h3>
              <p className="text-[11px] text-slate-400">
                Verify physical cash in drawer matches expected closing balance
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Closing Cash In Till / Register (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 4500"
                  value={closingCash}
                  onChange={(e) => setClosingCash(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Cash Deposited / Given to Owner (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 7500"
                  value={bankDeposited}
                  onChange={(e) => setBankDeposited(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>
            </div>

            {/* Reconciliation Helper Banner */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-700">
                  Calculated Day Profit:
                </span>
              </div>
              <span className={`font-bold ${netDayProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {formatCurrency(netDayProfit)}
              </span>
            </div>
          </div>

          {/* Section 4: Operational Remarks & Bill Count */}
          <div className="munim-card p-5 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                4. Operational Footfall & Manager Notes
              </h3>
              <p className="text-[11px] text-slate-400">
                Record staff attendance, footfall, or operational obstacles
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Bill Count / Orders Handled (Optional)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 142 orders"
                  value={billCount}
                  onChange={(e) => setBillCount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Operational Remarks / Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Dinner rush was strong. Dairy vendor delivered on time. Staff attendance full."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Daily Report to Munim Ji</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Submissions are permanently recorded and cannot be deleted by managers.
            </p>
          </div>
        </form>
      )}

      {/* Historical Submissions by this Manager */}
      <div className="munim-card p-5 space-y-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Recent Submissions for {selectedBusiness?.name}</span>
        </h3>

        {dailyReports.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">
            No previous reports recorded.
          </p>
        ) : (
          <div className="space-y-2">
            {dailyReports.slice(0, 5).map((r) => (
              <div
                key={r.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{r.date}</span>
                  <span className="text-slate-400 text-[11px]">
                    Sales: {formatCurrency(r.revenue)} | Exp: {formatCurrency(r.expenses)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] inline-block mb-0.5">
                    {r.status || 'Verified'}
                  </span>
                  <span className="block font-bold text-emerald-600 text-[11px]">
                    +{formatCurrency(r.revenue - r.expenses)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
