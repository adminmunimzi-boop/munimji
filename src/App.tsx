import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { BusinessProvider } from '@/context/BusinessContext';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/pages/DashboardPage';
import { BusinessesPage } from '@/pages/BusinessesPage';
import { NewBusinessPage } from '@/pages/NewBusinessPage';
import { BusinessDetailPage } from '@/pages/BusinessDetailPage';
import { MunimAIPage } from '@/pages/MunimAIPage';
import { AlertsPage } from '@/pages/AlertsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LoginPage } from '@/pages/LoginPage';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="businesses" element={<BusinessesPage />} />
        <Route path="businesses/new" element={<NewBusinessPage />} />
        <Route path="businesses/:id" element={<BusinessDetailPage />} />
        <Route path="munim-ai" element={<MunimAIPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BusinessProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </BusinessProvider>
    </AuthProvider>
  );
};

export default App;
