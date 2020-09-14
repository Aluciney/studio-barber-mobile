import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { RefreshControl, AsyncStorage } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jane.', 'Feve.', 'Març', 'Abri', 'Maio', 'Junh', 'Julh.', 'Agos', 'Sete.', 'Outu.', 'Nove.', 'Deze.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
};

LocaleConfig.defaultLocale = 'br';

import ContainerComponent from '../../components/ContainerComponent';
import Header from '../../components/Header';
import Label from '../../components/Label';
import SubLabel from '../../components/SubLabel';
import Line from '../../components/Line';
import Time from '../../components/Time';
import Button from '../../components/Button';
import Category from '../../components/Category';

import {
    Container,
    NoteInput
} from './styles';

import api from '../../services/api';
import TimeLoading from '../../components/TimeLoading';
import { showMessage } from 'react-native-flash-message';
import FormLoading from '../../components/FormLoading';
import moment from 'moment';

const categories = [
    {
        id: 1,
        name: 'Simples',
    },
    {
        id: 2,
        name: 'Degradê',
    },
    {
        id: 3,
        name: 'Degradê',
    },
    {
        id: 4,
        name: 'Degradê',
    },
];

interface MinMaxDate {
    max: string;
    min: string;
}

interface RouteParamsProps {
    ids_services: number[];
}

