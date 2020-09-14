import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #383443;
`;

export const GroupView = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
`;

export const GloboNormalContainer = styled.Image`
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
`;

export const Logo = styled.Image`
    /* transform: scale(0.8,0.8); */
`;

export const LogoName = styled.Image`
    margin-top: 30px;
    margin-bottom: 30px;
`;

export const ContainerFormInput = styled.View`
    flex-direction: row;
    padding-left: 5px;
    padding-right: 5px;
    height: 45px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    margin-bottom: 5px;
    align-items: center;
`;

export const FormInputText = styled.TextInput.attrs({
    placeholderTextColor: '#FFF',
 })`
     width: 100%;
     height: 100%;
     padding-left: 10px;
     padding-right: 10px;
     color: #FFF;
     font-size: 18px;
 `;