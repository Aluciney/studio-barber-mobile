import React, { useState, useEffect, useCallback } from 'react';

import ContainerComponent from '../../components/ContainerComponent';

import {
    GroupView
} from './styles';
import Label from '../../components/Label';
import Line from '../../components/Line';
import { useNavigation } from '@react-navigation/native';
import Service from '../../components/Service';
import { FlatList, Image, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import api from '../../services/api'; 

const services = [
    {
        id: 1,
        label: 'Corte de cabelo',
        image_url: ''
    },
    {
        id: 2,
        label: 'Corte da barba',
        image_url: ''
    },
    {
        id: 3,
        label: 'Corte da barba',
        image_url: ''
    },
    {
        id: 4,
        label: 'Corte da barba',
        image_url: ''
    },
    {
        id: 5,
        label: 'Corte da barba',
        image_url: ''
    },
    {
        id: 6,
        label: 'Corte da barba',
        image_url: ''
    },
    {
        id: 7,
        label: 'Corte da barba',
        image_url: ''
    },

];

import LogoName from '../../assets/logo_name.png';
import Button from '../../components/Button';
import NameLink from '../../components/NameLink';
import ServiceLoading from '../../components/ServiceLoading';

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

    function renderItem({ item }: ItemsProps) {
        return (
            <Service
                service={item}
                selected={!!selected.get(item.id)}
                onSelect={onSelect}
            />
        );
    }

    const onSelect = useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected],
    );

    useEffect(() => {
        setLoading(true);
        async function initialLoading(){
            const response = await api.get('/services');
            setServices(response.data);
            setLoading(false);
        }
        initialLoading();
    },[]);

    useEffect(() => {
        var verify = false;
        selected.forEach((valor, chave, mapa) => {
            if (valor == true) {
                verify = true;
            }
        });
        setNext(verify);
    }, [selected]);

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
    }, [next]);

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

    return (
        <ContainerComponent >
            <GroupView style={{ marginTop: 40, paddingBottom: 0, }}>
                <Image source={LogoName} style={{ marginBottom: 20, }} />
                <Line />
            </GroupView>
            <GroupView>
                <Label title="Serviços" style={{ marginLeft: 0, }} />
                {loading ? (
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