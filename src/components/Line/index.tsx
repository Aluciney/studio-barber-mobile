import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';

import { Container } from './styles';

interface LineProps {
    style?: StyleProp<ViewStyle>
}

const Line: React.FC<LineProps> = ({ style }) => {
    return (
        <Container style={style} />
    );
}

export default Line;