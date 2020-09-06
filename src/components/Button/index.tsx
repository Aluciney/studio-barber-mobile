import React from 'react';

import { Container, Title } from './styles';
import { ActivityIndicator } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => {};
    style?: any;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style, loading = false }) => {

    return (
        <Container
            onPress={onPress}
            style={[style,{ backgroundColor : loading ? '#67482B' : '#8E633B' }]}
            disabled={loading}
        >
            {loading ? (
                <>
                    <ActivityIndicator size="small" color="#B5B5B5" />
                    <Title style={{ marginLeft: 10 }}>carregando...</Title>
                </>
            ) : (
                <Title>{title}</Title>
            )}            
        </Container >
    );
}

export default Button;