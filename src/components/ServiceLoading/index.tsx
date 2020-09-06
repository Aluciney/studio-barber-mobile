import React from 'react';
import { FlatList } from 'react-native';

import {
    Container,
    Label,
    Image
} from './styles';

interface ServiceLoadingProps {
    quantidade?: number;
}

const ServiceLoading: React.FC<ServiceLoadingProps> = ({ quantidade = 3 }) => {

    function renderItem() {
        return (
            <Container >
                <Image />
                <Label />
            </Container>
        );
    }

    function numberOffItem(count: number) {
        var total = [];
        for (var num = 1; num <= count; num++) {
            total.push({
                id: num,
            });
        }
        return total;
    }

    return (

        <FlatList
            data={numberOffItem(quantidade)}
            keyExtractor={(item: any, index: number) => index.toString()}
            numColumns={3}
            renderItem={renderItem}
            columnWrapperStyle={{
                justifyContent: 'space-between',
            }}
            style={{
                height: '100%',
                marginTop: 10,
            }}
            scrollEnabled={false}
        />
    );
}

export default ServiceLoading;