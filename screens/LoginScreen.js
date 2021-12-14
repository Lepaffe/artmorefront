import React , { useEffect } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';




import {
  Heebo_100Thin,
  Heebo_300Light,
  Heebo_400Regular,
  Heebo_500Medium,
  Heebo_700Bold,
  Heebo_800ExtraBold,
  Heebo_900Black
} from '@expo-google-fonts/heebo'

import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

WebBrowser.maybeCompleteAuthSession();
const useProxy = Platform.select({ web: false, default: true });

function LoginScreen(props) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '248288746032-j461feh983b0v0jn3kcmnd7t0bhkg9vg.apps.googleusercontent.com',
    // iosClientId: '248288746032-j461feh983b0v0jn3kcmnd7t0bhkg9vg.apps.googleusercontent.com',
    // androidClientId: '248288746032-j461feh983b0v0jn3kcmnd7t0bhkg9vg.apps.googleusercontent.com',
    // webClientId: '248288746032-j461feh983b0v0jn3kcmnd7t0bhkg9vg.apps.googleusercontent.com',
    //clientSecret:'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',
    redirectUri: makeRedirectUri({
        useProxy 
      // scheme: 'https://auth.expo.io/@artmore/artmore'
        }),
    scopes: ['openid', 'profile']
  });
  console.log('response', response);
  // if (response.type==='success') {

  // }

  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  // useEffect (()=>{
  //   AsyncStorage.clear();
  // },[])

  useEffect( () => {
  
    if (response.type==='success') {
        console.log('response.type', response.type)
        const { authentication:{accessToken}} = response;
       // console.log('response2', response , 'token', accessToken);
        var user = getUserInfo(accessToken);
       
       }
    
    },[response]);

  
  
  const getUserInfo = async (accessToken) => {
    const userinfo = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    });
    var user = await userinfo.json();
    console.log('user', user)
    // return user
  }
  
  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <View style={styles.container}> 
      {/*<Image style={styles.logo} source={require('../assets/logo.jpg')} ></Image>*/}
      <Text style={{ fontFamily: 'Heebo_700Bold', fontSize: 30, textAlign: "center" , marginTop: 100}} >Art + More </Text>
      <Text style={{ fontFamily: 'Heebo_300Light', fontSize: 20, textAlign: "center", margin: 35 , marginBottom: 180}} >Discover your curated daily selection</Text>
      <Button
        title="SIGN UP / SIGN IN"
        type="outline"
        buttonStyle={{ margin: 5, width: 280, padding: 15, borderColor: "gray", borderRadius: 20 }}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => promptAsync({ useProxy: true}) } 
        disabled={!request}
        icon={
          <Icon style={styles.icon}
            name="google"
            size={25}
            color="grey"
            padding="20px"
          />
        }
      />
      <Button
        title="SIGN UP"
        type="outline"
        buttonStyle={{ margin: 5, width: 280, padding: 15, borderColor: "gray", borderRadius: 20 }}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => props.navigation.navigate('MediumScreen')}
      />
      <Button
        title="SIGN IN"
        type="outline"
        buttonStyle={{ margin: 5, width: 280, padding: 15, borderColor: "grey", borderRadius: 20 }}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => props.navigation.navigate('SignInScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFF",
  },
  logo: {
    width: 320,
    height: 150,
  },
  icon: {
    paddingEnd: 20
  }
});



export default LoginScreen;
