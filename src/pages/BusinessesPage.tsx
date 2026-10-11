import React from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Plus, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export const BusinessesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const outletContext = useOutletContext<{ openAddBusinessModal?: () => void }>();

  const sampleBusinesses = [
    {
      id: '1',
      name: 'Priya Foods',
      type: 'Food Beverage',
      location: 'Connaught Place, New Delhi',
      color: '#16a34a',
      startType: 'new',
      status: 'Stable',
      invested: '₹500000.0L',
      roi: '0%',
      breakevenProgress: 0,
      monthlyRevenue: 185000,
      monthlyProfit: 54000,
    },
    {
      id: '2',
      name: 'Shree sai fashion',
      type: 'Other',
      location: 'Chandni Chowk, Delhi',
      color: '#16a34a',
      startType: 'existing',
      status: 'Stable',
      invested: '₹100000.0L',
      roi: '0%',
      breakevenProgress: 0,
      monthlyRevenue: 240000,
      monthlyProfit: 62000,
    },
  ];

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Businesses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your independent business operations and journey baselines
          </p>
        </div>

        <button
          onClick={() => {
            if (outletContext?.openAddBusinessModal) {
              outletContext.openAddBusinessModal();
            } else {
              navigate('/businesses/new');
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Business</span>
        </button>
      </div>

      {/* Business Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleBusinesses.map((b) => (
          <div
            key={b.id}
            className="munim-card p-5 munim-card-hover space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{b.name}</h3>
                  <p className="text-xs text-slate-400">{b.type}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                {b.status}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Invested</span>
                <span className="font-bold text-slate-900 text-sm">{b.invested}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Current ROI</span>
                <span className="font-bold text-slate-900 text-sm">{b.roi}</span>
              </div>
            </div>

            {/* Breakeven Progress */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Breakeven Progress</span>
                <span className="font-bold">{b.breakevenProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${b.breakevenProgress}%` }}
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => navigate(`/businesses/${b.id}`)}
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
  );
};
