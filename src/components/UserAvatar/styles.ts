import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7,
})`
    width: 215px;
    height: 150px;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    position: relative;
`;

export const Avatar = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 55px;
    background-color: rgba(255,255,255,0.5);
    margin-bottom: 20px;
    border-width: 2px;
    border-color: #FFF;
`;

export const Name = styled.Text`
    font-size: 24px;
    color: #9699A8;
    font-family: roboto_500;
`;

export const ButtonEdit = styled.TouchableOpacity`
    position: absolute;
    right: 0px;
    top: 0px;
    align-items: center;
    justify-content: center;
`;

export const EditIcon = styled(Feather).attrs({
    name: 'edit',
    size: 24,
})`
    color: #FCA129;
`;
