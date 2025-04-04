import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Bell, User, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NotificationSettings {
  emailNotifications: boolean;
  newChatAlert: boolean;
  newMessageAlert: boolean;
}

interface BusinessProfile {
  _id: string;
  email: string;
  businessName?: string;
  role: string;
  notificationSettings: NotificationSettings;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const SettingsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState({
    profile: true,
    notifications: true,
    updateProfile: false,
    updateNotifications: false,
  });
  const [error, setError] = useState<string | null>(null);
  
  // Profile form state
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    newChatAlert: true,
    newMessageAlert: true,
  });

  useEffect(() => {
    fetchProfile();
    fetchNotificationSettings();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(prev => ({ ...prev, profile: true }));
      
      const response = await fetch(`${API_URL}/api/business/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch business profile');
      }
      
      const data = await response.json();
      setProfile(data);
      setEmail(data.email || '');
      setBusinessName(data.businessName || '');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const fetchNotificationSettings = async () => {
    try {
      setLoading(prev => ({ ...prev, notifications: true }));
      
      const response = await fetch(`${API_URL}/api/business/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notification settings');
      }
      
      const data = await response.json();
      setNotificationSettings(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(prev => ({ ...prev, notifications: false }));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(prev => ({ ...prev, updateProfile: true }));
      
      const response = await fetch(`${API_URL}/api/business/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          email,
          businessName,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const data = await response.json();
      setProfile(prevProfile => {
        if (!prevProfile) return null;
        return { ...prevProfile, email: data.business.email, businessName: data.business.businessName };
      });
      
      toast.success('Profile updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to update profile');
    } finally {
      setLoading(prev => ({ ...prev, updateProfile: false }));
    }
  };

  const handleUpdateNotifications = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(prev => ({ ...prev, updateNotifications: true }));
      
      const response = await fetch(`${API_URL}/api/business/notifications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(notificationSettings),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update notification settings');
      }
      
      toast.success('Notification settings updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to update notification settings');
    } finally {
      setLoading(prev => ({ ...prev, updateNotifications: false }));
    }
  };

  if (loading.profile || loading.notifications) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        <p className="font-semibold">Error loading settings</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and notification preferences</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Business Profile Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Business Profile</h2>
          </div>
          
          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading.updateProfile}
                className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading.updateProfile ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <Bell className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Notification Settings</h2>
          </div>
          
          <form onSubmit={handleUpdateNotifications}>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="emailNotifications"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                  Email Notifications
                </label>
              </div>
              <p className="text-sm text-gray-500 ml-6">
                Receive email alerts for important account notifications.
              </p>
              
              <div className="flex items-center">
                <input
                  id="newChatAlert"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={notificationSettings.newChatAlert}
                  onChange={(e) => setNotificationSettings(prev => ({ ...prev, newChatAlert: e.target.checked }))}
                />
                <label htmlFor="newChatAlert" className="ml-2 block text-sm text-gray-700">
                  New Chat Alerts
                </label>
              </div>
              <p className="text-sm text-gray-500 ml-6">
                Get notified when a customer starts a new chat session.
              </p>
              
              <div className="flex items-center">
                <input
                  id="newMessageAlert"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={notificationSettings.newMessageAlert}
                  onChange={(e) => setNotificationSettings(prev => ({ ...prev, newMessageAlert: e.target.checked }))}
                />
                <label htmlFor="newMessageAlert" className="ml-2 block text-sm text-gray-700">
                  New Message Alerts
                </label>
              </div>
              <p className="text-sm text-gray-500 ml-6">
                Get notified when you receive new messages in existing chats.
              </p>
              
              <button
                type="submit"
                disabled={loading.updateNotifications}
                className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading.updateNotifications ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Notification Settings
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 