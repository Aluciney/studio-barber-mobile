import React, { useState, useMemo } from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

import ContainerComponent from '../../../components/ContainerComponent';
import Header from '../../../components/Header';
import Label from '../../../components/Label';
import Line from '../../../components/Line';
import ServiceComponent from '../../../components/Service';

import {
    Container,
    ContainerReservation,
    ContainerRemain,
    ButtonReservation,
    DateReservationText,
    GroupViewReservation,
    ReservationTimeText,
    ReservationTypeTimeText,
    RemainSmallText,
    RemainLargeText,
    NoteInput,
    NoteInputText
} from './styles';
import { FlatList, View } from 'react-native';

interface RouteReservationProps {
    reservation: Reservation & ReservationLoadedProps;
}

interface ReservationLoadedProps {
    remain?: string;
    time: any;
}

interface Item {
    key: string;
    render: () => JSX.Element;
}

const ReservationShow: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, RouteReservationProps>, string>>();

    const [reservation] = useState<Reservation & ReservationLoadedProps>(route.params?.reservation);

    const services: Service[] | any = reservation.reservation_service_times?.map(reservation_service_time => {
        var value = reservation_service_time.service?.value.toString() || '00.00';
        return {
            ...reservation_service_time?.service,
            value: parseFloat(value)
        };
    });

    const { data } = useMemo(() => {
        const items: Item[] = [
            {
                key: 'DATE_TIME',
                render: () => (
                    <ButtonReservation>
                        <ContainerReservation>
                            <DateReservationText>{reservation.date}</DateReservationText>
                            <GroupViewReservation>
                                <ReservationTimeText>{reservation.time.time.split(' ')[0]}</ReservationTimeText>
                                <ReservationTypeTimeText>{reservation.time.time.split(' ')[1]}</ReservationTypeTimeText>
                            </GroupViewReservation>
                        </ContainerReservation>
                        {reservation.remain && (
                            <ContainerRemain>
                                {reservation.remain.split(' ').length === 3 ? (
                                    <>
                                        <RemainSmallText>{reservation.remain.split(' ')[0]}</RemainSmallText>
                                        <RemainLargeText>{reservation.remain.split(' ')[1]}</RemainLargeText>
                                        <RemainSmallText>{reservation.remain.split(' ')[2]}</RemainSmallText>
                                    </>
                                ) : (
                                        <RemainLargeText>{reservation.remain.split(' ')[0]}</RemainLargeText>
                                    )}
                            </ContainerRemain>
                        )}
                    </ButtonReservation>
                )
            },
            {
                key: 'SERVICES',
                render: () => (
                    <>
                        <Label title="Serviços" />
                        <Line />
                        <View style={{ flexDirection: 'row', }}>
                        {services.map((service: Service) => (
                            <ServiceComponent
                                key={service.id}
                                service={service}
                                selected={true}
                                disabled
                            />
                        ))}
                        </View>
                    </>
                )
            },
            {
                key: 'NOTE',
                render: () => (
                    <>
                        <Label title="Nota" />
                        <Line />

                        <NoteInput>
                            <NoteInputText>
                                {reservation.note}
                            </NoteInputText>
                        </NoteInput>
                    </>
                )
            },
        ];

        const indices: number[] = [];

        items.forEach((item, index) => indices.push(index));

        return {
            data: items,
        };
    }, []);

    return (
        <ContainerComponent>
            <Header
                title="Reserva"
                onPressRight={() => navigation.navigate('ReservationUpdate', { id: reservation.id })}
                backButton
            />
            <Container>
                <FlatList<Item>
                    data={data}
                    renderItem={({ item }) => item.render()}
                    keyExtractor={(item) => item.key}
                    onRefresh={() => { }}
                    refreshing={false}
                />
            </Container>
        </ContainerComponent>
    );
}

export default ReservationShow;