import React from 'react';
import { View, Button } from 'react-native';


function SignInScreen(props) {
 return (
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#e67e22'}}>
     <Button title="go to Tab Nav"
       onPress={() => props.navigation.navigate('BottomNav', {screen: 'DailyScreen'})}
     />
   </View>
 );
}

export default SignInScreen;