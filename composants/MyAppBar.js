
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import {View, Text } from 'react-native';
import { Button} from 'react-native-elements';
import MyIcon from './myIcons'; // impot composant MyIcon

const MyAppBar = (props)=>{

return(
  <Appbar.Header style={{backgroundColor:'white',  color:'black'}} >
    <Appbar.BackAction onPress={()=>{console.log('toto', props.navigation);
                                     props.navigation.goBack()}} />
    <Appbar.Content style={{color:'black', fontweigth:'strong', fontsize:25}} title="Art + More" subtitle=" " />
    <Appbar.Action icon="account" style={{color:'black'}} onPress={()=>console.log('user not yet ready')} />
</Appbar.Header>

)

}
export default MyAppBar;