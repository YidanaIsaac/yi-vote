import { useState, useEffect } from 'react';
import { getContestantsByContest, getAllContests } from '../../services/api';

export default function ContestantManagement() {
  const [loading, setLoading] = useState(false);
  const [contestants, setContestants] = useState([
    {
      id: 1,
      name: 'Olivia Chen',
      email: 'olivia.chen@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
      contest: 'Singing Competition 2024',
      votes: 1402,
      status: 'active',
      joinedDate: '2024-12-01'
    },
    {
      id: 2,
      name: 'Liam Rodriguez',
      email: 'liam.rodriguez@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
      contest: 'Annual Bake-Off',
      votes: 986,
      status: 'active',
      joinedDate: '2024-11-28'
    },
    {
      id: 3,
      name: 'Ava Patel',
      email: 'ava.patel@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava',
      contest: 'Art Showcase',
      votes: 754,
      status: 'active',
      joinedDate: '2024-11-25'
    },
    {
      id: 4,
      name: 'Noah Kim',
      email: 'noah.kim@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah',
      contest: 'Singing Competition 2024',
      votes: 1120,
      status: 'active',
      joinedDate: '2024-11-20'
    },
    {
      id: 5,
      name: 'Emma Watson',
      email: 'emma.watson@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      contest: 'Design Challenge 2024',
      votes: 892,
      status: 'active',
      joinedDate: '2024-11-15'
    },
    {
      id: 6,
      name: 'James Miller',
      email: 'james.miller@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      contest: 'Singing Competition 2024',
      votes: 1567,
      status: 'active',
      joinedDate: '2024-11-10'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContest, setSelectedContest] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 5;
  
  const stats = {
    totalContestants: contestants.length,
    activeContestants: contestants.filter(c => c.status === 'active').length,
    totalVotes: contestants.reduce((sum, c) => sum + c.votes, 0),
    avgVotes: contestants.length > 0 ? Math.round(contestants.reduce((sum, c) => sum + c.votes, 0) / contestants.length) : 0
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedContest, statusFilter]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleEdit = (id) => {
    console.log('Edit contestant:', id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contestant?')) {
      setContestants(contestants.filter(c => c.id !== id));
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      console.log('Delete contestant:', id);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} contestant(s)?`)) {
      setContestants(contestants.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
      console.log('Bulk delete:', selectedIds);
    }
  };

  const filteredContestants = contestants
    .filter(contestant => {
      const matchesSearch = contestant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contestant.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContest = selectedContest === 'all' || contestant.contest === selectedContest;
      const matchesStatus = statusFilter === 'all' || contestant.status === statusFilter;
      return matchesSearch && matchesContest && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'votes') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const totalPages = Math.ceil(filteredContestants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContestants = filteredContestants.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentContestants.map(c => c.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectContestant = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      setSelectAll(false);
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="w-full">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <p className="text-black dark:text-white text-3xl font-bold leading-tight tracking-tight mb-1">
            Contestant Management
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Manage and monitor all contestants across competitions
          </p>
        </div>
        <button 
          onClick={() => alert('Add Contestant modal coming soon!')}
          className="flex items-center justify-center gap-2 rounded-lg h-11 px-5 bg-blue-600 text-white text-sm font-bold leading-normal hover:bg-blue-700 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          <span className="truncate">Add Contestant</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Contestants */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 border border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">group</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">Total Contestants</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold">{stats.totalContestants}</p>
          </div>
        </div>

        {/* Active Contestants */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 border border-green-200 dark:border-green-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">verified</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">Active</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold">{stats.activeContestants}</p>
          </div>
        </div>

        {/* Total Votes */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 border border-purple-200 dark:border-purple-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-xl">how_to_vote</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">Total Votes</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold">{stats.totalVotes.toLocaleString()}</p>
          </div>
        </div>

        {/* Average Votes */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 border border-orange-200 dark:border-orange-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg">
                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-xl">trending_up</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">Avg. Votes</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold">{stats.avgVotes}</p>
          </div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 mb-5 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-2.5">
          {/* Search Bar */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <input
                type="text"
                className="block w-full pl-3.5 pr-10 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-500 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-600"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Contest Filter */}
            <select
              className="h-9 pl-2.5 pr-2.5 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-500 text-sm font-medium cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-750"
              value={selectedContest}
              onChange={(e) => setSelectedContest(e.target.value)}
            >
              <option value="all">All Contests</option>
              <option value="Singing Competition 2024">Singing Competition 2024</option>
              <option value="Annual Bake-Off">Annual Bake-Off</option>
              <option value="Art Showcase">Art Showcase</option>
              <option value="Design Challenge 2024">Design Challenge 2024</option>
            </select>

            {/* Status Filter */}
            <select
              className="h-9 pl-2.5 pr-2.5 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-500 text-sm font-medium cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-750"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Export Button */}
          <button 
            onClick={() => {
              const csvContent = [
                ['Name', 'Email', 'Contest', 'Status', 'Votes', 'Joined Date'],
                ...filteredContestants.map(c => [c.name, c.email, c.contest, c.status, c.votes, c.joinedDate])
              ].map(row => row.join(',')).join('\n');
              
              const blob = new Blob([csvContent], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `contestants-${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
              window.URL.revokeObjectURL(url);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-semibold shadow-md shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/30 transition-all whitespace-nowrap"
            title="Export filtered contestants to CSV"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Export CSV</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-end gap-1.5 text-sm whitespace-nowrap mt-2.5 pt-2.5 border-t border-gray-200 dark:border-gray-700">
          <span className="text-gray-500 dark:text-gray-400">Showing</span>
          <span className="font-semibold text-gray-900 dark:text-white">{filteredContestants.length}</span>
          <span className="text-gray-500 dark:text-gray-400">of</span>
          <span className="font-semibold text-gray-900 dark:text-white">{contestants.length}</span>
          <span className="text-gray-500 dark:text-gray-400">contestants</span>
        </div>

        {/* Filter Tags */}
        {(searchQuery || selectedContest !== 'all' || statusFilter !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Active Filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-blue-900 dark:hover:text-blue-200">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            )}
            {selectedContest !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
                Contest: {selectedContest}
                <button onClick={() => setSelectedContest('all')} className="ml-1 hover:text-purple-900 dark:hover:text-purple-200">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter('all')} className="ml-1 hover:text-green-900 dark:hover:text-green-200">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedContest('all');
                setStatusFilter('all');
              }}
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">check_circle</span>
              <div>
                <span className="text-sm font-semibold text-blue-900 dark:text-blue-100 block">
                  {selectedIds.length} contestant{selectedIds.length > 1 ? 's' : ''} selected
                </span>
                <button 
                  onClick={() => setSelectedIds([])}
                  className="text-xs text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 underline"
                >
                  Clear selection
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('Email feature coming soon!')}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
                <span>Send Email</span>
              </button>
              <button 
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 text-sm font-medium transition-all"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
                <span>Delete Selected</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contestants Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Table Header with Results Count */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-700 dark:text-gray-300 text-2xl">people</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contestants List</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {currentContestants.length} of {filteredContestants.length} contestant{filteredContestants.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors select-none"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    <span>Contestant</span>
                    {sortField === 'name' && (
                      <span className="material-symbols-outlined text-sm">
                        {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors select-none"
                  onClick={() => handleSort('contest')}
                >
                  <div className="flex items-center gap-2">
                    <span>Contest</span>
                    {sortField === 'contest' && (
                      <span className="material-symbols-outlined text-sm">
                        {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors select-none"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    <span>Status</span>
                    {sortField === 'status' && (
                      <span className="material-symbols-outlined text-sm">
                        {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors select-none"
                  onClick={() => handleSort('votes')}
                >
                  <div className="flex items-center gap-2">
                    <span>Votes</span>
                    {sortField === 'votes' && (
                      <span className="material-symbols-outlined text-sm">
                        {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors select-none"
                  onClick={() => handleSort('joinedDate')}
                >
                  <div className="flex items-center gap-2">
                    <span>Joined</span>
                    {sortField === 'joinedDate' && (
                      <span className="material-symbols-outlined text-sm">
                        {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentContestants.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <span className="material-symbols-outlined text-gray-400 text-5xl">search_off</span>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">No contestants found</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentContestants.map((contestant, index) => (
                  <tr
                    key={contestant.id}
                    className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-${contestant.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                          checked={selectedIds.includes(contestant.id)}
                          onChange={() => handleSelectContestant(contestant.id)}
                        />
                        <label htmlFor={`checkbox-table-${contestant.id}`} className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      <img
                        className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                        src={contestant.avatar}
                        alt={`Photo of ${contestant.name}`}
                      />
                      <div className="pl-4">
                        <div className="text-base font-semibold">{contestant.name}</div>
                        <div className="font-normal text-sm text-gray-500 dark:text-gray-400">{contestant.email}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{contestant.contest}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {contestant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-lg">how_to_vote</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{contestant.votes.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{contestant.joinedDate}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-1">
                        <button
                          onClick={() => handleEdit(contestant.id)}
                          className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-600/10 transition-colors"
                          title="Edit contestant"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => alert(`Viewing details for ${contestant.name}\n\nEmail: ${contestant.email}\nContest: ${contestant.contest}\nVotes: ${contestant.votes}\nStatus: ${contestant.status}\nJoined: ${contestant.joinedDate}`)}
                          className="p-2 text-gray-500 hover:text-green-600 rounded-lg hover:bg-green-600/10 transition-colors"
                          title="View details"
                        >
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <button
                          onClick={() => handleDelete(contestant.id)}
                          className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-600/10 transition-colors"
                          title="Delete contestant"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredContestants.length > itemsPerPage && (
          <nav aria-label="Table navigation" className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-gray-200 dark:border-gray-800 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}-{Math.min(endIndex, filteredContestants.length)}</span> of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{filteredContestants.length}</span>
              </span>
            </div>
            
            <ul className="inline-flex items-center -space-x-px shadow-sm">
              <li>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-4 h-10 leading-tight rounded-l-lg border transition-colors ${
                    currentPage === 1
                      ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                      : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white cursor-pointer'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>
              </li>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return pageNum;
              }).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 h-10 leading-tight border transition-colors ${
                      currentPage === page
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 border-blue-600 font-semibold z-10'
                        : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                </li>
              ))}
              
              <li>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-4 h-10 leading-tight rounded-r-lg border transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                      : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white cursor-pointer'
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
