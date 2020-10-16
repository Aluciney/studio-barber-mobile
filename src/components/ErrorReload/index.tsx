import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { 
	Container,
	ButtonText
} from './styles';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

interface ErrorReloadButton {
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}

const ErrorReload: React.FC<ErrorReloadButton> = ({ onPress, style, textStyle }) => {
	return (
		<Container onPress={onPress} style={style} >
			<MaterialCommunityIcons name="reload" size={30} color="#FFF" />
			<ButtonText style={textStyle}>tentar novamente</ButtonText>
		</Container>
	);
}

export default ErrorReload;