import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: #383443;
`;

export const Header = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  padding-bottom: 20px;
`;

export const Footer = styled(Animatable.View)`
  flex: 3;
  background-color: #FFF;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 30px 20px;
`;

export const TextFooter = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
`;

export const Action = styled.View`
  flex-direction: row;
  margin-top: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #F2F2F2;
  padding-bottom: 5px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  margin-top: ${Platform.OS === 'ios' ? 0 : -12}px;
  padding-left: 10px;
  color: #05375a;
`;

export const ErrorMsg = styled.Text`
  color: #FF000099;
  font-size: 12px;
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

export const SignInLinearComponent = styled(LinearGradient)`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-direction: row; 
`;

export const TextSign = styled.Text`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
`;
