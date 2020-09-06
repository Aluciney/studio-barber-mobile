import axios from 'axios';
import { getToken } from './auth';
import { API_BASE_URL } from '../../.env.json';

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
});

api.interceptors.request.use(async config => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;