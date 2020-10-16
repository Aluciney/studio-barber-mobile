import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: #383443;
`;

export const Header = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled(Animatable.View)`
  flex: 1;
  background-color: #FFF;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 50px 30px;
`;

export const Button = styled.View`
  align-items: center;
  margin-top: 50px;
`;

export const SignInButtonComponent = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const SignInLinearGoogleComponent = styled(LinearGradient)`
  width: 80%;
  height: 40px;
  margin-top: 15px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  flex-direction: row; 
`;

export const SignInLinearComponent = styled(LinearGradient)`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const TextSign = styled.Text`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
`;


export const Title = styled.Text`
  color: #000;
  font-size: 30px;
  font-weight: bold;
`;

export const Text = styled.Text`
  color: #b5b5b5;
  margin-top: 5px;
`;
