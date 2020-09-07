import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

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

const ReservationStore = ( ) => {

    const navigation = useNavigation();

    const [markedDate, setMarkedDate] = useState({});
    const [datesDisabled, setDatesDisabled] = useState({});
    const [timeSelected, setTimeSelected] = useState(null);
    const [categorySelected, setCategorySelected] = useState(null);
    const [minMaxDate, setMinMaxDate] = useState<MinMaxDate>({ min: '', max: '' });
    const [times, setTimes] = useState<string[]>([]);
    const [timesBusy, setTimesBusy] = useState<string[]>([]);
    const [loadingDate, setLoadingDate] = useState(true);
    const [loadingTime, setLoadingTime] = useState(true);

    function handleSelectDate(day: any) {
        setLoadingTime(true);
        var new_markedDate = { ...datesDisabled, [day.dateString]: { selected: true, selectedColor: '#99C791' } };
        setMarkedDate(new_markedDate);
        setTimeSelected(null);
        api.get(`/dates/${day.dateString}`).then(response => {
            setTimes(response.data.times);
            setTimesBusy(response.data.timesBusy);
            setLoadingTime(false);
        }).catch(error => {});
    }

    useEffect(()=>{
        function loadingMaxMinDate(){
            api.get('/dates').then(response => {
                setMinMaxDate(response.data.range_date);
                setDatesDisabled(response.data.dates_disabled);
                setMarkedDate(response.data.dates_disabled);
                setLoadingDate(false);
            }).catch(error => {});
        } 
        loadingMaxMinDate();
    },[]);

    return (
        <ContainerComponent>
            <Header title="Reserva" backButton/>
            <Container>
                <Label title="Data" />
                <Line />
                <SubLabel title="Por favor, selecione uma data" />

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

                <Label title="Categorias" style={{ marginTop: 10, }} />
                <Line />
                <SubLabel title="Por favor, selecione uma categoria" />
                <Category 
                    categories={categories}
                    onPress={setCategorySelected} 
                    categorySelected={categorySelected}
                />

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
                />

                <Button 
                    title="Reservar" 
                    style={{ 
                        marginTop: 10,
                        marginBottom: 50,
                        alignSelf: 'center',
                    }}
                    onPress={ () => navigation.goBack }
                />
            </Container>
        </ContainerComponent>
    );
}

export default ReservationStore;