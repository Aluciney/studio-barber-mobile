import React from 'react';
import { Image } from 'react-native';
import GloboService from '../../assets/globo_service.png';
import CorteCabelo from '../../assets/corte_cabelo.png';

import {
    Container,
    Label,
    ImageGloboService
} from './styles';

interface ServicesProps {
    service: ServiceProps;
    selected: boolean;
    onSelect: (id: number) => void;
    disabled?: boolean;
}

const Service: React.FC<ServicesProps> = ({ service, selected, onSelect, disabled = false }) => {
    return (
        <Container 
            onPress={() => onSelect(service.id)} 
            style={selected && {
                borderColor: '#FF9100',
                borderWidth: 2,
            }}
            disabled={disabled}
        >
            <ImageGloboService
                source={GloboService}
            />
            <Image source={CorteCabelo}/>
            <Label numberOfLines={1}>{service.label}</Label>
        </Container>
    );
}

export default Service;