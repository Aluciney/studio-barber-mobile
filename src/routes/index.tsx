import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import UserLayout from '../layouts/UserLayout';

import Login from '../pages/Login';
import Register from '../pages/Register';
import { useAuth } from '../contexts/auth';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  function AuthStack() {
    return (
      <Navigator
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
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