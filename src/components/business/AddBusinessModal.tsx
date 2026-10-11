import React, { useState } from 'react';
import {
  X,
  Building2,
  HelpCircle,
  Check,
  ChevronDown,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (business: any) => void;
}

export const AddBusinessModal: React.FC<AddBusinessModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Business Basics
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');

  // Step 2: Investment Details
  const [initialCapitalLakhs, setInitialCapitalLakhs] = useState('');
  const [monthlyFixedCostsLakhs, setMonthlyFixedCostsLakhs] = useState('');
  const [expectedRecoveryMonths, setExpectedRecoveryMonths] = useState('24');
  const [breakEvenMonths, setBreakEvenMonths] = useState('12');
  const [riskAppetite, setRiskAppetite] = useState<'Low' | 'Medium' | 'High'>('Medium');

  // Step 3: Operational Setup
  const [managerName, setManagerName] = useState('');
  const [reportingFrequency, setReportingFrequency] = useState<'Daily' | 'Weekly'>('Daily');
  const [enableAlerts, setEnableAlerts] = useState(true);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!businessName) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Save business
      const newBusiness = {
        name: businessName,
        industry: industry || 'Retail',
        location: location || 'India',
        startDate: startDate || new Date().toISOString().split('T')[0],
        initialCapital: initialCapitalLakhs ? parseFloat(initialCapitalLakhs) * 100000 : 5000000,
        monthlyFixedCosts: monthlyFixedCostsLakhs ? parseFloat(monthlyFixedCostsLakhs) * 100000 : 500000,
        expectedRecoveryMonths: parseInt(expectedRecoveryMonths) || 24,
        breakEvenMonths: parseInt(breakEvenMonths) || 12,
        riskAppetite,
        managerName: managerName || 'Manager',
        reportingFrequency,
        enableAlerts,
      };
      if (onSuccess) onSuccess(newBusiness);
      onClose();
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Add New Business</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Wizard Progress Bar matching screenshot */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center justify-between relative max-w-sm mx-auto">
            {/* Step 1: Business Basics */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  step > 1
                    ? 'bg-emerald-600 text-white'
                    : step === 1
                    ? 'border-2 border-emerald-600 bg-emerald-50 text-emerald-600'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > 1 ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Building2 className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-[11px] mt-1.5 font-semibold ${
                  step === 1 ? 'text-emerald-600' : 'text-slate-500'
                }`}
              >
                Business Basics
              </span>
            </div>

            {/* Connecting Line 1 */}
            <div
              className={`flex-1 h-0.5 -mt-5 mx-2 transition-all ${
                step > 1 ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            />

            {/* Step 2: Investment Details */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  step > 2
                    ? 'bg-emerald-600 text-white'
                    : step === 2
                    ? 'border-2 border-emerald-600 bg-emerald-50 text-emerald-600 font-bold'
                    : 'bg-slate-100 text-slate-400 font-bold'
                }`}
              >
                {step > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '₹'}
              </div>
              <span
                className={`text-[11px] mt-1.5 font-semibold ${
                  step === 2 ? 'text-emerald-600' : 'text-slate-500'
                }`}
              >
                Investment Details
              </span>
            </div>

            {/* Connecting Line 2 */}
            <div
              className={`flex-1 h-0.5 -mt-5 mx-2 transition-all ${
                step > 2 ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            />

            {/* Step 3: Operational Setup */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  step === 3
                    ? 'border-2 border-emerald-600 bg-emerald-50 text-emerald-600'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <Settings className="w-4 h-4" />
              </div>
              <span
                className={`text-[11px] mt-1.5 font-semibold ${
                  step === 3 ? 'text-emerald-600' : 'text-slate-500'
                }`}
              >
                Operational Setup
              </span>
            </div>
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleNext}>
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* STEP 1: Business Basics */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., Sharma Textiles Pvt Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Industry
                  </label>
                  <div className="relative">
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 appearance-none focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                    >
                      <option value="">Select industry</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Retail & Fashion">Retail & Fashion</option>
                      <option value="Textiles">Textiles</option>
                      <option value="Pharmaceuticals">Pharmaceuticals</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Services">Services</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Mumbai, Maharashtra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Investment Details */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Initial Capital Invested (₹ Lakhs)
                    </label>
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    value={initialCapitalLakhs}
                    onChange={(e) => setInitialCapitalLakhs(e.target.value)}
                    placeholder="e.g., 50"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Total money you have put into the business
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Monthly Fixed Costs (₹ Lakhs)
                    </label>
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    value={monthlyFixedCostsLakhs}
                    onChange={(e) => setMonthlyFixedCostsLakhs(e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Regular monthly expenses like rent, salaries
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <label className="text-[11px] font-semibold text-slate-700">
                        Expected Recovery Time (Months)
                      </label>
                      <HelpCircle className="w-3 h-3 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      value={expectedRecoveryMonths}
                      onChange={(e) => setExpectedRecoveryMonths(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      When you expect to get your money back
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <label className="text-[11px] font-semibold text-slate-700">
                        Break-Even Period (Months)
                      </label>
                      <HelpCircle className="w-3 h-3 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      value={breakEvenMonths}
                      onChange={(e) => setBreakEvenMonths(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      When earnings cover all costs
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      riskAppetite
                    </label>
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Low', 'Medium', 'High'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setRiskAppetite(lvl)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          riskAppetite === lvl
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    How much financial uncertainty you can handle
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: Operational Setup */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Assign Manager
                  </label>
                  <input
                    type="text"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    placeholder="e.g. Amit Kapoor"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-600 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    They will submit daily reports on your behalf
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Reporting Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setReportingFrequency('Daily')}
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        reportingFrequency === 'Daily'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Daily
                    </button>
                    <button
                      type="button"
                      onClick={() => setReportingFrequency('Weekly')}
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        reportingFrequency === 'Weekly'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Weekly
                    </button>
                  </div>
                </div>

                {/* Enable Alerts Switch */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Enable Alerts</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Get notified about important events
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableAlerts(!enableAlerts)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      enableAlerts ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer matching screenshot */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                &lt; Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                &lt; Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Create Business
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
