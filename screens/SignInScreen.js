import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
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

import { REACT_APP_URL_BACKEND } from "@env";

function SignInScreen(props) {

  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [listErrorsSignin, setErrorsSignin] = useState([])
  

  var signIn = async () => {
    
    const data = await fetch(`${REACT_APP_URL_BACKEND}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${email}&password=${password}`
    })

    const body = await data.json()
    
    if (body.result == true) {
      props.addToken(body.token)
      props.loadArtist(body.artistList)
      props.loadArtwork(body.artworkList)
      // Store le token dans le LocalStorage
      AsyncStorage.setItem('token2', body.token) 
      props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })
    } else {
      setErrorsSignin(body.error)
    }
  }

  // voir ce qu'il y a dans le localStorage
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.log({ [store[i][0]]: store[i][1] });
        return true;
      });
    });
  });

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return (<Text>{error}</Text>)
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <Text style={{ fontFamily: 'Heebo_300Light', fontSize: 25, textAlign: "center", padding: 20, marginBottom: 30, marginTop: 10 }} >Login</Text>

      <View >
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setEmail(val)}
          value={email}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
          value={password}
        />
      </View>
      {tabErrorsSignin}
      <Button title="Connexion"
        buttonStyle={{ borderColor: "black", borderWidth: 1 ,borderRadius: 20, paddingHorizontal: 20, backgroundColor: "white" }}
        titleStyle={{ fontFamily: 'Heebo_300Light', color: 'black',fontSize: 15 }}
        onPress={() => signIn()}
      />
    </KeyboardAvoidingView >
  )
};



const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFFF"
  },
  input: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgb(213, 208, 205)",
    borderRadius: 15,
    padding: 10,
    marginBottom: 30,
    width: windowWidth - 150
  },
  label: {
    textAlign: 'left',
    fontFamily: 'Heebo_400Regular'
  }
});

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
)(SignInScreen)