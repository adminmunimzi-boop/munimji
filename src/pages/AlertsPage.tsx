import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  Info,
  ShieldAlert,
  ArrowRight,
  PhoneCall,
  MessageCircle,
  Mail,
  CheckCircle2,
  X,
  Users,
  Package,
  Clock,
  TrendingDown,
  DollarSign
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { t } = useTranslation();
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const operationalAlerts = [
    {
      id: '1',
      business: 'Priya Foods',
      type: 'Manpower & Hiring',
      severity: 'critical',
      icon: Users,
      title: 'Delayed Hiring Causing Overtime Surge',
      desc: '1 vacant baker role is forcing 60 extra overtime hours onto existing staff at 1.5x pay rates.',
      monthlyLoss: '₹18,500 / month',
      potentialSavings: '₹14,000 / month',
      recommendedAction: 'Hire 1 part-time kitchen assistant immediately to normalize shift hours.',
      hasConsultationOption: true,
    },
    {
      id: '2',
      business: 'Priya Foods',
      type: 'Operations & Inventory',
      severity: 'watch',
      icon: Package,
      title: 'Perishable Dairy Inventory Spoilage',
      desc: 'Daily dairy procurement exceeded historical consumption by 18%, causing unrecorded shelf waste.',
      monthlyLoss: '₹24,000 / month',
      potentialSavings: '₹20,000 / month',
      recommendedAction: 'Mandate daily batch cold-storage reconciliation before closing daily report.',
      hasConsultationOption: false,
    },
    {
      id: '3',
      business: 'Shree sai fashion',
      type: 'Operations & Manpower',
      severity: 'watch',
      icon: Clock,
      title: 'Evening Peak-Hour Counter Bottleneck',
      desc: 'Only 1 cashier active during 7:00 PM – 9:30 PM peak footfall, causing customer checkout drop-offs.',
      monthlyLoss: '₹32,000 / month in lost counter sales',
      potentialSavings: '₹30,000 / month',
      recommendedAction: 'Cross-train 1 floor staff member to operate secondary billing POS during peak evenings.',
      hasConsultationOption: true,
    },
  ];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Operational Alerts & Loss Prevention
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Munim Ji monitors hiring, manpower, and expense leaks to preserve your monthly profits
        </p>
      </div>

      {/* Value Protection Banner */}
      <div className="munim-card p-4 bg-emerald-50/60 border border-emerald-200 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            ₹
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Total Potential Savings Identified: ₹64,000 / Month
            </h4>
            <p className="text-[11px] text-slate-600">
              Fixing these 3 operational & hiring bottlenecks recovers ~₹7.68 Lakhs in annual profit.
            </p>
          </div>
        </div>
      </div>

      {/* Operational Alerts List */}
      <div className="space-y-4">
        {operationalAlerts.map((a) => {
          const IconComp = a.icon;
          return (
            <div
              key={a.id}
              className="munim-card p-5 space-y-3 relative overflow-hidden munim-card-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      a.severity === 'critical'
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {a.business}
                      </span>
                      <span className="text-[10px] text-slate-400">• {a.type}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          a.severity === 'critical'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {a.severity}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mt-0.5">{a.title}</h3>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{a.desc}</p>

              {/* Exact Monetary Loss & Potential Savings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80">
                  <span className="text-[11px] font-semibold text-rose-700 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Identified Monthly Loss
                  </span>
                  <span className="text-sm font-extrabold text-rose-800 block mt-0.5">
                    {a.monthlyLoss}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Recoverable Monthly Savings
                  </span>
                  <span className="text-sm font-extrabold text-emerald-800 block mt-0.5">
                    {a.potentialSavings}
                  </span>
                </div>
              </div>

              {/* Actionable Guidance */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <strong className="text-slate-900">Recommended Operational Fix:</strong>{' '}
                {a.recommendedAction}
              </div>

              {/* Actions Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => alert(`Operational instructions logged for ${a.business} store manager!`)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                >
                  Apply Fix to Manager Roster
                </button>
                {a.hasConsultationOption && (
                  <button
                    onClick={() => setConsultModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition-colors shadow-xs"
                  >
                    Discuss with Business Expert (₹499)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ₹499 Consultation Booking Modal */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => {
                setConsultModalOpen(false);
                setConsultSubmitted(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!consultSubmitted ? (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Book 1-on-1 Business Consultancy
                    </h3>
                    <p className="text-xs text-emerald-600 font-bold">
                      ₹499 Expert Diagnostic Session
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Review your manpower bottlenecks, expense leaks, and hiring plans with a retail & SME business strategist.
                </p>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Preferred Communication Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setContactMethod('whatsapp')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        contactMethod === 'whatsapp'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('call')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        contactMethod === 'call'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-600" />
                      <span>Call Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        contactMethod === 'email'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Mail className="w-4 h-4 text-emerald-600" />
                      <span>Email</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phone Number or Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    Confirm Consultation Request (₹499)
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Payment collected via UPI / Razorpay link upon schedule confirmation
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-extrabold text-lg text-slate-900">
                  Consultation Request Received!
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team will connect with you via {contactMethod.toUpperCase()} at <strong>{contactValue}</strong> within 2 business hours.
                </p>
                <button
                  onClick={() => {
                    setConsultModalOpen(false);
                    setConsultSubmitted(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold mt-2 hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
