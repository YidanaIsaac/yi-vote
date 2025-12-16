import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { admin, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="relative flex min-h-screen w-full font-display" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-white/10 flex flex-col overflow-hidden">
        
        {/* Admin Profile Section */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-white/10">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full size-10 flex items-center justify-center text-white font-bold text-lg">
            {admin?.full_name?.[0] || admin?.email?.[0] || 'A'}
          </div>
          <div className="flex flex-col">
            <h1 className="text-black dark:text-white text-base font-medium leading-normal">
              {admin?.full_name || 'Yi-Vote Admin'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
              Administrator
            </p>
          </div>
        </div>

        {/* Navigation - Scrollable if needed */}
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive('/admin/dashboard')
                  ? 'bg-blue-600/10 text-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive('/admin/dashboard') ? 'text-blue-600' : ''}`} style={{ fontVariationSettings: isActive('/admin/dashboard') ? "'FILL' 1" : "'FILL' 0" }}>
                dashboard
              </span>
              <p className="text-sm font-medium leading-normal">Dashboard</p>
            </Link>

            <Link
              to="/admin/contests"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive('/admin/contests')
                  ? 'bg-blue-600/10 text-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined">emoji_events</span>
              <p className="text-sm font-medium leading-normal">Contests</p>
            </Link>

            <Link
              to="/admin/contestants"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive('/admin/contestants')
                  ? 'bg-blue-600/10 text-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined">groups</span>
              <p className="text-sm font-medium leading-normal">Contestants</p>
            </Link>

            <Link
              to="/admin/votes"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive('/admin/votes')
                  ? 'bg-blue-600/10 text-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined">how_to_vote</span>
              <p className="text-sm font-medium leading-normal">Votes</p>
            </Link>

            <Link
              to="/admin/reports"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive('/admin/reports')
                  ? 'bg-blue-600/10 text-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined">bar_chart</span>
              <p className="text-sm font-medium leading-normal">Reports</p>
            </Link>

            <Link
              to="/admin/settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive('/admin/settings')
                  ? 'bg-blue-600/10 text-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined">settings</span>
              <p className="text-sm font-medium leading-normal">Settings</p>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1 w-full bg-gray-50 dark:bg-gray-900 ml-64">
        
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 px-6 py-3 sticky top-0 z-10">
          
          {/* Logo/Brand */}
          <div className="flex items-center gap-4 text-black dark:text-white">
            <div className="size-6 text-blue-600">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_543)">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"></path>
                  <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fillRule="evenodd"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_543">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Yi-Vote</h2>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-1 justify-end gap-4 items-center">
            
            {/* Search Bar */}
            <label className="relative flex-col min-w-40 !h-10 max-w-64 hidden sm:flex">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black dark:text-white focus:outline-0 focus:ring-2 focus:ring-blue-600/50 border border-gray-300 dark:border-white/20 bg-transparent h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 pl-10 pr-4 text-sm font-normal leading-normal"
                placeholder="Search contests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>

            {/* Notifications */}
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>

            {/* User Avatar with Logout */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full size-10 flex items-center justify-center text-white font-bold cursor-pointer">
                {admin?.full_name?.[0] || admin?.email?.[0] || 'A'}
              </div>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-3 border-b border-gray-200 dark:border-white/10">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{admin?.full_name || admin?.email}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{admin?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
          
          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '20px' }}>
                  verified
                </span>
                <p>© 2025 Yi-Vote. All rights reserved.</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Help Center
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
