import { StatusBar } from 'expo-status-bar';
import React from 'react';
// COPOSANTS NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//SCREENS
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import MediumScreen from './screens/MediumScreen';
import MovementScreen from './screens/MovementScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import SignInScreen from './screens/SignInScreen';


import SwipeScreen from './screens/SwipeScreen';
import DailyScreen from './screens/DailyScreen';
import ExhibitionScreen from './screens/ExhibitionScreen';

import CollectionScreen from './screens/CollectionScreen';
import MyArtistsScreen from './screens/MyArtistsScreen';

import SwipeScreen from './screens/SwipeScreen'
import ArtworkScreen from './screens/ArtworkScreen';

import selectedArtwork from './reducers/selectedArtwork'
import selectedArtist from './reducers/selectedArtist'

import MyIcon from './composants/myIcons'; // impot composant MyIcon

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ selectedArtwork, selectedArtist }));

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopNav = () => {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#88889C',
        style: { backgroundColor: '#FFFFFF', marginTop: 40 }
      }}>
      <TopTab.Screen name="my collection" component={CollectionScreen} />
      <TopTab.Screen name="my Artists" component={MyArtistsScreen} />
    </TopTab.Navigator>
  );
}

const BottomNav = () => {
  return (

    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          let iconLib;
          if (route.name === 'SwipeScreen') {
            iconName = "swap-horizontal";
            iconLib = "Ionicons";
          } else if (route.name === 'TopNav') {
            iconName = "hearto";
            iconLib = 'AntDesign';
          } else if (route.name === 'DailyScreen') {
            iconName = "ios-eye-outline";
            iconLib = 'Ionicons';
          } else if (route.name === 'ExhibitionScreen') {
            iconName = "calendar";
            iconLib = 'AntDesign';
          }
          return (
            <MyIcon
              type={iconLib}
              name={iconName}
              size={25}
              style={{ margin: 10, marginBottom: 0 }}
              color={color}
            />
          )
        },
      })}
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#88889C',
        showLabel: false,
        style: { backgroundColor: '#FFFFFF' }
      }}>
      <BottomTab.Screen style={{ color: '#FFFFFF' }} name="SwipeScreen" component={SwipeScreen} />
      <BottomTab.Screen name="TopNav" component={TopNav} />
      <BottomTab.Screen name="DailyScreen" component={DailyScreen} />
      <BottomTab.Screen name="ExhibitionScreen" component={ExhibitionScreen} />
    </BottomTab.Navigator>
  )
};


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="MediumScreen" component={MediumScreen} />
          <Stack.Screen name="MovementScreen" component={MovementScreen} />
          <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}