import React, { createContext, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { AsyncStorage } from  'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';

import * as auth from '../services/auth';

import { USER_KEY, TOKEN_KEY } from '../../.env.json';

interface AuthContextProps {
    signed: boolean;
    user: UserProps | null;
    loading: boolean;
    signIn(email: string, password: string, setLoading: Dispatch<SetStateAction<boolean>>): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData(){
            const [ storagedUser, storagedToken ] = await AsyncStorage.multiGet([USER_KEY, USER_KEY]);
            if(storagedUser[1] && storagedToken[1]){
                setUser(JSON.parse(storagedUser[1]));
            }
            setLoading(false);
        }

        loadStorageData();
    },[]);   

    async function signIn(email: string, password: string, setLoading: Dispatch<SetStateAction<boolean>>){
        const reponse = await auth.signIn(email, password);
        if(!reponse.error && reponse.user && reponse.token){
            setUser(reponse.user);
            await AsyncStorage.multiSet([
                [USER_KEY, JSON.stringify(reponse.user)],
                [TOKEN_KEY, reponse.token]
            ]);
        }else{
            if(reponse.error){
                setLoading(false);
                showMessage({
                    message: reponse.error,
                    type: 'danger',
                    icon: 'danger',
                });
            }
        }
        
    }

    async function signOut(){
        setUser(null);
        await AsyncStorage.clear();
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}