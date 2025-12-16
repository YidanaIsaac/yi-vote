import { useState, useEffect } from 'react';
import { getAllContests } from '../../services/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardOverview() {
  const [contests, setContests] = useState([]);
  const [timeFilter, setTimeFilter] = useState('7days');
  const [stats, setStats] = useState({
    totalVotesToday: 1234,
    activeContests: 0,
    totalRevenue: 5840,
    newContestants: 56
  });
  const [chartData, setChartData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Votes',
        data: [450, 680, 520, 890, 750, 620, 980],
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(19, 127, 236, 0.3)');
          gradient.addColorStop(1, 'rgba(19, 127, 236, 0.01)');
          return gradient;
        },
        borderColor: 'rgba(19, 127, 236, 1)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(19, 127, 236, 1)',
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: 'rgba(19, 127, 236, 1)',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
      }
    ]
  });
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      contestant: 'Jane Cooper',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      contest: 'Global Talent Show',
      time: '2 mins ago',
      voteCount: 10
    },
    {
      id: 2,
      contestant: 'Cody Fisher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cody',
      contest: 'Summer Photo Contest',
      time: '5 mins ago',
      voteCount: 5
    },
    {
      id: 3,
      contestant: 'Esther Howard',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esther',
      contest: 'Design Challenge 2024',
      time: '12 mins ago',
      voteCount: 25
    },
    {
      id: 4,
      contestant: 'Jenny Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny',
      contest: 'Global Talent Show',
      time: '30 mins ago',
      voteCount: 8
    },
    {
      id: 5,
      contestant: 'Robert Fox',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
      contest: 'Community Awards',
      time: '1 hour ago',
      voteCount: 15
    }
  ]);
  const [totalActivities, setTotalActivities] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 5;

  useEffect(() => {
    loadDashboardData();
  }, [timeFilter]);

  const loadDashboardData = async () => {
    try {
      const response = await getAllContests();
      const contestsData = response.data;
      setContests(contestsData);

      const totalVotes = contestsData.reduce((sum, c) => sum + (c.total_votes || 0), 0);
      const totalContestants = contestsData.reduce((sum, c) => sum + (c.contestant_count || 0), 0);
      
      setStats(prev => ({
        ...prev,
        activeContests: contestsData.filter(c => c.status === 'active').length,
        newContestants: totalContestants
      }));

      updateChartData(timeFilter);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  const updateChartData = (filter) => {
    let labels, data;
    
    switch(filter) {
      case '7days':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = [450, 680, 520, 890, 750, 620, 980];
        break;
      case '30days':
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        data = [2850, 3200, 3650, 4100];
        break;
      case '90days':
        labels = ['Month 1', 'Month 2', 'Month 3'];
        data = [12500, 14800, 16200];
        break;
      case 'all':
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        data = [8500, 9200, 10500, 11800, 13200, 14500, 15800, 17200, 18500, 19800, 21000, 22500];
        break;
      default:
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = [450, 680, 520, 890, 750, 620, 980];
    }

    setChartData({
      labels,
      datasets: [
        {
          label: 'Votes',
          data,
          fill: true,
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(19, 127, 236, 0.3)');
            gradient.addColorStop(1, 'rgba(19, 127, 236, 0.01)');
            return gradient;
          },
          borderColor: 'rgba(19, 127, 236, 1)',
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: '#fff',
          pointBorderColor: 'rgba(19, 127, 236, 1)',
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: 'rgba(19, 127, 236, 1)',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 3,
        }
      ]
    });
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <p className="text-black dark:text-white text-3xl font-bold leading-tight tracking-tight">Dashboard Overview</p>
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 transition-colors">
          <span className="truncate">Create New Contest</span>
        </button>
      </div>

      {/* Chips/Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setTimeFilter('7days')}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-2 transition-colors ${
            timeFilter === '7days'
              ? 'bg-blue-600/20'
              : 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/20'
          }`}
        >
          <p className={`text-sm font-medium leading-normal ${timeFilter === '7days' ? 'text-blue-600' : ''}`}>Last 7 Days</p>
        </button>
        <button
          onClick={() => setTimeFilter('30days')}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-2 transition-colors ${
            timeFilter === '30days'
              ? 'bg-blue-600/20'
              : 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/20'
          }`}
        >
          <p className={`text-sm font-medium leading-normal ${timeFilter === '30days' ? 'text-blue-600' : ''}`}>Last 30 Days</p>
        </button>
        <button
          onClick={() => setTimeFilter('90days')}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-2 transition-colors ${
            timeFilter === '90days'
              ? 'bg-blue-600/20'
              : 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/20'
          }`}
        >
          <p className={`text-sm font-medium leading-normal ${timeFilter === '90days' ? 'text-blue-600' : ''}`}>Last 90 Days</p>
        </button>
        <button
          onClick={() => setTimeFilter('all')}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-2 transition-colors ${
            timeFilter === 'all'
              ? 'bg-blue-600/20'
              : 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/20'
          }`}
        >
          <p className={`text-sm font-medium leading-normal ${timeFilter === 'all' ? 'text-blue-600' : ''}`}>All Time</p>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Votes Today Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 border border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">how_to_vote</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400" style={{ fontSize: '14px' }}>trending_up</span>
                <span className="text-green-600 dark:text-green-400 text-xs font-semibold">+5.2%</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">Total Votes Today</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold mb-0.5">{stats.totalVotesToday.toLocaleString()}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">vs yesterday</p>
          </div>
        </div>

        {/* Active Contests Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 border border-purple-200 dark:border-purple-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-xl">emoji_events</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400" style={{ fontSize: '14px' }}>add</span>
                <span className="text-green-600 dark:text-green-400 text-xs font-semibold">2 new</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">Active Contests</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold mb-0.5">{stats.activeContests}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">this week</p>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 border border-green-200 dark:border-green-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">payments</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400" style={{ fontSize: '14px' }}>trending_up</span>
                <span className="text-green-600 dark:text-green-400 text-xs font-semibold">+12.5%</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">Total Revenue</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold mb-0.5">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">vs last week</p>
          </div>
        </div>

        {/* New Contestants Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 border border-orange-200 dark:border-orange-800/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg">
                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-xl">group_add</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 rounded-full">
                <span className="material-symbols-outlined text-red-600 dark:text-red-400" style={{ fontSize: '14px' }}>trending_down</span>
                <span className="text-red-600 dark:text-red-400 text-xs font-semibold">-3.1%</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">New Contestants</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold mb-0.5">{stats.newContestants}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">vs last week</p>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600 text-3xl">bar_chart</span>
            <h3 className="text-lg font-semibold text-black dark:text-white">Vote Trends</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-green-500" style={{ fontSize: '20px' }}>trending_up</span>
            <span>+18% this week</span>
          </div>
        </div>
        <div className="h-80">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false,
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  padding: 16,
                  titleColor: '#fff',
                  titleFont: {
                    size: 14,
                    weight: 'bold'
                  },
                  bodyColor: '#e5e7eb',
                  bodyFont: {
                    size: 13
                  },
                  borderColor: '#137fec',
                  borderWidth: 2,
                  displayColors: true,
                  boxWidth: 8,
                  boxHeight: 8,
                  usePointStyle: true,
                  callbacks: {
                    label: function(context) {
                      return ' ' + context.parsed.y.toLocaleString() + ' votes';
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: '#9ca3af',
                    font: {
                      size: 12,
                      weight: '500'
                    },
                    padding: 10,
                    callback: function(value) {
                      return value.toLocaleString();
                    }
                  },
                  grid: {
                    color: 'rgba(156, 163, 175, 0.1)',
                    drawBorder: false,
                  },
                  border: {
                    display: false
                  }
                },
                x: {
                  ticks: {
                    color: '#9ca3af',
                    font: {
                      size: 12,
                      weight: '500'
                    },
                    padding: 10
                  },
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  border: {
                    display: false
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
        <h3 className="text-lg font-semibold text-black dark:text-white p-6">Recent Voting Activity</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-white/5 border-b border-t border-gray-200 dark:border-white/10">
              <tr>
                <th scope="col" className="px-6 py-3">Contestant</th>
                <th scope="col" className="px-6 py-3">Contest Name</th>
                <th scope="col" className="px-6 py-3">Vote Time</th>
                <th scope="col" className="px-6 py-3 text-right">Vote Count</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr 
                  key={activity.id}
                  className={`bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
                    index < recentActivity.length - 1 ? 'border-b dark:border-white/10' : ''
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img 
                        alt={`Avatar of ${activity.contestant}`}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"
                        src={activity.avatar}
                      />
                      <span>{activity.contestant}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{activity.contest}</td>
                  <td className="px-6 py-4">{activity.time}</td>
                  <td className="px-6 py-4 text-right font-semibold">{activity.voteCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - Only show if more than 5 entries */}
        {totalActivities > activitiesPerPage && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-white/10">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{((currentPage - 1) * activitiesPerPage) + 1}</span> to{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {Math.min(currentPage * activitiesPerPage, totalActivities)}
              </span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{totalActivities}</span> Entries
            </span>
            <div className="inline-flex -space-x-px rounded-md text-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-white/20 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalActivities / activitiesPerPage), prev + 1))}
                disabled={currentPage >= Math.ceil(totalActivities / activitiesPerPage)}
                className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-white/20 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
