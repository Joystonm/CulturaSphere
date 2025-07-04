import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// FlavorFusion API calls
export const getFlavorRecommendations = (preferences) => {
  return api.post('/flavor-fusion/recommendations', preferences);
};

// TrendWeaver API calls
export const getTrends = (filters) => {
  return api.get('/trend-weaver/trends', { params: filters });
};

// TasteQuill API calls
export const submitTasteQuill = (data) => {
  return api.post('/taste-quill/submissions', data);
};

export const getTasteQuillSubmissions = () => {
  return api.get('/taste-quill/submissions');
};

// User authentication (if needed)
export const registerUser = (userData) => {
  return api.post('/auth/register', userData);
};

export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

export default api;
