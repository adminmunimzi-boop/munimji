import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Plus, ArrowUpRight, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BusinessesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sampleBusinesses = [
    {
      id: '1',
      name: 'Central Bakers',
      type: 'Bakery & Cafe',
      location: 'Connaught Place, New Delhi',
      color: '#3B82F6',
      startType: 'new',
      status: 'active',
      monthlyRevenue: 185000,
      monthlyProfit: 54000,
      recoveryPct: 42,
    },
    {
      id: '2',
      name: 'Metro Textiles',
      type: 'Retail Garments',
      location: 'Chandni Chowk, Delhi',
      color: '#10B981',
      startType: 'existing',
      status: 'active',
      monthlyRevenue: 240000,
      monthlyProfit: 62000,
      investmentRecovered: true, // Recovered! So recovery progress is suppressed
    },
    {
      id: '3',
      name: 'Apex Pharmacy',
      type: 'Medical Retail',
      location: 'Indirapuram, Ghaziabad',
      color: '#8B5CF6',
      startType: 'new',
      status: 'active',
      monthlyRevenue: 310000,
      monthlyProfit: 85000,
      recoveryPct: 68,
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('nav.businesses')}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your independent business operations and baseline profiles
          </p>
        </div>

        <button
          onClick={() => navigate('/businesses/new')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors self-start sm:self-auto shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>{t('business.add_business')}</span>
        </button>
      </div>

      {/* Business Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleBusinesses.map((b) => (
          <div
            key={b.id}
            onClick={() => navigate(`/businesses/${b.id}`)}
            className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group hover:shadow-xl relative overflow-hidden"
          >
            {/* Top Color Accent Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: b.color }}
            />

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">
                    {b.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {b.startType}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{b.type}</p>
                <p className="text-[11px] text-slate-500">{b.location}</p>
              </div>

              <div className="p-2 rounded-xl bg-slate-900 text-slate-400 group-hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Metrics Snapshot */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-400 block">Monthly Revenue</span>
                <span className="text-sm font-bold text-white">
                  {formatCurrency(b.monthlyRevenue)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Monthly Profit</span>
                <span className="text-sm font-bold text-emerald-400">
                  {formatCurrency(b.monthlyProfit)}
                </span>
              </div>
            </div>

            {/* Recovery Progress (Suppressed if recovered!) */}
            <div className="mt-4">
              {b.investmentRecovered ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 py-1.5 px-2.5 rounded-lg border border-emerald-500/20">
                  <span>✓ Investment Fully Recovered</span>
                </div>
              ) : b.recoveryPct !== undefined ? (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Capital Recovery</span>
                    <span className="font-bold text-white">{b.recoveryPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${b.recoveryPct}%`, backgroundColor: b.color }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
