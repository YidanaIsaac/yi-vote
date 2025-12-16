import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllContests } from '../../services/api';

export default function ContestsPage() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadContests();
  }, []);

  const loadContests = async () => {
    try {
      const response = await getAllContests();
      setContests(response.data);
    } catch (error) {
      console.error('Error loading contests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContests = contests.filter(contest => {
    if (filter === 'all') return true;
    return contest.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-purple-600">Yi-Vote</Link>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-purple-600 px-3 py-2">Home</Link>
              <Link to="/contests" className="text-purple-600 font-medium px-3 py-2">Contests</Link>
              <Link to="/results" className="text-gray-700 hover:text-purple-600 px-3 py-2">Results</Link>
              <Link to="/about" className="text-gray-700 hover:text-purple-600 px-3 py-2">About</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">All Contests</h1>
          <p className="text-xl text-purple-100">
            Browse and participate in active voting contests
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Contests ({contests.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Active ({contests.filter(c => c.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'draft'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Coming Soon ({contests.filter(c => c.status === 'draft').length})
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'closed'
                ? 'bg-gray-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Closed ({contests.filter(c => c.status === 'closed').length})
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading contests...</p>
          </div>
        ) : filteredContests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-16 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Contests Found</h3>
            <p className="text-gray-600">No contests match your current filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContests.map((contest) => (
              <div
                key={contest.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Contest Image/Banner */}
                <div className="h-48 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-5xl mb-2">🏆</div>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      contest.status === 'active' ? 'bg-green-500' :
                      contest.status === 'draft' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}>
                      {contest.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Contest Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {contest.name}
                  </h3>
                  
                  {contest.client_name && (
                    <p className="text-purple-600 font-medium mb-2">
                      By {contest.client_name}
                    </p>
                  )}
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {contest.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {contest.contestant_count || 0}
                      </p>
                      <p className="text-xs text-gray-600">Contestants</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {contest.total_votes || 0}
                      </p>
                      <p className="text-xs text-gray-600">Total Votes</p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="text-sm text-gray-500 mb-4 space-y-1">
                    <p>📅 Starts: {new Date(contest.start_date).toLocaleDateString()}</p>
                    <p>🏁 Ends: {new Date(contest.end_date).toLocaleDateString()}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {contest.status === 'active' ? (
                      <Link
                        to={`/contest/${contest.id}`}
                        className="flex-1 bg-purple-600 text-white text-center py-3 rounded-lg hover:bg-purple-700 font-semibold transition-colors"
                      >
                        Vote Now 🗳️
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-gray-300 text-gray-600 text-center py-3 rounded-lg cursor-not-allowed font-semibold"
                      >
                        {contest.status === 'draft' ? 'Coming Soon' : 'Closed'}
                      </button>
                    )}
                    <Link
                      to={`/results/${contest.id}`}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                    >
                      Results
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
