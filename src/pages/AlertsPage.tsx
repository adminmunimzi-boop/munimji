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
  X
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { t } = useTranslation();
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const sampleAlerts = [
    {
      id: '1',
      business: 'Central Bakers',
      severity: 'watch',
      title: 'Operating Expenses Spike (+22%)',
      desc: 'Raw material procurement was 22% higher than the 14-day median.',
      financialImpact: 'Estimated margin impact: -4.5%',
      recommendedAction: 'Verify flour and butter bulk invoices with store manager.',
      hasConsultationOption: true,
    },
    {
      id: '2',
      business: 'Metro Textiles',
      severity: 'info',
      title: 'Consistent Daily Reporting (7-Day Streak)',
      desc: 'Manager Rajesh Kumar has submitted all 7 reports on time before 10:00 AM.',
      financialImpact: 'High data confidence achieved.',
      recommendedAction: 'No action needed. Reporting compliance is 100%.',
      hasConsultationOption: false,
    },
  ];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t('nav.alerts')} & Action Recommendations
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Every alert connects to a practical decision and operational next step
        </p>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {sampleAlerts.map((a) => (
          <div
            key={a.id}
            className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-xl ${
                    a.severity === 'critical'
                      ? 'bg-rose-500/20 text-rose-400'
                      : a.severity === 'watch'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {a.severity === 'critical' ? (
                    <ShieldAlert className="w-5 h-5" />
                  ) : a.severity === 'watch' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Info className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {a.business}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        a.severity === 'critical'
                          ? 'bg-rose-500/20 text-rose-300'
                          : a.severity === 'watch'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {a.severity}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-white mt-0.5">{a.title}</h3>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300">{a.desc}</p>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">
                <strong className="text-slate-300">Financial Impact:</strong> {a.financialImpact}
              </div>
              <div className="text-xs text-slate-400">
                <strong className="text-slate-300">Recommended Action:</strong> {a.recommendedAction}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-colors">
                View Business Details
              </button>
              {a.hasConsultationOption && (
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-xs font-semibold text-white transition-colors shadow-sm"
                >
                  Book 1-on-1 Consultation (₹499)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ₹499 Consultation Booking Modal */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel p-6 rounded-2xl border border-slate-700 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => {
                setConsultModalOpen(false);
                setConsultSubmitted(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!consultSubmitted ? (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">
                      Book 1-on-1 Business Consultancy
                    </h3>
                    <p className="text-xs text-amber-400 font-semibold">
                      ₹499 Expert Diagnostic Session
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300">
                  Review your business metrics, expense anomalies, and recovery targets with an experienced business advisor.
                </p>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Preferred Communication Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setContactMethod('whatsapp')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        contactMethod === 'whatsapp'
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('call')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        contactMethod === 'call'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        contactMethod === 'email'
                          ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Phone Number or Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-600/20 transition-all"
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
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-lg text-white">
                  Consultation Request Received!
                </h4>
                <p className="text-xs text-slate-300">
                  Our team will connect with you via {contactMethod.toUpperCase()} at {contactValue} within 2 business hours.
                </p>
                <button
                  onClick={() => {
                    setConsultModalOpen(false);
                    setConsultSubmitted(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold mt-2"
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
