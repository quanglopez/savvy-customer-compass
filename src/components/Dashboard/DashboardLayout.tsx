import React, { ReactNode } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Users, 
  LogOut,
  Menu,
  X 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If user is not authenticated or not a business, redirect to login
  if (!user || (user.role !== 'business' && user.role !== 'admin')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const menuItems = [
    {
      title: 'Chats',
      path: '/dashboard/chats',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: 'Analytics',
      path: '/dashboard/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      title: 'Customers',
      path: '/dashboard/customers',
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: 'Settings',
      path: '/dashboard/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed z-50 bottom-4 right-4 p-3 rounded-full bg-blue-500 text-white shadow-lg"
      >
        {sidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-white shadow-lg fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">{user.businessName || 'Dashboard'}</h2>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="flex items-center px-4 py-3 w-full rounded-md text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <main className="p-4 sm:p-6 md:p-8 overflow-y-auto h-screen">{children}</main>
      </div>
    </div>
  );
}; 