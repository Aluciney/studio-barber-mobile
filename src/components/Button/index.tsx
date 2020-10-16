import React, { useState } from 'react';

import { Container, Title } from './styles';
import { ActivityIndicator, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  // onPress?: (event: GestureResponderEvent) => void | undefined;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style, loading = false, disabled = false }) => {
  const enabled = !loading && !disabled;
  return (
    <Container
      onPress={onPress}
      style={style}
      enabled={enabled}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color="#B5B5B5" />
          <Title style={{ marginLeft: 10, color: '#B5B5B5' }}>carregando...</Title>
        </>
      ) : (
          <Title style={{ color: enabled ? '#FFF' : '#B5B5B5' }}>{title}</Title>
        )}
    </Container >
  );
}

export default Button;