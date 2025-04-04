
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Pages & Auth Components
import { LandingPage } from './components/Public/LandingPage';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import { NotFound } from './components/Public/NotFound';

// Chat Components
import { ChatInterface } from './components/Chat/ChatInterface';
import { BusinessChat } from './components/Chat/BusinessChat';

// Dashboard Components
import { Dashboard } from './components/Dashboard';
import { ChatDashboard } from './components/Dashboard/ChatDashboard';
import { AnalyticsDashboard } from './components/Dashboard/AnalyticsDashboard';
import { SettingsDashboard } from './components/Dashboard/SettingsDashboard';
import { CustomersDashboard } from './components/Dashboard/CustomersDashboard';
import { BusinessDashboard } from './pages/BusinessDashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route 
          path="/chat" 
          element={
            <PrivateRoute requiredRole="user">
              <ChatInterface />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/chat/:chatId" 
          element={
            <PrivateRoute requiredRole="user">
              <ChatInterface />
            </PrivateRoute>
          } 
        />

        {/* Business Routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute requiredRole="business">
              <BusinessDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/chats" 
          element={
            <PrivateRoute requiredRole="business">
              <ChatDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/chat/:chatId" 
          element={
            <PrivateRoute requiredRole="business">
              <BusinessChat />
            </PrivateRoute>
          }
        />
        <Route 
          path="/dashboard/analytics" 
          element={
            <PrivateRoute requiredRole="business">
              <AnalyticsDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/customers" 
          element={
            <PrivateRoute requiredRole="business">
              <CustomersDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/settings" 
          element={
            <PrivateRoute requiredRole="business">
              <SettingsDashboard />
            </PrivateRoute>
          } 
        />

        {/* 404 & Redirect */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
};

export default App;
