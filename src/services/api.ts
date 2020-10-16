import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_BASE_URL, TOKEN_KEY } from '../../.env.json';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;