import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    padding-top: 10px;
`;

export const ContainerReservation = styled.View`
    align-items: center; 
`;

export const ContainerRemain = styled.View`
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #FCA129;
    align-self: flex-end;
    align-items: center; 
    justify-content: center; 
    right: 10px;
`;

export const ButtonReservation = styled.View`
    position: relative;
    width: 100%;
    padding: 10px;
    justify-content: center;
`;

export const DateReservationText = styled.Text`
    color: #B9B9B9;
    font-size: 18px;
`;

export const GroupViewReservation = styled.View`
    flex-direction: row;
    align-items: flex-end;
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

export const NoteInput = styled.View`
    width: 100%;
    height: 80px;
    padding: 10px;
    background-color: #4E4A57;
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const NoteInputText = styled.Text`
    color: #FFF;
    font-size: 18px;
`;

