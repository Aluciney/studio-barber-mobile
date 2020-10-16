import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

interface TimeButtonProps {
    disabled: boolean | null;
    selected: boolean | null;
}

export const TimeButton = styled.TouchableOpacity<TimeButtonProps>`
    width: 30%;
    height: 30px;
    align-items: center;
    justify-content: center;
    background-color: ${ (props: TimeButtonProps) => props.disabled ? '#B5B5B544' : props.selected ? '#99C791' : '#FFF'};
    padding: 0 10px 0 10px;
    margin: 5px;
    border-radius: 10px;
    border-color: #99C791;
    border-style: solid;
    border-bottom-width: 1px;
`;

export const TimeText = styled.Text`
    color: #000;
    font-size: 20px;
`;
