import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { MessageSquare, Users, Clock, CheckCircle } from 'lucide-react';

interface BusinessStats {
  activeChats: number;
  closedChats: number;
  totalChats: number;
  latestChats: any[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AnalyticsDashboard: React.FC = () => {
  const [stats, setStats] = useState<BusinessStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/business/stats?range=${timeRange}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }

        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [timeRange]);

  // Sample chart data - in a real app, this would come from the API
  const chartData = [
    { name: 'Mon', chats: 4 },
    { name: 'Tue', chats: 3 },
    { name: 'Wed', chats: 7 },
    { name: 'Thu', chats: 5 },
    { name: 'Fri', chats: 9 },
    { name: 'Sat', chats: 6 },
    { name: 'Sun', chats: 2 },
  ];

  const pieData = [
    { name: 'Active', value: stats?.activeChats || 0 },
    { name: 'Closed', value: stats?.closedChats || 0 },
  ];

  const COLORS = ['#0088FE', '#FFBB28'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        <p className="font-semibold">Error loading statistics</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">View insights about your customer conversations</p>
      </div>

      {/* Time range selector */}
      <div className="mb-6 flex space-x-2">
        <button
          className={`px-4 py-2 rounded ${
            timeRange === '7d'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          onClick={() => setTimeRange('7d')}
        >
          Last 7 days
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeRange === '30d'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          onClick={() => setTimeRange('30d')}
        >
          Last 30 days
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeRange === '90d'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          onClick={() => setTimeRange('90d')}
        >
          Last 90 days
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3 mr-4 bg-blue-100 text-blue-600 rounded-full">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Total Chats</p>
            <p className="text-2xl font-semibold text-gray-900">{stats?.totalChats || 0}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3 mr-4 bg-green-100 text-green-600 rounded-full">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Active Chats</p>
            <p className="text-2xl font-semibold text-gray-900">{stats?.activeChats || 0}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3 mr-4 bg-yellow-100 text-yellow-600 rounded-full">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Response Time</p>
            <p className="text-2xl font-semibold text-gray-900">5m 20s</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3 mr-4 bg-purple-100 text-purple-600 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Unique Customers</p>
            <p className="text-2xl font-semibold text-gray-900">42</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Chat Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="chats" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Chat Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}; 