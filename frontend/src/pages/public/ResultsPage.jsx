import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { getVoteResults, getContestById } from '../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ResultsPage() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('cards');

  useEffect(() => {
    loadResults();
    const interval = setInterval(loadResults, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const loadResults = async () => {
    try {
      const [contestRes, resultsRes] = await Promise.all([
        getContestById(id),
        getVoteResults(id)
      ]);
      setContest(contestRes.data);
      setResults(resultsRes.data);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-700 text-xl">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!results || !contest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Results Not Found</h1>
          <Link to="/" className="text-purple-600 hover:text-purple-700">Go Home</Link>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: results.results.map(r => r.contestant_name),
    datasets: [
      {
        label: 'Votes',
        data: results.results.map(r => r.vote_count),
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Vote Distribution',
        font: {
          size: 18
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const leader = results.results[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-purple-600">Yi-Vote</Link>
            <Link to={`/contest/${id}`} className="text-purple-600 hover:text-purple-700 font-medium">
              ← Back to Voting
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">{contest.name}</h1>
          <p className="text-xl text-purple-100">Live Results</p>
          <p className="text-sm text-purple-200 mt-2">Updates every 10 seconds</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-purple-600 text-3xl mb-2">🏆</div>
            <p className="text-gray-500 text-sm">Current Leader</p>
            <p className="text-2xl font-bold text-gray-800">{leader?.contestant_name || 'N/A'}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-green-600 text-3xl mb-2">🗳️</div>
            <p className="text-gray-500 text-sm">Total Votes</p>
            <p className="text-2xl font-bold text-gray-800">{results.total_votes}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-blue-600 text-3xl mb-2">👥</div>
            <p className="text-gray-500 text-sm">Contestants</p>
            <p className="text-2xl font-bold text-gray-800">{results.results.length}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-yellow-600 text-3xl mb-2">📊</div>
            <p className="text-gray-500 text-sm">Leader's Share</p>
            <p className="text-2xl font-bold text-gray-800">{leader?.percentage || 0}%</p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Results Breakdown</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'chart'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Charts
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Cards View */}
        {viewMode === 'cards' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.results.map((result, index) => (
              <div
                key={result.contestant_id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className={`h-2 ${
                  index === 0 ? 'bg-yellow-400' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-400' :
                  'bg-purple-400'
                }`}></div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {result.contestant_name}
                      </h3>
                      <p className="text-sm text-gray-500">#{index + 1} Position</p>
                    </div>
                    {index === 0 && <div className="text-3xl">🥇</div>}
                    {index === 1 && <div className="text-3xl">🥈</div>}
                    {index === 2 && <div className="text-3xl">🥉</div>}
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-3xl font-bold text-purple-600">
                        {result.vote_count}
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        {result.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${result.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    {results.total_votes > 0 
                      ? `${((result.vote_count / results.total_votes) * 100).toFixed(1)}% of total votes`
                      : 'No votes yet'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chart View */}
        {viewMode === 'chart' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Bar Chart</h3>
              <Bar data={chartData} options={chartOptions} />
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pie Chart</h3>
              <Pie data={chartData} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Doughnut Chart</h3>
              <div className="max-w-md mx-auto">
                <Doughnut data={chartData} />
              </div>
            </div>
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Contestant</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Votes</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Percentage</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Visual</th>
                </tr>
              </thead>
              <tbody>
                {results.results.map((result, index) => (
                  <tr key={result.contestant_id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800">
                      {result.contestant_name}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-lg font-bold text-purple-600">
                        {result.vote_count}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-lg font-bold text-green-600">
                        {result.percentage}%
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full"
                          style={{ width: `${result.percentage}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Share & Export */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Share Results</h3>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              📱 Share on WhatsApp
            </button>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
              📘 Share on Facebook
            </button>
            <button className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 font-medium">
              🐦 Share on Twitter
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              📊 Export to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
