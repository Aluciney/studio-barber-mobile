import React, { useState, useMemo } from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

import ContainerComponent from '../../components/ContainerComponent';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Label from '../../components/Label';
import Line from '../../components/Line';
import Category from '../../components/Category';
import Service from '../../components/Service';

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
    NoteInput
} from './styles';
import { FlatList } from 'react-native';

interface RouteReservationProps {
    reservation: ReservationProps & ReservationLoadedProps;
}

interface ReservationLoadedProps {
    remain?: string;
}

interface Item {
    key: string;
    render: () => JSX.Element;
}

const ReservationShow: React.FC = () => {

    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, RouteReservationProps>, string>>();

    const [reservation] = useState<ReservationProps & ReservationLoadedProps>(route.params?.reservation);

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
                        <Service
                            service={{
                                id: 1,
                                name: 'Corte de cabelo',
                                image_url: 'http://10.10.16.86:3001/uploads/4d88ed32ccc6-corte_cabelo.png',
                            }}
                            selected={true}
                            disabled
                        />
                    </>
                )
            },
            // {
            //     key: 'CATEGORIES',
            //     render: () => (
            //         <>
            //             <Label title="Categoria" />
            //             <Line />

            //             <Category
            //                 categories={[{ id: 1, name: 'Simples' }]}
            //                 categorySelected={1}
            //                 disabled
            //             />
            //         </>
            //     )
            // },
            {
                key: 'NOTE',
                render: () => (
                    <>
                        <Label title="Nota" />
                        <Line />

                        <NoteInput>
                            Eu acho que escri alguma coisa
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
                    // Refresh Effect
                    onRefresh={() => { }}
                    refreshing={false}
                />
            </Container>
        </ContainerComponent>
    );
}

export default ReservationShow;