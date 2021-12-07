import React, { useState } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';


function SignInScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignin, setErrorsSignin] = useState([])

  var signIn = async () => {

    const data = await fetch('http://192.168.1.15:3000/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${email}&password=${password}`
    })

    const body = await data.json()

    if (body.result == true) {
      props.addToken(body.token)
      setUserExists(true)

    } else {
      setErrorsSignin(body.error)
    }
  }

  if (userExists) {
    props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })
  }

  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<Text>{error}</Text>)
  })

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, textAlign: "center", padding: 20, marginBottom: 30 }} >Connectez-vous</Text>
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='E-mail'
        onChangeText={(val) => setEmail(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Password'
        onChangeText={(val) => setPassword(val)}
      />
      {tabErrorsSignin}
      <Button title="Connexion"
        buttonStyle={{ marginVertical: 50, marginHorizontal: 20, paddingHorizontal: 20, backgroundColor: "#FF4D4F" }}
        onPress={() => signIn()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFF"
  },
  logo: {
    width: 320,
    height: 150,
  },
  icon: {
    paddingEnd: 20
  }
});

function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen)
