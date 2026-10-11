import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useBusiness } from '@/context/BusinessContext';
import { useAuth } from '@/context/AuthContext';
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
  Plus,
  RefreshCw,
  FolderPlus,
  X
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
  const { user } = useAuth();
  const { businesses, stats, seedSampleData, clearAllData } = useBusiness();

  const [chartMode, setChartMode] = useState<ChartMode>('trend');
  const [activeDefinition, setActiveDefinition] = useState<string | null>(null);
  const [selectedBusinessFilter, setSelectedBusinessFilter] = useState('All Businesses');
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [savingsModalOpen, setSavingsModalOpen] = useState(false);

  // Dynamic Chart Data from real state
  const trendData = stats.chartTrendData.length > 0 ? stats.chartTrendData : [
    { month: 'No Data', revenue: 0, profit: 0 }
  ];

  const businessData = businesses.map((b) => ({
    name: b.name,
    revenue: Math.round(((b.monthlyFixedCosts * 1.3) / 100000) * 10) / 10,
    profit: Math.round(((b.monthlyFixedCosts * 0.3) / 100000) * 10) / 10,
  }));

  const allocationData = businesses.map((b) => ({
    name: b.name,
    capital: Math.round((b.initialCapital / 100000) * 10) / 10,
  }));

  const quickQuestions = [
    'Why is profit down this month?',
    'Which business should I invest more in?',
    'Is it the right time to expand?',
    'Show me cash flow concerns',
    "Compare my businesses' performance",
  ];

  const formatCurrency = (amt: number) => {
    if (amt >= 10000000) {
      return `₹${(amt / 10000000).toFixed(2)} Cr`;
    }
    if (amt >= 100000) {
      return `₹${(amt / 100000).toFixed(1)} L`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    if (businesses.length === 0) {
      setAiResponse(
        `Munim Ji: You have not added any businesses yet. Please click "+ Add Business" above to input your real figures. Once added, I will provide personalized financial intelligence.`
      );
      return;
    }

    setAiResponse(
      `Analyzing your active businesses (${businesses.map((b) => b.name).join(', ')}): Total monthly operating revenue is ${formatCurrency(
        stats.currentMonthlyRevenue
      )} with estimated profit of ${formatCurrency(stats.currentMonthlyProfit)}. All manager reports are tracked within your Asia/Kolkata cutoff.`
    );
  };

  const handleChipClick = (q: string) => {
    setUserQuery(q);
    if (businesses.length === 0) {
      setAiResponse(
        `Munim Ji: No active business found to answer "${q}". Add a business with past history or daily reports to unlock insights!`
      );
    } else {
      setAiResponse(
        `Munim Ji analysis for "${q}": Based on your entered data for ${businesses[0].name}, your capital recovery is on track. Recommended Action: Review monthly fixed costs.`
      );
    }
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
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Last updated: Just now</span>
          {businesses.length > 0 && (
            <button
              onClick={clearAllData}
              title="Clear all stored data to test clean state"
              className="text-[10px] text-slate-400 hover:text-rose-500 underline ml-2"
            >
              Reset to Empty
            </button>
          )}
        </div>
      </div>

      {/* 2. Top 4 Dynamic Metric Cards */}
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
              {formatCurrency(stats.totalInvested)}
            </div>
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>Across {businesses.length} {businesses.length === 1 ? 'business' : 'businesses'}</span>
              <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-medium">
                {businesses.length > 0 ? 'Source: Real Baseline' : 'No Data'}
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
                {formatCurrency(stats.currentMonthlyProfit)}
              </div>
              {businesses.length > 0 && (
                <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  ↗ Dynamic
                </span>
              )}
            </div>
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>from entered records</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                {businesses.length > 0 ? 'Calculated' : 'No Data'}
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
              {stats.averageROI}%
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {businesses.length > 0 ? 'Across portfolio' : 'Awaiting business setup'}
            </p>
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
            {businesses.length > 0 ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>{stats.health}</span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-slate-400 px-2 py-1 rounded bg-slate-100">
                Awaiting Business Setup
              </span>
            )}
            <p className="text-xs text-slate-400 mt-2">
              {businesses.length > 0 ? 'Based on Munim Ji analysis' : 'Add a business to calibrate'}
            </p>
          </div>
        </div>
      </div>

      {/* CLEAN EMPTY STATE: If user has not created any business yet */}
      {businesses.length === 0 ? (
        <div className="munim-card p-8 sm:p-12 text-center space-y-5 border-2 border-dashed border-emerald-300/80 bg-gradient-to-b from-white to-emerald-50/30">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
            <FolderPlus className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Welcome {user?.name || 'Amit'}! Your Portfolio is Clean
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              No businesses have been added yet. Add your first business (New from Day 1 or Existing with past history) to start seeing real analytics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                if (outletContext?.openAddBusinessModal) {
                  outletContext.openAddBusinessModal();
                } else {
                  navigate('/businesses/new');
                }
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add Your First Business</span>
            </button>

            <button
              onClick={seedSampleData}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
              <span>Or Load 1 Sample Business (Testing)</span>
            </button>
          </div>
        </div>
      ) : (
        /* DYNAMIC POPULATED STATE: Renders only when real businesses exist */
        <>
          {/* Value Realization Tracker */}
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
                    {formatCurrency(stats.totalSaved)}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-700">
                    Saved with Munim Ji
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Across operational anomalies, staff overtime controls, and supplier renegotiations.
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

          {/* Priority Alert Banner */}
          <div className="munim-card p-4 bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm text-slate-800">
                <strong className="font-bold text-slate-900 mr-2">
                  Munim Ji's Priority Alert
                </strong>
                <span>All {businesses.length} businesses operational. Keep monitoring daily manager reports.</span>
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

          {/* 4. Chart: Revenue & Profit Trend (Plots REAL Data) */}
          <div className="munim-card p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-slate-900">
                  Revenue & Profit Trend (₹L/Month)
                </h3>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded">
                  Live Dynamic
                </span>
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
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px' }}
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

          {/* 5. Section: Your Businesses – Dynamic List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Your Businesses – Journey Status
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">
                  {businesses.length} {businesses.length === 1 ? 'business' : 'businesses'}
                </span>
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
              {businesses.map((biz) => (
                <div key={biz.id} className="munim-card p-5 munim-card-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900">{biz.name}</h3>
                        <p className="text-xs text-slate-400">{biz.industry} • {biz.location}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      Stable
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Invested Capital</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {formatCurrency(biz.initialCapital)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Manager: {biz.managerName}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Monthly Fixed Costs</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {formatCurrency(biz.monthlyFixedCosts)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {biz.type === 'new' ? 'New Business' : 'Existing Business'}
                      </span>
                    </div>
                  </div>

                  {/* Breakeven / Recovery Progress */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Capital Recovery Target</span>
                      <span className="font-bold">
                        {biz.investmentRecovered ? 'Fully Recovered ✓' : `${biz.expectedRecoveryMonths} Months Target`}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: biz.investmentRecovered ? '100%' : '35%' }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => navigate(`/businesses/${biz.id}`)}
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
              ))}
            </div>
          </div>
        </>
      )}

      {/* 8. Section: Ask Munim Ji Search Box */}
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
            <span>{businesses.length > 0 ? businesses[0].name : 'All Businesses'}</span>
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
              placeholder="Ask Munim Ji about revenue, profits, recovery, or manager performance..."
              className="w-full py-3.5 pl-4 pr-24 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-600 transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-2 flex items-center gap-1.5">
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                title="Voice input"
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
