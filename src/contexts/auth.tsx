import React, { createContext, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { showMessage } from 'react-native-flash-message';

import {
  USER_KEY,
  TOKEN_KEY,
  GOOGLE_ACCOUNT_IOS_CLIENT_ID,
  GOOGLE_ACCOUNT_ANDROID_CLIENT_ID
} from '../../.env.json';

import api from '../services/api';

interface AuthContextProps {
  signed: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn(email: string, password: string, setLoading: Dispatch<SetStateAction<boolean>>): void;
  signUp(name: string, email: string, password: string, setLoading: Dispatch<SetStateAction<boolean>>): void;
  signInGoogle(setLoading: Dispatch<SetStateAction<boolean>>): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const [storagedUser, storagedToken] = await AsyncStorage.multiGet([USER_KEY, TOKEN_KEY]);
      if (storagedUser[1] && storagedToken[1]) {
        setUser(JSON.parse(storagedUser[1]));
        setToken(storagedToken[1]);
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(email: string, password: string, setLoading: Dispatch<SetStateAction<boolean>>) {
    setLoading(true);
    api.post(`authentication/login`, {
      email,
      password
    }).then(async response => {
      setUser(response.data.user);
      await AsyncStorage.multiSet([
        [USER_KEY, JSON.stringify(response.data.user)],
        [TOKEN_KEY, response.data.token]
      ]);
    }).catch(error => {
      const message = error.response ? error.response.data.message : 'Tivemos um problema. Tente novamente.';
      errorShowMessage(message);
      setLoading(false);
    });
  }

  async function signUp(name: string, email: string, password: string, setLoading: Dispatch<SetStateAction<boolean>>) {
    setLoading(true);
    api.post(`users`, {
      name,
      email,
      password
    }).then(async response => {
      setUser(response.data.user);
      await AsyncStorage.multiSet([
        [USER_KEY, JSON.stringify(response.data.user)],
        [TOKEN_KEY, response.data.token]
      ]);
    }).catch(error => {
      const message = error.response ? error.response.data.message : 'Tivemos um problema. Tente novamente.';
      errorShowMessage(message);
      setLoading(false);
    });
  }

  async function signInGoogle(setLoading: Dispatch<SetStateAction<boolean>>) {
    setLoading(true);
    const result = await Google.logInAsync({
      iosClientId: GOOGLE_ACCOUNT_IOS_CLIENT_ID,
      androidClientId: GOOGLE_ACCOUNT_ANDROID_CLIENT_ID,
      scopes: ["profile", "email"]
    });
    if (result.type === "success") {
      api.post('/authentication/login/google', {
        name: result.user.name,
        email: result.user.email,
        password: 'B5j5L6b1l00spa',
        avatar_url: result.user.photoUrl
      }).then(async response => {
        setUser(response.data.user);
        await AsyncStorage.multiSet([
          [USER_KEY, JSON.stringify(response.data.user)],
          [TOKEN_KEY, response.data.token]
        ]);
      }).catch(error => {
        const message = error.response ? error.response.data.message : 'Tivemos um problema. Tente novamente.';
        errorShowMessage(message);
        setLoading(false);
      });
    } else {
      errorShowMessage('Tente novamente');
      setLoading(false);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.clear();
  }

  function errorShowMessage(message: string) {
    showMessage({
      message: message,
      type: 'danger',
      icon: 'danger',
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        token,
        loading,
        signIn,
        signUp,
        signInGoogle,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}