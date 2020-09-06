import React, { Dispatch, SetStateAction } from 'react';

import {
    Container,
    CategoryButton,
    CategoryImage,
    CategoryText
} from './styles';

interface CategoryProps {
    onPress?: Dispatch<SetStateAction<null>>;
    categories: {
        id: number;
        name: string;
    }[];
    categorySelected: any;
    disabled?: boolean;

}

interface CategoryItemProps {
    id: number;
    name: string;
}

const Category: React.FC<CategoryProps> = ({ onPress, categories = [], categorySelected = null, disabled = false }) => {

    function handlePressCategory(id_category: any) {
        onPress!(id_category)
    }

    function renderItem(item: CategoryItemProps, key: number) {
        return (
            <CategoryButton 
                key={key}
                onPress={() => handlePressCategory(item.id) } 
                selected={categorySelected === item.id}
                disabled={disabled}
            >
                <CategoryText>{item.name}</CategoryText>
            </CategoryButton>
        );
    }

    return (
        <Container>
            {categories.map(renderItem)}
        </Container>
    );
}

export default Category;