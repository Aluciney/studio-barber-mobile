import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jane.', 'Feve.', 'Març', 'Abri', 'Maio', 'Junh', 'Julh.', 'Agos', 'Sete.', 'Outu.', 'Nove.', 'Deze.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: 'Hoje'
};

LocaleConfig.defaultLocale = 'br';

import ContainerComponent from '../../components/ContainerComponent';
import Header from '../../components/Header';
import Label from '../../components/Label';
import SubLabel from '../../components/SubLabel';
import Line from '../../components/Line';
import Time from '../../components/Time';
import Button from '../../components/Button';

import {
    Container,
    NoteInput
} from './styles';

const ReservationUpdate = () => {

    const navigation = useNavigation();

    const [markedDate, setMarkedDate] = useState({});
    const [timeSelected, setTimeSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSelectDate(day) {
        setMarkedDate({ [day.dateString]: { selected: true, selectedColor: '#99C791' } });
    }

    return (
        <ContainerComponent>
            <Header title="Editar Reserva" backButton/>
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
                />
                <Label title="Horário" style={{ marginTop: 10, }} />
                <Line />
                <SubLabel title="Por favor, selecione um horário" />

                <Time
                    times={['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM']}
                    disableds={['02:00 PM', '07:00 PM']}
                    onPress={setTimeSelected}
                    timeSelected={timeSelected}
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
                    title="Salvar" 
                    style={{ 
                        marginTop: 10,
                        marginBottom: 50,
                        alignSelf: 'center',
                        backgroundColor: '#28a745',
                    }}
                    onPress={ () => navigation.goBack() }
                />
            </Container>
        </ContainerComponent>
    );
}

export default ReservationUpdate;