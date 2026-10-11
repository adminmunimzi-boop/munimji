import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/i18n';
import { User, Camera, Globe, Shield, Phone, Mail, LogOut, Check } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [fullName, setFullName] = useState('Anand Verma');
  const [email, setEmail] = useState('anand@centralbakers.in');
  const [phone, setPhone] = useState('+91 98112 34567');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    changeLanguage(lang);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Profile & Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your owner identity, security credentials, and language preference
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card with Photo Upload */}
        <div className="munim-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-2xl shadow-sm overflow-hidden border-2 border-emerald-200">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>A</span>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-transform group-hover:scale-105">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="font-extrabold text-lg text-slate-900">{fullName}</h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Business Owner
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Owner of 2 businesses on Munim Ji
              </p>
              <p className="text-[11px] text-slate-400">
                Click camera icon to upload and adjust profile photo
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {t('auth.full_name')}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {t('auth.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Language Preference Block */}
        <div className="munim-card p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Preferred Application Language</h3>
          </div>
          <p className="text-xs text-slate-500">
            Changes navigation, labels, notifications, and AI responses. Numbers and currency symbols are never translated.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                i18n.language === 'en'
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>English (Default)</span>
              {i18n.language === 'en' && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
            </button>

            <button
              type="button"
              onClick={() => handleLanguageChange('hi')}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                i18n.language === 'hi'
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>हिन्दी (Hindi)</span>
              {i18n.language === 'hi' && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold border border-rose-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('auth.log_out')}</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            {savedSuccess ? 'Changes Saved ✓' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};
