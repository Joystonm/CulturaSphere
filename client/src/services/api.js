import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User authentication
export const registerUser = (userData) => {
  return api.post('/auth/register', userData);
};

export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const getUserProfile = () => {
  return api.get('/auth/profile');
};

// User preferences
export const saveUserPreferences = (preferences) => {
  return api.post('/user/preferences', preferences);
};

export const getUserPreferences = () => {
  return api.get('/user/preferences');
};

// FlavorFusion API calls
export const getFlavorRecommendations = (tastes) => {
  return api.post('/flavor-fusion/recommendations', tastes);
};

export const saveDestination = (destination) => {
  return api.post('/flavor-fusion/save-destination', destination);
};

export const getSavedDestinations = () => {
  return api.get('/flavor-fusion/saved-destinations');
};

// TrendWeaver API calls
export const getTrends = (filters) => {
  return api.get('/trend-weaver/trends', { params: filters });
};

export const getTrendDetails = (trendId) => {
  return api.get(`/trend-weaver/trends/${trendId}`);
};

export const askAiStrategist = (question) => {
  return api.post('/trend-weaver/ai-strategist', { question });
};

export const exportTrendReport = (filters) => {
  return api.get('/trend-weaver/export', { 
    params: filters,
    responseType: 'blob' 
  });
};

// TasteQuill API calls
export const generateStory = (storyParams) => {
  return api.post('/taste-quill/generate', storyParams);
};

export const saveStory = (story) => {
  return api.post('/taste-quill/save', story);
};

export const getSavedStories = () => {
  return api.get('/taste-quill/stories');
};

export const generateCharacterSheet = (storyId) => {
  return api.post(`/taste-quill/character-sheet/${storyId}`);
};

export const submitTasteQuill = (data) => {
  return api.post('/taste-quill/submissions', data);
};

export default api;
