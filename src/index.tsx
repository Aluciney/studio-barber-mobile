import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import { ConnectionProvider } from './contexts/connection';

const App: React.FC = () => {
    return (
        <ActionSheetProvider>
            <ConnectionProvider>
                <AuthProvider>
                    <Routes />
                    <FlashMessage 
                        position="bottom" 
                        style={{ alignItems: 'center', height: 40, }}
                    />
                </AuthProvider>
            </ConnectionProvider>
        </ActionSheetProvider>
    );
}

export default App;