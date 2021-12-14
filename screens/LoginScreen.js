import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


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

function LoginScreen(props) {

  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <View style={styles.container}> 
      {/*<Image style={styles.logo} source={require('../assets/logo.jpg')} ></Image>*/}
      <Text style={{ fontFamily: 'Heebo_700Bold', fontSize: 30, textAlign: "center" , marginTop: 100}} >Art + More </Text>
      <Text style={{ fontFamily: 'Heebo_300Light', fontSize: 20, textAlign: "center", margin: 35 , marginBottom: 180}} >Discover your curated daily selection</Text>
      <Button
        title="SIGN UP / SIGN IN"
        type="outline"
        buttonStyle={{ margin: 5, width: 280, padding: 15, borderColor: "gray", borderRadius: 20 }}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => props.navigation.navigate('MediumScreen')} icon={
          <Icon style={styles.icon}
            name="google"
            size={25}
            color="grey"
            padding="20px"
          />
        }
      />
      <Button
        title="SIGN UP"
        type="outline"
        buttonStyle={{ margin: 5, width: 280, padding: 15, borderColor: "gray", borderRadius: 20 }}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => props.navigation.navigate('MediumScreen')}
      />
      <Button
        title="SIGN IN"
        type="outline"
        buttonStyle={{ margin: 5, width: 280, padding: 15, borderColor: "grey", borderRadius: 20 }}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => props.navigation.navigate('SignInScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFF",
  },
  logo: {
    width: 320,
    height: 150,
  },
  icon: {
    paddingEnd: 20
  }
});



export default LoginScreen;
