import React , { useState,useEffect } from 'react';
import { Animated, Image, View, Platform, StyleSheet, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import { SliderBox } from "react-native-image-slider-box";

import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { REACT_APP_URL_BACKEND, REACT_APP_GGLE_SIGNIN_KEY } from "@env";



var images = [
  require('../assets/screen1.jpg'),
  require('../assets/screen2.jpg'),
  require('../assets/screen3.jpg'),
  require('../assets/screen4.jpg')
]
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

  const [error, setError] = useState(null);

  // load la requete qui renvoie une fonction promptAsync qui permettra l'appel depuis le bouton, l'objet response 
  //qui sera rempli à la fin de l'execution de la requete. Requet est à null quand la requete n'est pas en cours.
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: `${REACT_APP_GGLE_SIGNIN_KEY}.apps.googleusercontent.com`, 
    iosClientId: `${REACT_APP_GGLE_SIGNIN_KEY}.apps.googleusercontent.com`,
   
    redirectUri: makeRedirectUri({
        useProxy 
      // scheme: 'https://auth.expo.io/@artmore/artmore'
        }),
    scopes: ['openid', 'profile'] // on definit les élements que la requete doit nous retourner dans response
  });
  //console.log('response', response);

  //on met le traitement dans un useEffect pour eviter ne l'executer que quand response est modifié
  useEffect( () => {
    if (response) { //.type==='success'
        if (response.type =='success'){
        //on recupère le token pour  envoyer la requete de recup des infos
        const { authentication:{accessToken}} = response;
        //on appelle la fonciton de récuperation des infos
        var user = getUserInfo(accessToken);
       }
    }
    },[response]);


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

  
  
  //fonction de récuperation des infos user
  const getUserInfo = async (accessToken) => {
    //on fait une requete GET avec authentification 
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
    // on verifie si le user est déjà dans la base  signIn ou SignUp
    const data = await fetch(`${REACT_APP_URL_BACKEND}/sign-in-google`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `firstName=${user.given_name}&lastName=${user.family_name}&email=${user.email}`
    });
    const body= await data.json();

    if (body.result){ //le user existe on load les infos dans le store
      props.addToken(body.token)
      props.loadArtist(body.artistList)
      props.loadArtwork(body.artworkList)
      // Store le token dans le LocalStorage
      AsyncStorage.setItem('token2', body.token) 
      props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })// on redirige le user vers sa daily

    } else {
      //le user n'existe pas c'est un Sign Up ou un user normal
      if ( body.error.includes("Not a GoogleSignIn user. Go back and Signin")){
        setError("Not a GoogleSignIn user. Go back and Sign in without Google");
        setTimeout(() => {
          setError(null);
          props.navigation.navigate('LoginScreen')}
        , 5000);
      } else { //c un sign Up 
        props.addTmpGgleUser(user);  // on ajoute les infos du nouvel user dans le store 
        props.navigation.navigate('MediumScreen'); 
      }
      
    }    
  }
  console.log(images);

  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <ImageBackground source={require('../assets/logfinal.png')} style={styles.backgroundImage}>
    <View style={styles.container}>

      

     


      <Text style={{ color: "rgba(255, 86, 94,0.8)", textAlign: 'center' }}>{error}</Text>
      <Button
        title="SIGN UP / SIGN IN"
        type="Solid Button"
        buttonStyle={{ backgroundColor: 'white',margin: 5, width: 230, padding: 13, borderColor: "black", borderRadius: 10, marginTop: 580}}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => promptAsync({ useProxy: true}) } 
        disabled={!request}
        icon={
          <Icon style={styles.icon}
            name="google"
            size={20}
            color="grey"
            padding="20px"
          />
        }
      />

      <Button
        title="SIGN UP"
        type="Solid Button"
        buttonStyle={{ backgroundColor: 'white',margin: 5, width: 230, padding: 10, borderColor: "black", borderRadius: 10,}}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => props.navigation.navigate('MediumScreen')}
      />

      <Button
        title="SIGN IN"
        type="Solid Button"
        buttonStyle={{ backgroundColor: 'white',margin: 5, width: 230, padding: 10, borderColor: "black", borderRadius: 10,}}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => props.navigation.navigate('SignInScreen')}
      />

    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   

  },
  logo: {
    width: 120,
    height: 60,
  },
  icon: {
    paddingEnd: 20
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  }
});


function mapDispatchToProps(dispatch) {
  return {
      addTmpGgleUser: function (user) {
        dispatch({ type: 'addTmpGgleUser', user})
    },
      addToken: function (token) {
        dispatch({ type: 'addToken', token })
    },
    loadArtist: function (artistList) {
      dispatch({ type: 'loadArtist', artistList: artistList })
    },
    loadArtwork: function (artworkList) {
      dispatch({ type: 'loadArtwork', artworkList: artworkList })
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginScreen);

