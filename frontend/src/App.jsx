import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/public/HomePage';
import VotePage from './pages/public/VotePage';
import ContestsPage from './pages/public/ContestsPage';
import ResultsPage from './pages/public/ResultsPage';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import DashboardOverview from './pages/admin/DashboardOverview';
import ContestantManagement from './pages/admin/ContestantManagement';
import VoteManagement from './pages/admin/VoteManagement';
import SystemSettings from './pages/admin/SystemSettings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contests" element={<ContestsPage />} />
          <Route path="/contest/:id" element={<VotePage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="contestants" element={<ContestantManagement />} />
            <Route path="votes" element={<VoteManagement />} />
            <Route path="settings" element={<SystemSettings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
