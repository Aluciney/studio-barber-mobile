import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const CategoryButton = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    align-items: center;
    justify-content: center;
    background-color: ${ props => props.selected ? '#99C791' : '#B5B5B570'};
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 15px;
    
`;

export const CategoryImage = styled.Image`
    
`;

export const CategoryText = styled.Text`
    color: #FFF;
    font-size: 20px;
`;
