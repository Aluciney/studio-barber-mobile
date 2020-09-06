import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { View, GestureResponderEvent } from 'react-native';

import { 
    Container, 
    IconLeft,
    IconRight,
    Title
} from './styles';

interface HeaderProps {
    title: string;
    onPressRight?: (event: GestureResponderEvent) => void;
    backButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, onPressRight, backButton = false }) => {

    const navigation = useNavigation();

    return (
        <Container>
            {backButton ? (
                <IconLeft onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={25} color="#8E633A" />
                </IconLeft>
            ) : (
                <View style={{ width: '33%', }}/>
            )}
            <Title>{title}</Title>
            {onPressRight ? (
                <IconRight onPress={onPressRight}>
                    <AntDesign name="edit" size={25} color="#8E633A" />
                </IconRight>
            ) : (
                <View style={{ width: '33%', }}/>
            )}
        </Container>
    );
}

export default Header;