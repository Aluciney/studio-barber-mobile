import React from 'react';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import UserLayout from '../layouts/UserLayout';

import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import { useAuth } from '../contexts/auth';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  function AuthStack() {
    return (
      <Navigator screenOptions={{ headerShown: false }} >
        <Screen name="Welcome" component={Welcome} />
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
      </Navigator>
    );
  }

  if (loading) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      {signed ? <UserLayout /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Routes;