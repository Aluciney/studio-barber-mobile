import React from 'react';
import GloboService from '../../assets/globo_service.png';

import {
    Container,
    Label,
    LabelValue,
    ImageGloboService,
    Border,
    ImageService
} from './styles';

interface ServicesProps {
    service: Service;
    selected: boolean;
    onSelect?: (id: number) => void;
    disabled?: boolean;
}

const Service: React.FC<ServicesProps> = ({ service, selected, onSelect, disabled = false }) => {
    var value_string = service.value.toFixed(2);
    var value_number = value_string.replace('.', ',');

    return (
        <Container
            onPress={() => onSelect!(service.id)}
            style={selected && {
                borderColor: '#FF9100',
                borderWidth: 2,
            }}
            disabled={disabled}
        >
            <Border />
            <ImageGloboService
                source={GloboService}
            />
            <ImageService
                source={{ uri: service.image_url, width: 65, height: 65, }}
            />
            <Label numberOfLines={1}>{service.name}</Label>
            <LabelValue numberOfLines={1}>{'R$ ' + value_number}</LabelValue>
        </Container>
    );
}

export default Service;