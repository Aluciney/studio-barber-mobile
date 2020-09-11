import React from 'react';
import { useNavigation } from '@react-navigation/native';

import ContainerComponent from '../../components/ContainerComponent';
import Header from '../../components/Header';
import ReservationItem from '../../components/ReservationItem';

const ReservationIndex: React.FC = () => {
    const navigation = useNavigation();
    return (
        <ContainerComponent>
            <Header title="Reservas" />
            <ReservationItem  onPress={( reservation: ReservationProps ) => navigation.navigate('ReservationShow', { reservation } )}/>
        </ContainerComponent>
    );
}

export default ReservationIndex;