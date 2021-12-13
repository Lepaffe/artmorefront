
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { View, Text, Share } from 'react-native';
import { Button } from 'react-native-elements';
import MyIcon from './myIcons'; // impot composant MyIcon


import {
  Heebo_100Thin,
  Heebo_300Light,
  Heebo_400Regular,
  Heebo_500Medium,
  Heebo_700Bold,
  Heebo_800ExtraBold,
  Heebo_900Black
} from '@expo-google-fonts/heebo';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';



const MyAppBar = (props) => {
  //console.log('route', props.route.name);
  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  // fonction du bouton share 
    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'Art+More| Discover new artworks curated for you by downloading Art+More',
            url: "http://www.artmore.com"
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
  
  return (

    <Appbar.Header style={{ backgroundColor: 'white', color: 'black' }} >
      {(props.route.name === 'ArtworkScreen'
        || props.route.name === 'ArtistScreen'
        || props.route.name === 'SignInScreen'
        || props.route.name === 'CategoryScreen'
        || props.route.name === 'MediumScreen'
        || props.route.name === 'PersonalInfoScreen'
      ) &&
        <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />}
      {/* <Appbar.BackAction onPress={()=>{console.log('toto', props.name, props.navigation.getState());
                                       props.navigation.goBack()}} /> */}
      <Appbar.Content titleStyle={{ color: 'black', textAlign: 'center', fontFamily: 'Heebo_700Bold', fontSize: 30 }} title="Art + More" subtitle=" " />
      
      {(props.route.name !== 'ProfileScreen'
        && props.route.name !== 'SignInScreen'
        && props.route.name !== 'ArtistScreen'
        && props.route.name !== 'ArtworkScreen'
        && props.route.name !== 'MediumScreen') && 
       <Appbar.Action icon="account" style={{ color: 'black' }} onPress={() => props.navigation.navigate('ProfileScreen')} />}
      
      {(props.route.name === 'ArtistScreen'
        || props.route.name === 'ArtworkScreen'
        ) && 
       <Appbar.Action icon="share" style={{ color: 'black' }} onPress={onShare} title="Share" />}

    </Appbar.Header>
  )
  //  }
}


export default MyAppBar;

