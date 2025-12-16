import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getActiveContests } from '../../services/api';

export default function HomePage() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContests();
  }, []);

  const loadContests = async () => {
    try {
      const response = await getActiveContests();
      setContests(response.data);
    } catch (error) {
      console.error('Error loading contests:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-white">Yi-Vote</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="text-white hover:text-purple-200 px-3 py-2 rounded-md">
                Home
              </Link>
              <Link to="/contests" className="text-white hover:text-purple-200 px-3 py-2 rounded-md">
                Contests
              </Link>
              <Link to="/results" className="text-white hover:text-purple-200 px-3 py-2 rounded-md">
                Results
              </Link>
              <Link to="/about" className="text-white hover:text-purple-200 px-3 py-2 rounded-md">
                About
              </Link>
              <Link 
                to="/admin/login" 
                className="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-md font-medium"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Vote for Your Favorite
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Professional e-voting platform for contests and competitions. 
            Secure, transparent, and easy to use.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/contests" 
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold text-lg shadow-xl"
            >
              View Contests
            </Link>
            <a 
              href="#how-it-works" 
              className="bg-purple-500/30 text-white hover:bg-purple-500/40 px-8 py-3 rounded-lg font-semibold text-lg backdrop-blur-sm"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Active Contests */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-10">
            Active Contests
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
              <p className="text-white mt-4">Loading contests...</p>
            </div>
          ) : contests.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
              <p className="text-white text-xl">No active contests at the moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contests.map((contest) => (
                <div 
                  key={contest.id}
                  className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-indigo-500"></div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {contest.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {contest.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Ends: {new Date(contest.end_date).toLocaleDateString()}
                      </span>
                      <Link 
                        to={`/contest/${contest.id}`}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-medium"
                      >
                        Vote Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div id="how-it-works" className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🗳️</div>
            <h3 className="text-2xl font-bold text-white mb-3">Easy Voting</h3>
            <p className="text-purple-100">
              Simple and intuitive voting process. Vote via web or SMS.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-white mb-3">Secure</h3>
            <p className="text-purple-100">
              One vote per person. All votes are encrypted and verified.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-white mb-3">Real-time Results</h3>
            <p className="text-purple-100">
              See live voting results and analytics in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-lg border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80">
            © 2024 Yi-Vote. Professional E-Voting Platform
          </p>
        </div>
      </footer>
    </div>
  );
}
