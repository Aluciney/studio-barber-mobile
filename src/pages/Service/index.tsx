import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { LinearGradient } from 'expo-linear-gradient';

import ContainerComponent from '../../components/ContainerComponent';
import Line from '../../components/Line';
import Label from '../../components/Label';
import ErrorReload from '../../components/ErrorReload';
import ServiceComponent from '../../components/Service';
import Button from '../../components/Button';
import NameLink from '../../components/NameLink';

import api from '../../services/api';

import { FlatList, Image, BackHandler, ActivityIndicator, Animated, FlatListProps, ScrollViewProps } from 'react-native';

import { GroupView } from './styles';

import LogoName from '../../assets/logo_name.png';
import { View } from 'react-native-animatable';

interface ItemsProps {
    item: Service;
}

const Service: React.FC = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(new Map());
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState<Service[] | null>(null);
    const [next, setNext] = useState(false);

    const opacity = new Animated.Value(0);

    useEffect(() => {
        initialLoading();
    }, []);

    async function initialLoading() {
        setLoading(true);
        api.get('/services').then((response) => {
            if (response.data.length > 0) {
                setServices(response.data);
            }
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            if (error.response) {
                showMessage({
                    message: 'Aconteceu algum erro. Contate o administrador.',
                    animated: true,
                    type: 'danger',
                    icon: 'danger',
                });
            } else if (error.request) {
                showMessage({
                    message: 'Tempo de espera atingido. Por favor, tente novamente.',
                    animated: true,
                    type: 'danger',
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

    function renderItem({ item }: ItemsProps) {
        return (
            <ServiceComponent
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
    }, [selected]);

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
            parent!.setOptions({ tabBarVisible: false });
            return () => {
                parent!.setOptions({ tabBarVisible: true });
                backHandler.remove();
            }
        }
    }, [next]);

    function backAction() {
        setSelected(new Map())
        return true;
    };

    function handleNavigationReservationStore() {
        var ids_services: number[] = [];
        selected.forEach((service_selected, key) => {
            if (service_selected) {
                ids_services.push(key);
            }
        });
        navigation.navigate('ReservationStore', { ids_services });
    }

    function onScrollHandle(postision: number) {
        opacity.setValue(postision);
    }

    const onRefresh = useCallback(() => {
        setSelected(new Map());
        setNext(false);
        initialLoading();
    }, []);

    return (
        <ContainerComponent>
            <GroupView>
                {loading ? (
                    <ActivityIndicator size="large" color="#FFF" />
                ) : services ? (
                    <FlatList
                        data={services}
                        ListHeaderComponent={(
                            <>
                                <GroupView style={{ marginTop: 30, paddingBottom: 0, }}>
                                    <Animated.Image
                                        source={LogoName}
                                        style={{
                                            marginBottom: 20,
                                            opacity: opacity.interpolate({
                                                inputRange: [20, 60],
                                                outputRange: [1, 0],
                                                extrapolate: 'clamp'
                                            })
                                        }}
                                    />
                                    <Line />
                                    <Label title="Serviços" style={{ marginLeft: 0, }} />
                                </GroupView>
                            </>
                        )}
                        keyExtractor={(item: Service, index: number) => index.toString()}
                        renderItem={renderItem}
                        extraData={selected}
                        style={{
                            width: '100%',
                            height: '100%',
                            marginVertical: 10,
                        }}
                        onRefresh={onRefresh}
                        refreshing={loading}
                        onScroll={(e) => onScrollHandle(e.nativeEvent.contentOffset.y)}
                    />
                ) : (
                    <ErrorReload onPress={onRefresh} />
                )}
            </GroupView>
            <Animated.View
                style={{
                    backgroundColor: '#2a262f',
                    height: 80,
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    shadowColor: '#000',
                    shadowOffset: { height: 10, width: 10 },
                    opacity: opacity.interpolate({
                        inputRange: [20, 120],
                        outputRange: [0, 1],
                        extrapolate: 'clamp'
                    }),
                }}
            >
                <Animated.Image
                    source={LogoName}
                    style={{
                        marginBottom: -15,
                        transform: [
                            {
                                scale: opacity.interpolate({
                                    inputRange: [20, 120],
                                    outputRange: [1, 0.4],
                                    extrapolate: 'clamp'
                                }),
                            }, {
                                translateY: opacity.interpolate({
                                    inputRange: [0, 90],
                                    outputRange: [70, 0],
                                    extrapolate: 'clamp'
                                }),
                            },
                        ]
                    }}
                />
            </Animated.View>
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
                    <Button title="Avançar" onPress={async () => handleNavigationReservationStore()} />
                    <NameLink title="Cancelar" style={{ marginTop: 20, }} onPress={() => setSelected(new Map())} />
                </LinearGradient>
            )}
        </ContainerComponent>
    );
}

export default Service;