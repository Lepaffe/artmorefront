import React from 'react';
import { View, Button } from 'react-native';


function MovementScreen(props) {
 return (
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#e67e22'}}>
     <Button title="Go PersonalInfoScreen"
       onPress={() => props.navigation.navigate('PersonalInfoScreen')}
     />
   </View>
 );
}

export default MovementScreen;