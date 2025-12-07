import { useState, useEffect } from 'react';

function App() {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [contestants, setContestants] = useState([]);
  const [voterPhone, setVoterPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/contests/`)
      .then(res => res.json())
      .then(data => {
        setContests(data);
        if (data.length > 0) {
          selectContest(data[0].id);
        }
      });
  }, []);

  const selectContest = (contestId) => {
    setSelectedContest(contestId);
    setMessage('');
    
    fetch(`${API_URL}/api/contestants/contest/${contestId}`)
      .then(res => res.json())
      .then(data => setContestants(data));
  };

  const handleVote = (contestantId, contestantName) => {
    if (!voterPhone) {
      setMessage('⚠️ Please enter your phone number');
      return;
    }

    setLoading(true);
    setMessage('');

    fetch(`${API_URL}/api/votes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contest_id: selectedContest,
        contestant_id: contestantId,
        voter_identifier: voterPhone,
        vote_method: 'web'
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.detail) });
        }
        return res.json();
      })
      .then(() => {
        setMessage(`✅ Your vote for ${contestantName} has been recorded!`);
        setVoterPhone('');
        selectContest(selectedContest);
      })
      .catch(err => {
        setMessage(`❌ ${err.message}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-3">
            Yi-Vote
          </h1>
          <p className="text-white text-xl font-medium">
            Vote for Your Favorite Contestant
          </p>
        </div>

        {/* Phone Input */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 mb-8 max-w-lg mx-auto">
          <label className="block text-gray-800 font-bold text-lg mb-3">
            📱 Enter Your Phone Number:
          </label>
          <input
            type="tel"
            value={voterPhone}
            onChange={(e) => setVoterPhone(e.target.value)}
            placeholder="0244123456"
            className="w-full px-5 py-4 border-3 border-purple-300 rounded-xl focus:border-purple-600 focus:outline-none text-xl font-semibold"
          />
        </div>

        {/* Message */}
        {message && (
          <div className={`max-w-lg mx-auto mb-8 p-5 rounded-xl text-center font-bold text-lg shadow-lg ${
            message.includes('✅') 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {message}
          </div>
        )}

        {/* Contestants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contestants.map(contestant => (
            <div 
              key={contestant.id} 
              className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition hover:scale-105 hover:shadow-3xl"
            >
              {/* Avatar */}
              <div className="h-72 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center">
                <div className="text-white text-8xl">��</div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {contestant.name}
                </h3>
                
                <p className="text-pink-600 font-bold text-lg mb-2">
                  📍 {contestant.region}
                </p>
                
                <p className="text-gray-600 text-base mb-4">
                  {contestant.bio}
                </p>

                {/* Vote Count */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-5 text-center">
                  <p className="text-purple-800 font-extrabold text-2xl">
                    🗳️ {contestant.vote_count || 0} Votes
                  </p>
                </div>

                {/* Vote Button */}
                <button
                  onClick={() => handleVote(contestant.id, contestant.name)}
                  disabled={loading || !voterPhone}
                  className={`w-full py-4 rounded-xl font-bold text-white text-xl shadow-lg transition transform ${
                    loading || !voterPhone
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                  }`}
                >
                  {loading ? '⏳ Voting...' : '��️ VOTE NOW'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {contestants.length === 0 && (
          <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-16 text-center">
            <div className="text-6xl mb-4">🗳️</div>
            <p className="text-gray-600 text-2xl font-semibold">
              No contestants available yet
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-white">
          <p className="text-lg font-medium">
            Powered by Yi-Vote • Transparent & Secure Voting
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
