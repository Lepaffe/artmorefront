import React from 'react';
import { View, Button } from 'react-native';


function LoginScreen(props) {
 return (
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#e67e22'}}>
     <Button title="Sign-Up"
       onPress={() => props.navigation.navigate('MediumScreen')}
     />
     <Button title="Sign-In"
       onPress={() => props.navigation.navigate('SignInScreen')}
     />
   </View>
 );
}

export default LoginScreen;