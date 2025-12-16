import { useState, useMemo } from 'react';

const VoteManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [selectedContest, setSelectedContest] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVotes, setSelectedVotes] = useState([]);

  const votes = [
    {
      id: 'YV-8A3B4C',
      contestant: 'Alice Johnson',
      voter: 'user@***.com',
      method: 'Web',
      timestamp: '2023-10-27 14:30:15',
      contest: 'Talent Show 2024'
    },
    {
      id: 'YV-9B1D5E',
      contestant: 'Bob Williams',
      voter: '+1-555-***-1234',
      method: 'SMS',
      timestamp: '2023-10-27 14:29:58',
      contest: 'Talent Show 2024'
    },
    {
      id: 'YV-7C2F6G',
      contestant: 'Charlie Brown',
      voter: 'charlie@***.com',
      method: 'Web',
      timestamp: '2023-10-27 14:29:41',
      contest: 'Design Awards'
    },
    {
      id: 'YV-6D3G7H',
      contestant: 'Diana Prince',
      voter: '+1-555-***-5678',
      method: 'SMS',
      timestamp: '2023-10-27 14:28:33',
      contest: 'Talent Show 2024'
    },
    {
      id: 'YV-5E4H8I',
      contestant: 'Ethan Hunt',
      voter: 'ethan.h@***.net',
      method: 'Web',
      timestamp: '2023-10-27 14:28:10',
      contest: 'Design Awards'
    },
    {
      id: 'YV-4F5I9J',
      contestant: 'Fiona Glenanne',
      voter: 'fiona.g@***.org',
      method: 'Web',
      timestamp: '2023-10-27 14:27:55',
      contest: 'Talent Show 2024'
    },
    {
      id: 'YV-3G6J1K',
      contestant: 'George Costanza',
      voter: '+1-555-***-9012',
      method: 'SMS',
      timestamp: '2023-10-27 14:27:22',
      contest: 'Design Awards'
    },
    {
      id: 'YV-2H7K2L',
      contestant: 'Hannah Abbott',
      voter: 'hannah.a@***.com',
      method: 'Web',
      timestamp: '2023-10-27 14:26:49',
      contest: 'Talent Show 2024'
    },
  ];

  const stats = useMemo(() => {
    const totalVotes = votes.length;
    const webVotes = votes.filter(v => v.method === 'Web').length;
    const smsVotes = votes.filter(v => v.method === 'SMS').length;
    const recentVotes = votes.filter(v => {
      const voteDate = new Date(v.timestamp);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return voteDate > oneDayAgo;
    }).length;
    
    return {
      total: totalVotes,
      web: webVotes,
      sms: smsVotes,
      recent: recentVotes
    };
  }, [votes]);

  const filteredVotes = useMemo(() => {
    return votes.filter(vote => {
      const matchesSearch = vote.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           vote.contestant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           vote.voter.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContest = selectedContest === 'all' || vote.contest === selectedContest;
      const matchesMethod = selectedMethod === 'all' || vote.method === selectedMethod;
      
      return matchesSearch && matchesContest && matchesMethod;
    });
  }, [votes, searchQuery, selectedContest, selectedMethod]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredVotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVotes = filteredVotes.slice(startIndex, startIndex + itemsPerPage);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedContest, selectedMethod]);

  const handleExport = () => {
    const csvContent = [
      ['Vote ID', 'Contestant', 'Voter', 'Method', 'Timestamp', 'Contest'],
      ...filteredVotes.map(v => [v.id, v.contestant, v.voter, v.method, v.timestamp, v.contest])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `votes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-gray-900 dark:text-white mb-1">
            Vote Monitoring &amp; Verification
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time vote tracking and verification system
          </p>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </div>
          <span className="font-semibold text-sm text-green-700 dark:text-green-400">Live Monitoring</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Total Votes */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 border border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -mr-10 -mt-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">how_to_vote</span>
              </div>
              <span className="text-[10px] font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">All Time</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-0.5">Total Votes</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold">{stats.total.toLocaleString()}</p>
          </div>
        </div>

        {/* Web Votes */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 border border-purple-200 dark:border-purple-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -mr-10 -mt-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg">
                <span className="material-symbols-outlined text-xl text-purple-600 dark:text-purple-400">language</span>
              </div>
              <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400">
                {((stats.web / stats.total) * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">Web Votes</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.web.toLocaleString()}</p>
          </div>
        </div>

        {/* SMS Votes */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 border border-green-200 dark:border-green-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full -mr-10 -mt-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
                <span className="material-symbols-outlined text-xl text-green-600 dark:text-green-400">sms</span>
              </div>
              <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">
                {((stats.sms / stats.total) * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">SMS Votes</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.sms.toLocaleString()}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3 border border-orange-200 dark:border-orange-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full -mr-10 -mt-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg">
                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-xl">schedule</span>
              </div>
              <span className="text-[10px] font-medium bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded-full">24 Hours</span>
            </div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">Recent Votes</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.recent.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col gap-3">
          {/* Main Row - Search and Actions */}
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <input
                  type="text"
                  className="block w-full pl-4 pr-10 py-2.5 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-500 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all hover:border-gray-400 dark:hover:border-gray-600"
                  placeholder="Search by Vote ID, Contestant, or Voter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filters and Export Group */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Date Range Picker */}
              <div className="relative w-full sm:w-auto sm:min-w-[180px]">
                <input
                  type="text"
                  className="block w-full pl-3 pr-3 py-2.5 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-500 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all hover:border-gray-400 dark:hover:border-gray-600"
                  placeholder="📅 Date Range"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                />
              </div>

              {/* Contest Filter */}
              <select
                className="w-full sm:w-auto h-[42px] pl-3 pr-8 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-500 text-sm cursor-pointer font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-750"
                value={selectedContest}
                onChange={(e) => setSelectedContest(e.target.value)}
              >
                <option value="all">All Contests</option>
                <option value="Talent Show 2024">Talent Show 2024</option>
                <option value="Design Awards">Design Awards</option>
              </select>

              {/* Method Filter */}
              <select
                className="w-full sm:w-auto h-[42px] pl-3 pr-8 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-500 text-sm cursor-pointer font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-750"
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
              >
                <option value="all">All Methods</option>
                <option value="Web">Web</option>
                <option value="SMS">SMS</option>
              </select>

              {/* Export Button */}
              <button
                onClick={handleExport}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-semibold shadow-md shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/30 transition-all whitespace-nowrap"
                title="Export to CSV"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedContest !== 'all' || selectedMethod !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Active Filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium max-w-xs">
                <span className="truncate">Search: {searchQuery}</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-blue-900 dark:hover:text-blue-200 flex-shrink-0">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            )}
            {selectedContest !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium max-w-xs">
                <span className="truncate">Contest: {selectedContest}</span>
                <button onClick={() => setSelectedContest('all')} className="hover:text-purple-900 dark:hover:text-purple-200 flex-shrink-0">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            )}
            {selectedMethod !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
                <span>Method: {selectedMethod}</span>
                <button onClick={() => setSelectedMethod('all')} className="hover:text-emerald-900 dark:hover:text-emerald-200 flex-shrink-0">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedContest('all');
                setSelectedMethod('all');
              }}
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium underline whitespace-nowrap ml-auto"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="hidden sm:inline">Showing </span>
            <span className="font-bold text-gray-900 dark:text-white">{filteredVotes.length}</span>
            <span> of </span>
            <span className="font-bold text-gray-900 dark:text-white">{votes.length}</span>
            <span> votes</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 border-b-2 border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">badge</span>
                    Vote ID
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">person</span>
                    Contestant
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">shield_person</span>
                    Voter
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">devices</span>
                    Method
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    Timestamp
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {paginatedVotes.length > 0 ? (
                paginatedVotes.map((vote, index) => (
                  <tr 
                    key={vote.id} 
                    className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-150 group"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                          {vote.id}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                          {vote.contestant.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{vote.contestant}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">{vote.voter}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {vote.method === 'Web' ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 ring-1 ring-blue-600/10">
                          <span className="material-symbols-outlined text-sm">language</span>
                          Web
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 dark:bg-purple-900/40 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 ring-1 ring-purple-600/10">
                          <span className="material-symbols-outlined text-sm">sms</span>
                          SMS
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {new Date(vote.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(vote.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                        <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">No votes found</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters or search query</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
          </div>
          
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex size-10 items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Previous page"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = idx + 1;
              } else if (currentPage <= 3) {
                pageNum = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + idx;
              } else {
                pageNum = currentPage - 2 + idx;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`flex size-10 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="flex size-10 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  ···
                </span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="flex size-10 items-center justify-center rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  {totalPages}
                </button>
              </>
            )}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex size-10 items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Next page"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </nav>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVotes.length)}
            </span>{' '}
            of <span className="font-semibold text-gray-900 dark:text-white">{filteredVotes.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoteManagement;
