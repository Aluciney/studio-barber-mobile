import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, LayoutAnimation, Platform, StyleSheet, UIManager } from 'react-native'
import LogoImage from '../../assets/logo.png';

import { Image, View } from 'react-native-animatable';

// import { Container } from './styles';
import metrics from '../../utils/metrics';

import Opening from './Opening';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8;

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true);

interface AuthScreensProps {
    isLoggedIn: boolean;
    isLoading: boolean;
    signup: () => void;
    login: (email: string, password: string) => void;
    onLoginAnimationCompleted: () => {};
}

const AuthScreen: React.FC<AuthScreensProps> = ({ isLoggedIn, isLoading, signup, login, onLoginAnimationCompleted }) => {

    const [visibleForm, setVisibleForm] = useState<'LOGIN' | 'SIGNUP' | null>(null);
    const logoImgRef = useRef(null);

    return (
        <View style={styles.container}>
            <Image
                ref={logoImgRef}
                animation={'bounceIn'}
                duration={1200}
                delay={200}
                style={styles.logoImg}
                source={LogoImage}
            />
            {(!visibleForm && !isLoggedIn) && (
                <Opening
                    onCreateAccountPress={() => setVisibleForm('SIGNUP')}
                    onSignInPress={() => setVisibleForm('LOGIN')}
                />
            )}
            <KeyboardAvoidingView
                keyboardVerticalOffset={-100}
                behavior={'padding'}
                style={[(!visibleForm) ? { height: 0 } : { marginTop: 40 }, styles.bottom]}
            >
                {/* {(visibleForm === 'SIGNUP') && (
                    <SignupForm
                        onLoginLinkPress={() => setVisibleForm('LOGIN')}
                        onSignupPress={signup}
                        isLoading={isLoading}
                    />
                )} */}
                {(visibleForm === 'LOGIN') && (
                    <LoginForm
                        onSignupLinkPress={() => setVisibleForm(null)}
                        onLoginPress={login}
                        isLoading={isLoading}
                    />
                )}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: metrics.DEVICE_WIDTH,
        height: metrics.DEVICE_HEIGHT,
        paddingTop: 24,
        backgroundColor: 'white'
    },
    logoImg: {
        flex: 1,
        // height: null,
        width: IMAGE_WIDTH,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginVertical: 30
    },
    bottom: {
        backgroundColor: '#1976D2'
    }
});

export default AuthScreen;