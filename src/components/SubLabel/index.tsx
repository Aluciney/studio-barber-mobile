import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Container, Title } from './styles';

interface SubLabelProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const SubLabel: React.FC<SubLabelProps> = ({ title, style }) => {
  return (
    <Container style={style}>
      <Title>{title}</Title>
    </Container>
  );
}

export default SubLabel;