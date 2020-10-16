import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    width: 100%;
    height: 80px;
    position: relative;
    flex-direction: row;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #807B78;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`;

export const Border = styled.View`
    position: absolute;
    width: 15px;
    height: 100%;
    background-color: #FCA129;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    left: 0;
`;

export const ImageService = styled.Image`
    align-self: center; 
    margin-left: 25px;
`;

export const Label = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-family: roboto_500;
    align-self: center;
`;

export const LabelValue = styled.Text`
    color: #FF000088;
    font-size: 15px;
    font-family: roboto_500;
    letter-spacing: 0.5px;
    margin-right: 10px;
    background-color: rgba(255,255,255,0.2);
    padding: 5px 10px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
`;

export const ImageGloboService = styled.Image`
    position: absolute;
    align-self: flex-end;
    top: 0; 
    right: 0;
    border-top-right-radius: 15px;
`;