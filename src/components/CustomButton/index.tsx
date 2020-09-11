import React from 'react'
import { ActivityIndicator, StyleSheet, Text, StyleProp, TextProps, ButtonProps } from 'react-native';
import { View } from 'react-native-animatable';

import TouchableView from '../TouchableView';

interface CustomButtonProps {
	onPress: () => null,
	isEnabled: boolean,
	isLoading: boolean,
	text: string,
	buttonStyle: StyleProp<ButtonProps>,
	textStyle: StyleProp<TextProps>,
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, isEnabled, isLoading, text, buttonStyle, textStyle, ...otherProps }) => {

	const notFunction = () => null;

	return (
		<View {...otherProps}>
			<TouchableView onPress={ isEnabled && !isLoading ? onPress : notFunction } style={[styles.button, buttonStyle]}>
				{(isLoading) && <ActivityIndicator style={styles.spinner} color={'grey'} />}
				{(!isLoading) && <Text style={[styles.text, textStyle]}>{text}</Text>}
			</TouchableView>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		height: 42,
		borderWidth: 1,
		borderRadius: 3,
		alignSelf: 'stretch',
		justifyContent: 'center',
		borderColor: 'rgba(0, 0, 0, 0.1)'
	},
	spinner: {
		height: 26
	},
	text: {
		textAlign: 'center',
		fontWeight: '400',
		color: 'white'
	}
})

export default CustomButton;