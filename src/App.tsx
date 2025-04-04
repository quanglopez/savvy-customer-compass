import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './hooks/useAuth';
import { PrivateRoute } from './components/Auth/PrivateRoute';

// Auth components
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';

// Dashboard components
import { DashboardLayout } from './components/Dashboard/DashboardLayout';
import { ChatDashboard } from './components/Dashboard/ChatDashboard';
import { AnalyticsDashboard } from './components/Dashboard/AnalyticsDashboard';
import { SettingsDashboard } from './components/Dashboard/SettingsDashboard';
import { CustomersDashboard } from './components/Dashboard/CustomersDashboard';

// Chat components
import { ChatInterface } from './components/Chat/ChatInterface';
import { BusinessChat } from './components/Chat/BusinessChat';

// Public components
import { LandingPage } from './components/Public/LandingPage';
import { NotFound } from './components/Public/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Business dashboard routes */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardLayout><Navigate to="/dashboard/chats" /></DashboardLayout></PrivateRoute>} />
          <Route path="/dashboard/chats" element={<PrivateRoute><DashboardLayout><ChatDashboard /></DashboardLayout></PrivateRoute>} />
          <Route path="/dashboard/analytics" element={<PrivateRoute><DashboardLayout><AnalyticsDashboard /></DashboardLayout></PrivateRoute>} />
          <Route path="/dashboard/customers" element={<PrivateRoute><DashboardLayout><CustomersDashboard /></DashboardLayout></PrivateRoute>} />
          <Route path="/dashboard/settings" element={<PrivateRoute><DashboardLayout><SettingsDashboard /></DashboardLayout></PrivateRoute>} />
          <Route path="/dashboard/chat/:chatId" element={<PrivateRoute><DashboardLayout><BusinessChat /></DashboardLayout></PrivateRoute>} />
          
          {/* User chat routes */}
          <Route path="/chat/:businessId" element={<ChatInterface />} />
          <Route path="/chat/:businessId/:chatId" element={<ChatInterface />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
