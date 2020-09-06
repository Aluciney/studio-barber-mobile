import React, { useState, useEffect } from 'react';

import { 
    Container,
    Avatar,
    Name,
    EditIcon,
    ButtonEdit
} from './styles';

import { GestureResponderEvent } from 'react-native';
import { useAuth } from '../../contexts/auth';

interface ProfileProps {
    edit?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
    onPressEdit?: (event: GestureResponderEvent) => void;
}

const UserAvatar: React.FC<ProfileProps> = ({ edit, onPress, onPressEdit }) => {
    const { user } = useAuth();

    return (
        <Container onPress={onPress}>
            <Avatar source={{ uri: user!.avatar_url }}/>
            <Name numberOfLines={1}>{user!.name}</Name>
            {edit && (
                <ButtonEdit onPress={onPressEdit}>
                    <EditIcon />
                </ButtonEdit>
            )}
        </Container>
    );
}


export default UserAvatar;