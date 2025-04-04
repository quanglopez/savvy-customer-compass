import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  businessName?: string;
  role: 'admin' | 'business' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, businessName?: string, accountType?: 'user' | 'business') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await fetch(`${API_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser({
              id: userData._id,
              email: userData.email,
              businessName: userData.businessName,
              role: userData.role,
            });
          } else {
            // If token is invalid, clear it
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Save token
      localStorage.setItem('token', data.token);
      
      // Set user data
      setUser({
        id: data.user._id,
        email: data.user.email,
        businessName: data.user.businessName,
        role: data.user.role,
      });
      
      return;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    businessName?: string,
    accountType: 'user' | 'business' = 'user'
  ) => {
    try {
      const userData = {
        email,
        password,
        ...(businessName && { businessName }),
        role: accountType,
      };
      
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await response.json();
      
      // Save token
      localStorage.setItem('token', data.token);
      
      // Set user data
      setUser({
        id: data.user._id,
        email: data.user.email,
        businessName: data.user.businessName,
        role: data.user.role,
      });
      
      return;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 