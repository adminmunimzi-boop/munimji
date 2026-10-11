import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/pages/DashboardPage';
import { BusinessesPage } from '@/pages/BusinessesPage';
import { NewBusinessPage } from '@/pages/NewBusinessPage';
import { MunimAIPage } from '@/pages/MunimAIPage';
import { AlertsPage } from '@/pages/AlertsPage';
import { ProfilePage } from '@/pages/ProfilePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="businesses" element={<BusinessesPage />} />
          <Route path="businesses/new" element={<NewBusinessPage />} />
          <Route path="munim-ai" element={<MunimAIPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
