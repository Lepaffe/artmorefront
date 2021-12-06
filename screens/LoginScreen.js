import React from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';


function LoginScreen(props) {
 return (
   <View style={styles.container}>
     <Image style={styles.logo} source={require('../assets/logo.jpg')} ></Image>
     <Button title="Sign-Up/sign in with Google"
       onPress={() => props.navigation.navigate('MediumScreen')}
     />
     <Button title="Sign-Up"
       onPress={() => props.navigation.navigate('MediumScreen')}
     />
     <Button title="Sign-In"
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
  },
  logo: {
    width: 350,
    height: 150,
  }
});

export default LoginScreen;