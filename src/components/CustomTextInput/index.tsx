import React, { useState, useRef } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { View } from 'react-native-animatable';

const IS_ANDROID = Platform.OS === 'android';

interface CusttomTextInputProps {
	isEnabled: boolean;
}

const CustomTextInput: React.FC<CusttomTextInputProps> = ({ isEnabled = false, ...props }) => {

	const [ isFocused, setIsFocused] = useState(false);
	const textInputRef = useRef(null);

	return (
		<View style={styles.container}>
			<View style={[styles.textInputWrapper, { borderColor: isFocused ? 'white' : 'rgba(255,255,255,0.4)', } ]}>
				<TextInput
					ref={textInputRef}
					autoCapitalize={'none'}
					autoCorrect={false}
					style={[styles.textInput, { color: isEnabled ? 'white' : 'rgba(255,255,255,0.4)' }]}
					maxLength={32}
					underlineColorAndroid={'transparent'}
					placeholderTextColor={'rgba(255,255,255,0.4)'}
					selectionColor={'white'}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					{...props}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 2,
		marginBottom: 10
	},
	textInputWrapper: {
		height: 42,
		marginBottom: 2,
		borderBottomWidth: 1
	},
	textInput: {
		flex: 1,
		color: 'white',
		margin: IS_ANDROID ? -1 : 0,
		height: 42,
		padding: 7
	}
});

export default CustomTextInput;