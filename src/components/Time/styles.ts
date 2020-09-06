import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

export const TimeButton = styled.TouchableOpacity`
    width: 30%;
    height: 30px;
    align-items: center;
    justify-content: center;
    background-color: ${ props => props.disabled ? '#B5B5B510' : props.selected ? '#99C791' : '#B5B5B570'};
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 10px;
    
`;

export const TimeText = styled.Text`
    color: #FFF;
    font-size: 20px;
`;
