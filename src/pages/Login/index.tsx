import React, { useState, useEffect, useRef } from 'react';
import { Animated, Keyboard } from 'react-native';

import {
    Container,
    GroupView,
    GloboNormalContainer,
    ContainerFormInput,
    FormInputText,
    Logo,
    LogoName
} from './styles';

import Button from '../../components/Button';
import NameLink from '../../components/NameLink';
import Label from '../../components/Label';
import SubLabel from '../../components/SubLabel';


import GloboNormal from '../../assets/globo_normal.png';
import LogoImage from '../../assets/logo.png';
import LogoNameImage from '../../assets/logo_name.png';

import { useAuth } from '../../contexts/auth';

const Login: React.FC = () => {

    const { signIn } = useAuth();

    const [email, setEmail] = useState('aluciney.wanderley@gmail.com');
    const [password, setPassword] = useState('1234567');
    const [loading, setLoading] = useState(false);

    const widthLogo = new Animated.Value(1);

    async function handlePressLoginButtom() {
        if(email.trim() && password.trim()){
            setLoading(true);
            await signIn(email, password, setLoading);
        }
        
    }

    function _keyboardDidShow () {
        Animated.timing(widthLogo,{
            toValue: 0.5,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }
    
    function _keyboardDidHide () {
        Animated.timing(widthLogo,{
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    return (
        <Container>
            <GroupView style={{ paddingBottom: 0, }}>
                <LogoName
                    source={LogoNameImage}
                />
                <Animated.View 
                    style={{ 
                        transform: [ 
                            { scale: widthLogo },
                            { translateY: widthLogo.interpolate({
                                    inputRange: [0.5, 1],
                                    outputRange: [-120, 0]
                                })
                            }
                        ], 
                    }}
                >
                    <Logo
                        source={LogoImage}
                    />
                </Animated.View>
            </GroupView>
            <Animated.View 
                style={{
                    transform: [{ translateY: widthLogo.interpolate({
                            inputRange: [0.5, 1],
                            outputRange: [-120, 0]
                        })
                    }]
                }}
            >
                <GroupView style={{ paddingTop: 0, paddingBottom: 0, marginTop: 10, }}>
                    <SubLabel title="E-mail" style={{ alignSelf: 'flex-start', marginBottom: 5, marginLeft: 20, }} />
                    <ContainerFormInput >
                        <FormInputText
                            onBlur={_keyboardDidHide}
                            onFocus={_keyboardDidShow}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            editable={!loading}
                            maxLength={40}
                            onChangeText={setEmail}
                        />
                    </ContainerFormInput>
                    <SubLabel title="Senha" style={{ fontSize: 12, alignSelf: 'flex-start', marginBottom: 5, marginLeft: 20, }} />
                    <ContainerFormInput >
                        <FormInputText
                            onBlur={_keyboardDidHide}
                            onFocus={_keyboardDidShow}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            value={password}
                            editable={!loading}
                            maxLength={15}
                            onChangeText={setPassword}
                        />
                    </ContainerFormInput>
                </GroupView>
            </Animated.View>
            <GroupView style={{ paddingTop: 30, paddingBottom: 20, }}>
                <Button
                    title="Fazer login"
                    loading={loading}
                    onPress={() => handlePressLoginButtom()}
                />
                <NameLink title="Não possui cadastro? Cadastre-se." style={{ marginTop: 15, }} disabled={loading} />
            </GroupView>
            <GloboNormalContainer
                source={GloboNormal}
            />
        </Container>
    );
}

export default Login;