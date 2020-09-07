import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

export const TimeButton = styled(ShimmerPlaceHolder)`
    width: 30%;
    height: 30px;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 10px;
    
`;