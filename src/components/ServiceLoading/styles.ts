import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Container = styled.View`
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

export const Label = styled(ShimmerPlaceHolder)`
    height: 8px;
    width: 70px;
    margin-top: 8px;
    margin-bottom: 1px;
`;

export const Image = styled(ShimmerPlaceHolder)`
    height: 66px;
    width: 65px;
`;