import React, { useEffect } from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import UserAvatar from '../../components/UserAvatar';
import Line from '../../components/Line';

import { GroupView } from './styles';
import { useAuth } from '../../contexts/auth';
import { TouchableOpacity, Text } from 'react-native';


const Profile: React.FC = () => {
    const { signOut } = useAuth();

    return (
        <ContainerComponent>
            <GroupView>
                <UserAvatar edit/>
                <Line style={{ marginTop: 20, }}/>
            </GroupView>
            <GroupView>
                <TouchableOpacity onPress={signOut}>
                    <Text>LogOut</Text>
                </TouchableOpacity>
            </GroupView>

        </ContainerComponent>
    );
}


export default Profile;