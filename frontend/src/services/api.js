import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;


export const getActiveContests = () => api.get('/api/contests/active');
export const getContestById = (id) => api.get(`/api/contests/${id}`);

export const getContestantsByContest = (contestId) => 
  api.get(`/api/contestants/contest/${contestId}`);

export const castVote = (voteData) => api.post('/api/votes/', voteData);
export const getVoteResults = (contestId) => 
  api.get(`/api/votes/results/${contestId}`);


export const adminLogin = (credentials) => 
  api.post('/api/admin/login', credentials);

export const setupFirstAdmin = (adminData) => 
  api.post('/api/admin/setup-first-admin', adminData);

export const getCurrentAdmin = () => api.get('/api/admin/me');

export const createContest = (contestData) => 
  api.post('/api/contests/', contestData);

export const updateContest = (id, contestData) => 
  api.put(`/api/contests/${id}`, contestData);

export const deleteContest = (id) => 
  api.delete(`/api/contests/${id}`);

export const getAllContests = () => api.get('/api/contests/');

export const createContestant = (contestantData) => 
  api.post('/api/contestants/', contestantData);

export const updateContestant = (id, contestantData) => 
  api.put(`/api/contestants/${id}`, contestantData);

export const deleteContestant = (id) => 
  api.delete(`/api/contestants/${id}`);
