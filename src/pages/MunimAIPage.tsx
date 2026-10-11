import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Send, ShieldAlert, CheckCircle2, HelpCircle, ArrowRight, Mic } from 'lucide-react';

export const MunimAIPage: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'munim'; text: string; confidence?: string }>>([
    {
      sender: 'munim',
      text: 'Namaste! I am Munim Ji, your Personal Business Manager. I analyze your structured manager reports to provide plain-language health verdicts and recommend actionable next steps. Currently, your accounts are in the calibration period (14 reports collected). How can I assist you today?',
      confidence: 'High',
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setQuery('');

    // Simulated response grounded in business metrics
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'munim',
          text: `Based on your recent daily health reports for Priya Foods and Shree sai fashion, total monthly collections stand at ₹8,50,000 with steady operating profit. Priya Foods is your most capital-efficient business with zero overdue customer debt. Recommended Next Step: Maintain current raw-material inventory controls and review weekly sales trends.`,
          confidence: 'Calibrated (Data Quality: Good)',
        },
      ]);
    }, 500);
  };

  const sampleQuestions = [
    'Why is profit down this month?',
    'Which business should I invest more in?',
    'Is it the right time to expand?',
    'Show me cash flow concerns',
    "Compare my businesses' performance",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ask Munim Ji
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Evidence-grounded intelligence from your daily manager reports
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => setQuery(q)}
            className="shrink-0 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs text-slate-600 font-medium transition-all text-left shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="munim-card p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-bl-none'
                }`}
              >
                {m.sender === 'munim' && (
                  <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-200/70">
                    <span className="font-bold text-xs text-emerald-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Munim Ji AI
                    </span>
                    {m.confidence && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-100/70 font-semibold px-2 py-0.5 rounded-full">
                        {m.confidence}
                      </span>
                    )}
                  </div>
                )}
                <p className="whitespace-pre-line">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Munim Ji about revenue, profits, recovery, or manager performance..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 placeholder-slate-400 transition-all"
          />
          <button
            type="button"
            className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="submit"
            className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shrink-0 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
