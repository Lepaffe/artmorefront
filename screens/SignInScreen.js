import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { REACT_APP_URL_BACKEND } from "@env";

function SignInScreen(props) {
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
      props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })
    } else {
      setErrorsSignin(body.error)
    }
  }

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return (<Text>{error}</Text>)
  })

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <Text style={{ fontSize: 25, textAlign: "center", padding: 20, marginBottom: 30 }} >Connectez-vous</Text>


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

      {tabErrorsSignin}
      <Button title="Connexion"
        buttonStyle={{ marginVertical: 50, marginHorizontal: 20, paddingHorizontal: 20, backgroundColor: "#FF4D4F" }}
        onPress={() => signIn()}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFF"
  },
  input: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgb(213, 208, 205)",
    borderRadius: 15,
    padding: 10,
    width: '40%'
  },
  label: {
    marginTop: 15
  },
  logo: {
    width: 320,
    height: 150,
  },
  icon: {
    paddingEnd: 20
  }
});

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen)
