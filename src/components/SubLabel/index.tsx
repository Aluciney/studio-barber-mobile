import React from 'react';

import { Container, Title } from './styles';

interface SubLabelProps {
    title: string;
    style?: any;
}

const SubLabel: React.FC<SubLabelProps> = ({ title, style }) => {
    return (
        <Container style={style}>
            <Title>{title}</Title>
        </Container>
    );
}

export default SubLabel;