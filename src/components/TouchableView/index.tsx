import React from 'react';
import { Platform, View, TouchableNativeFeedback, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
const IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21 && IS_ANDROID;

interface TouchableViewProps {
	isRippleDisabled?: boolean;
	rippleColor?: string;
	children: any;
	style: StyleProp<ViewStyle>;
	onPress: () => null;
}

const TouchableView: React.FC<TouchableViewProps> = ({ isRippleDisabled, rippleColor, children, style, onPress }) => {
	if (IS_RIPPLE_EFFECT_SUPPORTED && !isRippleDisabled) {
		const background = TouchableNativeFeedback.Ripple('#FFF');
		return (
			<TouchableNativeFeedback onPress={onPress}  background={background}>
				<View style={style}>{children}</View>
			</TouchableNativeFeedback>
		)
	} else {
		return (
			<TouchableOpacity onPress={onPress} style={style}>
				{children}
			</TouchableOpacity>
		)
	}
}

export default TouchableView;