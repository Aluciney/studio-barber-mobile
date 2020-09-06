import React from 'react';


import ContainerComponent from '../../components/ContainerComponent';

import ReservationItem from '../../components/ReservationItem';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

const ReservationIndex: React.FC = () => {
    const navigation = useNavigation();
    return (
        <ContainerComponent>
            <Header title="Reservas" />
            <ReservationItem  onPress={()=>navigation.navigate('ReservationShow')}/>
        </ContainerComponent>
    );
}

export default ReservationIndex;