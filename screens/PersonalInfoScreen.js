import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MyIcon from '../composants/myIcons';
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
import { useIsFocused } from '@react-navigation/native';
import { REACT_APP_URL_BACKEND } from "@env";

function PersonalInfoScreen(props) {

  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthdayDisplay, setBirthdayDisplay] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');

  const [listErrorsSignUp, setErrorsSignUp] = useState([])

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [messageMail, setMessageMail] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [messagePassword, setMessagePassword] = useState('');

  const [isVisible, setIsVisible] = useState(true);

  const isFocused = useIsFocused();

  //au chargement on verifie si le user a utilisé GoogleSignIn ou pas 
  useEffect(() => {
    if (props.tmpGoogleUser) {
      setFirstName(props.tmpGoogleUser.firstName);
      setLastName(props.tmpGoogleUser.lastName);
      validateEmail(props.tmpGoogleUser.email);
      setIsPasswordValid(true);
      setMessagePassword('');
      setIsVisible(false);
    } else { 
      
      setFirstName('');   // ce sont déjà les états de base
      setLastName('');
      validateEmail('');
      setIsPasswordValid(false);
      setMessageMail('');
      setIsEmailValid(false);
      setMessagePassword('');
      setIsVisible(true);
    }
  }, [isFocused])

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let dateDisplay = date.toLocaleDateString()
    setBirthdayDisplay(dateDisplay);
    setBirthday(date)
    hideDatePicker();
  };

  const validateEmail = (value) => {
    const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w\w+)+$/
    const email = value;
    setEmail(value)

    if (emailRegex.test(email)) {
      setIsEmailValid(true);
      setMessageMail('Valid e-mail');
    } else {
      setIsEmailValid(false);
      setMessageMail('Invalid e-mail');
    }
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const password = value;
    setPassword(value)

    if (passwordRegex.test(password)) {
      setIsPasswordValid(true);
      setMessagePassword('Valid password');
    } else {
      setIsPasswordValid(false);
      setMessagePassword('Your password must contain at least 8 characters, one number and one letter.');
    }
  };

  const signUp = async () => {

    if (isEmailValid && isPasswordValid) {

      let dataJSON = {};
      let mediums = JSON.stringify(props.medium)
      let categories = JSON.stringify(props.category)

      if (props.tmpGoogleUser) {

        const dataGgle = await fetch(`${REACT_APP_URL_BACKEND}/sign-up-google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `firstName=${firstName}&lastName=${lastName}&birthday=${birthday}&img=${props.tmpGoogleUser.img}&email=${email}&city=${city}&mediums=${mediums}&categories=${categories}`
        });

        dataJSON = await dataGgle.json();

        props.deleteTmpGoogleUser();

      } else {

        const data = await fetch(`${REACT_APP_URL_BACKEND}/sign-up`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `firstName=${firstName}&lastName=${lastName}&birthday=${birthday}&email=${email}&city=${city}&password=${password}&mediums=${mediums}&categories=${categories}`
        });

        dataJSON = await data.json();

      }

      if (dataJSON.result) {

        props.addToken(dataJSON.token)
        AsyncStorage.setItem('token2', dataJSON.token);
        props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })

      } else {
        setErrorsSignUp(dataJSON.error)
      }
    }
  }

  let tabErrorsSignUp = listErrorsSignUp.map((error, i) => {
    return (<Text style={{ marginTop: 20 }} key={i}>{error}</Text>)
  })

  let colorMessageMail = "rgba(255, 86, 94,0.8)"
  if (isEmailValid) colorMessageMail = "rgba(58, 187, 109, 0.6)";

  let colorMessagePassword = "rgba(255, 86, 94,0.8)"
  if (isPasswordValid) colorMessagePassword = "rgba(58, 187, 109, 0.6)";

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={{ fontFamily: 'Heebo_300Light', fontSize: 25, textAlign: "center", marginTop: 40, marginBottom: 30 }} >Almost there </Text>

        <View style={styles.inputsContainer}>

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
              <MyIcon type='AntDesign' name="calendar" size={24} color="rgb(213, 208, 205)" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            onChangeText={(val) => setBirthday(val)}
            value={birthdayDisplay}
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
            onChangeText={(value) => validateEmail(value)}
            value={email}
          />
          <Text style={{ color: colorMessageMail, textAlign: 'center' }} >{messageMail}</Text>

          {isVisible && (
            <Text style={styles.label}>Password</Text>
          )}

          {isVisible &&
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(value) => validatePassword(value)}
              value={password}
            />
          }
          <Text style={{ color: colorMessagePassword, textAlign: 'center' }} >{messagePassword}</Text>

        </View>

        {tabErrorsSignUp}

        <View style={{ alignItems: 'center' }}>
          <Button title="Create account"
            buttonStyle={{ borderColor: "black", borderWidth: 1, borderRadius: 20, marginVertical: 20, marginRight: 0, paddingHorizontal: 15, backgroundColor: "white" }}
            titleStyle={{
              fontFamily: 'Heebo_300Light',
              color: 'black',
              fontSize: 15,
            }}
            onPress={() => signUp()}
          />
        </View>

        <View style={{ height: 80 }} />

      </ScrollView>

    </KeyboardAvoidingView >
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFF",
  },
  inputsContainer: {
    width: windowWidth - 150,
    flex: 1,
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
    marginTop: 15,
    fontFamily: 'Heebo_300Light'
  }
});

function mapStateToProps(state) {
  return { medium: state.mediumSignUp, category: state.categorySignUp, tmpGoogleUser: state.tmpGoogleUser }
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token })
    },
    deleteTmpGoogleUser: function () {
      dispatch({ type: 'deleteTmpGoogleUser' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoScreen);