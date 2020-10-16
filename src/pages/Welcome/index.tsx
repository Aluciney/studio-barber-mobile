import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useTheme } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import imageLogo from '../../assets/logo_splash.png';
import imageGloboTop from '../../assets/globo_top.png';

import {
  Container,
  Header,
  Footer,
  Title,
  Text,
  Button,
  SignInButtonComponent,
  SignInLinearComponent,
  SignInLinearGoogleComponent,
  TextSign
} from './styles';
import { ActivityIndicator, Image } from 'react-native';

const Welcome = () => {
  const { signInGoogle } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  async function handlerSignInGoogle() {
    await signInGoogle(setLoading);
  }

  return (
    <Container>
      <Image 
        style={{
          position: 'absolute',
          top: 0,
        }}
        source={imageGloboTop}
      />
      <Header>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={imageLogo}
          resizeMode="stretch"
        />
      </Header>
      <Footer animation="fadeInUpBig" >
        <Title>Fique conectado com todos!</Title>
        <Text>Entrar com conta</Text>
        <Button>
          <SignInButtonComponent 
            onPress={() => navigation.navigate('SignIn')}
            disabled={loading}
          >
            <SignInLinearComponent
              colors={['#FCA129', '#a96d1d']}
            >
              <TextSign>Iniciar</TextSign>
            </SignInLinearComponent>
          </SignInButtonComponent>
          <SignInButtonComponent 
            onPress={() => handlerSignInGoogle()}
            disabled={loading}
          >
            <SignInLinearGoogleComponent
              colors={['#1a73e8', '#0f4184']}
            >
              {loading ? (
                <>
                  <ActivityIndicator size="small" color="#FFF" />
                  <TextSign style={{ marginLeft: 10, }}>carregando...</TextSign>
                </>
              ) : (
                <TextSign>Google</TextSign>
              )}
            </SignInLinearGoogleComponent>
          </SignInButtonComponent>
        </Button>
      </Footer>
    </Container>
  );
};

export default Welcome;