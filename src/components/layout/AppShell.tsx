import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/i18n';
import { AddBusinessModal } from '@/components/business/AddBusinessModal';
import {
  Plus,
  Bell,
  Globe,
  ChevronDown,
  X,
  Shield,
  LayoutDashboard,
  Building2,
  Sparkles,
  AlertTriangle,
  User
} from 'lucide-react';

export const AppShell: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [addBusinessModalOpen, setAddBusinessModalOpen] = useState(false);
  const currentLanguage = i18n.language as 'en' | 'hi';

  const toggleLanguage = () => {
    const nextLang = currentLanguage === 'en' ? 'hi' : 'en';
    changeLanguage(nextLang);
  };

  const handleBusinessCreated = (business: any) => {
    alert(`Success: "${business.name}" created with assigned manager "${business.managerName}"!`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* Top Header matching screenshot */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => navigate('/')}
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white text-lg shadow-sm">
              म
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  Munim
                </span>
                <span className="font-extrabold text-lg tracking-tight text-emerald-600 ml-1">
                  Ji
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium -mt-1 hidden sm:block">
                Your Personal Business Manager
              </p>
            </div>
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentLanguage === 'en' ? 'EN' : 'हिन्दी'}</span>
            </button>

            {/* + Add Business Button -> Triggers the exact 3-step modal */}
            <button
              onClick={() => setAddBusinessModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add Business</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative p-1.5 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
              </button>

              {/* Notification Slide-Down Modal */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl p-4 border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-emerald-600" />
                      <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                    </div>
                    <button
                      onClick={() => setNotificationOpen(false)}
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="py-2 space-y-2 max-h-80 overflow-y-auto">
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 cursor-pointer">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-amber-900">
                            Priya Foods: Daily Report Pending
                          </p>
                          <p className="text-[11px] text-amber-700 mt-0.5">
                            Reporting cutoff is 10:00 AM IST.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar Pill */}
            <div
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                A
              </div>
              <span className="text-xs font-semibold text-slate-700 hidden sm:block">
                Amit
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 pb-24 md:pb-12">
        <Outlet context={{ openAddBusinessModal: () => setAddBusinessModalOpen(true) }} />
      </main>

      {/* Footer matching screenshot */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>Your data is private. Munim Ji learns patterns, not your secrets.</span>
          </div>
          <div className="text-[11px] text-slate-400">
            © 2024 Munim Ji – Your Personal Business Manager
          </div>
        </div>
      </footer>

      {/* The 3-Step Add New Business Modal */}
      <AddBusinessModal
        isOpen={addBusinessModalOpen}
        onClose={() => setAddBusinessModalOpen(false)}
        onSuccess={handleBusinessCreated}
      />

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
              isActive ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Dashboard</span>
        </NavLink>

        <NavLink
          to="/businesses"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
              isActive ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <Building2 className="w-5 h-5" />
          <span className="text-[10px]">Businesses</span>
        </NavLink>

        <NavLink
          to="/munim-ai"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
              isActive ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span className="text-[10px]">Munim AI</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
              isActive ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};
