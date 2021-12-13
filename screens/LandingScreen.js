/*import React from 'react';
import { View, Button } from 'react-native';


function LandingScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
      <Button title="Go LoginScreen"
        onPress={() => props.navigation.navigate('LoginScreen')}
      />
    </View>
  );
}

export default LandingScreen;*/

import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_URL_BACKEND } from "@env";


const FadeInView = (props) => {

  const fadeAnim = useRef(new Animated.Value(0)).current
  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

function LandingScreen(props) {

  const [userToken2, setUserToken2] = useState()

  useEffect(() => {
    // async function autoLog() {
    //   var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/auto-loggedIn/hKbIiHKvvHyHMtQAJZSwC3DPuMgAHZvo`);
    //   const body = await rawResponse.json()
    //   console.log('body', body);
    //   if (body.result == true) {
    //     props.addToken(body.token)
    //     props.loadArtist(body.artistList)
    //     props.loadArtwork(body.artworkList)
    //     props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })
    //   } else {
    //     setErrorsSignin(body.error)
    //   }
    // }
    // autoLog();

    AsyncStorage.getItem('token2', (err, value) => {
      console.log("Value ? ", value)
      if (value) {
        setUserToken2(value)
      }
      //   setTimeout(() => {
      //     props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })
      //   }, 3000)
      // } else {
      //   setTimeout(() => {
      //     props.navigation.navigate('LoginScreen')
      //   }, 3000)
      // }
    })
  }, [])
  console.log(userToken2)

  async function autoLog() {
    var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/auto-loggedIn/${userToken2}`);
    const body = await rawResponse.json()
    console.log('body', body);
    if (body.result == true) {
      props.addToken(body.token)
      props.loadArtist(body.artistList)
      props.loadArtwork(body.artworkList)
      setTimeout(() => {
        props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })
      }, 3000)
    } else {
      setTimeout(() => {
        props.navigation.navigate('LoginScreen')
      }, 3000)
    }
  }
  autoLog();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', flexDirection: 'row' }}>

      <FadeInView >
        <Image style={{
          width: 300,
          height: 140,
        }} source={require('../assets/logo.jpg')} />
      </FadeInView>

    </View >
  )
}

function mapStateToProps(state) {
  return { token: state.token }
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })
    },
    loadArtist: function (artistList) {
      dispatch({ type: 'loadArtist', artistList: artistList })
    },
    loadArtwork: function (artworkList) {
      dispatch({ type: 'loadArtwork', artworkList: artworkList })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingScreen)