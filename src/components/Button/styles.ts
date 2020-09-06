import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    width: 250px;
    height: 50px;
    border-radius: 30px;
    background-color: #8E633B;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const Title = styled.Text`
    color: #FFF;
    font-size: 20px;
`;

