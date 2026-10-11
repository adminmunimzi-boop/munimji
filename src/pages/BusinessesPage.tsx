import React from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Plus, ArrowRight, ChevronRight, CheckCircle2, Sparkles, FolderPlus } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContext';

export const BusinessesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const outletContext = useOutletContext<{ openAddBusinessModal?: () => void }>();
  const { businesses, seedSampleData } = useBusiness();

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const formatLakhs = (amt: number) => {
    if (amt >= 10000000) {
      return `₹${(amt / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(amt / 100000).toFixed(1)}L`;
  };

  const handleOpenAddModal = () => {
    if (outletContext?.openAddBusinessModal) {
      outletContext.openAddBusinessModal();
    } else {
      navigate('/businesses/new');
    }
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
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Business</span>
        </button>
      </div>

      {/* Clean Empty State if 0 businesses */}
      {businesses.length === 0 ? (
        <div className="munim-card p-12 text-center border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <FolderPlus className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No businesses added yet</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Get started by adding your first business venture. Track capital, daily manager reports, and watch your recovery journey unfold.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Business</span>
            </button>
            <button
              onClick={seedSampleData}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Load Sample Demo Business</span>
            </button>
          </div>
        </div>
      ) : (
        /* Dynamic Business Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businesses.map((b) => {
            // Calculate deterministic profit and ROI
            let monthlyProfit = 0;
            if (b.pastHistory && b.pastHistory.length > 0) {
              const last = b.pastHistory[b.pastHistory.length - 1];
              monthlyProfit = parseFloat(last.profit) || 0;
            } else {
              monthlyProfit = b.monthlyFixedCosts * 0.3;
            }

            const roiVal = b.initialCapital > 0 
              ? Math.max(0, Math.round(((monthlyProfit * 12) / b.initialCapital) * 100))
              : 0;
            
            // Breakeven progress calculation
            const breakevenProgress = b.investmentRecovered 
              ? 100 
              : Math.min(100, Math.max(10, Math.round((roiVal * 1.5))));

            return (
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
                      <p className="text-xs text-slate-400">{b.industry || 'General Business'} • {b.location || 'India'}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Stable
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Invested</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {formatLakhs(b.initialCapital)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Current Annual ROI</span>
                    <span className="font-bold text-slate-900 text-sm">{roiVal}%</span>
                  </div>
                </div>

                {/* Breakeven Progress */}
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Breakeven Progress</span>
                    <span className="font-bold">{breakevenProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${breakevenProgress}%` }}
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
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
