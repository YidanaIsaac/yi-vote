import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin as apiLogin, getCurrentAdmin } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    const devMode = localStorage.getItem('devMode');
    
    if (token) {
      if (devMode === 'true' && token === 'dev-mode-token') {
        setAdmin({
          id: 1,
          email: 'admin@yivote.com',
          full_name: 'Admin User (Dev Mode)'
        });
        setLoading(false);
        return;
      }
      
      try {
        const response = await getCurrentAdmin();
        setAdmin(response.data);
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('devMode');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await apiLogin({ email, password });
      const { access_token, admin: adminData } = response.data;
      
      localStorage.setItem('adminToken', access_token);
      setAdmin(adminData);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('devMode');
    setAdmin(null);
    window.location.href = '/admin/login';
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
