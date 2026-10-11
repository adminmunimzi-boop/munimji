import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Sparkles,
  Info,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar
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

type ChartMode = 'trend' | 'by_business' | 'capital';

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [chartMode, setChartMode] = useState<ChartMode>('trend');
  const [activeDefinition, setActiveDefinition] = useState<string | null>(null);

  // Mock data for initial rendering
  const trendData = [
    { name: 'Mon', revenue: 45000, profit: 12000, expenses: 33000 },
    { name: 'Tue', revenue: 52000, profit: 16000, expenses: 36000 },
    { name: 'Wed', revenue: 48000, profit: 14000, expenses: 34000 },
    { name: 'Thu', revenue: 61000, profit: 21000, expenses: 40000 },
    { name: 'Fri', revenue: 75000, profit: 28000, expenses: 47000 },
    { name: 'Sat', revenue: 92000, profit: 37000, expenses: 55000 },
    { name: 'Sun', revenue: 84000, profit: 32000, expenses: 52000 },
  ];

  const businessProfitData = [
    { name: 'Central Bakers', profitLakhs: 2.4, color: '#3B82F6' },
    { name: 'Metro Textiles', profitLakhs: 1.8, color: '#10B981' },
    { name: 'Apex Pharmacy', profitLakhs: 3.1, color: '#8B5CF6' },
  ];

  const capitalAllocationData = [
    { name: 'Central Bakers', capitalLakhs: 15.0, color: '#3B82F6' },
    { name: 'Metro Textiles', capitalLakhs: 25.0, color: '#10B981' },
    { name: 'Apex Pharmacy', capitalLakhs: 18.0, color: '#8B5CF6' },
  ];

  const formatCurrencyINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('dashboard.title')}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Quick Date Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span>{new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Honest AI Calibration / Learning Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border border-blue-500/30 flex items-start sm:items-center gap-3.5">
        <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
          <Sparkles className="w-5 h-5 text-amber-300" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white">
              {t('dashboard.learning_period')}
            </h4>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Calibration Active
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            {t('dashboard.learning_period_desc')}
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Invested Capital */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              {t('dashboard.total_invested')}
              <button
                onClick={() => setActiveDefinition(activeDefinition === 'recovery' ? null : 'recovery')}
                className="text-slate-500 hover:text-slate-300"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">
              {formatCurrencyINR(5800000)}
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span>Across 3 active businesses</span>
            </div>
          </div>
        </div>

        {/* Current Revenue */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              {t('dashboard.current_revenue')}
              <button
                onClick={() => setActiveDefinition(activeDefinition === 'revenue' ? null : 'revenue')}
                className="text-slate-500 hover:text-slate-300"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-400">
              {formatCurrencyINR(456000)}
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-semibold">+14.2%</span>
              <span>vs previous 7 days</span>
            </div>
          </div>
        </div>

        {/* Current Estimated Profit */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              {t('dashboard.current_profit')}
              <button
                onClick={() => setActiveDefinition(activeDefinition === 'profit' ? null : 'profit')}
                className="text-slate-500 hover:text-slate-300"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white">
              {formatCurrencyINR(160000)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              <span>Operating Profit margin: ~35%</span>
            </div>
          </div>
        </div>

        {/* Critical Businesses */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              {t('dashboard.critical_businesses')}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-400">
              0 Critical
            </div>
            <div className="text-xs text-slate-400 mt-1">
              <span>All 3 businesses healthy & stable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Definition Popup Modal (if an (i) icon is clicked) */}
      {activeDefinition && (
        <div className="p-3.5 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-start justify-between text-xs text-blue-200 animate-in fade-in">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <span>{t(`definitions.${activeDefinition}`)}</span>
          </div>
          <button
            onClick={() => setActiveDefinition(null)}
            className="text-blue-400 hover:text-white font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* The Single Vertical Bar Chart with Mode Switch */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base text-white">
              {chartMode === 'trend' && t('chart.mode_revenue_profit')}
              {chartMode === 'by_business' && t('chart.mode_profit_by_business')}
              {chartMode === 'capital' && t('chart.mode_capital')}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live updates based on manager reports
            </p>
          </div>

          {/* Chart Mode Switch Buttons */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setChartMode('trend')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                chartMode === 'trend'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Trends
            </button>
            <button
              onClick={() => setChartMode('by_business')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                chartMode === 'by_business'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              By Business
            </button>
            <button
              onClick={() => setChartMode('capital')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                chartMode === 'capital'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Capital
            </button>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartMode === 'trend' ? (
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  formatter={(val: number) => [formatCurrencyINR(val), '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="revenue" fill="#3B82F6" name={t('chart.revenue')} radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#10B981" name={t('chart.profit')} radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : chartMode === 'by_business' ? (
              <BarChart data={businessProfitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `₹${val}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  formatter={(val: number) => [`₹${val} Lakhs`, 'Monthly Profit']}
                />
                <Bar dataKey="profitLakhs" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <BarChart data={capitalAllocationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `₹${val}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  formatter={(val: number) => [`₹${val} Lakhs`, 'Initial Capital']}
                />
                <Bar dataKey="capitalLakhs" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
