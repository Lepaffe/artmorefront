import React from 'react';
import { View, Button } from 'react-native';


function LandingScreen(props) {
 return (
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#e67e22'}}>
     <Button title="Go LoginScreen"
       onPress={() => props.navigation.navigate('LoginScreen')}
     />
   </View>
 );
}

export default LandingScreen;