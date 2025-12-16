import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleDevLogin = () => {
    localStorage.setItem('adminToken', 'dev-mode-token');
    localStorage.setItem('devMode', 'true');
    window.location.href = '/admin/dashboard';
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col w-full max-w-md">
        <div className="flex flex-col items-center gap-8 rounded-xl bg-white dark:bg-gray-900 dark:border dark:border-white/10 p-8 shadow-sm">
          
          {/* Yi-Vote Logo */}
          <div className="flex flex-col items-center gap-2">
            <svg className="h-10 w-auto" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4L4 24L24 44L44 24L24 4Z" fill="#A0AEC0" fillOpacity="0.3"></path>
              <path d="M34 14L21 27L14 20" stroke="#005A9C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
            </svg>
            <p className="text-gray-800 dark:text-white text-xl font-bold">Yi-Vote</p>
          </div>

          {/* Page Heading */}
          <div className="flex flex-col gap-2 text-center w-full">
            <p className="text-gray-800 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Admin Portal</p>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Sign in to manage your events and competitions.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            {/* Email Text Field */}
            <div className="flex flex-col">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-gray-800 dark:text-white text-sm font-medium leading-normal pb-2">
                  Email Address
                </p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-blue-600/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-600 dark:focus:border-blue-600 h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal"
                  placeholder="Enter your email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            {/* Password Text Field */}
            <div className="flex flex-col">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-gray-800 dark:text-white text-sm font-medium leading-normal pb-2">
                  Password
                </p>
                <div className="relative flex w-full flex-1 items-stretch">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-blue-600/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-600 dark:focus:border-blue-600 h-12 placeholder:text-gray-500 pl-4 pr-12 text-base font-normal leading-normal"
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute right-0 top-0 h-full flex items-center pr-4 text-gray-500 dark:text-gray-400">
                    <span 
                      className="material-symbols-outlined cursor-pointer select-none text-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </div>
                </div>
              </label>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end pt-1">
              <a className="text-sm font-medium text-blue-600 hover:underline" href="#">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div className="w-full">
              <button
                type="submit"
                disabled={loading}
                className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-blue-600 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <span className="truncate">{loading ? 'Logging in...' : 'Login'}</span>
              </button>
            </div>
          </form>

          {/* Dev Mode Bypass Button */}
          <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4">
            <button
              onClick={handleDevLogin}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                code
              </span>
              Skip Login (Development Mode)
            </button>
          </div>

          {/* Footer */}
          <div className="pt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">© 2024 Yi-Vote. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
