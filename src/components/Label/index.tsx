import React from 'react';

import { Container, Title } from './styles';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

interface LabelProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const Label: React.FC<LabelProps> = ({ title, style, textStyle }) => {
    return (
        <Container style={style} >
            <Title style={textStyle}>{title}</Title>
        </Container>
    );
}

export default Label;