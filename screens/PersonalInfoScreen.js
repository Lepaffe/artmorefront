import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'

function PersonalInfoScreen(props) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [userCreated, setUserCreated] = useState(false)
  const [errors, setErrors] = useState([])

  let errorTab;

  const signUp = async () => {

    const data = await fetch('http://192.168.1.15:3000/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `firstName=${firstName}&lastName=${lastName}&birthday=${birthday}&email=${email}&city=${city}&password=${password}&medium=${props.medium}&movement=${props.movement}`
    });
    const dataJSON = await data.json();

    if (dataJSON.result) {
      setUserCreated(true)
      props.addToken(dataJSON.token)
    } else {
      setErrors(dataJSON.error)
      errorTab = errors.map(error => <Text>{error}</Text>)
    }

    userCreated && props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })
  }


  return (
    <View style={styles.container}>
      <ScrollView >
        <Text style={{ fontSize: 25, textAlign: "center", padding: 20, marginBottom: 30 }} >Almost there </Text>
        <Input
          containerStyle={{ marginBottom: 20, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          placeholder='First name'
          onChangeText={(val) => setFirstName(val)}
        />
        <Input
          containerStyle={{ marginBottom: 20, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          placeholder='Last Name'
          onChangeText={(val) => setLastName(val)}
        />
        <Input //format date
          containerStyle={{ marginBottom: 20, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          placeholder='Birthday'
          onChangeText={(val) => setBirthday(val)}
        />
        <Input
          containerStyle={{ marginBottom: 20, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          placeholder='City'
          onChangeText={(val) => setCity(val)}
        />
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
        {errorTab}
        <Button title="Create account"
          buttonStyle={{ marginVertical: 50, marginHorizontal: 20, paddingHorizontal: 20, backgroundColor: "#FF4D4F" }}
          onPress={() => signUp()}
        />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFF"
  }
});

function mapStateToProps(state) {
  return { medium: state.mediumSignUp, movement: state.movementSignUp }
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoScreen);