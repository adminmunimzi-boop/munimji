import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Send, ShieldAlert, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';

export const MunimAIPage: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'munim'; text: string; confidence?: string }>>([
    {
      sender: 'munim',
      text: 'Namaste! I am Munim Ji, your Personal Business Manager. I analyze your structured manager reports to provide plain-language health verdicts and recommend actionable next steps. Currently, your accounts are in the calibration period (7 reports collected). How can I assist you today?',
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
          text: `Based on your recent reports for Central Bakers and Metro Textiles, total weekly collections were ₹4,56,000 against expenses of ₹2,96,000. Your estimated operating profit is positive (+₹1,60,000). Central Bakers has recovered 42% of its initial capital. Recommendation: Maintain current expense controls and monitor outstanding customer credit.`,
          confidence: 'Calibrating (Data Quality: Good)',
        },
      ]);
    }, 600);
  };

  const sampleQuestions = [
    'Why did my profit change this week?',
    'Which of my businesses is performing best?',
    'How much investment have I recovered so far?',
    'Are there any pending reports from managers?',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ask Munim Ji
            </h1>
            <p className="text-xs text-slate-400">
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
            className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-800 min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[480px] pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                {m.sender === 'munim' && (
                  <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-800/80">
                    <span className="font-bold text-xs text-blue-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Munim Ji AI
                    </span>
                    {m.confidence && (
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
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
        <form onSubmit={handleSend} className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about revenue, profits, recovery, or manager performance..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shrink-0 shadow-lg shadow-blue-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
