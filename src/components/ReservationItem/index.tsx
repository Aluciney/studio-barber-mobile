import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, AsyncStorage } from 'react-native';
import moment from 'moment';

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

interface ReservationItemProps {
    onPress?: (reservation: ReservationProps) => void;
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
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            initialLoading();
        });
        return () => unsubscribe();
    }, [navigation]);

    async function initialLoading(){
        setRefreshing(true);
        const reservationsStorageString = await AsyncStorage.getItem('@studio-barber-mobile:reservations');
        if(reservationsStorageString){
            var reservationsStorage = JSON.parse(reservationsStorageString);
            var reservationsFormated: (ReservationProps & ReservationLoadedProps)[] = [];
            var reservationsFormatedExpired: (ReservationProps & ReservationLoadedProps)[] = [];
            var reservationsFormatedOrdened: (ReservationProps & ReservationLoadedProps)[]  = [];
            
            reservationsStorage.map((reservationStorage: ReservationProps) => {
                var remain = null;
                var hoje = moment(new Date()).format('YYYY-MM-DD');
                var diferenca = moment(reservationStorage.date).diff(hoje, 'days');
                if(diferenca <= 7 && diferenca >= 0){
                    if(diferenca === 0){
                        remain = 'Hoje';
                    }else{
                        remain = `Faltam ${diferenca} dia${diferenca !== 1 ? 's' : ''}`;
                    }
                }
                if(diferenca >= 0){
                    reservationsFormated.push({
                        ...reservationStorage,
                        date: reservationStorage.date.split('-').reverse().join('/'),
                        time: {
                            ...reservationStorage.time,
                            time:  moment(reservationStorage.time.time, ['HH:mm']).format('hh:mm A'),
                        },
                        remain: remain ?? undefined,
                    });
                }else{
                    reservationsFormatedExpired.push({
                        ...reservationStorage,
                        date: reservationStorage.date.split('-').reverse().join('/'),
                        time: {
                            ...reservationStorage.time,
                            time:  moment(reservationStorage.time.time, ['HH:mm']).format('hh:mm A'),
                        },
                    });
                }
            });

            reservationsFormated.sort(function(a: ReservationProps, b: ReservationProps) {
                var a_ = a.date.split('/').reverse().join('');
                var b_ = b.date.split('/').reverse().join('');
                return a_ > b_ ? 1 : a_ < b_ ? -1 : 0;
            });

            reservationsFormatedExpired.sort(function(a: ReservationProps, b: ReservationProps) {
                var a_ = a.date.split('/').reverse().join('');
                var b_ = b.date.split('/').reverse().join('');
                return a_ < b_ ? 1 : a_ > b_ ? -1 : 0;
            });

            reservationsFormatedOrdened.push(...reservationsFormated, ...reservationsFormatedExpired);

            setReservations(reservationsFormatedOrdened);
        }
        setRefreshing(false);
    }

    const onRefresh = useCallback(() => {
        initialLoading();
    }, []);

    function renderItem({ item }: ReservationItemUnitProps) {
        return (
            <>
                <ButtonReservation activeOpacity={0.6} onPress={ () => onPress!(item) }>
                    <ContainerReservation>
                        <DateReservationText>{item.date}</DateReservationText>
                        <GroupViewReservation>
                            <ReservationTimeText>{item.time.time.split(' ')[0]}</ReservationTimeText>
                            <ReservationTypeTimeText>{item.time.time.split(' ')[1]}</ReservationTypeTimeText>
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
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </Container>
    );
}

export default ReservationItem;