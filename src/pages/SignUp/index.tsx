import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';

import {
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  Image
} from 'react-native';

import { useAuth } from '../../contexts/auth';
import imageNameLogo from '../../assets/logo_name.png';
import imageGloboTop from '../../assets/globo_top.png';

import {
  Container,
  Header,
  Footer,
  TextFooter,
  Action,
  TextInput,
  ErrorMsg,
  Button,
  SignInButtonComponent,
  SignInLinearComponent,
  TextSign,
  FooterScrollView
} from './styles';

interface ErrosProps {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [errors, setErrors] = useState<ErrosProps>({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const schemaName = yup.object().shape({
    name: yup.string().required('Nome é obrigatório').min(8, 'O nome deve ter no mínimo 8 caracteres'),
  });

  const schemaEmail = yup.object().shape({
    email: yup.string().email('Email informado inválido').required('Email é obrigatório'),
  });

  const schemaPassword = yup.object().shape({
    password: yup.string().required().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  });

  useEffect(() => {
    if (name !== '') {
      schemaName.validate({ name }, {
        abortEarly: false,
      })
        .then(success => {
          setErrors({
            ...errors,
            name: null,
          });
          setIsValid({
            ...isValid,
            name: true,
          });
        })
        .catch(error => {
          setErrors({
            ...errors,
            name: error.errors[0],
          });
          setIsValid({
            ...isValid,
            name: false,
          });
        });
    }
  }, [name]);

  useEffect(() => {
    if (email !== '') {
      schemaEmail.validate({ email }, {
        abortEarly: false,
      })
        .then(success => {
          setErrors({
            ...errors,
            email: null,
          });
          setIsValid({
            ...isValid,
            email: true,
          });
        })
        .catch(error => {
          setErrors({
            ...errors,
            email: error.errors[0],
          });
          setIsValid({
            ...isValid,
            email: false,
          });
        });
    }
  }, [email]);

  useEffect(() => {
    if (password !== '') {
      schemaPassword.validate({ password }, {
        abortEarly: false,
      })
        .then(success => {
          setErrors({
            ...errors,
            password: null,
          });
          setIsValid({
            ...isValid,
            password: true,
          });
        })
        .catch(error => {
          setErrors({
            ...errors,
            password: error.errors[0],
          });
          setIsValid({
            ...isValid,
            password: false,
          });
        });
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword !== '') {
      if (confirmPassword === password) {
        setErrors({
          ...errors,
          confirmPassword: null,
        });
        setIsValid({
          ...isValid,
          confirmPassword: true,
        });
      } else {
        setErrors({
          ...errors,
          confirmPassword: 'Senhas não se correspondem',
        });
        setIsValid({
          ...isValid,
          confirmPassword: true,
        });
      }
    }
  }, [confirmPassword]);

  useEffect(() => {
    if (loading) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true
      );
      return () => {
        backHandler.remove();
      }
    }
  }, [loading]);

  async function handlePressRegisterButtom() {
    setSecureText(true);
    await signUp(name, email, password, setLoading);
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
          source={imageNameLogo}
          resizeMode="stretch"
        />
      </Header>
      <Footer animation="fadeInUpBig">
        <FooterScrollView>
          <TextFooter>Nome</TextFooter>
          <Action
            style={errors.name ? { borderBottomColor: '#FF0000'} : {}}
          >
            <FontAwesome
              name="user-o"
              color="#666666"
              size={20}
              style={{ marginBottom: 15, }}
            />
            <TextInput
              placeholder="Seu nome"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              value={name}
              maxLength={50}
              onChangeText={setName}
              editable={!loading}
            />
            {isValid.name && (
              <Animatable.View animation="bounceIn" >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
            )}
          </Action>
          {errors.name && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <ErrorMsg>{errors.name}</ErrorMsg>
            </Animatable.View>
          )}
          <TextFooter>Email</TextFooter>
          <Action
            style={errors.email ? { borderBottomColor: '#FF0000'} : {}}
          >
            <FontAwesome
              name="user-o"
              color="#666666"
              size={20}
              style={{ marginBottom: 15, }}
            />
            <TextInput
              placeholder="Seu email"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
            {isValid.email && (
              <Animatable.View animation="bounceIn" >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
            )}
          </Action>
          {errors.email && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <ErrorMsg>{errors.email}</ErrorMsg>
            </Animatable.View>
          )}
          <TextFooter>Senha</TextFooter>
          <Action
            style={errors.password ? { borderBottomColor: '#FF0000'} : {}}
          >
            <Feather
              name="lock"
              color="#666666"
              size={20}
              style={{ marginBottom: 15, }}
            />
            <TextInput
              placeholder="Sua senha"
              placeholderTextColor="#666666"
              secureTextEntry={secureText}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setSecureText(!secureText)}
              disabled={loading}
            >
              <Feather
                name={secureText ? 'eye-off' : 'eye'}
                color="grey"
                size={20}
              />
            </TouchableOpacity>
          </Action>
          {errors.password && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <ErrorMsg>{errors.password}</ErrorMsg>
            </Animatable.View>
          )}
          <TextFooter>Confirmar senha</TextFooter>
          <Action
            style={errors.confirmPassword ? { borderBottomColor: '#FF0000'} : {}}
          >
            <Feather
              name="lock"
              color="#666666"
              size={20}
              style={{ marginBottom: 15, }}
            />
            <TextInput
              placeholder="Confirme sua senha"
              placeholderTextColor="#666666"
              secureTextEntry={secureText}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setSecureText(!secureText)}
              disabled={loading}
            >
              <Feather
                name={secureText ? 'eye-off' : 'eye'}
                color="grey"
                size={20}
              />
            </TouchableOpacity>
          </Action>
          {errors.confirmPassword && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <ErrorMsg>{errors.confirmPassword}</ErrorMsg>
            </Animatable.View>
          )}
          <Button style={{ marginBottom: 30 }}>
            <SignInButtonComponent
              onPress={() => handlePressRegisterButtom()}
              disabled={loading || !(isValid.email && isValid.password && isValid.confirmPassword)}
            >
              <SignInLinearComponent
                colors={loading ? ['#a96d1d', '#a96d1d'] : ['#FCA129', '#a96d1d']}
              >
                {loading ? (
                  <>
                    <ActivityIndicator size="small" color="#FFF" />
                    <TextSign style={{ marginLeft: 10, }}>carregando...</TextSign>
                  </>
                ) : (
                    <TextSign>Cadastrar</TextSign>
                  )}
              </SignInLinearComponent>
            </SignInButtonComponent>
            <SignInButtonComponent
              onPress={() => navigation.goBack()}
              style={{
                borderColor: '#a96d1d',
                borderWidth: 1,
                marginTop: 15
              }}
              disabled={loading}
            >
              <TextSign style={{ color: '#a96d1d' }}>Logar</TextSign>
            </SignInButtonComponent>
          </Button>
        </FooterScrollView>
      </Footer>
    </Container>
  );
};

export default SignUp;
