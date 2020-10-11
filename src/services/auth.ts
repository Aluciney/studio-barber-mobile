import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { API_BASE_URL, TOKEN_KEY, USER_KEY } from '../../.env.json';

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
});

export const getToken = async () => await AsyncStorage.getItem(TOKEN_KEY);

interface SignInProps {
    token?: string;
    user?: UserProps;
    error?: string | null;
}

export function signIn(email: string, password: string): Promise<SignInProps>{

    return new Promise((resolve) => {
        api.post(`authentication/login`,{
            email,
            password
        }).then(response => {
            resolve({
                user: response.data.user,
                token: response.data.token,
            });
        }).catch(error => {
            resolve({
                error: error.response ? error.response.data.error : 'Tivemos um problema. Tente novamente.'
            });
        });
    });
}