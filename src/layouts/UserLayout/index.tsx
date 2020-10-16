import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } = createBottomTabNavigator();

import Service from '../../pages/Service';
import Profile from '../../pages/Profile';
import ReservationIndex from '../../pages/Reservation/ReservationIndex';
import ReservationShow from '../../pages/Reservation/ReservationShow';
import ReservationUpdate from '../../pages/Reservation/ReservationUpdate';
import ReservationStore from '../../pages/Reservation/ReservationStore';

const UserLayout: React.FC = () => {
  function ServiceStack() {
    return (
      <StackNavigator screenOptions={{ headerShown: false }}>
        <StackScreen name="Service" component={Service} />
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

  function getTabBarVisible(route: any) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen;

    switch (routeName) {
      case 'ReservationShow':
        return false;
      case 'ReservationStore':
          return false;
      case 'ReservationUpdate':
        return false;
      default:
        return true;
    }
  }

  return (
    <TabNavigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 50,
          backgroundColor: '#2a262f',
          borderTopWidth: 0,
        },
        tabStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        inactiveTintColor: '#a0a0a0',
        activeTintColor: '#FFF',
      }}
    >
      <TabScreen
        name="ServiceStack"
        component={ServiceStack}
        options={{

          tabBarIcon: ({ size, color }) => {
            return (
              <Ionicons
                name="md-home"
                size={30}
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
                size={30}
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
                size={30}
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