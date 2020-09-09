import React, { useEffect } from 'react';
import { View } from 'react-native';

import { SkypeIndicator } from 'react-native-indicators';
import { showMessage } from 'react-native-flash-message';

interface FormLoadingProps {
	error?: string | null;
	success?: string | null;
	loading: boolean;
}

const FormLoading: React.FC<FormLoadingProps> = ({ error, success, loading }) => {

	useEffect(()=>{
		if(success){
			showMessage({
				message: success,
				position: 'top',
				type: 'success',
				icon: 'success',
			});
		}
	},[success]);

	useEffect(()=>{
		if(error){
			showMessage({
				message: error,
				type: 'danger',
				icon: 'danger',
			});
		}
	},[error]);

	return (
		<View
			style={{
				zIndex: 1,
				position: 'absolute',
				height: '100%',
				width: '100%',
				backgroundColor: 'rgba(0,0,0,0.8)',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{loading && <SkypeIndicator color="#FCA129" size={100} style/> }
		</View>
	);
}

export default FormLoading;