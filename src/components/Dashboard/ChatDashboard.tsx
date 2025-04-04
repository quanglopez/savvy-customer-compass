import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MessageSquare, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface ChatSession {
  _id: string;
  businessId: string;
  userId: {
    _id: string;
    email: string;
  };
  messages: Array<{
    _id: string;
    content: string;
    timestamp: string;
    isBot: boolean;
  }>;
  status: 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ChatDashboard: React.FC = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/chat/business`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }

        const data = await response.json();
        setChats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleCloseChat = async (chatId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/chat/${chatId}/close`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to close chat');
      }

      // Update the local state
      setChats(
        chats.map((chat) =>
          chat._id === chatId ? { ...chat, status: 'closed' } : chat
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const filteredChats = chats.filter(
    (chat) => chat.status === activeTab
  );

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
        <p className="font-semibold">Error loading chats</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Chat Management</h1>
        <p className="text-gray-600">Manage your customer conversations</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'active'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active Chats ({chats.filter((chat) => chat.status === 'active').length})
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'closed'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('closed')}
        >
          Closed Chats ({chats.filter((chat) => chat.status === 'closed').length})
        </button>
      </div>

      {filteredChats.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {activeTab === 'active'
              ? 'No active chats'
              : 'No closed chats'}
          </h3>
          <p className="text-gray-600 max-w-md">
            {activeTab === 'active'
              ? 'When customers start chatting with your business, their conversations will appear here.'
              : 'Closed chat sessions will be archived and shown here for your reference.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto pb-6">
          {filteredChats.map((chat) => (
            <div
              key={chat._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="font-medium">{chat.userId?.email || 'Unknown User'}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      chat.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {chat.status === 'active' ? 'Active' : 'Closed'}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>
                    Started {format(new Date(chat.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                {chat.messages.length > 0 && (
                  <div className="mt-3 text-sm text-gray-600 line-clamp-2">
                    Last message: {chat.messages[chat.messages.length - 1].content}
                  </div>
                )}
              </div>
              <div className="p-3 bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
                </div>
                <div className="flex space-x-2">
                  {chat.status === 'active' && (
                    <button
                      onClick={() => handleCloseChat(chat._id)}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                      title="Close chat"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                  <Link
                    to={`/dashboard/chat/${chat._id}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    title="View chat"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 