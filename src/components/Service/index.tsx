import React from 'react';
import { Image } from 'react-native';
import GloboService from '../../assets/globo_service.png';

import {
    Container,
    Label,
    ImageGloboService
} from './styles';

interface ServicesProps {
    service: ServiceProps;
    selected: boolean;
    onSelect?: (id: number) => void;
    disabled?: boolean;
}

const Service: React.FC<ServicesProps> = ({ service, selected, onSelect, disabled = false }) => {
    return (
        <Container 
            onPress={() => onSelect!(service.id)} 
            style={selected && {
                borderColor: '#FF9100',
                borderWidth: 2,
            }}
            disabled={disabled}
        >
            <ImageGloboService
                source={GloboService}
            />
            <Image source={{ uri: service.image_url, width: 65, height: 65, }} />
            <Label numberOfLines={1}>{service.name}</Label>
        </Container>
    );
}

export default Service;