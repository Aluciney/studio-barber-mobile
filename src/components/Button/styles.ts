import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 250px;
  height: 50px;
  border-radius: 30px;
  background-color: ${props => !props.enabled ? '#67482B' : '#8E633B'};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: #FFF;
  font-size: 20px;
`;

