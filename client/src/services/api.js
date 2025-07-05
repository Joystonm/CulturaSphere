import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// FlavorFusion API calls
export const getCuisines = () => api.get('/flavor-fusion/cuisines');
export const getCuisineById = (id) => api.get(`/flavor-fusion/cuisines/${id}`);
export const getDestinations = () => api.get('/flavor-fusion/destinations');
export const getDestinationById = (id) => api.get(`/flavor-fusion/destinations/${id}`);
export const getFlavorRecommendations = (preferences) => api.post('/flavor-fusion/recommendations', { preferences });

// TrendWeaver API calls
export const getTrends = () => api.get('/trend-weaver/trends');
export const getTrendsByCategory = (category) => api.get(`/trend-weaver/trends/${category}`);
export const getInsights = () => api.get('/trend-weaver/insights');
export const getTrendRecommendations = (preferences) => api.post('/trend-weaver/recommendations', { preferences });

// TasteQuill API calls
export const generateStory = (storyData) => api.post('/taste-quill/generate', storyData);
export const saveStory = (storyData) => api.post('/taste-quill/save', storyData);
export const getUserStories = () => api.get('/taste-quill/stories');
export const getStoryById = (id) => api.get(`/taste-quill/stories/${id}`);
export const deleteStory = (id) => api.delete(`/taste-quill/stories/${id}`);

export default api;
