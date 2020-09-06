import React from 'react';

import { Container, Title } from './styles';
import { GestureResponderEvent } from 'react-native';

interface NameLinkProps {
    title: string;
    onPress?: (event: GestureResponderEvent) => void;
    style?: any;
    disabled?: boolean;
}

const NameLink: React.FC<NameLinkProps> = ({ title, onPress, style, disabled = false }) => {
    return (
        <Container 
            onPress={onPress} 
            style={style} 
            disabled={disabled}
        >
            <Title>{title}</Title>
        </Container>
    );
}

export default NameLink;