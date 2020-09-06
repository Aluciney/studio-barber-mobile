import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    width: 100%;
`;

export const ContainerReservation = styled.View`
    align-items: flex-start; 
`;

export const ContainerRemain = styled.View`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #FCA129;
    align-self: center;
    align-items: center; 
    justify-content: center; 
    margin-right: 10px;
`;

export const GroupViewReservation = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

export const ButtonReservation = styled.TouchableOpacity`
    background-color: rgba(255,255,255,0.1);
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    border-radius: 10px;
    padding: 10px;
`;

export const RemainLargeText = styled.Text`
    color: #FFF;
    font-size: 24px;
    font-weight: bold;
    margin-top: -5px; 
    margin-bottom: -5px;
`;

export const RemainSmallText = styled.Text`
    color: #FFF;
    font-size: 12px;
`;

export const DateReservationText = styled.Text`
    color: #B9B9B9;
    font-size: 18px;
`;

export const ReservationTimeText = styled.Text`
    color: #FFF;
    font-size: 48px;
    font-weight: bold;
`;

export const ReservationTypeTimeText = styled.Text`
    color: #FFF; 
    font-size: 36px; 
    font-weight: bold; 
    margin-bottom: 3px; 
    margin-left: 5px;
`;
