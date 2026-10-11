import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  TrendingUp,
  Percent,
  Activity,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Trophy,
  AlertTriangle,
  Mic,
  Send,
  Building2,
  ChevronDown,
  Info,
  CheckCircle2,
  DollarSign,
  History,
  ShieldCheck,
  X,
  ExternalLink
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

type ChartMode = 'trend' | 'by_business' | 'allocation';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext<{ openAddBusinessModal?: () => void }>();

  const [chartMode, setChartMode] = useState<ChartMode>('trend');
  const [activeDefinition, setActiveDefinition] = useState<string | null>(null);
  const [selectedBusinessFilter, setSelectedBusinessFilter] = useState('All Businesses');
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [savingsModalOpen, setSavingsModalOpen] = useState(false);

  // Chart data matching the screenshot
  const trendData = [
    { month: 'Jan', revenue: 42, profit: 21 },
    { month: 'Feb', revenue: 58, profit: 8 },
    { month: 'Mar', revenue: 60, profit: 8 },
    { month: 'Apr', revenue: 52, profit: 9 },
    { month: 'May', revenue: 52, profit: 6 },
    { month: 'Jun', revenue: 45, profit: 7 },
  ];

  const businessData = [
    { name: 'Priya Foods', revenue: 50, profit: 5.5 },
    { name: 'Shree sai fashion', revenue: 25, profit: 3.0 },
  ];

  const allocationData = [
    { name: 'Priya Foods', capital: 50 },
    { name: 'Shree sai fashion', capital: 10 },
  ];

  const quickQuestions = [
    'Why is profit down this month?',
    'Which business should I invest more in?',
    'Is it the right time to expand?',
    'Show me cash flow concerns',
    "Compare my businesses' performance",
  ];

  const savingsBreakdown = [
    {
      title: 'Overtime & Manpower Hiring Fix',
      business: 'Priya Foods',
      saved: '₹38,000',
      desc: 'Hired part-time baker, eliminating 60 hours of expensive emergency overtime pay.',
    },
    {
      title: 'Supplier Packaging Renegotiation',
      business: 'Shree sai fashion',
      saved: '₹64,000',
      desc: 'Munim Ji alerted packaging costs were 28% above regional averages; renegotiated bulk supplier.',
    },
    {
      title: 'Raw Material Kitchen Waste Reduction',
      business: 'Priya Foods',
      saved: '₹40,000',
      desc: 'Daily dairy inventory reconciliation prevented recurring spoilage losses.',
    },
  ];

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    setAiResponse(
      `Analyzing ${selectedBusinessFilter}: Your current portfolio shows steady operational profit of ₹8.5L across Priya Foods and Shree sai fashion. In the last 6 months, you have saved ₹1,42,000 by addressing Munim Ji operational alerts. Priya Foods remains your most capital-efficient business.`
    );
  };

  const handleChipClick = (q: string) => {
    setUserQuery(q);
    setAiResponse(
      `Munim Ji analysis for "${q}": Based on your verified daily manager reports and past 1-year history, Priya Foods has maintained steady 28% gross margins while Shree sai fashion shows positive cash collections. Action recommended: Review seasonal winter stock procurement.`
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Business Portfolio – Today
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Complete overview of all your investments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Last updated: Just now</span>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Invested Capital */}
        <div className="munim-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <span>Total Invested Capital</span>
              <button
                onClick={() => setActiveDefinition(activeDefinition === 'capital' ? null : 'capital')}
                className="text-slate-400 hover:text-slate-600"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
              ₹
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-600 tracking-tight">
              ₹60000.00 Cr
            </div>
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>Across 2 businesses</span>
              <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-medium">
                Source: Baseline Setup
              </span>
            </div>
          </div>
        </div>

        {/* Current Monthly Profit */}
        <div className="munim-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <span>Current Monthly Profit</span>
              <button
                onClick={() => setActiveDefinition(activeDefinition === 'profit' ? null : 'profit')}
                className="text-slate-400 hover:text-slate-600"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-extrabold text-emerald-600 tracking-tight">
                ₹8.5 L
              </div>
              <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                ↗ 12%
              </span>
            </div>
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>vs last month</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                Source: Manager Reports
              </span>
            </div>
          </div>
        </div>

        {/* Average ROI */}
        <div className="munim-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <span>Average ROI</span>
              <button
                onClick={() => setActiveDefinition(activeDefinition === 'roi' ? null : 'roi')}
                className="text-slate-400 hover:text-slate-600"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-600 tracking-tight">
              0.0%
            </div>
            <p className="text-xs text-slate-400 mt-1">Across portfolio</p>
          </div>
        </div>

        {/* Portfolio Health */}
        <div className="munim-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Portfolio Health
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Stable</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Based on Munim Ji analysis</p>
          </div>
        </div>
      </div>

      {/* 2.1 NEW FEATURE: "Saved with Munim Ji" (Value Realization Tracker - Last 6 Months) */}
      <div className="munim-card p-5 bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0 font-bold text-lg">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Value Realization Tracker
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                Last 6 Months
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ₹1,42,000
              </span>
              <span className="text-xs sm:text-sm font-bold text-emerald-700">
                Saved with Munim Ji
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Across 3 resolved operational anomalies, supplier renegotiations, and overtime leakages.
            </p>
          </div>
        </div>

        <button
          onClick={() => setSavingsModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
        >
          <span>View Savings Breakdown</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Savings Breakdown Modal */}
      {savingsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setSavingsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                🏆
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  ₹1,42,000 Saved with Munim Ji
                </h3>
                <p className="text-xs text-slate-400">
                  Documented savings from resolved operational alerts
                </p>
              </div>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {savingsBreakdown.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {item.business}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      +{item.saved} Saved
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSavingsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Munim Ji's Priority Alert Banner */}
      <div className="munim-card p-4 bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-sm text-slate-800">
            <strong className="font-bold text-slate-900 mr-2">
              Munim Ji's Priority Alert
            </strong>
            <span>Your portfolio is performing well. Keep monitoring key metrics.</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/alerts')}
          className="text-xs font-bold text-amber-900 hover:text-amber-700 flex items-center gap-1 shrink-0"
        >
          <span>View Alerts</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. Chart: Revenue & Profit Trend */}
      <div className="munim-card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
          <div className="flex items-center gap-1.5">
            <h3 className="font-extrabold text-base text-slate-900">
              Revenue & Profit Trend (₹L/Month)
            </h3>
            <button
              onClick={() => setActiveDefinition(activeDefinition === 'profit' ? null : 'profit')}
              className="text-slate-400 hover:text-slate-600"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Switcher: Trend | By Business | Allocation */}
          <div className="inline-flex p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setChartMode('trend')}
              className={`px-3 py-1 rounded-md transition-all ${
                chartMode === 'trend'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trend
            </button>
            <button
              onClick={() => setChartMode('by_business')}
              className={`px-3 py-1 rounded-md transition-all ${
                chartMode === 'by_business'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Business
            </button>
            <button
              onClick={() => setChartMode('allocation')}
              className={`px-3 py-1 rounded-md transition-all ${
                chartMode === 'allocation'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Allocation
            </button>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="h-64 sm:h-72 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartMode === 'trend' ? (
              <BarChart data={trendData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: number) => [`₹${val} Lakhs`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} iconType="square" />
                <Bar dataKey="revenue" name="Revenue" fill="#15803d" radius={[4, 4, 0, 0]} maxBarSize={45} />
                <Bar dataKey="profit" name="Profit" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={45} />
              </BarChart>
            ) : chartMode === 'by_business' ? (
              <BarChart data={businessData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                <Bar dataKey="revenue" name="Monthly Revenue" fill="#15803d" radius={[4, 4, 0, 0]} maxBarSize={45} />
                <Bar dataKey="profit" name="Monthly Profit" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={45} />
              </BarChart>
            ) : (
              <BarChart data={allocationData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="capital" name="Invested Capital" fill="#15803d" radius={[4, 4, 0, 0]} maxBarSize={45} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Section: Your Businesses – Journey Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Your Businesses – Journey Status
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">2 businesses</span>
            <button
              onClick={() => {
                if (outletContext?.openAddBusinessModal) {
                  outletContext.openAddBusinessModal();
                } else {
                  navigate('/businesses/new');
                }
              }}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              + Add Another
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Business 1: Priya Foods */}
          <div className="munim-card p-5 munim-card-hover">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Priya Foods</h3>
                  <p className="text-xs text-slate-400">Food Beverage</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Stable
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Invested</span>
                <span className="font-bold text-slate-900 text-sm">₹500000.0L</span>
                <span className="text-[10px] text-slate-400">Source: Day 1 Baseline</span>
              </div>
              <div>
                <span className="text-slate-400 block">Current ROI</span>
                <span className="font-bold text-slate-900 text-sm">0%</span>
                <span className="text-[10px] text-slate-400">Recovery in progress</span>
              </div>
            </div>

            {/* Breakeven Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Breakeven Progress</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full w-0" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => navigate('/businesses/1')}
                className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate('/munim-ai')}
                className="py-2 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Ask</span>
              </button>
            </div>
          </div>

          {/* Business 2: Shree sai fashion */}
          <div className="munim-card p-5 munim-card-hover">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Shree sai fashion</h3>
                  <p className="text-xs text-slate-400">Other</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Stable
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Invested</span>
                <span className="font-bold text-slate-900 text-sm">₹100000.0L</span>
                <span className="text-[10px] text-slate-400">Source: 1-Year History</span>
              </div>
              <div>
                <span className="text-slate-400 block">Current ROI</span>
                <span className="font-bold text-slate-900 text-sm">0%</span>
                <span className="text-[10px] text-slate-400">Recovery in progress</span>
              </div>
            </div>

            {/* Breakeven Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Breakeven Progress</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full w-0" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => navigate('/businesses/2')}
                className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate('/munim-ai')}
                className="py-2 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Ask</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Section: What Munim Ji Recommends Today */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
            What Munim Ji Recommends Today
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Actionable insights for your portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recommendation 1 */}
          <div className="munim-card p-5 munim-card-hover space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Priya foods
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-0.5">
                  Growth opportunity identified
                </h3>
              </div>
              <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Monthly Impact</span>
                <span className="font-bold text-slate-900 text-sm">₹250000.0L</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>90% confidence</span>
              </div>
            </div>

            <div className="text-xs text-slate-600">
              <span className="text-slate-400 block text-[11px]">Recommended Action</span>
              <span>Consider expanding to new market segments</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider">
                High Priority
              </span>
              <button
                onClick={() => navigate('/alerts')}
                className="text-xs font-bold text-slate-800 hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                <span>Take Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Recommendation 2 */}
          <div className="munim-card p-5 munim-card-hover space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Shree sai fashion
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-0.5">
                  Growth opportunity identified
                </h3>
              </div>
              <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Monthly Impact</span>
                <span className="font-bold text-slate-900 text-sm">₹50000.0L</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>80% confidence</span>
              </div>
            </div>

            <div className="text-xs text-slate-600">
              <span className="text-slate-400 block text-[11px]">Recommended Action</span>
              <span>Consider expanding to new market segments</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Medium
              </span>
              <button
                onClick={() => navigate('/alerts')}
                className="text-xs font-bold text-slate-800 hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                <span>Take Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Section: Portfolio Insights */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
          Portfolio Insights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Best Performing */}
          <div className="munim-card p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Best Performing</span>
              <h4 className="font-bold text-sm text-slate-900">Priya Foods</h4>
              <span className="text-xs text-emerald-600 font-bold">0% ROI</span>
            </div>
          </div>

          {/* Needs Attention */}
          <div className="munim-card p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Needs Attention</span>
              <h4 className="font-bold text-sm text-slate-900">Shree sai fashion</h4>
              <span className="text-xs text-rose-500 font-semibold">Monitor closely</span>
            </div>
          </div>

          {/* Most Capital Efficient */}
          <div className="munim-card p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Most Capital Efficient</span>
              <h4 className="font-bold text-sm text-slate-900">Priya Foods</h4>
              <span className="text-xs text-emerald-600 font-bold">0.00 ROI/Lakh</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Section: Ask Munim Ji */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Ask Munim Ji
          </h2>
        </div>

        <div className="munim-card p-5 sm:p-6 space-y-4">
          {/* Business Selector Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white shadow-xs cursor-pointer">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedBusinessFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(q)}
                className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* AI Response Display */}
          {aiResponse && (
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-800 leading-relaxed space-y-2 animate-in fade-in">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Munim Ji Insights:</span>
              </div>
              <p>{aiResponse}</p>
            </div>
          )}

          {/* Input Box */}
          <form onSubmit={handleAskSubmit} className="relative flex items-center">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask Munim Ji about any of your businesses..."
              className="w-full py-3.5 pl-4 pr-24 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-600 transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-2 flex items-center gap-1.5">
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                title="Voice input (planned)"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
