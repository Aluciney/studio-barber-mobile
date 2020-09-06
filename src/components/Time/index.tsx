import React, { Dispatch, SetStateAction } from 'react';

import {
    Container,
    TimeButton,
    TimeText
} from './styles';

interface TimeProps {
    onPress: Dispatch<SetStateAction<null>>;
    times: string[];
    disableds: string[];
    timeSelected: any;
}

const Time: React.FC<TimeProps> = ({ onPress, times = [], disableds = [], timeSelected = null }) => {

    function handlePressTime(time: any) {
        onPress(time)
    }

    function renderItem(item: string, key: number) {
        var item_disabled = false;

        disableds.map(disabled => {
            if (disabled === item) {
                item_disabled = true;
            }
        });

        return (
            <TimeButton 
                key={key} 
                disabled={item_disabled} 
                onPress={() => handlePressTime(item) } 
                selected={timeSelected === item}
            >
                <TimeText>{item}</TimeText>
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