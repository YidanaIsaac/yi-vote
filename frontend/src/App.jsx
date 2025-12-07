function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Yi-Vote
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Professional E-Voting System
        </p>
        <div className="space-y-3">
          <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center">
            <p className="text-green-800 font-semibold">✅ Frontend Running</p>
          </div>
          <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4 text-center">
            <p className="text-blue-800 font-semibold">✅ Tailwind Working</p>
          </div>
          <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-4 text-center">
            <p className="text-purple-800 font-semibold">✅ Vite Ready</p>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">
          Week 0/10 Complete 🚀
        </p>
      </div>
    </div>
  );
}

export default App;
