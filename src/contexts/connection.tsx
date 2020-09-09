import React, { createContext, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { showMessage, hideMessage } from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo'; 

interface ConnectionContextProps {
    isConnected: boolean;
}

interface StateProps {
    type: string;
    isConnected: boolean;
}

const ConnectionContext = createContext<ConnectionContextProps>({} as ConnectionContextProps);

export const ConnectionProvider: React.FC = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const netinfo = NetInfo.addEventListener(handleConnectivityChange);
        return () => netinfo();
    },[]); 

    useEffect(() => {
        if(isConnected){
            hideMessage();
        }else{
            showMessage({
                message: 'Sem internet!',
                animated: true,
                autoHide: false,
                type: 'danger',
                icon: 'danger',
            });
        }
    },[isConnected]); 

    function handleConnectivityChange(state: StateProps) {
        setIsConnected(state.isConnected);
    }

    return (
        <ConnectionContext.Provider
            value={{
                isConnected
            }}
        >
            {children}
        </ConnectionContext.Provider>
    );
}

export function useConnectionStatus() {
    const context = useContext(ConnectionContext);

    return context;
}