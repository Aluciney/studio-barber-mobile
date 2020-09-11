import React, { useState, useRef } from 'react';

import { GestureResponderEvent, StyleSheet, TextInputProps, ViewProps } from 'react-native';
import { Text, View } from 'react-native-animatable';
import Animated from 'react-native-reanimated';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import metrics from '../../utils/metrics';

// import { Container } from './styles';

interface LoginFormProps {
  isLoading: boolean;
  onLoginPress: (email: string, password: string) => void;
  onSignupLinkPress: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLoading = false, onLoginPress, onSignupLinkPress }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const linkRef = useRef(null);
  const emailInputRef = useRef<TextInputProps>(null);
  const passwordInputRef = useRef<TextInputProps>(null);

  return (
    <View style={styles.container}>
      <View style={styles.form} ref={formRef}>
        <CustomTextInput
          name={'email'}
          ref={emailInputRef}
          placeholder={'Email'}
          keyboardType={'email-address'}
          editable={!isLoading}
          returnKeyType={'next'}
          blurOnSubmit={false}
          withRef={true}
          onSubmitEditing={passwordInputRef.current?.focusable}
          onChangeText={setEmail}
          isEnabled={!isLoading}
        />
        <CustomTextInput
          name={'password'}
          ref={passwordInputRef}
          placeholder={'Password'}
          editable={!isLoading}
          returnKeyType={'done'}
          secureTextEntry={true}
          withRef={true}
          onChangeText={setPassword}
          isEnabled={!isLoading}
        />
      </View>
      <View style={styles.footer}>
        <View ref={buttonRef} animation={'bounceIn'} duration={600} delay={400}>
          <CustomButton
            onPress={() => onLoginPress(email, password)}
            isEnabled={email !== '' && password !== ''}
            isLoading={isLoading}
            buttonStyle={styles.loginButton}
            textStyle={styles.loginButtonText}
            text={'Log In'}
          />
        </View>
        <Text
          ref={linkRef}
          style={styles.signupLink}
          onPress={onSignupLinkPress}
          animation={'fadeIn'}
          duration={600}
          delay={400}
        >
          {'Not registered yet?'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
});

export default LoginForm;