import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

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

const ReservationShow: React.FC = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(true);
    const [reservation, setReservation] = useState({});

    useEffect(() => {
        async function initialLoading() {
            setReservation({
                date: '14/07/2020',
                time: '08:00 AM',
                services: [
                    {
                        id: 1,
                        name: 'Corte de Cabelo'
                    }
                ],
                category: {
                    id: 1,
                    name: 'Simples'
                },
                note: '',
                remain: 'Faltam 3 dias',
            });
            setLoading(false);
        }

        initialLoading();
    }, []);

    return (
        <ContainerComponent>
            <Header 
                title="Reserva" 
                onPressRight={ () => navigation.navigate('ReservationUpdate', { id: reservation.id }) } 
                backButton
            />
            {loading ? (
                <Loading />
            ) : (
                <Container>
                    <ButtonReservation>
                        <ContainerReservation>
                            <DateReservationText>{reservation.date}</DateReservationText>
                            <GroupViewReservation>
                                <ReservationTimeText>{reservation.time.split(' ')[0]}</ReservationTimeText>
                                <ReservationTypeTimeText>{reservation.time.split(' ')[1]}</ReservationTypeTimeText>
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
                                ) }
                            </ContainerRemain>
                        )}
                    </ButtonReservation>

                    <Label title="Serviços" />
                    <Line />
                    <Service 
                        service={{ id: 1, label: 'Corte de cabelo"'}} 
                        selected={true}  
                        disabled                 
                    />

                    <Label title="Categoria" />
                    <Line />

                    <Category 
                        categories={[{ id: 1, name: 'Simples' }]}
                        categorySelected={1}
                        disabled
                    />

                    <Label title="Nota" />
                    <Line />

                    <NoteInput>
                        Eu acho que escri alguma coisa
                    </NoteInput>
                </Container>
            )}
        </ContainerComponent>
    );
}

export default ReservationShow;