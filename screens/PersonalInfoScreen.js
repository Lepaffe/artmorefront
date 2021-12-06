import React from 'react';
import { View, Button } from 'react-native';


function PersonalInfoScreen(props) {
 return (
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#e67e22'}}>
     <Button title="Go to Tab Nav"
       onPress={() => props.navigation.navigate('BottomNav', {screen:'DailyScreen'})}
     />
   </View>
 );
}

export default PersonalInfoScreen;