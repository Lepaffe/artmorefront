import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity, TextInput } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';

function PersonalInfoScreen(props) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [listErrorsSignUp, setErrorsSignUp] = useState([])
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    date = date.toLocaleDateString()
    setBirthday(date)
    hideDatePicker();
  };


  const signUp = async () => {

    console.log('SignUp activated')
    let mediums = JSON.stringify(props.medium)
    let movements = JSON.stringify(props.movement)

    const data = await fetch('http://192.168.1.16:3000/sign-up', { //192.168.1.16 ALICE //172.17.1.83 CAPSULE
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `firstName=${firstName}&lastName=${lastName}&birthday=${birthday}&email=${email}&city=${city}&password=${password}&mediums=${mediums}&movements=${movements}`
    });
    const dataJSON = await data.json();

    if (dataJSON.result) {
      props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })
      props.addToken(dataJSON.token)
    } else {
      setErrorsSignUp(dataJSON.error)
    }
  }

  let tabErrorsSignUp = listErrorsSignUp.map((error, i) => {
    return (<Text key={i}>{error}</Text>)
  })

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView >
        <Text style={{ fontSize: 25, textAlign: "center", padding: 20 }} >Almost there </Text>

        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setFirstName(val)}
          value={firstName}
        />

        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setLastName(val)}
          value={lastName}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.label}>Date of birth </Text>
          <TouchableOpacity onPress={showDatePicker} style={{ marginTop: 10, marginLeft: 5 }}>
            <AntDesign name="calendar" size={24} color="rgb(213, 208, 205)" />
          </TouchableOpacity>
        </View>

        <TextInput //format date
          style={styles.input}
          onChangeText={(val) => setBirthday(val)}
          value={birthday}
          editable={false}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setCity(val)}
          value={city}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setEmail(val)}
          value={email}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(val) => setPassword(val)}
          value={password}
        />


        {/*      <Input
          label="First name"
          containerStyle={{ marginBottom: 20, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          onChangeText={(val) => setFirstName(val)}
          value={firstName}
        />
        <Input
          label="Last name"
          containerStyle={{ marginBottom: 20, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          onChangeText={(val) => setLastName(val)}
          value={lastName}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={{ flexDirection: 'row' }}>
          <Input //format date
            label="Birthday"
            containerStyle={{ marginBottom: 20, width: '50%' }}
            inputStyle={{ marginLeft: 10 }}
            onChangeText={(val) => setBirthday(val)}
            value={birthday}
            disabled={true}
          />
          <TouchableOpacity onPress={showDatePicker} >
            <AntDesign name="calendar" size={24} color="rgb(181, 189, 196)" />
          </TouchableOpacity>

        </View>

        <Input
          label="City"
          containerStyle={{ marginBottom: 20, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          onChangeText={(val) => setCity(val)}
          value={city}
        />
        <Input
          label="E-mail"
          containerStyle={{ marginBottom: 25, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          onChangeText={(val) => setEmail(val)}
          value={email}
        />
        <Input
          label="Password"
          containerStyle={{ marginBottom: 25, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          secureTextEntry={true}
          onChangeText={(val) => setPassword(val)}
          value={password}
        /> */}
        {tabErrorsSignUp}

        <Button title="Create account"
          buttonStyle={{ elevation: 1, borderRadius: 20, marginTop: 40, backgroundColor: "rgba(213, 208, 205, 0.3)", marginBottom: 20 }}
          onPress={() => signUp()}
        />
      </ScrollView>
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
  },
  label: {
    marginTop: 15
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