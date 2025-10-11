import axios from 'axios';
import { API_BASE } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
});

client.interceptors.request.use(async (cfg) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

export default client;