import React from 'react';

import {
    Container,
    TimeButton
} from './styles';

const TimeLoading: React.FC = () => {

    const times = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

    return (
        <Container>
            {times.map((item: any, key: number) => <TimeButton key={key} />)}
        </Container>
    );
}

export default TimeLoading;