const ReservationStore = () => {

    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, RouteParamsProps>, string>>();

    const [markedDate, setMarkedDate] = useState({});
    const [datesDisabled, setDatesDisabled] = useState({});
    const [timeSelected, setTimeSelected] = useState<TimeProps | null>(null);
    const [categorySelected, setCategorySelected] = useState(null);
    const [minMaxDate, setMinMaxDate] = useState<MinMaxDate>({ min: '', max: '' });
    const [times, setTimes] = useState<TimeProps[]>([]);
    const [timesBusy, setTimesBusy] = useState<TimeProps[]>([]);
    const [note, setNote] = useState('');

    const [loadingDate, setLoadingDate] = useState(true);
    const [loadingTime, setLoadingTime] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        loadingMaxMinDate();
    }, []);

    function loadingMaxMinDate() {
        api.get('/dates').then(response => {
            setMinMaxDate(response.data.range_date);
            setDatesDisabled(response.data.dates_disabled);
            setMarkedDate(response.data.dates_disabled);
            setRefreshing(false);
            setLoadingDate(false);
            var date_now = { dateString: moment(new Date()).format('YYYY-MM-DD') };
            if(!response.data.dates_disabled[date_now.dateString]){
                handleSelectDate(date_now);
            }
        }).catch(error => {
            setRefreshing(false);
            if (error.request) {
                showMessage({
                    message: 'Tempo de espera atingido. Por favor, tente novamente.',
                    animated: true,
                    type: 'danger',
                    icon: 'danger',
                });
            } else {
                showMessage({
                    message: error.message,
                    animated: true,
                    type: 'danger',
                    icon: 'danger',
                });
            }
        });
    }

    function handleSelectDate(day: any) {
        setLoadingTime(true);
        var new_markedDate = { ...datesDisabled, [day.dateString]: { selected: true, selectedColor: '#99C791' } };
        setMarkedDate(new_markedDate);
        setTimeSelected(null);
        api.get(`/dates/${day.dateString}`).then(response => {
            setTimes(response.data.times);
            setTimesBusy(response.data.timesBusy);
            setLoadingTime(false);
        }).catch(error => {
            if (error.request) {
                showMessage({
                    message: 'Tempo de espera atingido. Por favor, tente novamente.',
                    animated: true,
                    type: 'danger',
                    icon: 'danger',
                });
            } else {
                showMessage({
                    message: error.message,
                    animated: true,
                    type: 'danger',
                    icon: 'danger',
                });
            }
        });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setMarkedDate({});
        setMinMaxDate({ min: '', max: '' });
        setDatesDisabled({});
        setLoadingDate(true);
        setLoadingTime(true);
        loadingMaxMinDate();
    }, []);

    async function formCreateReservation() {
        if (timeSelected) {
            var reservation_date = null;
            Object.entries(markedDate).map(function (key: any) {
                if (key[1] && key[1]!.selected) {
                    reservation_date = key[0];
                }
            });
            if (reservation_date) {
                setLoading(true);
                api.post('/reservations', {
                    date: reservation_date,
                    note,
                    id_time: timeSelected.id
                }).then(async response => {
                    const reservationsStorageString = await AsyncStorage.getItem('@studio-barber-mobile:reservations');
                    if(reservationsStorageString){
                        var news_reservation_store = JSON.parse(reservationsStorageString);
                        news_reservation_store.push(response.data);
                        await AsyncStorage.setItem('@studio-barber-mobile:reservations', JSON.stringify(news_reservation_store));
                    }else{
                        await AsyncStorage.setItem('@studio-barber-mobile:reservations', JSON.stringify([response.data]));
                    }
                    setSuccessMessage('Reserva criada com sucesso.');
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'ReservationStack' }]
                        });
                    }, 2000);
                }).catch(error => {
                    setErrorMessage(error.response ? error.response.data.error : 'Erro ao cadastrar reserva.');
                    setTimeout(() => {
                        setLoading(false);
                        setErrorMessage(null);
                    }, 2000);
                });
            }
        }
    }

    return (
        <ContainerComponent>
            {loading && (
                <FormLoading
                    loading={!successMessage && !errorMessage}
                    success={successMessage}
                    error={errorMessage}
                />
            )}

            <Header title="Reserva" backButton />
            <Container
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Label title="Data" />
                <Line />
                <SubLabel title="Por favor, selecione uma data" />

                {refreshing || loadingDate ? (
                    <Calendar
                        firstDay={1}
                        disableArrowLeft={true}
                        disableArrowRight={true}
                        style={{
                            borderRadius: 15,
                            paddingBottom: 5,
                        }}
                        disabledByDefault={true}
                    />
                ) : (
                        <Calendar
                            onDayPress={day => handleSelectDate(day)}
                            markedDates={markedDate}
                            firstDay={1}
                            disableArrowLeft={true}
                            disableArrowRight={true}
                            style={{
                                borderRadius: 15,
                                paddingBottom: 5,
                            }}
                            minDate={minMaxDate.min}
                            maxDate={minMaxDate.max}
                        />
                    )}


                <Label title="Horário" style={{ marginTop: 10, }} />
                <Line />
                <SubLabel title="Por favor, selecione um horário" />
                {loadingTime ? (
                    <TimeLoading />
                ) : (
                        <Time
                            times={times}
                            disableds={timesBusy}
                            onPress={setTimeSelected}
                            timeSelected={timeSelected}
                        />
                    )}

                {/* <Label title="Categorias" style={{ marginTop: 10, }} />
                <Line />
                <SubLabel title="Por favor, selecione uma categoria" />
                <Category 
                    categories={categories}
                    onPress={setCategorySelected} 
                    categorySelected={categorySelected}
                /> */}

                <Label title="Nota" style={{ marginTop: 10, }} />
                <Line />
                <SubLabel title="Caso queira deixar uma observação" />
                <NoteInput
                    placeholder="Esqueva sua observação"
                    placeholderTextColor="#9699A8"
                    multiline
                    maxLength={120}
                    numberOfLines={3}
                    style={{
                        textAlignVertical: 'top',
                    }}
                    value={note}
                    onChangeText={setNote}
                />

                <Button
                    title="Reservar"
                    style={{
                        marginTop: 10,
                        marginBottom: 50,
                        alignSelf: 'center',
                    }}
                    disabled={!!!timeSelected}
                    onPress={formCreateReservation}
                />
            </Container>
        </ContainerComponent>
    );
}

export default ReservationStore;