import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getContestById, getContestantsByContest, castVote } from '../../services/api';

export default function VotePage() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [contestants, setContestants] = useState([]);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [contestRes, contestantsRes] = await Promise.all([
        getContestById(id),
        getContestantsByContest(id)
      ]);
      setContest(contestRes.data);
      setContestants(contestantsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (contestantId, contestantName) => {
    if (!phone) {
      setMessage('❌ Please enter your phone number');
      return;
    }

    setVoting(true);
    setMessage('');

    try {
      await castVote({
        contest_id: parseInt(id),
        contestant_id: contestantId,
        voter_identifier: phone,
        vote_method: 'web'
      });

      setMessage(`✅ Successfully voted for ${contestantName}!`);
      setPhone('');
      
      const response = await getContestantsByContest(id);
      setContestants(response.data);
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Voting failed'));
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
          <p className="text-white mt-4 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Contest Not Found</h1>
          <Link to="/" className="text-purple-200 hover:text-white">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="text-white hover:text-purple-200 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white">{contest.name}</h1>
          <p className="text-purple-100 mt-2">{contest.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Phone Input */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter Your Phone Number</h2>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0241234567"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
              disabled={voting}
            />
            <p className="text-sm text-gray-500 mt-2">
              One vote per phone number
            </p>
            
            {message && (
              <div className={`mt-4 p-4 rounded-lg ${
                message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Contestants Grid */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Select Your Favorite
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contestants.map((contestant) => (
              <div 
                key={contestant.id}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                {/* Photo */}
                <div className="h-64 bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                  {contestant.photo_url ? (
                    <img 
                      src={contestant.photo_url} 
                      alt={contestant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white text-6xl">👤</div>
                  )}
                </div>
                
                {/* Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {contestant.name}
                  </h3>
                  
                  {contestant.region && (
                    <p className="text-gray-600 mb-2">📍 {contestant.region}</p>
                  )}
                  
                  {contestant.bio && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {contestant.bio}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-purple-600">
                      {contestant.vote_count} votes
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleVote(contestant.id, contestant.name)}
                    disabled={voting || !phone}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {voting ? 'Voting...' : 'Vote Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Results Link */}
        <div className="text-center mt-12">
          <Link 
            to={`/results/${id}`}
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-purple-50 shadow-xl"
          >
            View Live Results →
          </Link>
        </div>
      </div>
    </div>
  );
}
