import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Image } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_URL_BACKEND } from "@env";
import Loader from 'react-native-mask-loader';


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
  const [appReady, setAppReady]= useState(false)
useEffect(() => {

    async function autoLog() {
      //récupération du token dans le local storage
      AsyncStorage.getItem('token2', async (err, value) => {
        console.log("Value ? ", value)
        if (value) {
          var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/auto-loggedIn/${value}`);
          const body = await rawResponse.json()
          setAppReady(true);
          if (body.result == true) {
            props.addToken(body.token)
            props.loadArtist(body.artistList)
            props.loadArtwork(body.artworkList)
            setTimeout(() => {
              props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })
            }, 3000)
          }
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
    <View style={{ flex: 1,  }}>
<Loader
 
  isLoaded={appReady}
  imageSource={require('../assets/plus.png')}
  backgroundStyle={{backgroundColor: 'black'}}
>
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', flexDirection: 'row' }}>
<FadeInView>
        <Image style={{
          width: 300,
          height: 600,
        }} source={require('../assets/masklogo.png')} />
          </FadeInView>
      </View>
      </Loader>
    
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
