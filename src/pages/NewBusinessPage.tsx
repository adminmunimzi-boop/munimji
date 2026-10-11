import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Building2, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const NewBusinessPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addBusiness } = useBusiness();

  // The Fork: 'new' | 'existing'
  const [startType, setStartType] = useState<'new' | 'existing'>('new');

  // Common fields
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [outlets, setOutlets] = useState(1);

  // New Business Fields
  const [initialInvestment, setInitialInvestment] = useState('');
  const [workingCapital, setWorkingCapital] = useState('');
  const [monthlyFixedExpenses, setMonthlyFixedExpenses] = useState('');
  const [expectedRecoveryMonths, setExpectedRecoveryMonths] = useState('24');
  const [breakEvenMonths, setBreakEvenMonths] = useState('12');

  // Existing Business Snapshot Fields
  const [approximateAge, setApproximateAge] = useState('3-5 years');
  const [isProfitable, setIsProfitable] = useState('profitable');
  const [monthlyRevenueMin, setMonthlyRevenueMin] = useState('');
  const [monthlyRevenueMax, setMonthlyRevenueMax] = useState('');
  const [investmentAlreadyRecovered, setInvestmentAlreadyRecovered] = useState(false);
  const [problemArea, setProblemArea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const capital = parseFloat(initialInvestment) || 500000;
    const fixedExpenses = parseFloat(monthlyFixedExpenses) || (capital * 0.1);

    addBusiness({
      name: name.trim(),
      type: startType,
      operatingAge: startType === 'new' ? '0' : approximateAge,
      industry: industry || 'Retail',
      location: location || 'Delhi',
      startDate: new Date().toISOString().split('T')[0],
      initialCapital: capital,
      monthlyFixedCosts: fixedExpenses,
      expectedRecoveryMonths: parseInt(expectedRecoveryMonths, 10) || 24,
      breakEvenMonths: parseInt(breakEvenMonths, 10) || 12,
      riskAppetite: 'Medium',
      investmentRecovered: investmentAlreadyRecovered,
      pastHistory: startType === 'existing' ? [
        { month: 'Month 1', revenue: String(parseFloat(monthlyRevenueMin) || 150000), profit: String((parseFloat(monthlyRevenueMin) || 150000) * 0.2) },
        { month: 'Month 2', revenue: String(parseFloat(monthlyRevenueMax) || 200000), profit: String((parseFloat(monthlyRevenueMax) || 200000) * 0.25) }
      ] : [],
      managerName: 'Owner Managed',
      reportingFrequency: 'Daily',
      enableAlerts: true,
    });

    navigate('/businesses');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <button
        onClick={() => navigate('/businesses')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Businesses</span>
      </button>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create New Business
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Define your business identity and financial baseline
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Onboarding Type Selector */}
        <div className="munim-card p-5 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Select Onboarding Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* New Business */}
            <div
              onClick={() => setStartType('new')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                startType === 'new'
                  ? 'bg-emerald-50 border-emerald-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">
                  New Business
                </span>
                {startType === 'new' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Set up fresh from Day 1 with full investment tracking
              </p>
            </div>

            {/* Existing Business */}
            <div
              onClick={() => setStartType('existing')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                startType === 'existing'
                  ? 'bg-emerald-50 border-emerald-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">
                  Existing Business
                </span>
                {startType === 'existing' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Already running for months/years — 5-minute snapshot setup
              </p>
            </div>
          </div>
        </div>

        {/* 1. Common Identity Fields */}
        <div className="munim-card p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
            1. Business Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Business Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sharma Textiles Pvt Ltd"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Industry *
              </label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Retail, Food & Beverage, Pharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mumbai, Maharashtra"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Number of Outlets
              </label>
              <input
                type="number"
                min="1"
                value={outlets}
                onChange={(e) => setOutlets(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
              />
            </div>
          </div>
        </div>

        {/* 2. Capital Baseline / Snapshot Form */}
        {startType === 'new' ? (
          <div className="munim-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              2. Day 1 Capital Baseline & Recovery Plan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Total Initial Investment (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  placeholder="e.g. 5000000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Monthly Fixed Costs (Rent, Salaries) (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={monthlyFixedExpenses}
                  onChange={(e) => setMonthlyFixedExpenses(e.target.value)}
                  placeholder="e.g. 500000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Expected Investment Recovery Period (Months)
                </label>
                <input
                  type="number"
                  value={expectedRecoveryMonths}
                  onChange={(e) => setExpectedRecoveryMonths(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Break-Even Period (Months)
                </label>
                <input
                  type="number"
                  value={breakEvenMonths}
                  onChange={(e) => setBreakEvenMonths(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="munim-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              2. Existing Business Snapshot (5–6 Questions)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Operating Age
                </label>
                <select
                  value={approximateAge}
                  onChange={(e) => setApproximateAge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                >
                  <option value="Under 1 year">Under 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Current Profitability (Self-reported)
                </label>
                <select
                  value={isProfitable}
                  onChange={(e) => setIsProfitable(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                >
                  <option value="profitable">Consistently Profitable</option>
                  <option value="break_even">Roughly Break-Even</option>
                  <option value="loss">Currently in Loss</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Typical Monthly Revenue Range (₹)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={monthlyRevenueMin}
                    onChange={(e) => setMonthlyRevenueMin(e.target.value)}
                    className="w-1/2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                  <span className="text-slate-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={monthlyRevenueMax}
                    onChange={(e) => setMonthlyRevenueMax(e.target.value)}
                    className="w-1/2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Known Ongoing Problem Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. High customer credit, staff theft"
                  value={problemArea}
                  onChange={(e) => setProblemArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Recovery Suppression Checkbox */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mt-2 flex items-start gap-3">
              <input
                type="checkbox"
                id="recoveryRecovered"
                checked={investmentAlreadyRecovered}
                onChange={(e) => setInvestmentAlreadyRecovered(e.target.checked)}
                className="mt-1 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="recoveryRecovered" className="text-xs text-slate-700 cursor-pointer">
                <span className="font-bold text-slate-900 block">
                  Original Investment Has Already Been Fully Recovered
                </span>
                <span className="text-slate-500">
                  Checking this retires the recovery progress widget from your dashboard so you never see misleading or stale recovery metrics.
                </span>
              </label>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/businesses')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            Save Business
          </button>
        </div>
      </form>
    </div>
  );
};
