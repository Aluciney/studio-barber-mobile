import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    width: 100px;
    height: 105px;
    padding: 5px;
    position: relative;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #807B78;
    align-items: center;
    justify-content: flex-end;
    margin: 8px;
`;

export const Label = styled.Text`
    color: #FFF;
    font-size: 12px;
    font-family: roboto_500;
`;

export const LabelValue = styled.Text`
    color: #343538;
    font-size: 14px;
    font-family: roboto_500;
    letter-spacing: 0.5px;
`;

export const ImageGloboService = styled.Image`
    position: absolute;
    align-self: flex-end;
    top: 0; 
    right: 0;
    border-top-right-radius: 15px;
`;