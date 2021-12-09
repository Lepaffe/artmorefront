import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);


import { StatusBar } from 'expo-status-bar';
import React from 'react';

// COPOSANTS NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyAppBar from './composants/MyAppBar';

//SCREENS
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import MediumScreen from './screens/MediumScreen';
import CategoryScreen from './screens/CategoryScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import SignInScreen from './screens/SignInScreen';

import SwipeScreen from './screens/SwipeScreen';
import DailyScreen from './screens/DailyScreen';
import ExhibitionScreen from './screens/ExhibitionScreen';

import CollectionScreen from './screens/CollectionScreen';
import MyArtistsScreen from './screens/MyArtistsScreen';

import ArtworkScreen from './screens/ArtworkScreen';
import ArtistScreen from './screens/ArtistScreen';
import ProfileScreen from './screens/ProfileScreen';

import selectedArtwork from './reducers/selectedArtwork'
import selectedArtist from './reducers/selectedArtist'
import mediumSignUp from './reducers/mediumSignUp';
import categorySignUp from './reducers/categorySignUp';
import token from './reducers/token';
import artistList from './reducers/artistList';
import artworkList from './reducers/artworkList';

import MyIcon from './composants/myIcons'; // impot composant MyIcon

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ selectedArtwork, selectedArtist, movementSignUp, mediumSignUp, token, artistList, artworkList }));

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopNav = () => {
  return (

    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#88889C',
        tabBarStyle: { backgroundColor: '#FFFFFF', marginTop: 0 }
      }}
    >
      <TopTab.Screen name="my Collection" component={CollectionScreen} />
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
      <BottomTab.Screen style={{ color: '#FFFFFF' }} name="SwipeScreen" options={{ header: MyAppBar }} component={SwipeScreen} />
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
          <Stack.Screen name="LandingScreen" options={{ headerShown: false }} component={LandingScreen} />
          <Stack.Screen name="LoginScreen" options={{ header: MyAppBar }} component={LoginScreen} />
          <Stack.Screen name="MediumScreen" options={{ header: MyAppBar }} component={MediumScreen} />
          <Stack.Screen name="CategoryScreen" options={{ header: MyAppBar }} component={CategoryScreen} />
          <Stack.Screen name="PersonalInfoScreen" options={{ header: MyAppBar }} component={PersonalInfoScreen} />
          <Stack.Screen name="SignInScreen" options={{ header: MyAppBar }} component={SignInScreen} />
          <Stack.Screen name="ArtworkScreen" options={{ header: MyAppBar }} component={ArtworkScreen} />
          <Stack.Screen name="ArtistScreen" options={{ header: MyAppBar }} component={ArtistScreen} />
          <Stack.Screen name="ProfileScreen" options={{ header: MyAppBar }} component={ProfileScreen} />
          <Stack.Screen name="BottomNav" component={BottomNav} options={{ header: MyAppBar }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}