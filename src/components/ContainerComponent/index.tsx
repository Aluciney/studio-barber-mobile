import React from 'react';

import GloboTop from '../../assets/globo_top.png';

import { 
    Container,
    GloboTopContainer
} from './styles';

const ContainerComponent: React.FC = ({ children }) => {
    return (
        <Container>
            <GloboTopContainer 
                source={GloboTop}
            />
            {children}
        </Container>
    );
}

export default ContainerComponent;