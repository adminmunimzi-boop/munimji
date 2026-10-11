import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Building2, Sparkles, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';

export const NewBusinessPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // The Fork: 'new' | 'existing'
  const [startType, setStartType] = useState<'new' | 'existing'>('new');

  // Common fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [outlets, setOutlets] = useState(1);

  // New Business Fields
  const [initialInvestment, setInitialInvestment] = useState('');
  const [ownerCapital, setOwnerCapital] = useState('');
  const [workingCapital, setWorkingCapital] = useState('');
  const [monthlyFixedExpenses, setMonthlyFixedExpenses] = useState('');
  const [expectedRecoveryMonths, setExpectedRecoveryMonths] = useState('24');

  // Existing Business Snapshot Fields
  const [approximateAge, setApproximateAge] = useState('3-5 years');
  const [isProfitable, setIsProfitable] = useState('profitable');
  const [monthlyRevenueMin, setMonthlyRevenueMin] = useState('');
  const [monthlyRevenueMax, setMonthlyRevenueMax] = useState('');
  const [investmentAlreadyRecovered, setInvestmentAlreadyRecovered] = useState(false);
  const [problemArea, setProblemArea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Persist to Supabase and navigate back to businesses
    navigate('/businesses');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <button
        onClick={() => navigate('/businesses')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Businesses</span>
      </button>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t('business.create_new')}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Define your business identity and financial baseline
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* The Non-Negotiable Fork Selector */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Select Onboarding Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* New Business Option */}
            <div
              onClick={() => setStartType('new')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                startType === 'new'
                  ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">
                  {t('business.new_business')}
                </span>
                {startType === 'new' && (
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {t('business.new_business_desc')}
              </p>
            </div>

            {/* Existing Business Option */}
            <div
              onClick={() => setStartType('existing')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                startType === 'existing'
                  ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">
                  {t('business.existing_business')}
                </span>
                {startType === 'existing' && (
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {t('business.existing_business_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Common Identity Fields */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
            1. Business Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {t('business.name')} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Metro Retail Traders"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {t('business.industry')} *
              </label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Retail, Food & Beverage, Pharma"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {t('business.location')} *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Delhi NCR, Sector 18"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {t('business.outlets')}
              </label>
              <input
                type="number"
                min="1"
                value={outlets}
                onChange={(e) => setOutlets(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Conditional Baseline Form */}
        {startType === 'new' ? (
          /* New Business Capital Baseline */
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
              2. Day 1 Capital Baseline & Recovery Plan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Total Initial Investment (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  placeholder="e.g. 1500000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Working Capital (₹)
                </label>
                <input
                  type="number"
                  value={workingCapital}
                  onChange={(e) => setWorkingCapital(e.target.value)}
                  placeholder="e.g. 300000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Monthly Fixed Expenses (Rent, Salaries) (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={monthlyFixedExpenses}
                  onChange={(e) => setMonthlyFixedExpenses(e.target.value)}
                  placeholder="e.g. 75000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Expected Investment Recovery Period (Months)
                </label>
                <input
                  type="number"
                  value={expectedRecoveryMonths}
                  onChange={(e) => setExpectedRecoveryMonths(e.target.value)}
                  placeholder="e.g. 24"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Existing Business 5-Question Snapshot */
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
              2. Business Snapshot (5–6 Quick Questions)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Operating Age
                </label>
                <select
                  value={approximateAge}
                  onChange={(e) => setApproximateAge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Under 1 year">Under 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Current Profitability (Self-reported)
                </label>
                <select
                  value={isProfitable}
                  onChange={(e) => setIsProfitable(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="profitable">Consistently Profitable</option>
                  <option value="break_even">Roughly Break-Even</option>
                  <option value="loss">Currently in Loss</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Typical Monthly Revenue Range (₹)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={monthlyRevenueMin}
                    onChange={(e) => setMonthlyRevenueMin(e.target.value)}
                    className="w-1/2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-slate-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={monthlyRevenueMax}
                    onChange={(e) => setMonthlyRevenueMax(e.target.value)}
                    className="w-1/2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Known Ongoing Problem Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. High customer credit, staff theft, inventory leakage"
                  value={problemArea}
                  onChange={(e) => setProblemArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Critical Recovery Suppression Checkbox */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 mt-2 flex items-start gap-3">
              <input
                type="checkbox"
                id="recoveryRecovered"
                checked={investmentAlreadyRecovered}
                onChange={(e) => setInvestmentAlreadyRecovered(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-0"
              />
              <label htmlFor="recoveryRecovered" className="text-xs text-slate-300 cursor-pointer">
                <span className="font-bold text-white block">
                  Original Investment Has Already Been Fully Recovered
                </span>
                <span className="text-slate-400">
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
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-blue-600/20"
          >
            Save Business
          </button>
        </div>
      </form>
    </div>
  );
};
