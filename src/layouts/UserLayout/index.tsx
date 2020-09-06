import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } = createBottomTabNavigator();

import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import ReservationIndex from '../../pages/ReservationIndex';
import ReservationShow from '../../pages/ReservationShow';
import ReservationUpdate from '../../pages/ReservationUpdate';
import ReservationStore from '../../pages/ReservationStore';

const UserLayout: React.FC = () => {
  function HomeStack() {
    return (
      <StackNavigator screenOptions={{ headerShown: false }}>
        <StackScreen name="Home" component={Home} />
        <StackScreen name="ReservationStore" component={ReservationStore} />
      </StackNavigator>
    );
  }
  function ProfileStack() {
    return (
      <StackNavigator screenOptions={{ headerShown: false }}>
        <StackScreen name="Profile" component={Profile} />
      </StackNavigator>
    );
  }
  function ReservationStack() {
    return (
      <StackNavigator screenOptions={{ headerShown: false, }}>
        <StackScreen name="ReservationIndex" component={ReservationIndex} />
        <StackScreen name="ReservationShow" component={ReservationShow} />
        <StackScreen name="ReservationUpdate" component={ReservationUpdate} />
      </StackNavigator>
    );
  }

  function getTabBarVisible(route : any) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen;

    switch (routeName) {
      case 'ReservationShow':
        return false;
        break;
      case 'ReservationUpdate':
        return false;
        break;

      default:
        return true;
        break;
    }
  }

  return (
    <TabNavigator
      tabBarOptions={{
        style: {
          height: 60,
          backgroundColor: '#2a262f',
          borderTopWidth: 0,
        },
        tabStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 25,
          height: 25,
        },
        labelStyle: {
          fontFamily: 'roboto_400',
          fontSize: 11,
          marginTop: 3,
        },
        inactiveTintColor: '#B5B5B5',
        activeTintColor: '#FFF',
      }}
    >
      <TabScreen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => {
            return (
              <Ionicons
                name="md-home"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <TabScreen
        name="ReservationStack"
        component={ReservationStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
          title: 'Reservas',
          tabBarIcon: ({ size, color }) => {
            return (
              <Ionicons
                name="md-calendar"
                size={size}
                color={color}
              />
            );
          },
        })}
      />
      <TabScreen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ size, color }) => {
            return (
              <Ionicons
                name="md-settings"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </TabNavigator>
  );
}

export default UserLayout;