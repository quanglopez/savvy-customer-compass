import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MessageSquare, Search, UserX } from 'lucide-react';
import { format } from 'date-fns';

interface Customer {
  _id: string;
  email: string;
  lastActive: string;
  totalChats: number;
  activeChats: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const CustomersDashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock data for display - would be replaced with actual API call
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, this would be an API call
        // const response = await fetch(`${API_URL}/api/business/customers`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //   },
        // });
        // 
        // if (!response.ok) {
        //   throw new Error('Failed to fetch customers');
        // }
        // 
        // const data = await response.json();
        // setCustomers(data);

        // Mock data for demonstration
        const mockCustomers: Customer[] = [
          {
            _id: '1',
            email: 'customer1@example.com',
            lastActive: new Date().toISOString(),
            totalChats: 5,
            activeChats: 1,
          },
          {
            _id: '2',
            email: 'customer2@example.com',
            lastActive: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            totalChats: 3,
            activeChats: 0,
          },
          {
            _id: '3',
            email: 'customer3@example.com',
            lastActive: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            totalChats: 8,
            activeChats: 2,
          },
          {
            _id: '4',
            email: 'customer4@example.com',
            lastActive: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            totalChats: 1,
            activeChats: 0,
          },
          {
            _id: '5',
            email: 'support@techcompany.com',
            lastActive: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
            totalChats: 12,
            activeChats: 3,
          },
        ];
        
        setCustomers(mockCustomers);
        setFilteredCustomers(mockCustomers);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCustomers(customers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = customers.filter(customer => 
        customer.email.toLowerCase().includes(query)
      );
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, customers]);

  const handleStartChat = (customerId: string) => {
    // In a real app, this would start a chat with the customer
    navigate(`/dashboard/chat/${customerId}`);
  };

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
        <p className="font-semibold">Error loading customers</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Customers</h1>
        <p className="text-gray-600">View and manage your customer relations</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Customer list */}
      {filteredCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <UserX className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No customers found
          </h3>
          <p className="text-gray-600 max-w-md">
            {searchQuery
              ? 'No customers match your search query. Try a different search term.'
              : 'You don\'t have any customers yet.'}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <li key={customer._id}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-blue-600">{customer.email}</div>
                          <div className="text-sm text-gray-500">
                            Last active: {format(new Date(customer.lastActive), 'MMM d, yyyy h:mm a')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {customer.activeChats} active / {customer.totalChats} total
                          </span>
                        </div>
                        <button
                          onClick={() => handleStartChat(customer._id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}; 