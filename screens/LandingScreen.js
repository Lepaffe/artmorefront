import React, { useRef, useEffect } from 'react';
import { Animated, View, Image } from 'react-native';
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

  useEffect(() => {

    async function autoLog() {
      //récupération du token nommé "token2" dans le local storage via le get
      AsyncStorage.getItem('token2', async (err, value) => {
        console.log("Valeur du token dans le local storage : ", value)
        // S'il y a bien une valeur pour "token2" on appelle la route "autologgedIn" qui va nous rediriger sur la Daily
        if (value) {
          var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/auto-loggedIn/${value}`);
          const body = await rawResponse.json()
          if (body.result == true) {
            props.addToken(body.token)
            props.loadArtist(body.artistList)
            props.loadArtwork(body.artworkList)
            setTimeout(() => {
              props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })
            }, 3000)
          }
          // S'il n'y a pas de valeur dans le local storage on est redirigé sur le login
        } else {
          setTimeout(() => {
            props.navigation.navigate('LoginScreen')
          }, 3000)
        }
      })
    }
    autoLog();

  }, [])


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