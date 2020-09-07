import React from 'react';

import {
    Container,
    TimeButton
} from './styles';

const TimeLoading: React.FC = () => {

    const times = [ 1, 2, ,3 ];

    return (
        <Container>
            {times.map((item: any, key: number) => <TimeButton key={key} />)}
        </Container>
    );
}

export default TimeLoading;