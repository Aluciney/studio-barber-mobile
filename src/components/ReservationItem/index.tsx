import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, AsyncStorage } from 'react-native';

import Line from '../Line';

import { 
    Container,
    ContainerReservation,
    ContainerRemain,
    ButtonReservation,
    RemainLargeText,
    RemainSmallText,
    DateReservationText,
    GroupViewReservation,
    ReservationTimeText,
    ReservationTypeTimeText
} from './styles';

const reservations = [
    {
        id: 1,
        date: '13/07/2020',
        time: '08:00 AM',
        remain: 'Hoje',
    },
    {
        id: 2,
        date: '16/07/2020',
        time: '09:00 PM',
        remain: 'Faltam 3 dias',
    },
    {
        id: 3,
        date: '13/08/2020',
        time: '09:00 PM',
    },
    {
        id: 4,
        date: '16/07/2020',
        time: '09:00 PM',
        remain: 'Faltam 3 dias',
    },
    {
        id: 5,
        date: '16/07/2020',
        time: '09:00 PM',
    },
    {
        id: 6,
        date: '16/07/2020',
        time: '09:00 PM',
        remain: 'Faltam 3 dias',
    },

];

interface ReservationItemProps {
    onPress?: (id: number) => void;
}

interface ReservationItemUnitProps {
    item: ReservationProps & ReservationLoadedProps;
}

interface ReservationLoadedProps {
    remain?: string;
}

const ReservationItem: React.FC<ReservationItemProps> = ({ onPress }) => {
    const navigation = useNavigation();
    const [reservations, setReservations] = useState<ReservationProps[] | []>([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            initialLoading();
        });
        return () => unsubscribe();
     }, [navigation]);

    async function initialLoading(){
        const reservationsStorageString = await AsyncStorage.getItem('@studio-barber-mobile:reservations');
        if(reservationsStorageString){
            var reservationsStorage = JSON.parse(reservationsStorageString);
            // var reservationsFormated = reservationsStorage.map((reservationStorage: ReservationProps) => {
            //     return {
            //         ...reservationStorage,
            //         data: reservationStorage.date.split('-').reverse().join('/'),
            //         remain: 
            //     }
            // })
            setReservations(JSON.parse(reservationsStorage));
        }
    }

    function renderItem({ item }: ReservationItemUnitProps) {
        return (
            <>
                <ButtonReservation activeOpacity={0.6} onPress={ () => onPress!(item.id) }>
                    <ContainerReservation>
                        <DateReservationText>{item.date}</DateReservationText>
                        <GroupViewReservation>
                            <ReservationTimeText>{item.time[0].name.split(' ')[0]}</ReservationTimeText>
                            <ReservationTypeTimeText>{item.time[0].name.split(' ')[1]}</ReservationTypeTimeText>
                        </GroupViewReservation>
                    </ContainerReservation>
                    {item.remain && (
                        <ContainerRemain>
                            {item.remain.split(' ').length === 3 ? (
                                <>
                                    <RemainSmallText>{item.remain.split(' ')[0]}</RemainSmallText>
                                    <RemainLargeText>{item.remain.split(' ')[1]}</RemainLargeText>
                                    <RemainSmallText>{item.remain.split(' ')[2]}</RemainSmallText>
                                </>
                            ) : (
                                <RemainLargeText>{item.remain.split(' ')[0]}</RemainLargeText>
                            ) }
                        </ContainerRemain>
                    )}
                </ButtonReservation>
                <Line />
            </>
        );
    }

    return (
        <Container>
            <FlatList
                data={reservations}
                keyExtractor={item => String(item.id)}
                renderItem={renderItem}
                style={{
                    padding: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                }}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 80,
                }}
            />
        </Container>
    );
}

export default ReservationItem;