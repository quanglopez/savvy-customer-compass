import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth';
import { Lock, Mail, Building, UserPlus, Loader2 } from 'lucide-react';

export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [accountType, setAccountType] = useState<'user' | 'business'>('user');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    // Validate business name for business accounts
    if (accountType === 'business' && !businessName.trim()) {
      toast.error('Business name is required for business accounts');
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, businessName, accountType);
      
      toast.success('Registration successful! Welcome to Savvy Customer Compass.');
      
      // Navigate based on account type
      navigate(accountType === 'business' ? '/dashboard' : '/chat');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to an existing account
            </Link>
          </p>
        </div>
        
        {/* Account type selector */}
        <div className="flex rounded-md shadow-sm">
          <button
            type="button"
            className={`flex-1 py-3 px-4 flex justify-center items-center ${
              accountType === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } text-sm font-medium border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            onClick={() => setAccountType('user')}
          >
            <UserPlus className="w-5 h-5 mr-2" />
            User Account
          </button>
          <button
            type="button"
            className={`flex-1 py-3 px-4 flex justify-center items-center ${
              accountType === 'business'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } text-sm font-medium border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            onClick={() => setAccountType('business')}
          >
            <Building className="w-5 h-5 mr-2" />
            Business Account
          </button>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            
            {accountType === 'business' && (
              <div>
                <label htmlFor="business-name" className="sr-only">
                  Business Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="business-name"
                    name="businessName"
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Business Name"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password (minimum 8 characters)"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create account</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 