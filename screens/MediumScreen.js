import React from 'react';
import { View, Button } from 'react-native';


function MediumScreen(props) {
 return (
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#e67e22'}}>
     <Button title="Go MovementScreen"
       onPress={() => props.navigation.navigate('MovementScreen')}
     />
   </View>
 );
}

export default MediumScreen;