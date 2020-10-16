import React, { Dispatch, SetStateAction } from 'react';

import {
    Container,
    TimeButton,
    TimeText
} from './styles';

interface TimeComponentProps {
    onPress: Dispatch<SetStateAction<Time | null>>;
    times: Time[];
    disableds: Time[];
    timeSelected: Time | null;
}

const Time: React.FC<TimeComponentProps> = ({ onPress, times = [], disableds = [], timeSelected = null }) => {

    function handlePressTime(time: any) {
        onPress(time)
    }

    function renderItem(item: Time, key: number) {
        var item_disabled = false;

        disableds.map(disabled => {
            if (disabled.id === item.id) {
                item_disabled = true;
            }
        });

        return (
            <TimeButton
                key={key} 
                disabled={item_disabled} 
                onPress={() => handlePressTime(item) } 
                selected={timeSelected && timeSelected.id === item.id}
            >
                <TimeText
                    style={(timeSelected && timeSelected.id === item.id) && { color: '#FFF' } }
                >{item.name}</TimeText>
            </TimeButton>
        );
    }

    return (
        <Container>
            {times.map(renderItem)}
        </Container>
    );
}

export default Time;