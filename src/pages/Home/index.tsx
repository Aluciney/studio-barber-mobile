import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { View, FlatList, Image, BackHandler, TouchableOpacity, Text } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import api from '../../services/api'; 

import Button from '../../components/Button';
import ContainerComponent from '../../components/ContainerComponent';
import Label from '../../components/Label';
import Line from '../../components/Line';
import NameLink from '../../components/NameLink';
import Service from '../../components/Service';
import ServiceLoading from '../../components/ServiceLoading';

import LogoName from '../../assets/logo_name.png';

import {
    GroupView
} from './styles';

interface ItemsProps {
    item: ServiceProps;
}

interface HomeProps {
    user: UserProps;
}

const Home: React.FC<HomeProps> = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState(new Map());
    const [next, setNext] = useState(false);
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState<ServiceProps[] | null>(null);
    const [errorRequest, setErrorRequest] = useState(false);

    useEffect(() => {
        initialLoading();
    },[]);

    async function initialLoading(){
        setLoading(true);
        api.get('/services').then((response) =>{
            setServices(response.data);
            setLoading(false);
            setErrorRequest(false);
        }).catch((error) => {
            setLoading(false);
            setErrorRequest(true);
            if (error.response) {
                showMessage({
                    message: 'Aconteceu algum erro. Contate o administrador.',
                    animated: true,
                    type: 'danger',
                    autoHide: false,
                    icon: 'danger',
                });
            } else if (error.request) {
                showMessage({
                    message: 'Tempo de espera atingido. Por favor, tente novamente.',
                    animated: true,
                    type: 'danger',
                    autoHide: false
                });
            } else {
                showMessage({
                    message: error.message,
                    animated: true,
                    type: 'danger',
                    autoHide: false,
                    icon: 'danger',
                });
            }
        });
    }

    function renderItem({ item }: ItemsProps) {
        return (
            <Service
                service={item}
                selected={!!selected.get(item.id)}
                onSelect={onSelect}
            />
        );
    }

    const onSelect = useCallback((id) => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));
        setSelected(newSelected);
    },[selected]);

    useEffect(() => {
        var verify = false;
        selected.forEach((valor, chave, mapa) => {
            if (valor == true) {
                verify = true;
            }
        });
        setNext(verify);
    },[selected]);

    useEffect(() => {
        if (next) {
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );

            const parent = navigation.dangerouslyGetParent();
            parent!.setOptions({
                tabBarVisible: false
            });
            
            return () => {
                parent!.setOptions({
                    tabBarVisible: true
                });
                backHandler.remove();
            }
        }
    },[next]);

    function backAction() {
        setSelected(new Map())
        return true;
    };

    function handleNavigationReservationStore(){
        var ids_services: number[] = [];
        selected.forEach((service_selected, key) => {
            if(service_selected){
                ids_services.push(key);
            }
        });
        navigation.navigate('ReservationStore', { ids_services });
    }

    const onRefresh = useCallback(() => {
        hideMessage();
        setSelected(new Map());
        setNext(false);
        initialLoading();
    }, []);

    return (
        <ContainerComponent >
            <GroupView style={{ marginTop: 40, paddingBottom: 0, }}>
                <Image source={LogoName} style={{ marginBottom: 20, }} />
                <Line />
            </GroupView>
            <GroupView>
                <Label title="Serviços" style={{ marginLeft: 0, }} />
                {!loading && errorRequest ? (
                    <View
                        style={{
                            height: 200,
                            width: '100%',
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity 
                            onPress={onRefresh}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <MaterialCommunityIcons name="reload" size={50} color="#FFF" />
                            <Text style={{ fontSize: 25, color: '#B5B5B5' }}>Tentar novamente</Text>
                        </TouchableOpacity>
                    </View>
                ) : loading ? (
                    <ServiceLoading quantidade={6}/>
                ) : (
                    <FlatList
                        data={services}
                        keyExtractor={(item: ServiceProps, index: number) => index.toString()}
                        numColumns={3}
                        renderItem={renderItem}
                        extraData={selected}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                        }}
                        style={{
                            height: '100%',
                            marginTop: 10,
                        }}
                        onRefresh={onRefresh}
                        refreshing={loading}
                        persistentScrollbar
                    />
                )}
            </GroupView>
            {next && (
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: 20,
                        paddingTop: 10,
                    }}
                >
                    <Button title="Avançar" onPress={async ()=> handleNavigationReservationStore()} />
                    <NameLink title="Cancelar" style={{ marginTop: 20, }} onPress={() => setSelected(new Map())} />
                </LinearGradient>
            )}
        </ContainerComponent>
    );
}

export default Home;