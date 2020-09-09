import React, { Dispatch, SetStateAction } from 'react';

import {
    Container,
    TimeButton,
    TimeText
} from './styles';

interface TimeComponentProps {
    onPress: Dispatch<SetStateAction<TimeProps | null>>;
    times: TimeProps[];
    disableds: TimeProps[];
    timeSelected: TimeProps | null;
}

const Time: React.FC<TimeComponentProps> = ({ onPress, times = [], disableds = [], timeSelected = null }) => {

    function handlePressTime(time: any) {
        onPress(time)
    }

    function renderItem(item: TimeProps, key: number) {
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
                <TimeText>{item.name}</TimeText>
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