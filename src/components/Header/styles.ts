import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 90px;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 15px;
`;

export const IconLeft = styled.TouchableOpacity`
    width: 33%;
    padding-left: 30px;
    padding-bottom: 5px;
    left: 0;
`;

export const IconRight = styled.TouchableOpacity`
    width: 33%;
    padding-right: 30px;
    padding-bottom: 5px;
    align-items: flex-end;
`;

export const Title = styled.Text`
    width: 33%;
    color: #9699A8;
    font-size: 20px;
    font-family: 'roboto_400';
    margin-bottom: 8px;
    text-align: center;
`;